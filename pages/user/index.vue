<template>
  <div id="user">
    <!-- 顶部区域 -->
    <header>
      <div class="header-top d-f d-f-end">
        <div class="icon-img" @click="$router.push('/user/message')">
          <img
            src="~assets/imgs/icon-msg.png"
            alt="九九牛网店交易平台，消息提示"
          />
          <span v-if="userInfo.user.notificationCount" class="tag border-radius-50 font-main-color6 font-size-18"
            >{{userInfo.user.notificationCount}}</span
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
            :src="userInfo.user.contact.avatar === ''? require('../../assets/imgs/avatar.png'):userInfo.user.contact.avatar"
            alt="九九牛网店交易平台，用户头像"
          />
        </div>
        <div class="middle-item2">
          <!-- 已登录 -->
          <div class="middle-info1" v-if="userInfo.status !== 0">
            <h4 class="font-size-30 font-weight">{{ userInfo.user.name }}</h4>
            <div
              class="middle-info-desc d-f"
            >
            <!-- 已实名 -->
              <span class="bg-gradient-color font-main-color6" v-if="userInfo.user.hasRealName === 1">
                <img
                  src="~assets/imgs/icon-realName1.png"
                  alt="九九牛网店交易平台，实名图标"
                />
                已实名
              </span>
               <!-- 未实名 -->
              <span class="bg-main-color font-size-20 d-f" v-else>
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
              <nuxt-link :to="{path:'user/info'}" >
                <span class="bg-main-color d-f">
                    编辑个人资料
                    <img
                      src="~assets/imgs/icon-entry.png"
                      alt="九九牛网店交易平台，实名图标"
                    />
                </span>
              </nuxt-link>

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
          <nuxt-link to='/assets' class="account-item d-f d-f-direction">
            <span class="font-main-color font-weight">{{
              userInfo.balance.price
            }}</span>
            <span class="font-size-20 font-main-color7"
              >余额 ({{ userInfo.balance.unit }})</span
            >
            <i></i>
          </nuxt-link>
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
        <div
          class="order-info-item d-f d-f-direction"
          v-for="(item, index) in orderInfo"
          :key="index"
          @click="goto(index)"
        >
          <img :src="item.src" :alt="item.text" />
          <span>{{ item.text }}</span>
        </div>
      </div>
      <!-- 我的店铺区域 -->
      <div class="my-store d-f d-f-between bg-main-color">
        <h3 class="font-size-28 font-weight">我的店铺</h3>
        <span class="font-size-24 font-main-color2" @click="functionInfo('/user/my-store')">
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
          <div
            class="center-item d-f d-f-direction"
            v-for="(item, index) in userCenterInfo"
            :key="index"
            @click="functionInfo(item.path)"
          >
            <img :src="item.src" :alt="item.text" />
            <span class="font-size-22 font-main-color4">{{ item.text }}</span>
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
      },
      userCenterInfo: [
        {
          src: require("../../assets/imgs/function-icon1.png"),
          text: "我的合同",
          path:'/contract'
        },
        {
          src: require("../../assets/imgs/function-icon2.png"),
          text: "银行卡管理",
          path:'/user/bank'
        },
        {
          src: require("../../assets/imgs/function-icon3.png"),
          text: "我的收藏",
          path:'/user/collect'
        },
        {
          src: require("../../assets/imgs/function-icon4.png"),
          text: "交易攻略",
          path: '/article/list-1'
        }
      ],
      orderInfo: [
        { src: require("../../assets/imgs/order-info1.png"), text: "全部订单" },
        { src: require("../../assets/imgs/order-info2.png"), text: "待付款" },
        { src: require("../../assets/imgs/order-info3.png"), text: "交接中" },
        { src: require("../../assets/imgs/order-info4.png"), text: "已完成" }
      ]
    };
  },
  components: {
    customTabbar
  },
  async asyncData({ app }) {
    // 获取个人中心数据
    let userInfo = await app.$api.getUserInfo();
    console.log(userInfo)
    if (userInfo.status !== 1) {
      return;
    } else {
      userInfo.data.status = 1;
      userInfo = userInfo.data;

      return { userInfo };
    }
  },
  methods: {
    functionInfo(path){
      this.$router.push(path)
    },
    goto(idx){
      this.$router.push({name:'user-order',query:{tab:idx}})
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
  .header-top {
    .icon-img {
      width: 40px;
      height: 40px;
      &:first-child {
        margin-right: 40px;
        position: relative;
        line-height: 26px;
        .tag {
          position: absolute;
          top: -30px;
          right: -15px;
          padding: 8px 8px;
          background: #f51b1b;
        }
      }
    }
  }
  .header-middle {
    margin-top: 30px;
    .middle-item1 {
      width: 120px;
      height: 120px;
      margin-right: 20px;
    }
    .middle-item2 {
      height: 120px;
      .middle-info1 {
        .middle-info-desc {
          margin-top: 20px;
          line-height: 42px;
          span {
            height: 42px;
            padding: 0px 17px 0px 17px;
            box-sizing: border-box;
            border-radius: 300px;
            &:first-child {
              margin-right: 14px;
            }
          }
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
      .middle-info2 {
        line-height: 120px;
      }
    }
  }
}
#personalCenter {
  padding: 0 24px;
  .my-account {
    padding: 34px 30px 50px;
    border-radius: 16px;
    margin-top: -125px;
    .my-account-top {
      img {
        width: 16px;
        height: 16px;
        margin-bottom: 7px;
      }
    }
    .my-account-middle {
      margin-top: 55px;
      .account-item {
        position: relative;
        span:first-child {
          margin-bottom: 10px;
        }
        i {
          position: absolute;
          right: -60px;
          height: 100%;
          border-right: 1px solid #ededed;
        }
      }
    }
  }
  .my-order-info {
    margin-top: 20px;
    padding: 0 30px;
    box-sizing: border-box;
    border-radius: 16px;
    height: 187px;
    .order-info-item img {
      width: 48px;
      height: 48px;
      margin-bottom: 15px;
    }
  }
  .my-store {
    margin-top: 20px;
    padding: 0 30px;
    box-sizing: border-box;
    border-radius: 16px;
    height: 120px;
    img {
      width: 16px;
      height: 16px;
      margin-bottom: 7px;
    }
  }
  .ad {
    margin-top: 20px;
    height: 148px;
  }
  .function-center {
    padding: 34px 30px 50px;
    border-radius: 16px;
    margin-top: 20px;
    .function-center-middle {
      margin-top: 55px;
      .center-item img {
        width: 45px;
        height: 45px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
