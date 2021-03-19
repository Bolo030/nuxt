<template>
  <div id="user">
    <!-- 顶部区域 -->
    <header>
      <div class="header-top d-f d-f-end">
        <div class="icon-img">
          <img
            src="~assets/imgs/icon-msg.png"
            alt="九九牛网店交易平台，消息提示"
          />
          <span class="tag border-radius-50 font-main-color6 font-size-18"
            >19</span
          >
        </div>
        <div class="icon-img">
          <nuxt-link to="/user/seting">
            <img
              src="~assets/imgs/icon-setting.png"
              alt="九九牛网店交易平台，个人中心设置"
            />
          </nuxt-link>
        </div>
      </div>
      <div class="header-middle d-f-flex">
        <div class="middle-item1">
          <img
            class="border-radius-50"
            :src="userInfo.user.contact.avatar === '' ? '/_nuxt/assets/imgs/avatar.png':userInfo.user.contact.avatar"
            alt="九九牛网店交易平台，用户头像"
          />
        </div>
        <div class="middle-item2">
          <!-- 已登录 -->
          <div class="middle-info1" v-if="userInfo.status !== 0">
            <h4 class="font-size-30 font-weight">{{ userInfo.user.name }}</h4>
            <!-- 已实名 -->
            <div
              class="middle-info-desc d-f"
              v-if="userInfo.user.hasRealName === 1"
            >
              <span class="bg-gradient-color font-main-color6">
                <img
                  src="~assets/imgs/icon-realName1.png"
                  alt="九九牛网店交易平台，实名图标"
                />
                已实名
              </span>
              <span class="bg-main-color d-f">
                编辑个人资料
                <img
                  src="~assets/imgs/icon-entry.png"
                  alt="九九牛网店交易平台，实名图标"
                />
              </span>
            </div>
            <!-- 未实名 -->
            <div class="middle-info-desc d-f" v-else>
              <span class="bg-main-color font-size-20 d-f">
                <img
                  src="~assets/imgs/icon-realName2.png"
                  alt="九九牛网店交易平台，实名图标"
                />
                账号尚未实名认证
                <img
                  src="~assets/imgs/icon-entry.png"
                  alt="九九牛网店交易平台，实名图标"
                />
              </span>
              <span class="bg-main-color font-size-20 d-f">
                编辑个人资料
                <img
                  src="~assets/imgs/icon-entry.png"
                  alt="九九牛网店交易平台，实名图标"
                />
              </span>
            </div>
          </div>
          <!-- 未登录 -->
          <div class="middle-info2 font-size-36 font-weight" v-else>
            <nuxt-link to="/login">登录/注册</nuxt-link>
          </div>
        </div>
      </div>
    </header>

    <!-- 主体区域 -->
    <main id="personalCenter">
      <!-- 我的账户信息 -->
      <div class="my-account bg-main-color">
        <div class="my-account-top d-f d-f-between">
          <h3 class="font-size-28 font-weight">我的账户</h3>
          <span class="font-size-24 font-main-color2">
            管理我的账户
            <img
              src="~assets/imgs/icon-entry2.png"
              alt="九九牛网店交易平台，箭头图标"
            />
          </span>
        </div>
        <div class="my-account-middle d-f d-f-around font-size-40 ">
          <div class="account-item d-f d-f-direction">
            <span class="font-main-color font-weight">{{
              userInfo.balance.price
            }}</span>
            <span class="font-size-20 font-main-color7"
              >余额 ({{ userInfo.balance.unit }})</span
            >
            <i></i>
          </div>
          <div class="account-item d-f d-f-direction">
            <span class="font-main-color font-weight">0</span>
            <span class="font-size-20 font-main-color7">我的优惠券</span>
            <i></i>
          </div>
          <div class="account-item d-f d-f-direction">
            <span class="font-main-color font-weight">0</span>
            <span class="font-size-20 font-main-color7">我的积分</span>
          </div>
        </div>
      </div>
      <!-- 我的订单信息 -->
      <div
        class="my-order-info bg-main-color d-f d-f-around font-size-24 font-main-color4"
      >
        <div class="order-info-item d-f d-f-direction">
          <img src="~assets/imgs/order-info1.png" alt="全部订单" />
          <span>全部订单</span>
        </div>
        <div class="order-info-item d-f d-f-direction">
          <img src="~assets/imgs/order-info2.png" alt="待付款" />
          <span>待付款</span>
        </div>
        <div class="order-info-item d-f d-f-direction">
          <img src="~assets/imgs/order-info3.png" alt="交接中" />
          <span>交接中</span>
        </div>
        <div class="order-info-item d-f d-f-direction">
          <img src="~assets/imgs/order-info4.png" alt="已完成" />
          <span>已完成</span>
        </div>
      </div>
      <!-- 我的店铺区域 -->
      <div class="my-store d-f d-f-between bg-main-color">
        <h3 class="font-size-28 font-weight">我的店铺</h3>
        <span class="font-size-24 font-main-color2">
          查看我的挂店信息
          <img
            src="~assets/imgs/icon-entry2.png"
            alt="九九牛网店交易平台，箭头图标"
          />
        </span>
      </div>
      <!-- 广告区域 -->
      <div class="ad">
        <img src="~assets/imgs/icon-ad.png" alt="咨询客服" />
      </div>

      <!-- 功能中心 -->
      <div class="function-center bg-main-color">
        <div class="function-center-top d-f d-f-between">
          <h3 class="font-size-28 font-weight">功能中心</h3>
        </div>
        <div class="function-center-middle d-f d-f-between font-size-40 ">
          <div class="center-item d-f d-f-direction">
            <img src="~assets/imgs/function-icon1.png" alt="我的合同" />
            <span class="font-size-22 font-main-color4">我的合同</span>
          </div>
          <div class="center-item d-f d-f-direction">
            <img src="~assets/imgs/function-icon2.png" alt="银行卡管理" />
            <span class="font-size-22 font-main-color4">银行卡管理</span>
          </div>
          <div class="center-item d-f d-f-direction">
            <img src="~assets/imgs/function-icon3.png" alt="我的收藏" />
            <span class="font-size-22 font-main-color4">我的收藏</span>
          </div>
          <div class="center-item d-f d-f-direction">
            <img src="~assets/imgs/function-icon4.png" alt="交易攻略" />
            <span class="font-size-22 font-main-color4" @click="dmeo"
              >交易攻略</span
            >
          </div>
        </div>
      </div>
      <!-- 底部tabbar -->
      <custom-tabbar :active="2" />
    </main>
  </div>
