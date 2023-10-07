import { computed, toValue } from 'vue'
import { useUserStore } from '@/stores/user'

export function useIsUserGistOwner(gist) {
  const userStore = useUserStore()

  const isUserGistOwner = computed(() => toValue(gist)?.owner?.id === userStore.user?.id)

  return { isUserGistOwner }
}
