<template>
  <div class="date_picker">
    <el-date-picker
      v-model="date"
      type="date"
      v-on:input="$emit('input', date)"
      ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  date: () => {
    return {
      date: null
    }
  },
  created: function () {
    this.date = new Date()
  },
  mounted: function () {
    this.$emit('input', this.date)
  }
}
</script>

<style lang="sass" scoped>

</style>
