<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&subset=japanese');

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  width: 100%
}
body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
* {
  margin: 0px;
  font-family: 'Noto Sans JP', sans-serif;
}
</style>
