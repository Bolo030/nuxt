<template>
<div class="container">
<van-nav-bar title="关于我们" left-arrow @click-left="$router.go(-1)" />
  <main class="aboutUs-box">
        <div class="aboutUs-top position-r bg-main-color">
            <div class="top-box position-a2">
                <img src="../../assets/imgs/icon-aboutUs.png" alt="九九牛网店交易平台图标">
                <p class="font-size-28 font-weight">九九牛网店交易</p>
                <span>版本 V2.0.0</span>
            </div>

        </div>

        <ul class="aboutUs-middle bg-main-color font-size-28">
            <nuxt-link to="/about">
              <li class="middle-item d-f d-f-between">
                <span class="">公司简介</span>
                <i class="iconfont iconjinru1 font-main-color2"></i>
              </li>
            </nuxt-link>
            <a href="https://www.996110.com/html/privacy.html">
              <li class="middle-item d-f d-f-between">
                <span class="">隐私条款</span>
                <i class="iconfont iconjinru1 font-main-color2"></i>
              </li>
            </a>
            <a href="https://www.996110.com/html/agreement.html">
              <li class="middle-item d-f d-f-between">
                <span class="">用户协议</span>
                <i class="iconfont iconjinru1 font-main-color2"></i>
              </li>
            </a>
            <a href="https://image.996110.com/images-202104-8218f9d58b6cc0bcf718cd10427db778-98323.png!quality">
              <li class="middle-item d-f d-f-between">
                <span class="">企业资质</span>
                <i class="iconfont iconjinru1 font-main-color2"></i>
              </li>
            </a>
            <li class="middle-item d-f d-f-between" v-if="false">
                <span class="">特别申明</span>
                <i class="iconfont iconjinru1 font-main-color2"></i>
            </li>
        </ul>
    </main>
    <footer class="footer position-a1  ">
        <p class="font-main-color2 font-size-24">Copyright © 2018 - {{newYears}} 九九牛网络科技 版权所有</p>
    </footer>
</div>
</template>

<script>
export default {
  data(){
    return {
      years: 2020
    }
  },
  computed:{
    newYears() {
      let date=new Date;
      let y = date.getFullYear();
      console.log(y);
      return y
      
    }
  }
}
</script>

<style lang='scss' scoped>
@import url("../../assets/css/iconfont.css");
.aboutUs-top {
  height: 53.3333vw;
  text-align: center;
}

.aboutUs-top .top-box img {
  width: 17.3333vw;
  height: 17.3333vw;
}

.aboutUs-top .top-box p {
  line-height: 8.6667vw;
}

.aboutUs-middle {
  padding: 0 3.2vw;
  margin-top: 2.6667vw;
}

.aboutUs-middle .middle-item {
  height: 16vw;
  border-bottom: 0.1333vw solid #ededed;
}

.aboutUs-middle .middle-item:last-child {
  border-bottom: none;
}

.aboutUs-middle .middle-item i {
  font-size: 4.2667vw;
}

.footer {
  text-align: center;
  bottom: 5.3333vw;
  width: 100%;
}

</style>
