<template>
  <div class="container">
     <van-nav-bar
      title="资金记录"
      left-arrow
      @click-left="$router.go(-1)"
    />
     <main id="moneyRecord">
        <div class="main-top d-f font-size-24">
            <div class="item">
                <span>时间</span>
                <img src="/imgs/pull-icon.png" alt="三角图标">
            </div>
            <div class="item">
                <span>状态</span>
                <img src="/imgs/pull-icon.png" alt="三角图标">
            </div>
        </div>
        <div class="main-middle bg-main-color">
            <div class="item-middle">
                <div class="top d-f d-f-between font-main-color2 ">
                    <span class="font-size-22 "> 流水号：854169752348575</span>
                    <span class="right font-size-20">复制</span>
                </div>
                <div class="bottom d-f d-f-between">
                    <div class="bt-l">
                        <h4>
                            <span class="font-weight font-size-28">充值</span>
                            <span class="font-size-24"> [银行卡充值]</span>
                        </h4>
                        <i class="font-size-20 font-main-color2">2020.01.13 10:54:32</i>
                    </div>
                    <div class="bt-r">
                        <h4 class="font-size-30 font-weight">380.00</h4>
                        <i class="font-size-20 font-main-color">待处理</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-middle bg-main-color">
            <div class="item-middle">
                <div class="top d-f d-f-between font-main-color2 ">
                    <span class="font-size-22 "> 流水号：854169752348575</span>
                    <span class="right font-size-20">复制</span>
                </div>
                <div class="bottom d-f d-f-between">
                    <div class="bt-l">
                        <h4>
                            <span class="font-weight font-size-28">提现</span>
                            <span class="font-size-24"> [中国银行8181]</span>
                        </h4>
                        <i class="font-size-20 font-main-color2">2020.01.13 10:54:32</i>
                    </div>
                    <div class="bt-r">
                        <h4 class="font-size-30 font-weight">380.00</h4>
                        <i class="font-size-20 ">已处理</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-middle bg-main-color">
            <div class="item-middle">
                <div class="top d-f d-f-between font-main-color2 ">
                    <span class="font-size-22 "> 流水号：854169752348575</span>
                    <span class="right font-size-20">复制</span>
                </div>
                <div class="bottom d-f d-f-between">
                    <div class="bt-l">
                        <h4>
                            <span class="font-weight font-size-28">提现</span>
                            <span class="font-size-24"> [中国农业银行8181]</span>
                        </h4>
                        <i class="font-size-20 font-main-color2">2020.01.13 10:54:32</i>
                    </div>
                    <div class="bt-r">
                        <h4 class="font-size-30 font-weight">380.00</h4>
                        <i class="font-size-20 ">驳回</i>
                    </div>
                </div>
            </div>
        </div>

    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
#moneyRecord {
  padding: 11.7333vw 3.2vw 4vw;
}

#moneyRecord .main-top {
  height: 12.6667vw;
}

#moneyRecord .main-top .item:first-child {
  margin-right: 7.4667vw;
}

#moneyRecord .main-top .item img {
  width: 2.6667vw;
  height: 2.6667vw;
}

#moneyRecord .main-middle {
  padding: 0 4vw;
  border-radius: 2.1333vw;
  margin-bottom: 2.6667vw;
}

#moneyRecord .main-middle .item-middle .top {
  height: 12vw;
  border-bottom: 0.1333vw solid #ededed;
}

#moneyRecord .main-middle .item-middle .top .right {
  padding: 1.3333vw 2.6667vw;
  background: #f4f4f4;
  border-radius: 4vw;
}

#moneyRecord .main-middle .item-middle .bottom {
  height: 19.3333vw;
  text-align: right;
}

#moneyRecord .main-middle .item-middle .bottom .bt-l {
  text-align: left;
}

#moneyRecord .main-middle .item-middle .bottom h4 {
  margin-bottom: 3.0667vw;
}

</style>
