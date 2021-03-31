<template>
  <!-- 手机号登录 -->
  <div class="login-box" style="display: block;" id="phoneLoginbox">
    <div class="login-top-title d-f d-f-between">
      <h3 class=" active">
        {{ isLoginType ? "验证码登录" : "密码登录" }}
      </h3>
      <h3 class="" v-show="false">游客下单</h3>
    </div>
    <ul class="login-middle">
      <li>
        <img
          src="~assets/imgs/phone_icon.png"
          alt="九九牛网店交易平台，登录图标"
          class="login-icon"
        />
        <input
          type="tel"
          placeholder="请输入你的手机号"
          maxlength="11"
          v-model="user.userPhone"
        />
        <img
          v-show="false"
          src="~assets/imgs/icon_cancel.png"
          alt="九九牛网店交易平台，取消图标"
          class="img-cancel"
        />
      </li>
      <li v-if="isLoginType">
        <img
          src="~assets/imgs/msg-code-icon.png"
          alt="九九牛网店交易平台，登录图标"
          class="login-icon"
        />
        <input
          type="number"
          placeholder="请输入你验证码"
          maxlength="6"
          v-model="user.userCode"
          @focus="chekData('code')"
        />
        <span
          class="getCode d-block font-size-22 font-main-color "
          @click="getCodeMsg"
          ref="getCode"
          :class="{ active: isShowCode }"
          >{{ isShowCode ? "重新获取" + countdown : "获取验证码" }}</span
        >
        <img
          v-show="false"
          src="~assets/imgs/icon_cancel.png"
          alt="九九牛网店交易平台，取消图标"
          class="img-cancel"
          id="markImg"
        />
      </li>

      <li v-else>
        <img
          src="~assets/imgs/ic_sign_in_password.png"
          alt="九九牛网店交易平台，登录图标"
          class="login-icon"
        />
        <input
          type="password"
          placeholder="请输入8~16位数字或字母密码"
          maxlength="16"
          minlength="8"
          v-model="user.userPwd"
          @focus="chekData('pwd')"
        />
        <img
          v-show="false"
          src="~assets/imgs/icon_cancel.png"
          alt="九九牛网店交易平台，取消图标"
          class="img-cancel"
        />
      </li>
      <li class="loginBtn font-main-color6 ">
        <button
          class="font-size-32"
          @click="loginButton"
          :class="{ active: isShowBtn }"
        >
          登录
        </button>
      </li>
      <li class="font-size-24 d-f d-f-between" v-if="isLoginType">
        <span id="loginPwd" @click="switchLogin(false)">密码登录</span>
        <NuxtLink to="/forget">
          <span class="font-main-color" id="forgetPwd">忘记密码？</span>
        </NuxtLink>
      </li>
      <li class="font-size-24 d-f d-f-between" v-else>
        <span id="loginPhone" @click="switchLogin(true)">手机验证码登录</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoginType: true,
      user: {
        userPhone: "",
        userCode: "",
        userPwd: ""
      },
      isShowCode: false,
      countdown: 60,
      isShowBtn: true
    };
  },
  asyncData(context) {
    // called every time before loading the component
  },
  methods: {
    // 切换登录方式
    switchLogin(value) {
      this.isLoginType = value;
      this.isShowBtn = true;
      this.user.userPhone = "";
      this.user.userCode = "";
      this.user.userPwd = "";
    },
    // 获取验证码
    getCodeMsg() {
      if (this.isShowCode) return;
      if (this.user.userPhone.length !== 0) {
        if(!/^1[3456789]\d{9}$/.test(this.user.userPhone)) return this.$toast("请输入正确的手机格式");
        this.isShowCode = true;
        this.$api.sendMsg({ type: 6, phone: this.user.userPhone }).then(res => {
          if (res.status !== 1) {
            return this.$toast("服务器繁忙，请稍后发送");
          } else {
            this.$toast(res.message);
          }
        });
        let timer = setInterval(() => {
          if (this.countdown === 0) {
            this.countdown = 60;
            this.isShowCode = false;
            clearInterval(timer);
          } else {
            this.countdown--;
          }
        }, 1000);
      } else {
        return this.$toast("请填写账号");
      }
    },
    // 发送登录请求
    loginButton() {
      this.$cookies.set("name", "value1234334");
      if (this.isLoginType) {
        // 验证码登录
        if (this.user.userPhone.length !== 0 &&this.user.userCode.length !== 0) {
          // 具体业务逻辑
          this.$api
            .codeLogin({
              username: this.user.userPhone,
              code: this.user.userCode,
              type: "h5"
            })
            .then(res => {
              if (res.status !== 1) {
                return this.$toast("登录失败");
              } else {
                this.$cookies.set("token", res.data.token,{expires:this.$store.state.auth.cookieMaxExpires});
                this.$toast("登录成功");
                this.$router.push("/user");
              }
            });
        } else {
          return this.$toast("账号或验证码不能为空");
        }
      } else {
        // 密码登录
        if (this.user.userPhone.length !== 0 &&this.user.userPwd.length !== 0) {
          // 具体业务逻辑
          this.$api
            .pwdLogin({
              username: this.user.userPhone,
              password: this.user.userPwd
            })
            .then(res => {
              if (res.status !== 1) {
                return this.$toast(res.message);
              } else {
                 this.$cookies.set("token", res.data.token,{expires:this.$store.state.auth.cookieMaxExpires});
                this.$toast("登录成功");
                this.$router.push("/user");
              }
            });
        } else {
          return this.$toast("账号或密码不能为空");
        }
      }
    },
    // 监听输入框变化
    chekData(value) {
      if (value === "code") {
        if (this.user.userPhone.length !== 0 && this.isShowCode) {
          this.isShowBtn = false;
        } else {
          this.isShowBtn = true;
          return this.$toast("请输入账号和获取验证码");
        }
      } else if (value === "pwd") {
        if (this.user.userPhone.length !== 0 && this.user.userPwd.length === 0) {
          if(!/^1[3456789]\d{9}$/.test(this.user.userPhone)) return this.$toast("请输入正确的手机格式");
          this.isShowBtn = false;
        } else {
          this.isShowBtn = true;
          return this.$toast("请输入账号");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  .login-top-title {
    margin-top: 10px;
    height: 134px;
    h3 {
      position: relative;
      font-size: 30px;
      font-weight: 700;
      color: #999999;
    }
    .active {
      font-weight: 700;
      font-size: 36px;
      color: #000;
      &::after {
        display: block;
        position: absolute;
        left: 0;
        bottom: -15px;
        width: 40px;
        height: 6px;
        border-radius: 3px;
        background: #f4632c;
        content: "";
      }
    }
  }
  .login-middle {
    li {
      position: relative;
      margin-bottom: 46px;
      .getCode {
        &.active {
          color: #f5b69f;
          border: 1px solid #f5b69f !important;
        }
      }
      .login-icon {
        position: absolute;
        top: 50%;
        left: 32px;
        transform: translateY(-50%);
        width: 36px;
        height: 36px;
      }
      input {
        width: 100%;
        height: 94px;
        padding-left: 92px;
        box-sizing: border-box;
        background: #f7f7f7;
        border-radius: 12px;
      }
      .img-cancel {
        position: absolute;
        top: 50%;
        right: 30px;
        transform: translateY(-50%);
        width: 26px;
        height: 26px;
      }
      #markImg {
        right: 360px;
      }
      .getCode {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 30px;
        padding: 13px;
        border: 1px solid #f4632c;
        border-radius: 25px;
      }
    }
    .loginBtn {
      margin-top: 6px;
      text-align: center;
      button {
        height: 94px;
        width: 100%;
        background: #f4632c;
        border-radius: 8px;
        &.active {
          background: #f5b69f !important;
        }
      }
    }
  }
}
</style>
