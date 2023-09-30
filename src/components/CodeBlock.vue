<script setup>
defineProps({
  code: {
    type: String,
    default: null
  }
})
</script>

<template>
  <div
    class="overflow-auto rounded-md border border-gray-200 bg-neutral-50 p-4 text-sm text-gray-600"
  >
    <!-- TODO: make this secure -->
    <pre><code v-html="code" /></pre>
  </div>
</template>
