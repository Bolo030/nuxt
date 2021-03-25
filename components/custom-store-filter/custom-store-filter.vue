<template>
  <div id="store-filter">
    <div class="main" @touchmove.stop.prevent>
      <!-- 导航 -->
      <div class="nav">
        <div class="nav-box">
          <van-icon
            v-if="showBack"
            @click="back"
            name="arrow-left"
            size="20"
            class="back"
          ></van-icon>
          <nuxt-link
            :to="`/${item.value}`"
            class="nav-item"
            v-for="(item, index) in platformList"
            :class="{ active: item.value == search.platform }"
            :key="index"
          >
            <span>{{ item.name }}</span>
            <div class="line" v-if="item.value == search.platform"></div>
          </nuxt-link>
        </div>
      </div>
      <!-- 筛选栏 -->
      <div class="filters">
        <div class="search-box" @click="gotoSearch">
          <img src="../../assets/imgs/store/search.png" />
          <span class="text-wrap content">{{ search.search || "搜索" }}</span>
          <div
            class="search-clear"
            v-if="search.search"
            @click.stop="clearSearch"
          >
            <van-icon class="clear" name="cross" size="15"></van-icon>
          </div>
        </div>
        <div class="filter-box">
          <div
            class="filter-item"
            v-for="(item, index) in filterList"
            :key="index"
            @click="chooseFilter(index)"
          >
            <span
              :style="{
                color: item.selected || index == 'filter' ? '#F4632C' : ''
              }"
              >{{ item.name }}</span
            >
            <img
              v-if="index == 'filter'"
              class="filter"
              src="../../assets/imgs/store/filter.png"
            />
            <img
              v-else-if="index == filterIdx && showSelect"
              class="arrows"
              src="../../assets/imgs/store/filter-top.png"
            />
            <img
              v-else
              class="arrows"
              src="../../assets/imgs/store/filter-bottom.png.png"
            />
          </div>
        </div>
      </div>
      <!-- 筛选框 -->
      <div class="select" v-if="showSelect" @click.self="cancel">
        <div class="select-box">
          <!-- 排序 -->
          <div class="sort" v-if="filterIdx == 'sort'">
            <div
              class="sort-item"
              :class="{ active: item.value == search.sort }"
              v-for="(item, index) in sortList"
              :key="index"
              @click="chooseSelect(item, 'h')"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 价格筛选 -->
          <div class="sel-price" v-else>
            <div class="sel-price-section">
              <input
                @input="priceInput"
                type="text"
                v-model="search.price.low"
                placeholder-class="ft-26"
                placeholder="最低价格"
              />
              <span>—</span>
              <input
                @input="priceInput"
                type="text"
                v-model="search.price.high"
                placeholder-class="ft-26"
                placeholder="最低价格"
              />
            </div>
            <div class="sel-price-list">
              <div
                class="item"
                :class="{ active: item.selected }"
                v-for="(item, index) in priceList"
                @click="chooseItem('priceList', index, 'price', true)"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="sel-price-btn btn-store">
              <button @click="cancel">取消</button>
              <button class="active" @click="confirm()">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <filter-side
      ref="child"
      v-show="asideShow"
      :searchChild="search"
      :child="categoryList"
      @data="getAside"
    />
  </div>
</template>

