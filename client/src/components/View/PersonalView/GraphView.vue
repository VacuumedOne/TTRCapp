<template>
  <v-container class="table_view">
    <h2>グラフで記録を見る</h2>
    <v-container class="condition_box">
      <div class="title">対象種目</div>
      <v-layout column>
        <v-flex>
          <div>種目のグループ</div>
          <record-group-select
            v-model="selected_group"
            @input="selectGroup"
          ></record-group-select>
        </v-flex>
        <v-flex v-if="group_selected_flg">
          <div>種目</div>
          <record-item-select
            v-model="selected_item"
            :group_id="selected_group_id"
            @input="selectItem"
            ></record-item-select>
        </v-flex>
      </v-layout>
      <v-btn color="error" 
        :disabled="selected_item===null" 
        @click="updateGraph"
      >
        グラフをつくる！
      </v-btn>
    </v-container>
    <div class="graph_box">
      <!-- <pre>{{plane_data}}</pre>
      <pre>{{chartdata.datasets[0].data}}</pre> -->
      
      <line-chart
        v-if="graph_disp_flg"
        class="chart"
        :data="chartdata"
        :options="options"
      ></line-chart>
      <div v-else>上のメニューより種目を入力してください。</div>
    </div>
    
  </v-container>
</template>

<script>
import LineChart from '@/components/Chart/LineChart'
import RecordItemSelect from '@/components/Input/RecordItemSelect'
import RecordGroupSelect from '@/components/Input/RecordGroupSelect'
import Convert from '@/util/js/Convert'

import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = true

export default {
  name: 'GraphView',
  props: {
    loginUser: Object
  },
  data: () => {
    return {
      group_selected_flg: false,
      item_selected_flg: false,
      graph_disp_flg: true,
      plane_data: [],
      graph_data: [],
      graph_label: '',
      data_format: '',
      selected_group: null,
      selected_group_id: null,
      selected_item: null,
      chartdata: {
        datasets: [
          {
            label: '2000m',
            borderColor: '#f87979',
            fill: false,
            data: []
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: '実施日'
            },
            ticks: {
              callback: (label) => {
                return ''
              }
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: '記録'
            },
            ticks: {
              callback: function (label) {
                return ''
              }
            }
          }]
        },
        elements: {
          line: {
            tension: 0 // disables bezier curves
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        // responsive: true,
        maintainAspectRatio: true
      },
      convert: Convert
    }
  },
  methods: {
    selectGroup: function () {
      this.selected_group_id = this.selected_group.id
      this.selected_item = null
      this.group_selected_flg = true
      this.item_selected_flg = false
    },
    selectItem: function () {
      this.item_selected_flg = true
    },
    updateGraph: async function () {
      this.graph_disp_flg = false
      let res =
        await axios
          .post('/record/search/api', {
            user_id: this.loginUser.id,
            item_id: this.selected_item.id,
            order: ['date']
          })
      if (res.status === 200) {
        this.graph_disp_flg = true
        this.plane_data = res.data
      } else {
        return
      }
      this.dataPreprocess()
      this.chartdata.datasets[0].data = this.graph_data
      this.chartdata.datasets[0].label = this.graph_labe
      this.options.scales.xAxes[0].ticks.callback = (label) => {
        return this.convert.convert_date(new Date(label))
      }
      this.options.scales.yAxes[0].ticks.callback = (label) => {
        return this.convert.convert_result(label, this.data_format)
      }
      this.graph_disp_flg = true
    },
    dataPreprocess: function () {
      let points = []
      for (let data of this.plane_data) {
        let point = {}
        point.x = new Date(data.date)
        point.y = data.result
        points.push(point)
      }
      this.graph_label = this.plane_data[0].RecordItem.RecordGroup.group_name + '/' + this.plane_data[0].RecordItem.item_name
      this.data_format = this.plane_data[0].RecordItem.format
      this.graph_data = points
    }
  },
  components: {
    'line-chart': LineChart,
    'record-group-select': RecordGroupSelect,
    'record-item-select': RecordItemSelect
  }
}
</script>

<style lang="sass" scoped>
.chart
  padding: 50px
.condition_box
  border: solid 2px green
  background-color: lightgreen
  margin-bottom: 30px
.graph_box
  overflow: scroll

</style>
