// Simple cross-browser scrolling element detection, based on:
// https://dev.opera.com/articles/fixing-the-scrolltop-bug/
export const getScrollingElement = () => {
  if ('scrollingElement' in document) {
    return document.scrollingElement
  }

  // Fallback for legacy browsers
  if (navigator.userAgent.indexOf('WebKit') != -1) {
    return document.body
  }
  return document.documentElement
}

export const scrollToBottom = () => {
  const scrollingElement = getScrollingElement()

  scrollingElement.scrollTop = scrollingElement.scrollHeight
}
