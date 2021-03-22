<template>
  <div>
    <button @click="loginUser">login</button>
    <h1>List</h1>
    <ul>
      <li v-for="item in items">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    loginUser1() {
      axios
        .get("https://jsonplaceholder.typeicode.com/users/1")
        .then((response) => {
          if (response.data.id === 1) {
            console.log("사용자 인증되었습니다.");
            axios
              .get("https://jsonplaceholder.typeicode.com/todos")
              .then((response) => {
                this.items = response.data;
              });
          }
        })
        .catch((error) => console.log(error));
    },
    async loginUser() {
      var response = await axios.get(
        "https://jsonplaceholder.typeicode.com/users/1"
      );
      // async-await를 한다고 아래 코드를 실행시키지 않는게 아님
      // 프로미스를 async-await를 통해 구현하는 것
      console.log(10);
      if (response.data.id === 1) {
        console.log("사용자 인증되었습니다.");
        var list = await axios.get("https://jsonplaceholder.typeicode.com/todos");
        this.itmes = list.data;
      }
    },
  },
};
</script>

<style>
</style>