import Vue from 'vue'
import Router from 'vue-router'
import ExpenseWrite from '@/components/ExpenseWrite'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'ExpenseWrite',
        component: ExpenseWrite
    }]
})