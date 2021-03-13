import Vue from 'vue';
import App from './App.vue';
// 분리한 router 모듈
import {router} from './router/index.js';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // Vue 인스턴스에 연결, router:router의 축약어
  router,
}).$mount('#app')
