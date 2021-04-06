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
      <h3>{{articleInfo.title}}</h3>
      <div class="article-info-sub">
        <span>发表于 {{articleInfo.created_at}}</span>
        <span>
          <img class="eye" src="~/assets/imgs/yanjing.png" />
          {{articleInfo.browse}}人阅读
        </span>
      </div>
      <div class="">
        <no-ssr>
          <mavon-editor 
           :subfield = "false"
           :defaultOpen = "'preview'"
           :toolbarsFlag = "false"
           :editable="false"
           :scrollStyle="true"
           :ishljs = "true"
          v-model="articleInfo.content"></mavon-editor>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, app }) {
    let subIndex = params.id.indexOf('.')
    let res = await app.$api.articleDetail({ aid: params.id.substring(0,subIndex) });
    let articleInfo = ''
    if (res.status !== 1) {
      return console.log("操作失败");
    } else {
       articleInfo = res.data;  
    }
    return {articleInfo}
  }
};
</script>

<style lang="scss" scoped>
.article-info {
  padding: 24px;
  box-sizing: border-box;
  font-size: 26px;
}
.article-info h3 {
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
