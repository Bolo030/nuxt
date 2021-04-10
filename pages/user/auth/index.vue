<template>
<div class="container">
<van-nav-bar title="实名认证" left-arrow @click-left="$router.go(-1)" />
  <main class="realName-box">
        <ul class="realName-top bg-main-color">
            <li class="realName-top-item d-f-flex d-f-between">
                <div class="realName-top-left d-f">
                    <img src="../../../assets/imgs/icon-user.png" alt="账号认证图标">
                </div>
                <div class="realName-top-right d-f d-f-between realName-line">
                    <div class="left-info">
                        <h4 class="font-size-28 font-weight">账号认证</h4>
                        <p class="font-size-24 font-main-color2">完成账号实名认证，提高账户安全度</p>
                    </div>
                    <!-- <div class="right-info font-size-24 bg-main-color6 font-main-color9">已实名</div> -->
                    <div class="right-info font-size-24 bg-gradient-color2 font-main-color6" id="realName" @click="goto(false)">去实名</div>
                </div>
            </li>
            <li class="realName-top-item d-f-flex d-f-between">
                <div class="realName-top-left d-f">
                    <img src="../../../assets/imgs/icon-account.png" alt="多身份认证图标">
                </div>
                <div class="realName-top-right d-f d-f-between">
                    <div class="left-info">
                        <h4 class="font-size-28 font-weight">多身份认证</h4>
                        <p class="font-size-24 font-main-color2">创建多身份，安全高效签署合同</p>
                    </div>
                    <div class="right-info font-size-24 bg-gradient-color2 font-main-color6" @click="goto(true)">创建身份</div>
                </div>
            </li>
        </ul>
        <ul class="realName-middle bg-main-color">
            <li class="realName-middle-item bg-gradient-color2 d-f position-r"  v-for="(item,index) in list" :key="index">
                <div class="position-right position-a1 font-main-color6 font-size-20 d-f" v-if="item.isBind==2">
                    <img src="../../../assets/imgs/icon-realName1.png" alt="">
                    <sapn>已绑定为账号实名</sapn>
                </div>
                <div class="middle-item-left">
                    <img src="../../../assets/imgs/photo-img.png" alt="" style="width: 10.6667vw; height: 10.6667vw; border-radius: 50%;">
                </div>
                <div class="middle-item-right font-main-color6">
                    <h4 class="font-size-30 font-weight">{{item.show_user_name}}</h4>
                    <span class="font-size-28">{{item.show_identity}}</span>
                </div>
            </li>
         <!--    <li class="realName-middle-item bg-main-color7 d-f position-r">
                <div class="middle-item-left">
                    <img src="../../../assets/imgs/photo-img.png" alt="">
                </div>
                <div class="middle-item-right font-main-color6">
                    <h4 class="font-size-30 font-weight font-main-color4">**强</h4>
                    <span class="font-size-28 font-main-color2">5***************2</span>
                </div>
            </li> -->
        </ul>

        <!-- 遮罩层 -->
        <div class="realName-mask" v-if="isShow">
            <ul class="realName-mask-item ">
                <li class="mask-item-in bg-main-color " @click="$router.push('/user/auth/phone?type='+type)">
                    <div class="line-box d-f">
                        <img src="../../../assets/imgs/bank-phone.png" alt="手机图标">
                        <div class="right-info d-f d-f-between">
                            <div>
                                <h5 class="font-size-30">手机号码  验证实名</h5>
                                <p class="font-size-24 font-main-color2">请保证手机号与实名认证人信息一致</p>
                            </div>
                            <img src="../../../assets/imgs/icon-entry2.png" alt="">
                        </div>
                    </div>
                </li>
                <li class="mask-item-in bg-main-color d-f " @click="$router.push('/user/auth/bank?type='+type)">
                    <img src="../../../assets/imgs/bank-icon.png" alt="银行卡图标">
                    <div class="right-info d-f d-f-between">
                        <div>
                            <h5 class="font-size-30">银行卡号 验证实名</h5>
                            <p class="font-size-24 font-main-color2">请保证银行卡号和实名认证人信息一致</p>
                        </div>
                        <img src="../../../assets/imgs/icon-entry2.png" alt="">
                    </div>
                </li>
                <button class="mask-item-button bg-main-color font-size-30" id="realNameCancel" @click="isShow=false">取消</button>
            </ul>
        </div>
    </main>
