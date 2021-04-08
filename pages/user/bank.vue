<template>
  <div class="container">
    <van-nav-bar title="银行卡管理" left-arrow @click-left="$router.go(-1)" />
    <main class="bank">
      <ul class="bank-list">
        <li class="bank-list-item" v-for="(item, index) in list" :key="index">
          <img class="bank-icon" :src="item.bank_data.logo" alt="九九牛银行" />
          <div class="bank-list-left">
            <p class="name">{{ item.bank_data.name }}</p>
            <p>{{ item.bank }}</p>
          </div>
          <span class="code">**** {{ item.simple_number }}</span>
        </li>
      </ul>
      <div class="btn-box">
        <button @click="$router.push('/user/addBankCard')">
          <i class="icontianjia iconfont"></i>
          <span>添加银行卡</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    let list = await app.$api
      .getMyBank()
      .then(res => (res.status == 1 ? res.data.list : []));
    return {
      list
    };
  },
  data() {
    return {
      list: []
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.container{
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
</style>
