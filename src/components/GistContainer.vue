<script setup>
import FadeTransition from '@/components/FadeTransition.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

defineProps({
  loading: {
    type: Boolean,
    default: false
  },

  exists: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <FadeTransition>
    <LoadingSpinner v-if="loading" padded />

    <div v-else-if="!exists" class="flex justify-center px-10 py-24 text-lg">
      <span>Sorry, this gist is currently not available!</span>

      <span class="ml-2">😢</span>
    </div>

    <slot v-else />
  </FadeTransition>
</template>
