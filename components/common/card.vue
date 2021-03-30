<template>
  <div class="card">
    <div class="header">
      <div class="header-title">{{title}}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "店铺截图",
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: #fff;
  border-radius: 32px;
  padding-top: 24px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  .header {
    padding-left: 22px;
    height: 78px;
    display: flex;
    align-items: center;
    .header-title {
      border-left: 8px solid #f4632c;
      border-radius: 4px;
      padding-left: 12px;
      font-weight: 700;
      font-size: 28px;
    }
  }
}
</style>
