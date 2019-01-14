<template>
  <div class="main_tab">
    <el-tabs type="border-card" class="tabs">
      <el-tab-pane label="記録する" v-on:click="switchTabToRegister">
        <md-card class="register" v-show="selected === 'register'">
          <a href="/#/register/ergo"><md-card class="card ergo_register" md-with-hover>エルゴを記録する</md-card></a>
          <a href="/#/register/weight"><md-card class="card weight_register" md-with-hover>ウェイトを記録する</md-card></a>
          <a href="/#/register/other"><md-card class="card other_register" md-with-hover>その他の種目を記録する</md-card></a>
        </md-card>
      </el-tab-pane>
      <el-tab-pane label="見る" v-on:click="switchTabToViewer">
        <md-card class="view" v-show="selected === 'view'">
          <a href="/#/view/personal"><personal-record-view-button class="button"></personal-record-view-button></a>
          <a href="/#/view/team"><team-record-view-button class="button"></team-record-view-button></a>
        </md-card>
      </el-tab-pane>
    </el-tabs>
    <div class="tab_contents">
    </div>
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
.main_tab
  display: inline-block
.register
  border: solid 1px orange
  background-color: #EEE
  color: orange
.view
  border: solid 1px springgreen
  background-color: #EEE
  color: springgreen
.card
  margin: 30px
  padding: 20px
  font-size: 30px

</style>
