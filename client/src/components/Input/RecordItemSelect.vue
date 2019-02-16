<template>
  <div class="record-item-select">
    <el-select
      placeholder="種目を選ぶ"
      v-model="selected_id"
      v-on:input="selectOption"
    >
      <el-option
        v-for="item in items"
        :value="item.id"
        :label="item.item_name"
        :key="item.id"
        ></el-option>
    </el-select>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_BASE_URL
axios.defaults.withCredentials = true

export default {
  name: 'RecordItemSelect',
  data: () => {
    return {
      input: [],
      selected_id: '',
      selected_item: null
    }
  },
  methods: {
    selectOption: function () {
      this.findOption()
      this.$emit('input', this.selected_item)
    },
    findOption: function () {
      for (let item of this.items) {
        if (item.id === this.selected_id) {
          this.selected_item = item
        }
      }
    }
  },
  computed: {
    items: function () {
      return this.input
    }
  },
  props: {
    'group_id': Number
  },
  created: async function () {
    let res = await axios.post('/record-item/list/api', {group_id: 1})
    if (res.status === 200) {
      this.input = res.data
    }
  }
}

</script>

<style lang="sass" scoped>

</style>
