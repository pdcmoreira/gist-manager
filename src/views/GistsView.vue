<script setup>
import { computed, onBeforeMount } from 'vue'
import { useGistStore } from '@/stores/gist'
import FadeTransition from '@/components/FadeTransition.vue'
import ContainerCard from '@/components/ContainerCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import InputButton from '@/components/InputButton.vue'
import GistList from '@/components/GistList.vue'

const gistStore = useGistStore()

onBeforeMount(() => {
  gistStore.fetchGists()
})

const displayGists = computed(() => gistStore.allGists)

const isLoading = computed(() => gistStore.loadings.includes('gists'))
</script>

<template>
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
</template>
