<template>
  <div>
    <!-- 사용자 정보-->
    <div class="user-container">
      <div>
        <i class="fas fa-user"></i>
      </div>
      <div class="user-description">
        <!-- <div>userName : {{ info.id }}</div> -->
        <!-- 하위 컴포넌트의 내용을 미완성인 상태로 둔다 -->
        <slot name="userName">
          <!-- 상위 컴포넌트에서 정의할 영역-->
        </slot>
        <div class="time">
          <!-- time : {{ info.created }} -->
          <slot name="time">
            <!-- 상위 컴포넌트에서 정의할 영역-->
          </slot>
        </div>
        <div>
          <slot name="karma"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props로 userInfo 데이터를 내려보낸다.
  props: {
    info: Object,
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