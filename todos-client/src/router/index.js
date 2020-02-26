import Vue from 'vue'
import Router from 'vue-router'
import TodoPage from '@/components/TodoPage'

import axios from 'axios'

Vue.prototype.$http = axios

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'TodoPage',
        component: TodoPage
    }]
});