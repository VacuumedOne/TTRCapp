<template>
  <div class="index">
    <transition name="fade">
      <top
        class="item top"
        v-if="state==='top'"
        v-on:send="receiveFromChild"
        ></top>
      <register
        class="item register"
        v-if="state==='register'"
        v-bind:login-user="login_user"
        v-bind:mode="register_mode"
        v-on:send="receiveFromChild"
        ></register>
    </transition>
  </div>
</template>

<script>

import Top from '@/components/Top'
import Register from '@/components/Register'

export default {
  name: 'Index',
  data: () => {
    return {
      is_login: true,
      state: 'top',
      login_user: {
        user_id: 1,
        user_name: 'シモン',
        sex: 'male',
        auth: 2,
        is_active: true
      },
      register_mode: ''
    }
  },
  methods: {
    isAuthenticated: function () {
      //認証してログイン情報を取得する
    },
    logout: function () {
      //ログアウトする
    },
    gotoAuth: function () {
      //認証画面に遷移する
    },
    gotoTop: function () {
      //トップ画面に遷移する
      this.state = 'top'
    },
    gotoConfig: function () {
      //設定画面に遷移する
      this.state = 'config'
    },
    gotoRegister: function (mode) {
      //記録画面に遷移する
      this.register_mode = mode
      this.state = 'register'
    },
    gotoView: function () {
      //記録画面に遷移する
      this.state = 'view'
    },
    loading: function () {
      //読み込み中
      this.state = 'loading'
    },
    receiveFromChild: function (data) {
      if (data === 'ErgoRegister') {
        this.gotoRegister('ergo')
      } else if (data === 'WeightRegister') {
        this.gotoRegister('weight')
      } else if (data === 'OtherRegister') {
        this.gotoRegister('others')
      } else if (data === 'PersonalView' || data === 'TeamView') {
        this.gotoView()
      } else if (data === 'top') {
        this.gotoTop()
      }
    }
  },
  components: {
    'top': Top,
    'register': Register
  }
}
</script>

<style lang="sass" scoped>
.item
  position: relative
.fade-enter
  opacity: 0
.fade-enter-active
  transition: all 0.5s ease
.fade-enter-to
  opacity: 1
.fade-leave
  opacity: 1
.fade-fade-active
  transition: all 0.5 ease
.fade-leave-to
  opacity: 0
</style>
