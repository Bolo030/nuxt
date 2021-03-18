<template>
  <div id="tabbar">
    <div class="tabbar-box">
      <!-- tabbar左边突出部分 -->
      <div class="tabbar-important">
        <a :href="tabPage.important.pagePath" class="tabbar-item">
          <img :src="tabPage.important.iconPath" />
          <span class="">{{ tabPage.important.text }}</span>
        </a>
      </div>
      <!-- tabbar右边列表 -->
      <div class="tabbar-list">
        <a
          :href="item.pagePath"
          class="tabbar-item"
          v-for="(item, index) in tabPage.list"
          :key="index"
          :class="{ active: activeIdx == index }"
        >
          <img
            :src="activeIdx == index ? item.selectedIconPath : item.iconPath"
          />
          <span>{{ item.text }}</span>
        </a>
      </div>
    </div>
    <!-- 无意义占位符 -->
    <div class="tabbar-occupy"></div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      activeIdx: this.active,
      tabPage: {
        important: {
          text: "买店",
          pagePath: "/tm",
          iconPath: require("../../assets/imgs/tabbar/ic_home_tab_maidian.png")
        },
        list: [
          {
            text: "首页",
            pagePath: "/",
            iconPath: require("../../assets/imgs/tabbar/ic_home_tab_home_b.png"),
            selectedIconPath: require("../../assets/imgs/tabbar/ic_home_tab_home_a.png")
          },
          {
            text: "卖店",
            pagePath: "",
            iconPath: require("../../assets/imgs/tabbar/ic_home_tab_maidian_b.png"),
            selectedIconPath: require("../../assets/imgs/tabbar/ic_home_tab_maidian_a.png")
          },

          {
            text: "个人中心",
            pagePath: "",
            iconPath: require("../../assets/imgs/tabbar/ic_home_tab_geren_b.png"),
            selectedIconPath: require("../../assets/imgs/tabbar/ic_home_tab_geren_a.png")
          }
        ]
      }
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
#tabbar {
  font-size: 20px;

  .tabbar-box,
  .tabbar-occupy {
    height: 180px;
    width: 100vw;
  }

  img {
    height: 44px;
    width: 46px;
    margin-bottom: 8px;
  }

  .tabbar-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    box-sizing: border-box;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    left: 0;
  }

  .tabbar-important {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    background: linear-gradient(0deg, #f4632c 0%, #ffa36c 100%);
    color: #ffffff;
  }

  .tabbar-list {
    display: flex;
    justify-content: space-between;
    width: 540px;
    height: 120px;
    background: #ffffff;
    border-radius: 60px;
    padding: 0 75px;
    color: #bbbbbb;
    box-shadow: 0px 0px 10px #dddddd;
  }

  .tabbar-item {
    display: flex;
    flex-flow: nowrap column;
    align-items: center;
    justify-content: center;
    height: 100%;

    &.active {
      color: #f4632c;
    }
  }
}
</style>
