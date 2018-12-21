<template>
  <div class='email_form'>
    <input type='email'
    v-bind:name="name"
    v-on:input="$emit('input', $event.target.value)">
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
