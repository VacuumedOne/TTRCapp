<template>
  <div class="team_view">
    チーム単位での記録を見る。(未実装)
    <el-button @click="sendToParent">戻る</el-button>
  </div>
</template>

<script>
export default {
  name: 'OthersRegister',
  methods: {
    sendToParent: function () {
      this.$emit('send', 'Top')
    }
  }
}
</script>

<style lang="sass" scoped>
  
</style>
