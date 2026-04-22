export default defineEventHandler((event) => {
  const host = getRequestHost(event, { xForwardedHost: true })
  const url = getRequestURL(event)

  if (host === 'chinese-law.pages.dev') {
    return sendRedirect(
      event,
      `https://chinese-law.zitzhen.cn${url.pathname}${url.search}`,
      301
    )
  }
})