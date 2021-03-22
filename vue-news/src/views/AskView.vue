<template>
  <div>
    <ul class="news-list">
      <li v-for="item in this.$store.state.news" class="post">
        <!-- 포인트 영역 -->
        <div class="points">
          {{ item.points }}
        </div>
        <!-- 기타 정보 영역-->
        <div>
          <p class="news-title">
            <router-link :to="`/item/${item.id}`">
              {{ item.title }}
            </router-link>
          </p>
          <small class="link-text">
            {{ item.time_ago }} by
            <router-link :to="`/user/${item.user}`" class="link-text">
              {{ item.user }}
            </router-link>
          </small>
        </div>
      </li>
    </ul>

    <!-- <p v-for="item in askItems">
      <router-link :to="`/item/${item.id}`">
        {{ item.title }}
      </router-link>
      <small> {{ item.time_ago }} by {{ item.user }} </small>
    </p> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    // 1 : 번잡함
    ask() {
      return this.$store.state.ask;
    },
    // 2 : 별로 간편하지 않음(ECMA6 산개연산자)
    ...mapState({
      fetchedAsk: (state) => state.ask,
    }),
    // 3 : 변수에 저장하여 데이터를 사용하고 싶은 경우
    ...mapGetters({
      // 해당 컴포넌트에서 사용할 변수 : vuex의 getter가사용하는 이름
      askItems: "fetchedAsk",
    }),
    // 3-1 : 데이터를 바로 사용하고 싶은 경우
    ...mapGetters(["fetchedAsk"]),
  },
  created() {
    this.$store.dispatch("FETCH_ASK");
  },
};
</script>

<style scoped>
.news-list {
  margin: 0;
  padding: 0;
}

.post {
  list-style: none;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.points {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #42b883;
}

.news-title {
  margin: 0;
}

.link-text {
  color: #828282;
}
</style>