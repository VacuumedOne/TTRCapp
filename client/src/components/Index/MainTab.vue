<template>
  <div id="main_tab">
    <div class="tabs">
      <div class="register tab register_tab" v-on:click="switchTabToRegister">記録する</div>
      <div class="view tab view_tab" v-on:click="switchTabToView">見る</div>
    </div>
    <div class="tab_contents">
      <div class="register register_content" v-show="selected === 'register'">
        <ergo-register-button></ergo-register-button>
        <weight-register-button></weight-register-button>
        <other-register-button></other-register-button>
      </div>
      <div class="view view_content" v-show="selected === 'view'">
        コンテンツ２
      </div>
    </div>
  </div>
</template>

<script>
import ErgoRegisterButton from './ErgoRegisterButton'
import WeightRegisterButton from './WeightRegisterButton'
import OtherRegisterButton from './OtherRegisterButton'
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
    'other-register-button': OtherRegisterButton
  }
}
</script>

<style lang="sass" scoped>
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
</style>
