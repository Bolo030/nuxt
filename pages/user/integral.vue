<template>
  <div id="integral">
    <van-nav-bar title="我的积分" left-arrow @click-left="$router.go(-1)" />
    <div class="integral-wrapper">
      暂无积分！！！
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#integral {
  width: 100%;
  height: 100%;
  .integral-wrapper {
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