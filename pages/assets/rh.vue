<template>
  <div class="container">
    <van-nav-bar
      title="对公账户汇款充值"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <main id="recharge">
      <h3 class="warm-info font-main-color2 font-size-24">
        <i class="font-main-color">*</i>
        请仔细核对汇款账户，如需开具发票，请汇款至对公银行账户!
      </h3>
      <h2 class="title-desc font-size-28 font-weight">汇款信息</h2>
      <div class="form-info bg-main-color">
        <ul class="font-size-24">
          <li class="info-item">
            <h5>
              <i class="font-main-color">*</i>
              汇款人
            </h5>
            <input
              type="text"
              v-model="formData.username"
              placeholder="请填写汇款人姓名"
            />
          </li>
          <li class="info-item">
            <h5>
              <i class="font-main-color">*</i>
              汇款金额
            </h5>
            <input
              type="number"
              min="0"
              v-model="formData.price"
              placeholder="请填写汇款金额"
            />
          </li>
          <li class="info-item position-r">
            <h5>
              <i class="font-main-color">*</i>
              上传汇款截图
            </h5>
            <van-uploader v-model="fileList" class="upload" :max-count="1">
              <template #preview-cover="{ file }">
                <div class="preview-cover van-ellipsis">{{ file.name }}</div>
              </template>
            </van-uploader>
          </li>
          <li class="info-item">
            <button
              class="font-main-color6 font-size-28 font-weight"
              @click="onSubmit"
            >
              提交
            </button>
          </li>
        </ul>
      </div>
      <h2 class="bank-title title-desc font-size-28 font-weight">
        银行对公账户
      </h2>
      <div class="account-info bg-main-color position-r">
        <div class="line position-a1"></div>
        <ul class="account-info-item font-size-28">
          <li>
            <h6 class="item-title font-size-20 font-main-color">收款方:</h6>
            <p>{{ info.title }}</p>
          </li>
          <li>
            <h6 class="item-title font-size-20 font-main-color">银行分支行:</h6>
            <p>{{ info.provider }}</p>
          </li>
          <li class="position-r">
            <h6 class="item-title font-size-20 font-main-color">对公账号:</h6>
            <p>{{ info.account }}</p>
            <button
              class="copy position-a1 font-main-color2 font-size-20"
              @click="$utils.copy(info.account)"
            >
              复制
            </button>
          </li>
        </ul>
      </div>
      <!--     <h2 class="bank-title title-desc font-size-28 font-weight">支付宝账户</h2>
      <div class="account-info bg-main-color position-r">
        <div class="line line1 position-a1 "></div>
        <ul class="account-info-item font-size-28">
          <li class="position-r">
            <h6 class=" alipay ">四川九九牛君尚科技有限公司</h6>
            <p>2125094970@qq.com</p>
            <button class="copy position-a1 font-main-color2 font-size-20">
              复制
            </button>
          </li>
        </ul>
      </div> -->
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    let info = await app.$api
      .assetsDepositor()
      .then(res => (res.status == 1 ? res.data[0] : {}));
    let formData = {
      username: "",
      price: "",
      bank: info.id,
      voucher: ""
    };
    return {
      info,
      formData
    };
  },
  data() {
    return {
      fileList: [],
      formData: {
        username: "",
        price: "",
        bank: "",
        voucher: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      let that=this;
      if (!this.formData.username) return this.$toast("请填写汇款人");
      if (!this.formData.username) return this.$toast("请输入汇款金额");
      if (this.fileList.length > 0) {
        await this.$api.uploadFile(this.fileList[0].file).then(res => {
          this.formData.voucher = res.data.url;
        });
      } else {
        return this.$toast("请上传汇款截图");
      }
      await this.$api.assetsRecharge(this.formData).then(res => {
        if (res.status == 1) {
          this.$toast("您的充值记录已成功提交，请等待财务人员审核");
           setTimeout(function() {
            that.$router.push('/assets/success?type=rh');
          }, 2000);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#recharge {
  padding: 0 3.2vw 10.2667vw;
}

#recharge .warm-info {
  margin: 4.2667vw 0;
}

#recharge .title-desc {
  line-height: 6.2667vw;
}

#recharge .bank-title {
  margin: 5.3333vw 0 2.6667vw;
}

#recharge .form-info {
  margin-top: 2.6667vw;
  padding: 5.3333vw 4vw;
  border-radius: 2.1333vw;
}

#recharge .form-info .info-item {
  margin-bottom: 4.5333vw;
}

#recharge .form-info .info-item:nth-child(3) {
  margin-bottom: 5.3333vw;
}

#recharge .form-info .info-item:last-child {
  margin-bottom: 0;
}

#recharge .form-info .info-item input {
  margin-top: 2.6667vw;
  height: 14.6667vw;
  width: 100%;
  padding-left: 4.5333vw;
  box-sizing: border-box;
  border-radius: 2.1333vw;
  background: #f4f4f4;
}

#recharge .form-info .info-item #upload-file {
  opacity: 0;
  height: 22.6667vw;
  width: 22.6667vw;
}

#recharge .form-info .info-item .upload-style {
  position: absolute;
  top: 6.6667vw;
  width: 22.6667vw;
  height: 22.6667vw;
  border-radius: 2.1333vw;
  text-align: center;
  line-height: 22.6667vw;
}

#recharge .form-info .info-item .upload-style img {
  width: 100%;
}

#recharge .form-info .info-item button {
  background: #f4632c;
  width: 100%;
  height: 14.6667vw;
  border-radius: 2.1333vw;
}

#recharge .account-info {
  padding: 4vw;
  border-radius: 2.1333vw;
}

#recharge .account-info .line {
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 85.6vw;
  height: 0.5333vw;
  border-radius: 0.2667vw;
  background: #dd1c1c;
}

#recharge .account-info .line1 {
  background: #508aff;
}

#recharge .account-info .account-info-item li {
  padding-top: 4.5333vw;
  box-sizing: border-box;
  height: 20vw;
  border-bottom: 0.1333vw solid #ededed;
}

#recharge .account-info .account-info-item li:first-child {
  padding-top: 2.6667vw;
  height: 18.1333vw;
}

#recharge .account-info .account-info-item li:last-child {
  border: none;
}

#recharge .account-info .account-info-item li .item-title {
  display: inline-block;
  height: 4.8vw;
  line-height: 4.8vw;
  padding: 0 2.1333vw;
  margin-bottom: 2.6667vw;
  border-radius: 8vw;
  background: #ffeee7;
}

#recharge .account-info .account-info-item li .copy {
  top: 11.0667vw;
  right: 0;
  padding: 1.3333vw 2.6667vw;
  background: #f4f4f4;
  border-radius: 2.6667vw;
}

#recharge .account-info .account-info-item li .alipay {
  margin-bottom: 4.2667vw;
}
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
.upload {
  margin-top: 20px;
}
</style>
