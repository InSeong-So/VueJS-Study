import Vue from 'vue';
import VueRouter from 'vue-router';
// 컴포넌트 페이지 import
import NewsView from '../views/NewsView.vue'
import AskView from '../views/AskView.vue'
import JobsView from '../views/JobsView.vue'
import ItemView from '../views/ItemView.vue'
import UserView from '../views/UserView.vue'
// + 같은 단어 동시 선택 단축키 : Ctrl + D, Cmd + D

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/news',
        },
        {
            // path : url 주소
            path: '/news',
            // component : 특정 url 주소로 갔을 때 표시될 컴포넌트
            component: NewsView,
        },
        {
            path: '/ask',
            component: AskView,
        },
        {
            path: '/jobs',
            component: JobsView,
        },
        {
            path: '/item',
            component: ItemView
        },
        {
            path: '/user',
            component: UserView
        }
    ]
})