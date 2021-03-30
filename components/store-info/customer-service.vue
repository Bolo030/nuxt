<template>
  <div class="customerService" :class="borderRdius ? 'border-radius' : ''">
    <img
      class="bg-img"
      src="../../assets/imgs/store/bg_shop_details_adviser_youce.png"
    />
    <div class="serviceLeft">
      <img :src="customerService.headPortrait" />
      <div class="serviceInfo">
        <span>{{ customerService.nickname }}</span>
        <div class="serviceInfo-item">
          <img
            src="../../assets/imgs/store/ic_shop_details_adviser_baozhang.png"
          />
          资深网店交易顾问
        </div>
      </div>
    </div>
    <div class="serviceRight">
      <img
        src="../../assets/imgs/store/ic_shop_details_adviser_weixing.png"
        @click="event('wx')"
      />
      <img
        src="../../assets/imgs/store/ic_shop_details_adviser_dianhua.png"
        @click="event('call')"
     />

    </div>
    <div class="position-box">{{platform=='tm'?'仅3%佣金':'佣金五折起'}}
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    customerService: {
      type: Object,
      required: true,
      default: () => {},
    },
    borderRdius: {
      type: Boolean,
      default: false,
    },
	platform:{
		type:String,
		default:'tm'
	}
  },
  methods: {
    event(val) {
      if (val === "wx") {
        this.$emit("changeWx");
      } else if (val === "call") {
        this.$emit("changeCall");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.border-radius {
  border-radius: 32px !important;
}
.customerService {
  position: relative;
  height: 180px;
  background: #ffffff;
  margin-bottom: 20px;
  border-radius: 0 0 32px 32px;
  // overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  .bg-img {
    position: absolute;
    top: 0;
    right: 0;
    height: 160px;
    width: 206px;
    z-index: 0;
    border-radius: 0 32px 32px 0;
  }
  .serviceLeft {
    display: flex;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 23px;
    }
    .serviceInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span {
        font-weight: 700;
        font-size: 28px;
        color: #1c1c1c;
      }
      .serviceInfo-item {
        color: #2bce9e;
        font-size: 24px;
        img {
          width: 21px;
          height: 24px;
          margin-right: 5px;
        }
      }
    }
  }
  .serviceRight {
    position: relative;
    z-index: 1;
    img {
      width: 60px;
      height: 60px;
      margin-left: 37px;
    }
  }
  .position-box {
      position: absolute;
      text-align: center;
      background: #2bce9e;
      padding: 15px 23px;
      color: #fff;
      border-radius: 50px;
      bottom: -20px;
      right: 50px;
      box-sizing: border-box;
      font-size: 20px;
      div {
        position: absolute;
        left: 40px;
        top: -12px;
        height: 0;
        width: 0;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #2bce9e;
        border-top: 6px solid transparent;
        border-left: 6px solid transparent;
      }
    }
}
</style>
