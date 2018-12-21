<template>
  <div class='submit'>
    <input type='submit' v-bind:value="value">
  </div>
</template>

<script>
export default {
  name: 'email_form',
  props: ['value']
}
</script>

<style scoped>

</style>
