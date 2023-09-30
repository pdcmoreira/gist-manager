<script setup>
import GistListItem from '@/components/GistListItem.vue'

const props = defineProps({
  gists: {
    type: Array,

    default: () => []
  }
})
</script>

<template>
  <div class="rounded-lg border border-gray-100 bg-white">
    <GistListItem
      v-for="gist in gists"
      :key="gist.id"
      :gist="gist"
      class="border-b first:rounded-t-lg last:rounded-b-lg last:border-0"
    />
  </div>
</template>
