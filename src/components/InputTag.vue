<script setup>
defineProps({
  clickable: {
    type: Boolean,
    default: false
  },

  selected: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <span
    class="rounded-lg border px-2 py-1 text-xs text-gray-600"
    :class="{
      'cursor-pointer hover:bg-blue-500 hover:text-white': clickable,
      'bg-blue-600 text-white': selected
    }"
  >
    <slot />
  </span>
</template>
