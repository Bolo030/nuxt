<template>
  <div id="my-store">
    <header id="header">
      <div class="header-content">
        <a href="javascript:history.go(-1)" title="返回箭头"
          ><img
            class="back"
            src="~/assets/imgs/store/rectangle.png"
            alt="九九牛返回"
        /></a>
        <span class="title">我的店铺</span>
      </div>
    </header>

    <main class="myStore-box position-r">
      <!-- 头部tabbar切换 -->
      <div class="myStore-tabbar bg-main-color d-f d-f-between font-size-28">
        <span
          v-for="(item, index) in tabBar"
          :class="index === currentIndex ? 'tabbar-active' : ''"
          @click="tabBarSwitch(index, item.search_mold)"
          :key="item.title"
          >{{ item.title }}</span
        >
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 店铺状态列表 -->
        <div class="store-status-box">
          <ul
            class="store-list bg-main-color"
            v-for="(item, index) in storeList"
            :key="index"
            @click="jumpInfo(item)"
          >
            <li class="d-f d-f-between">
              <span class="font-size-24 font-main-color2"
                >店铺编号: {{ item.code }}</span
              >
              <span class="font-main-color font-size-28 font-weight">{{
                storeStatus[item.status].name
              }}</span>
            </li>
            <li class="middle-desc bg-main-color6 d-f">
              <img :src="item.store_icon_path" alt="店铺图标" />
              <p
                class="middle-desc-r font-weight font-size-26 text-wraps"
                v-if="true"
              >
                {{ item.title }}
              </p>
              <div class="middle-desc-r" v-else>
                <h4 class="font-weight font-size-26">哈哈哈旗舰店</h4>
                <p class="text-wrap font-size-24 font-main-color2">
                  华南地区数码旗舰店，3C数码，中文商标，
                  一般纳税人，店铺干净，无扣分，无贷
                </p>
              </div>
            </li>
            <li class="bottom-price font-main-color">
              <span class="font-szie-24">售价</span>
              <span class="font-weight font-size-24">￥</span>
              <span class="font-weight font-size-34">{{
                item.parse_price
              }}</span>
            </li>
          </ul>
        </div>
      </van-list>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    let res = await app.$api.myStoreInfo({
      search_mold: "all",
      page: 1,
      per_page: 10
    });
    if (res.status !== 1) return;
    let storeList = res.data.data;
    storeList.forEach(item => {
      item.store_icon_path = require(`~/assets/imgs/icon_${item.platform}.png`);
    });
    return { storeList };
  },
  data() {
    return {
      tabBar: [
        { title: "全部", search_mold: "all" },
        { title: "挂售中", search_mold: "normal" },
        { title: "交接中", search_mold: "handover" },
        { title: "已完成", search_mold: "sold" }
      ],
      currentIndex: 0,
      tabBarMold: "all",
      storeList: [],
      page: 1,
      per_page: 10,
      loading: false,
      finished: false,
      resStoreList: [],
      storeStatus: {
        2: {
          name: "待审核",
          type: "",
          url: false
        },
        3: {
          name: "审核不通过",
          type: "",
          url: false
        },
        4: {
          name: "销售中",
          type: "",
          url: "/pages/storeInfo/storeInfo"
        },
        5: {
          name: "已付定金",
          type: "",
          url: "/pages/storeInfo/storeInfo"
        },
        6: {
          name: "交接中",
          type: "",
          url: "/pages/storeInfo/storeInfo"
        },
        7: {
          name: "已完成",
          type: "",
          url: false
        },
        9: {
          name: "已下架",
          type: "success",
          url: false
        },
        10: {
          name: "违约下架",
          type: "",
          url: false
        }
      }
    };
  },
  methods: {
    tabBarSwitch(index, statusMold) {
      this.currentIndex = index;
      this.page = 1;
      this.tabBarMold = statusMold;
      // this.loading = true;
      // this.finished = false;

      this.tabBarDataSwitch(statusMold);
    },
    // tabbar切换调用函数
    async tabBarDataSwitch(statusMold) {
      this.loading = true;
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      let res = await this.$api.myStoreInfo({
        search_mold: statusMold || "all",
        page: this.page,
        per_page: this.per_page
      });
      if (res.status != 1) {
        this.finished = true;
      } else {
        if (this.page === 1) {
          this.storeList = res.data.data;
        } else {
          this.resStoreList = res.data.data;
          if (this.resStoreList.length == 0) return (this.finished = true);
          this.storeList = this.storeList.concat(res.data.data);
        }
        this.storeList.forEach(item => {
          item.store_icon_path = require(`~/assets/imgs/icon_${item.platform}.png`);
        });
      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    // 监听滚动到底部
    onLoad() {
      if (
        this.resStoreList.length < this.per_page &&
        this.resStoreList.length > 0
      ) {
        this.finished = true;
      } else {
        this.page++;
        this.tabBarDataSwitch(this.tabBarMold);
      }
    },
    // 销售中跳转
    jumpInfo(item) {
      if (item.status === "4") {
        this.$router.push(`/si/${item.key}`);
      }
      return;
    }
  }
};
</script>

<style lang="scss" scoped>
.myStore-box {
  position: relative;
  padding-bottom: 30px;
  height: 100%;
}
.van-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.myStore-box .myStore-tabbar {
  position: fixed;
  height: 120px;
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
}

.myStore-box .myStore-tabbar .tabbar-active {
  position: relative;
  font-weight: 700;
}

.myStore-box .myStore-tabbar .tabbar-active::after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 5px;
  border-radius: 3px;
  background: #f4632c;
}

.myStore-box .store-status-box {
  padding: 120px 24px 0;
}

.myStore-box .store-status-box .store-list {
  margin-top: 20px;
  padding: 40px 30px;
  border-radius: 16px;
}

.myStore-box .store-status-box .store-list .middle-desc {
  border-radius: 16px;
  margin-top: 30px;
  padding: 0 20px;
  height: 134px;
  line-height: 40px;
}

.myStore-box .store-status-box .store-list .middle-desc img {
  width: 80px;
  height: 80px;
  margin-right: 22px;
  border-radius: 16px;
}

.myStore-box .store-status-box .store-list .middle-desc .middle-desc-r {
  flex: 1;
  overflow: hidden;
}

.myStore-box .store-status-box .store-list .bottom-price {
  margin: 50px 0 10px;
}
</style>
