<script setup>
import GistListItem from './GistListItem.vue'

const props = defineProps({
  gists: {
    type: Array,

    default: () => []
  }
})
</script>

<template>
  <div>
    <GistListItem
      v-for="gist in gists"
      :key="gist.id"
      :gist="gist"
      class="border-b last:border-0"
    />
  </div>
</template>
