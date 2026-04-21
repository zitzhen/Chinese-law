const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const slugify = (value) => value.replace(/[^\p{Script=Han}\w\s-]/gu, '').trim().replace(/\s+/g, '-')

const renderInline = (value) =>
  escapeHtml(value)
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((#[^)]+)\)/g, '<a href="$2">$1</a>')

export const renderMarkdown = (markdown) => {
  if (!markdown) {
    return ''
  }

  return markdown
    .split(/\r?\n/)
    .map((line) => {
      const value = line.trim()

      if (!value) {
        return ''
      }

      const heading = value.match(/^(#{1,4})\s+(.+)$/)

      if (heading) {
        const level = heading[1].length
        const text = renderInline(heading[2])
        const id = slugify(heading[2])
        return `<h${level} id="${id}">${text}</h${level}>`
      }

      return `<p>${renderInline(value)}</p>`
    })
    .join('')
}
