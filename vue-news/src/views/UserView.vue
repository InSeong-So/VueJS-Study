<template>
  <div>
    <p>name : {{ userInfo.id }}</p>
    <p>karma : {{ userInfo.karma }}</p>
    <p>created : {{ userInfo.created }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    // 태그 안에 코드들이 최대한 정돈되게 해야한다.
    // 어느 위치에 어떤 변수가 있는지 모르는 상황에서는
    // 최대한 정리해야한다.
    userInfo() {
      return this.$store.state.user;
    },
  },
  created() {
    const userName = this.$route.params.id;
    // axios.get(`https://api.hnpwa.com/v0/user/${tuserName}.json`);
    // payload, 여러 인자는 무조건 하나의 객체로 묶어서 보낼 것
    this.$store.dispatch("FETCH_USER", userName);
  },
};
</script>

<style>
</style>