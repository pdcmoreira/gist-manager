/**
 *
 * Returns a string url with the query parameters.
 * @param { string | URL } baseUrl
 * @param { { [key: string]: string } } parameters
 */
export const buildUrlWithQuery = (baseUrl, parameters = {}) => {
  const url = new URL(baseUrl)

  Object.entries(parameters).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  return url.href
}
