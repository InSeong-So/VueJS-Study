<template>
  <div id="app">
    <!-- Strongly Recommended-->
    <ToolBar></ToolBar>
    <!-- name에 들어오는 내용이 css의 prefix가 됨 -->
    <transition name="page">
      <router-view></router-view>
    </transition>
    <!-- Essential -->
    <!-- <tool-bar></tool-bar> -->
  </div>
</template>

<script>
import ToolBar from "./components/ToolBar.vue";

export default {
  components: {
    // vs-code는 파스칼케이스로 자동 등록
    // 소문자-케밥케이스로 HTML사용
    ToolBar,
  },
};
</script>
<style>
body {
  padding: 0;
  margin: 0;
}

a {
  color: #34495e;
  text-decoration: none;
}

a:hover {
  color: #42b883;
  text-decoration: underline;
}

a.router-link-exact-active {
  text-decoration: underline;
}

/* Router Transition */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
