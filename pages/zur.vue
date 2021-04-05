<template>
  <div class="container">
    <van-nav-bar title="网店出售" left-arrow @click-left="$router.go(-1)" />
    <main>
      <p class="submitareport">*提交完成后，您最快在五分钟收到店铺估价</p>
      <van-cell-group>
        <van-field
          v-model="formData.name"
          label="店铺名称"
          placeholder="请输入您的店铺名称"
        />
        <van-field
          v-model="formData.mobile"
          type="tel"
          label="电话"
          placeholder="请输入您的电话"
        />
      </van-cell-group>
      <h4>选择店铺类型</h4>
      <van-radio-group
        class="platform"
        v-model="formData.platform"
        direction="horizontal"
      >
        <van-radio
          class="item"
          v-for="(item, index) in pList"
          :key="index"
          :name="item.name"
          checked-color="#f4632c"
        >
          <img
            class="icon"
            :src="require('~/assets/imgs/icon_' + item.name + '.png')"
          />
          <span>{{ item.text }}</span>
        </van-radio>
      </van-radio-group>
      <div class="submit">
        <van-button type="primary" block color="#f4632c" @click="onSubmit"
          >提交</van-button
        >
      </div>
    </main>
    <custom-tabbar :active="1" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pList: [
        { name: "tm", text: "天猫" },
        { name: "tb", text: "淘宝" },
        { name: "qt", text: "其他" }
      ],
      formData: {
        platform: "tm",
        name: "",
        mobile: "",
        origin: 1
      }
    };
  },
  methods: {
    onSubmit() {
      if (!this.formData.name) return this.$toast("请输入店名称");
      if (!/^1[3456789]\d{9}$/.test(this.formData.mobile))
        return this.$toast("请输输入正确的手机号");
      this.$api.RosterAdd(this.formData).then(res => {
        if (res.status == 1) {
          this.$dialog
            .alert({
              message: "您的卖店请求提交成功，请耐心等待我们和您联系"
            })
            .then(() => {
              this.$router.go(0)
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background: #fff;
  font-weight: 500;
  font-family: Source Han Sans CN;
  color: #333;
}
.submitareport {
  padding: 30px 0 30px 30px;
  font-size: 24px;
  color: #f4632c;
}
h4 {
  margin: 20px 0;
  line-height: 60px;
  font-size: 30px;
  text-align: center;
}
.platform {
  padding: 0 50px;
  display: flex;
  justify-content: space-around;
  font-size: 28px;
  .icon {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
}
.submit {
  padding: 0 30px;
  button {
    margin-top: 60px;
  }
}
</style>
