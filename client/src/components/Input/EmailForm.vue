<template>
  <div class='email_form'>
    <input type='email' v-bind:name="name">
  </div>
</template>

<script>
export default {
  name: 'email_form',
  props: ['name']
}
</script>

<style scoped>

</style>
