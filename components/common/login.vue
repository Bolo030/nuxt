<template>
  <!-- 手机号登录 -->
  <div class="login-box" style="display: block;" id="phoneLoginbox">
    <div class="login-top-title d-f d-f-between" v-if="isShow">
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
          @input="change('phone')"
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
          @input="change('code')"
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
          @input="change('pwd')"
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
  props: {
    isShow: {
      require: true,
      default: () => true,
      type: Boolean
    }
  },
  asyncData(context) {
    // called every time before loading the component
  },
  methods: {
    // 切换登录方式
    switchLogin(value) {
      this.$emit('fn', value);
      this.isLoginType = value;
      this.isShowBtn = true;
      this.user.userPhone = "";
      this.user.userCode = "";
      this.user.userPwd = "";
    },
    // 获取验证码
    getCodeMsg() {
      if (this.isShowCode) return;
      if (this.user.userPhone.length === 0)
        return this.$toast("手机号不能为空");
      if (!/^1[3456789]\d{9}$/.test(this.user.userPhone))
        return this.$toast("请输入正确的手机格式");
      this.isShowCode = true;
      this.$api.sendMsg({ type: 6, phone: this.user.userPhone }).then(res => {
        if (res.status !== 1) {
          // return this.$toast("服务器繁忙，请稍后发送");
        } else {
          this.$toast('短信验证码发送成功');
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
    },
    // 发送登录请求
    loginButton() {
      if (this.isLoginType) {
        // 验证码登录
        if (!this.user.userPhone) return this.$toast("手机号不能为空！！！");
        if (!this.user.userCode) return this.$toast("验证码不能为空！！！");
        // 具体业务逻辑
        this.$api
          .codeLogin({
            username: this.user.userPhone,
            code: this.user.userCode,
            type: "h5"
          })
          .then(res => {
            if (res.status !== 1) {
              // return this.$toast("登录失败");
            } else {
              this.$cookies.set("token", res.data.token, {
                expires: this.$store.state.auth.cookieMaxExpires,
                path: "/"
              });
              this.$cookies.set("phone", res.data.phone, {
                expires: this.$store.state.auth.cookieMaxExpires,
                path: "/"
              });
              this.$toast("登录成功");
              let customer = sessionStorage.getItem("customer");
              if (!customer) {
                this.$router.push("/user");
              } else {
                let key = sessionStorage.getItem("key");
                this.$api.CreateOrder(this.key)
                  .then(res => {
                    if (res.status == 1) {
                      this.$toast.success("订单创建成功");
                      this.$router.push("/order-success/" + res.data.key);
                      sessionStorage.clear("key");
                      sessionStorage.clear("customer");
                    }
                    this.$toast.clear();
                  })
                  .catch(err => {
                    this.$toast.clear();
                  });
              }
            }
          });
      } else {
        // 密码登录
        if (!this.user.userPhone) return this.$toast("账号不能为空！！！");
        if (!this.user.userPwd) return this.$toast("密码不能为空！！！");
        this.$api
          .pwdLogin({
            username: this.user.userPhone,
            password: this.user.userPwd
          })
          .then(res => {
            if (res.status !== 1) {
              // return this.$toast('账号或密码不正确');
            } else {
              this.$cookies.set("token", res.data.token, {
                expires: this.$store.state.auth.cookieMaxExpires,
                path: "/"
              });
              this.$cookies.set("phone", res.data.phone, {
                expires: this.$store.state.auth.cookieMaxExpires,
                path: "/"
              });
              this.$toast("登录成功");
              let customer = sessionStorage.getItem("customer");
              if (!customer) {
                this.$router.push("/user");
              } else {
                let key = sessionStorage.getItem("key");
                this.$api.CreateOrder(key)
                  .then(res => {
                    console.log(res);
                    
                    if (res.status == 1) {
                      this.$toast.success("订单创建成功");
                      this.$router.push("/order-success/" + res.data.key);
                      sessionStorage.clear("key");
                      sessionStorage.clear("customer");
                    }
                    this.$toast.clear();
                  })
                  .catch(err => {
                    this.$toast.clear();
                  });
              }
            }
          });
      }
    },
    // 监听输入框变化
    change(value) {
      if (value === "code") {
        if (!this.user.userPhone) return this.$toast("账号不能为空！！！");
        if (!this.isShowCode) return this.$toast("获取验证码！！！");
        if (!this.user.userCode) {
          this.isShowBtn = true;
        } else {
          this.isShowBtn = false;
        }
      } else if (value === "pwd") {
        if (!this.user.userPhone) return this.$toast("账号不能为空！！！");
        if (!/^1[3456789]\d{9}$/.test(this.user.userPhone))
          return this.$toast("请输入正确的手机格式");
        if (!this.user.userPwd) {
          this.isShowBtn = true;
        } else {
          this.isShowBtn = false;
        }
      } else if (value === "phone") {
        if (!this.user.userPhone) this.isShowBtn = true;
      }
    },
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
