<template>
  <div class="register">
    <ergo-register
      v-if="state==='ergo'"
      v-bind:login-user="loginUser"
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
    }
  },
  components: {
    'ergo-register': ErgoRegister
  }
}
</script>

<style lang="sass" scoped>

</style>