</div>
</template>

<script>
export default {
async asyncData({app}){
  let list=await app.$api.getRealList().then(res=>res.status==1?res.data.list:[]);
  console.log(list,'list')
  return{
  list
  }
},
data(){
  return{
    type:false,
    isShow:false
  }

},
methods:{
  goto(type){
    this.type=type;
    this.isShow=true;
  }
}
}
</script>

<style lang="scss" scoped>
.realName-top {
  padding-left: 3.2vw;
}

.realName-top .realName-top-item {
  height: 21.3333vw;
}

.realName-top .realName-top-item .realName-top-left {
  height: 100%;
  margin-right: 2.6667vw;
}

.realName-top .realName-top-item .realName-top-left img {
  width: 10.6667vw;
  height: 10.6667vw;
  border-radius: 50%;
}

.realName-top .realName-top-item .realName-top-right {
  flex: 1;
  padding-right: 3.2vw;
  height: 100%;
}

.realName-top .realName-top-item .realName-top-right .left-info p {
  margin-top: 1.6vw;
}

.realName-top .realName-top-item .realName-top-right .right-info {
  width: 18.6667vw;
  height: 7.2vw;
  line-height: 7.2vw;
  text-align: center;
  border-radius: 3.6vw;
}

.realName-top .realName-top-item .realName-line {
  border-bottom: 0.1333vw solid #ededed;
}

.realName-middle {
  padding: 6.6667vw 3.2vw;
  margin-top: 4vw;
  .active{

  }
}

.realName-middle .realName-middle-item {
  padding-left: 3.2vw;
  height: 26.6667vw;
  border-radius: 2.1333vw;
  margin-bottom: 2.6667vw;
}

.realName-middle .realName-middle-item .middle-item-left {
  margin-right: 2.6667vw;
}

.realName-middle .realName-middle-item .middle-item-left img {
  width: 10.6667vw;
  height: 10.6667vw;
  border-radius: 50%;
}

.realName-middle .realName-middle-item .middle-item-right h4 {
  margin-bottom: 1.3333vw;
}

.realName-middle .realName-middle-item .position-right {
  top: 0;
  right: 0;
  padding: 0vw 2.6667vw;
  height: 6.4vw;
  border-radius: 0 2.1333vw 0 3.0667vw;
  background-image: linear-gradient(-90deg, #ec0000 0%, #ff4800 100%);
}

.realName-middle .realName-middle-item .position-right img {
  width: 2.6667vw;
  height: 2.6667vw;
  margin-right: 1.3333vw;
}

.realName-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 6666666;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.realName-mask .realName-mask-item {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 3.2vw;
  box-sizing: border-box;
}

.realName-mask .realName-mask-item .mask-item-in {
  height: 22.6667vw;
  padding: 0 4vw;
  box-sizing: border-box;
}

.realName-mask .realName-mask-item .mask-item-in .line-box {
  border-bottom: 0.1333vw solid #ededed;
  height: 100%;
  box-sizing: border-box;
}

.realName-mask .realName-mask-item .mask-item-in img {
  width: 10.6667vw;
  height: 10.6667vw;
  margin-right: 2.6667vw;
}

.realName-mask .realName-mask-item .mask-item-in .right-info {
  flex: 1;
}

.realName-mask .realName-mask-item .mask-item-in .right-info p {
  margin-top: 1.3333vw;
}

.realName-mask .realName-mask-item .mask-item-in .right-info img {
  width: 2.1333vw;
  height: 2.1333vw;
}

.realName-mask .realName-mask-item .mask-item-in:nth-child(1) {
  border-radius: 2.1333vw 2.1333vw 0 0;
}

.realName-mask .realName-mask-item .mask-item-in:nth-child(2) {
  border-radius: 0vw 0vw 2.1333vw 2.1333vw;
  margin-bottom: 2.6667vw;
}

.realName-mask .realName-mask-item .mask-item-button {
  width: 100%;
  height: 14.6667vw;
  border-radius: 2.1333vw;
  margin-bottom: 4vw;
}

</style>
