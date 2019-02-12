<template>
  <div class="index">
    <v-app>
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-side-icon
          @click="toggleDrawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title v-ripple @click="gotoTop">Tsubakuro</v-toolbar-title>
      </v-toolbar>
      <v-navigation-drawer
        v-model="drawer_disp_flg"
        app
        dark
      >
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="title">
                Menu
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile class="drawer_column" @click="gotoTop()">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="title">トップ</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile class="drawer_column">
            <v-list-tile-action>
              <v-icon>expand_more</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="title">記録する</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="drawer_column" @click="gotoRegister('ergo')">
            <v-list-tile-action>
              <v-icon>library_books</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">エルゴを記録</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="drawer_column" @click="gotoRegister('weight')">
            <v-list-tile-action>
              <v-icon>library_books</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">ウェイトを記録</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="drawer_column" @click="gotoRegister('others')">
            <v-list-tile-action>
              <v-icon>library_books</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">その他の種目を記録</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile class="drawer_column">
            <v-list-tile-action>
              <v-icon>expand_more</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="title">見る</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="drawer_column" @click="gotoView('personal')">
            <v-list-tile-action>
              <v-icon>library_books</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">自分の記録を見る</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile class="drawer_column" @click="gotoView('team')">
            <v-list-tile-action>
              <v-icon>library_books</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="subheading">チームの記録を見る</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile class="drawer_column" @click="gotoConfig()">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="title">設定</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile class="drawer_column" @click="gotoTop()">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="title">Wiki</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-content>
        <v-container class="content">
          <transition name="fade">
            <top
              class="item top"
              v-if="state==='top'"
              v-on:send="receiveFromChild"
              ></top>
          </transition>
          <transition name="fade">
            <register
              class="item register"
              v-if="state==='register'"
              v-bind:login-user="login_user"
              v-bind:mode="register_mode"
              v-on:send="receiveFromChild"
              ></register>
          </transition>
          <transition name="fade">
            <c-view
              class="item view"
              v-if="state==='view'"
              v-bind:login-user="login_user"
              v-bind:mode="view_mode"
              v-on:send="receiveFromChild"
              ></c-view>
          </transition>
        </v-container>
      </v-content>
      
    </v-app>
  </div>
</template>

<script>

import Top from '@/components/Top'
import Register from '@/components/Register'
import View from '@/components/View'

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
      register_mode: '',
      view_mode: '',
      drawer_disp_flg: null
    }
  },
  mounted: function () {
    if (this.$vuetify.breakpoint.width < 1013) {
      //小さい画面の時、デフォルトでDrawerは閉じている
      this.drawer_disp_flg = false
    } else {
      //大きい画面の時、デフォルトでDrawerは開いている
      this.drawer_disp_flg = true
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
      this.beforeGoto()
      this.state = 'top'
    },
    gotoConfig: function () {
      //設定画面に遷移する
      this.beforeGoto()
      this.state = 'config'
    },
    gotoRegister: function (mode) {
      //記録画面に遷移する
      this.beforeGoto()
      this.register_mode = mode
      this.state = 'register'
    },
    gotoView: function (mode) {
      //記録画面に遷移する
      this.beforeGoto()
      this.view_mode = mode
      this.state = 'view'
    },
    loading: function () {
      //読み込み中
      this.state = 'loading'
    },
    beforeGoto: function () {

    },
    toggleDrawer: function () {
      this.drawer_disp_flg = !this.drawer_disp_flg
    },
    receiveFromChild: function (data) {
      if (data === 'ErgoRegister') {
        this.gotoRegister('ergo')
      } else if (data === 'WeightRegister') {
        this.gotoRegister('weight')
      } else if (data === 'OtherRegister') {
        this.gotoRegister('others')
      } else if (data === 'PersonalView') {
        this.gotoView('personal')
      } else if (data === 'TeamView') {
        this.gotoView('team')
      } else if (data === 'top') {
        this.gotoTop()
      }
    }
  },
  components: {
    'top': Top,
    'register': Register,
    'c-view': View
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
.content
  // overflow: auto
</style>
