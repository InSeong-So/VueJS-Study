import Vue from 'vue';
import VueRouter from 'vue-router';
// 컴포넌트 페이지 import : HOC 적용으로 인해 필요 없어짐
import NewsView from '../views/NewsView.vue'
import AskView from '../views/AskView.vue'
import JobsView from '../views/JobsView.vue'
import UserView from '../views/UserView.vue'
import ItemView from '../views/ItemView.vue'
// + 같은 단어 동시 선택 단축키 : Ctrl + D, Cmd + D
// function이므로 소문자 사용
// import createListView from '../views/CreateListView.js'
// beforeEnter를 위함
import bus from '../utils/bus.js'
import { store } from '../store/index.js';

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
            name: 'news',
            // component : 특정 url 주소로 갔을 때 표시될 컴포넌트
            component: NewsView, // mixins 사용
            // component: createListView('NewsView'),
            // 라우터 - beforeEnter = 기본 인자로 받음
            beforeEnter: (to, from, next) => {
                // to : 이동할 URL의 라우팅 정보
                // console.log('to', to);
                // from : 현재 URL의 라우팅 정보
                // console.log('from', from);
                // function next() 를 호출해야지만 to로 이동함
                // console.log(next);
                // 가장 자주 사용하는 방법
                // if (to.matched === '') {
                //     next();
                // }
                // else if (to.auth) {

                // }
                // else {
                //     router.replace('/');
                // }
                bus.$emit("start:spinner");
                store.dispatch("FETCH_LIST", to.name)
                    .then(() => {
                        console.log("fetched");
                        bus.$emit("end:spinner");
                        next();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        {
            path: '/ask',
            name: 'ask',
            component: AskView,
            // component: createListView('AskView'),
            beforeEnter: (to, from, next) => {
                bus.$emit("start:spinner");
                store.dispatch("FETCH_LIST", to.name)
                    .then(() => {
                        console.log("fetched");
                        // bus.$emit("end:spinner");
                        next();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        {
            path: '/jobs',
            name: 'jobs',
            component: JobsView,
            // component: createListView('JobsView'),
            beforeEnter: (to, from, next) => {
                bus.$emit("start:spinner");
                store.dispatch("FETCH_LIST", to.name)
                    .then(() => next())
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        {
            // 동적 라우팅
            path: '/user/:id',
            component: UserView
        },
        {
            path: '/item/:id',
            component: ItemView
        },
    ]
})