</template>

<script>
import customTabbar from "~/components/common/custom-tabbar";

export default {
  name: "user",
  data() {
    return {
      userInfo: {
        status: 0,
        user: {
          contact: {
            avatar: ""
          }
        },
        balance: {
          price: 0,
          unit: "元"
        }
      }
    };
  },
  components: {
    customTabbar
  },
  async asyncData({ app }) {
    // 获取个人中心数据
    let userInfo = await app.$api.getUserInfo();
    if (userInfo.status !== 1) {
      return;
    } else {
      userInfo.data.status = 1;
      userInfo = userInfo.data;
      return { userInfo };
    }
  },
  methods: {
    dmeo() {
      console.log(this.userInfo);
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 440px;
  background: url("~assets/imgs/personal-bg.png") no-repeat;
  background-size: cover;
  padding: 67px 24px 0;
  box-sizing: border-box;
}

header .header-top .icon-img {
  width: 40px;
  height: 40px;
}

header .header-top .icon-img:first-child {
  margin-right: 40px;
  position: relative;
  line-height: 26px;
}

header .header-top .icon-img:first-child .tag {
  position: absolute;
  top: -30px;
  right: -15px;
  padding: 8px 8px;
  background: #f51b1b;
}

header .header-middle {
  margin-top: 30px;
}

header .header-middle .middle-item1 {
  width: 120px;
  height: 120px;
  margin-right: 20px;
}

header .header-middle .middle-item2 {
  height: 120px;
}

header .header-middle .middle-item2 .middle-info1 .middle-info-desc {
  margin-top: 20px;
  line-height: 42px;
}

header .header-middle .middle-item2 .middle-info1 .middle-info-desc span {
  height: 42px;
  padding: 0px 17px 0px 17px;
  box-sizing: border-box;
  border-radius: 300px;
}

header
  .header-middle
  .middle-item2
  .middle-info1
  .middle-info-desc
  span:first-child {
  margin-right: 14px;
}

header .header-middle .middle-item2 .middle-info1 .middle-info-desc img {
  width: 20px;
  height: 20px;
}

header .header-middle .middle-item2 .middle-info2 {
  line-height: 120px;
}

#personalCenter {
  padding: 0 24px;
}

#personalCenter .my-account {
  padding: 34px 30px 50px;
  border-radius: 16px;
  margin-top: -125px;
}

#personalCenter .my-account .my-account-top img {
  width: 16px;
  height: 16px;
  margin-bottom: 7px;
}

#personalCenter .my-account .my-account-middle {
  margin-top: 55px;
}

#personalCenter .my-account .my-account-middle .account-item {
  position: relative;
}

#personalCenter .my-account .my-account-middle .account-item span:first-child {
  margin-bottom: 10px;
}

#personalCenter .my-account .my-account-middle .account-item i {
  position: absolute;
  right: -60px;
  height: 100%;
  border-right: 1px solid #ededed;
}

#personalCenter .my-order-info {
  margin-top: 20px;
  padding: 0 30px;
  box-sizing: border-box;
  border-radius: 16px;
  height: 187px;
}

#personalCenter .my-order-info .order-info-item img {
  width: 48px;
  height: 48px;
  margin-bottom: 15px;
}

#personalCenter .my-store {
  margin-top: 20px;
  padding: 0 30px;
  box-sizing: border-box;
  border-radius: 16px;
  height: 120px;
}

#personalCenter .my-store img {
  width: 16px;
  height: 16px;
  margin-bottom: 7px;
}

#personalCenter .ad {
  margin-top: 20px;
  height: 148px;
}

#personalCenter .function-center {
  padding: 34px 30px 50px;
  border-radius: 16px;
  margin-top: 20px;
}

#personalCenter .function-center .function-center-middle {
  margin-top: 55px;
}

#personalCenter .function-center .function-center-middle .center-item img {
  width: 45px;
  height: 45px;
  margin-bottom: 20px;
}
</style>
