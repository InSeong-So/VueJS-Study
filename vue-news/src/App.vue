<template>
  <div id="app">
    <!-- Strongly Recommended-->
    <ToolBar></ToolBar>
    <!-- Essential -->
    <!-- <tool-bar></tool-bar> -->
    <router-view></router-view>
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
</style>
