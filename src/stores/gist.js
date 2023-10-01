import { ref } from 'vue'
import { defineStore } from 'pinia'
import { fetchGists as apiFetchGists } from '@/services/githubApi'

export const useGistStore = defineStore('gist', () => {
  const gists = ref([])

  const fetchGists = async () => {
    gists.value = await apiFetchGists()
  }

  return { gists, fetchGists }
})
