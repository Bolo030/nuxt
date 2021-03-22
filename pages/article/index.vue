<template>
  <div>
    <header id="header">
      <div class="header-content">
        <a href="javascript:history.go(-1)">
          <img
            class="back"
            src="~assets/imgs/store/rectangle.png"
            alt="九九牛返回"
          />
        </a>
        <span class="title">资讯攻略</span>
      </div>
    </header>
    <main class="article">
      <ul class="nav">
        <li
          v-for="(item, index) in informationTitle"
          :key="index"
          :class="{ active: index === cuurentActive }"
          @click="event(index)"
        >
          {{ item.title }}
        </li>
      </ul>
      <ul class="article-row" v-if="!clientShow">
        <li v-for="item in hotInfo" :key="item.id">
          <a href="javascript:;">
            <img :src="item.thumb" alt="九九新闻资讯" />
            <p>{{ item.title }}</p>
          </a>
        </li>
      </ul>
      <!-- 样式一 -->
      <ul class="article-list" v-if="clientShow">
        <li >
          <a class="interview" href="./interviewInfo.html">
            <div class="article-item">
              <img src="" alt="九九新闻资讯" />
              <div class="article-list-info">
                <h3>2020九九牛年末团建：初心不改</h3>
                <p>
                  为向大家提供最优质的虚拟资产交易服务，经过4个月的精心策划与准备
                </p>
              </div>
            </div>
            <div class="interview-bottom">
              <div class="interview-bottom-item">
                <p class="name">罗先生</p>
                <p>称呼</p>
              </div>
              <div class="interview-bottom-item">
                <p class="name">27W</p>
                <p>店铺价格</p>
              </div>
              <div class="interview-bottom-item">
                <p class="name">R标</p>
                <p>商标类型</p>
              </div>
              <div class="interview-bottom-item">
                <p class="name">数码</p>
                <p>所属行业</p>
              </div>
            </div>
          </a>
        </li>
      </ul>
       <!-- 样式二-->
      <ul class="article-list" v-else>
        <li v-for="item in hotInfoList" :key="item.id">
          <img :src="item.thumb" alt="九九新闻资讯" />
          <div class="article-list-info">
            <h3>{{ item.title }}</h3>
            <p>
              {{ item.abstract }}
            </p>
            <div class="ai-data">
              <div class="ai-data-look">
                <img
                  class="icon-look"
                  src="~assets/imgs/yanjing.png"
                  alt="九九牛浏览"
                />
                <span>{{ item.fsbrowse }}</span
                >人阅读
              </div>
              <span>{{ item.created_at }}</span>
            </div>
          </div>
        </li>
      </ul>
      <p class="text-center">没有更多数据了</p>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      informationTitle: [
        { title: "新闻资讯" },
        { title: "行业资讯" },
        { title: "交易攻略" },
        { title: "系统公告" },
        { title: "客户采访" }
      ],
      cuurentActive: 0,
      hotInfo: [],
      hotInfoList: [],
      page: 1,
      per_page: 15,
      start: 0,
      end: 2,
      clientShow:false,
    };
  },
  async asyncData({ app }) {
    let { data: res } = await app.$api.articlesInfo({
      cid: 1,
      page: 1,
      per_page: 15
    });

    let hotInfo = res.data.slice(0, 2);
    let hotInfoList = res.data.splice(2);

    return { hotInfo, hotInfoList };
  },

  methods: {
    event(cuurentActive) {
      let obj = {
        page: this.page,
        per_page: this.per_page,
        start: this.start,
        end: this.end
      };
      this.clientShow = false;
      this.cuurentActive = cuurentActive;
      if (cuurentActive === 0) {
        obj.cid = 1;
        this.articleMessage(obj);
      } else if (cuurentActive === 1) {
        obj.cid = 2;
        this.articleMessage(obj);
      } else if (cuurentActive === 2) {
        obj.cid = 4;
        this.articleMessage(obj);
      } else if (cuurentActive === 3) {
        obj.cid = 25;
        this.articleMessage(obj);
      } else if (cuurentActive === 4) {
        obj.cid = 17;
        obj.end = 0;
        this.clientShow = true
        this.articleMessage(obj);
      }
    },
    async articleMessage(data) {
      let { data: res } = await this.$api.articlesInfo({
        cid: data.cid,
        page: data.page,
        per_page: data.per_page
      });
      this.hotInfo = res.data.slice(data.start, data.end);
      this.hotInfoList = res.data.splice(data.end);
    }
  }
};
</script>

<style lang="scss" scoped>
.article {
  font-family: PingFang SC;
  font-size: 28px;
}
.article img {
  display: block;
}
.article a {
  display: block;
}
.article .nav {
  height: 100px;
  line-height: 100px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  margin-bottom: 20px;
  font-size: 30px;
}
.article .nav .active {
  color: #f4632c;
  font-weight: bold;
}
.article .article-row {
  width: 702px;
  height: 350px;
  background-color: #ffffff;
  border-radius: 16px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  box-sizing: border-box;
}
.article .article-row a {
  width: 310px;
  height: 298px;
}
.article .article-row a img {
  width: 310px;
  height: 200px;
  background-color: #f4f4f4;
  border-radius: 16px;
  margin-bottom: 18px;
}
.article .article-row a p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.article .article-list {
  padding: 24px;
}
.article .article-list li {
  width: 702px;
  height: 240px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 30px;
  box-sizing: border-box;
  margin-top: 20px;
  display: flex;
}
.article .article-list li img {
  width: 180px;
  height: 180px;
  background-color: #f4f4f4;
  border-radius: 16px;
  flex-shrink: 0;
  margin-right: 20px;
}
.article .article-list li .article-list-info {
  color: #999999;
  box-sizing: border-box;
  overflow: hidden;
}
.article .article-list li .article-list-info h3 {
  font-size: 28px;
  margin-bottom: 16px;
  color: #1c1c1c;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.article .article-list li .article-list-info p {
  font-size: 24px;
  margin-bottom: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.article .article-list li .article-list-info .icon-look {
  width: 19px;
  height: 14px;
}
.article .article-list li .article-list-info .ai-data,
.article .article-list li .article-list-info .ai-data-look {
  display: flex;
  align-items: center;
}
.article .article-list li .article-list-info .ai-data {
  justify-content: space-between;
  font-size: 20px;
}
.article .article-list li .article-list-info .icon-look {
  flex-shrink: 0;
  margin-right: 7px;
}
.article .article-list .interview {
  height: 360px;
  background-color: #ffffff;
  flex-flow: column nowrap;
}
.article .article-list .interview .article-item {
  height: 180px;
  border-bottom: 1px solid #ededed;
  display: flex;
}
.article .article-list .interview .article-item img {
  height: 150px;
  width: 150px;
}
.article .article-list .interview .article-item .article-list-info h3 {
  margin-top: 15px;
}
.article .article-list .interview .interview-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  text-align: center;
  font-size: 20px;
  color: #999999;
}
.article .article-list .interview .interview-bottom .name {
  font-size: 24px;
  margin-bottom: 6px;
  color: #000;
}
.article .article-list .interview .interview-bottom .interview-bottom-item {
  position: relative;
  width: 25%;
}
.article
  .article-list
  .interview
  .interview-bottom
  .interview-bottom-item::after {
  content: "";
  display: block;
  width: 1px;
  height: 55px;
  background-color: #ededed;
  position: absolute;
  right: 0;
  top: 10px;
}
.article
  .article-list
  .interview
  .interview-bottom
  .interview-bottom-item:last-of-type::after {
  display: none;
}
.article .text-center {
  padding: 10px 0;
}
</style>
