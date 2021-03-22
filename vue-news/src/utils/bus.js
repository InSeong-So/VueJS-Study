// eventBus 등록
// 일반적으로는 라이프사이클 훅 내부에 정의한다.
import Vue from 'vue';

// // bus.js
// export const bus = new Vue();
// // App.vue
// import { bus } from './bus.js';

// bus.js
export default new Vue();
// // App.vue
// import Bus from './bus.js';