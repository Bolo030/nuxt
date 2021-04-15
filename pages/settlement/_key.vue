<template>
  <div class="container">
    <van-nav-bar title="确认订单" left-arrow @click-left="$router.go(-1)" />
    <header id="order-header">
      <div class="header-store-info bg-main-color">
        <h2 class="font-size-28 font-weight">店铺信息</h2>
        <div class="store-info-middle d-f">
          <div class="store-logo-l">
            <img
              :src="
                require('../../assets/imgs/icon_' +
                  info.store.platform +
                  '.png')
              "
              alt="店铺图标"
            />
          </div>
          <div class="store-desc-r text-wraps font-size-26 font-main-color4">
            {{ info.store.title }}
          </div>
        </div>
        <div class="store-bottom font-size-26">
          <span class="font-main-color2">商品编号：</span>
          <span>{{ info.store.code }}</span>
        </div>
      </div>
      <!-- 付款类型 -->
      <div class="pay-select bg-main-color d-f  d-f-between">
        <div class="pay-select-l font-size-28 font-weight">支付类型</div>
        <van-radio-group
          v-model="radio"
          direction="horizontal"
          @change="computePrice"
        >
          <van-radio
            name="2"
            :disabled="info.order.status == '3'"
            checked-color="#f4632c"
            icon-size="18px"
            >定金</van-radio
          >
          <van-radio name="1" checked-color="#f4632c" icon-size="18px"
            >全款</van-radio
          >
        </van-radio-group>
      </div>
    </header>

    <main class="orderSure-box">
      <!-- 结算信息区域 -->
      <ul class="billing-info bg-main-color">
        <li>
          <h2 class="font-size-28 font-weight">结算信息</h2>
        </li>
        <li class="billing-item d-f d-f-between font-size-26">
          <span>店铺价格</span>
          <span>￥{{ info.order.amount }}</span>
        </li>
        <li class="billing-item d-f d-f-between font-size-26">
          <span>技术年费</span>
          <span>￥{{ info.order.technologyYearPrice }}</span>
        </li>
        <li class="billing-item d-f d-f-between font-size-26">
          <span>消保金</span>
          <span>￥{{ info.order.protectionPrice }}</span>
        </li>
        <li class="billing-item d-f d-f-between font-size-26">
          <span>服务费</span>
          <span>￥{{ info.order.buyerCommission }}</span>
        </li>
        <li class="billing-item d-f d-f-between font-size-26">
          <span>其他费用</span>
          <span>￥{{ info.order.otherPrice }}</span>
        </li>
        <li class="billing-item d-f d-f-between font-size-26">
          <span>商品合计</span>
          <span>￥{{ info.order.payable }}</span>
        </li>
      </ul>
    </main>

    <!-- 底部结算区域 -->
    <div class="order-footer bg-main-color d-f d-f-between">
      <div class="order-footer-l font-main-color font-weight">
        <span class="font-size-24">应付 ￥</span>
        <span class="font-size-32">{{
          parseFloat(total) < parseFloat(info.depositMin)
            ? info.depositMin
            : total
        }}</span>
      </div>
      <button
        class="order-footer-r font-main-color6 font-size-24"
        @click="toPay"
      >
        去支付
      </button>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, params }) {
    let radio = "2";
     let total=0
    let info = await app.$api
      .GetSettlement(params.key)
      .then(res => (res.status == 1 ? res.data : {}));
    let depositRate = info.depositRate <= 0 ? 10 : info.depositRate;
    if (info.order.status == "3") {
      radio = "1";
      total=info.order.waitPay;
    } else {
      total = parseFloat(
        (info.order.amount * (depositRate / 100)).toFixed(2)
      );
    }

    return {
      info,
      total,
      depositRate,
      radio
    };
  },
  data() {
    return {
      info: {},
      status: {
        1: "待付款",
        2: "已取消",
        3: "已付定金",
        4: "交接中",
        5: "已完成",
        6: "已退款",
        7: "扣罚完成"
      },
      radio: "2",
      total: 0,
      depositRate: 10
    };
  },
  methods: {
    toPay() {
      this.$router.push(
        "/settlement/payment?key=" +
          this.info.order.key +
          "&payType=" +
          this.radio
      );
    },
    // 切换金额，选择定金或全款
    computePrice() {
      // 全款
      if (this.radio == "1") {
        this.total = parseFloat(this.info.order.waitPay);
      } else {
        this.total = parseFloat(
          (this.info.order.amount * (this.info.depositRate / 100)).toFixed(2)
        );
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#order-header {
  padding: 5.3333vw 3.2vw 0;
  box-sizing: border-box;
  height: 79.3333vw;
  background-image: linear-gradient(0deg, #f4f4f4 0%, #f4632c 100%);
}

#order-header .header-title {
  height: 11.7333vw;
  line-height: 11.7333vw;
  text-align: center;
}

#order-header .header-title .back-arrow {
  position: absolute;
  left: 0vw;
}

#order-header .header-store-info {
  padding: 5.3333vw 4vw;
  margin-top: 4vw;
  border-radius: 2.1333vw;
}

#order-header .header-store-info .store-info-middle {
  padding-bottom: 5.3333vw;
  margin-top: 5.3333vw;
  border-bottom: 0.1333vw solid #ededed;
}

#order-header .header-store-info .store-info-middle .store-logo-l img {
  width: 10.6667vw;
  height: 10.6667vw;
  border-radius: 2.1333vw;
  margin-right: 2.9333vw;
}

#order-header .header-store-info .store-info-middle .store-desc-r {
  flex: 1;
  line-height: 5.3333vw;
}

#order-header .header-store-info .store-bottom {
  margin-top: 4.5333vw;
}

#order-header .pay-select {
  margin-top: 2.6667vw;
  padding: 0 4vw;
  height: 17.3333vw;
  border-radius: 2.1333vw;
}

#order-header .pay-select .pay-select-r .select-item1 {
  margin-right: 17.3333vw;
}

#order-header .pay-select .pay-select-r .select-item2 {
  margin-right: 9.3333vw;
}

#order-header .pay-select .pay-select-r .pay-way {
  position: relative;
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  display: inline-block;
  background: #fff;
  border: 0.1333vw solid #ccc;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  vertical-align: middle;
}

#order-header .pay-select .pay-select-r input[type="radio"]:checked + .pay-way {
  background: url("/imgs/selectStoreActive.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  vertical-align: middle;
}

#order-header .pay-select .pay-select-r .deposit::after {
  content: "定金";
  position: absolute;
  right: -9.3333vw;
  font-size: 3.4667vw;
}

#order-header .pay-select .pay-select-r .full::after {
  content: "全款";
  position: absolute;
  right: -9.3333vw;
  font-size: 3.4667vw;
}

.orderSure-box {
  padding: 0 3.2vw 18.6667vw;
}

.orderSure-box .billing-info {
  padding: 4vw 5.3333vw;
  border-radius: 2.1333vw;
}

.orderSure-box .billing-info .billing-item {
  height: 12vw;
  color: #1c1c1c;
}

.order-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 666;
  height: 16vw;
  padding: 0 3.2vw;
}

.order-footer .order-footer-r {
  width: 20.5333vw;
  height: 8.5333vw;
  background: #f4632c;
  border-radius: 4.2667vw;
}
</style>
