<template>
  <div class="container">
    <van-nav-bar
      title="银行卡号验证实名"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <header class="head">
      <span>*</span>您选择了用银行卡号进行实名验证，请确保所填信息真实有效<span
        >（ 如用于账号实名请保证银行预留手机号与您当前账号手机号码一致）</span
      >
      ，否则将认证失败，失败次数超过<span> 5次 </span>将取消您的认证资格！
    </header>
    <main class="add-bank">
      <div class="ab-item">
        <p class="ab-label"><span>*</span>银行卡号</p>
        <input
          v-model="formData.bank_number"
          @input="getCardInfo"
          type="text"
          placeholder="请输入您认证的银行卡号"
        />
      </div>
      <div class="ab-item" @click="$router.push('/user/bank/openBank')">
        <p class="ab-label"><span>*</span>所属银行</p>
        <input
          disabled
          v-model="openBank.name"
          type="text"
          placeholder="请选择银行"
        />
        <div class="choose">
          选择银行
          <van-icon name="arrow" size="13px" color="#4c58b3" />
        </div>
      </div>
      <div class="ab-item">
        <p class="ab-label">开户分支银行 <span>（选填）</span></p>
        <input
          v-model="formData.bank_name"
          type="text"
          placeholder="请填您开户分支银行名称"
        />
      </div>
      <div class="ab-item">
        <p class="ab-label"><span>*</span>银行预留手机号</p>
        <input
          v-model="formData.phone"
          type="number"
          placeholder="请填写该银行卡的预留手机号"
        />
      </div>
      <div class="ab-item">
        <p class="ab-label"><span>*</span>持卡人真实姓名</p>
        <input
          type="text"
          v-model="formData.realname"
          placeholder="请填您持卡人真实姓名"
        />
      </div>
      <div class="ab-item">
        <p class="ab-label"><span>*</span>持卡人身份证号码</p>
        <input
          v-model="formData.identity"
          type="text"
          placeholder="请填您本人的真实身份证号码"
        />
      </div>
      <button class="ab-btn" @click="onSubmit">立即认证</button>
    </main>
  </div>
</template>

<script>
export default {
  asyncData({ app, store,query }) {
    let openBank = store.state.auth.openBank;
    let type=query.type||false
    console.log(openBank, "openBank");
    return {
      openBank,
      type
    };
  },
  data() {
    return {
      formData: {
        bank_number: "",
        bank: "",
        bank_name: "",
        phone: "",
        realname: "",
        identity: "",
        card_type: "DC",
        is_account_real_name:false
      },
      type:false,
      openBank: {}
    };
  },
  methods: {
    getCardInfo() {
      if (this.$utils.bankCardLuhn(this.formData.bank_number)) {
        this.cardInfo();
      }
    },
    cardInfo() {
      this.$api
        .getBankType({ bank_number: this.formData.bank_number })
        .then(res => {
          if (res.status == 1) {
            this.openBank = res.data.bank;
            this.formData.card_type = res.data.card_type;
          }
        });
    },
    onSubmit() {
      this.formData.bank = this.openBank.code;
      this.formData.is_account_real_name = Boolean(this.type);
      if (!this.formData.bank_number) return this.$toast("请输入银行卡号");
      if (!this.formData.bank) return this.$toast("请选择所属银行");
      if (!this.formData.bank_name)
        return this.$toast("请填写您的开户分支行银行名称");
      if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.formData.phone))
        return this.$toast("请您输入正确的手机号码");
      if (!this.formData.realname) return this.$toast("请填您持卡人真实姓名");
      if (
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.formData.identity)
      )
        return this.$toast("请输入身份证号");
      this.$api.realBank(this.formData).then(res => {
        if (res.status == 1) {
          this.$toast.success("添加成功");
          this.$store.commit("auth/UPDATE_REAL", res.data);
          this.$router.push('/user/auth/success?type='+this.type);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
header{
  font-size: 24px;
  padding: 30px 24px 0;
  line-height: 40px;
  span{
    color: #f4632c;
  }
}
.bank {
  padding: 4vw 3.2vw;
}
.bank-icon {
  width: 10.6667vw;
  height: 10.6667vw;
  margin-right: 2.6667vw;
}
.bank-list {
}
.bank-list-item {
  display: flex;
  align-items: center;
  height: 24vw;
  background-color: #ffffff;
  border-radius: 2.1333vw;
  padding: 0 2.6667vw;
  box-sizing: border-box;
  font-size: 3.2vw;
  color: #999999;
  position: relative;
  margin-bottom: 2.6667vw;
}
.bank-list-item .name {
  margin-bottom: 1.3333vw;
  font-size: 4vw;
  color: #000000;
}
.code {
  position: absolute;
  right: 4vw;
}
.btn-box button {
  width: 93.6vw;
  height: 13.3333vw;
  background-color: #f4632c;
  border-radius: 2.1333vw;
  display: block;
  margin: 0 auto;
  color: #ffffff;
  font-size: 4vw;
}
.btn-box i {
  font-size: 3.4667vw;
  color: #ffffff;
  margin-right: 1.3333vw;
}

.bank-confirm {
  width: 93.6vw;
  height: 33.3333vw;
  background-color: #ffffff;
  border-radius: 2.1333vw;
  position: absolute;
  bottom: 4vw;
  left: 50%;
  transform: translateX(-50%);
  z-index: 666;
  font-size: 3.4667vw;
  padding: 4vw;
  box-sizing: border-box;
}
.bank-confirm p {
  margin-bottom: 5.3333vw;
  line-height: 6vw;
}
.bank-confirm span {
  color: #f4632c;
}
.bank-confirm-btn {
  display: flex;
  flex-direction: row-reverse;
}
.bank-confirm-btn button {
  width: 13.3333vw;
  height: 7.2vw;
  background-color: #ffebe4;
  border-radius: 3.6vw;
  color: #f4632c;
}
.bank-confirm-btn button.active {
  background-color: #f4632c;
  color: #ffffff;
  margin-left: 2.6667vw;
}

/* 添加银行卡 */
.add-bank {
  width: 93.6vw;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 2.1333vw;
  margin: 3vw auto;
  padding: 5.3333vw 4vw;
}
.ab-item {
  margin-bottom: 4.4vw;
  position: relative;
  .choose {
    display: flex;
    align-items: center;
    color: #4c58b3;
    position: absolute;
    right: 0;
    bottom: 40px;
    right: 20px;
  }
}
.ab-item .ab-label {
  margin-bottom: 2.6667vw;
  font-size: 3.2vw;
  line-height: 3.2vw;
}
.ab-item .ab-label span {
  color: #f4632c;
}
.ab-item input {
  width: 85.6vw;
  height: 14.6667vw;
  background-color: #f4f4f4;
  border-radius: 2.1333vw;
  padding: 0 4.5333vw;
  box-sizing: border-box;
}
.ab-btn {
  width: 85.6vw;
  height: 13.3333vw;
  background-color: #f4632c;
  border-radius: 2.1333vw;
  font-size: 4vw;
  color: #ffffff;
  margin-top: 3.6vw;
}
</style>
