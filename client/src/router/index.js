import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '東工大端艇部アプリ',
        desc: '東工大端艇部員向けサポートアプリです。'
      }
    }
  ]
})