<script>
import store from "./data.js";
import FilterSide from "./components/FilterSide";
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
export default {
  components: {
    FilterSide
  },
  props: {
    showBack: Boolean,
    searchData: {
      type: Object,
      default: () => {}
    },
    child: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.search = Object.assign(this.search, this.searchData);
    this.filterList["sort"].selected = this.search.sort ? true : false;
    if (this.search.price.low || this.search.price.high) {
      this.filterList["price"].selected = true;
      this.priceList.forEach(e => {
        if (
          e.value.low == this.search.price.low &&
          e.value.high == this.search.price.high
        ) {
          return (e.selected = true);
        }
      });
    }else{
       this.filterList["price"].selected = false;
    }
  },
  data() {
    return {
      filterIdx: null, //筛选
      showSelect: false,
      platformList: store.platformList,
      priceList: store.priceList,
      filterList: store.filterList,
      sortList: store.sortList,
      asideShow: false,
      search: { ...searchStatic },
      categoryList: this.child,
      path: "",
    };
  },
  methods: {
    // 返回店铺列表
    back() {
      /* 	uni.reLaunch({
					url: '/pages/shop/shop'
				}) */
    },
    clearSearch() {
      this.search.search = "";
      this.path=this.$utils.delQuery(this.$route.params,'w',this.path)
      this.$router.push(this.path)
      // this.$emit("result", this.search);
    },
    // 筛类型选择
    chooseFilter(idx) {
      if (idx == "filter") {
        this.asideShow = !this.asideShow;
        this.showSelect = false;
      } else {
        if (this.filterIdx == idx) this.showSelect = !this.showSelect;
        else this.showSelect = true;
      }
      this.filterIdx = idx;
    },
    chooseSelect(data, type) {
      var path;
      if (data.value == 0) {
        path = this.$utils.delQuery(this.$route.params, type);
        this.filterList["sort"].selected = false;
      } else {
        path = this.$utils.createQuery(this.$route.params, type, data.value);
      }
      this.$router.push(path);
    },
    chooseItem(arr, idx, type) {
        if (idx == 0)
        this.path = this.$utils.delQuery(this.$route.params, "l");
      else
        this.path = this.$utils.createQuery(this.$route.params, "l", idx);
      for (var i in this[arr]) {
        if (i == idx&&!this[arr][i].selected) {
          this.$set(this[arr][i], "selected", true);
          this.search[type] = this[arr][i].value;
        } else this.$set(this[arr][i], "selected", false);
      }
    },

    cancel() {
     /*  this.search.price = {
        low: undefined,
        high: undefined
      }; */
      // this.chooseItem("priceList", 0);
      // this.filterList.price.selected = false;
      this.showSelect = false;
      // this.$emit("result", this.search);
    },
    confirm() {
      console.log(this.path,'121')
      if (this.path) this.$router.push(this.path);
      else this.$emit("result", this.search);
      this.filterList.price.selected = Boolean(
        this.search.price.high != undefined ||
          this.search.price.low != undefined
      );
      this.showSelect = false;
    },
    priceInput() {
     this.priceList.forEach(e=>{
       e.selected=false
     })
    },
    gotoSearch() {
      this.$router.push({name:'search',query:{data:this.search.search,platform:this.search.platform}})
     /*  uni.navigateTo({
        url: `/pages/search/search?data=${this.search.search}&platform=${this.search.platform}`
      }); */
    },
    getAside(e) {
      if (e.show != undefined) this.asideShow = e.show;
      if (JSON.stringify(e.search) != {} && e.search) {
        this.search = Object.assign(this.search, e.search);
        this.$emit("result", this.search);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes move-bottom {
  0% {
    margin-top: -130px;
    opacity: 0;
  }

  100% {
    margin-top: 0;
    opacity: 1;
  }
}

#store-filter {
  color: #1c1c1c;
  padding-bottom: 226px;
  position: sticky;
  left: 0;
  top: var(--window-top);
  z-index: 100000;

  .nav,
  .filters {
    background-color: #ffffff;
  }

  .main {
    font-size: 28px;
    width: 100vw;
    position: absolute;
    left: 0;
    z-index: 9999;
  }

  .nav-box {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    height: 96px;
    box-sizing: border-box;
    border-bottom: 1px solid #ededed;
    width: 700px;
    margin: 0 auto;

    .nav-item {
      position: relative;
    }

    .active {
      font-size: 32px;
      font-weight: 700;
    }

    .line {
      width: 33px;
      height: 6px;
      background: #f4632c;
      border-radius: 3px;
      position: absolute;
      bottom: 17px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .filters {
    height: 130px;
    padding: 22px 24px;

    &,
    .search-box,
    .filter-box,
    .filter-item {
      display: flex;
      align-items: center;
    }

    .search-box {
      width: 320px;
      height: 84px;
      background: #f4f4f4;
      border-radius: 42px;
      padding-left: 35px;
      font-size: 28px;
      margin-right: 45px;
      flex-shrink: 0;
      justify-content: space-between;
      .content {
        flex: 1;
      }
      .search-clear {
        width: 60px;
        height: 100%;
        display: flex;
        align-items: center;
      }
      img {
        height: 29px;
        width: 32px;
        margin-right: 14px;
        flex-shrink: 0;
      }
    }

    .filter-box {
      flex: 1;
      font-weight: bold;

      &,
      .filter-item {
        justify-content: space-between;

        .arrows {
          height: 8px;
          width: 14px;
          margin-left: 10px;
        }

        .filter {
          width: 22px;
          height: 22px;
          margin-left: 5px;
        }
      }
    }
  }

  .select {
    height: 100vh;
    width: 100vw;
    background-color: rgba($color: #000000, $alpha: 0.3);

    .select-box {
      background: #f4f4f4;
      border-radius: 0px 0px 36px 36px;
      padding: 54px 24px;
      font-size: 26px;
      line-height: 26px;
      position: relative;
      animation: move-bottom 0.5s;
    }

    .sort-item {
      & + .sort-item {
        margin-top: 54px;
      }

      &.active {
        color: #f4632c;
      }
    }

    .sel-price-section {
      display: flex;
      align-items: center;
      justify-content: space-between;

      input {
        width: 320px;
        height: 88px;
        background: #ffffff;
        border-radius: 8px;
        text-align: center;
      }
    }

    .sel-price-list {
      display: flex;
      flex-wrap: wrap;
      margin: 50px 0 30px;

      .item {
        width: 160px;
        height: 64px;
        font-size: 24px;
        line-height: 64px;
        background: #ffffff;
        border-radius: 8px;
        margin: 0 20px 20px 0;
        text-align: center;

        &.active {
          color: #f4632c;
        }

        &:nth-child(4n + 4) {
          margin-right: 0;
        }
      }
    }

    .sel-price-btn {
      button.active {
        background: #f4632c;
        color: #ffffff;
      }
    }
  }
}
</style>
