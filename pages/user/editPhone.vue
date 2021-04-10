<template>
<div class="container">
 <van-nav-bar title="修改手机号" left-arrow @click-left="$router.go(-1)" />
   <main class="modifyPhoneNumber-box">
        <p class="modifyWarmInfo font-size-24">
            <span class="font-main-color">*</span>
            更换现有手机号请确保您的新手机号与原手机号实名信息一致,否
            则将更改失败,更改成功后将采用新手机号进行登录；
        </p>
        <form>
            <ul class="modifyInfo-box">
                <li class="modifyInfo-item1 bg-main-color">
                    <h6 class="font-size-24">
                        已绑定手机号
                        <span>18282678181</span>
                    </h6>
                    <div class="get-code position-r">
                        <img src="/imgs/msg-code-icon.png" alt="信息图标">
                        <input type="number" placeholder="验证码" >
                        <span class="font-size-24">重新获取60</span>
                    </div>
                </li>
                <li  class="modifyInfo-item2 bg-main-color">
                    <div class="modifyNewPhone position-r">
                        <img src="/imgs/phone_icon.png" alt="手机图标">
                        <input type="tel" placeholder="请输入您要修改的新手机号码">
                    </div>
                    <div class="modifyNewPhone position-r">
                        <img src="/imgs/msg-code-icon.png" alt="手机图标">
                        <input type="number" placeholder="验证码">
                        <span class="font-size-24">获取验证码</span>
                    </div>
                    <button class="font-size-30 font-weight font-main-color6">确认更换</button>
                </li>
            </ul>
        </form>

        <!-- 弹框确认更换手机号 -->
        <div class="mask2">
            <ul class="mask2-in">
                <li class="mask2-item1">是否确认更换新手机</li>
                <li class="mask2-item2">
                    <button class="cancel-btn2">取消</button>
                    <div class="line"></div>
                    <button class="font-main-color">确定</button>
                </li>
            </ul>
        </div>

        <!-- 验证失败弹框 -->
        <div class="mask2">
            <ul class="mask2-in">
                <li class="mask2-item1">实名信息不一致，修改失败</li>
                <li class="mask2-item2">
                    <button class="font-main-color font-main-color">确定</button>
                </li>
            </ul>
        </div>
    </main>
</div>
</template>

<script>
export default {
async asyncData(){
  return{}
},
data(){
  return{

  }
},
methods:{

}
}
</script>

<style lang="scss" scoped>
.modifyPhoneNumber-box {
  padding: 0 3.2vw;
}

.modifyWarmInfo {
  line-height: 5.3333vw;
  margin: 4vw 0;
}

.modifyInfo-box .modifyInfo-item1 {
  padding: 6.6667vw 4vw;
  border-radius: 2.1333vw;
}

.modifyInfo-box .modifyInfo-item1 .get-code img {
  position: absolute;
  top: 8.9333vw;
  left: 4.5333vw;
  width: 4.8vw;
  height: 4.8vw;
}

.modifyInfo-box .modifyInfo-item1 .get-code input {
  height: 14.6667vw;
  width: 100%;
  border-radius: 2.1333vw;
  margin-top: 4vw;
  padding-left: 11.7333vw;
  box-sizing: border-box;
  background: #f4f4f4;
}

.modifyInfo-box .modifyInfo-item1 .get-code span {
  position: absolute;
  right: 4.5333vw;
  top: 6.9333vw;
  padding: 2vw;
  border-radius: 3.3333vw;
  border: 0.1333vw solid #f5b69e;
  color: #f5b69e;
}

.modifyInfo-box .modifyInfo-item2 {
  margin-top: 2.6667vw;
  padding: 6.6667vw 4vw;
  border-radius: 2.1333vw;
}

.modifyInfo-box .modifyInfo-item2 .modifyNewPhone {
  margin-bottom: 2.6667vw;
}

.modifyInfo-box .modifyInfo-item2 .modifyNewPhone img {
  position: absolute;
  left: 4.5333vw;
  top: 50%;
  transform: translateY(-50%);
  width: 4.8vw;
}

.modifyInfo-box .modifyInfo-item2 .modifyNewPhone input {
  height: 14.6667vw;
  width: 100%;
  border-radius: 2.1333vw;
  padding-left: 11.7333vw;
  box-sizing: border-box;
  background: #f4f4f4;
}

.modifyInfo-box .modifyInfo-item2 .modifyNewPhone span {
  position: absolute;
  right: 4.5333vw;
  top: 50%;
  transform: translateY(-50%);
  padding: 2vw;
  border-radius: 3.3333vw;
  border: 0.1333vw solid #f4632c;
  color: #f4632c;
}

.modifyInfo-box .modifyInfo-item2 button {
  width: 100%;
  height: 13.3333vw;
  margin-top: 4vw;
  border-radius: 2.1333vw;
  background: #f4632c;
}

</style>
