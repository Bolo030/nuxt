<template>
  <div class="container">
    <van-nav-bar title="提现" left-arrow @click-left="$router.go(-1)" />
    <main id="withdrawDeposit">
      <div class="withdraw-info bg-main-color">
        <ul class="withdraw-info-in">
          <!-- 已绑定银行卡 -->
          <li class="withdraw-item1  d-f-flex d-f-between" v-if="bankList.length>0">
            <div class="item-right font-size-32 d-f ">
              <img src="../../assets/imgs/bank-icon1.png" alt="银行图标" />
              <span>中国银行 (8457)</span>
            </div>
            <div
              class="item-left font-size-24 font-main-color d-f"
              id="selectBank"
            >
              <span>选择银行卡</span>
              <img src="../../assets/imgs/icon-entry2.png" alt="箭头" @click="isShow=true" />
            </div>
          </li>
          <!-- 未绑定银行卡 -->
          <li v-else
            class="withdraw-item1  d-f-flex d-f-between"
          >
            <div class="item-right font-size-32 d-f">
              <span class="font-main-color2">暂未绑定银行卡</span>
            </div>
            <div class="item-left font-size-24 font-main-color d-f">
              <span>去绑定银行卡</span>
              <img src="../../assets/imgs/icon-entry2.png" alt="箭头" />
            </div>
          </li>
          <li class="withdraw-item2 font-size-24 font-main-color4">提现金额</li>
          <li class="withdraw-item3 position-r ">
            <img
              src="../../assets/imgs/withdraw-icon.png"
              alt="资金图标"
              class="position-a1"
            />
            <input
              type="number"
              min="0"
              placeholder="请输入提现金额"
              class="font-size-28"
              v-model="formData.price"
            />
            <span class="position-a1 font-size-28">元</span>
          </li>
          <li class="withdraw-item4 d-f d-f-between font-size-24">
            <p class=" font-main-color2">
              <span>可提现金额 </span>
              <sapn>￥{{capital.available}}</sapn>
            </p>
            <span class=" font-main-color" @click="all">全部提现</span>
          </li>
          <li class="withdraw-item5 font-size-30 font-main-color6">
            <button click="submit">确认提现</button>
          </li>
        </ul>
      </div>

      <!-- 友情提示 -->
      <div class="friend-warning font-size-24">
        <h1>友情提示：</h1>
        <p>
          销售店铺等<span class="font-main-color">合法经营提供免费</span
          >。充值未消费就提现会收取5%的
          手续费，情节恶劣者，九九牛保留向公安机关进行反洗钱举报的可能性。
        </p>
      </div>

      <!-- 银行卡选择弹出层 -->
      <div class="bank-mask" v-if="isShow">
        <div class="mask-box bg-main-color">
          <div class="item-top">
            <h6 class="font-size-32 font-weight">选择银行卡</h6>
            <img src="../../assets/imgs/icon_close.png" alt="关闭图标" id="close" @click="isShow=false" />
          </div>
          <div
            class="wrapper1 item-middle"
            style="height: 86.6667vw; overflow: hidden;"
          >
            <ul class="content">
              <li class="d-f d-f-between font-size-30">
                <div class="banck-left d-f">
                  <img src="../../assets/imgs/bank-icon1.png" alt="银行图标" />
                  <span>中国银行</span>
                  <span>(9857)</span>
                </div>
                <img src="../../assets/imgs/success-icon.png" alt="选中图标" />
              </li>
            </ul>
          </div>
          <div class="item-bottom font-size-30 font-weight d-f d-f-center">
            <img src="../../assets/imgs/bank-add-icon.png" alt="" />
            <span>添加银行卡</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
async asyncData({app}){
  let [capital,bankList]=await Promise.all([
    app.$api.getCapital().then(res=>res.status==1?res.data:{}),
    app.$api.getBankList().then(res=>res.status==1?[...res.data.personal,...res.data.company]:[])
  ])
  return{
    capital,
    bankList
  }
},
data(){
  return{
    capital:{},
    bankList:[],
    isShow:false,
    formData: {
					price: null,
					bank: null
				}
  }
},
methods:{
  all(){
    this.formData.price=this.capital.available.split(',').join("")
  },
  	submit() {
				var data = { ...this.formData
				};
				data.price = Number(data.price)
				if (!data.bank) return this.$toast('请选择提现银行')
				if (!data.price) return this.$toast('请输入提现金额')
				if (data.price <= 0 || data.price > Number(this.capital.available)) return this.$toast('请输入正确的提现金额')
				this.$api.subWithdrawal(data).then(res => {
					if (res.status == 1) {
            this.$toast.success('提交成功')
            this.$router.push('/assets/wdSuccess')
					}
				})
			}
}

};
</script>

