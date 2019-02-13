<template>
  <div class="auth">

  </div>
</template>

<script>
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
    }
  }
}
</script>


<style lang="sass" scoped>

</style>
