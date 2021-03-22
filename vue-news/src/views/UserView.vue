<template>
  <div>
    <UserProfile :info="userInfo">
      <div slot="userName">{{ userInfo.id }}</div>
      <!-- 태그 없이 텍스트만 들어감 -->
      <span slot="time">{{ "Joined " + userInfo.created }}, </span>
      <span slot="karma">{{ userInfo.karma }}</span>
    </UserProfile>
  </div>
</template>

<script>
import UserProfile from "../components/UserProfile.vue";

export default {
  components: {
    UserProfile,
  },
  computed: {
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