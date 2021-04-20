<template>
  <main>
    <van-nav-bar title="下单成功" left-arrow @click-left="$router.go(-1)" />
    <div class="pay-success">
      <img class="icon" src="../../assets/imgs/ic_checkout_success.png" alt="下单成功图标" />
      <div class="main">恭喜您！下单成功</div>
      <div class="sub">专业顾问将尽快与您取得联系，请耐心等待…</div>
      <div class="btn-box">
        <button @click="goto('home')">回到首页</button>
        <button v-if="$utils.isLogin" @click="goto('order')" class="active">
          订单详情
        </button>
        <button v-else @click="goto('back')" class="active">返回详情</button>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      data() {
        return {
          storeKey: ""
        };
      }
    };
  },
  components: {},
  async asyncData({ params }) {
    let storeKey = params.key;
    return {
      storeKey
    };
  },
  methods: {
    goto(type) {
      if (type === "home") {
        this.$router.push("/");
      } else if (type === "order") {
        this.$router.push("/user/order-info/buy?key=" + this.storeKey);
      } else {
        this.$router.push("/si/" + this.storeKey);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  height: 100vh;
}
.pay-success {
  text-align: center;
  padding-top: 165px;
  background-color: #ffffff;
  min-height: 100%;
  .icon {
    height: 200px;
    width: 175px;
    margin-bottom: 50px;
  }
  .main {
    font-size: 40px;
    font-weight: bold;
    color: #f4632c;
    line-height: 40px;
    margin-bottom: 30px;
  }
  .sub {
    font-size: 28px;
    color: #999999;
    margin-bottom: 60px;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    button {
      padding: 0;
      margin: 0;
      width: 154px;
      height: 64px;
      border: 1px solid #f4632c;
      border-radius: 30px;
      font-size: 26px;
      line-height: 64px;
      color: #f4632c;
      background-color: #ffffff;
    }
    .active {
      color: #ffffff;
      background-color: #f4632c;
      margin-left: 30px;
    }
  }
}
</style>
