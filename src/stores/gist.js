import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchAllGists, fetchStarredGists, fetchGistDetails } from '@/services/githubApi'
import { useLoadings } from '@/composables/useLoadings'

export const useGistStore = defineStore('gist', () => {
  const { loadings, addLoading, removeLoading, isLoading } = useLoadings()

  const allGists = ref([])

  const starredGists = ref([])

  // Used for caching gist details
  const gistsDetails = ref([])

  const fetchGists = async () => {
    const loadingKey = 'gists'

    addLoading(loadingKey)

    // Fetch both gist requests in parallel.
    ;[allGists.value, starredGists.value] = await Promise.all([
      fetchAllGists(),
      fetchStarredGists()
    ])

    removeLoading(loadingKey)
  }

  const fetchDetails = async (id) => {
    const loadingKey = `gist-details-${id}`

    addLoading(loadingKey)

    const gistDetails = await fetchGistDetails(id)

    const existingIndex = gistsDetails.value.findIndex((gist) => gist.id === id)

    if (existingIndex >= 0) {
      gistsDetails.value.splice(existingIndex, 1, gistDetails)
    } else {
      gistsDetails.value.push(gistDetails)
    }

    removeLoading(loadingKey)
  }

  return { loadings, isLoading, allGists, starredGists, gistsDetails, fetchGists, fetchDetails }
})
