<template>
  <div class="date_picker">
    <el-date-picker
      v-model="date"
      type="date"
      v-on:input="$emit('input', ymd)"
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
    this.$emit('input', this.ymd)
  },
  computed: {
    ymd: function () {
      let ret = ''
      let y, m, d
      y = this.date.getFullYear()
      m = this.date.getMonth() + 1
      d = this.date.getDate()
      //月と日付は、一桁になったら0で桁を埋める
      ret += y + '-' + ((m < 10) ? ('0' + m) : m) + '-' + ((d < 10) ? ('0' + d) : d)
      return ret
    }
  }
}
</script>

<style lang="sass" scoped>

</style>
