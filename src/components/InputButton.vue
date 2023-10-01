<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  variant: {
    type: String,

    default: null,

    validator: (value) => !value || ['primary', 'danger'].includes(value)
  },

  to: {
    type: [String, Object],
    default: null
  },

  href: {
    type: String,
    default: null
  }
})

const resolvedComponent = computed(() => {
  if (props.to) {
    return {
      is: RouterLink,

      props: {
        to: props.to
      }
    }
  }

  if (props.href) {
    return {
      is: 'a',

      props: {
        href: props.href
      }
    }
  }

  return { is: 'button' }
})
</script>

<template>
  <component
    :is="resolvedComponent.is"
    v-bind="resolvedComponent.props"
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
