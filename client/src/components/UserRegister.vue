<template>
  <div id='UserRegister'>
    <h2 id="title">{{ msg }}</h2>
    <div id="user_register_form">
      <div>
        <text-form class="text" name="user_name" placeholder=" ユーザ名(英数字)" v-model="form.user_name"></text-form>
      </div>
      <div>
        <text-form class="text" name="k_lastname" placeholder=" 姓" v-model="form.k_lastname"></text-form>
        <text-form class="text" name="k_firstname" placeholder=" 名" v-model="form.k_firstname"></text-form>
      </div>
      <div>
        <text-form class="text" name="h_lastname" placeholder=" 姓(ふりがな)" v-model="form.h_lastname"></text-form>
        <text-form class="text" name="h_firstname" placeholder=" 名(ふりがな)" v-model="form.h_firstname"></text-form>
      </div>
      <password-form name="hashed_pw" placeholder=" パスワード(8文字以上英数字)" v-model="form.password"></password-form>
      <email-form name="mail" placeholder="メールアドレス" v-model="form.mail"></email-form>
      <label>性別</label><sex-form name="sex" v-model="form.sex"></sex-form>
      <label>生年月日</label><date-form name="birth_ymd" v-model="form.birth_ymd"></date-form>
      <label>役職</label><auth-form name="auth" v-model="form.auth"></auth-form>
      <submit type="button" value="Sign Up" v-on:click="postUserRegisterAPI"></submit>
      {{ form }}
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
      }
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
  #UserRegister
    background-color: #1955A6
    color: #EEE
    padding-top: 50px
    height: 100vh
  .text
    display: inline
</style>
