<template>
  <div class="record-item-select">
    {{ items }}
    <select>
      <option v-for="item in items" v-bind:value="item.item_id" v-bind:label="item.item_name" v-bind:key="item.item_id"></option>
    </select>
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
      items: ['a']
    }
  },
  props: ['group_id'],
  created: () => {
    console.log(this.group_id)
    axios.post('/record-item/list/api', {group_id: 3})
      .then((result) => {
        console.log(result)
        this.items = result
      }).catch((err) => {
        console.log(err)
      })
  }
}

</script>

<style lang="sass" scoped>

</style>
