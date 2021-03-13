<template>
  <div id="app">
    <!-- url이 만약 news -->
    <!-- <NewsView></NewsView> -->
    <!-- url이 만약에 path에 일치하는 주소라면 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods:{
    fetchData(){
      console.log('hello');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
