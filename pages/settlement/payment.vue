<template>
  <div class="container">
    <van-nav-bar title="游客下单" left-arrow @click-left="$router.go(-1)" />
    <div class="main">
      <div class="pay-head">
        <div class="pay-head-price">
          {{ info.total | numTwo }}
        </div>
        <div class="pay-head-time">
          请在
          <van-count-down :time="countDown" format="DD 天 HH 时 mm 分 ss 秒" />
          内完成付款
        </div>
      </div>
      <div class="pay-way">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell
              :title="`余额支付（￥${info.available}）`"
              :icon="require('../../assets/imgs/user/ye.png')"
              clickable
              @click="radio = '0'"
            >
              <template #right-icon>
                <van-radio name="0" />
              </template>
            </van-cell>
            <van-cell
              title="支付宝支付"
              :icon="require('../../assets/imgs/user/zfb.png')"
              clickable
              @click="radio = '1'"
            >
              <template #right-icon>
                <van-radio name="1" />
              </template>
            </van-cell>
            <van-cell v-if="isWeiXinLogin()"
              title="微信支付"
              :icon="require('../../assets/imgs/user/wx.png')"
              clickable
              @click="radio = '2'"
            >
              <template #right-icon>
                <van-radio name="2" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>

      <div class="pay-btn flex-center">
        <button type="default" @click="submit">立即支付</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app, query }) {
    let cashier = query;
    let info = await app.$api
      .orderCashier(cashier)
      .then(res => (res.status == 1 ? res.data : {}));
    var begin = new Date().getTime();
    var countDown = info.expireDatetime * 1000 - begin;

    console.log(info);
    return {
      info,
      cashier,
      countDown
    };
  },
  filters: {
    numTwo(val) {
      if (val) val = val.toFixed(2);
      return val;
    }
  },
  data() {
    return {
      cashier: {
        key: "",
        payType: ""
      },
      info: {},
      countDown: null,
      reset: false,
      radio: "0",
      orderKey: "",
      times: null
    };
  },
  filters: {
    numTwo(val) {
      if (val) val = val.toFixed(2);
      return val;
    }
  },
  methods: {
    getCashier() {
      orderCashier(this.cashier).then(res => {
        if (res.status == 1) {
          this.info = res.data;
          this.timeFn(res.data.expireDatetime);
        }
      });
    },

    //支付
    submit() {
      if (this.radio == 0) {
        if (Number(this.info.available) < Number(this.info.total)) {
          return this.$toast("余额不足");
        }
        this.$api
          .SettlementDo(this.cashier.key, {
            payType: this.cashier.payType
          })
          .then(res => {
            if (res.status == 1) {
              this.$toast("支付成功");
              setTimeout(() => {
                this.$router.push(
                  "/settlement/paymentSuccess?total=" + this.info.total
                );
              }, 800);
            }
          });
      } else if (this.radio == 1) {
        this.$api
          .aliPay(this.cashier.key, {
            payType: this.cashier.payType
          })
          .then(res => {
            if (res.status == 1) {
              this.orderKey = res.data.key;
              this.times = setInterval(() => {
                this.getOrderStatus();
              }, 3000);
              this.$router.push(res.data.url);
            }
          });
      } else if (this.radio == 2) {
        // app启动
        /* 	 this.$api.wechatpay(this.cashier.key, {
							payType: this.cashier.payType
						}).then(res => {
							if (res.status == 1) {
								var path =
									`pages/pay/index?myEnv=uat&cmbOrderId=${res.data.cmbOrderId}&orderId=${res.data.orderId}&encryptedTradeInfo=${res.data.encryptedTradeInfo}&merId=${res.data.merId}&encryptedCmbOrderId=${res.data.encryptedCmbOrderId}`;
								this.orderKey = res.data.key;
								this.times = setInterval(() => {
									this.getOrderStatus()
								}, 3000)
							}
						}) */
      }
    },
    // 查看订单状态
    getOrderStatus() {
      this.$api.orderStatus(this.orderKey).then(res => {
        if (res.status == 1) {
          clearInterval(this.times);
          this.$toast("支付成功");
          setTimeout(() => {
            this.$router.push(
              "/settlement/paymentSuccess?total=" + this.info.total
            );
          }, 800);
        }
      });
    },
    isWeiXinLogin() {
      var ua=this.$store.state.auth.deviceType||{};
      return ua.env=='wechat'?true:false
    }
  },
  destroyed() {
    clearInterval(this.times);
  }
};
</script>

<style lang="scss" scoped>
@import url("../../assets/css/iconfont.css");

.main {
  padding: 24px;
  box-sizing: border-box;
}

.pay-head {
  height: 197px;
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  align-items: center;
}

.pay-head-price {
  color: #f4632c;
  font-size: 46px;
  margin-bottom: 8px;
}

.pay-head-time {
  font-size: 28px;
  color: #1c1c1c;
  display: flex;
}

.pay-way {
  margin-top: 20px;
  border-radius: 16px;
  background-color: #ffffff;
  color: #1c1c1c;
  font-size: 28px;
  overflow: hidden;

  label {
    display: flex;
    height: 120px;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .iconfont {
    font-size: 40px;
    margin-right: 16px;
  }

  .iconyue {
    color: #f4632c;
  }

  .iconzhifubao {
    color: #108ee8;
  }

  .iconweixinzhifu {
    color: #41b035;
  }
}

.pay-btn {
  height: 140px;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  button {
    width: 702px;
    height: 100px;
    color: #ffffff;
    line-height: 100px;
    background-color: #f4632c;
    border-radius: 16px;
    font-size: 28px;
  }
}
.van-cell__left-icon {
  margin-right: 16px;
  display: flex;
  align-items: center;
}
</style>
