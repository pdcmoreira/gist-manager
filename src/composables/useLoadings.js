import { ref, computed } from 'vue'

export function useLoadings() {
  const loadings = ref([])

  const addLoading = (key) => {
    loadings.value.push(key)
  }

  const removeLoading = (key) => {
    const index = loadings.value.indexOf(key)

    if (index >= 0) {
      loadings.value.splice(index, 1)
    }
  }

  const isLoading = computed(() => !!loadings.value.length)

  return { loadings, addLoading, removeLoading, isLoading }
}
