<script setup>
import { computed } from 'vue'
import { useGistListStore } from '@/stores/gistList'
import InputButton from '@/components/InputButton.vue'

const gistListStore = useGistListStore()

const backToListRoute = computed(() => ({
  name: 'gists',
  query: { type: gistListStore.filters.type, visibility: gistListStore.filters.visibility }
}))
</script>

<template>
  <InputButton :to="backToListRoute">
    <span class="mr-2">&LeftArrow;</span>

    Back to list
  </InputButton>
</template>
