const infoModules = import.meta.glob('../../law/*/information.json', {
  eager: true,
  import: 'default'
})

const readmeModules = import.meta.glob('../../law/*/README.md', {
  query: '?raw',
  import: 'default'
})

const pdfModules = import.meta.glob('../../law/*/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default'
})

const docxModules = import.meta.glob('../../law/*/*.docx', {
  eager: true,
  query: '?url',
  import: 'default'
})

const CATEGORY_RULES = [
  ['宪法及相关法', ['宪法', '立法法', '选举法', '国旗法', '国徽法']],
  ['民法商法', ['民法典', '公司法', '商标法', '专利法']],
  ['行政法', ['行政', '公务员法', '治安管理处罚法']],
  ['经济法', ['反垄断法', '消费者权益保护法', '税收征收管理法', '银行业监督管理法', '证券法']],
  ['社会法', ['劳动', '社会保险法', '未成年人保护法', '妇女权益保障法']],
  ['刑法', ['刑法', '反洗钱法', '国家安全法']],
  ['诉讼与非诉讼程序法', ['诉讼法', '仲裁法']]
]

const trimPrefix = (value) => value.replace(/^中华人民共和国/, '')

const getLawNameFromPath = (path) => {
  const match = path.match(/\/law\/([^/]+)\//)
  return match ? decodeURIComponent(match[1]) : ''
}

const getCategory = (name) => {
  const matched = CATEGORY_RULES.find(([, keywords]) => keywords.some((keyword) => name.includes(keyword)))
  return matched ? matched[0] : '其他'
}

const assetMap = (modules) => {
  return Object.fromEntries(
    Object.entries(modules).map(([path, url]) => [getLawNameFromPath(path), url])
  )
}

const readmeMap = Object.fromEntries(
  Object.entries(readmeModules).map(([path, loader]) => [getLawNameFromPath(path), loader])
)
const pdfMap = assetMap(pdfModules)
const docxMap = assetMap(docxModules)

export const lawCategories = CATEGORY_RULES.map(([name]) => name).concat('其他')

export const laws = Object.entries(infoModules)
  .map(([path, info]) => {
    const name = getLawNameFromPath(path)

    return {
      name,
      shortName: trimPrefix(name),
      category: getCategory(name),
      readmeLoader: readmeMap[name],
      pdfUrl: pdfMap[name] || '',
      docxUrl: docxMap[name] || '',
      date_of_enactment: info.date_of_enactment || '暂无',
      date_of_implementation: info.date_of_implementation || '暂无',
      potency_level: info.potency_level || '暂无',
      Timeliness: info.Timeliness || '暂无',
      reference_number: info.reference_number || '暂无'
    }
  })
  .filter((law) => law.name && law.name !== 'example')
  .sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'))

export const getLawByName = (name) => laws.find((law) => law.name === name)

export const getLawMarkdown = async (name) => {
  const law = getLawByName(name)

  if (!law?.readmeLoader) {
    return ''
  }

  return law.readmeLoader()
}

export const getRelatedLaws = (lawName, limit = 6) => {
  const current = getLawByName(lawName)

  if (!current) {
    return []
  }

  return laws
    .filter((law) => law.name !== lawName && law.category === current.category)
    .slice(0, limit)
}
