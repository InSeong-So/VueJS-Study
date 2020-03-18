import Vue from 'vue'
import Router from 'vue-router'
import ExpenseWrite from '@/components/ExpenseWrite'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    , {
      path: '/',
      name: 'ExpenseWrite',
      component: ExpenseWrite
    }]
})
