'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  VUE_APP_API_SERVER_BASE_URL: 'http://rowingkuramae.com',
  NODE_ENV: '"development"'
})
