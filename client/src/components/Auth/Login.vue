<template>
  <div class='login'>
    <div class="card elevation-5">
      <h2 class="title">{{ msg }}</h2>
      <div class="login_form">
        <div>
          <v-text-field v-model="form.email" outline label="メールアドレス"></v-text-field>
        </div>
        <div>
          <v-text-field v-model="form.password" outline label="パスワード" type="password"></v-text-field>
        </div>
        <v-btn v-on:click="loginAPI">ログイン</v-btn>
        {{ form }}
      </div>
      <div>
        <span>{{ msg2 }}</span><label class="link" @click="sendToParent('signUp')">こちら</label>
      </div>
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
        email: '',
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
    },
    sendToParent: function (msg) {
      this.$emit('send', msg)
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
.card
  background-color: white
  padding: 20px
  margin: 5px
  border-radius: 5px
.link
  color: blue
</style>
