<template>
  <div class="others_register">
    その他の記録を行います。(未実装)
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
