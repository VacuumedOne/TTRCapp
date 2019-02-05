<template>
  <div class="record-item-select">
    <el-select placeholder="種目を選ぶ" v-model="value">
      <el-option
        v-for="item in items"
        v-bind:value="item.item_id"
        v-bind:label="item.item_name"
        v-bind:key="item.item_id"
        v-on:input="$emit('input', item_id)"
        ></el-option>
    </el-select>
  </div>
</template>

<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

export default {
  name: 'RecordItemSelect',
  data: () => {
    return {
      resultItem: [],
      value: -1
    }
  },
  computed: {
    items: function () {
      console.log(this.resultItem)
      return this.resultItem
    }
  },
  props: {
    'group_id': Number
  },
  methods: {
    out: function () {
      console.log(this.group_id)
    }
  },
  created: function () {
    console.log(this.group_id)
    axios.post('/record-item/list/api', {group_id: 3})
      .then((result) => {
        console.log(result)
        this.resultItem = result.data.text
      }).catch((err) => {
        console.log(err)
      })
  }
}

</script>

<style lang="sass" scoped>

</style>
