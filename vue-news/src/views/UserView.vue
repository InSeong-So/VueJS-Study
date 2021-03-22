<template>
  <div>
    <UserProfile :info="userInfo"></UserProfile>
    <!-- <p>name : {{ userInfo.id }}</p>
    <p>karma : {{ userInfo.karma }}</p>
    <p>created : {{ userInfo.created }}</p> -->
  </div>
</template>

<script>
import UserProfile from "../components/UserProfile.vue";

export default {
  components: {
    UserProfile,
  },
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
    this.$store.dispatch("FETCH_USER", userName);
  },
};
</script>

<style>
</style>