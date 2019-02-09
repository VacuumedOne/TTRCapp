<template>
  <md-card class="sidebar">
    <md-card-header>
      <div>MENU</div>
    </md-card-header>
    <md-card-content>
      <md-card md-with-hover class="button">
        年間予定(未)
      </md-card>
      <md-card md-with-hover class="button">
        ユーザ管理(未)
      </md-card>
      <md-card md-with-hover class="button">
        メニュー管理(未)
      </md-card>
      <md-card md-with-hover class="button">
        Wiki(未)
      </md-card>
    </md-card-content>
  </md-card>
</template>

<script>
export default {

}
</script>

<style lang="sass" scoped>
$main: #333
$accent: #EEE

.sidebar
  background-color: $main
  color: $accent
.button
  width: 86%
  padding: 7%
  margin: 7%
  background-color: $accent
  color: $main
</style>
