<script setup>
import AppLogo from '@/components/AppLogo.vue'

defineProps({
  transparent: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <header
    class="z-50 rounded-lg px-5 py-4"
    :class="{
      'border border-gray-100 bg-white shadow-md': !transparent
    }"
  >
    <nav class="flex items-center justify-between">
      <RouterLink :to="{ name: 'home' }">
        <AppLogo />
      </RouterLink>

      <slot />
    </nav>
  </header>
</template>
