<template>
  <div>
    <div class="user-container">
      <div>
        <i class="fas fa-user"></i>
      </div>
      <div class="user-description">
        <div>{{ userInfo.id }}</div>
        <div class="time">
          {{ userInfo.created }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // UserView.vue에서 store에 user 데이터를 담는다.
  // 이미 store에 담겨있으므로 해당 컴포넌트에서 그대로 가져다 쓴다.
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.user-container {
  display: flex;
  align-items: center;
  padding: 0.5rem;
}
.fa-user {
  font-size: 2.5rem;
}
.user-description {
  padding-left: 8px;
}
.time {
  font-size: 0.7rem;
}
</style>