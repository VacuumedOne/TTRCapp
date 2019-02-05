<template>
  <div class="index">
    <top v-if="state=='top'"></top>
    <!-- <register v-if="state=='register'"></register> -->
  </div>
</template>

<script>

import Top from './Top'

export default {
  name: 'Index',
  data: () => {
    return {
      is_login: true,
      state: 'top',
      login_user: {
        user_id: 4,
        user_name: 'シモン',
        sex: 'male',
        auth: 2,
        is_active: true
      }
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
    gotoRegister: function () {
      //記録画面に遷移する
      this.state = 'register'
    },
    gotoView: function () {
      //記録画面に遷移する
      this.state = 'view'
    }
  },
  components: {
    'top': Top
  }
}
</script>

<style lang="sass" scoped>

</style>
