/* 検索時の表示順を選択する
 * 選択肢は『良い記録順』『実施日順』
 */

<template>
  <div class="record-group-select">
    <el-select
      placeholder="グループを選ぶ"
      v-model="selected_option"
      v-on:input="selectOption"
    >
      <el-option
        v-for="option in options"
        :value="option.value"
        :label="option.label"
        :key="option.id"
        ></el-option>
    </el-select>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = true

export default {
  name: 'RecordGroupSelect',
  data: () => {
    return {
      options: [
        {
          label: '良い記録順',
          value: 'result'
        },
        {
          label: '実施日順',
          value: 'date'
        }
      ],
      selected_option: null
    }
  },
  methods: {
    selectOption: function () {
      this.$emit('input', this.selected_option)
    }
  }
}

</script>

<style lang="sass" scoped>

</style>
