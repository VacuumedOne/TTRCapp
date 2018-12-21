<template>
  <div class='text_form'>
    <input type='text'
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

<style scoped>

</style>
