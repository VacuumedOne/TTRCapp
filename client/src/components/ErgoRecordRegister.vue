<template>
  <div class="ergo-register">
    <div class="box">
      <h2>エルゴを記録</h2>
      種目を選ぶ<record-item-select group_id="3"></record-item-select>
      タイム(average)を入力<result-form></result-form>
    </div>
  </div>
</template>

<script>
import RecordItemSelect from './Input/RecordItemSelect'
import ResultForm from './Input/ResultForm'
export default {
  name: 'ErgoRecordRegister',
  components: {
    'record-item-select': RecordItemSelect,
    'result-form': ResultForm
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
  width: 500px
  backgroun-color: #EEE
</style>
