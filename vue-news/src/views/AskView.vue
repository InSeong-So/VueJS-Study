<template>
  <div>
    <ListItem></ListItem>
  </div>
</template>

<script>
import ListItem from "../components/ListItem.vue";
// import ListMixin from "../mixins/ListMixin.js";
import bus from "../utils/bus.js";

export default {
  components: {
    ListItem,
  },
  // mixins: { ListMixin },
  // 인스턴스가 화면에 불려오는것이 완료되었을 때
  mounted() {
    bus.$emit("end:spinner");
  },
};
</script>