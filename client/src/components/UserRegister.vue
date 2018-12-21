<template>
  <div class='UserRegister'>
    <h2>{{ msg }}</h2>
    <div id="user_register_form">
      ユーザ名<text-form name="user_name" placeholder="例)luna" v-model="form.user_name"></text-form>
      漢字姓<text-form name="k_lastname" placeholder="例)輝夜" v-model="form.k_lastname"></text-form>
      漢字名<text-form name="k_firstname" placeholder="例)月" v-model="form.k_firstname"></text-form>
      ひらがな姓<text-form name="h_lastname" placeholder="例)かぐや" v-model="form.h_lastname"></text-form>
      ひらがな名<text-form name="h_firstname" placeholder="例)るな" v-model="form.h_firstname"></text-form>
      パスワード<password-form name="hashed_pw" v-model="form.password"></password-form>
      メールアドレス<email-form name="mail" v-model="form.mail"></email-form>
      性別<sex-form name="sex" v-model="form.sex"></sex-form>
      生年月日<date-form name="birth_ymd" v-model="form.birth_ymd"></date-form>
      役職<auth-form name="auth" v-model="form.auth"></auth-form>
      {{ form }}
      <input type="button" value="登録" v-on:click="postUserRegisterAPI">
    </div>
  </div>
</template>

<script>
import TextForm from './Input/TextForm'
import AuthForm from './Input/AuthForm'
import DateForm from './Input/DateForm'
import EmailForm from './Input/EmailForm'
import PasswordForm from './Input/PasswordForm'
import SexForm from './Input/SexForm'
import Submit from './Input/Submit'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

export default {
  name: 'UserRegister',
  data: () => {
    return {
      msg: 'ユーザ登録ページ',
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
      }
    }
  },
  methods: {
    postUserRegisterAPI: function () {
      console.log(1111)
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
