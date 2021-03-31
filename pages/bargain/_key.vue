<template>
  <main>
    <van-nav-bar title="我要砍价" left-arrow @click-left="$router.go(-1)" />
    <div class="hend">
      <div class="bargain">
        <div class="icon">
          <img
            class="img"
            :src="require('../../assets/imgs/icon_' + store.platform + '.png')"
          />
          <div class="wz">{{ placeholder(store.title) }}</div>
        </div>
        <div class="serialnumber">
          网店编号：{{ placeholder(store.parse_code) }}
        </div>
        <div class="serial-xian"></div>
        <div class="bazaar">
          <div class="left">市场价</div>
          <div class="right">
            {{
              store.parse_market_price ? "¥ " + store.parse_market_price : "-"
            }}
          </div>
        </div>
        <div class="serial-xian"></div>
        <div class="bazaar">
          <div class="left">转让价</div>
          <div class="right">
            {{ store.parse_price ? "¥ " + store.parse_price : "-" }}
          </div>
        </div>
        <div class="serial-xian"></div>
        <div class="bazaar">
          <div class="left">心里价</div>
          <input
            class="uni-input"
            v-model="formData.price"
            placeholder="请输入期望价格(元)"
          />
        </div>
        <div class="serial-xian"></div>
        <div class="bazaar">
          <div class="left">昵称</div>
          <input
            class="uni-input"
            v-model="formData.realname"
            placeholder="请输入昵称"
          />
        </div>
        <div class="serial-xian"></div>
        <div class="bazaar">
          <div class="left">电话</div>
          <input
            class="uni-input"
            v-model="formData.mobile"
            :disabled="is_login"
            placeholder="请输入电话"
          />
        </div>
        <div class="serial-xian"></div>
        <div class="bazaar">
          <div class="left">QQ</div>
          <input
            class="uni-input"
            v-model="formData.qq"
            placeholder="请输入QQ号码"
          />
        </div>
        <div class="serial-xian"></div>
        <van-button
          :loading="loading"
          type="info"
          loading-text="提交中..."
          block
          @click="onSubmit()"
          >确认</van-button
        >
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      key: "",
      loading: false,
      store: {
        platform: "",
        title: "-",
        parse_code: "-",
        parse_market_price: "",
        parse_price: ""
      },
      formData: {
        price: undefined,
        realname: undefined,
        mobile: undefined,
        qq: undefined,
        origin: 2,
        shop_code: "" //网店编号
      },
      is_login: false
    };
  },
  async asyncData({ app, params, $cookies }) {
    let key = params.key;
    let store = await app.$api
      .getSimple(key)
      .then(res => (res.status == 1 ? res.data : {}));
    let formData = {
      price: undefined,
      realname: undefined,
      mobile: $cookies.get("phone") || null,
      qq: undefined,
      origin: 2,
      shop_code: store.code //网店编号
    };
    return {
      store,
      formData
    };
  },
  methods: {
    getData() {
      this.$api.getSimple(this.key).then(res => {
        if (res.status === 1) {
          this.store = res.data;
          this.formData.shop_code = res.data.code;
        }
      });
    },
    validateData() {
      let data = this.formData;
      if (this.$utils.isEmpty(data.price)) {
        return "请输入心理价";
      }
      if (!/(^[1-9]\d*$)/.test(data.price)) {
        return "心理价必须为整数";
      }
      if (this.$utils.isEmpty(data.realname)) {
        return "请输入昵称";
      }
      if (this.$utils.isEmpty(data.mobile)) {
        return "请输入电话";
      }
      if (!/^1[3-9]{1}[0-9]{9}$/.test(data.mobile)) {
        return "电话格式错误";
      }
      if (data.qq && !/(^[1-9]\d*$)/.test(data.qq)) {
        return "qq号码格式错误";
      }
      return true;
    },
    onSubmit() {
      let validate = this.validateData();
      if (validate !== true) {
        this.$toast(validate);
        return false;
      }
      this.loading = true;
      this.$api.RosterAdd(this.formData).then(res => {
        this.loading = false;
        if (res.status === 1) {
           this.$dialog.alert({
            title: "提升",
            message: "您的砍价请求提交成功，请耐心等待我们和您联系"
          }).then(() => {
            this.$router.go(-1)
          });
        }
      });
    },
    placeholder(data) {
      return this.$utils.placeholder(data);
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
main {
  background: #fff;
  height: 100vh;
  font-size: 26px;
}
.hend {
  width: 100%;
  .bargain {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    padding-top: 30px;
    .icon {
      display: flex;
      .img {
        width: 50px;
        height: 35px;
      }
      .wz {
        padding-left: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        line-height: 40px;
      }
    }
    .serialnumber {
      padding-top: 20px;
    }
    .serial-xian {
      margin-top: 30px;
      transform: scaleY(0.5);
      border: 1px solid #dfdfdf;
    }
    .bazaar {
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      .right {
        color: #969799;
      }
      input {
        text-align: right;
      }
    }
    button {
      border-radius: 40px;
      margin-top: 30px;
    }
  }
}
</style>
