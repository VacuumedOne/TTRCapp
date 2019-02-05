<template>
  <div class="ergo-register">
    <md-content class="md-primary card" md-theme="green-card">
      <h2>エルゴを記録</h2>
      <div class="item">
        <span>種目を選ぶ</span>
        <record-item-select
          v-bind:group_id="3" v-model="form.record_item_id"></record-item-select>
      </div>
      <div class="item">
        <span>アベレージタイムを入力(例:1:50.0)</span>
        <result-form v-model="form.result"></result-form>
      </div>
      <div>
        さらに入力する
        <v-ons-switch v-model="ext_col_disp_flg"></v-ons-switch>
      </div>
      <div class="ext_col" v-show="ext_col_disp_flg">
        <div class="item">
          <span>レート(stroke/min)</span>
          <el-input-number
            class="number_form"
            size="medium"
            :min="1"
            :max="100"></el-input-number>
        </div>
        <div class="item">
          <span>トータルタイムを追加</span>
          <result-form></result-form>
        </div>
        <div class="item">
          ダイナミックエルゴで漕いだ
          <v-ons-switch input-id="switch1"
            v-model="checked"
          ></v-ons-switch>
        </div>
        <div class="item">
          <span>実施日を入れる(当日入力の場合は自動で設定されます)</span>
          <el-date-picker
            v-model="value2"
            type="date"
            placeholder="実施日"
            :picker-options="pickerOptions1">
          </el-date-picker>
        </div>
      </div>
      <el-button class="button" type="danger">記録を送信！</el-button>
      {{form}}
    </md-content>
  </div>
</template>

<script>
import RecordItemSelect from '@/components/Input/RecordItemSelect'
import ResultForm from '@/components/Input/ResultForm'
import Submit from '@/components/Input/Submit'
export default {
  name: 'ErgoRecordRegister',
  data: () => {
    return {
      ext_col_disp_flg: false,
      form: {
        record_item_id: -1,
        result: ''
      },
      env: process.env.VUE_APP_SERVER_URL_BASE,
      checked: true,
      func: function () {
        return process.env
      }
    }
  },
  components: {
    'record-item-select': RecordItemSelect,
    'result-form': ResultForm,
    'submit': Submit
  }
}
</script>

<style lang="sass" scoped>
.ergo-register
  height: 100%
  text-align: center
  vertical-align: middle
.card
  display: inline-block
  width: 500px
  background-color: springgreen
.item
  margin: 30px
.button
  margin: 30px
</style>
