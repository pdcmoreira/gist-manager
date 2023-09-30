<script setup>
import { computed } from 'vue'

const props = defineProps({
  gist: {
    type: Object,
    required: true
  }
})

const dateDisplay = computed(() => new Date(props.gist.updated_at).toDateString())

const dateDescription = computed(() =>
  new Date(props.gist.created_at).toJSON() === new Date(props.gist.updated_at).toJSON()
    ? 'Created at'
    : 'Updated at'
)
</script>

<template>
  <div class="text-xs text-gray-500">{{ dateDescription }} {{ dateDisplay }}</div>
</template>
