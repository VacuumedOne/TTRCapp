<template>
  <div class='login'>
    <div class="card elevation-5">
      <h2 class="title">{{ msg }}</h2>
      <div class="login_form">
        <div>
          <v-text-field v-model="form.mail" outline label="メールアドレス"></v-text-field>
        </div>
        <div>
          <v-text-field v-model="form.password" outline label="パスワード" type="password"></v-text-field>
        </div>
        <v-btn @click="loginAPI" class="login_button" color="red accent-2">ログイン</v-btn>
      </div>
      <div>
        <span>{{ msg2 }}</span>
        <v-btn class="link" color="" @click="sendToParent('signUp')">こちら</v-btn>
      </div>
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
              ログインに失敗しました。
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
              ログインに成功しました。
            </v-card-title>
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
  </div>
</template>

<script>

import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = true

export default {
  name: 'UserRegister',
  data: () => {
    return {
      msg: 'Welcome Back!',
      msg2: 'アカウントを持っていない方は',
      form: {
        mail: '',
        password: ''
      },
      err: [],
      err_disp_flg: false,
      success_disp_flg: false
    }
  },
  methods: {
    loginAPI: async function () {
      try {
        let res = await axios.post('/login/api', this.form)
        if (res.status === 200) {
          this.success_disp_flg = true
        } else {
          this.err_disp_flg = true
          this.err = ['ログインに失敗しました。']
        }
      } catch (err) {
        this.err_disp_flg = true
        this.err = ['ログインに失敗しました。']
      }
    },
    sendToParent: function (msg) {
      this.$emit('send', msg)
    },
    gotoTop: function () {
      this.$emit('login')
    }
  },
  components: {
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
.login_button
  color: white
</style>
