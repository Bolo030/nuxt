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
        <span class="title" >资讯攻略</span>
      </div>
    </header>
    <main class="article">
      <ul class="nav">
        <li
          v-for="(item, index) in informationTitle"
          :key="index"
          :class="{ active: index === cuurentActive }"
        >
          <a :href="item.path">{{ item.title }}</a>
        </li>
      </ul>
      <ul class="article-row" v-if="!clientShow">
        <li v-for="item in hotInfo" :key="item.id">
          <a :href="'/article/detail-'+item.id+'.html'">
            <img :src="item.thumb" alt="九九新闻资讯" />
            <p>{{ item.title }}</p>
          </a>
        </li>
      </ul>
      <van-list
         v-model="loading"
         :finished="finished"
         finished-text="没有更多了"
         @load="onLoad"
      >
      <!-- 样式一 -->
        <ul class="article-list" v-if="clientShow">
          <li>
            <a class="interview" :href="'interview-'+item.id+'.html'" v-for="item in hotInfoList" :key="item.id">
              <div class="article-item">
                <img src="" alt="九九新闻资讯" />
                <div class="article-list-info">
                  <h3>{{item.title}}</h3>
                  <p>
                   {{item.abstract}}
                  </p>
                </div>
              </div>
              <div class="interview-bottom">
                <div class="interview-bottom-item">
                  <p class="name">{{item.content.name}}</p>
                  <p>称呼</p>
                </div>
                <div class="interview-bottom-item">
                  <p class="name">{{item.content.store.price}}</p>
                  <p>店铺价格</p>
                </div>
                <div class="interview-bottom-item">
                  <p class="name">{{item.content.store.trademarkType}}</p>
                  <p>商标类型</p>
                </div>
                <div class="interview-bottom-item">
                  <p class="name">{{item.content.store.mainCategory}}</p>
                  <p>所属行业</p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      <!-- 样式二-->
        <ul class="article-list" v-else>
          <li v-for="item in hotInfoList" :key="item.id">
            <a :href="'/article/detail-'+item.id +'.html'">
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
            </a>
          </li>
        </ul>
      </van-list>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      informationTitle: [
        { title: "新闻资讯", path: "/article/list-1" },
        { title: "行业资讯", path: "/article/list-2" },
        { title: "交易攻略", path: "/article/list-4" },
        { title: "系统公告", path: "/article/list-25" },
        { title: "客户采访", path: "/article/list-17" }
      ],
      cuurentActive: 0,
      hotInfo: [],
      hotInfoList: [],
      page: 1,
      per_page: 15,
      start: 0,
      end: 2,
      clientShow: false,
      loading: false,
      finished: false,
      resNewInfo:[],
    };
  },
  async asyncData({ app, params, query }) {
    let start = params.id.indexOf("-");
    let cid = params.id.substring(start + 1);
    let cuurentActive = 0;
    let clientShow = false;
    let { data: res } = await app.$api.articlesInfo({
      cid: cid,
      page: 1,
      per_page: 15,
      need_content: cid == 17
    });
    let hotInfo = res.data.slice(0, 2);
    let hotInfoList = res.data.splice(2);

    if (cid == 1) {
      cuurentActive = 0;
    } else if (cid == 2) {
      cuurentActive = 1;
    }else if (cid == 4) {
      cuurentActive = 2;
    }else if (cid == 25) {
      cuurentActive = 3;
    }else if (cid == 17) {
      cuurentActive = 4;
      clientShow = true;
      hotInfoList.forEach(value => {
        value.content = JSON.parse(value.content)
      });
    }
    return { hotInfo, hotInfoList, cuurentActive,clientShow,cid };
  },
  created() {

  },
  methods: {
    async articleMessage() {
      let { data: res } = await this.$api.articlesInfo({
        cid: this.cid,
        page: this.page,
        per_page: this.per_page
      });
      this.loading = false;
      this.resNewInfo = res.data;
      if(this.resNewInfo.length === 0) return this.finished = true;
      this.hotInfoList = this.hotInfoList.concat(res.data);
    },
    onLoad() {
      if(this.resNewInfo.length < this.per_page && this.resNewInfo.length > 0 ) {
          this.finished = true;
       }else {
         this.page++;
         this.articleMessage()
       }
    },
     /**
      * 判断用户是否登录
     */
    isLogin() {
      if (this.$cookies.get('token')) {
        return true
      }
      return false
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
.article .article-list li a {
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
