<template>
  <v-conteiner class="recent_records">
    <h2>最近のログ</h2>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-3"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.group_name }}</td>
        <td>{{ props.item.item_name }}</td>
        <td>{{ props.item.date }}</td>
      </template>
    </v-data-table>
  </v-conteiner>
</template>

<script>
export default {
  name: 'RecentRecords',
  props: {
    loginUser: Object
  },
  data: () => {
    return {
      headers: [
        {text: 'グループ', align: 'center', sortable: false, value: 'group_name'},
        {text: '種目名', align: 'center', sortable: false, value: 'item_name'},
        {text: '記録日', align: 'center', sortable: false, value: 'date'}
      ],
      items: [ //ダミーデータ
        {
          id: 1,
          group_name: 'エルゴ',
          item_name: '2000m',
          date: '2019-02-01'
        },
        {
          id: 2,
          group_name: 'エルゴ',
          item_name: '10分',
          date: '2019-02-02'
        },
        {
          id: 3,
          group_name: 'ウェイト',
          item_name: 'ベンチプレス',
          date: '2019-02-03'
        },
        {
          id: 4,
          group_name: 'ウェイト',
          item_name: 'スクワット',
          date: '2019-02-03'
        },
        {
          id: 5,
          group_name: 'ウェイト',
          item_name: 'デッドリフト',
          date: '2019-02-03'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
