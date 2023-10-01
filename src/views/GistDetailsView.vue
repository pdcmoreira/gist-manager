<script setup>
import { computed, onMounted } from 'vue'
import { useGistStore } from '@/stores/gist'
import ContainerCard from '@/components/ContainerCard.vue'
import InputButton from '@/components/InputButton.vue'
import GistDetails from '@/components/GistDetails.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const gistStore = useGistStore()

onMounted(() => {
  gistStore.fetchDetails(props.id)
})

const isLoading = computed(() => gistStore.loadings.includes(`gist-details-${props.id}`))

const details = computed(() => gistStore.gistsDetails.find((gist) => gist.id === props.id))
</script>

<template>
  <div>
    <div class="mb-4">
      <InputButton :to="{ name: 'gists' }">
        <span class="mr-2">&LeftArrow;</span>

        Back to list
      </InputButton>
    </div>

    <ContainerCard>
      <div v-if="isLoading">
        <!-- TODO: proper loading -->
        Loading...
      </div>

      <div v-else-if="!details">Not found</div>

      <GistDetails v-else :details="details" />
    </ContainerCard>
  </div>
</template>
