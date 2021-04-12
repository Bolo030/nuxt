<template>
  <div id="setting-center">
    <header id="header">
      <div class="header-content">
        <a href="javascript:history.go(-1)" title="返回箭头"
          ><img
            class="back"
            src="~assets/imgs/store/rectangle.png"
            alt="九九牛返回"
        /></a>
        <span class="title">设置中心</span>
      </div>
    </header>
    <main>
      <div class="setting-box">
        <ul class="setting-list bg-main-color">
          <li class="list-item d-f d-f-between font-size-30" @click="$router.push('/user/auth')">
            <span>实名验证</span>
            <div class="right">
              <i class="iconfont iconjinru1"></i>
            </div>
          </li>
          <li class="list-item d-f d-f-between font-size-30" @click="$router.push('/user/editPhone')">
            <span>修改手机号码</span>
            <div class="right">
              <span class="font-size-26 font-main-color2">{{$cookies.get('phone')}}</span>
              <i class="iconfont iconjinru1"></i>
            </div>
          </li>
          <li class="list-item d-f d-f-between font-size-30" @click="$router.push('/forget')">
            <span>修改密码</span>
            <div class="right">
              <i class="iconfont iconjinru1"></i>
            </div>
          </li>
          <li class="list-item d-f d-f-between font-size-30" @click="$router.push('/user/suggest')">
            <span>投诉建议</span>
            <div class="right">
              <i class="iconfont iconjinru1"></i>
            </div>
          </li>
          <li class="list-item d-f d-f-between font-size-30" @click="$router.push('/user/aboutUs')">
            <span>关于我们</span>
            <div class="right">
              <i class="iconfont iconjinru1"></i>
            </div>
          </li>
        </ul>
        <ul class="setting-list bg-main-color">
          <li class="list-item d-f d-f-between font-size-30" @click="exitLogin">
            <span class="font-main-color">退出登录</span>
            <div class="right"></div>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        exitLogin(){
            this.$cookies.remove('token');
            this.$toast('退出成功')
            this.$router.push('/')
        }
    }
};
</script>

<style lang="scss" scoped>
#setting-center {
  padding-top: 20px;
  .setting-box {
    padding: 0 24px;
    .setting-list {
      padding: 0 30px;
      border-radius: 16px;
      margin-bottom: 20px;
      .list-item {
        height: 120px;
        border-bottom: 1px solid #ededed;
        &:last-child {
          border-bottom: none;
        }
        .right {
          i {
            font-size: 28px;
          }
        }
      }
    }
  }
}
</style>
