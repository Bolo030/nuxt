<template>
  <div class="container">
    <van-nav-bar title="订单详情" left-arrow @click-left="$router.go(-1)" />
    <main>
      <div class="orderDetails-top font-main-color6">
        <h5 class=" font-size-34 font-weight">{{ status[info.status] }}</h5>
        <p class="font-size-24">
          好店不等人，尽快完成付款，将心仪店铺带回家吧！
        </p>
      </div>
      <section class="orderDetails-box">
        <!-- 订单标题信息 -->
        <div class="orderDetails-name bg-main-color">
          <div class="name-title d-f">
            <div class="name-title-l">
              <img
                :src="
                  require('../../../assets/imgs/icon_' +
                    info.store.platform +
                    '.png')
                "
                alt="网店图标"
              />
            </div>
            <h3 class="name-title-r text-wraps font-size-26">
              {{ info.store.title }}
            </h3>
          </div>
          <div class="name-bottom d-f d-f-between">
            <p class="name-bottom-l font-size-26">
              <span class="font-main-color2">商品编号:</span>
              <span>{{ info.store.code }}</span>
            </p>
            <span
              class="name-bottom-r font-size-24 bg-main-color6"
              @click="$utils.copy(info.store.code)"
              >复制</span
            >
          </div>
        </div>
        <!-- 咨询客服 -->
        <div class="orderDetails-service bg-main-color d-f d-f-between">
          <div class="service-left d-f-flex">
            <img :src="info.customer_service.headPortrait" alt="客服头像" />
            <div>
              <h6 class="font-size-26 font-weight">
                {{ info.customer_service.nickname }}
              </h6>
              <h4 class="font-size-24 font-main-color10">
                <i class="iconfont iconrenzheng"></i>
                <span>资深网店交易顾问</span>
              </h4>
            </div>
          </div>
          <div class="service-right font-main-color font-size-24">
            <i class="iconfont icondianhua"></i>
            <span>联系顾问</span>
          </div>
        </div>
        <!-- 下单店铺信息 -->
        <div class="order-info bg-main-color">
          <ul class="order-info-item">
            <li class="order-list d-f d-f-between">
              <div class="order-list-l font-size-26">
                <span class="font-main-color2 title-desc">订单编号：</span>
                <span>{{ info.outTradeNo }}</span>
              </div>
              <div
                class="order-list-r font-size-24 bg-main-color6"
                @click="$utils.copy(info.outTradeNo)"
              >
                复制
              </div>
            </li>
            <li class="order-list d-f d-f-between">
              <div class="order-list-l font-size-26">
                <span class="font-main-color2 title-desc">下单时间：</span>
                <span>{{ info.createdDate }}</span>
              </div>
            </li>
          </ul>
          <ul class="order-info-item2">
            <li class="order-list ">
              <div class="order-list-l font-size-26">
                <span class="font-main-color2 title-desc">店铺价格：</span>
                <span>￥{{ info.amount }}</span>
              </div>
            </li>
            <li class="order-list ">
              <div class="order-list-l font-size-26">
                <span class="font-main-color2 title-desc">技术年费：</span>
                <span>￥{{ info.technologyYearPrice }}</span>
              </div>
            </li>
            <li class="order-list">
              <div class="order-list-l font-size-26">
                <span class="font-main-color2 title-desc">消保金：</span>
                <span>￥{{ info.protectionPrice }}</span>
              </div>
            </li>
            <li class="order-list">
              <div class="order-list-l font-size-26">
                <span class="font-main-color2 title-desc">服务费：</span>
                <span>￥{{ info.buyerCommission }}</span>
              </div>
            </li>
            <li class="order-list ">
              <div class="order-list-l font-size-26">
                <span class="font-main-color2 title-desc">其他费用：</span>
                <span>￥{{ info.otherPrice }}</span>
              </div>
            </li>
            <li class="order-list ">
              <div class="order-list-l font-size-26">
                <span class="font-main-color2 title-desc">商品合计：</span>
                <span>￥{{ info.payable }}</span>
              </div>
            </li>
          </ul>
        </div>
        <!-- 交易流程 -->
      <!--   <div class="trade-process bg-main-color">
          <div class="trade-process-top d-f d-f-between">
            <span class="font-size-28 font-weight">交易流程</span>
            <div class="swiper-pagination  myswiper-pagination">
              <van-swipe
                class="my-swipe"
                indicator-color="#f4632c"
                :show-indicators='true'
              >
                <van-swipe-item>1</van-swipe-item>
                <van-swipe-item>2</van-swipe-item>

              </van-swipe>
            </div>
          </div>
        </div> -->

        <!-- 底部定位 -->
        <div class="bottom-fixed bg-main-color d-f d-f-between">
          <div class="bottom-in-l font-main-color">
            <span class="font-size-24">应付 ￥</span>
            <span class="font-size-32 font-weight">{{ info.waitPay }}</span>
          </div>
          <div class="bottom-in-r">
            <template v-if="info.status == 1">
              <button @click="oCancel(key)">取消订单</button>
              <button @click="toPay(key)" class="font-main-color6 active">
                支付定金
              </button>
            </template>
            <button
              v-else-if="info.status == 3"
              @click="toPay(key)"
              class="font-main-color6 active"
            >
              支付尾款
            </button>
            <button @click="oDel(key)" v-else-if="info.status == 2">
              删除订单
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ app, query }) {
    let key = query.key;
    let stepList = {
      confirmStore: {
        title: "确定店铺",
        nodeStatus: 0,
        unfold: false,
        list: []
      },
      confirmSell: {
        title: "确认卖店",
        nodeStatus: 0,
        unfold: false,
        list: []
      },
      sign: {
        title: "签署三方合同",
        nodeStatus: 0,
        unfold: false,
        list: []
      },
      transfer: {
        title: "店铺过户",
        nodeStatus: 0,
        unfold: false,
        list: []
      },
      completed: {
        title: "交易完成",
        nodeStatus: 0,
        unfold: false,
        list: []
      }
    };
    let info = await app.$api
      .orderInfo(query.key)
      .then(res => (res.status == 1 ? res.data : {}));

    let parse_records = info.parse_records;
    for (var f in parse_records) {
      if (parse_records[f].records.length != 0) {
        stepList[f].nodeStatus = parse_records[f].nodeStatus;
        stepList[f].unfold = parse_records[f].nodeStatus == 1 ? true : false;
        for (var i in parse_records[f].records) {
          stepList[f].list[i] = parse_records[f].records[i];
        }
      }
    }
    return {
      info,
      key,
      stepList
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
      key: "",
      stepList: {}
    };
  },
  methods: {
    oCancel(key) {
      let _this = this;
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认取消该订单吗？"
        })
        .then(() => {
          this.$api.orderCancel(key).then(res => {
            if (res.status === 1) {
              _this.$toast("订单取消成功");
              _this.$router.go(-1);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    oDel(key) {
      let _this = this;
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认删除该订单吗？"
        })
        .then(() => {
          this.$api.orderDel(key).then(res => {
            if (res.status === 1) {
              _this.$toast("订单删除成功");
              _this.$router.go(-1);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    toPay(key) {
      this.$router.push("/settlement/" + key);
    }
  }
};
</script>

<style lang="scss" scoped>
.orderDetails-top {
  height: 32vw;
  background-image: linear-gradient(-90deg, #ff5e2d 0%, #ff8453 100%);
  border-radius: 0 0 3.2vw 3.2vw;
  padding: 6.6667vw 0 0 3.2vw;
  box-sizing: border-box;
  line-height: 6.6667vw;
}

.orderDetails-box {
  padding: 0 3.2vw 18.6667vw;
  margin-top: -9.3333vw;
}

.orderDetails-name {
  padding: 5.3333vw 4vw;
  border-radius: 2.1333vw;
}

.orderDetails-name .name-title {
  padding-bottom: 5.3333vw;
  border-bottom: 0.1333vw solid #ededed;
}

.orderDetails-name .name-title .name-title-l img {
  width: 10.6667vw;
  height: 10.6667vw;
  margin-right: 2.9333vw;
  border-radius: 2.1333vw;
  object-fit: cover;
}

.orderDetails-name .name-title .name-title-r {
  flex: 1;
  line-height: 5.3333vw;
}

.orderDetails-name .name-bottom {
  margin-top: 2.6667vw;
}

.orderDetails-name .name-bottom .name-bottom-r {
  padding: 1.3333vw 2.6667vw;
  border-radius: 3.0667vw;
}

.orderDetails-service {
  margin-top: 2.6667vw;
  padding: 0 4vw;
  height: 20vw;
  border-radius: 2.1333vw;
}

.orderDetails-service .service-left {
  line-height: 5.3333vw;
}

.orderDetails-service .service-left img {
  width: 10.6667vw;
  height: 10.6667vw;
  border-radius: 50%;
  margin-right: 2.6667vw;
  object-fit: cover;
}

.orderDetails-service .service-left i {
  font-size: 3.2vw;
}

.orderDetails-service .service-right {
  padding: 2.2667vw 2.4vw;
  display: flex;
  align-items: center;
  border-radius: 4vw;
  line-height: 3.7333vw;
  border: 0.1333vw solid #f4632c;
}

.orderDetails-service .service-right i {
  font-size: 3.2vw;
  margin-right: 8px;
}

.order-info {
  padding: 5.3333vw 4vw;
  margin-top: 2.6667vw;
  border-radius: 2.1333vw;
}

.order-info .order-info-item {
  border-bottom: 0.1333vw solid #ededed;
}

.order-info .order-info-item .order-list {
  margin-bottom: 4vw;
}

.order-info .order-info-item .order-list .order-list-l .title-desc {
  display: inline-block;
  width: 20vw;
  text-align: right;
}

.order-info .order-info-item .order-list .order-list-r {
  padding: 1.3333vw 2.6667vw;
  border-radius: 3.0667vw;
  line-height: 4vw;
}

.order-info .order-info-item2 {
  margin-top: 5.3333vw;
}

.order-info .order-info-item2 .order-list {
  margin-bottom: 4vw;
}

.order-info .order-info-item2 .order-list .order-list-l .title-desc {
  display: inline-block;
  width: 20vw;
  text-align: right;
}

.trade-process {
  margin-top: 2.6667vw;
  padding: 5.3333vw 4vw;
  border-radius: 2.1333vw;
}

.trade-process .myswiper-pagination {
  position: static;
}

.trade-process .myswiper-pagination .my-bullet1 {
  display: inline-block;
  width: 1.3333vw;
  height: 1.3333vw;
  border-radius: 50%;
  background: #ededed;
  margin-left: 1.3333vw;
}

.trade-process .myswiper-pagination .my-bullet1-active {
  background: #f4632c;
}

.trade-process .my-swiper1 {
  margin-top: 2.6667vw;
}

.trade-process .my-swiper1 .my-swiper1-item {
  width: 34.6667vw !important;
  height: 29.3333vw;
  border-radius: 2.1333vw;
  text-align: center;
  line-height: 6vw;
  padding-top: 4vw;
  box-sizing: border-box;
}

.trade-process .my-swiper1 .my-swiper-item-active {
  color: #f4632c;
  background: #ffebe4;
}

.bottom-fixed {
  position: fixed;
  z-index: 66666;
  bottom: 0;
  left: 0;
  right: 0;
  height: 16vw;
  padding: 0 3.3333vw;
  box-sizing: border-box;
}

.bottom-fixed .bottom-in-r button {
  width: 20.5333vw;
  height: 8.5333vw;
  line-height: 8.5333vw;
  text-align: center;
  border-radius: 4.2667vw;
  border: 0.1333vw solid #ccc;
}

.bottom-fixed .bottom-in-r button.active {
  background: #f4632c;
  margin-left: 2.6667vw;
  border: none;
}
</style>
