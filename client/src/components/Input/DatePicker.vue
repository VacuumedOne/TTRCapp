<template>
  <div class="date_picker">
    <!--TODO:正常に動いていない -->
    <el-date-picker
      v-bind:value="date"
      type="date"
      v-on:input="inputDate"
      format="yyyy-MM-dd"
      :clearable="false"
    ></el-date-picker>
    <div>
      ↑現在表示がうまく動いていません。内部的には日付は入力できているので、一度だけ操作してください。
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  data: () => {
    return {
      date: null,
      temp: null
    }
  },
  methods: {
    inputDate: function (value) {
      this.date = value
      this.temp = value
      this.$emit('input', value)
      console.log(value)
    }
  },
  created: function () {
    this.date = new Date()
    this.temp = this.date.toISOString().substr(0, 10)
  },
  mounted: function () {
    this.$emit('input', this.date)
  }
}
</script>

<style lang="sass" scoped>

</style>
