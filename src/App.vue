<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
  mounted() {
    this.$API.home.example1();
  },
};
</script>

<style lang="less" scoped>
#app {
  height: 100%;
}
</style>
