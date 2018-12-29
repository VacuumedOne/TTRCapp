<template>
  <div class="ergo_register_button">
    <div>
      <span class="text1">エルゴ</span>
      <span class="text2">を</span>
    </div>
    <div>
      <span class="text3">記録する</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ErgoRegisterButton'
}
</script>

<style lang="sass" scoped>
.ergo_register_button
  width: 240px
  height: 100px
  display: inline-block
  text-decoration: none
  background-color: #FEE
  border: solid 2px orange
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29)
.text1
  text-decoration: none
  font-size: 30px
  font-family: ''
.text2
  font-size: 25px
.text3
  font-size: 25px
</style>
