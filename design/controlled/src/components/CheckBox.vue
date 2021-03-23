<template>
  <input type="checkbox" :value="value" @click="toggleCheckBox" />
</template>

<script>
export default {
  // @input 이벤트 : 올릴 때
  // :value 값 : 내릴 때
  props: ["value"],
  methods: {
    toggleCheckBox() {
      this.$emit("input", !this.value);
    },
  },
};
</script>