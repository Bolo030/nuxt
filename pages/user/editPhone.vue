<template>
  <div class="container">
    <van-nav-bar title="修改手机号" left-arrow @click-left="$router.go(-1)" />
    <main class="modifyPhoneNumber-box">
      <p class="modifyWarmInfo font-size-24">
        <span class="font-main-color">*</span>
        更换现有手机号请确保您的新手机号与原手机号实名信息一致,否
        则将更改失败,更改成功后将采用新手机号进行登录；
      </p>
      <form>
        <ul class="modifyInfo-box">
          <li class="modifyInfo-item1 bg-main-color">
            <h6 class="font-size-24">
              已绑定手机号
              <span>{{ $cookies.get("phone") }}</span>
            </h6>
            <div class="get-code position-r">
              <img src="../../assets/imgs/msg-code-icon.png" alt="信息图标" />
              <input
                type="number"
                v-model="formData.code"
                placeholder="验证码"
              />
              <span
                class="font-size-24"
                @click="getCodeMsg($cookies.get('phone'), 1 + index)"
                >{{
                  isShowCode1 ? "重新获取" + countdown1 : "获取验证码"
                }}</span
              >
            </div>
          </li>
          <li class="modifyInfo-item2 bg-main-color">
            <div class="modifyNewPhone position-r">
              <img src="../../assets/imgs/phone_icon.png" alt="手机图标" />
              <input
                v-model="formData.phone_new"
                type="tel"
                placeholder="请输入您要修改的新手机号码"
              />
            </div>
            <div class="modifyNewPhone position-r">
              <img src="../../assets/imgs/msg-code-icon.png" alt="手机图标" />
              <input
                type="number"
                v-model="formData.code_new"
                placeholder="验证码"
              />
              <span
                class="font-size-24"
                @click="getCodeMsg($cookies.get('phone'), 1 + index)"
                >{{
                  isShowCode1 ? "重新获取" + countdown1 : "获取验证码"
                }}</span
              >
            </div>
            <button
              class="font-size-30 font-weight font-main-color6"
              @click="onSubmit"
            >
              确认更换
            </button>
          </li>
        </ul>
      </form>

      <!-- 弹框确认更换手机号 -->
      <!--  <div class="mask2">
        <ul class="mask2-in">
          <li class="mask2-item1">是否确认更换新手机</li>
          <li class="mask2-item2">
            <button class="cancel-btn2">取消</button>
            <div class="line"></div>
            <button class="font-main-color">确定</button>
          </li>
        </ul>
      </div>
 -->
      <!-- 验证失败弹框 -->
      <!--       <div class="mask2">
        <ul class="mask2-in">
          <li class="mask2-item1">实名信息不一致，修改失败</li>
          <li class="mask2-item2">
            <button class="font-main-color font-main-color">确定</button>
          </li>
        </ul>
      </div> -->
    </main>
  </div>
</template>

<script>
export default {
  async asyncData() {
    return {};
  },
  data() {
    return {
      isShowCode1: false,
      isShowCode2: false,
      countdown1: 60,
      countdown2: 60,
      formData: {
        code: "",
        phone_new: "",
        code_new: ""
      }
    };
  },
  methods: {
    // 获取验证码
    getCodeMsg(phone, index) {
      if (this["isShowCode" + index]) return;
      if (phone.length !== 0) {
        if (!/^1[3456789]\d{9}$/.test(phone))
          return this.$toast("请输入正确的手机格式");
        this["isShowCode" + index] = true;
        this.$api.sendMsg({ type: 9, phone: phone }).then(res => {
          if (res.status !== 1) {
            return this.$toast("服务器繁忙，请稍后发送");
          } else {
            this.$toast(res.message);
          }
        });
        let timer = setInterval(() => {
          if (this["countdown" + index] === 0) {
            this["countdown" + index] = 60;
            this["isShowCode" + index] = false;
            clearInterval(timer);
          } else {
            this["countdown" + index]--;
          }
        }, 1000);
      } else {
        return this.$toast("请填写手机号");
      }
    },
    // 更换手机号
    onSubmit() {
      if (!this.formData.code) return this.$toast("请输入验证码");
      if (!this.formData.code_new) return this.$toast("请输入新验证码");
      if (!this.formData.phone_new) return this.$toast("请输入新手机号");
      let that = this;
      this.$dialog
        .confirm({
          message: "是否确认更换新的手机号"
        })
        .then(() => {
          that.$api.editPhone(this.formData).then(res => {
            if (res.status == 1) {
              that.$toast.success("更换成功");
              that.$cookies.set("phone", this.formData.phone_new,{expires:this.$store.state.auth.cookieMaxExpires,path:'/'});
              this.$router.go(-1);
            } else {
              this.$dialog
                .alert({
                  message: "实名信息不一致，修改失败"
                })
                .then(() => {
                  // on close
                });
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.modifyPhoneNumber-box {
  padding: 0 3.2vw;
}

.modifyWarmInfo {
  line-height: 5.3333vw;
  margin: 4vw 0;
}

.modifyInfo-box .modifyInfo-item1 {
  padding: 6.6667vw 4vw;
  border-radius: 2.1333vw;
}

.modifyInfo-box .modifyInfo-item1 .get-code img {
  position: absolute;
  top: 8.9333vw;
  left: 4.5333vw;
  width: 4.8vw;
  height: 4.8vw;
}

.modifyInfo-box .modifyInfo-item1 .get-code input {
  height: 14.6667vw;
  width: 100%;
  border-radius: 2.1333vw;
  margin-top: 4vw;
  padding-left: 11.7333vw;
  box-sizing: border-box;
  background: #f4f4f4;
}

.modifyInfo-box .modifyInfo-item1 .get-code span {
  position: absolute;
  right: 4.5333vw;
  top: 6.9333vw;
  padding: 2vw;
  border-radius: 3.3333vw;
  border: 0.1333vw solid #f4632c;
  color: #f4632c;
}

.modifyInfo-box .modifyInfo-item2 {
  margin-top: 2.6667vw;
  padding: 6.6667vw 4vw;
  border-radius: 2.1333vw;
}

.modifyInfo-box .modifyInfo-item2 .modifyNewPhone {
  margin-bottom: 2.6667vw;
}

.modifyInfo-box .modifyInfo-item2 .modifyNewPhone img {
  position: absolute;
  left: 4.5333vw;
  top: 50%;
  transform: translateY(-50%);
  width: 4.8vw;
}

.modifyInfo-box .modifyInfo-item2 .modifyNewPhone input {
  height: 14.6667vw;
  width: 100%;
  border-radius: 2.1333vw;
  padding-left: 11.7333vw;
  box-sizing: border-box;
  background: #f4f4f4;
}

.modifyInfo-box .modifyInfo-item2 .modifyNewPhone span {
  position: absolute;
  right: 4.5333vw;
  top: 50%;
  transform: translateY(-50%);
  padding: 2vw;
  border-radius: 3.3333vw;
  border: 0.1333vw solid #f4632c;
  color: #f4632c;
}
.active {
  border: 0.1333vw solid #f5b69e;
  color: #f5b69e;
}
.modifyInfo-box .modifyInfo-item2 button {
  width: 100%;
  height: 13.3333vw;
  margin-top: 4vw;
  border-radius: 2.1333vw;
  background: #f4632c;
}
</style>
