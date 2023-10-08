<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, PieController, ArcElement, Title, Legend, Tooltip } from 'chart.js'
import { randomColor } from '@/utilities/randomColor'

const props = defineProps({
  totals: {
    type: Array,

    required: true,

    validator: (totals) =>
      totals.every(
        (item) =>
          Array.isArray(item) &&
          item.length === 2 &&
          typeof item[0] === 'string' &&
          Number.isFinite(item[1])
      )
  }
})

ChartJS.register(PieController, ArcElement, Title, Legend, Tooltip)

const labels = computed(() => props.totals.map((item) => item[0]))

const values = computed(() => props.totals.map((item) => item[1]))

const total = computed(() => values.value.reduce((sum, value) => sum + value, 0))

const options = computed(() => ({
  responsive: true,

  plugins: {
    title: {
      display: true,
      text: `Total: ${total.value}`,
      position: 'bottom'
    },

    legend: {
      position: 'bottom'
    }
  }
}))

const data = computed(() => ({
  labels: labels.value,

  datasets: [
    {
      data: values.value,
      backgroundColor: Array.from({ length: props.totals.length }, randomColor),
      hoverOffset: 4
    }
  ]
}))
</script>

<template>
  <Pie :options="options" :data="data" />
</template>
