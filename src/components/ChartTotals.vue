<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, PieController, ArcElement, Legend, Tooltip } from 'chart.js'
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

ChartJS.register(PieController, ArcElement, Legend, Tooltip)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
}

const data = computed(() => ({
  labels: props.totals.map((item) => item[0]),

  datasets: [
    {
      data: props.totals.map((item) => item[1]),
      backgroundColor: Array.from({ length: props.totals.length }, randomColor),
      hoverOffset: 4
    }
  ]
}))
</script>

<template>
  <Pie :options="options" :data="data" />
</template>
