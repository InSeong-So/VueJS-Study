<template>
  <div>
    <div v-for="user in users">{{ user.title }}</div>
  </div>
</template>

<script>
import { fetchNewsList } from "../api/index.js";

export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    var vm = this;
    fetchNewsList()
      .then((response) => {
        vm.users = response.data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style>
</style>