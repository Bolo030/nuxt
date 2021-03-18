<template>
  <!-- 修改密码 -->
  <div id="login-main">
    <div class="pwd-login-title" style="display: block;" id="pwdLoginHeader" @click="goBack">
        <div class="closeBtn d-f">
            <img src="~assets/imgs/icon_back1.png" alt="九九牛网店交易平台，关闭按钮图标" class="closeImg" id="closePage">
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
  </div>
</template>

<script>
export default {
  methods:{
    goBack(){
      history.back();
    }
  }
};
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

#login-main .pwd-login-title .closeBtn {
  height: 88px;
}

#login-main .pwd-login-title .closeBtn .closeImg {
  width: 41px;
  height: 30px;
  margin-left: 0px;
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

</style>>
