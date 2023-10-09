<script setup>
import { watch, toRaw } from 'vue'
import InputTag from '@/components/InputTag.vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator: (options) => options.length
  },

  selected: {
    type: Array,
    default: () => []
  },

  exclusive: {
    type: Boolean,
    default: false
  },

  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:selected'])

const emitUpdate = (selected) => {
  emit('update:selected', selected)
}

watch(
  () => props.required,
  (required) => {
    if (required && !props.selected.length) {
      emitUpdate([props.options[0]])
    }
  },
  { immediate: true }
)

const optionClick = (option) => {
  const selected = [...toRaw(props.selected)]

  const index = selected.indexOf(option)

  // Deselect
  if (index >= 0) {
    // When required, don't allow deselecting last item
    if (props.required && selected.length === 1) {
      return
    }

    selected.splice(index, 1)

    emitUpdate(selected)

    return
  }

  // Select
  if (props.exclusive) {
    emitUpdate([option])

    return
  }

  emitUpdate([...selected, option])
}
</script>

<template>
  <div class="flex items-center gap-2">
    <InputTag
      v-for="option in options"
      :key="option.id"
      clickable
      :selected="selected.includes(option)"
      @click="optionClick(option)"
    >
      {{ option.name }}
    </InputTag>
  </div>
</template>
