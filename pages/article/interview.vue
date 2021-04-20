<template>
  <div class="container">
    <header id="header">
      <div class="header-content">
        <a href="javascript:history.go(-1)">
          <img
            class="back"
            src="~/assets/imgs/store/rectangle.png"
            alt="九九牛返回"
          />
        </a>
        <span class="title">采访详情</span>
      </div>
    </header>
    <div class="interview-info com-box">
      <div class="head">
        <div class="head-user flex-vertical">
          <img
            class="head-user-avatar"
            :src="interviewInfo.thumb"
            alt="九九牛头像"
          />
          <ul class="head-user-info flex-vertical">
            <li>
              <p>{{ interviewInfo.content.name }}</p>
              <p>称呼</p>
            </li>
            <li>
              <p>{{ interviewInfo.content.store.price }}</p>
              <p>店铺价格</p>
            </li>
            <li>
              <p>{{ interviewInfo.content.store.trademarkType }}</p>
              <p>商标类型</p>
            </li>
            <li>
              <p>{{ interviewInfo.content.store.mainCategory }}</p>
              <p>所属行业</p>
            </li>
          </ul>
        </div>
        <div class="head-introduce">
          <h3>{{ interviewInfo.title }}</h3>
          <p>
            {{ interviewInfo.abstract }}
          </p>
        </div>
      </div>
    </div>
    <div class="com-box record">
      <h4>回访记录</h4>
      <div v-for="(item,index) in interviewInfo.content.list" :key="index" class="interview-box">
        <div class="record-item record-reverse">
          <img class="avatar" src="~/assets/imgs/counselor-icon.png" alt="九九牛头像" />
          <div class="record-item-box">
            <div class="record-item-chat">
             {{item.jjn}}
            </div>
          </div>
        </div>
        <div class="record-item">
          <img class="avatar" :src="interviewInfo.content.bigThumb" alt="九九牛头像" />
          <div class="record-item-box">
            <p>{{ interviewInfo.content.name }}</p>
            <div class="record-item-chat left">{{item.customer}}</div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, app }) {
    let subIndex = params.id.indexOf('.')
    let interviewInfo = await app.$api.articleDetail({ aid: params.id.substring(0,subIndex) }).then(res=>res.status==1?res.data:{});
    interviewInfo.content = JSON.parse(interviewInfo.content);
    return { interviewInfo };
  },
   head() {
    return {
      title: `${this.interviewInfo.title}-九九牛`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.interviewInfo.abstract}`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${this.interviewInfo.title}`
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.container {
  padding-bottom: 50px;
}
.interview-box {
  margin-bottom: 50px;
}
.interview-info {
  padding: 20px 24px;
  box-sizing: border-box;
}
.interview-info .head .head-user-avatar {
  width: 122px;
  height: 122px;
  border-radius: 10px;
  flex-shrink: 0;
}
.interview-info .head .head-user {
  border-bottom: 1px solid #ededed;
  padding-bottom: 38px;
  margin-bottom: 40px;
}
.interview-info .head .head-user-info {
  justify-content: space-between;
  width: 85%;
  text-align: center;
}
.interview-info .head .head-user-info li {
  position: relative;
  width: 25%;
}
.interview-info .head .head-user-info li::after {
  content: "";
  display: block;
  width: 1px;
  height: 55px;
  background-color: #ededed;
  position: absolute;
  right: 0;
  top: 10px;
}
.interview-info .head .head-user-info li:last-of-type::after {
  display: none;
}
.interview-info .head .head-user-info li p:first-of-type {
  color: #000000;
  font-size: 24px;
  margin-bottom: 5px;
}
.interview-info .head .head-user-info li p:last-of-type {
  font-size: 20px;
  color: #999999;
}
.interview-info .head .head-introduce {
  font-size: 26px;
  color: #666666;
  line-height: 45px;
}
.interview-info .head .head-introduce h3 {
  font-size: 30px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 20px;
  line-height: 30px;
}

.record h4 {
  font-size: 30px;
  margin-bottom: 50px;
}
.record .record-item {
  display: flex;
}
.record .record-item .avatar {
  width: 74px;
  height: 75px;
  border-radius: 10px;
}
.record .record-item + .record-item {
  margin-top: 50px;
}
.record .record-item-box {
  margin-left: 28px;
}
.record .record-item-box p {
  margin-bottom: 5px;
}
.record .record-item-chat {
  padding: 20px 30px;
  box-sizing: border-box;
  background-color: #f4f4f4;
  border-radius: 16px;
  position: relative;
  max-width: 449px;
  word-wrap: break-word;
  word-break: break-all;
}
.record .record-item-chat::after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4.5px 4px 4.5px 0;
  border-color: transparent #f4f4f4 transparent transparent;
  position: absolute;
  top: 7px;
}
.record .left::after {
  left: -4.5px;
}
.record .record-reverse {
  flex-direction: row-reverse;
}
.record .record-reverse .record-item-box {
  margin-right: 28px;
}
.record .record-reverse .record-item-chat {
  background-color: #9eea6a;
}
.record .record-reverse .record-item-chat::after {
  right: -4px;
  border-width: 4.5px 0 4.5px 4px;
  border-color: transparent transparent transparent #9eea6a;
}

.com-box {
  width: 702px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 30px;
  box-sizing: border-box;
  margin: 20px auto;
}
</style>
