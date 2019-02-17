<template>
  <v-container class="recent_records">
    <h2>最近のログ</h2>
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
        },
        {
          id: 3,
          group_name: 'ダミー',
          item_name: 'ベンチプレス',
          date: '2019-02-03'
        },
        {
          id: 4,
          group_name: 'ダミー',
          item_name: 'スクワット',
          date: '2019-02-03'
        },
        {
          id: 5,
          group_name: 'ダミー',
          item_name: 'デッドリフト',
          date: '2019-02-03'
        }
      ]
    }
  },
  methods: {
    formatDate: function (date) {
      let formated = ''
      formated += date.getFullYear() + '/'
      formated += (date.getMonth() + 1) + '/'
      formated += date.getDate()
      return formated
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
  }
}
</script>

<style lang="sass" scoped>
</style>