<style lang="scss" scoped>
#withdrawDeposit {
  padding: 0 3.2vw 0;
}

#withdrawDeposit .withdraw-info {
  margin-top: 4vw;
  padding: 6.6667vw 4vw;
  border-radius: 2.1333vw;
}

#withdrawDeposit .withdraw-info .withdraw-info-in .withdraw-item1 {
  padding-bottom: 20px;
  border-bottom: 0.1333vw solid #ededed;
}

#withdrawDeposit
  .withdraw-info
  .withdraw-info-in
  .withdraw-item1
  .item-right
  img {
  width: 4.8vw;
  height: 4.8vw;
  margin-right: 1.0667vw;
}

#withdrawDeposit
  .withdraw-info
  .withdraw-info-in
  .withdraw-item1
  .item-left
  img {
  width: 2.1333vw;
  height: 2.1333vw;
  margin-left: 1.0667vw;
}

#withdrawDeposit .withdraw-info .withdraw-info-in .withdraw-item2 {
  margin-top: 1.3333vw;
  height: 10.9333vw;
  line-height: 10.9333vw;
}

#withdrawDeposit .withdraw-info .withdraw-info-in .withdraw-item3 {
  height: 14.6667vw;
}

#withdrawDeposit .withdraw-info .withdraw-info-in .withdraw-item3 img {
  top: 50%;
  transform: translateY(-50%);
  left: 4.5333vw;
  width: 3.4667vw;
  height: 3.4667vw;
}

#withdrawDeposit .withdraw-info .withdraw-info-in .withdraw-item3 input {
  width: 100%;
  height: 14.6667vw;
  background: #f4f4f4;
  border-radius: 2.1333vw;
  padding-left: 10vw;
  box-sizing: border-box;
}

#withdrawDeposit .withdraw-info .withdraw-info-in .withdraw-item3 span {
  top: 50%;
  transform: translateY(-50%);
  right: 4.5333vw;
}

#withdrawDeposit .withdraw-info .withdraw-info-in .withdraw-item4 {
  height: 13.6vw;
}

#withdrawDeposit .withdraw-info .withdraw-info-in .withdraw-item5 {
  margin-top: 2.6667vw;
  height: 13.3333vw;
  border-radius: 2.1333vw;
  background: #f4632c;
}

#withdrawDeposit .withdraw-info .withdraw-info-in .withdraw-item5 button {
  width: 100%;
  height: 100%;
}

#withdrawDeposit .friend-warning {
  margin-top: 4vw;
  line-height: 5.3333vw;
}

#withdrawDeposit .bank-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 7777;
  background: rgba(0, 0, 0, 0.5);
}

#withdrawDeposit .bank-mask .mask-box {
  position: absolute;
  bottom: 0vw;
  width: 100%;
  height: 126.6667vw;
  border-radius: 2.1333vw 2.1333vw 0 0;
  padding: 0 3.2vw;
  box-sizing: border-box;
}

#withdrawDeposit .bank-mask .mask-box .item-top {
  position: relative;
  line-height: 13.3333vw;
  text-align: center;
}

#withdrawDeposit .bank-mask .mask-box .item-top img {
  position: absolute;
  top: 3.7333vw;
  right: 0vw;
  width: 4vw;
  height: 4vw;
}

#withdrawDeposit .bank-mask .mask-box .item-middle {
  margin-top: 2.6667vw;
  height: 86.6667vw;
  overflow: hidden;
}

#withdrawDeposit .bank-mask .mask-box .item-middle li {
  height: 17.3333vw;
  border-bottom: 0.1333vw solid #ededed;
}

#withdrawDeposit .bank-mask .mask-box .item-middle li img {
  width: 4.8vw;
  height: 4.8vw;
  margin-right: 1.0667vw;
}

#withdrawDeposit .bank-mask .mask-box .item-bottom {
  margin-top: 6.6667vw;
  height: 13.3333vw;
  background: #f4f4f4;
  border-radius: 2.1333vw;
}

#withdrawDeposit .bank-mask .mask-box .item-bottom img {
  width: 5.3333vw;
  height: 5.3333vw;
  margin-right: 1.3333vw;
}
</style>
