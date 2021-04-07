<template>
<div class="container">
 <header>
        <div class="header-top">
            <van-icon class="icon" name="arrow-left" color="#fff" @click="$router.go(-1)" />
            <h3 class="font-size-32 font-main-color6 font-weight">资金管理</h3>
        </div>
        <div class="header-middle">
            <div class="middle-item">
                <span class="font-size-24 font-main-color6">账户余额 (元) </span>
                <img src="../../assets/imgs/hiddle-icon1.png" v-if="isShow" alt="显示" @click="isShow=false">
                <img src="../../assets/imgs/hiddle-icon2.png" v-else  alt="隐藏" @click="isShow=true">
            </div>
            <div class="balance font-size-46 font-main-color6 font-weight">{{isShow?'￥'+info.balance:'******'}}</div>
        </div>
        <div class="header-bottom d-f-flex d-f-center font-main-color6 font-size-24">
            <h5>可用余额 ￥{{info.available}}</h5>
            <span>|</span>
            <h5>冻结余额 ￥{{info.frozenBalance}}</h5>
        </div>
    </header>
    <main id="moneyManagement">
        <div class="many-way d-f d-f-between font-size-30">
            <nuxt-link to='/assets/rh' class="way-item bg-main-color d-f d-f-center" id="recharge" >
                <img src="../../assets/imgs/many-way-icon1.png" alt="充值">
                充值
            </nuxt-link>
            <nuxt-link to='/assets/wd' class="way-item bg-main-color d-f d-f-center" id="withdraw-btn">
                <img src="../../assets/imgs/many-way-icon2.png" alt="提现">
                提现
            </nuxt-link>
        </div>

        <!-- 详情查看区域 -->
        <ul class="look-msg">
            <li class="item d-f d-f-between bg-main-color font-size-28">
                <div class="left">
                    <img src="../../assets/imgs/money-info1.png" class="left-icon" alt="流水明细">
                    流水明细
                </div>
                <img class="right-icon" alt="箭头" src="../../assets/imgs/icon-entry2.png" />
            </li>
            <li class="item d-f d-f-between bg-main-color font-size-28">
                <div class="left">
                    <img src="../../assets/imgs/money-info2.png" class="left-icon" alt="流水明细">
                    冻结资金
                </div>
                <img class="right-icon" alt="箭头" src="../../assets/imgs/icon-entry2.png" />
            </li>
            <li class="item d-f d-f-between bg-main-color font-size-28">
                <div class="left">
                    <img src="../../assets/imgs/money-info3.png" class="left-icon" alt="流水明细">
                    资金记录
                </div>
                <img class="right-icon" alt="箭头" src="../../assets/imgs/icon-entry2.png" />
            </li>
        </ul>

        <!-- 充值弹框 -->
     <!--    <div class="mask" id="recharge-mask" v-if="isActionSheet" >
            <ul class="mask-in font-size-30 font-main-color4">
                <li class="mask-in-item bg-main-color">
                    <p>快捷支付</p>
                </li>
                <li class="mask-in-item bg-main-color">
                  <p><nuxt-link to='/assets/rh'>对公账户汇款充值</nuxt-link></p>
                </li>
                <li class="cancel-btn bg-main-color" @click="isActionSheet=false">
                    <button>取消</button>
                </li>
            </ul>
        </div> -->

        <!-- 未认证提现弹框 -->
        <div class="mask2" id="noRecharge-mask">
            <ul class="mask2-in">
                <li class="mask2-item1">请先完成账号认证再申请提现</li>
                <li class="mask2-item2">
                    <button class="cancel-btn2">取消</button>
                    <div class="line"></div>
                    <button class="font-main-color">确定</button>
                </li>
            </ul>
        </div>
    </main>
    <footer class="font-size-24 font-main-color2">
        九九网络科技保留向公安机关进行反洗钱的举报可能性
    </footer>
</div>
</template>

<script>
export default {
  async asyncData ({app}){
    let info=await app.$api.getCapital().then(res=>res.status==1?res.data:{})
    console.log(info)
    return{
        info
    }
  },
  data(){
    return{
      isShow:false,
      // isActionSheet:false
    }
  }
}
</script>

<style lang='scss' scoped>
body {
  position: relative;
}

header {
  padding: 5.3333vw 3.2vw 0vw;
  box-sizing: border-box;
  height: 53.3333vw;
  background: linear-gradient(-90deg, #ff8a22 0%, #ea5310 100%);
  border-radius: 0vw 0vw 3.2vw 3.2vw;
}

header .header-top {
  position: relative;
  text-align: center;
}

header .header-top .icon {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 35px;
}

header .header-middle .middle-item {
  text-align: center;
  margin-top: 6.6667vw;
}

header .header-middle .middle-item img {
  width: 3.7333vw;
  height: 3.7333vw;
  margin-left: 3.0667vw;
}

header .header-middle .balance {
  margin-top: 2.6667vw;
  text-align: center;
}

header .header-bottom {
  padding-top: 5.3333vw;
  box-sizing: border-box;
}

header .header-bottom span {
  margin: 0 5.3333vw;
}

#moneyManagement {
  padding: 0 3.2vw;
  box-sizing: border-box;
}

#moneyManagement .many-way {
  margin-top: -6vw;
}

#moneyManagement .many-way .way-item {
  width: 45.3333vw;
  height: 16vw;
  border-radius: 2.1333vw;
}

#moneyManagement .many-way .way-item img {
  width: 4.8vw;
  height: 4.8vw;
  margin-right: 1.8667vw;
}

#moneyManagement .look-msg .item:first-child {
  margin-top: 4vw;
}

#moneyManagement .look-msg .item {
  margin-top: 2.6667vw;
  padding: 0 4vw;
  box-sizing: border-box;
  height: 14.6667vw;
  border-radius: 2.1333vw;
}

#moneyManagement .look-msg .item .left-icon {
  width: 4vw;
  height: 4vw;
  margin-right: 0.6667vw;
}

#moneyManagement .look-msg .item .right-icon {
  width: 2.1333vw;
  height: 2.1333vw;
}

#moneyManagement .mask {
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 666;
  background: rgba(0, 0, 0, 0.6);
}

#moneyManagement .mask .mask-in {
  position: absolute;
  bottom: 4vw;
  width: 100%;
  box-sizing: border-box;
  padding: 0 3.2vw;
  text-align: center;
}

#moneyManagement .mask .mask-in .mask-in-item {
  padding: 0vw 4vw;
  box-sizing: border-box;
}

#moneyManagement .mask .mask-in .mask-in-item:nth-child(1) {
  border-radius: 2.1333vw 2.1333vw 0 0;
}

#moneyManagement .mask .mask-in .mask-in-item:nth-child(2) {
  border-radius: 0vw 0vw 2.1333vw 2.1333vw;
}

#moneyManagement .mask .mask-in .mask-in-item p {
  padding: 5.3333vw 0;
}

#moneyManagement .mask .mask-in .mask-in-item p:first-child {
  border-bottom: 0.1333vw solid #ededed;
}

#moneyManagement .mask .mask-in .cancel-btn {
  height: 14.6667vw;
  line-height: 14.6667vw;
  margin-top: 2.6667vw;
  border-radius: 2.1333vw;
}

footer {
  position: absolute;
  bottom: 5.3333vw;
  width: 100%;
  text-align: center;
}

</style>
