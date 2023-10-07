import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { objectAssignDefined } from '@/utilities/objectAssignDefined'

export const useGistListStore = defineStore('gistList', () => {
  const filters = reactive({
    type: 'all',
    visibility: null
  })

  const updateFilters = ({ type, visibility }) => {
    objectAssignDefined(filters, { type, visibility })
  }

  return {
    filters,
    updateFilters
  }
})
