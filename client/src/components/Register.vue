<template>
  <div class="register">
    <ergo-register
      v-if="state==='ergo'"
      v-bind:login-user="loginUser"
      v-on:send="receiveFromChild"
      ></ergo-register>
    <weight-register
      v-if="state==='weight'"
      v-bind:login-user="loginUser"
      v-on:send="receiveFromChild"
      ></weight-register>
    <others-register
      v-if="state==='others'"
      v-bind:login-user="loginUser"
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
    console.log(this.mode)
    this.state = this.mode
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
.register
  height: 100vh
  width: 100vw
</style>
