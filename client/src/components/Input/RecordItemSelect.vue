// グループIDもしくはグループ名を指定して、それを選択できる様にする

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
    'group_id': {type: Number, default: null},
    'group_name': {type: String, default: null}
  },
  created: async function () {
    console.log(this.group_id)
    console.log(this.group_name)
    if (this.group_id !== null) {
      let res = await axios.post('/record-item/list/api', {group_id: this.group_id})
      if (res.status === 200) {
        this.input = res.data
      }
    } else if (this.group_name !== null) {
      let res1 = await axios.post('/record-group/search/api', {group_name: this.group_name})
      if (res1.status === 200) {
        let res2 = await axios.post('/record-item/list/api', {group_id: res1.data.id})
        if (res2.status === 200) {
          this.input = res2.data
        }
      }
    }
  }
}

</script>

<style lang="sass" scoped>

</style>
