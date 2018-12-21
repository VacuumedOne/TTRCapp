<template>
  <div class='auth_form'>
    <select
    v-bind:name="name"
    v-on:input="$emit('input', $event.target.value)">
      <option value='2'>コックスorトレーナー</option>
      <option value='3' selected>漕手</option>
      <option value='4'>監督</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'auth_form',
  props: ['name']
}
</script>

<style scoped>

</style>
