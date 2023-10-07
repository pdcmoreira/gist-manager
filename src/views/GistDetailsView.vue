<script setup>
import { computed, watchEffect } from 'vue'
import { useGistStore } from '@/stores/gist'
import { useIsUserGistOwner } from '@/composables/useIsUserGistOwner'
import BackToListButton from '@/components/BackToListButton.vue'
import GistContainer from '@/components/GistContainer.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import GistDetails from '@/components/GistDetails.vue'
import InputButton from '@/components/InputButton.vue'
import IconPencil from '@/components/icons/IconPencil.vue'
import GistStar from '@/components/GistStar.vue'

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

watchEffect(() => {
  gistStore.fetchDetails(props.id)
})

const isLoading = computed(() => gistStore.loadings.includes(`gist-details-${props.id}`))

const details = computed(() => gistStore.gistsDetails.find((gist) => gist.id === props.id))

const isStarred = computed(() => gistStore.starredGists.some((gist) => gist.id === props.id))

const toggleStar = async () => gistStore.updateStar(details.value, !isStarred.value)

const { isUserGistOwner } = useIsUserGistOwner(details)
</script>

<template>
  <div>
    <BackToListButton class="mb-4" />

    <GistContainer :loading="isLoading" :exists="!!details" class="text-gray-700">
      <ContainerCard>
        <GistDetails :details="details" />

        <template #corner-actions>
          <div class="flex gap-2">
            <InputButton icon @click="toggleStar">
              <GistStar :starred="isStarred" />
            </InputButton>

            <InputButton v-if="isUserGistOwner" icon :to="{ name: 'gist-edit', params: { id } }">
              <IconPencil />
            </InputButton>
          </div>
        </template>
      </ContainerCard>
    </GistContainer>
  </div>
</template>
