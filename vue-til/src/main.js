import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
import { formatDate } from '@/utils/filters';

// 필터 전역으로 설정
Vue.filter('formatDate', formatDate);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
