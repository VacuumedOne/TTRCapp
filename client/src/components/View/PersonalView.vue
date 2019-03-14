<template>
  <div class="personal_view">
    <v-btn @click="gotoRecendRecords">最近のログ</v-btn>
    <v-btn @click="gotoTableView">表で記録を見る</v-btn>
    <v-btn @click="gotoGraphView">グラフで記録を見る</v-btn>
    <recent-records
      v-if="this.state==='recent-records'"
      :login-user="loginUser"
    ></recent-records>
    <table-view
      v-if="this.state==='table-view'"
      :login-user="loginUser"
    ></table-view>
    <graph-view
      v-if="this.state==='graph-view'"
      :login-user="loginUser"
    ></graph-view>
  </div>
</template>

<script>
import RecentRecords from '@/components/View/PersonalView/RecentRecords'
import TableView from '@/components/View/PersonalView/TableView'
import GraphView from '@/components/View/PersonalView/GraphView'

export default {
  name: 'PersonalView',
  props: {
    loginUser: Object
  },
  data: () => {
    return {
      state: 'recent-records'
    }
  },
  methods: {
    gotoRecendRecords: function () {
      this.state = 'recent-records'
    },
    gotoTableView: function () {
      this.state = 'table-view'
    },
    gotoGraphView: function () {
      this.state = 'graph-view'
    },
    sendToParent: function () {
      this.$emit('send', 'Top')
    }
  },
  components: {
    'recent-records': RecentRecords,
    'table-view': TableView,
    'graph-view': GraphView
  }
}
</script>

<style lang="sass" scoped>
.menu-item
  font-size: 30px
.menu-title
  font-size: 20px
</style>
