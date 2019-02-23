<template>
  <div class="user_config">
    <span class="title">ユーザの情報を更新する</span>
    <v-form>
      <v-layout row wrap justify-center>
          <v-flex xs1 md3></v-flex>
          <v-flex xs10 md6>
            <v-text-field v-model="form.mail" outline class="input" label="メールアドレス" :rules="emailRules"></v-text-field>
          </v-flex>
          <v-flex xs1 md3></v-flex>
          <v-flex xs1 md2></v-flex>
          <v-flex xs5 md4>
            <v-text-field v-model="form.k_lastname" outline class="input" label="姓" :rules="nameRules"></v-text-field>
          </v-flex>
          <v-flex xs5 md4>
            <v-text-field v-model="form.k_firstname" outline class="input" label="名" :rules="nameRules"></v-text-field>
          </v-flex>
          <v-flex xs1 md2></v-flex>
          <v-flex xs1 md2></v-flex>
          <v-flex xs5 md4>
            <v-text-field v-model="form.h_lastname" outline class="input" label="姓(ふりがな)" :rules="nameRules"></v-text-field>
          </v-flex>
          <v-flex xs5 md4>
            <v-text-field v-model="form.h_firstname" outline class="input" label="名(ふりがな)" :rules="nameRules"></v-text-field>
          </v-flex>
          <v-flex xs1 md2></v-flex>
          <v-flex xs1 md3></v-flex>
          <v-flex xs10 md6>
            <v-text-field v-model="form.password" outline type="password" class="input" label="新しいパスワード(英数字8文字以上)" :rules="passwordRules"></v-text-field>
          </v-flex>
          <v-flex xs1 md3></v-flex>
          <v-flex xs1 md3></v-flex>
          <v-flex xs10 md6>
            <v-text-field v-model="confirm" outline type="password" class="input" label="確認のため、もう一度パスワードを入力してください" :rules="passwordRules"></v-text-field>
          </v-flex>
          <v-flex xs1 md3></v-flex>
          <v-flex xs1 md3></v-flex>
          <v-flex xs10 md6>
            <v-radio-group v-model="form.sex">
              <label class="title">性別</label>
              <v-radio
                label="男"
                value="male"
              ></v-radio>
              <v-radio
                label="女"
                value="female"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs1 md3></v-flex>
          <v-flex xs1 md3></v-flex>
          <v-flex xs10 md6>
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
          </v-flex>
          <v-flex xs1 md3></v-flex>
          <v-flex xs1 md3></v-flex>
          <v-flex class="birth_ymd" xs10 md6>
            <label class="title">生年月日</label>
            <v-layout row wrap>
              <v-flex xs4 md4>
                <v-select
                  :items="year_options"
                  v-model="year"
                  box
                  label="年"
                ></v-select>
              </v-flex>
              <v-flex xs3 md3>
                <v-select
                  :items="month_options"
                  v-model="month"
                  box
                  label="月"
                ></v-select>
              </v-flex>
              <v-flex xs3 md3>
                <v-select
                  :items="day_options"
                  v-model="day"
                  box
                  label="日"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs1 md3></v-flex>
        </v-layout>
    </v-form>
    <v-sheet color="red lighten-4 sheet">
      <span class="subheading">上記の内容でユーザ情報を更新する</span>
      <v-text-field
        v-model="form.password"
        outline
        type="password"
        class="input"
        label="現在のパスワード"
        :rules="passwordRules"
      ></v-text-field>
      <v-btn
        color="red"
        class="btn"
        @click="dialog_disp_flg=true"
      >更新する</v-btn>
    </v-sheet>
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
          <div class="body-2">{{dialog.message}}</div>
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
        sex: ''
      },
      body: {

      },
      dialog: {
        title: 'まだ実装されていません',
        message: '実装までしばらくお待ちください'
      },
      nameRules: validator.nameRules,
      emailRules: validator.emailRules,
      passwordRules: validator.passwordRules,
      confirm: '',
      year: '2000',
      year_options: [],
      month: '1',
      month_options: [],
      day: '1',
      day_options: [],
      err: [],
      dialog_disp_flg: false
    }
  },
  methods: {
    closeDialog: function () {
      this.dialog_disp_flg = false
    }
  }
}
</script>

<style lang="sass" scoped>
.sheet
  padding: 20px
  text-align: center
.input
  background-colo: white
.btn
  color: white
</style>
