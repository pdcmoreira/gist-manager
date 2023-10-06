import { useUserStore } from '@/stores/user'

export const authorization = (to, from, next) => {
  const userStore = useUserStore()

  if (!to.meta.allowGuest && !userStore.isLoggedIn) {
    next({ name: 'home' })

    return
  }

  next()
}
