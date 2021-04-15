<template>
  <div>
      <header id="header">
        <div class="header-content">
            <a href="javascript:history.go(-1)" title="返回箭头"><img class="back" src="~/assets/imgs/store/rectangle.png"
                    alt="九九牛返回" /></a>
            <span class="title">我的合同</span>
        </div>
    </header>

    <main class="my-contract">
        <!-- 店铺合同列表区域 -->
        <!-- 签署中状态 -->
        <ul class="my-contract-list bg-main-color" v-for="item in contractLists" :key="item.id" >
            <li class="contract-title d-f d-f-between font-main-color6 font-size-26"
             :class="item.parse_status == '正常'? ' bg-gradient-color3': item.parse_status == '已取消'? 'bg-main-color8':'bg-gradient-color2' ">
                <span>{{item.name}}</span>
                <span class="font-weight">{{item.parse_status}}</span>
            </li>
            <li class="contract-middle">
                <div class="store-title d-f">
                    <img :src="item.store_icon_path"
                        alt="店铺图标">
                    <h4 class="font-size-30 font-weight">{{item.store_name}}</h4>
                </div>
                <div class="order-number font-size-26 d-f d-f-between">
                    <div class="order-number-l" v-if="item.storeCode !== ''">
                        <span>店铺编号：</span>
                        <span>{{item.storeCode}}</span>
                    </div>
                    <div class="order-number-l" v-else>
                        <span>订单编号：</span>
                        <span>{{item.outTradeNo}}</span>
                    </div>
                    <div class="order-number-r font-main-color">
                        <span @click="jumpOrderInfo(item)">{{item.storeCode !== ''? '查看店铺':'查看订单'}}</span>
                        <i class="iconfont iconjinru1 font-size-26"></i>
                    </div>
                </div>
            </li>
            <li class="contract-bottom d-f d-f-between font-size-24">
                <div class="contract-bottom-l font-main-color2">
                    <span>{{item.begin}}</span>
                    <!-- <span>16:11</span> -->
                </div>
                <div class="contract-bottom-r font-main-color4">
                    <span class="bottom-r-item" @click="lookCantract(item.downpath)">查看合同</span>
                    <span class="bottom-r-item send-email" @click="sendEmail(item.id,item.status)">发送邮箱</span>
                </div>
            </li>
        </ul>
    </main>

    <van-dialog v-model="showMask" 
                title="请填写邮箱地址" 
                show-cancel-button 
                :before-close="onBeforeClose" >
      <div class="email-box">
        <van-loading color="#f66d2e" class="loading"  v-show="isShowLoading"/>
        <input type="text" placeholder="请输入您接收合同的邮箱地址" class="email-input" v-model="userEmail">
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  async asyncData({app}) {
    let contractLists = [];
    let result = await app.$api.contractList({
      per_page:15,
      page:1
    });
    if(result.status !== 1) return ;
    contractLists = result.data.data;
    contractLists.forEach(item => {
      item.store_icon_path = require(`~/assets/imgs/icon_${item.platform}.png`)
    });
   return {contractLists} 
  },
  data() {
    return {
      showMask: false,
      userEmail:'',
      contractId:'',
      isShowLoading: false,
      page:1,
      per_page:15
    };
  },
  methods:{
    sendEmail(id,status){
      if(status === 'closed') {
        this.contractId = id;
        this.showMask = true;
      }else {
        this.$toast('该订单暂无合同')
      } 
    },
    async onBeforeClose(action, done) {
      if (action === "confirm") {
        if(this.userEmail.trim().length === 0) {
          return this.$toast('邮箱不能为空!');
        } 
        let res = await this.$api.sendEmailContract(this.contractId,{
          contract:this.contractId,
          email: this.userEmail
        });
        if(res.status !== 1) return //this.$toast(res.message);
        this.$toast(res.message);
        done();
      } else {
        return done()
      }
    },
    lookCantract(downpath){
      if(!downpath) return this.$toast('暂无合同');
      location.href=downpath;
      console.log(downpath);  
    },
    jumpOrderInfo(item) {
      console.log(item);
      if(!item.outTradeNo && !item.storeCode) return this.$toast('暂无改订单');
      item.order_key? this.$router.push("/user/order-info/buy?key=" + item.order_key):this.$router.push(`/si/${item.store_key}`); 
    }
    
  }

}
</script>

<style lang='scss' scoped>
.my-contract {
  padding: 30px 24px 30px;
}
.email-box {
  position: relative;
  padding: 0 47px;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.email-input {
  height: 80px;
  width: 100%;
  margin-bottom: 45px;
  margin-top: 30px;
  padding-left: 20px;
  font-size: 26px;
  border-radius: 8px;
  background: #f4f4f4;
}
.my-contract-list {
  border-radius: 16px;
  overflow: hidden;
  padding-bottom: 30px;
  margin-bottom: 20px;
}

.my-contract-list .contract-title {
  height: 88px;
  padding: 0 30px;
}

.my-contract-list .contract-middle {
  padding: 0 30px;
}

.my-contract-list .contract-middle .store-title {
  margin-top: 50px;
}

.my-contract-list .contract-middle .store-title img {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 10px;
}

.my-contract-list .contract-middle .order-number {
  padding: 32px 0 50px;
  border-bottom: 1px solid #ededed;
}

.my-contract-list .contract-middle .order-number .order-number-r i {
  font-size: 26px;
}

.my-contract-list .contract-bottom {
  padding: 0 30px;
  margin-top: 30px;
}

.my-contract-list .contract-bottom .contract-bottom-r .bottom-r-item {
  display: inline-block;
  width: 130px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px solid #cccccc;
  border-radius: 25px;
}

.my-contract-list .contract-bottom .contract-bottom-r .bottom-r-item:first-child {
  margin-right: 10px;
}

.send-mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 666666;
  background: rgba(0, 0, 0, 0.5);
}

.send-mask .send-mask-box {
  width: 574px;
  height: 340px;
  border-radius: 16px;
}

.send-mask .send-mask-box .send-mask-item {
  padding: 42px 47px;
  box-sizing: border-box;
  text-align: center;
  border-bottom: 1px solid #ededed;
}

.send-mask .send-mask-box .send-mask-item .email-input {
  height: 80px;
  width: 100%;
  background: #f4f4f4;
  border-radius: 8px;
  margin: 32px 0 3px;
  padding-left: 27px;
  box-sizing: border-box;
}

.send-mask .send-mask-box .send-mask-item2 {
  height: 96px;
}

.send-mask .send-mask-box .send-mask-item2::after {
  content: '';
  position: absolute;
  width: 1px;
  height: 40px;
  background: #ededed;
}

</style>