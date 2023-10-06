<script setup>
import { computed, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGistStore } from '@/stores/gist'
import FadeTransition from '@/components/FadeTransition.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import InputButton from '@/components/InputButton.vue'
import GistList from '@/components/GistList.vue'
import InputTagFilters from '@/components/InputTagFilters.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const typeOptions = [
  { id: 'all', name: 'All', stateKey: 'allGists' },
  { id: 'starred', name: 'Starred', stateKey: 'starredGists' }
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

onBeforeMount(() => {
  gistStore.fetchGists()
})

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

const setQuery = (query) => {
  router.replace({ query: { ...route.query, ...query } })
}
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
            @update:selected="setQuery({ type: $event[0].id })"
          />

          <span class="h-4 border-l text-gray-300" />

          <InputTagFilters
            :options="visibilityOptions"
            :selected="selectedVisibility ? [selectedVisibility] : []"
            exclusive
            @update:selected="setQuery({ visibility: $event[0]?.id || null })"
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

      <div class="rounded-lg bg-gray-100 p-9 shadow-sm">
        <!-- TODO: charts -->
      </div>
    </main>
  </div>
</template>
