<script setup>
import { computed, onBeforeMount } from 'vue'
import { useGistStore } from '@/stores/gist'
import GistContainer from '@/components/GistContainer.vue'
import ContainerCard from '@/components/ContainerCard.vue'
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
</script>

<template>
  <div>
    <BackToListButton class="mb-4" />

    <GistContainer :loading="isLoading" :exists="!!details" class="text-gray-700">
      <ContainerCard>
        <GistDetails :details="details" />

        <template #corner-actions>
          <InputButton icon :to="{ name: 'gist-edit', params: { id } }">
            <IconPencil />
          </InputButton>
        </template>
      </ContainerCard>
    </GistContainer>
  </div>
</template>
