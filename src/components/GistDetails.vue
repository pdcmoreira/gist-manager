<script setup>
import { computed } from 'vue'
import GistDetailDate from '@/components/GistDetailDate.vue'
import InputButton from '@/components/InputButton.vue'
import CodeBlock from '@/components/CodeBlock.vue'

const props = defineProps({
  details: {
    type: Object,
    required: true
  }
})

const files = computed(() => (props.details ? Object.values(props.details.files) : []))
</script>

<template>
  <div class="p-6 text-gray-700">
    <div class="mb-12 flex items-end justify-between border-b px-4 pb-6">
      <div :class="{ italic: !details.description }">
        {{ details.description || 'No description' }}
      </div>

      <div>
        <GistDetailDate :gist="details" />
      </div>
    </div>

    <div v-for="file in files" :key="file.filename" class="mb-12 last:mb-0">
      <div class="mb-2 flex items-end justify-between px-4 text-gray-700">
        <div class="font-mono text-sm">
          {{ file.filename }}
        </div>
      </div>

      <CodeBlock :code="file.content" />
    </div>
  </div>
</template>
