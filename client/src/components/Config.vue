<template>
  <div class="config">
    <user-config
      v-if="state==='user'"
      :login-user="loginUser"
    ></user-config>
    <team-config
      v-if="state==='team'"
      :login-user="loginUser"
    ></team-config>
  </div>
</template>

<script>
import UserConfig from '@/components/Config/UserConfig'
import TeamConfig from '@/components/Config/TeamConfig'

export default {
  name: 'Config',
  props: {
    mode: String,
    loginUser: Object
  },
  date: () => {
    return {
      state: 'user'
    }
  },
  methods: {
    gotoUserSetting: function () {
      this.state = 'user'
    },
    gotoTeamSetting: function () {
      this.state = 'team'
    }
  },
  mounted: function () {
    this.state = this.configState
  },
  components: {
    'user-config': UserConfig,
    'team-config': TeamConfig
  }
}
</script>

<style lang="sass" scoped>

</style>
