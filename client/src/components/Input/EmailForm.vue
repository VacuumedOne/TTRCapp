<template>
  <div class='email_form'>
    <input
    id="form"
    type='email'
    v-bind:name="name"
    v-bind:placeholder="placeholder"
    v-on:input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: 'email_form',
  props: ['name', 'placeholder']
}
</script>

<style lang="sass" scoped>
  #form
    width: 300px
    height: 20px
    border-radius: 8px
    margin: 10px
</style>
