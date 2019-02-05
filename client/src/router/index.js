import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserRegister from '@/components/UserRegister'
import Login from '@/components/Login'
import Index from '@/components/Index'
import ErgoRecordRegister from '@/components/ErgoRecordRegister'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user/register',
      name: 'UserRegister',
      component: UserRegister
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/register/ergo',
      name: 'ErgoRecordRegister',
      component: ErgoRecordRegister
    }
  ]
})
