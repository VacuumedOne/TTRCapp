<template>
  <div class='text_form'>
    <input type='text' v-bind:name="name">
  </div>
</template>

<script>
export default {
  name: 'text_form',
  props: ['name']
}
</script>

<style scoped>

</style>
