<template>
  <div class="test">
    <div class="test_inner">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "alfredo"
    };
  }
};
</script>

<style lang="scss" scoped>
.test {
  display: flex;
  .test_inner {
    flex: 1;
    width: 100px;
    background-color: green;
  }
}
</style>
