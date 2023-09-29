import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { cookies } from '@/utilities/cookies'

const COOKIE_KEY_ACCESS_TOKEN = 'access_token'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref(cookies.get(COOKIE_KEY_ACCESS_TOKEN) || null)

  const setToken = (token) => {
    if (token) {
      // Store token in a cookie so that it can be restored in future sessions.
      cookies.set(COOKIE_KEY_ACCESS_TOKEN, token)
    } else {
      cookies.remove(COOKIE_KEY_ACCESS_TOKEN)
    }

    accessToken.value = token
  }

  const accessTokenGetter = computed(() => accessToken.value)

  const isLoggedIn = computed(() => !!accessToken.value)

  return { setToken, accessToken: accessTokenGetter, isLoggedIn }
})
