<template>
  <div id="rulesDetails-box">
    <div class="back" @click="back">
      <img src="../../assets/imgs/backBtn_icon.png?v1" />
    </div>
    <block v-for="item in imgList" :key="item.id">
      <img :src="item.src" class="image" mode="widthFix" />
    </block>
    <div class="footerBtn">
      <img
        src="../../assets/imgs/icon_customer.png?v1"
        mode="widthFix"
        @click="event('customer')"
      />
      <img
        src="../../assets/imgs/icon_selectStore.png?v1"
        mode="widthFix"
        @click="event('store')"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        { src: require("../../assets/imgs/1.png?v1"), id: 1 },
        { src: require("../../assets/imgs/2.png?v1"), id: 2 },
        { src: require("../../assets/imgs/3.png?v1"), id: 3 },
        { src: require("../../assets/imgs/4.png?v1"), id: 4 },
        { src: require("../../assets/imgs/5.png?v1"), id: 5 },
        { src: require("../../assets/imgs/6.png?v1"), id: 6 }
      ]
    };
  },
  methods: {
    event(val) {
      if (val === "customer") {
      } else {
        this.$router.push('/tm')
      }
    },
    // 返回首页
    back() {
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
#rulesDetails-box {
  .back {
    position: fixed;
    top: 30px;
    left: 30px;
    z-index: 666;
    color: #fff;
    img {
      width: 160px;
     	height: 66px;
      vertical-align: middle;
    }
  }
  .image {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  .footerBtn {
    width: 750px;
    height: 153px;
    margin-top: -153px;
    // background: url("../../assets/imgs/10.png");
    // background-size: cover;
    // background-repeat: no-repeat;
    background-color: #e42a41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 135px 0 164px;
    img {
      width:200px;
      height: 80px;
      display: block;
    }
  }
}
</style>
