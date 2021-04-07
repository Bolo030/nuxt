<template>
  <div class="container">
    <van-nav-bar title="提现申请详情" left-arrow @click-left="$router.go(-1)" />
    <main id="withdrawInfo">
      <div class="withdraw-info-box bg-main-color">
        <div class="withdraw-top">
          <img src="../../assets/imgs/withdraw-bg.png" alt="提现申请背景图片" />
        </div>
        <div class="withdraw-middle">
          <h3 class="font-size-30 font-weight">您的提现申请已递交</h3>
          <p class="font-size-24">
            平台将在72小时内对您的提现进行处理，请耐心等待
            如有疑问请拨打客服热线
            <span class="font-main-color8"> 400-0909-940</span>
          </p>
        </div>
        <button class="font-main-color font-size-24" @click="$router.go(-2)">返回资金管理</button>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
#withdrawInfo {
  padding: 11.7333vw 3.2vw 0;
}

.withdraw-info-box {
  margin-top: 4vw;
  border-radius: 2.1333vw;
  text-align: center;
}

.withdraw-info-box .withdraw-top img {
  width: 38.4vw;
  height: 38.4vw;
}

.withdraw-info-box .withdraw-middle p {
  margin-top: 4vw;
  padding: 0 9.7333vw;
  line-height: 7.3333vw;
}

.withdraw-info-box button {
  padding: 2vw 3.3333vw;
  margin: 7.4667vw 0 11.7333vw;
  border-radius: 4vw;
  border: 0.1333vw solid #f4632c;
}
</style>
