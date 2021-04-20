<template>
  <main :class="isInfo ? '' : 'pd-22'">
    <a
      class="shopList"
      :href="isInfo?'javascript:void(0);':`/si/${item.key}`"
      v-for="(item, index) in storeList"
      :key="index"
    >
      <h1 class="shopList-top ">
        <!--   <div class="left" v-if="item.showName == 2 && item.platform == 'tm'">
          <img :src="require('../../assets/imgs/icon_' + item.platform + '.png')" />
          <img
            src="../../assets/imgs/ic_home_recommend_protect@2x.png"
            class="pwdImg"
          />
          <span class="pwdText">该店名被隐私保护中</span>
        </div> -->
        <span class="left" :class="{ 'name-active': true }">
          <img
            :src="require('../../assets/imgs/icon_' + item.platform + '.png')"
          />
          <span
            :style="{ 'font-weight': isInfo ? 700 : 500 }"
            v-html="item.title"
            class="font-weight text-wraps"
          />
        </span>
      </h1>
      <!--    <span
        v-if="item.name || (item.showName == 2 && item.platform == 'tm')"
        class="shopList-center text-wraps"
        v-html="item.title"
      ></span> -->
      <!-- 价格栏 -->
      <div class="sl-price">
        <div class="sl-price-box">
          <span class="priceSymbol">网店售价￥</span>
          <span class="price">{{ item.parse_price }}</span>
        </div>

        <div v-if="isInfo" class="sl-price-collect">
          <!-- <img src="../static/newimg/ic_shop_details_tab_shoucang_a.png" mode="" />	 -->
          {{ item.collect }}人收藏
        </div>
        <div v-else class="sl-price-collect">{{ item.collect }}人收藏</div>
      </div>
      <!-- 详情金额 -->
      <div class="si-price-box" v-if="isInfo">
        <div class="si-price-item">
          <div class="si-price">￥{{ item.protectionPrice }}</div>
          <div class="si-text">
            消保金额（需退还）
          </div>
        </div>
        <div class="si-price-line"></div>
        <div class="si-price-item">
          <div class="si-price">￥{{ item.technologyYearPrice }}</div>
          <div class="si-text">
            技术年费（需退还）
          </div>
        </div>
      </div>
      <div class="shopList-bottom" v-if="item.main_category.thumb">
        <img :src="item.main_category.thumb" />
        <div class="right">
          <div class="right-top">
            {{
              item.main_category.name === "" ? "" : item.main_category.name + ""
            }}
            {{
              item.parse_trademark_type === ""
                ? ""
                : "/" + item.parse_trademark_type + "标"
            }}
            {{
              item.parse_store_type === "" ? "" : "/" + item.parse_store_type
            }}
          </div>
          <div class="right-bottom">
            <template v-for="(title, i) in item.parse_sell_point">
              <span :key="i" v-if="i === 0">{{ title }}</span>
              <span
                :key="i + '_next'"
                v-if="i > 0 && title.length <= 4 && i < 3"
                :class="i % 2 !== 0 ? 'active-text' : ''"
                >{{ title }}</span
              >
            </template>
          </div>
        </div>
      </div>
    </a>
  </main>
</template>

<script>
export default {
  props: {
    storeList: {
      type: Array,
      default: () => [],
      required: true
    },
    isShowList: {
      type: Boolean,
      default: true
    },
    isInfo: {
      type: Boolean,
      default: false
    },
    jump: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  methods: {
    // 店铺详情跳转
    navItemClick(key) {
      if (!this.isInfo) this.$router.push(`/si/${key}`);
    }
  }
};
</script>

<style lang="scss" scoped>
a{
  display: block;
}
main {
  box-sizing: border-box;
}
.pd-22 {
  padding: 0 22px;
}
.shopList {
  background: #ffffff;
  border-radius: 32px;
  padding: 0 30px 30px;
  margin-bottom: 20px;
  .shopList-top {
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        vertical-align: center;
        margin-right: 11px;
        flex-shrink: 0;
      }
      .pwdImg {
        width: 19px;
        height: 24px;
      }
      .pwdText {
        color: #a9814d;
        font-size: 24px;
        font-weight: 400;
      }
      span {
        font-size: 30px;
        font-weight: 700;
      }
    }
    .right {
      color: #f4632c;
      .priceSymbol {
        font-size: 20px;
      }
      .price {
        font-weight: 700;
        font-size: 40px;
      }
    }
    .name-active {
      position: relative;
      img {
        position: absolute;
        top: 6px;
      }
      .font-weight {
        text-indent: 40px;
      }
    }
  }
  .shopList-center {
    font-size: 26px;
    line-height: 40px;
    margin-bottom: 30px;
  }
  .shopList-bottom {
    display: flex;
    margin-top: 35px;
    img {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .right {
      .right-top {
        font-size: 24px;
        color: #999;
      }
      .right-bottom {
        margin-top: 16px;
        span {
          background: #fff1eb;
          font-size: 20px;
          color: #f4632c;
          padding: 6px 10px;
          height: 40px;
          margin-right: 10px;
          border-radius: 20px;
          box-sizing: border-box;
        }
        .active-text {
          color: #2bce9e;
          background: #defff5;
        }
      }
    }
  }
  .active {
    height: 100px !important;
  }
  // 价格栏
  .sl-price {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 20px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgb(237, 237, 237);
    .sl-price-box {
      color: rgb(244, 99, 44);
    }
    .price {
      font-weight: 700;
      font-size: 34px;
    }
    .sl-price-collect {
      color: rgb(153, 153, 153);
      display: flex;
      align-items: center;
      img {
        height: 30px;
        width: 30px;
        margin-right: 11px;
      }
    }
  }

  // 详情价格栏
  .si-price-box {
    height: 94px;
    display: flex;
    background-color: #f4f4f4;
    align-items: center;
    .si-price-item {
      width: 50%;
      text-align: center;
      font-size: 20px;
      line-height: 20px;
      color: #999999;
      .si-price {
        font-size: 24px;
        line-height: 24px;
        color: #1c1c1c;
        margin-bottom: 13px;
      }
    }
    .si-price-line {
      background-color: #cccccc;
      height: 32px;
      width: 1px;
    }
  }
}
</style>
