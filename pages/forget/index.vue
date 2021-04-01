<template>
  <!-- 修改密码 -->
  <div id="login-main">
    <div class="pwd-login-title" id="pwdLoginHeader" @click="goBack">
      <div class="closeBtn d-f">
        <img
          src="~assets/imgs/icon_back1.png"
          alt="九九牛网店交易平台，关闭按钮图标"
          class="closeImg"
          id="closePage"
        />
      </div>
    </div>
    <div class="login-box" style="display: block;" id="forgetPwdbox">
      <div class="login-top-title d-f d-f-between">
        <h3 class="font-weight font-size-36">
          修改密码
          <i></i>
        </h3>
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
        <li>
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
            @focus="event('code')"
          />
          <span
            class="getCode d-block font-size-22 font-main-color"
            :class="{ active: isShowActive }"
            @click="getCode"
            >{{ isShowActive ? "重新获取" + countdown : "获取验证码" }}</span
          >
          <img
            v-show="false"
            src="~assets/imgs/icon_cancel.png"
            alt="九九牛网店交易平台，取消图标"
            class="img-cancel"
            id="markImg"
          />
        </li>
        <li>
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
            v-model="user.password"
            @focus="event('pwd')"
          />
          <img
            v-show="false"
            src="~assets/imgs/icon_cancel.png"
            alt="九九牛网店交易平台，取消图标"
            class="img-cancel"
          />
        </li>
        <li>
          <img
            src="~assets/imgs/ic_sign_in_password.png"
            alt="九九牛网店交易平台，登录图标"
            class="login-icon"
          />
          <input
            type="password"
            placeholder="请再次输入设置的新密码"
            maxlength="16"
            minlength="8"
            v-model="user.password_confirmed"
            @blur="changeValue"
            @focus="event('pwd_confirm')"
          />
          <img
            v-show="false"
            src="~assets/imgs/icon_cancel.png"
            alt="九九牛网店交易平台，取消图标"
            class="img-cancel"
          />
        </li>
        <li class="loginBtn font-main-color6">
          <button
            class="font-size-32"
            @click="modifyPwd"
            :class="{ active: isBtnActive }"
          >
            确认修改并登录
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "forget",
  data() {
    return {
      isShowActive: false,
      isBtnActive: false,
      countdown: 60,
      user: {
        userPhone: "",
        userCode: "",
        password: "",
        password_confirmed: ""
      }
    };
  },
  methods: {
    goBack() {
      history.back();
    },
    // 获取验证码
    getCode() {
      if (this.isShowActive) return;
      if (this.user.userPhone.length !== 0) {
        if (!/^1[3456789]\d{9}$/.test(this.user.userPhone)) {
          return this.$toast("请输入正确的手机格式");
        } else {
          this.isShowActive = true;
          this.$api
            .sendMsg({ type: 3, phone: this.user.userPhone })
            .then(res => {
              if (res.status !== 1) {
                return this.$toast("服务器繁忙，请稍后发送");
              } else {
                this.$toast(res.message);
              }
            });
          let timer = setInterval(() => {
            if (this.countdown === 0) {
              this.countdown = 60;
              this.isShowActive = false;
              clearInterval(timer);
            } else {
              this.countdown--;
            }
          }, 1000);
        }
      } else {
        return this.$toast("手机号不能为空");
      }
    },
    // 修改密码
    modifyPwd() {
      if (
        !this.user.userPhone &&
        !this.user.userCode &&
        !this.user.password &&
        !this.user.password_confirmed
      ) {
        this.$toast("表单信息不能有空");
      } else {
        this.$api
          .restPwd({
            username: this.user.userPhone,
            password: this.user.password,
            password_confirmed: this.user.password_confirmed,
            code: this.user.userCode,
            type: "h5"
          })
          .then(res => {
            if (res.status !== 1) {
              return this.$toast(res.message);
            } else {
              this.$cookies.set("token", res.data.token,{expires:this.$store.state.auth.cookieMaxExpires});
              this.$toast(res.message);
              this.$router.push("/user");
            }
          });
      }
    },
    // 监听两密码是否一致
    changeValue() {
      if (this.user.userPhone.length !== 0 && this.user.userCode.length !== 0) {
        if (this.user.password !== this.user.password_confirmed) {
          return this.$toast("两次输入的密码不一致");
        }
      } else {
        return this.$toast("请输入账号和验证码");
      }
    },
    // 校验输入框数据
    event(value) {
      if (value === "code" && !this.user.userPhone) {
        return this.$toast("手机号不能为空");
      } else if (value === "pwd" && !this.user.userCode) {
        return this.$toast("验证码不能为空");
      } else if (value === "pwd_confirm" && !this.user.password) {
        return this.$toast("修改密码不能为空");
      } else if (value === "pwd_confirm" && this.user.password) {
        this.isBtnActive = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#login-main {
  padding: 0 42px;
  background: #fff;
  height: 100%;
  .pwd-login-title {
    .closeBtn {
      height: 88px;
      .closeImg {
        width: 41px;
        height: 30px;
        margin-left: 0px;
      }
    }
  }
  .login-box {
    .login-top-title {
      margin-top: 10px;
      height: 134px;
      h3 {
        position: relative;
        i {
          display: block;
          position: absolute;
          left: 0;
          bottom: -15px;
          width: 40px;
          height: 6px;
          border-radius: 3px;
          background: #f4632c;
        }
      }
    }
    .login-middle {
      li {
        position: relative;
        margin-bottom: 46px;
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
          &.active {
            border: 1px solid #f5b69f;
            color: #f5b69f;
          }
        }
      }
      .loginBtn {
        margin-top: 6px;
        text-align: center;
        button {
          height: 94px;
          width: 100%;
          background: #f5b69f;
          border-radius: 8px;
          &.active {
            background: #f4632c;
          }
        }
      }
    }
  }
}
</style>
