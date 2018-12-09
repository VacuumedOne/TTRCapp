<template>
  <div class="hoge">
    <h1>{{ msg }}</h1>
    <h2>POSTテスト用ページ</h2>
    <div>
      <form action='http://localhost:3000/test/post/api' method="post">
        <input type="text" name="username">
        <input type="submit">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hoge',
  data () {
    return {
      msg: 'message'
    }
  }
}
</script>
