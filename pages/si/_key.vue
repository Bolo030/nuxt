<template>
  <div class="storeInfo-box">
    <!-- 顾客服务组件 -->
    <customer-service
      :customerService="customerService"
      :platform="storeInfo.platform"
      @changeWx="$refs.pop.openDialog()"
      @changeCall="callPhone()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      cWidth: "",
      cHeight: "",
      pixelRatio: 1,
      serverData: "",
      storeList: [],
      customerService: {},
      recommendList: [],
      legendList: [],
      tradeList: [
        {
          title: "确定店铺",
          src: require("../../assets/imgs/store/ic_shop_details_process_quedingdianpu.png")
        },
        {
          title: "验证店铺",
          src: require("../../assets/imgs/store/ic_shop_details_process_yanzhengdianpu.png")
        },
        {
          title: "签署合同",
          src: require("../../assets/imgs/store/ic_shop_details_process_qianshuhetong.png")
        },
        {
          title: "店铺过户",
          src: require("../../assets/imgs/store/ic_shop_details_process_guohu.png")
        },
        {
          title: "交易完成",
          src: require("../../assets/imgs/store/ic_shop_details_process_wancheng.png")
        }
      ],
      screenshotList: [],
      preview: [],
      shopDynamics: [],
      percent: ["0", "20", "50", "100"],
      desc: ["无", "低", "中", "高"],
      storeInfo: "",
      storeMsgTitle: [
        {
          name: "店铺信息"
        },
        {
          name: "企业信息"
        },
        {
          name: "商标信息"
        }
      ],
      activeIndex: 0,
      isShowMore: true,
      isCollect: true,
      key: ""
    };
  },
  methods:{
      // 拨打电话
			callPhone() {
			/* 	uni.makePhoneCall({
					phoneNumber: this.customerService.workTel,
					success: (res) => {
					},
					fail: (res) => {
					},
				}); */
			},
  }
};
</script>

<style></style>
