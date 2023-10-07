<script setup>
import IconStar from '@/components/icons/IconStar.vue'

defineProps({
  starred: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <IconStar :class="{ 'fill-yellow-200 text-yellow-500': starred }" />
</template>
