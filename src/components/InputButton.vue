<script setup>
const props = defineProps({
  variant: {
    type: String,

    default: null,

    validator: (value) => !value || ['primary', 'danger'].includes(value)
  },

  href: {
    type: String,
    default: null
  }
})
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    class="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold shadow active:shadow-inner"
    :class="variant || 'default'"
  >
    <slot />
  </component>
</template>

<style scoped>
.default {
  @apply border border-gray-50 bg-gray-50 text-gray-600 hover:bg-white active:shadow-gray-200;
}

.primary {
  @apply bg-blue-600 text-white hover:bg-blue-500 active:shadow-blue-800;
}

.danger {
  @apply bg-red-600 text-white hover:bg-red-500 active:shadow-red-800;
}
</style>
