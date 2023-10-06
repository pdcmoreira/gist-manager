<script setup>
import { computed, onBeforeMount } from 'vue'
import { useGistStore } from '@/stores/gist'
import ContainerCard from '@/components/ContainerCard.vue'
import FadeTransition from '@/components/FadeTransition.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import InputButton from '@/components/InputButton.vue'
import GistDetails from '@/components/GistDetails.vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import BackToListButton from '@/components/BackToListButton.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },

  listType: {
    type: String,
    default: null
  },

  listVisibility: {
    type: String,
    default: null
  }
})

const gistStore = useGistStore()

onBeforeMount(() => {
  gistStore.fetchDetails(props.id)
})

const isLoading = computed(() => gistStore.loadings.includes(`gist-details-${props.id}`))

const details = computed(() => gistStore.gistsDetails.find((gist) => gist.id === props.id))

const backToListRoute = computed(() => ({
  name: 'gists',
  query: { type: props.listType, visibility: props.listVisibility }
}))
</script>

<template>
  <div>
    <BackToListButton class="mb-4" />

    <ContainerCard>
      <FadeTransition>
        <LoadingSpinner v-if="isLoading" padded />

        <div v-else-if="!details" class="flex justify-center px-10 py-24 text-lg">
          <span>Sorry, this gist is currently not available!</span>

          <span class="ml-2">😢</span>
        </div>

        <GistDetails v-else :details="details" />
      </FadeTransition>

      <template #corner-actions>
        <InputButton icon :to="{ name: 'gist-edit', params: { id } }">
          <IconPencil />
        </InputButton>
      </template>
    </ContainerCard>
  </div>
</template>
