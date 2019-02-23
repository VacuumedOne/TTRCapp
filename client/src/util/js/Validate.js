module.exports = {
  nameRules: [
    v => !!v || '必須項目です.',
    v => (v && v.length <= 10) || '10文字以下で入力してください.'
  ],
  emailRules: [
    v => !!v || '必須項目です.',
    v => /.+@.+/.test(v) || 'メールアドレスが不正です.'
  ],
  passwordRules: [
    v => !!v || '必須項目です.',
    v => (v && v.length >= 8) || '8文字以上の半角英数字です.'
  ]
}
