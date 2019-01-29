<template>
  <div class="main_tab">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="記録する">
        <md-card class="content register">
          <a href="/#/register/ergo"><md-card class="card ergo_register" md-with-hover>エルゴを記録する</md-card></a>
          <a href="/#/register/weight"><md-card class="card weight_register" md-with-hover>ウェイトを記録する</md-card></a>
          <a href="/#/register/other"><md-card class="card other_register" md-with-hover>その他の種目を記録する</md-card></a>
        </md-card>
      </el-tab-pane>
      <el-tab-pane label="見る">
        <md-card class="content view">
          <a href="/#/view/personal"><md-card class="card personal_view" md-with-hover>自分の記録を見る</md-card></a>
          <a href="/#/view/team"><md-card class="card team_view" md-with-hover>みんなの記録を見る</md-card></a>
        </md-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ErgoRegisterButton from './ErgoRegisterButton'
import WeightRegisterButton from './WeightRegisterButton'
import OtherRegisterButton from './OtherRegisterButton'
import PersonalRecordViewButton from './PersonalRecordviewButton'
import TeamRecordViewButton from './TeamRecordviewButton'
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
    }
  },
  components: {
    'ergo-register-button': ErgoRegisterButton,
    'weight-register-button': WeightRegisterButton,
    'other-register-button': OtherRegisterButton,
    'personal-record-view-button': PersonalRecordViewButton,
    'team-record-view-button': TeamRecordViewButton
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
