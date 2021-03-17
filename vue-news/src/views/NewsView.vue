<template>
  <div>
    <div v-for="user in this.$store.state.news">{{ user.title }}</div>
  </div>
</template>

<script>
import { fetchNewsList } from "../api/index.js";

export default {
  created() {
    this.$store.dispatch('FETCH_NEWS');
  },
};
</script>

<style>
</style>