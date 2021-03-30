<template>
  <div class="search-page">
    <div class="search-box">
      <div class="search-item">
        <img src="../../assets/imgs/store/search.png" />
        <input
          class="search-input"
          type="text"
          placeholder="输入搜索的内容"
          @keyup.enter="getSearchInfo(searchContent, true)"
          v-model="searchContent"
        />
      </div>
      <div @click="cancel">取消</div>
    </div>

    <div class="hot-search history">
      <div class="history-head">
        <div class="hotSearch-title">历史记录</div>
        <div class="empty" @click="clearAll">清除</div>
      </div>
      <div class="hotSearch-item">
        <div
          class="text"
          v-for="(item, index) in history"
          :key="index"
          @click="getSearchInfo(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>

    <div class="hot-search">
      <div class="hotSearch-title">牛牛热搜</div>
      <div class="hotSearch-item">
        <div
          class="text"
          v-for="(item, index) in hotList"
          :key="index"
          :class="index < 2 ? 'hot-text' : ''"
          @click="getSearchInfo(item)"
        >
          <img
            src="../../assets/imgs/store/ic_search_hot.png"
            v-if="index < 2"
          />
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {},
  async asyncData({ app, params, query }) {
    let { searchContent, platform } = query;
    let history = [];
    let hotList = await app.$api
      .getHotSearch(24)
      .then(res =>
        res.status == 1 ? JSON.parse(res.data.content)[platform] : []
      );
      console.log(app.$cookies.get("history"))

    if(app.$cookies.get("history"))
      history=[...app.$cookies.get("history")]
    return {
      searchContent,
      platform,
      hotList,
      history
    };
  },
  data() {
    return {
      searchContent: "",
      hotList: [],
      history: [],
      platform: "tm"
    };
  },
  methods: {
    getSearchInfo(value, save = false) {
      if (save) {
        this.history.unshift(value);
        if (this.history.length > 10) this.history = this.history.slice(0, 12);
        this.$cookies.set("history", JSON.stringify(this.history));
      }
      this.$router.push(`/${this.platform}/w${value}`);
    },
    cancel() {
      this.$router.go(-1);
    },
    clearAll() {
      this.history = [];
      this.$cookies.remove("history");
    }
  }
};
</script>

<style lang="scss" scoped>
.search-page {
  min-height: 100%;
}
.search-box {
  padding: 0 24px;
  height: 145px;
  background: #fff;
  border-bottom: 1px solid #ededed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search-item {
    padding-left: 34px;
    display: flex;
    flex: 1;
    align-items: center;
    border-radius: 42px;
    margin-right: 34px;
    background: #f4f4f4;
    height: 84px;
    img {
      width: 32px;
      height: 29px;
    }
    .search-input {
      flex: 1;
      height: 84px;
      padding-left: 14px;
    }
  }
}
.hot-search {
  padding: 26px 24px 0;
  background: #fff;
  .hotSearch-title {
    height: 65px;
    line-height: 65px;
    color: #1c1c1c;
    font-size: 28px;
    font-weight: 700;
  }
  .hotSearch-item {
    display: flex;
    flex-wrap: wrap;
    .text {
      display: flex;
      align-items: center;
      padding: 20px 28px;
      background: #f4f4f4;
      border-radius: 100px;
      font-size: 24px;
      margin-bottom: 20px;
      margin-right: 20px;
      img {
        width: 22px;
        height: 30px;
        margin-right: 10px;
      }
    }
    .hot-text {
      color: #f4632c;
      background: #ffebe4;
    }
  }
}

.history {
  margin-bottom: 20px;
  .history-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .empty {
      font-size: 24px;
      color: #999999;
    }
  }
}
</style>
