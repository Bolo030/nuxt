<template>
  <div class="container">
    <van-nav-bar title="订单管理" left-arrow @click-left="$router.go(-1)" />
    <main class="orderManagement-box">
      <div class="order-tabbar bg-main-color d-f d-f-between font-size-28">
        <span
          class="tabbar-item "
          :class="tab == index ? 'tabbar-item-active' : ''"
          @click="chooseTab(index)"
          v-for="(item, index) in orderType"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <div class="order-status">
        <div
          class="status-item bg-main-color"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="title-desc d-f d-f-between">
            <div class="title-desc-l font-size-24 font-main-color2">
              订单编号:{{ item.store.code }}
            </div>
            <div
              class="font-size-28 font-weight "
              :class="
                item.status == 1 || item.status == 3 || item.status == 4
                  ? 'font-main-color'
                  : 'font-main-color2'
              "
            >
              {{ status[item.status] }}
            </div>
          </div>
          <div class="middle-info d-f">
            <div class="store-logo">
              <img
                :src="
                  require('../../assets/imgs/icon_' +
                    item.store.platform +
                    '.png')
                "
                alt="店铺图标"
              />
            </div>
            <div class="store-desc text-wraps font-size-26 font-weight">
              {{ item.store.title }}
            </div>
          </div>
          <div class="status-footer d-f d-f-between">
            <div class="status-footer-l font-main-color">
              <span class="font-size-24">订单总额</span>
              <span class="font-weight font-size-34"
                >￥{{ item.store.parse_price }}</span
              >
            </div>
            <div class="status-footer-r font-size-24">
              <template v-if="item.status == 1">
                <button
                  class="status1 font-main-color2"
                  @click.stop="oCancel(item.key)"
                >
                  取消订单
                </button>
                <button
                  class="status2 font-main-color"
                  @click.stop="toPay(item.key)"
                >
                  支付定金
                </button>
              </template>

              <button
                v-else-if="item.status == 3"
                class="status2 font-main-color"
                @click.stop="toPay(item.key)"
              >
                支付尾款
              </button>
              <button
                v-else-if="item.status == 2"
                class="status1 font-main-color2"
                @click.stop="oDel(item.key)"
              >
                删除订单
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    let search = {
      search_type: "all",
      page: 1,
      per_page: 15
    };
    let list = await app.$api
      .myOrders(search)
      .then(res => (res.status == 1 ? res.data.data : []));
    return { list };
  },
  data() {
    return {
      orderType: ["全部", "待付款", "交接中", "已完成"],
      status: {
        1: "待付款",
        2: "已取消",
        3: "已付定金",
        4: "交接中",
        5: "已完成",
        6: "已退款",
        7: "扣罚完成"
      },
      tab: 0,
      key: "",
      id: 0,
      list: [],
      search: {
        search_type: "all",
        page: 1,
        per_page: 15
      }
    };
  },
  methods: {
    chooseTab(tab) {
      this.tab = tab;
      this.search.page = 1;
      this.getData(true, true);
    },
    getData(loading = true, remove = false) {
      let searchType = ["all", "paid", "handover", "completed"];
      this.search.search_type = searchType[this.tab];
      this.$api.myOrders(this.search).then(res => {
        if (res.status === 1) {
          if (remove) {
            this.list = res.data.data;
          } else {
            this.list.push(...res.data.data);
          }
        }
      });
    },
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
              _this.search.page = 1;
              _this.getData(true, true);
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
              _this.search.page = 1;
              _this.getData(true, true);
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
.orderManagement-box {
  padding-bottom: 6.6667vw;
}

.order-tabbar {
  /*  position: fixed;
  top: 11.7333vw; */
  height: 16vw;
  width: 100%;
  padding: 0 7.3333vw;
  box-sizing: border-box;
}

.order-tabbar .tabbar-item {
  position: relative;
}

.order-tabbar .tabbar-item-active::after {
  content: "";
  position: absolute;
  top: 6vw;
  left: 50%;
  transform: translateX(-50%);
  width: 5.3333vw;
  height: 0.6667vw;
  border-radius: 0.4vw;
  background: #f4632c;
}

.order-status {
  margin-top: 30px;
  padding: 0 3.2vw;
}

.order-status .status-item {
  padding: 4vw 5.3333vw;
  border-radius: 2.1333vw;
  margin-bottom: 2.6667vw;
}

.order-status .status-item .middle-info {
  background: #f4f4f4;
  border-radius: 2.1333vw;
  padding: 3.6vw 2.6667vw;
  margin-top: 4vw;
}

.order-status .status-item .middle-info .store-logo {
  width: 10.6667vw;
  height: 10.6667vw;
  margin-right: 2.9333vw;
}

.order-status .status-item .middle-info .store-desc {
  flex: 1;
  line-height: 5.3333vw;
  overflow: hidden;
}

.order-status .status-item .status-footer {
  margin-top: 5.3333vw;
}

.order-status .status-item .status-footer .status-footer-r button {
  padding: 2.1333vw 3.0667vw 2vw;
  border-radius: 4.6667vw;
  line-height: 4vw;
}

.order-status .status-item .status-footer .status-footer-r .status1 {
  border: 0.1333vw solid #ccc;
  margin-right: 2.6667vw;
}

.order-status .status-item .status-footer .status-footer-r .status2 {
  border: 0.1333vw solid #f4632c;
}
</style>
