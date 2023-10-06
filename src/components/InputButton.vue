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
  },

  disabled: {
    type: Boolean,
    default: false
  },

  icon: {
    type: Boolean,
    default: false
  }
})

const resolvedComponent = computed(() => {
  const defaultComponent = { is: 'button', props: { disabled: props.disabled } }

  if (props.disabled) {
    return defaultComponent
  }

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

  return defaultComponent
})

const classes = computed(() => [
  props.variant || 'default',
  {
    'rounded-oval p-2 [&>svg]:h-5 [&>svg]:w-5': props.icon,
    'rounded-full px-4 py-2': !props.icon,
    'opacity-60 pointer-events-none select-none': props.disabled
  }
])
</script>

<template>
  <component
    :is="resolvedComponent.is"
    v-bind="resolvedComponent.props"
    class="cursor-pointer text-sm font-semibold shadow active:shadow-inner"
    :class="classes"
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
