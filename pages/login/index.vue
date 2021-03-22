<template>
  <div id="login">
    <header style="display: block;" id="loginHeader">
      <div class="closeBtn d-f">
        <img
          src="~assets/imgs/icon_close.png"
          alt="九九牛网店交易平台，关闭按钮图标"
          class="closeImg"
          @click="goBack"
        />
      </div>
      <div class="bgImg d-f-column d-f-center">
        <img
          src="~assets/imgs/login_banner.png"
          alt="九九牛网店交易平台，背景图片"
        />
        <p class="font-size-24">九九牛.专业的网店交易平台</p>
      </div>
    </header>
    <div class="pwd-login-title" style="display: none;" id="pwdLoginHeader">
      <div class="closeBtn d-f">
        <img
          src="~assets/imgs/icon_back1.png"
          alt="九九牛网店交易平台，关闭按钮图标"
          class="closeImg"
          id="closePage"
        />
      </div>
    </div>
    <main id="login-main">
      <!-- 登录注册区域 -->
      <Login></Login>
      <!-- 游客下单 -->
      <div class="login-box" style="display: none;" id="customerLoginbox">
        <div class="login-top-title d-f d-f-between">
          <h3
            class="font-size-30 font-weight font-main-color2"
            id="customerLogin"
          >
            登录/注册
          </h3>
          <h3 class="font-weight font-size-36 ">
            游客下单
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
            <input type="tel" placeholder="请输入你的手机号" maxlength="11" />
            <img
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
            <input type="number" placeholder="请输入你验证码" maxlength="6" />
            <span class="getCode d-block font-size-22 font-main-color"
              >获取验证码</span
            >
            <img
              src="~assets/imgs/icon_cancel.png"
              alt="九九牛网店交易平台，取消图标"
              class="img-cancel"
              id="markImg"
            />
          </li>
          <li class="loginBtn font-main-color6">
            <button class="font-size-32 ">0元下单</button>
          </li>
          <li class="font-size-24">
            <span class="font-main-color">*</span>
            以游客身份下单请留下正确的联系方式，下单成功后平台客服
            将尽快与您取得联系，请留意您的通信设备。
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import Login from '~/components/login/login'
export default {
  components:{
    Login
  },
  methods:{
   goBack() {
      history.back();
    },
  }
}
</script>


<style lang="scss" scoped>
header .closeBtn {
  height: 88px;
}

header .closeBtn .closeImg {
  width: 30px;
  height: 30px;
  margin-left: 23px;
}

header .bgImg {
  height: 358px;
}

header .bgImg img {
  width: 498px;
  height: 286px;
}

.pwd-login-title .closeBtn {
  height: 88px;
}

.pwd-login-title .closeBtn .closeImg {
  width: 30px;
  height: 30px;
  margin-left: 23px;
}

#login-main {
  padding: 0 42px;
}

#login-main .login-box .login-top-title {
  margin-top: 10px;
  height: 134px;
}

#login-main .login-box .login-top-title h3 {
  position: relative;
}

#login-main .login-box .login-top-title h3 i {
  display: block;
  position: absolute;
  left: 0;
  bottom: -15px;
  width: 40px;
  height: 6px;
  border-radius: 3px;
  background: #f4632c;
}

#login-main .login-box .login-middle li {
  position: relative;
  margin-bottom: 46px;
}

#login-main .login-box .login-middle li .login-icon {
  position: absolute;
  top: 50%;
  left: 32px;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
}

#login-main .login-box .login-middle li input {
  width: 100%;
  height: 94px;
  padding-left: 92px;
  box-sizing: border-box;
  background: #f7f7f7;
  border-radius: 12px;
}

#login-main .login-box .login-middle li .img-cancel {
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
}

#login-main .login-box .login-middle li #markImg {
  right: 360px;
}

#login-main .login-box .login-middle li .getCode {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 30px;
  padding: 13px;
  border: 1px solid #f4632c;
  border-radius: 25px;
}

#login-main .login-box .login-middle .loginBtn {
  margin-top: 6px;
  text-align: center;
}

#login-main .login-box .login-middle .loginBtn button {
  height: 94px;
  width: 100%;
  background: #f4632c;
  border-radius: 8px;
}

.login-box {
  .login-top-title {
    h3 {
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
      height: 94px;
      .getCode {
        &.active {
          color: #f5b69f;
          border: 1px solid #f5b69f !important;
        }
      }
    }
    .loginBtn {
      button {
        &.active {
          background: #f5b69f !important;
        }
      }
    }
  }
}
</style>
