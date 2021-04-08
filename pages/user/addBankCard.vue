<template>
  <div class="container">
    <van-nav-bar title="添加银行卡" left-arrow @click-left="$router.go(-1)" />
    <main class="add-bank">
      <div class="ab-item">
        <p class="ab-label"><span>*</span>银行卡号</p>
        <input type="text" placeholder="请填您的真实姓名" />
      </div>
      <div class="ab-item">
        <p class="ab-label"><span>*</span>所属银行</p>
        <input disabled type="text" placeholder="请选择银行" />
        <div class="choose">
          选择银行
          <van-icon name="arrow" size="13px" color="#4c58b3" />
        </div>
      </div>
      <div class="ab-item">
        <p class="ab-label">开户分支银行 <span>（选填）</span></p>
        <input type="text" placeholder="请填您开户分支银行名称" />
      </div>
      <div class="ab-item">
        <p class="ab-label"><span>*</span>银行预留手机号</p>
        <input type="text" placeholder="请填写该银行卡的预留手机号" />
      </div>
      <div class="ab-item">
        <p class="ab-label"><span>*</span>持卡人真实姓名</p>
        <input type="text" placeholder="请填您持卡人真实姓名" />
      </div>
      <div class="ab-item">
        <p class="ab-label"><span>*</span>持卡人身份证号码</p>
        <input type="text" placeholder="请填您本人的真实身份证号码" />
      </div>
      <button class="ab-btn">立即添加</button>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
  margin: 4vw auto;
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
