<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: 'sm',
    validator: (value) => ['sm', 'xl'].includes(value)
  },

  padded: {
    type: Boolean,
    default: false
  }
})

const sizeMap = {
  sm: 'h-5 w-5',
  xl: 'h-20 w-20'
}

const classes = computed(() => [sizeMap[props.size], { 'mx-auto my-24': props.padded }])
</script>

<template>
  <svg
    class="animate-spin text-gray-400"
    :class="classes"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <!--
      Shamelessly copied from Tailwind's docs:
      https://tailwindcss.com/docs/animation#spin
    -->
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>
