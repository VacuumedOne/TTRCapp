<template>
  <div class="ergo-register">
    <md-content class="md-primary card" md-theme="green-card">
      <h2>エルゴを記録</h2>
      <div class="item">
        <span>種目を選ぶ</span>
        <record-item-select
          v-bind:group_id="3"
          v-model="form.record_item_id"></record-item-select>
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
            v-model="form.rate"
            size="medium"
            :min="1"
            :max="100"></el-input-number>
        </div>
        <div class="item">
          <span>トータルタイムを追加</span>
          <result-form v-model="form.total_time"></result-form>
        </div>
        <div class="item">
          ダイナミックエルゴで漕いだ
          <v-ons-switch input-id="switch1"
            v-model="form.is_dinamic"
          ></v-ons-switch>
        </div>
        <div class="item">
          <span>実施日を入れる(当日入力の場合は自動で設定されます)</span>
          <date-picker
            v-model="form.date"
            type="date">
          </date-picker>
        </div>
      </div>
      <div class="error" v-show="err_disp_flg">
        {{err}}
      </div>
      <el-button class="button" type="danger" v-on:click="submitRecord">記録を送信！</el-button>
      <el-button type="warning" v-on:click="sendToParent">戻る</el-button>
      <el-dialog
        title="記録の送信"
        :visible.sync="dialog_disp_flg"
        width="30%">
        <span>{{ submit_body }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialog_disp_flg=false">確認</el-button>
        </span>
      </el-dialog>
    </md-content>
  </div>
</template>

<script>
import RecordItemSelect from '@/components/Input/RecordItemSelect'
import ResultForm from '@/components/Input/ResultForm'
import Submit from '@/components/Input/Submit'
import DatePicker from '@/components/Input/DatePicker'
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = true

export default {
  name: 'ErgoRecordRegister',
  props: ['loginUser'],
  data: () => {
    return {
      ext_col_disp_flg: false, //拡張項目表示フラグ
      dialog_disp_flg: false,
      err_disp_flg: false,
      form: {
        record_item_id: -1,
        result: '',
        rate: 20,
        total_time: '',
        is_dinamic: false,
        date: ''
      },
      err: null,
      env: process.env.VUE_APP_SERVER_URL_BASE,
      checked: true,
      submit_body: null
    }
  },
  methods: {
    beforeSubmit: function () {
      let body = {}
      let err = []

      if (this.form.record_item_id !== -1) {
        body.item_id = this.form.record_item_id
      } else {
        err.push('種目が選択されていません')
      }
      if (this.form.result !== '') {
        body.result = this.form.result
      } else {
        err.push('結果が入力されていません')
      }
      if (this.form.date !== '') {
        body.date = this.form.date
      } else {
        err.push('日付の取得に失敗しました')
      }
      if (this.loginUser.user_id !== -1) {
        body.player_id = this.loginUser.user_id
        body.registerer_id = this.loginUser.user_id
      } else {
        err.push('ユーザ情報が取得できませんでした')
      }
      if (this.ext_col_disp_flg) {
        let extend = {}
        if (this.form.rate !== null) {
          extend.rate = this.form.rate
        }
        if (this.form.total_time !== null) {
          extend.total_time = this.form.total_time
        }
        if (this.form.is_dinamic !== null) {
          extend.is_dinamic = this.form.is_dinamic
        }
        body.extend = extend
      }
      this.err = err
      this.submit_body = body
    },
    submitRecord: async function () {
      this.beforeSubmit()
      //エラーがあれば止める
      if (this.err !== null && this.err.length > 0) {
        this.err_disp_flg = true
      } else {
        this.dialog_disp_flg = true
        await axios
          .post('/record/register/api', this.submit_body)
          .then(result => {
            console.log(result)
          }).catch(err => {
            console.error(err)
          })
      }
    },
    sendToParent: function () {
      this.$emit('send', 'top')
    }
  },
  components: {
    'record-item-select': RecordItemSelect,
    'result-form': ResultForm,
    'submit': Submit,
    'date-picker': DatePicker
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
.error
  color: red
</style>
