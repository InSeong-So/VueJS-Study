<template>
  <div>
    <ListItem></ListItem>
    <!-- <ul class="news-list">
      <li v-for="item in this.$store.state.news" class="post">
        <div class="points">
          {{ item.points }}
        </div>
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
    </ul> -->
  </div>
</template>

<script>
import ListItem from "../components/ListItem.vue";

// import { mapState, mapGetters } from "vuex";

export default {
  components: {
    ListItem,
  },
  // computed: {
  //   // 1 : 번잡함
  //   ask() {
  //     return this.$store.state.ask;
  //   },
  //   // 2 : 별로 간편하지 않음(ECMA6 산개연산자)
  //   ...mapState({
  //     fetchedAsk: (state) => state.ask,
  //   }),
  //   // 3 : 변수에 저장하여 데이터를 사용하고 싶은 경우
  //   ...mapGetters({
  //     // 해당 컴포넌트에서 사용할 변수 : vuex의 getter가사용하는 이름
  //     askItems: "fetchedAsk",
  //   }),
  //   // 3-1 : 데이터를 바로 사용하고 싶은 경우
  //   ...mapGetters(["fetchedAsk"]),
  // },
  // created() {
  //   this.$store.dispatch("FETCH_ASK");
  // },
};
</script>