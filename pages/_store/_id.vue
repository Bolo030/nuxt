<template>
  <div class="main">
    <main class="store">
      <div class="buyStore">
        <div class="buyStore-top">
          <!-- 步骤 -->
          <div class="tradeMsg space-evenly">
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" />
              <span>资金安全</span>
            </div>
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" />
              <span>流程简单</span>
            </div>
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" />
              <span>交易透明</span>
            </div>
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" />
              <span>专业高效</span>
            </div>
          </div>
          <!-- 菜单 -->
          <div class="storeInfo">
            <a
              href="#"
              class="storeInfo-item"
              style="background: linear-gradient(90deg, #ff7849 0%, #ff9975 100%);"
            >
              <img src="~assets/imgs/store/ic_shop_classification_goumai.png" />
              <span>网店购买</span>
            </a>
            <a
              href="#"
              class="storeInfo-item"
              style="background: linear-gradient(90deg, #80d04f 0%, #80d884 100%);"
            >
              <img src="~assets/imgs/store/ic_shop_classification_chusou.png" />
              <span>网店出售</span>
            </a>
            <a
              href="#"
              class="storeInfo-item"
              style="background: linear-gradient(90deg, #25cacc 0%, #66d9da 100%);"
            >
              <img src="~assets/imgs/store/ic_shop_classification_gujia.png" />
              <span>网店估价</span>
            </a>
            <a
              href="#"
              class="storeInfo-item"
              style="background: linear-gradient(90deg, #ffb049 0%, #f5b96d 100%);"
            >
              <img src="~assets/imgs/store/ic_shop_classification_ruzhu.png" />
              <span>网店入驻</span>
            </a>
          </div>
          <!-- 服务页banner -->
          <a class="coverImg">
            <img src="~assets/imgs/store/bg_shop_fuwurukou.png" />
          </a>
        </div>
        <!-- 导航 -->

        <!-- 列表 -->
      </div>
    </main>
    <!-- 底部tabbar -->
    <custom-tabbar :active="4" />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "天猫商城入驻_天猫店铺转让出售_天猫网店转让-九九牛",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "九九牛为你提供天猫网店代运营、店铺转让出售、天猫商城入驻服务，本站包含大量最新天猫店铺资源，买卖天猫商城，就上九九牛网店交易平台！"
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "天猫商城入驻,天猫店铺转让,天猫店铺出售,天猫入驻,天猫网店转让，网店转让"
        }
      ]
    };
  },
  data() {
    return {
      isSearch: false,
      tradeWarm: [
        {
          name: "资金安全",
          src: "../../static/newImage/ic_shop_guarantee_gou.png"
        },
        {
          name: "流程简单",
          src: "../../static/newImage/ic_shop_guarantee_gou.png"
        },
        {
          name: "交易透明",
          src: "../../static/newImage/ic_shop_guarantee_gou.png"
        },
        {
          name: "专业高效",
          src: "../../static/newImage/ic_shop_guarantee_gou.png"
        }
      ],
      list: [],
      search: {
        search: undefined,
        platform: "tm", // 平台
        sort: 0, //排序选择
        area: undefined, //地区范围
        trademarkType: undefined, // 商标
        type: undefined, //认证/证明方式
        category: undefined, //类型--服务类型
        //brand: undefined,
        price: {
          low: undefined,
          high: undefined
        },
        per_page: 15
      },
      page: {
        loadStatus: "more", //加载样式：more-加载前样式，loading-加载中样式，nomore-没有数据样式
        done: false // 是否数据加载完成
      },
      // 列表搜索加载
      loading: true
    };
  }
};
</script>

