<template>
  <div class="main">
    <main class="store">
      <div class="buyStore">
        <div class="buyStore-top" v-if="!this.search.search">
          <!-- 步骤 -->
          <div class="tradeMsg space-evenly">
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" alt="资金安全"/>
              <span>资金安全</span>
            </div>
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" alt="流程简单" />
              <span>流程简单</span>
            </div>
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" alt="交易透明"/>
              <span>交易透明</span>
            </div>
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" alt="专业高效" />
              <span>专业高效</span>
            </div>
          </div>
          <!-- 菜单 -->
          <div class="storeInfo">
            <a
              href="/tool/buyStore"
              class="storeInfo-item"
              style="background: linear-gradient(90deg, #ff7849 0%, #ff9975 100%);"
            >
              <img src="~assets/imgs/store/ic_shop_classification_goumai.png" alt="网店购买" />
              <span>网店购买</span>
            </a>
            <a
              href="/zur"
              class="storeInfo-item"
              style="background: linear-gradient(90deg, #80d04f 0%, #80d884 100%);"
            >
              <img src="~assets/imgs/store/ic_shop_classification_chusou.png" alt="网店出售" />
              <span>网店出售</span>
            </a>
            <a
              href="/tool/assess"
              class="storeInfo-item"
              style="background: linear-gradient(90deg, #25cacc 0%, #66d9da 100%);"
            >
              <img src="~assets/imgs/store/ic_shop_classification_gujia.png" alt="网店估价" />
              <span>网店估价</span>
            </a>
            <a
              href="/enter"
              class="storeInfo-item"
              style="background: linear-gradient(90deg, #ffb049 0%, #f5b96d 100%);"
            >
              <img src="~assets/imgs/store/ic_shop_classification_ruzhu.png" alt="网店入驻" />
              <span>网店入驻</span>
            </a>
          </div>
          <!-- 服务页banner -->
          <a class="coverImg" href="/activity/rulesDetails">
            <img 
              src="~assets/imgs/store/bg_shop_fuwurukou.png"
              alt="省时购 放心售 4大保障，全方位助力"
             />
          </a>
        </div>
        <van-sticky>
        <!-- 导航 -->
        <custom-store-filter
          :showBack="this.search.search"
          :searchData="search"
          @result="getSearch"
          :child="categoryList"
        ></custom-store-filter>
        </van-sticky>
        <!-- 列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <store-list style="margin-top:0.2933rem" :storeList="list" />
        </van-list>
      </div>
    </main>
    <!-- 底部tabbar -->
    <custom-tabbar :active="4" v-if="!this.search.search" />
  </div>
</template>

<script>
import store from "../../components/custom-store-filter/data.js";
const searchStatic = {
  search: undefined,
  platform: "tm", // 平台
  sort: 0, //排序选择
  area: undefined, //地区范围
  trademarkType: undefined, // 商标
  taxType: undefined, //认证/证明方式
  category: undefined, //类型--服务类型
  isNew: undefined,
  price: {
    low: undefined,
    high: undefined
  },
  per_page: 15,
  page: 1
};
import { Toast } from "vant";
export default {
  head() {
    return {
      title: `${this.pName}商城入驻_${this.pName}店铺转让出售_${this.pName}网店转让-九九牛`,
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            `九九牛为你提供${this.pName}网店代运营、店铺转让出售、${this.pName}商城入驻服务，本站包含大量最新${this.pName}店铺资源，买卖${this.pName}商城，就上九九牛网店交易平台！`
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            `${this.pName}商城入驻,${this.pName}店铺转让,${this.pName}店铺出售,${this.pName}入驻,${this.pName}网店转让，网店转让`
        }
      ]
    };
  },
  async asyncData({ app, params }) {
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      overlay: true,
      duration:500
    });
    let search = { ...searchStatic };
    search.platform = params.store || "tm";
    console.log(params.id);
    search = params.id
      ? app.$utils.getSearchQuery(params.id, store, search)
      : search;
    var type;
    switch (search.platform) {
      case "tm":
        type = "mainCategory";
        break;
      case "jd":
        type = "jdCategory";
        break;
      case "tb":
        type = "tbCategory";
        break;
      default:
        type = "jdCategory";
    }

    let [list, categoryList] = await Promise.all([
      app.$api
        .getStoreList(search)
        .then(res => (res.status === 1 ? res.data.data : {})),
      app.$api
        .getStoreSearchParams({ type })
        .then(res => (res.status === 1 ? res.data[type] : []))
    ]);
    categoryList.forEach(e => {
      e.selected = false;
    });
    let pName=app.$utils.getPname(search.platform);
    // Toast.clear()
    return {
      list,
      categoryList,
      search,
      pName
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
      search: { ...searchStatic },
      // 列表搜索加载
      loading: false,
      finished: false
    };
  },
  filters: {
    fourFormat(str) {
      if (str) {
        str = str.replace(/\s/g, "").replace(/(.{4})/g, "$1 ");
      }
      return str;
    }
  },
  methods: {
    onLoad() {
      this.search.page++;
      this.getData(true, false);
    },
    getData(loading = true, remove = false) {
      this.loading = loading;
      if (remove) this.search.page = 1;
      this.$api.getStoreList(this.search).then(res => {
        if (res.status == 1) {
          if (remove) this.list = res.data.data;
          else this.list.push(...res.data.data);
          if (res.data.data.length == 0) {
            this.finished = true;
          }
        } else {
          this.finished = true;
        }
        setTimeout(() => {
          this.loading = false;
        }, 2000);
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
