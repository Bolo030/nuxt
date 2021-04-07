<template>
<div class="container">
    <van-nav-bar
      title="流水明细"
      left-arrow
      @click-left="$router.go(-1)"
    />
  <main id="waterSubsidiary">
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
                    <div class="bt-l ">
                        <h4 class="text-wrap">
                            <span class="font-weight font-size-28">充值</span>
                            <span class="font-size-24"> [华东地区收纳整理+家居饰]</span>
                        </h4>
                        <i class="font-size-20 font-main-color2">2020.01.13 10:54:32</i>
                    </div>
                    <div class="bt-r">
                        <h4 class="font-size-30 font-weight">+380.00</h4>
                        <i class="font-size-20">可用余额 ￥1380</i>
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
                            <span class="font-size-24"> [更换店铺]</span>
                        </h4>
                        <i class="font-size-20 font-main-color2">2020.01.13 10:54:32</i>
                    </div>
                    <div class="bt-r">
                        <h4 class="font-size-30 font-weight">380.00</h4>
                        <i class="font-size-20 ">可用余额 ￥1380</i>
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
                        <i class="font-size-20 ">可用余额 ￥1380</i>
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

<style>

</style>
