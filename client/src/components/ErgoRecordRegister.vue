<template>
  <div class="ergo-register">
    <div class="box">
      <h2>エルゴを記録</h2>
      <record-item-select></record-item-select>
    </div>
  </div>
</template>

<script>
import RecordItemSelect from './Input/RecordItemSelect'
export default {
  name: 'ErgoRegister',
  components: {
    'record-item-select': RecordItemSelect
  }
}
</script>

<style lang="sass" scoped>
.ergo-register
  background-color: #FEE
  height: 100%
  text-align: center
  padding-top: 100px
.box
  display: inline-block
  width: 300px
  backgroun-color: #EEE
</style>
