<template>
  <div class="config">
    <v-btn @click="gotoUserSetting">ユーザ管理</v-btn>
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
  data: () => {
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
    this.state = this.mode
  },
  components: {
    'user-config': UserConfig,
    'team-config': TeamConfig
  }
}
</script>

<style lang="sass" scoped>

</style>
