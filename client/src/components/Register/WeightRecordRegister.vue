<template>
  <div class="weight_register">
    <div class="card elevation-5">
      <h2 class="display-1">ウェイトを記録</h2>
      <div class="item">
        <span>種目を選ぶ</span>
        <record-item-select
          group_name="ウェイト"
          v-model="form.record_item"></record-item-select>
      </div>
      <div class="item">
        <span>1セット目の重量を入力(例:52.5kg)</span>
        <number-result-form :default="form.result" v-model="form.result" ></number-result-form>
      </div>
      <div class="item checkbox">
        <v-checkbox v-model="ext_col_disp_flg" color="indigo" label="さらに入力する"></v-checkbox>
      </div>
      <div class="item" v-if="ext_col_disp_flg">
        <span>1セット目の回数</span>
        <el-input-number
          class="number_form"
          v-model="form.reps"
          size="medium"
          :min="1"
          :max="100"></el-input-number>
      </div>
      <div class="item" v-if="ext_col_disp_flg">
        <span>実施日を入れる(当日入力の場合は自動で設定されます)</span>
        <date-picker
          v-model="form.date"
          type="date">
        </date-picker>
      </div>
      <template v-for="(error, index) in err">
        <v-alert type="error" :value="err_disp_flg" :key="index">
          {{error}}
        </v-alert>
      </template>
      <v-btn class="button" color="error" v-on:click="submitRecord">記録を送信！</v-btn>
      <v-dialog
        v-model="success_disp_flg"
        width="400"
        persistent
      >
        <v-card>
          <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              登録に成功しました。
            </v-card-title>
            <v-card-text width="300">
              <v-list dense>
                <v-list-tile v-if="form.record_item!==null">
                  <v-list-tile-content class="headline">種目:</v-list-tile-content>
                  <v-list-tile-content class="align-end headline">
                    {{form.record_item.item_name}}
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content class="headline">記録:</v-list-tile-content>
                  <v-list-tile-content class="align-end headline">
                    {{form.result}}kg
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="ext_col_disp_flg">
                  <v-list-tile-content class="headline">レート:</v-list-tile-content>
                  <v-list-tile-content class="align-end headline">
                    {{form.reps}}
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content class="headline">実施日:</v-list-tile-content>
                  <v-list-tile-content class="align-end headline">
                    {{form.date}}
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="sendToParent"
              >
                OK
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="failure_disp_flg"
        width="400"
      >
        <v-card>
          <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              登録に失敗しました。
            </v-card-title>
            <v-card-text width="300">
              通信状況を確かめて、再度試してください。
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="failure_disp_flg=false"
              >
                OK
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import RecordItemSelect from '@/components/Input/RecordItemSelect'
import DatePicker from '@/components/Input/DatePicker'
import TimeResultForm from '@/components/Input/TimeResultForm'
import NumberResultForm from '@/components/Input/NumberResultForm'

import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = true

export default {
  name: 'WeightRecordRegister',
  props: ['loginUser'],
  data: () => {
    return {
      ext_col_disp_flg: false, //拡張項目表示フラグ
      success_disp_flg: false,
      failure_disp_flg: false,
      err_disp_flg: false,
      form: {
        record_item: null,
        result: 50,
        reps: 10,
        date: new Date()
      },
      err: [],
      env: process.env.VUE_APP_SERVER_URL_BASE,
      checked: true,
      submit_body: null
    }
  },
  methods: {
    beforeSubmit: function () {
      let body = {}
      let err = []

      if (this.form.record_item !== null) {
        body.item_id = this.form.record_item.id
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
      if (this.loginUser !== null) {
        body.player_id = this.loginUser.id
        body.registerer_id = this.loginUser.id
      } else {
        err.push('ユーザ情報が取得できませんでした')
      }
      if (this.ext_col_disp_flg) {
        let extend = {}
        if (this.form.reps !== null) {
          extend.reps = this.form.reps
        }
        body.extends = extend
      }
      this.err = err
      this.submit_body = body
    },
    submitRecord: async function () {
      this.beforeSubmit()
      //エラーがあれば止める
      if (this.err.length > 0) {
        this.err_disp_flg = true
      } else {
        let res = await axios.post('/record/register/api', this.submit_body)
        if (res.status === 200) {
          this.success_disp_flg = true
        } else {
          this.failure_disp_flg = true
        }
      }
    },
    sendToParent: function () {
      this.$emit('send', 'top')
    }
  },
  components: {
    'record-item-select': RecordItemSelect,
    'date-picker': DatePicker,
    'time-result-form': TimeResultForm,
    'number-result-form': NumberResultForm
  }
}
</script>

<style lang="sass" scoped>
.card
  display: flex
  flex-direction: column
  justify-content: start
  align-items: center
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
  display: inline-block
</style>
