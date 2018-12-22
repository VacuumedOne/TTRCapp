<template>
  <div id="index">
    <!-- サイドメニュー -->

    <!-- ヘッダー(メニュー起動ボタンとロゴ等) -->

    <!-- メインタブ -->
    <main-tab class="main-tab"></main-tab>
  </div>
</template>

<script>
import MainTab from './Index/MainTab'

export default {
  name: 'Index',
  components: {
    'main-tab': MainTab
  }
}
</script>

<style lang="sass" scoped>
#index
  margin-top: 100px
</style>
