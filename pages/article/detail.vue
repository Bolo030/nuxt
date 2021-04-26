<template>
  <div>
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
      <h1>{{articleInfo.title}}</h1>
      <div class="article-info-sub">
        <span>发表于 {{ articleInfo.created_at }}</span>
        <span>
          <img class="eye" src="~/assets/imgs/yanjing.png" alt="阅读量图标"/>
          {{articleInfo.browse}}人阅读
        </span>
      </div>
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
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, app }) {
    let subIndex = params.id.indexOf(".");
    let res = await app.$api.articleDetail({
      aid: params.id.substring(0, subIndex)
    });
    let articleInfo = "";
    if (res.status !== 1) {
      return console.log("操作失败");
    } else {
      articleInfo = res.data;
    }
    return { articleInfo };
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
          content: `${this.articleInfo.keywords||this.articleInfo.title}`
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.markdown-body {
  width: 100%;
  height: 100%;
  padding: 8px 25px 15px 25px;
  overflow-y: auto;
  box-sizing: border-box;
  overflow-x: hidden;
  background: #fff;
  border-radius: 15px;
}
.article-info {
  padding: 24px;
  box-sizing: border-box;
  font-size: 26px;
}
.article-info h1 {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 15px;
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
</style>
