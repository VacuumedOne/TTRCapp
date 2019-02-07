<template>
  <div>
    <el-input-number
      class="number_form"
      size="medium"
      :min="0"
      :max="99"
      v-model="form.minute"
      v-on:input="emitResult"></el-input-number>:
    <el-input-number
      class="number_form"
      size="medium"
      :min="0"
      :max="5"
      v-model="form.second_10"
      v-on:input="emitResult"></el-input-number>
    <el-input-number
      class="number_form"
      size="medium"
      :min="0"
      :max="9"
      v-model="form.second_1"
      v-on:input="emitResult"></el-input-number>
  </div>
</template>

<script>
export default {
  name: 'ResultForm',
  data: () => {
    return {
      form: {
        minute: 1,
        second_10: 5,
        second_1: 0
      }
    }
  },
  computed: {
    result: function () {
      return this.form.minute + ':' + this.form.second_10 + this.form.second_1
    }
  },
  methods: {
    emitResult: function () {
      this.$emit('input', this.result)
    }
  }
}
</script>

<style lang="sass" scoped>
.number_form
  width: 30%
</style>
