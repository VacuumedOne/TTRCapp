<template>
  <div class="record-item-select">
    <el-select placeholder="種目を選ぶ" v-model="value" v-on:input="$emit('input', value)">
      <el-option
        v-for="item in items"
        v-bind:value="item.item_id"
        v-bind:label="item.item_name"
        v-bind:key="item.item_id"
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
      value: null
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
  methods: {
  },
  created: function () {
    axios.post('/record-item/list/api', {group_id: 3})
      .then((result) => {
        this.input = result.data.text
      }).catch((err) => {
        console.error(err)
      })
  }
}

</script>

<style lang="sass" scoped>

</style>
