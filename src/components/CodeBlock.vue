<script setup>
import { computed } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: null
  }
})

const escapedCode = computed(() => props.code.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
</script>

<template>
  <div
    class="overflow-auto rounded-md border border-gray-200 bg-neutral-50 p-4 text-sm text-gray-600"
  >
    <!-- TODO: make this secure -->
    <pre><code v-html="escapedCode" /></pre>
  </div>
</template>
