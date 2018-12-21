<template>
  <div class='text_form'>
    <input
    class="form"
    type='text'
    v-bind:name="name"
    v-bind:placeholder="placeholder"
    v-on:input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'text_form',
  props: ['name', 'placeholder']
}
</script>

<style lang="sass" scoped>
  #form
    width: 145px
    height: 20px
    border-radius: 8px
    margin-top: 10px
    margin-bottom: 10px
</style>
