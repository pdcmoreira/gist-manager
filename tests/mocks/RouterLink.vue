<script setup>
defineProps(['to'])
</script>

<template>
  <a href="#" data-test="router-link">
    <slot />
  </a>
</template>
