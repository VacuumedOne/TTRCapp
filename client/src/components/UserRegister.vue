<template>
  <div class="UserRegister">
    <h2>{{ msg }}</h2>
    <div>
      <form action='http://localhost:3000/user/register/api' method="post">

        <span>名前([0-9a-zA-Z])</span>
        <input type="text" name="user_name">

        <span>パスワード</span>
        <input type="password" name="password">

        <span>性別</span>
        <select name="sex">
          <option value="male">男</option>
          <option value="male">女</option>
        </select>

        <span>生年月日</span>
        <input type="date" name="birth_ymd">

        <input type="submit">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRegister',
  data () {
    return {
      msg: 'ユーザ登録ページ'
    }
  }
}
</script>
