<template>
  <div class="number-result-form">
    <div class="window">
      <div class="window_box">
        <label class="num">{{result/1000}}</label>
        <label class="unit">{{unit}}</label>
      </div>
    </div>
    <div class="buttons">
      <div class="negative-buttons">
        <div class="cntl-button negative">
          <v-btn @click="addToResult(-2500)">-2.5</v-btn>
        </div>
        <div class="cntl-button negative">
          <v-btn @click="addToResult(-5000)">-5</v-btn>
        </div>
        <div class="cntl-button negative">
          <v-btn @click="addToResult(-10000)">-10</v-btn>
        </div>
      </div>
      <div class="positive-buttons">
        <div class="cntl-button positive">
          <v-btn @click="addToResult(2500)">+2.5</v-btn>
        </div>
        <div class="cntl-button positive">
          <v-btn @click="addToResult(5000)">+5</v-btn>
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
  name: 'NumberResultForm',
  props: {
    default: Number
  },
  data: () => {
    return {
      result: 500000, // 表示する値。
      unit: 'kg'
    }
  },
  methods: {
    addToResult: function (num) {
      this.result += num
    }
  },
  mounted: function () {
    this.result = this.default
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
