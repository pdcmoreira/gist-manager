import { buildUrlWithQuery } from '@/utilities/url'
import { useUserStore } from '@/stores/user'

const GH_API_URL = 'https://github.com/'
const GH_CLIENT_ID = import.meta.env.VITE_GH_CLIENT_ID
const GH_GATEWAY_URL = import.meta.env.VITE_GH_GATEWAY_URL
const GH_SCOPE = 'gist'

const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

const fetchJson = async (...args) => (await fetch(...args)).json()

const getRouteUrl = (route) => new URL(route, GH_API_URL).href

export const generateAuthorizeUrl = (state) =>
  buildUrlWithQuery(getRouteUrl('/login/oauth/authorize'), {
    client_id: GH_CLIENT_ID,
    scope: GH_SCOPE,
    state
  })

// This request is made through a gateway because it requires the app secret to be sent, which must
// not be exposed in the front-end.
export const requestAccessToken = async (code) =>
  (
    await fetchJson(
      buildUrlWithQuery(new URL('/login/oauth/access_token', GH_GATEWAY_URL).href, { code }),
      {
        headers: BASE_HEADERS
      }
    )
  ).access_token || null

const request = async (route, method = 'GET', data = null) => {
  const userStore = useUserStore()

  return fetchJson(getRouteUrl(route), {
    method,

    headers: {
      ...BASE_HEADERS,

      Authorization: userStore.accessToken ? `Bearer ${userStore.accessToken}` : null
    },

    body: data ? JSON.stringify(data) : null
  })
}

export const fetchGists = async () => request('/gists')
