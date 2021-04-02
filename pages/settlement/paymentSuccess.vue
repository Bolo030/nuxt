<template>
  <main>
     <van-nav-bar title="支付成功" left-arrow @click-left="$router.go(-1)" />
    <div class="main">
      <div class="pf">
        <span class="iconfont iconzhifuchenggong"></span>
        <div class="pf-text">
          支付成功
        </div>
        <div class="pf-price"><span class="min">￥</span>{{ total }}</div>
        <div class="pf-btn" @click="goOrder">
          订单列表
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  asyncData({ query }) {
    let total = query.total;
    return {
      total
    };
  },
  data() {
    return {
      total: 0
    };
  },
  methods: {
    goOrder() {
      this.$router.push("/user/order");
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("../../assets/css/iconfont.css");

.main {
  padding: 30px 24px;
  box-sizing: border-box;

  .pf {
    height: 600px;
    background-color: #ffffff;
    border-radius: 16px;
    text-align: center;
    padding-top: 112px;
  }

  .iconzhifuchenggong {
    font-size: 100px;
    color: #f4632c;
    margin-bottom: 23px;
  }

  .pf-text {
    font-size: 30px;
    color: #f4632c;
    margin-bottom: 45px;
  }

  .pf-price {
    .min {
      font-size: 24px;
    }
    font-size: 46px;
    margin-bottom: 68px;
  }

  .pf-btn {
    width: 160px;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    border: solid 1px #f4632c;
    margin: 0 auto;
    font-size: 24px;
    color: #f4632c;
  }
}
</style>
