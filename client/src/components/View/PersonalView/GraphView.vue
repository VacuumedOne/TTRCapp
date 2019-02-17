<template>
  <v-container class="table_view">
    <h2>グラフで記録を見る</h2>
    <line-chart
      class="chart"
      :data="chartdata"
      :options="options"
    ></line-chart>
  </v-container>
</template>

<script>
import LineChart from '@/components/Chart/LineChart'

export default {
  name: 'GraphView',
  props: {
    loginUser: Object
  },
  data: () => {
    return {
      chartdata: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40]
          }
        ]
      },
      options: {
        elements: {
          line: {
            tension: 0.1 // disables bezier curves
          }
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            top: 20,
            bottom: 20
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  components: {
    'line-chart': LineChart
  }
}
</script>

<style lang="sass" scoped>
.chart
  padding: 50px
</style>
