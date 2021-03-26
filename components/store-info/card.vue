<template>
  <view class="card">
    <view class="header">
      <view class="header-title">{{title}}</view>
    </view>
    <slot></slot>
  </view>
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
  border-radius: 32rpx;
  padding-top: 24rpx;
  padding-bottom: 50rpx;
  margin-bottom: 20rpx;
  .header {
    padding-left: 22rpx;
    height: 78rpx;
    display: flex;
    align-items: center;
    .header-title {
      border-left: 4px solid #f4632c;
      border-radius: 4rpx;
      padding-left: 12rpx;
      font-weight: 700;
      font-size: 28rpx;
    }
  }
}
</style>
