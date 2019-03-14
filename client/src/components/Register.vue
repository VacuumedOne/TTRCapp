<template>
  <div class="register">
    <v-icon class="elevation-5 back"
          @click="sendToParent()">arrow_back</v-icon>
    <ergo-register
      v-if="state==='ergo'"
      :login-user="loginUser"
      v-on:send="receiveFromChild"
    ></ergo-register>
    <weight-register
      v-if="state==='weight'"
      :login-user="loginUser"
      v-on:send="receiveFromChild"
    ></weight-register>
    <others-register
      v-if="state==='others'"
      :login-user="loginUser"
      v-on:send="receiveFromChild"
    ></others-register>
  </div>
</template>

<script>
import ErgoRegister from '@/components/Register/ErgoRecordRegister'
import WeightRegister from '@/components/Register/WeightRecordRegister'
import OthersRegister from '@/components/Register/OthersRecordRegister'

export default {
  name: 'Register',
  props: ['loginUser', 'mode'],
  data: () => {
    return {
      state: 'ergo'
    }
  },
  mounted: function () {
    this.state = this.mode
  },
  watch: {
    mode: function () {
      this.state = this.mode
    }
  },
  methods: {
    gotoErgoRegister: function () {
      //エルゴ記録モード
      this.state = 'ergo'
    },
    gotoWeightRegister: function () {
      //ウェイト記録モード
      this.state = 'weight'
    },
    gotoOthersRegister: function () {
      //その他記録モード
      this.state = 'others'
    },
    receiveFromChild: function (data) {
      this.$emit('send', data)
    },
    sendToParent: function () {
      this.$emit('send', 'Top')
    }
  },
  components: {
    'ergo-register': ErgoRegister,
    'weight-register': WeightRegister,
    'others-register': OthersRegister
  }
}
</script>

<style lang="sass" scoped>

.back
  border-radius : 30%
  padding : 5px
  margin-bottom : 3px

</style>
