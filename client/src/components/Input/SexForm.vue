<template>
  <div class='sex_form'>
    <select
    v-bind:name="name"
    v-on:input="$emit('input', $event.target.value)">
      <option value='male'>男</option>
      <option value='female'>女</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'sex_form',
  props: ['name']
}
</script>

<style scoped>

</style>
