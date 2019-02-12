<template>
  <div class="ergo-register">
    <div class="card elevation-5">
      <h2>エルゴを記録</h2>
      <div class="item">
        <span>種目を選ぶ</span>
        <record-item-select
          v-bind:group_id="3"
          v-model="form.record_item_id"></record-item-select>
      </div>
      <div class="item">
        <span>アベレージタイムを入力(例:1:50.0)</span>
        <time-result-form :default="form.result" v-model="form.result" ></time-result-form>
      </div>
      <div class="item checkbox">
        <v-checkbox v-model="ext_col_disp_flg" color="indigo" label="さらに入力する"></v-checkbox>
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
          エルゴの種類
          <v-radio-group v-model="form.type">
            <v-radio
              label="ノーマル"
              value="normal"
            ></v-radio>
            <v-radio
              label="ダイナミック"
              value="dinamic"
            ></v-radio>
          </v-radio-group>
        </div>
        <div class="item">
          <span>実施日を入れる(当日入力の場合は自動で設定されます)</span>
          <date-picker
            v-model="form.date"
            type="date">
          </date-picker>
        </div>
      </div>
      <v-template v-for="(error, index) in err" :key="index">
        <v-alert type="error" :value="err_disp_flg">{{error}}</v-alert>
      </v-template>
      <el-button class="button" type="danger" v-on:click="submitRecord">記録を送信！</el-button>
      <el-dialog
        title="記録の送信"
        :visible.sync="dialog_disp_flg"
        width="30%">
        <span>{{ submit_body }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialog_disp_flg=false">確認</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import RecordItemSelect from '@/components/Input/RecordItemSelect'
import ResultForm from '@/components/Input/ResultForm'
import Submit from '@/components/Input/Submit'
import DatePicker from '@/components/Input/DatePicker'
import TimeResultForm from '@/components/Input/TimeResultForm'
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
        result: '1:50.0',
        rate: 20,
        type: 'normal',
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
        console.log(this.form.record_item_id)
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
        if (this.form.type !== null) {
          extend.type = this.form.type
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
    'date-picker': DatePicker,
    'time-result-form': TimeResultForm
  }
}
</script>

<style lang="sass" scoped>
.ergo-register
.card
  display: flex
  flex-direction: column
  justify-items: start
  border: solid 2px #fd7e00
  background-color: #ffa905
.item
  margin: 30px
  display: flex
  flex-direction: column
  justify-content: center
.button
  margin: 30px
  max-width: 150px
.checkbox
  width: 200px
</style>
