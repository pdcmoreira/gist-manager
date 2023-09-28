<script setup>
import { RouterLink } from 'vue-router'
import AppLogo from '@/components/AppLogo.vue'
import InputButton from '@/components/InputButton.vue'
</script>

<template>
  <header class="z-50 rounded-lg border border-gray-100 bg-white px-5 py-4 shadow-md">
    <nav class="flex items-center justify-between">
      <RouterLink :to="{ name: 'home' }">
        <AppLogo />
      </RouterLink>

      <InputButton variant="primary">Get started</InputButton>
    </nav>
  </header>
</template>
