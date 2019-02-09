<template>
  <div class="personal_view">
    <el-button @click="sendToParent">戻る</el-button>
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">個人の記録を見る</span>
      </md-app-toolbar>
      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent menu-title" md-elevation="0">
          Menu
        </md-toolbar>
        <md-list>
          <span class="md-list-item-text menu-item">最近の記録</span>
        </md-list>
        <md-list>
          <span class="md-list-item-text menu-item">表で見る</span>
        </md-list>
      </md-app-drawer>
    </md-app>
  </div>
</template>

<script>
export default {
  name: 'PersonalView',
  props: {
    login_user: Object
  },
  data: () => {
    return {
      state: ''
    }
  },
  methods: {
    sendToParent: function () {
      this.$emit('send', 'top')
    }
  }
}
</script>

<style lang="sass" scoped>
.menu-item
  font-size: 30px
.menu-title
  font-size: 20px
</style>
