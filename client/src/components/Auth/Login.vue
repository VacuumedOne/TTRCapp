<template>
  <div id='Login'>
    <h2 id="title">{{ msg }}</h2>
    <div id="login_form">
      <div>
        <text-form name="user_name" placeholder=" ユーザ名(英数字)" v-model="form.user_name"></text-form>
      </div>
      <password-form name="hashed_pw" placeholder=" パスワード(8文字以上英数字)" v-model="form.password"></password-form>
      <submit type="button" value="Log in" v-on:click="loginAPI"></submit>
      {{ form }}
    </div>
    <div>
      <span>{{ msg2 }}</span><a href="/#/user/register">こちら</a>
    </div>
  </div>
</template>

<script>
import TextForm from '@/components/Input/TextForm'
import PasswordForm from '@/components/Input/PasswordForm'
import Submit from '@/components/Input/Submit'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

export default {
  name: 'UserRegister',
  data: () => {
    return {
      msg: 'Welcome Back!',
      msg2: 'アカウントを持っていない方は',
      form: {
        user_name: '',
        password: ''
      }
    }
  },
  methods: {
    loginAPI: function () {
      axios.post('/user/login/api', this.form)
        .then((result) => {
          console.log(result)
        }).catch((err) => {
          console.log(err)
        })
    }
  },
  components: {
    'text-form': TextForm,
    'password-form': PasswordForm,
    'submit': Submit
  }
}
</script>

<style lang="sass" scoped>
  #Login
    background-color: #1955A6
    color: #EEE
    padding-top: 50px
    height: 100vh
</style>
