<template>
  <div class="main_tab">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="記録する">
        <md-content class="content register">
          <md-content
            class="card ergo_register"
            v-on:click="sendToParent('ErgoRegister')"
            >
            エルゴを記録する
          </md-content>
          <md-content
            class="card weight_register"
            v-on:click="sendToParent('WeightRegister')"
            >
            ウェイトを記録する
          </md-content>
          <md-content
            class="card other_register"
            v-on:click="sendToParent('OtherRegister')"
            >
            その他の種目を記録する
          </md-content>
        </md-content>
      </el-tab-pane>
      <el-tab-pane label="見る">
        <md-content class="content view">
          <md-content
            class="card personal_view"
            v-on:click="sendToParent('PersonalView')"
            >
            自分の記録を見る
          </md-content>
          <md-content
            class="card team_view"
            v-on:click="sendToParent('TeamView')"
            >
            みんなの記録を見る
          </md-content>
        </md-content>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'MainTab',
  data: () => {
    return {
      selected: 'register'
    }
  },
  methods: {
    switchTabToRegister: function () {
      this.selected = 'register'
    },
    switchTabToViewer: function () {
      this.selected = 'view'
    },
    sendToParent: function (data) {
      //親に遷移したいstateを送る
      this.$emit('send', data)
    }
  },
  components: {
  }
}
</script>

<style lang="sass" scoped>
$register_color: orange
$view_color: springgreen

.main_tab
  display: inline-block
.content
  width: 500px
  height: 300px
  vertical-align: middle
.register
  border: solid 1px $register_color
  background-color: #EEE
  color: orange
.view
  border: solid 1px $view_color
  background-color: #EEE
  color: springgreen
.card
  margin: 30px
  padding: 20px
  font-size: 30px

</style>
