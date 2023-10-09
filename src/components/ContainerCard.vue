<template>
  <div class="relative rounded-lg border border-gray-100 bg-white shadow-md">
    <div class="w-full">
      <slot />
    </div>

    <div class="absolute -right-3 -top-3">
      <slot name="corner-actions" />
    </div>
  </div>
</template>
