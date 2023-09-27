<script setup>
import { defineProps } from 'vue'

defineProps(['to'])
</script>

<template>
  <a href="#" data-test="router-link">
    <slot />
  </a>
</template>
