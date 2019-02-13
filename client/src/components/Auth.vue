<template>
  <div class="auth">
    <sign-in
      class="item"
      v-if="state==='signIn'"
      @send="receiveFromChild"
    ></sign-in>
    <sign-up
      class="item"
      v-if="state==='signUp'"
      @send="receiveFromChild"
    ></sign-up>
  </div>
</template>

<script>
import Login from '@/components/Auth/Login'
import UserRegister from '@/components/Auth/UserRegister'

export default {
  name: 'auth',
  data: () => {
    return {
      state: 'signIn'
    }
  },
  methods: {
    gotoSignInForm: function () {
      this.state = 'signIn'
    },
    gotoSignUpForm: function () {
      this.state = 'signUp'
    },
    receiveFromChild: function (msg) {
      if (msg === 'signUp') {
        this.gotoSignUpForm()
      } else if (msg === 'signIn') {
        this.gotoSignInForm()
      }
    }
  },
  components: {
    'sign-in': Login,
    'sign-up': UserRegister
  }
}
</script>

<style lang="sass" scoped>
.logo
  font-size: 100px
  color: white
.auth
  background-color: #1955A6
  height: 100vh
  overflow: scroll
  display: flex
  flex-direction: row 
  align-items: center
  justify-content: center

</style>
