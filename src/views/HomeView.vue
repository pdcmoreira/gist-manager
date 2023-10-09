<script setup>
import { ref } from 'vue'
import AppearTransition from '@/components/AppearTransition.vue'

const showBlock = ref(0)
</script>

<template>
  <main class="px-5 text-sm text-gray-700 sm:text-lg md:text-xl lg:text-2xl">
    <AppearTransition @after-appear="showBlock++">
      <div class="my-24 grid grid-cols-3 items-center gap-4 md:gap-12 lg:my-32 lg:gap-24">
        <img src="/code.png" class="rounded-xl brightness-125 saturate-150" />

        <div class="col-span-2 my-auto">
          <h1 class="mb-4 text-2xl sm:text-3xl md:text-4xl lg:mb-10 lg:text-6xl">
            Manage your gists
          </h1>

          <p class="mb-2">Lost in GitHub's gist management pages?</p>

          <p>Maybe you just found a map!</p>
        </div>
      </div>
    </AppearTransition>

    <AppearTransition v-if="showBlock >= 1">
      <div class="grid gap-4 md:grid-cols-2 md:gap-24">
        <div class="my-auto">
          <h1 class="mb-4 text-2xl sm:text-3xl md:text-4xl lg:mb-10 lg:text-6xl">It's simple!</h1>

          <p>
            From creating and editing, to viewing and starring, manage both private and public gists
            effortlessly.
          </p>
        </div>

        <img src="/gist-list.png" class="rounded-xl" />
      </div>
    </AppearTransition>
  </main>
</template>
