<template>
  <div class="time-result-form">
    <div class="window">
      <div class="window_box">
        <label class="num">{{disp_num}}</label>
        <label class="unit">{{unit}}</label>
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
export default {
  name: 'TimeResultForm',
  props: {
    default: String
  },
  data: () => {
    return {
      disp_num: '1:50.0',
      result_ms: 110000, // 表示する値の内蔵値。110000msなら、110000ms->110.0s->1:50.0
      unit: '/500m'
    }
  },
  watch: {
    result_ms: function () {
      console.log(333)
      let min = Math.floor(this.result_ms / 60000)
      let s = Math.floor((this.result_ms % 60000) / 1000)
      let ms = (this.result_ms % 1000) / 100
      let disp = '' + min + ':' + this.zeroPadding(s, 2) + ':' + ms
      this.disp_num = disp
      this.$emit('input', disp)
    }
  },
  methods: {
    zeroPadding: function (num, digit) {
      //numをdigit桁で0パディングする
      //例) zeroPadding(5, 3) => 005
      let padded = ''
      for (let i = 0; i < digit; i++) {
        padded += '0'
      }
      padded += num
      return padded.slice((-1) * digit)
    },
    addToResult: function (num) {
      this.result_ms += num
    }
  },
  mounted: function () {
    this.disp_num = this.default
  }
}
</script>

<style lang="sass" scoped>
.window_box
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
