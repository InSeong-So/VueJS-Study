<template>
  <div>
    <div v-for="job in jobs">{{job.title}}</div>
  </div>
</template>

<script>
import { fetchJobsList } from "../api/index.js";

export default {
  data() {
    return {
      jobs: [],
    };
  },
  created() {
    var vm = this;
    fetchJobsList()
      .then((response) => {
        vm.jobs = response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>