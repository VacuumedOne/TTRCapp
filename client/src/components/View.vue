<template>
  <div class="view">
    <personal-view
      class="personal_view"
      v-if="state==='personal'"
      v-bind:login-user="loginUser"
      v-on:send="receiveFromChild"
      ></personal-view>
    <team-view
      class="team_view"
      v-if="state==='team'"
      v-bind:login-user="loginUser"
      v-on:send="receiveFromChild"
      ></team-view>
  </div>
</template>

<script>
import PersonalView from '@/components/View/PersonalView'
import TeamView from '@/components/View/TeamView'

export default {
  name: 'Viewer',
  props: ['loginUser', 'mode'],
  data: () => {
    return {
      state: ''
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
    gotoPersonalView: function () {
      this.state = 'personal'
    },
    gotoTeamView: function () {
      this.state = 'team'
    },
    receiveFromChild: function (data) {
      this.$emit('send', data)
    }
  },
  components: {
    'personal-view': PersonalView,
    'team-view': TeamView
  }
}
</script>

<style lang="sass" scoped>
.view
  height: 100vh
  width: 100vw
</style>
