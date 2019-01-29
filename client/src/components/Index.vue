<template>
  <div class="index">
    <!-- サイドメニュー -->
    <side-bar class="sidebar"></side-bar>

    <!-- メインタブ -->
    <div class="main">
      <main-tab class="main-tab"></main-tab>
    </div>
  </div>
</template>

<script>
import MainTab from './Index/MainTab'
import SideBar from './Index/SideBar'

export default {
  name: 'Index',
  components: {
    'main-tab': MainTab,
    'side-bar': SideBar
  }
}
</script>

<style lang="sass" scoped>
.index
  text-align: left
  height: 100%
  width: 100%
  margin: 0px
  display: table
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
