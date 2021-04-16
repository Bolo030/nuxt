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
      <login></login>
    </main>
    <div class="login-bottom">
	  	   新用户登录即代表注册，并同意九九牛<span @click="goto(0)">《用户协议》</span><span @click="goto(1)">《隐私政策》</span>
	  </div>
  </div>
</template>

<script>
export default {
  methods:{
   goBack() {
     this.$router.push('/')
    },
    // 用户隐私协议
    goto(type){
		  if(type=='0'){
        sessionStorage.setItem('path','https://www.996110.com/html/agreement.html');
        sessionStorage.setItem('pathNmae','用户协议')
		  	// window.location.href ='https://www.996110.com/html/agreement.html'
		  }else{
        sessionStorage.setItem('path','https://www.996110.com/html/privacy.html')
        sessionStorage.setItem('pathNmae','隐私政策')
		  	// window.location.href ='https://www.996110.com/html/privacy.html'
      }
      this.$router.push('/user/userAgreement')
	  }
  }
}
</script>


<style lang="scss" scoped>
#login{
  position: relative;
  height: 100%;
  background: #fff;
}
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
.login-bottom {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    width: 100%;
    bottom: 40px;
    span {
      color: #f4632c;
    }
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
