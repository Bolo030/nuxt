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
        <span class="title">文章详情</span>
        <img
          class="header-right"
          src="~/assets/imgs/user/share.png"
          alt="九九牛分享"
        />
      </div>
    </header>
    <div class="article-info">
      <h1>{{ articleInfo.title }}</h1>
      <div class="article-info-sub">
        <span>发表于 {{ articleInfo.created_at }}</span>
        <span>
          <img class="eye" src="~/assets/imgs/yanjing.png" alt="阅读量图标" />
          {{ articleInfo.browse }}人阅读
        </span>
      </div>
      <ul class="info-tags" v-if="articleInfo.tags.length > 0">
        <li v-for="(item, index) in articleInfo.tags" :key="index">
          <a :href="`/article/list-${articleInfo.label_id}?tid=${item.id}`">{{
            item.name
          }}</a>
        </li>
      </ul>
      <div class="markdown-body" v-html="articleInfo.content">
        <mavon-editor
          :subfield="false"
          :defaultOpen="'preview'"
          :toolbarsFlag="false"
          :editable="false"
          :scrollStyle="true"
          :ishljs="true"
        ></mavon-editor>
      </div>
      <div class="info-page-box">
        <a
          v-if="pages.prev"
          :href="`/article/detail-${pages.prev.id}.html`"
          :title="pages.prev.title"
          >上一篇</a
        >
        <a
          v-if="pages.next"
          :href="`/article/detail-${pages.next.id}.html`"
          :title="pages.next.title"
          >下一篇</a
        >
      </div>
    </div>
    <div class="recommend">
      <h3>好文推荐</h3>
       <ul class="article-list" >
          <li v-for="item in recommend" :key="item.id">
            <a :href="'/article/detail-' + item.id + '.html'">
              <img class="img" :src="item.thumb" alt="九九新闻资讯" />
              <div class="article-list-info">
                <h3>{{ item.title }}</h3>
                <p class="text-wraps">
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
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, app }) {
    let subIndex = params.id.indexOf(".");
    let id = params.id.substring(0, subIndex);
    let res = await app.$api.articleDetail({
      aid: id
    });
    let articleInfo = "";
    if (res.status == 1) {
      articleInfo = res.data;
    }
    let pages = await app.$api.articlesPage(id).then(res => {
      if (res.status == 1) {
        return res.data;
      }
    });
    let recommend = await app.$api
      .articlesRecommend(id)
      .then(res => (res.status === 1 ? res.data.list : []));
    return { articleInfo, pages, recommend };
  },
  data() {
    return {};
  },
  head() {
    return {
      title: `${this.articleInfo.title}-九九牛`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.articleInfo.abstract}`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${this.articleInfo.keywords || this.articleInfo.title}`
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100%;
  padding-bottom: 40px;
}
.markdown-body {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  overflow-x: hidden;
  background: #fff;
  border-radius: 15px;
  font-size: 28px;
  padding-bottom: 24px;
}
.article-info {
  padding: 24px 24px 0;
  box-sizing: border-box;
  font-size: 26px;
  background: #fff;
}
.article-info h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
}
.article-info-sub {
  color: #999999;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin-bottom: 20px;
}
.article-info .eye {
  width: 19px;
  height: 14px;
}
.info-tags {
  height: 106px;
  display: flex;
  align-items: center;
  border-top: solid 1px #ededed;
  li {
    height: 54px;
    line-height: 54px;
    color: #f4632c;
    padding: 0 20px;
    background-color: #ffeae2;
    border-radius: 100px;
    text-align: center;
    margin-right: 13px;
  }
}
.info-page-box {
  height: 122px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: solid 1px #ededed;
  a {
    width: 140px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 6px;
    font-size: 24px;
    border: solid 1px #d9d9d9;
    margin-left: 12px;
  }
}
.recommend {
  margin-top: 20px;
  background: #fff;
  padding: 0 24px 12px;
  >h3 {
    height: 95px;
    line-height: 95px;
    font-size: 30px;
    border-bottom: solid 1px #ededed;
  }
}


 .article-list li a {
  width: 702px;
  height: 240px;
  background-color: #ffffff;
  border-radius: 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
 .article-list li .img {
  object-fit: cover;
  width: 180px;
  height: 180px;
  background-color: #f4f4f4;
  border-radius: 16px;
  flex-shrink: 0;
  margin-right: 20px;
}
 .article-list li .article-list-info {
  color: #999999;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 40px 0;
  .text-wraps{
  margin-bottom: 24px;
  }
}
li+li{
  .article-list-info{
  border-top: 1px solid #ededed;
  }
}
 .article-list li .article-list-info h3 {
  font-size: 28px;
  margin-bottom: 16px;
  color: #1c1c1c;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.article .article-list li .article-list-info p {
  font-size: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
 .article-list li .article-list-info .icon-look {
  width: 19px;
  height: 14px;
  margin-right: 8px;
}
 .article-list li .article-list-info .ai-data,
 .article-list li .article-list-info .ai-data-look {
  display: flex;
  align-items: center;
}
 .article-list li .article-list-info .ai-data {
  justify-content: space-between;
  font-size: 20px;
}
.article .article-list li .article-list-info .icon-look {
  flex-shrink: 0;
  margin-right: 7px;
}
.article-list .interview {
  height: 360px;
  background-color: #ffffff;
  flex-flow: column nowrap;
}
 .article-list .interview .article-item {
  height: 180px;
  border-bottom: 1px solid #ededed;
  display: flex;
}
 .article-list .interview .article-item img {
  height: 150px;
  width: 150px;
  object-fit: cover;
}
 .article-list .interview .article-item .article-list-info h3 {
  margin-top: 15px;
}
 .article-list .interview .interview-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  text-align: center;
  font-size: 20px;
  color: #999999;
}

</style>
