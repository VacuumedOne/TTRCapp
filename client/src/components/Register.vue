<template>
  <div class="register">
    <ergo-register
      v-if="state==='ergo'"
      v-bind:login-user="loginUser"
      v-on:send="receiveFromChild"
      ></ergo-register>
  </div>
</template>

<script>
import ErgoRegister from '@/components/Register/ErgoRecordRegister'

export default {
  name: 'Register',
  props: ['loginUser'],
  data: () => {
    return {
      state: 'ergo'
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
    gotoOtherRegister: function () {
      //その他記録モード
      this.state = 'other'
    },
    receiveFromChild: function (data) {
      this.$emit('send', data)
    }
  },
  components: {
    'ergo-register': ErgoRegister
  }
}
</script>

<style lang="sass" scoped>

</style>
