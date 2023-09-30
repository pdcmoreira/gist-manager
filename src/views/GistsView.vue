<script setup>
import { computed, onMounted } from 'vue'
import { useGistStore } from '@/stores/gist'
import GistList from '../components/GistList.vue'

const gistStore = useGistStore()

onMounted(() => {
  gistStore.fetchGists()
})

const displayGists = computed(() => gistStore.allGists)
</script>

<template>
  <main class="grid grid-cols-1 gap-4 sm:gap-10 md:grid-cols-3">
    <div class="rounded-lg border border-gray-100 shadow-md md:col-span-2">
      <GistList :gists="displayGists" />
    </div>

    <div class="rounded-lg bg-gray-100 p-9 shadow-sm">
      <!-- TODO: charts -->
    </div>
  </main>
</template>
