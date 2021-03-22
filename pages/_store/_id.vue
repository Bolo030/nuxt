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
        <custom-store-filter
          :showBack="isSearch"
          :searchData="search"
          @result="getSearch"
          :child='categoryList'
        ></custom-store-filter>
        <!-- 列表 -->
        <store-list style="margin-top:0.2933rem" :storeList="list" />
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
  async asyncData({ app, params }) {
    console.log(params,'paramsparams')
    let search = {
      platform: params.store || "tm",
      page: 1
    };
    		var type;
				switch (search.platform) {
					case 'tm':
						type = 'mainCategory'
						break;
					case 'jd':
						type = 'jdCategory'
						break;
					case 'tb':
						type = 'tbCategory'
						break;
					default:
						type = 'jdCategory'
				}
    let [list, categoryList] = await Promise.all([
      app.$api
        .getStoreList(search)
        .then(res => (res.status === 1 ? res.data.data : {})),
      app.$api
        .getStoreSearchParams({type})
        .then(res => (res.status === 1 ? res.data[type] : []))
    ]);
    return {
      list,
      categoryList,
      search
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
  },
  methods: {
    getData(loading = true, remove = false) {
      if (remove) {
        this.search.page = 1;
        this.page.done = false;
      }
      this.$api.getStoreList(this.search).then(res => {
        if (res.status === 1) {
          if (remove) {
            this.list = res.data.data;
          } else {
            this.list.push(...res.data.data);
            this.page.loadStatus = "more";
          }
          if (res.data.last_page === this.search.page) {
            this.page.done = true;
            this.page.loadStatus = "nomore";
          }
        }
        this.loading = loading;
      });
    },

    event() {
      /*   uni.navigateTo({
        url: "/pages/activity/rulesDetails",
      }); */
    },
    getSearch(data) {
      this.search = data;
      this.getData(true, true);
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
