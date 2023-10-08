<script setup>
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGistStore } from '@/stores/gist'
import { useGistListStore } from '@/stores/gistList'
import { objectAssignDefined } from '@/utilities/objectAssignDefined'
import FadeTransition from '@/components/FadeTransition.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import InputButton from '@/components/InputButton.vue'
import GistList from '@/components/GistList.vue'
import InputTagFilters from '@/components/InputTagFilters.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import ChartTotals from '@/components/ChartTotals.vue'

const typeOptions = [
  { id: 'all', name: 'All', stateKey: 'allGists' },
  { id: 'my', name: 'My', stateKey: 'allOwnGists' },
  { id: 'starred', name: 'Starred', stateKey: 'starredGists' },
  { id: 'unstarred', name: 'Unstarred', stateKey: 'unstarredGists' }
]

const visibilityOptions = [
  { id: 'public', name: 'Public', publicValue: true },
  { id: 'secret', name: 'Secret', publicValue: false }
]

const props = defineProps({
  type: {
    type: String,
    default: 'all'
  },

  visibility: {
    type: String,
    default: null
  }
})

const router = useRouter()

const route = useRoute()

const gistStore = useGistStore()

const gistListStore = useGistListStore()

const isLoading = computed(() => gistStore.loadings.includes('gists'))

const selectedType = computed(
  () => typeOptions.find((option) => option.id === props.type) || typeOptions[0]
)

const selectedVisibility = computed(
  () => visibilityOptions.find((option) => option.id === props.visibility) || null
)

const displayGists = computed(() => {
  const { stateKey } = selectedType.value

  const publicValue = selectedVisibility.value ? selectedVisibility.value.publicValue : null

  return gistStore[stateKey].filter((gist) => publicValue === null || gist.public === publicValue)
})

// Keep list filters in sync with the query/props, being the query the main source of truth
watch(
  [() => props.type, () => props.visibility],
  ([type, visibility]) => {
    gistListStore.updateFilters({ type, visibility })
  },
  { immediate: true }
)

// Update filters in the query, which will cascade down to the props and the store
const updateFilters = ({ type, visibility }) => {
  router.replace({ query: { ...route.query, ...objectAssignDefined({}, { type, visibility }) } })
}

const totals = [
  ['Starred', gistStore.starredGists.length],
  ['Unstarred', gistStore.unstarredGists.length]
]
</script>

<template>
  <div>
    <div class="mb-4 grid grid-cols-1 gap-4 sm:gap-10 md:grid-cols-3">
      <div class="flex justify-between md:col-span-2">
        <div class="flex items-center gap-2">
          <InputTagFilters
            :options="typeOptions"
            :selected="[selectedType]"
            exclusive
            required
            @update:selected="updateFilters({ type: $event[0].id })"
          />

          <span class="h-4 border-l text-gray-300" />

          <InputTagFilters
            :options="visibilityOptions"
            :selected="selectedVisibility ? [selectedVisibility] : []"
            exclusive
            @update:selected="updateFilters({ visibility: $event[0]?.id || null })"
          />
        </div>

        <div class="flex items-center gap-4">
          <InputButton class="text-lg" icon variant="primary" :to="{ name: 'gist-new' }">
            <IconPlus />
          </InputButton>
        </div>
      </div>
    </div>

    <main class="grid grid-cols-1 gap-4 sm:gap-10 md:grid-cols-3">
      <div class="md:col-span-2">
        <FadeTransition>
          <ContainerCard v-if="isLoading">
            <LoadingSpinner class="mx-auto my-24" />
          </ContainerCard>

          <GistList v-else :gists="displayGists" />
        </FadeTransition>
      </div>

      <div class="p-4">
        <ChartTotals :totals="totals" />
      </div>
    </main>
  </div>
</template>
