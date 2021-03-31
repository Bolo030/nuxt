<template>
  <!-- 验证码登录区域开始 -->
  <div class="password-login code-login">
    <div class="login-center">
      <div class="title">
        <span @click="selectLogin('login')" :class="{'actives':select === 0 }">验证码登录</span>
        <span @click="selectLogin('visitor')" :class="{'actives':select === 1 }">游客下单</span>
      </div>
    </div>
    <div class="login-info" v-if="isShow">
      <input
        type="number"
        maxlength="11"
        class="userPhone"
        v-model="user.phone"
        placeholder="请输入你的手机号码"
      />
      <div class="getcode">
        <input
          type="number"
          maxlength="6"
          class="usercode"
          v-model="user.code"
          placeholder="请输入验证码"
          @focus="getFocus()"
        />
        <span @click="getCode" :class="{ noActive: noActive }">{{
          noActive ? "重新获取" + time + "s" : "发送验证码"
        }}</span>
      </div>
      <button :class="{ active: active }" @click="getOrder">0元下单</button>

      <div class="login-text">
        <span>*</span>
        <span
          >以游客身份下单请留下正确的联系方式，下单成功后平台客服
          将尽快与您取得联系，请留意您的通信设备；</span
        >
      </div>
    </div>
    <login :isShow='false' v-else></login>


  </div>
</template>

<script>
// import { visitorsOrder, sendMsg } from "../../requests/login";
export default {
  data() {
    return {
      user: {
        phone: "",
        code: "",
        storeKey: "",
      },
      noActive: false,
      clickCode: false,
      active: false,
      time: 60,
      isShow: false,
      select: 0,
    };
  },
  methods: {
    // 获取验证码
    getCode() {
      if (this.clickCode) return;
      this.clickCode = true;
      if (!this.user.phone) {
        uni.showToast({
          title: "请输入手机号码",
          icon: "none",
        });
        this.clickCode = false;
      } else {
        this.clickCode = true;
        this.noActive = true;
        let times = setInterval(() => {
          this.time--;
          if (this.time == 0) {
            this.noActive = false;
            this.clickCode = false;
            this.time = 60;
            clearInterval(times);
          }
        }, 1000);
        sendMsg({ phone: this.user.phone, type: 8 })
          .then((res) => {
            if (res.status != 1) {
              return this.$api.msg("验证码发送失败！");
            } else {
              this.$api.msg("验证码发送成功！");
            }
          })
          .catch((error) => {});
      }
    },
    // 下单
    getOrder() {
      if (!this.user.phone || !this.user.code) {
        return this.$api.msg("验证码或手机号不能为空");
      }
      visitorsOrder({
        username: this.user.phone,
        code: this.user.code,
        key: this.user.storeKey,
      }).then((res) => {
        if (res.status != 1) {
          return this.$api.msg("下单失败！");
        } else {
          this.$api.msg("下单成功！");
          uni.navigateTo({
            url: "/pages/immediatepayment/pay-success?key=" +res.data.key,
          });
        }
      });
    },
    selectLogin(val) {
      if(val === 'login') {
        this.isShow = false
        this.select = 0
      }else {
        this.isShow = true
        this.select = 1
      }
      console.log(val)
    },
    getFocus() {
      if(!this.user.phone) {
        return this.$api.msg('手机号不能为空！')
      }
      if(!this.clickCode) {
        return this.$api.msg('请先获取验证码！')
      }
      this.active = true;
    }

  },
  onLoad: function (option) {
    this.user.storeKey = option.key;
  },
};
</script>

<style lang="scss" scoped>
.code-login {
  padding: 0 42px;
  background: #fff;
  height: 100%;
  .login-center {
    .title {
      display: flex;
      justify-content: space-between;
      padding-top: 145px;
    }
    .actives {
      position: relative;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1c1c1c;
    }
    .actives::before {
      content: "";
      display: block;
      width: 40px;
      position: absolute;
      bottom: -14px;
      left: 0;
      border-radius: 3px;
      border-bottom: 6px solid #f4632c;
    }
    span {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #999999;
    }
  }
  .login-info {
    .userPhone {
      position: relative;
      width: 100%;
      height: 94px;
      background: #f7f7f7;
      border-radius: 12px;
      box-sizing: border-box;
      padding-left: 90px;
      margin-top: 32px;
    }
    .userPhone::before {
      content: "";
      position: absolute;
      width: 36px;
      height: 36px;
      top: 29px;
      left: 27px;
      background: url("../../static/image/phone_icon.png");
      background-size: cover;
    }
    .getcode {
      position: relative;
      span {
        position: absolute;
        right: 30px;
        top: 15px;
        padding: 14px 13px 14px 15px;
        box-sizing: border-box;
        border-radius: 25px;
        border: 1px solid #f4632c;
        font-size: 20px;
        color: #f4632c;
      }
      .noActive {
        border: 1px solid #f5b69f;
        color: #f5b69f;
      }
      .usercode {
        position: relative;
        width: 100%;
        height: 94px;
        background: #f7f7f7;
        border-radius: 12px;
        box-sizing: border-box;
        padding-left: 90px;
        margin: 46px 0;
      }
      .usercode::before {
        content: "";
        position: absolute;
        width: 36px;
        height: 26px;
        top: 29px;
        left: 27px;
        background: url("../../static/image/msg-code-icon.png");
        background-size: cover;
      }
    }
    button {
      height: 94px;
      color: #fff;
      background: #f5b69f;
      border: none;
      line-height: 94px;
      font-size: 32px;
      font-weight: blod;
    }
    .login-text {
      span:nth-of-type(1) {
        color: #f4632c;
      }
      line-height: 40px;
      font-size: 24px;
      padding-top: 44px;
      color: #666;
    }
  }
}
.active {
  background: #f4632c !important;
}
</style>
