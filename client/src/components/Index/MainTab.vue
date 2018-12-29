<template>
  <div id="main_tab">
    <div class="tabs">
      <div class="register tab register_tab" v-on:click="switchTabToRegister">記録する</div>
      <div class="view tab view_tab" v-on:click="switchTabToView">見る</div>
    </div>
    <div class="tab_contents">
      <div class="register content register_content" v-show="selected === 'register'">
        <ergo-register-button class="button"></ergo-register-button>
        <weight-register-button class="button"></weight-register-button>
        <other-register-button class="button"></other-register-button>
      </div>
      <div class="view content view_content" v-show="selected === 'view'">
        <personal-record-view-button class="button"></personal-record-view-button>
        <team-record-view-button class="button"></team-record-view-button>
      </div>
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
    switchTabToView: function () {
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
#main_tab
  width: 50%
  display: inline-block
.register
  border: solid 1px orange
  background-color: #EEE
  color: orange
.view
  border: solid 1px springgreen
  background-color: #EEE
  color: springgreen
.tab
  display: inline
  width: 400px
  border-radius: 3px
  padding: 10px
  margin: 5px
.tabs
  height: auto
.content
  position: relative
.button
  margin: 10px
</style>
