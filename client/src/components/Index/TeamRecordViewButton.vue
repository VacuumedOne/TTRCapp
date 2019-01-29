<template>
  <div class="team-record-view-button">
    <div>
      <span class="text1">皆の記録</span>
      <span class="text2">を</span>
    </div>
    <div>
      <span class="text3">見る</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TeamRecordViewButton'
}
</script>

<style lang="sass" scoped>
.team-record-view-button
  display: inline-block
  text-decolation: none
  background-color: #EFE
  border: solid 2px springgreen
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29)
.text1
  font-size: 30px
  font-family: ''
.text2
  font-size: 25px
.text3
  font-size: 25px
</style>
