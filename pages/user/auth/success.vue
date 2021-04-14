<template>
<div class="container">
  <van-nav-bar title="实名认证成功" left-arrow @click-left="$router.go(-1)" />
    <main class="realNameSuccess-box">

        <!-- 账号实名认证1-->
        <div class="realNameSuccess-in bg-main-color" style="display: none;" v-if="type=='true'">
            <img src="../../../assets/imgs/realNameSuccess-icon.png" alt="实名认证通过图标" class="realNmae-img">
            <h4 class=" font-size-30 font-weight">恭喜你！你的账号已通过实名认证</h4>
            <p class="font-size-24">您还可以前往实名中心为自己添加多个实名身份呢!
                以便您在签署合同时选择使用！</p>
            <button class="realName1" @click="$router.go(-2)">返回实名中心</button>
        </div>
        <!-- 实名认证2 -->
        <div class="realNameSuccess-in bg-main-color" v-else>
            <img src="../../../assets/imgs/realNameSuccess-icon.png" alt="实名认证通过图标" class="realNmae-img">
            <h4 class="font-size-30 font-weight">恭喜你！你的账号已通过实名认证</h4>
            <button class="realName1 realName2" @click="$router.go(-2)">返回实名中心</button>
        </div>

        <!-- 弹窗 -->
        <div class="realName-mask" v-if="real.need_confirm">
            <div class="mask-warmInfo ">
                <div class="warmInfo-desc bg-main-color">
                    <p class="font-size-26">检测到您当前认证的
                        <span class="font-main-color">身份信息</span>与
                        <span class="font-main-color">账号手机信息</span>
                        一致，是否同时采用此身份完成账号实名认证；
                    </p>
                    <div class="warmInfo-btn font-size-24 font-main-color6">
                        <button class="realName-btn1" @click="real.need_confirm = false">否</button>
                        <button class="realName-btn2" @click="authentication">是</button>
                    </div>
                </div>
            </div>
        </div>

    </main>
</div>
</template>

<script>
export default {
asyncData({store,query}){
   let real = store.state.auth.real;
  let type=query.type;
  return{
    type,
    real
  }
},
data(){
  return{
    type:false
  }
},
methods:{
    authentication() {
      this.$api.bindReal(this.real.real_id).then(res => {
        if (res.status == 1) {
          this.$toast.success("实名认证完成");
          this.real.need_confirm = false;
        }
      });
    },
}
}
</script>

<style lang="scss" scoped>
.realNameSuccess-box {
  padding: 0 3.2vw;
}

.realNameSuccess-in {
  margin: 4vw 0;
  border-radius: 2.1333vw;
  text-align: center;
  padding-bottom: 11.7333vw;
}

.realNameSuccess-in .realNmae-img {
  width: 41.4667vw;
  height: 22.4vw;
}

.realNameSuccess-in h4 {
  margin: 3.3333vw 0;
}

.realNameSuccess-in p {
  padding: 0 9.3333vw;
  line-height: 6vw;
}

.realNameSuccess-in .realName1 {
  width: 26.6667vw;
  height: 8vw;
  border: 0.1333vw solid #f4632c;
  border-radius: 4vw;
  color: #f4632c;
  margin-top: 7.4667vw;
}

.realNameSuccess-in .realName2 {
  margin-top: 3.0667vw;
}

.realName-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 666666;
  background: rgba(0, 0, 0, 0.5);
}

.realName-mask .mask-warmInfo {
  position: absolute;
  bottom: 4vw;
  width: 100%;
  padding: 0 3.2vw;
  box-sizing: border-box;
}

.realName-mask .mask-warmInfo .warmInfo-desc {
  padding: 4vw;
  border-radius: 2.1333vw;
}

.realName-mask .mask-warmInfo .warmInfo-desc p {
  line-height: 5.8667vw;
}

.realName-mask .mask-warmInfo .warmInfo-desc .warmInfo-btn {
  text-align: right;
  margin-top: 6.6667vw;
}

.realName-mask .mask-warmInfo .warmInfo-desc .warmInfo-btn .realName-btn1,
.realName-mask .mask-warmInfo .warmInfo-desc .warmInfo-btn .realName-btn2 {
  padding: 2.1333vw 5.3333vw;
  border-radius: 3.6vw;
}

.realName-mask .mask-warmInfo .warmInfo-desc .warmInfo-btn .realName-btn1 {
  background: #ffebe4;
  color: #f4632c;
  margin-right: 2.6667vw;
}

.realName-mask .mask-warmInfo .warmInfo-desc .warmInfo-btn .realName-btn2 {
  background: #f4632c;
}

</style>
