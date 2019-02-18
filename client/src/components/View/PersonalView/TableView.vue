<template>
  <v-container class="recent_records">
    <h2>表で記録を見る</h2>
    <v-container class="condition_box">
      <v-layout row wrap>
        <v-flex class="condition">
          <div class="title">表示する項目</div>
          <v-layout column>
            <v-flex>
              <div>種目のグループを選んでください</div>
              <record-group-select
                v-model="selected_group"
                @input="changeGroup"
              ></record-group-select>
            </v-flex>
            <v-flex v-if="selected_group_id!==null">
              <div>種目はを選んでください</div>
              <record-item-select
                v-model="selected_item"
                :group_id="selected_group_id"
                ></record-item-select>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex class="order">
          <div class="title">表示する順序</div>
          <v-layout column>
            <v-flex>
              <div>順序を選んでください</div>
              <div></div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-btn color="error" v-if="selected_item!==null" @click="updateTable">表をつくる！</v-btn>
    </v-container>
    <v-data-table
      v-if="table_disp_flg"
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
    <div v-else>上のメニューより、条件,順序を入力してください。</div>
  </v-container>
</template>

<script>
import RecordItemSelect from '@/components/Input/RecordItemSelect'
import RecordGroupSelect from '@/components/Input/RecordGroupSelect'

import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = true

let update = async function () {
  let res = 
    await axios
      .post('/record/search/api', {
        user_id: this.loginUser.id,
        item_id: this.selected_item.id
      })
  if (res.status === 200) {
    this.table_disp_flg = true
    this.plane_data = res.data
  }
}

export default {
  name: 'RecentRecords',
  props: {
    loginUser: Object
  },
  data: () => {
    return {
      table_disp_flg: false,
      plane_data: [],
      headers: [
        {text: '種目名', align: 'center', sortable: false, value: 'item_name'},
        {text: '記録', align: 'center', sortable: false, value: 'result'},
        {text: '記録日', align: 'center', sortable: false, value: 'date'}
      ],
      items: [
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
      this.selected_group_id = this.selected_group.id
      this.selected_item = null
    },
    updateTable: update
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
  components: {
    'record-group-select': RecordGroupSelect,
    'record-item-select': RecordItemSelect
  }
}
</script>

<style lang="sass" scoped>
.condition_box
  border: solid 2px green
  background-color: lightgreen
  margin-bottom: 30px
.order
  margin-top: 20px
</style>
