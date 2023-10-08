import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  fetchAllOwnGists,
  fetchStarredGists,
  fetchGistDetails,
  createGist,
  updateGist,
  starGist,
  unstarGist
} from '@/services/githubApi'
import { useLoadings } from '@/composables/useLoadings'
import unionBy from 'lodash/unionBy'
import differenceBy from 'lodash/differenceBy'

export const useGistStore = defineStore('gist', () => {
  const { loadings, addLoading, removeLoading } = useLoadings()

  const allOwnGists = ref([])

  const starredGists = ref([])

  // Contains allOwnGists + starred (excluding repeated ones)
  const allGists = computed(() => unionBy(allOwnGists.value, starredGists.value, 'id'))

  // Contains allOwnGists except starred
  const unstarredGists = computed(() => differenceBy(allOwnGists.value, starredGists.value, 'id'))

  // Used for caching gist details
  const gistsDetails = ref([])

  // Update changed gist locally wherever it's present
  const updateLocally = (gist) => {
    ;[allOwnGists, starredGists, gistsDetails].forEach((list) => {
      const index = list.value.findIndex((item) => item.id === gist.id)

      if (index >= 0) {
        list.value.splice(index, 1, gist)
      }
    })
  }

  const clearGists = () => {
    allOwnGists.value = []

    starredGists.value = []

    gistsDetails.value = []
  }

  const fetchGists = async () => {
    const loadingKey = 'gists'

    addLoading(loadingKey)

    // Fetch both gist requests in parallel.
    ;[allOwnGists.value, starredGists.value] = await Promise.all([
      fetchAllOwnGists(),
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

    allOwnGists.value.push(gist)

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

  const updateStar = async (gist, star) => {
    const starredIndex = starredGists.value.findIndex((item) => item.id === gist.id)

    // Ignore if gist is already in wanted state
    if (star === starredIndex >= 0) {
      return
    }

    const loadingKey = `gist-update-star-${gist.id}`

    addLoading(loadingKey)

    // Optimistic approach: instantly update local values, before request is complete

    let request

    if (star) {
      request = starGist(gist.id)

      starredGists.value.push(gist)
    } else {
      request = unstarGist(gist.id)

      starredGists.value.splice(starredIndex, 1)
    }

    await request

    removeLoading(loadingKey)
  }

  return {
    loadings,
    allOwnGists,
    starredGists,
    allGists,
    unstarredGists,
    gistsDetails,
    clearGists,
    fetchGists,
    fetchDetails,
    create,
    update,
    updateStar
  }
})
