<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="sm:max-w-6xl p-4 sm:p-10 mx-auto">
    <NavBar class="mb-4 sm:mb-10" />

    <RouterView />
  </div>
</template>
