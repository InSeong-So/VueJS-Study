import Vue from 'vue';
import App from './App.vue';
// 분리한 router 모듈
import { router } from './routes/index.js';
import { store } from './store/index.js';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  // Vue 인스턴스에 연결, router:router의 축약어
  router,
  // Vue 인스턴스에 연결, store:store의 축약어
  store,
}).$mount('#app')
