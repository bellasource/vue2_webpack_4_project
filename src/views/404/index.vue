<template>
  <div class="no-match-url">
    <span>404</span>
    <p>抱歉，你访问的页面不存在</p>
  </div>
</template>

<script>
export default {
  name: 'NoMatch',
};
</script>

<style lang="less" scoped>
.no-match-url {
  margin: 0;
  cursor: default;
  user-select: none;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 24px;
    font-weight: 500;
    border-bottom: 0;
    border-right: 1px solid #000;
    padding: 0 20px 0 0;
    width: auto;
  }

  p {
    margin: 0;
    padding-left: 20px;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>
