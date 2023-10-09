<script setup>
import { ref, computed } from 'vue'
import ChartTotals from '@/components/ChartTotals.vue'

const props = defineProps({
  gist: {
    type: Object,
    required: true
  }
})

const start = ref(null)
const end = ref(null)

const filteredHistory = computed(() =>
  props.gist.history.filter((entry) => {
    const entryDate = new Date(entry.committed_at)

    return (
      (!start.value || entryDate >= new Date(start.value)) &&
      (!end.value || entryDate <= new Date(end.value))
    )
  })
)

const totals = computed(() => {
  const entryYears = filteredHistory.value
    .map((entry) => new Date(entry.committed_at).getFullYear())
    .sort((a, b) => a - b)

  const entriesPerYear = entryYears.reduce((result, year) => {
    if (result[year] === undefined) {
      result[year] = 0
    }

    result[year]++

    return result
  }, {})

  return Object.entries(entriesPerYear)
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="mb-4 font-semibold">Revisions</div>

    <div class="mb-4 flex w-full items-center justify-center gap-2">
      <input
        type="date"
        v-model="start"
        class="rounded border px-2 py-1 hover:border-blue-200 focus:border-blue-400 focus:outline-none"
      />

      <span>&LeftArrowRightArrow;</span>

      <input
        type="date"
        v-model="end"
        class="rounded border px-2 py-1 hover:border-blue-200 focus:border-blue-400 focus:outline-none"
      />
    </div>

    <div>
      <ChartTotals v-if="totals.length" :totals="totals" />

      <div class="italic" v-else>There are no revisions in the selected range.</div>
    </div>
  </div>
</template>
