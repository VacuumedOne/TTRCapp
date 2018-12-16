<template>
  <div class='UserRegister'>
    <h2>{{ msg }}</h2>
    <div>
      <form action='http://localhost:3000/user/register/api' method='post'>

        <span>名前([0-9a-zA-Z])</span>
        <input type='text' name='user_name'>

        <span>パスワード</span>
        <input type='password' name='hashed_pw'>

        <span>メールアドレス</span>
        <input type='text' name='mail'>

        <span>性別</span>
        <select name='sex'>
          <option value='male'>男</option>
          <option value='female'>女</option>
        </select>

        <span>役職</span>
        <select name='auth'>
          <option value='2'>コックスorトレーナー</option>
          <option value='3'>漕手</option>
          <option value='4'>監督</option>
        </select>

        <span>生年月日</span>
        <input type='date' name='birth_ymd'>

        <span>名前</span>
        <input type='text' name='k_lastname'>
        <input type='text' name='k_firstname'>

        <span>ふりがな</span>
        <input type='text' name='h_lastname'>
        <input type='text' name='h_firstname'>

        <input type='submit'>
      </form>
    </div>
    <text-form></text-form>
  </div>
</template>

<script>
import TextForm from './Input/TextForm'

export default {
  name: 'UserRegister',
  data () {
    return {
      msg: 'ユーザ登録ページ'
    }
  },
  components: {
    'text-form': TextForm
  }
}
</script>
