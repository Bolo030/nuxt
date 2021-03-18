<template>
  <div id="login">
    <header style="display: block;" id="loginHeader">
      <div class="closeBtn d-f">
        <img
          src="~assets/imgs/icon_close.png"
          alt="九九牛网店交易平台，关闭按钮图标"
          class="closeImg"
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
      <!-- 手机号登录 -->
      <div class="login-box" style="display: none;" id="phoneLoginbox">
        <div class="login-top-title d-f d-f-between">
          <h3 class=" active">
            登录/注册
            <!-- <i></i> -->
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
            <input type="tel" placeholder="请输入你的手机号" maxlength="11" />
            <img
              v-show="false"
              src="~assets/imgs/icon_cancel.png"
              alt="九九牛网店交易平台，取消图标"
              class="img-cancel"
            />
          </li>
          <!-- <li>
            <img
              src="~assets/imgs/msg-code-icon.png"
              alt="九九牛网店交易平台，登录图标"
              class="login-icon"
            />
            <input type="number" placeholder="请输入你验证码" maxlength="6" />
            <span class="getCode d-block font-size-22 font-main-color active"
              >获取验证码</span
            >
            <img
              v-show="false"
              src="~assets/imgs/icon_cancel.png"
              alt="九九牛网店交易平台，取消图标"
              class="img-cancel"
              id="markImg"
            />
          </li> -->
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
            />
            <img
              src="~assets/imgs/icon_cancel.png"
              alt="九九牛网店交易平台，取消图标"
              class="img-cancel"
            />
          </li>
          <li class="loginBtn font-main-color6 ">
            <button class="font-size-32 active" >登录</button>
          </li>
          <!-- <li class="font-size-24">
            <span id="loginPwd">密码登录</span>
          </li> -->
          <li class="font-size-24 d-f d-f-between">
            <span id="loginPhone">手机验证码登录</span>
            <span class="font-main-color" id="forgetPwd">忘记密码？</span>
          </li>
        </ul>
      </div>
      <!-- 密码登录 -->
      <div class="login-box" style="display: none;" id="pwdLoginbox">
        <div class="login-top-title d-f d-f-between">
          <h3 class="font-weight font-size-36">
            密码登录
            <i></i>
          </h3>
          <h3 class="font-size-30 font-main-color2">游客下单</h3>
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
              src="~assets/imgs/ic_sign_in_password.png"
              alt="九九牛网店交易平台，登录图标"
              class="login-icon"
            />
            <input
              type="password"
              placeholder="请输入8~16位数字或字母密码"
              maxlength="16"
              minlength="8"
            />
            <img
              src="~assets/imgs/icon_cancel.png"
              alt="九九牛网店交易平台，取消图标"
              class="img-cancel"
            />
          </li>
          <li class="loginBtn font-main-color6">
            <button class="font-size-32 ">登录</button>
          </li>
          <li class="font-size-24 d-f d-f-between">
            <span id="loginPhone">手机验证码登录</span>
            <span class="font-main-color" id="forgetPwd">忘记密码？</span>
          </li>
        </ul>
      </div>
      <!-- 修改密码和注册账号公用头部区域 -->

      <!-- 修改密码 -->
      <div class="login-box" style="display: none;" id="forgetPwdbox">
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
            />
            <img
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
            />
            <img
              src="~assets/imgs/icon_cancel.png"
              alt="九九牛网店交易平台，取消图标"
              class="img-cancel"
            />
          </li>
          <li class="loginBtn font-main-color6">
            <button class="font-size-32 ">确认修改并登录</button>
          </li>
        </ul>
      </div>
      <!-- 账号注册 -->
      <div class="login-box" style="display: none;">
        <div class="login-top-title d-f d-f-between">
          <h3 class="font-weight font-size-36">
            账号注册
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
            />
            <img
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
            />
            <img
              src="~assets/imgs/icon_cancel.png"
              alt="九九牛网店交易平台，取消图标"
              class="img-cancel"
            />
          </li>
          <li class="loginBtn font-main-color6">
            <button class="font-size-32 ">确认注册并登录</button>
          </li>
        </ul>
      </div>

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
