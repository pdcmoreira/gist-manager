<template>
  <div class="relative rounded-lg border border-gray-100 bg-white shadow-md">
    <slot />

    <div class="absolute -right-3 -top-3">
      <slot name="corner-actions" />
    </div>
  </div>
</template>
