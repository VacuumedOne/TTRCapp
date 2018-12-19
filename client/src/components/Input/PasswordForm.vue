<template>
  <div class='password_form'>
    <input type='password' v-bind:name="name">
  </div>
</template>

<script>
export default {
  name: 'password_form',
  props: ['name']
}
</script>

<style scoped>

</style>
