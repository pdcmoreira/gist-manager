<script setup>
import { computed, onMounted } from 'vue'
import { useGistStore } from '@/stores/gist'
import ContainerCard from '@/components/ContainerCard.vue'
import InputButton from '@/components/InputButton.vue'
import GistList from '@/components/GistList.vue'

const gistStore = useGistStore()

onMounted(() => {
  gistStore.fetchGists()
})

const displayGists = computed(() => gistStore.allGists)

const isLoading = computed(() => gistStore.loadings.includes('gists'))
</script>

<template>
  <main class="grid grid-cols-1 gap-4 sm:gap-10 md:grid-cols-3">
    <div class="md:col-span-2">
      <div v-if="isLoading">
        <!-- TODO: proper loading -->
        Loading...
      </div>

      <GistList v-else :gists="displayGists" />
    </div>

    <div class="rounded-lg bg-gray-100 p-9 shadow-sm">
      <!-- TODO: charts -->
    </div>
  </main>
</template>
