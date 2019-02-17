<template>
  <div class="time-result-form">
    <div class="window">
      <div class="window_box">
        <label class="num">{{ convert.convert_time_result(result_ms) }}</label>
        <label class="unit">{{ unit }}</label>
      </div>
    </div>
    <div class="buttons">
      <div class="negative-buttons">
        <div class="cntl-button negative">
          <v-btn @click="addToResult(-100)">-0.1</v-btn>
        </div>
        <div class="cntl-button negative">
          <v-btn @click="addToResult(-1000)">-1</v-btn>
        </div>
        <div class="cntl-button negative">
          <v-btn @click="addToResult(-10000)">-10</v-btn>
        </div>
      </div>
      <div class="positive-buttons">
        <div class="cntl-button positive">
          <v-btn @click="addToResult(100)">+0.1</v-btn>
        </div>
        <div class="cntl-button positive">
          <v-btn @click="addToResult(1000)">+1</v-btn>
        </div>
        <div class="cntl-button positive">
          <v-btn @click="addToResult(10000)">+10</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Convert from '@/util/js/Convert'

export default {
  name: 'TimeResultForm',
  props: {
    default: Number
  },
  data: () => {
    return {
      result_ms: 110000, // 表示する値の内蔵値。110000msなら、110000ms->1:50.0
      unit: '/500m',
      convert: Convert
    }
  },
  methods: {
    addToResult: function (num) {
      this.result_ms += num
      this.$emit('input', this.result_ms)
    }
  },
  mounted: function () {
    this.disp_num = this.default
  }
}
</script>

<style lang="sass" scoped>
.window_box
  width: 300px
  display: inline-block
  background-color: white
  border-radius: 4px
  padding:  10px 15px
.num
  font-size: 50px
.unit
  font-size: 16px
.buttons
  display: flex
  justify-content: center
</style>
