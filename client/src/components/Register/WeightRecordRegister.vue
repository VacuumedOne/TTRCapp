<template>
  <div class="weight_register">
    ウェイトの記録を行います。(未実装)
    <el-button @click="sendToParent">戻る</el-button>
  </div>
</template>

<script>
export default {
  name: 'WeightRegister',
  methods: {
    sendToParent: function () {
      this.$emit('send', 'top')
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
