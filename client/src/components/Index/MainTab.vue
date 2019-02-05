<template>
  <div class="main_tab">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="記録する">
        <md-card class="content register">
          <md-card
            class="card ergo_register"
            v-on="sendToParent('ErgoRegister')"
            md-with-hover>
            エルゴを記録する
          </md-card>
          <md-card
            class="card weight_register"
            v-on="sendToParent('WeightRegister')"
            md-with-hover>
            ウェイトを記録する
          </md-card>
          <md-card
            class="card other_register"
            v-on="sendToParent('OtherRegister')"
            md-with-hover>
            その他の種目を記録する
          </md-card>
        </md-card>
      </el-tab-pane>
      <el-tab-pane label="見る">
        <md-card class="content view">
          <md-card
            class="card personal_view"
            v-on="sendToParent('PersonalView')"
            md-with-hover>
            自分の記録を見る
          </md-card>
          <md-card
            class="card team_view"
            v-on="sendToParent('TeamView')"
            md-with-hover>
            みんなの記録を見る
          </md-card>
        </md-card>
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
    sendToParent: function (state) {
      //親に遷移したいstateを送る
      this.$emit('send', state)
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
