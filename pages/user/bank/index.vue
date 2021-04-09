<template>
  <div class="container">
    <van-nav-bar title="银行卡管理" left-arrow @click-left="$router.go(-1)" />
    <main class="bank">
      <ul class="bank-list">
        <van-swipe-cell  v-for="(item, index) in list" :key="index">
          <li class="bank-list-item">
            <img
              class="bank-icon"
              :src="item.bank_data.logo"
              alt="九九牛银行"
            />
            <div class="bank-list-left">
              <p class="name">{{ item.bank_data.name }}</p>
              <p>{{ cardType[item.cardType] || "" }}</p>
            </div>
            <span class="code">**** {{ item.simple_number }}</span>
          </li>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="delCard(item)"
            />
          </template>
        </van-swipe-cell>
      </ul>
      <div class="btn-box">
        <button @click="$router.push('/user/bank/addBankCard')">
          <i class="icontianjia iconfont"></i>
          <span>添加银行卡</span>
        </button>
      </div>
    </main>
    <footer class="mask" v-if="real.need_confirm">
      <div class="bank-confirm">
        <p>
          检测到您当前添加的<span>银行卡信息</span>与当前<span>账号手机信息</span>一
          致，是否利用此信息完成账号实名认证；
        </p>
        <div class="bank-confirm-btn">
          <button class="active" @click="authentication">是</button>
          <button @click="real.need_confirm = false">否</button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  async asyncData({ app, store }) {
    let real = store.state.auth.real;
    console.log(real,'real')
    let list = await app.$api
      .getMyBank()
      .then(res => (res.status == 1 ? res.data.list : []));
    return {
      list,
      real
    };
  },
  data() {
    return {
      list: [],
      cardType: {
        DC: "储蓄卡",
        CC: "信用卡"
      },
      real: {
        need_confirm: false
      }
    };
  },
  methods: {
    authentication() {
      this.$api.bindReal(this.real.real_id).then(res => {
        if (res.status == 1) {
          this.$toast.success("实名认证完成");
          this.real.need_confirm = false;
        }
      });
    },
    getData(){
      this.$api
      .getMyBank()
      .then(res => {
        if(res.status==1){
          this.list=res.data.list
        }
      });
    },
    delCard(item){
      this.$api.bankDel({id:item.id}).then(res=>{
        if(res.status==1){
          this.$toast.success('删除成功');
          this.getData()
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
}
.bank {
  padding: 4vw 3.2vw 150px;
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
  position: fixed;
  bottom: 100px;
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
  height: 127.2vw;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 2.1333vw;
  margin: 4vw auto;
  padding: 5.3333vw 4vw;
}
.ab-item {
  margin-bottom: 4.4vw;
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
.delete-button {
  height: 100%;
}
</style>
