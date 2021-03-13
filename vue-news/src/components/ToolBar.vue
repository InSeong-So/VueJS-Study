<template>
  <div class="header">
    <router-link to="/news">News</router-link> |
    <router-link to="/ask">Ask</router-link> |
    <router-link to="/jobs">Jobs</router-link>
  </div>
</template>

<!-- vue loader에서 제공하는 기능, 컴포넌트별 스타일링 가능-->
<style scoped>
.header {
  color: white;
  background-color: #42b883;
  display: flex;
  padding: 8px;
}

/* vue-router에서 제공하는 앵커 클래스 */
.header .router-link-exact-active {
  color: #35495e;
}

.header a {
  color: white;
}
</style>