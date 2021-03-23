<template>
  <div>
    <ul>
      <item>아이템 1</item>
      <item>
        아이템 2
        <button>Click me</button>
      </item>
      <item>
        <div>아이템3</div>
        <img
          src="./assets/endgame.png"
          alt="어벤져스 엔드게임"
          width="50px"
          height="50px"
        />
      </item>
      <item>
        <div style="color: blue; font-size: 20px">아이템4</div>
      </item>
    </ul>
  </div>
</template>

<script>
import Item from "./Item.vue";

export default {
  components: {
    Item,
  },
};
</script>