<style lang="scss" scoped>
@keyframes move-bottom {
  0% {
    margin-top: -17.3333vw;
    opacity: 0;
  }
  100% {
    margin-top: 0;
    opacity: 1;
  }
}
.store .back {
  width: 2.2667vw;
  height: 4vw;
  margin-right: 1.3333vw;
}
.store a {
  display: block;
}
.store .buyStore .buyStore-top {
  background: #fff;
  padding: 0 3.2vw 6.2667vw;
}
.store .buyStore .buyStore-top .coverImg img {
  width: 93.6vw;
  height: 20vw;
  border-radius: 1.3333vw;
}
.store .buyStore .buyStore-center {
  padding: 2.6667vw 3.2vw;
}
.store .buyStore .buyStore-center .noData {
  text-align: center;
  color: #ccc;
}
.store .tradeMsg {
  height: 14.1333vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.store .tradeMsg .tradeMsg-item {
  font-size: 2.6667vw;
  color: #1c1c1c;
}
.store .tradeMsg .tradeMsg-item img {
  width: 2.9333vw;
  height: 2.9333vw;
}
.store .space-evenly {
  justify-content: space-around;
}
.store .storeInfo {
  display: flex;
  height: 15.2vw;
  justify-content: space-between;
}
.store .storeInfo .storeInfo-item {
  height: 10.6667vw;
  width: 21.3333vw;
  border-radius: 5.3333vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.store .storeInfo .storeInfo-item img {
  width: 2.9333vw;
  height: 2.9333vw;
  margin-right: 0.6667vw;
}
.store .storeInfo .storeInfo-item span {
  font-size: 2.9333vw;
  color: #fff;
}

#store-filter {
  color: #1c1c1c;
  padding-bottom: 30.1333vw;
  position: sticky;
  left: 0;
  top: 0;
  z-index: 100000;
  margin-bottom: 2.6667vw;
}
#store-filter .nav,
#store-filter .filters {
  background-color: #ffffff;
}
#store-filter .main {
  font-size: 3.7333vw;
  width: 100vw;
  position: absolute;
  left: 0;
  z-index: 9999;
}
#store-filter .nav-box {
  padding-top: 2.6667vw;
  display: flex;
  justify-content: space-between;
  height: 12.8vw;
  box-sizing: border-box;
  border-bottom: 0.1333vw solid #ededed;
  width: 93.3333vw;
  margin: 0 auto;
}
#store-filter .nav-box .back {
  margin: 1.3333vw 0 0 1.3333vw;
}
#store-filter .nav-box .nav-item {
  position: relative;
}
#store-filter .nav-box .active {
  font-size: 4.2667vw;
  font-weight: 700;
}
#store-filter .nav-box .line {
  width: 4.4vw;
  height: 0.8vw;
  background: #f4632c;
  border-radius: 0.4vw;
  position: absolute;
  bottom: 2.2667vw;
  left: 50%;
  transform: translateX(-50%);
}
#store-filter .filters {
  padding: 2.9333vw 3.2vw;
}
#store-filter .filters,
#store-filter .filters .search-box,
#store-filter .filters .filter-box,
#store-filter .filters .filter-item {
  display: flex;
  align-items: center;
}
#store-filter .filters .search-box {
  box-sizing: border-box;
  width: 42.6667vw;
  height: 11.2vw;
  background: #f4f4f4;
  border-radius: 5.6vw;
  padding-left: 4.6667vw;
  font-size: 3.7333vw;
  margin-right: 6vw;
  flex-shrink: 0;
  justify-content: space-between;
}
#store-filter .filters .search-box .content {
  flex: 1;
}
#store-filter .filters .search-box .search-clear {
  width: 8vw;
  height: 100%;
  display: flex;
  align-items: center;
}
#store-filter .filters .search-box img {
  height: 3.8667vw;
  width: 4.2667vw;
  margin-right: 1.8667vw;
  flex-shrink: 0;
}
#store-filter .filters .filter-box {
  flex: 1;
  font-weight: bold;
}
#store-filter .filters .filter-box,
#store-filter .filters .filter-box .filter-item {
  justify-content: space-between;
}
#store-filter .filters .filter-box .arrows,
#store-filter .filters .filter-box .filter-item .arrows {
  height: 1.0667vw;
  width: 1.8667vw;
  margin-left: 1.3333vw;
}
#store-filter .filters .filter-box .filter,
#store-filter .filters .filter-box .filter-item .filter {
  width: 2.9333vw;
  height: 2.9333vw;
  margin-left: 0.6667vw;
}
#store-filter .select {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
}
#store-filter .select .select-box {
  background: #f4f4f4;
  border-radius: 0vw 0vw 4.8vw 4.8vw;
  padding: 7.2vw 3.2vw;
  font-size: 3.4667vw;
  line-height: 3.4667vw;
  position: relative;
  animation: move-bottom 0.5s;
}
#store-filter .select .sort-item + .sort-item {
  margin-top: 7.2vw;
}
#store-filter .select .sort-item.active {
  color: #f4632c;
}
#store-filter .select .sel-price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#store-filter .select .sel-price-section input {
  width: 42.6667vw;
  height: 11.7333vw;
  background: #ffffff;
  border-radius: 1.0667vw;
  text-align: center;
}
#store-filter .select .sel-price-list {
  display: flex;
  flex-wrap: wrap;
  margin: 6.6667vw 0 4vw;
}
#store-filter .select .sel-price-list .item {
  width: 21.3333vw;
  height: 8.5333vw;
  font-size: 3.2vw;
  line-height: 8.5333vw;
  background: #ffffff;
  border-radius: 1.0667vw;
  margin: 0 2.6667vw 2.6667vw 0;
  text-align: center;
}
#store-filter .select .sel-price-list .item.active {
  color: #f4632c;
}
#store-filter .select .sel-price-list .item:nth-child(4n + 4) {
  margin-right: 0;
}
#store-filter .select .sel-price-btn button.active {
  background: #f4632c;
  color: #ffffff;
}

