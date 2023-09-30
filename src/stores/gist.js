import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllGists, fetchStarredGists } from '@/services/githubApi'

export const useGistStore = defineStore('gist', () => {
  const allGists = ref([])

  const starredGists = ref([])

  const loading = ref(false)

  const fetchGists = async () => {
    loading.value = true

    // Fetch both gist requests in parallel.
    ;[allGists.value, starredGists.value] = await Promise.all([
      fetchAllGists(),
      fetchStarredGists()
    ])

    loading.value = false
  }

  return { allGists, starredGists, fetchGists }
})
