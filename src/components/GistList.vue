<script setup>
import ContainerCard from '@/components/ContainerCard.vue'
import GistListItem from '@/components/GistListItem.vue'

const props = defineProps({
  gists: {
    type: Array,

    default: () => []
  }
})
</script>

<template>
  <ContainerCard>
    <GistListItem
      v-for="gist in gists"
      :key="gist.id"
      :gist="gist"
      class="border-b first:rounded-t-lg last:rounded-b-lg last:border-0"
    />
  </ContainerCard>
</template>
