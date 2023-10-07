import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchAllGists,
  fetchStarredGists,
  fetchGistDetails,
  createGist,
  updateGist
} from '@/services/githubApi'
import { useLoadings } from '@/composables/useLoadings'

export const useGistStore = defineStore('gist', () => {
  const { loadings, addLoading, removeLoading } = useLoadings()

  const allGists = ref([])

  const starredGists = ref([])

  // Used for caching gist details
  const gistsDetails = ref([])

  // Update changed gist locally wherever it's present
  const updateLocally = (gist) => {
    ;[allGists, starredGists, gistsDetails].forEach((list) => {
      const index = list.value.findIndex((item) => item.id === gist.id)

      if (index >= 0) {
        list.value.splice(index, 1, gist)
      }
    })
  }

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

  const create = async (files, description, isPublic) => {
    const loadingKey = 'gist-create'

    addLoading(loadingKey)

    const gist = await createGist(files, description, isPublic)

    allGists.value.push(gist)

    removeLoading(loadingKey)

    return gist
  }

  const update = async (id, files, description, isPublic) => {
    const loadingKey = `gist-update-${id}`

    addLoading(loadingKey)

    const gist = await updateGist(id, files, description, isPublic)

    updateLocally(gist)

    removeLoading(loadingKey)

    return gist
  }

  return {
    loadings,
    allGists,
    starredGists,
    gistsDetails,
    fetchGists,
    fetchDetails,
    create,
    update
  }
})
