<template>
  <v-container class="recent_records">
    <h2>表で記録を見る</h2>
    <v-container class="condition_box">
      <v-layout row wrap>
        <v-flex class="condition">
          <div class="title">検索条件</div>
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
        </v-flex>
        <v-flex class="order">
          <div class="title">並べ方</div>
          <v-layout column>
            <v-flex>
              <order-select v-model="order_column"></order-select>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-btn color="error" :disabled="selected_item===null" @click="updateTable">表をつくる！</v-btn>
    </v-container>
    <v-data-table
      v-if="table_disp_flg"
      :headers="headers"
      :items="records"
      class="elevation-3"
    >
      <template slot="items" slot-scope="props">
        <td class="caption">{{ props.item.group_name }}<br>{{ props.item.item_name }}</td>
        <td>{{ props.item.result }}</td>
        <td class="caption">{{ props.item.date }}</td>
      </template>
    </v-data-table>
    <div v-else>上のメニューより、条件,順序を入力してください。</div>
  </v-container>
</template>

<script>
import RecordItemSelect from '@/components/Input/RecordItemSelect'
import RecordGroupSelect from '@/components/Input/RecordGroupSelect'
import OrderSelect from '@/components/Input/OrderSelect'
import Convert from '@/util/js/Convert'

import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = false

export default {
  name: 'RecentRecords',
  props: {
    loginUser: Object
  },
  data: () => {
    return {
      group_selected_flg: false,
      item_selected_flg: false,
      table_disp_flg: false,
      plane_data: [],
      records: [],
      selected_group: null,
      selected_group_id: null,
      selected_item: null,
      order_column: '',
      order: [],
      headers: [
        {text: '種目名', align: 'center', sortable: false, value: 'item_name'},
        {text: '記録', align: 'center', sortable: false, value: 'result'},
        {text: '記録日', align: 'center', sortable: false, value: 'date'}
      ],
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
    beforeUpdate: function () {
      if (this.order_column !== '') {
        this.order = []
        // orderには対象にするカラム名と、降順かどうかの情報を入れる(昇順の場合省略可)
        // 例)['result', 'DESC']
        this.order.push(this.order_column)
        // 結果順の時、
        // 記録フォーマットがgであれば降順
        if (this.order_column === 'result' && this.selected_item.format === 'g') {
          this.order.push('DESC')
        }
        // 実施日順の時、
        // 自動的に降順(新しい順)
        if (this.order_column === 'date') {
          this.order.push('DESC')
        }
      } else {
        this.order = []
      }
    },
    updateTable: async function () {
      this.beforeUpdate()
      let res =
        await axios
          .post('/record/search/api', {
            user_id: this.loginUser.id,
            item_id: this.selected_item.id,
            order: this.order
          })
      if (res.status === 200) {
        this.table_disp_flg = true
        this.plane_data = res.data
      }
    }
  },
  watch: {
    plane_data: function () {
      this.records = []
      for (let data of this.plane_data) {
        let processed = {}
        processed.id = data.id
        processed.group_name = data.recorditem.recordgroup.group_name
        processed.item_name = data.recorditem.item_name
        processed.result = this.convert.convert_result(data.result, data.recorditem.format) + data.recorditem.unit
        processed.date = data.date.substr(0, 10)
        this.records.push(processed)
      }
    }
  },
  components: {
    'record-group-select': RecordGroupSelect,
    'record-item-select': RecordItemSelect,
    'order-select': OrderSelect
  }
}
</script>

<style lang="sass" scoped>
.condition_box
  border: solid 2px green
  background-color: lightgreen
  margin-bottom: 30px
.condition, .order
  margin-top: 20px
  margin-bottom: 20px
.title
  margin: 10px
</style>
