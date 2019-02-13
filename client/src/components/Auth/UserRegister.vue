<template>
  <div class='user_register'>
    <div class="card elevation-5">
      <h2 class="title">{{ msg }}</h2>
      <div class="user_register_form">
        <v-layout row wrap justify-center>
          <v-flex md3></v-flex>
          <v-flex md6>
            <v-text-field v-model="form.user_name" outline class="input" label="ユーザ名(英数字10文字以下)"></v-text-field>
          </v-flex>
          <v-flex md3></v-flex>
          <v-flex md3></v-flex>
          <v-flex md6>
            <v-text-field v-model="form.mail" outline class="input" label="メールアドレス"></v-text-field>
          </v-flex>
          <v-flex md3></v-flex>
          <v-flex md2></v-flex>
          <v-flex md4>
            <v-text-field v-model="form.k_lastname" outline class="input" label="姓"></v-text-field>
          </v-flex>
          <v-flex md4>
            <v-text-field v-model="form.k_firstname" outline class="input" label="名"></v-text-field>
          </v-flex>
          <v-flex md2></v-flex>
          <v-flex md2></v-flex>
          <v-flex md4>
            <v-text-field v-model="form.h_lastname" outline class="input" label="姓(ふりがな)"></v-text-field>
          </v-flex>
          <v-flex md4>
            <v-text-field v-model="form.h_firstname" outline class="input" label="名(ふりがな)"></v-text-field>
          </v-flex>
          <v-flex md2></v-flex>
          <v-flex md3></v-flex>
          <v-flex md6>
            <v-text-field v-model="form.password" outline type="password" class="input" label="パスワード(英数字8文字以上)"></v-text-field>
          </v-flex>
          <v-flex md3></v-flex>
          <v-flex md3></v-flex>
          <v-flex md6>
            <v-text-field v-model="confirm" outline type="password" class="input" label="確認のため、もう一度パスワードを入力してください"></v-text-field>
          </v-flex>
          <v-flex md3></v-flex>
          <v-flex md3></v-flex>
          <v-flex md6>
            <v-radio-group v-model="form.sex">
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
          <v-flex md3></v-flex>
          <v-flex md3></v-flex>
          <v-flex md6>
            <v-select
              label="役職"
              :items="roles"
            ></v-select>
          </v-flex>
          <v-flex md3></v-flex>
        </v-layout>
        <label>生年月日</label><date-form name="birth_ymd" v-model="form.birth_ymd"></date-form>
        <label>役職</label><auth-form name="auth" v-model="form.auth"></auth-form>
        <v-btn v-on:click="postUserRegisterAPI">新規登録！</v-btn>
        {{ form }}
      </div>
    </div>
  </div>
</template>

<script>
import TextForm from '@/components/Input/TextForm'
import AuthForm from '@/components/Input/AuthForm'
import DateForm from '@/components/Input/DateForm'
import EmailForm from '@/components/Input/EmailForm'
import PasswordForm from '@/components/Input/PasswordForm'
import SexForm from '@/components/Input/SexForm'
import Submit from '@/components/Input/Submit'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

export default {
  name: 'UserRegister',
  data: () => {
    return {
      msg: 'Sign Up for Free!',
      form: {
        user_name: '',
        k_lastname: '',
        k_firstname: '',
        h_lastname: '',
        h_firstname: '',
        password: '',
        mail: '',
        sex: 'male',
        birth_ymd: '',
        auth: '0'
      },
      confirm: '',
      roles: [
        'コックスもしくはマネージャー',
        '選手',
        'その他'
      ]
    }
  },
  methods: {
    postUserRegisterAPI: function () {
      axios.post('/user/register/api', this.form)
        .then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  components: {
    'text-form': TextForm,
    'auth-form': AuthForm,
    'date-form': DateForm,
    'email-form': EmailForm,
    'password-form': PasswordForm,
    'sex-form': SexForm,
    'submit': Submit
  }
}
</script>

<style lang="sass" scoped>
.card
  background-color: white
  padding: 20px
  margin: 5px
  border-radius: 5px
.link
  color: blue
.input
  margin-left: 10px
</style>
