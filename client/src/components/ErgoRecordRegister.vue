<template>
  <div class="ergo-register">
    <div class="box">
      <h2>エルゴを記録</h2>
      種目を選ぶ<record-item-select group_id="3"></record-item-select>
      アベレージタイムを入力(例:6:55.2)<result-form></result-form>
      <submit value="記録を送信！"></submit>
    </div>
  </div>
</template>

<script>
import RecordItemSelect from './Input/RecordItemSelect'
import ResultForm from './Input/ResultForm'
import Submit from './Input/Submit'
export default {
  name: 'ErgoRecordRegister',
  components: {
    'record-item-select': RecordItemSelect,
    'result-form': ResultForm,
    'submit': Submit
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
