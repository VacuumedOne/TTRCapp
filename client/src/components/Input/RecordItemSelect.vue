<template>
  <div class="record-item-select">
    <select>
      <option v-for="item in input" v-bind:value="item.item_id" v-bind:label="item.item_name" v-bind:key="item.item_id"></option>
    </select>
  </div>
</template>

<script>
var input = [
  {
    item_id: 1,
    item_name: '2000m',
    unit: '[xx:xx.xx]'
  },
  {
    item_id: 2,
    item_name: '10分間',
    unit: '[xx:xx.xx]'
  }
]

export default {
  name: 'RecordItemSelect',
  data: () => {
    return {
      input: input
    }
  }
}

</script>

<style lang="sass" scoped>

</style>
