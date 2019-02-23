<template>
  <div class='user_register'>
    <v-app class="card elevation-5">
      <v-form
        lazy-validation
        v-model="form.valid"
        ref="form"
      >
        <div class="display-1 form-title">{{ msg }}</div>
        <div class="user_register_form">
          <v-layout row wrap justify-center>
            <v-flex xs1 md3></v-flex>
            <v-flex xs10 md6>
              <v-text-field
                v-model="form.mail"
                outline class="input"
                label="メールアドレス"
                :rules="emailRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs1 md3></v-flex>
            <v-flex xs1 md2></v-flex>
            <v-flex xs5 md4>
              <v-text-field
                v-model="form.k_lastname"
                outline
                class="input"
                label="姓"
                :rules="nameRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs5 md4>
              <v-text-field
                v-model="form.k_firstname"
                outline
                class="input"
                label="名"
                :rules="nameRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs1 md2></v-flex>
            <v-flex xs1 md2></v-flex>
            <v-flex xs5 md4>
              <v-text-field
                v-model="form.h_lastname"
                outline
                class="input"
                label="姓(ふりがな)"
                :rules="nameRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs5 md4>
              <v-text-field
                v-model="form.h_firstname"
                outline
                class="input"
                label="名(ふりがな)"
                :rules="nameRules"
              ></v-text-field>
            </v-flex>
            <v-flex xs1 md2></v-flex>
            <v-flex xs1 md3></v-flex>
            <v-flex xs10 md6>
              <v-text-field
                v-model="form.password"
                outline
                type="password"
                class="input"
                label="パスワード(英数字8文字以上)"
                :rules="passwordRules"
            ></v-text-field>
            </v-flex>
            <v-flex xs1 md3></v-flex>
            <v-flex xs1 md3></v-flex>
            <v-flex xs10 md6>
              <v-text-field
                v-model="confirm"
                outline
                type="password"
                class="input"
                label="確認のため、もう一度パスワードを入力してください"
                :rules="passwordRules"
              ></v-text-field>
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
          <v-btn class="submit" v-on:click="postUserRegisterAPI" color="error">新規登録！</v-btn>
        </div>
        <v-dialog
          v-model="err_disp_flg"
          width="500"
        >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              登録に失敗しました。
            </v-card-title>
            <v-card-text>
              <template v-for="(error, index) in err">
                <div class="body-2" :key="index">{{error}}</div>
              </template>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="err_disp_flg = false"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="success_disp_flg"
          width="500"
          persistent
        >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              ようこそ、{{form.k_lastname + form.k_firstname}}さん。
            </v-card-title>
            <v-card-text>
              <div class="body-2">登録に成功しました。</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="gotoTop"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-form>
    </v-app>
  </div>
</template>

<script>
import validator from '@/util/js/Validate'

import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = false

export default {
  name: 'UserRegister',
  data: () => {
    return {
      msg: 'アカウントを作りましょう。',
      form: {
        valid: false,
        k_lastname: '',
        k_firstname: '',
        h_lastname: '',
        h_firstname: '',
        password: '',
        mail: '',
        sex: 'male',
        birth_ymd: '2000-01-01',
        auth: '3'
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
      err_disp_flg: false,
      success_disp_flg: false,
      login_user: {}
    }
  },
  
  methods: {
    postUserRegisterAPI: async function () {
      //Vuetifyの機能によるバリデーション
      if (!this.$refs.form.validate()) {
        this.snackbar = true
        return
      }
      //生年月日の前処理とバリデーション
      this.beforePost()
      if (this.err.length > 0) {
        this.err_disp_flg = true
        return
      }
      try {
        //ユーザを登録する
        let res = await axios.post('/user/register/api', this.form)
        if (res.status === 200) {
          this.success_disp_flg = true
          this.login_user = res.data
        } else {
          this.err.push('登録に失敗しました。入力を確認して再度試してください。')
          this.err.push('(内容が他のユーザと重複している可能性があります)')
          this.err_disp_flg = true
        }
        if (this.err.length > 0) {
          return
        }
        //成功した場合はセッションを取得する
        res = await axios.post('/login/api', {
          mail: this.form.mail,
          password: this.form.password
        })
        if (res.status === 200) {
          console.log('Login successful.')
        } else {
          this.err.push('ユーザ登録は成功しましたが、遷移に失敗しました。再度トップからログインしてください。')
          this.err_disp_flg = true
        }
      } catch (err) {
        this.err_disp_flg = true
        this.err.push('不明なエラーです')
      }
    },
    beforePost: function () {
      let ymd = ''
      ymd += this.year + '-'
      ymd += (('0' + this.month).slice(-2)) + '-'
      ymd += (('0' + this.day).slice(-2))
      this.form.birth_ymd = ymd

      this.err = []
      if (this.form.password !== this.confirm) {
        this.err.push('パスワードが確認入力と異なります。')
      }
      if (this.form.sex !== 'male' &&
          this.form.sex !== 'female') {
        this.err.push('性別が入力されていません。')
      }
      if (this.form.auth !== '2' &&
          this.form.auth !== '3' &&
          this.form.auth !== '4') {
        this.err.push('役職が入力されていません。')
      }
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
    gotoTop: function () {
      this.success_disp_flg = false
      this.$emit('login')
    }
  },
  mounted: function () {
    this.year_options = this.makeArr(1990, 2030)
    this.month_options = this.makeArr(1, 12)
    this.day_options = this.makeArr(1, 31)
  },
  components: {
  }
}
</script>

<style lang="sass" scoped>
.card
  background-color: white
  padding: 30px 20px
  border-radius: 5px
  max-height: 100vh
  overflow: scroll
.link
  color: blue
.input
  margin-left: 10px
.user_register
  margin: 15px 5px
.form-title
  margin: 15px
.submit
  margin-bottom: 50px
.birth_ymd
  text-align: left
</style>
