import { v4 as uuidv4 } from 'uuid'
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { cookies } from '@/utilities/cookies'
import { generateAuthorizeUrl, requestAccessToken, fetchUser } from '@/services/githubApi'
import { useUserStore } from '@/stores/user'

const COOKIE_KEY_GH_STATE = 'gh_state'

// Follows the web application flow:
// https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#web-application-flow
export function useGithubOAuthFlow() {
  const userStore = useUserStore()

  const authorizeUrl = ref(null)

  const loadingToken = ref(false)

  const loadingUser = ref(false)

  const isLoading = computed(
    () => loadingToken.value || loadingUser.value || (userStore.accessToken && !userStore.user)
  )

  const router = useRouter()

  router.beforeEach(async (to, from, next) => {
    // Intercept the second step's redirect back into the app from GitHub's "authorize" page.
    // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity/
    if (to.name === 'authorize') {
      const state = cookies.get(COOKIE_KEY_GH_STATE)

      // Validate if the authorization resulted from a redirect from the app by comparing the last
      // generated "state" with the one from the query. Also discard if no "code" is present.
      if (state && to.query.code && to.query.state === state) {
        loadingToken.value = true

        // Try to request an access token with the provided code.
        // Store the token so that it can then be used to perform authenticated requests to the API.
        // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#3-use-the-access-token-to-access-the-api
        try {
          userStore.setToken(await requestAccessToken(to.query.code))
        } catch (error) {
          // TODO: properly handle errors
          userStore.setToken(null)
        }

        loadingToken.value = false
      }

      // Redirect to the gists page if we got a token, or redirect home otherwise.
      next({ name: userStore.accessToken ? 'gists' : 'home' })

      return
    }

    // Generate the "authorize" URL (to be used as a link), storing an un-guessable "state" string
    // in a cookie to compare later in the second step's redirect.
    // https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#1-request-a-users-github-identity

    const state = uuidv4()

    cookies.set(COOKIE_KEY_GH_STATE, state)

    authorizeUrl.value = generateAuthorizeUrl(state)

    next()
  })

  watch(
    () => userStore.accessToken,

    async (token) => {
      if (!token) {
        userStore.setUser(null)

        return
      }

      loadingUser.value = true

      const user = await fetchUser()

      userStore.setUser(user)

      loadingUser.value = false
    },

    { immediate: true }
  )

  return {
    authorizeUrl,
    isLoading
  }
}
