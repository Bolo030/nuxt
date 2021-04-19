<template>
  <main>
    <van-nav-bar title="网店出售" left-arrow @click-left="$router.push('/')" />
    <div class="buy">
      <div class="buy-hint">
        <span class="red">*</span>
        <span>请填写您的出售需求，我们将按需求尽快安排客服与您联系!</span>
      </div>
      <div class="buy-row" @click="$refs.pop.openDialog()">
        <span class="iconfont iconpingtai"></span>
        <span>{{ platform.name || "请选择网店平台" }}</span>
        <van-icon name="arrow" size="15" class="right" />
      </div>
      <div class="buy-row">
        <span class="iconfont iconshouji2"></span>
        <input
          v-model="formData.mobile"
          type="number"
          placeholder="请输入手机号"
          placeholder-class="p-class"
        />
      </div>
      <div class="buy-row more">
        <span class="iconfont iconyiwen"></span>
        <textarea
          v-model="formData.desc"
          placeholder="您需要出售一个什么样的店铺？(100字以内)"
          maxlength="100"
          placeholder-class="p-class"
        ></textarea>
      </div>
      <van-button type="primary" color="#f4632c" block @click="submit"
        >提交</van-button
      >
      <custom-dialog ref="pop" type="big" title="请选择平台">
        <div class="platform-box">
          <div
            class="pb-item"
            v-for="(item, index) in platformList"
            :key="index"
            @click="choose(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </custom-dialog>
    </div>
  </main>
</template>

<script>
const platformlist = [
  {
    name: "天猫",
    value: "tm",
    column: "platform"
  },
  {
    name: "淘宝",
    value: "tb",
    column: "platform"
  },
  {
    name: "京东",
    value: "jd",
    column: "platform"
  },
  {
    name: "唯品会",
    value: "wp",
    column: "platform"
  },
  {
    name: "小红书",
    value: "xh",
    column: "platform"
  },
  {
    name: "拼多多",
    value: "pd",
    column: "platform"
  },
  {
    name: "蘑菇街",
    value: "mg",
    column: "platform"
  },
  {
    name: "当当网",
    value: "dd",
    column: "platform"
  },
  {
    name: "贝贝网",
    value: "bb",
    column: "platform"
  },
  {
    name: "阿里巴巴",
    value: "al",
    column: "platform"
  },
  {
    name: "苏宁",
    value: "sn",
    column: "platform"
  },
  {
    name: "亚马逊",
    value: "yx",
    column: "platform"
  },
  {
    name: "洋码头",
    value: "ym",
    column: "platform"
  },
  {
    name: "其他",
    value: "qt",
    column: "platform"
  }
];
/* 	import {
		RosterAdd
	} from '../../requests/login.js' */
export default {
  data() {
    return {
      platformList: [...platformlist],
      formData: {
        platform: "",
        desc: "",
        mobile: "",
        origin: 1
      },
      platform: {
        name: ""
      }
    };
  },
    head() {
    return {
      title: `网店转让-九九牛`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `九九牛是一家集网店交易、入驻、转让等电商综合业务于一体的虚拟资产交易平台，旗下业务覆盖淘宝、天猫、京东、小红书、唯品会等平台，以专业、高效为客户提供最优质的虚拟资产交易服务，为实现共同定义电商新时代的目标不懈努力。丰富行业经验帮您轻松买网店！网店转让交易就上九九牛!`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `网店转让,网店交易，天猫店铺转让,天猫网店转让,网店出售,网店入驻，九九牛`
        }
      ]
    };
  },
  methods: {
    choose(data) {
      this.formData.platform = data.value;
      this.platform = data;
      this.$refs.pop.closeDialog();
    },
    submit() {
      if (!this.formData.platform) {
        this.$toast("请您选择网店平台");
        return;
      }
      if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.formData.mobile)) {
        this.$toast("请您输入正确的手机号码");
        return;
      }

      this.$api.RosterAdd(this.formData).then(res => {
        if (res.status === 1) {
          this.$dialog
            .alert({
              message: "您的请求提交成功，请耐心等待我们和您联系"
            })
            .then(() => {
              this.$router.go(-1);
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
//@import url("../../assets/css/iconfont.css");
.buy {
  padding: 40px 24px 0;

  .red {
    color: #ea1b1b;
  }

  .buy-hint {
    color: #999999;
    font-size: 24px;
    margin-bottom: 30px;
  }

  .buy-row {
    min-height: 110px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: 0 30px;
    font-size: 28px;
    position: relative;
    margin-bottom: 20px;

    input {
      width: 80%;
      font-size: 28px;
    }

    img {
      height: 26px;
      width: 26px;
      margin-right: 18px;
    }

    .right {
      color: #999999;
      position: absolute;
      right: 30px;
    }
  }

  .more {
    height: 312px;

    textarea {
      height: 100%;
      width: 100%;
      font-size: 28px;
    }

    img {
      margin-top: 8px;
    }

    align-items: flex-start;
    padding: 30px 35px;
  }

  .p-class {
    font-size: 28px;
    color: #cccccc;
  }
}

.submit {
  height: 100px;
  line-height: 100px;
  background-color: #f4632c;
  color: #ffffff;
}
.iconfont {
  color: #ccc;
  font-size: 30px;
  margin-right: 10px;
}
// 选平台
.platform-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 24px;

  .pb-item {
    height: 64px;
    width: 140px;
    border-radius: 32px;
    background-color: #f4f4f4;
    line-height: 64px;
    text-align: center;
    margin-bottom: 30px;
  }

  &::after {
    content: "";
    height: 0;
    width: 140px;
    display: block;
    visibility: hidden;
  }
}
.van-button {
  height: 100px;
  border-radius: 16px;
}
</style>
