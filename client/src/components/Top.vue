<template>
  <div class="top">
    <!-- ヘッダー -->

    <!-- サイドメニュー -->
    <side-bar class="sidebar"></side-bar>
    <!-- メインタブ -->
    <div class="main">
      <main-tab
        class="main-tab"
        v-on:send="sendToParent"
        ></main-tab>
    </div>
  </div>
</template>

<script>
import MainTab from './Index/MainTab'
import SideBar from './Index/SideBar'

export default {
  name: 'Top',
  methods: {
    sendToParent: function (data) {
      //親に遷移したいstateを送る
      this.$emit('send', data)
    }
  },
  components: {
    'main-tab': MainTab,
    'side-bar': SideBar
  }
}
</script>

<style lang="sass" scoped>
.top
  text-align: left
  display: table
  height: 100vh
  width: 100vw
  margin: 0px
.sidebar
  display: table-cell
  width: 300px
  height: 100%
  vertical-align: top
.main
  display: table-cell
  height: 100%
  text-align: center
  vertical-align: middle
</style>
