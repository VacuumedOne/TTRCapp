<template>
  <v-container class="recent_records">
    <h2>表で記録を見る</h2>
    <v-container class="condition_box">
      <div class="title">表示する項目</div>
      <v-layout column>
        <v-flex>
          <div>種目のグループは？</div>
          <record-group-select
            v-model="selected_group"
            v-on:input="changeGroup"
          ></record-group-select>
        </v-flex>
        <v-flex v-if="selected_group_id!==null">
          <div>種目は？</div>
          <record-item-select
            v-model="selected_item"
            :group_id="selected_group_id"
            ></record-item-select>
        </v-flex>
      </v-layout>
    </v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-3"
    >
      <template slot="items" slot-scope="props">
        <td class="caption">{{ props.item.group_name }}<br>{{ props.item.item_name }}</td>
        <td>{{ props.item.result }}</td>
        <td class="caption">{{ props.item.date }}</td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import RecordItemSelect from '@/components/Input/RecordItemSelect'
import RecordGroupSelect from '@/components/Input/RecordGroupSelect'

import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = true

export default {
  name: 'RecentRecords',
  props: {
    loginUser: Object
  },
  data: () => {
    return {
      plane_data: [],
      headers: [
        {text: '種目名', align: 'center', sortable: false, value: 'item_name'},
        {text: '記録', align: 'center', sortable: false, value: 'result'},
        {text: '記録日', align: 'center', sortable: false, value: 'date'}
      ],
      items: [ //ダミーデータ
        {
          id: 1,
          group_name: 'ダミー',
          item_name: '2000m',
          date: '2019-02-01'
        },
        {
          id: 2,
          group_name: 'ダミー',
          item_name: '10分',
          date: '2019-02-02'
        }
      ],
      selected_group: null,
      selected_group_id: null,
      selected_item: null
    }
  },
  methods: {
    formatDate: function (date) {
      let formated = ''
      formated += date.getFullYear() + '/'
      formated += (date.getMonth() + 1) + '/'
      formated += date.getDate()
      return formated
    },
    changeGroup: function () {
      console.log(this.selected_group)
      this.selected_group_id = this.selected_group.id
    }
  },
  watch: {
    plane_data: function () {
      this.items = []
      for (let data of this.plane_data) {
        let processed = {}
        processed.id = data.id
        processed.group_name = data.RecordItem.RecordGroup.group_name
        processed.item_name = data.RecordItem.item_name
        processed.result = data.result + data.RecordItem.unit
        processed.date = data.date.substr(0, 10)
        this.items.push(processed)
      }
    }
  },
  mounted: async function () {
    let res = 
      await axios.post('/record/search/api', {user_id: this.loginUser.id})
    if (res.status === 200) {
      this.plane_data = res.data
    }
  },
  components: {
    'record-group-select': RecordGroupSelect,
    'record-item-select': RecordItemSelect
  }
}
</script>

<style lang="sass" scoped>
</style>
