import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref(null)

  const isLoggedIn = computed(() => !!accessToken.value)

  return { accessToken, isLoggedIn }
})