@keyframes move-left {
  0% {
    left: 100%;
  }
  100% {
    top: 0;
  }
}
#aside {
  position: fixed;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  background-color: #ffffff;
  padding: 4vw 3.2vw 0;
  box-sizing: border-box;
  animation: move-left 0.5s;
}
#aside .aside-back {
  display: flex;
  align-items: center;
  font-size: 4vw;
  margin-bottom: 5.3333vw;
  font-weight: 700;
}
#aside .aside-list {
  height: calc(100% - 29.3333vw);
  overflow-y: auto;
}

.aside-item .aside-item-title {
  font-size: 3.7333vw;
  font-weight: 700;
  margin-bottom: 3.3333vw;
}
.aside-item .child {
  display: flex;
  flex-wrap: wrap;
}
.aside-item .child .child-item {
  width: 21.3333vw;
  height: 8.5333vw;
  background: #f4f4f4;
  border-radius: 1.0667vw;
  font-size: 3.2vw;
  font-weight: 400;
  line-height: 8.5333vw;
  text-align: center;
  margin: 0 2.6667vw 2.6667vw 0;
  padding: 0 2.6667vw;
  box-sizing: border-box;
}
.aside-item .child .child-item:nth-child(4n + 4) {
  margin-right: 0;
}
.aside-item .child .child-item.active {
  background: #ffebe4;
  color: #f4632c;
}

.aside-btn {
  height: 18.6667vw;
  align-items: center;
}
.aside-btn button {
  color: #ffffff;
}
.aside-btn .reset {
  background-color: #ffebe4;
  color: #f4632c;
}
.aside-btn .confirm {
  background-color: #f4632c;
}

.store-list {
  padding: 0 3.2vw;
  margin-bottom: 2.6667vw;
}
.store-list .list-platform {
  padding: 5.3333vw 4vw;
  border-radius: 4.2667vw;
}
.store-list .list-platform .platform-title {
  position: relative;
}
.store-list .list-platform .platform-title .store-icon {
  width: 4vw;
  height: 3.7333vw;
  margin-right: 1.3333vw;
}
.store-list .list-platform .platform-title .secret-icon {
  width: 2.5333vw;
  height: 3.2vw;
  margin-right: 1.3333vw;
}
.store-list .list-platform .platform-title .store-icon-noTitle {
  position: absolute;
  left: 0;
  top: 0.5333vw;
}
.store-list .list-platform .platform-title .desc-title {
  text-indent: 5.3333vw;
}
.store-list .list-platform .platform-middle .desc {
  margin-top: 4.6667vw;
}
.store-list .list-platform .platform-middle .price-collect {
  margin-top: 6.6667vw;
  padding-bottom: 4vw;
  border-bottom: 0.1333vw solid #ededed;
}
.store-list .list-platform .platform-bottom {
  margin-top: 5.3333vw;
}
.store-list .list-platform .platform-bottom img {
  width: 11.4667vw;
  height: 12vw;
  margin-right: 3.0667vw;
  border-radius: 50%;
}
.store-list .list-platform .platform-bottom .right-tag .mark span {
  padding: 1.3333vw;
  border-radius: 13.3333vw;
  background: #defff5;
  color: #76e0c0;
}
.store-list
  .list-platform
  .platform-bottom
  .right-tag
  .mark
  span:nth-child(2n) {
  background: #fff1eb;
  color: #f4632c;
}
.store-list .list-platform .platform-bottom .right-tag li {
  margin-top: 0.6667vw;
}
</style>
