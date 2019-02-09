<template>
  <div class="personal_view">
    <v-app>
      <v-navigation-drawer
        fixed
        v-model="drawer"
        app
      >
        <v-btn class="white gray--text" @click="sendToParent">戻る</v-btn>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>library_books</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>最近のログ</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>notes</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>表で見る</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>show_chart</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>グラフで見る</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="indigo" dark fixed app>
        <v-toolbar-title>自分の記録を見る</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <recent-records></recent-records>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import RecentRecords from '@/components/View/PersonalView/RecentRecords'

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
  },
  components: {
    'recent-records': RecentRecords
  }
}
</script>

<style lang="sass" scoped>
.menu-item
  font-size: 30px
.menu-title
  font-size: 20px
</style>
