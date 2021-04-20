<template>
  <div class="company">
      <van-nav-bar title="关于我们" left-arrow @click-left="$router.go(-1)" />
    <img src="~/assets/imgs/banner_icon.png" />
    <div class="title">
      <div>关于我们</div>
      <span>COMPANY PROFILE</span>
    </div>
    <div class="company-content">
      <div class="item">
        四川九九牛网络科技有限公司(以下简称“九九牛”)是一家集网店交易、入驻、转让等
        电商综合业务于一体的虚拟资产交易平台，旗下
        <span>业务覆盖淘宝、天猫、京东、小红书、唯品会</span>
        等平台，以专业、高效为客户提供最优质的虚拟资产交易服务，为实现共同定义电商新时代的目标不懈努力。
      </div>
      <div class="item">
        我们相信专业是让户放心的第一要义，服务是让客户安心的核心名词。为满足客户对电商未来的需求，我
        们执着于每一次交易前后的细节，将激活电商市场的钥匙交到户手中，是我们恒久不变的初心。
      </div>
      <div class="item">
        <span>九九牛汇聚国内外顶尖的服务、技术团队</span>
        ，进行市场优化整合的同时，不断探索电商新市场，同步进行的还有
        平台APP、小程序的独立研发与创新，
        <span
          >确保每一位客户都能在安全、放心的平台上进行交易，保证客户至上，保障客户利益</span
        >
        ，全面推进电商新时代的发展。
      </div>
    </div>
    <div class="title">
      <div>联系我们</div>
      <span>CONTACT US</span>
    </div>
    <div class="fotter-item">
      <div class="item">
        <div>
          <img src="~/assets/imgs/icon_phone.png"
               alt="电话图标"
           />
          <text>400-0909-940 / 028-62092550</text>
        </div>
        <div>
          <img src="~/assets/imgs/icon_address.png"
               alt="地址图标"
           />
          <span>四川省成都市武侯区高华横街33号成都A区1栋 1单元1108</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
   head() {
    return {
      title: "公司介绍_网店交易平台_九九牛官网",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "四川九九牛网店交易平台，全国最大的天猫、淘宝网店购买、转让、出售平台，10000+真实购买资源，网店转让出售，九九牛更安全、更放心！"
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "公司介绍,九九牛"
        }
      ]
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.company {
  background: #fff3e5;
  padding-bottom: 20px;
  //   height: 100%;
  img {
    height: 348px;
    width: 100%;
  }
  .title {
    text-align: center;
    padding: 77px 0 44px 0;
    > div {
      color: #ee7419;
      font-size: 36px;
      font-weight: 700;
    }
    > div::before {
      content: "";
      display: inline-block;
      width: 35px;
      height: 11px;
      background: url("../assets/imgs/icon-left.png");
      background-size: cover;
      background-repeat: no-repeat;
      margin-right: 19px;
    }
    > div::after {
      content: "";
      display: inline-block;
      width: 35px;
      height: 11px;
      background: url("../assets/imgs/icon-right.png");
      background-size: cover;
      margin-left: 19px;
      background-repeat: no-repeat;
    }
    span {
      color: #ffcaa2;
      font-size: 24px;
      margin-top: 13px;
    }
  }
  .company-content {
    padding: 0 42px;
    .item {
      padding: 53px 42px 84px 41px;
      background: #fff;
      border-radius: 24px;
      font-size: 26px;
      color: #1c1c1c;
      line-height: 46px;
      span {
        color: #ee7419;
      }
      margin-bottom: 34px;
    }
  }
  .fotter-item {
    padding: 0 42px;
    .item {
      padding: 53px 42px 84px 41px;
      background: #fff;
      border-radius: 24px;
      div {
        display: flex;
        align-content: center;
        img {
          width: 26px;
          height: 32px;
          vertical-align: center;
          margin-right: 31px;
        }
      }
      > div:nth-of-type(1) {
        span {
          //  line-height: 100px;
          padding-bottom: 37px;
          width: 100%;
          border-bottom: 1px solid #ededed;
        }
      }
      > div:nth-of-type(2) {
		  padding-top: 37px;
        span {
			line-height: 46px;
		}
		img {
			margin-top: 25px;
		}
      }
    }
  }
}
</style>
