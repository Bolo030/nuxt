<template>
  <div id="coupon">
    <van-nav-bar title="我的优惠券" left-arrow @click-left="$router.go(-1)" />
    <div class="coupon-wrapper">
      暂无优惠券！！！
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#coupon {
  width: 100%;
  height: 100%;
  .coupon-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 90%;
    text-align: center;
    font-size: 40px;
  }
}
</style>