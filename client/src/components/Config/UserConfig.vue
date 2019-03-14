<template>
  <div class="user_config">
    <span class="title">ユーザの情報を更新する</span>
    <v-form
      lazy-validation
      v-model="form.valid"
      ref="form"
    >
      <v-sheet color="blue lighten-4 sheet">
        <div>メールアドレスを変更する</div>
        <v-text-field
          v-model="form.mail"
          outline
          class="input"
          label="メールアドレス"
          :rules="emailRules"
        ></v-text-field>
        <v-btn color="red btn" @click="updateEmail">変更</v-btn>
      </v-sheet>
      <v-sheet color="blue lighten-4 sheet">
        <div>名前を変更する</div>
        <v-text-field
          v-model="form.k_lastname"
          outline
          class="input"
          label="姓"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="form.k_firstname"
          outline
          class="input"
          label="名"
          :rules="nameRules"
          ></v-text-field>
        <v-text-field
          v-model="form.h_lastname"
          outline
          class="input"
          label="姓(ふりがな)"
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="form.h_firstname"
          outline
          class="input"
          label="名(ふりがな)"
          :rules="nameRules"
        ></v-text-field>
        <v-btn color="red btn" @click="updateName">変更</v-btn>
      </v-sheet>
      <v-sheet color="blue lighten-4 sheet">
        <div>パスワードを変更する</div>
        <v-text-field
          v-model="form.password"
          outline
          type="password"
          class="input"
          label="新しいパスワード(英数字8文字以上)"
          :rules="passwordRules"
        ></v-text-field>
        <v-text-field
          v-model="confirm"
          outline
          type="password"
          class="input"
          label="確認のため、もう一度パスワードを入力してください"
          :rules="passwordRules"
        ></v-text-field>
        <v-btn color="red btn" @click="updatePassword">変更</v-btn>
      </v-sheet>
      <v-sheet color="blue lighten-4 sheet">
        <div>役職を変更する</div>
        <v-radio-group v-model="form.auth">
          <label class="title">役職</label>
          <v-radio
            label="コックス/マネージャー"
            value="2"
          ></v-radio>
          <v-radio
            label="漕手"
            value="3"
          ></v-radio>
          <v-radio
            label="その他"
            value="4"
          ></v-radio>
        </v-radio-group>
        <v-btn color="red btn" @click="updateAuth">変更</v-btn>
      </v-sheet>
      <v-sheet color="blue lighten-4 sheet">
        <div>生年月日を変更する</div>
        <v-layout row wrap>
          <v-flex xs4 md4>
            <v-select
              :items="year_options"
              v-model="form.year"
              box
              label="年"
            ></v-select>
          </v-flex>
          <v-flex xs3 md3>
            <v-select
              :items="month_options"
              v-model="form.month"
              box
              label="月"
            ></v-select>
          </v-flex>
          <v-flex xs3 md3>
            <v-select
              :items="day_options"
              v-model="form.day"
              box
              label="日"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-btn color="red btn" @click="updateBirth">変更</v-btn>
      </v-sheet>
    </v-form>
    <v-dialog
      v-model="dialog_disp_flg"
      width="500"
      persistent
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{dialog.title}}
        </v-card-title>
        <v-card-text>
          <div class="body-2">{{err}}</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="closeDialog"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import validator from '@/util/js/Validate'

import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = false

export default {
  name: 'UserConfig',
  props: {
    'loginUser': Object
  },
  data: () => {
    return {
      form: {
        valid: false,
        k_lastname: '',
        k_firstname: '',
        h_lastname: '',
        h_firstname: '',
        new_password: '',
        old_password: '',
        confirm: '',
        mail: '',
        auth: '0',
        sex: '',
        year: '2000',
        month: '1',
        day: '1'
      },
      body: {

      },
      dialog: {
        title: '空のダイアログ',
        message: '実装までしばらくお待ちください'
      },
      nameRules: validator.nameRules,
      emailRules: validator.emailRules,
      passwordRules: validator.passwordRules,
      confirm: '',
      year_options: [],
      month_options: [],
      day_options: [],
      err: [],
      dialog_disp_flg: false,
      changes: []
    }
  },
  methods: {
    closeDialog: function () {
      this.dialog_disp_flg = false
    },
    makeArr: function (first, end) {
      if (first > end) {
        return []
      } else {
        let arr = []
        for (let i = first; i <= end; i++) {
          arr.push(i + '')
        }
        return arr
      }
    },
    beforeUpdate: function () {
      this.body = {}
    },
    updateEmail: async function () {
      this.beforeUpdate()
      if (this.form.mail !== this.loginUser.mail) {
        this.changes.push('メールアドレスが変更されました')
        this.body.mail = this.form.mail
        try {
          let res =
            await axios.post('/user/update', this.body)
          if (res.status === 200) {
            this.dialog_disp_flg = true
          } else {
            this.dialog_disp_flg = true
            this.err.push('更新に失敗しました。')
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.dialog_disp_flg = true
        this.err.push('内容が変更されていません')
      }
    },
    updateName: function () {

    },
    updatePassword: function () {

    },
    updateAuth: function () {

    },
    updateBirth: function () {

    },
    updateUser: function () {
      if (!this.form.valid) {
        //フォームに誤りがあれば失敗
        return
      }
      this.changes = []
      
      if (this.form.k_lastname !== this.loginUser.k_lastname) {
        this.changes.push('姓が変更されました')
        this.body.k_lastname = this.form.k_lastname
      }
      if (this.form.k_firstname !== this.loginUser.k_firstname) {
        this.changes.push('名が変更されました')
        this.body.k_firstname = this.form.k_firstname
      }
      if (this.form.h_lastname !== this.loginUser.h_lastname) {
        this.changes.push('姓(ひらがな)が変更されました')
        this.body.h_lastname = this.form.h_lastname
      }
      if (this.form.h_firstname !== this.loginUser.h_firstname) {
        this.changes.push('名(ひらがな)が変更されました')
        this.body.h_firstname = this.form.h_firstname
      }
      if (this.form.auth !== this.loginUser.auth) {
        this.changes.push('役職が変更されました')
        this.body.auth = this.form.auth
      }
      this.dialog_disp_flg = true
    }
  },
  mounted: function () {
    this.year_options = this.makeArr(1990, 2030)
    this.month_options = this.makeArr(1, 12)
    this.day_options = this.makeArr(1, 31)

    this.form.mail = this.loginUser.mail
    this.form.k_lastname = this.loginUser.k_lastname
    this.form.k_firstname = this.loginUser.k_firstname
    this.form.h_lastname = this.loginUser.h_lastname
    this.form.h_firstname = this.loginUser.h_firstname
    this.form.sex = this.loginUser.sex
    this.form.auth = this.loginUser.auth + ''
    this.form.year = this.loginUser.birth_ymd.substr(0, 4)
    this.form.month = Number(this.loginUser.birth_ymd.substr(5, 2)) + ''
    this.form.day = Number(this.loginUser.birth_ymd.substr(8, 2)) + ''
  }
}
</script>

<style lang="sass" scoped>
.sheet
  margin-top: 20px
  padding: 10px
  text-align: center
.input
  background-colo: white
.btn
  color: white
</style>
