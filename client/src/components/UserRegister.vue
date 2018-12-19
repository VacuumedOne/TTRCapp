<template>
  <div class='UserRegister'>
    <h2>{{ msg }}</h2>
    <div id="user_register_form">
      ユーザ名<text-form name="user_name"></text-form>
      漢字姓<text-form name="k_lastname"></text-form>
      漢字名<text-form name="k_firstname"></text-form>
      ひらがな姓<text-form name="h_lastname"></text-form>
      ひらがな名<text-form name="h_firstname"></text-form>
      パスワード<password-form name="hashed_pw"></password-form>
      メールアドレス<email-form name="mail"></email-form>
      性別<sex-form name="sex"></sex-form>
      生年月日<date-form name="birth_ymd"></date-form>
      役職<auth-form name="auth"></auth-form>
      <submit value="登録"></submit>
    </div>
  </div>
</template>

<script>
import TextForm from './Input/TextForm'
import AuthForm from './Input/AuthForm'
import DateForm from './Input/DateForm'
import EmailForm from './Input/EmailForm'
import PasswordForm from './Input/PasswordForm'
import SexForm from './Input/SexForm'
import Submit from './Input/Submit'

export default {
  name: 'UserRegister',
  data () {
    return {
      msg: 'ユーザ登録ページ'
    }
  },
  method: {
    postUserRegisterAPI: function () {

    }
  },
  components: {
    'text-form': TextForm,
    'auth-form': AuthForm,
    'date-form': DateForm,
    'email-form': EmailForm,
    'password-form': PasswordForm,
    'sex-form': SexForm,
    'submit': Submit
  }
}
</script>
