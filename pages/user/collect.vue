<template>
  <div>
    <header id="header">
      <div class="header-content">
        <a href="javascript:history.go(-1)" title="返回箭头"
          ><img
            class="back"
            src="~/assets/imgs/store/rectangle.png"
            alt="九九牛返回"
        /></a>
        <span class="title">我的收藏</span>
        <button class="font-size-28 edit" @click="editor">
          {{ isEditor ? "完成" : "编辑" }}
        </button>
      </div>
    </header>
    <main class="my-favorite ">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 编辑状态下显示的内容 -->
        <ul
          class="favorite-store-list bg-main-color"
          v-for="(item, index) in storeList"
          :key="item.id"
          @click="jumpInfo(item)"
        >
          <li class="d-f d-f-between">
            <span class="font-size-24 font-main-color2"
              >店铺编号: {{ item.store.code }}
            </span>
            <span class="font-main-color font-size-28 font-weight">{{
              item.store.parse_status
            }}</span>
          </li>
          <li class="middle-desc bg-main-color6 d-f"  >
            <img :src="item.store_icon_path" :alt="$utils.getPname(item.store.platform)+'网店'" />
            <p
              class="middle-desc-r font-weight font-size-26 text-wraps"
              v-if="item.store.name === ''"
            >
              {{ item.store.title }}
            </p>
            <div class="middle-desc-r" v-else>
              <h4 class="font-weight font-size-26">{{ item.store.name }}</h4>
              <p class="text-wrap font-size-24 font-main-color2">
                {{ item.store.title }}
              </p>
            </div>
          </li>
          <li class="bottom-price font-main-color d-f d-f-between">
            <div class="bottom-price-l">
              <span class="font-szie-24">售价</span>
              <span class="font-weight font-size-24">￥</span>
              <span class="font-weight font-size-34">{{
                item.store.parse_price
              }}</span>
            </div>
            <div class="bottmo-select-r" v-if="isEditor" @click.stop="choose(item, index)">
              <van-checkbox
                v-model="item.checked"
                checked-color="#f4632c"
                class="singleChose"
              ></van-checkbox>
            </div>
          </li>
        </ul>
      </van-list>
    </main>
    <div
      class="my-favorite-footer bg-main-color d-f d-f-between"
      v-if="isEditor"
    >
      <div class="favorite-l">
        <van-checkbox
          checked-color="#f4632c"
          @click="allCheck"
          v-model="checked"
          >全选</van-checkbox
        >
      </div>
      <button
        class="favorite-r font-main-color6 font-size-26"
        id="deletBtn"
        @click="deletes"
      >
        删除 ({{ getStoreListLength }})
      </button>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    let storeList = null;
    if (!app.$cookies.get("token")) {
      return console.log("toke不存在1");
    } else {
      let result = await app.$api.collectStore({ page: 1, per_page: 15 });
      if (result.status !== 1) return;
      storeList = result.data.data;
      storeList.forEach((value, index) => {
        value.checked = false;
        value.store_icon_path = require(`~/assets/imgs/icon_${value.store.platform}.png`);
      });
    }
    return { storeList };
  },
  data() {
    return {
      checked: false,
      isEditor: false,
      chooseArray: [],
      storeList: [],
      deleteList: [],
      newStoreList: [],
      page:1,
      per_page: 15,
      loading: false,
      finished: false,
    };
  },
  methods: {
    editor() {
      this.isEditor = !this.isEditor;
    },
    choose(item, index) {
      this.storeList[index].checked=!item.checked
    },
    allCheck() {
      this.storeList.forEach(value => {
        value.checked = this.checked;
      });
    },
    deletes() {
      if (this.chooseArray.length === 0)
        return this.$toast("当前没有选中删除店铺");
      this.$dialog
        .confirm({
          title: "",
          message: "是否确认删除所选内容"
        })
        .then(() => {
          this.deleteStore();
        })
        .catch(() => {});
    },
    async deleteStore() {
      this.chooseArray.forEach(value => {
        this.deleteList.push(value.store.key);
      });
      let res = await this.$api.deleteCollect({
        mode: "more",
        keys: this.deleteList
      });
      if (res.status != 1) //return this.$toast("删除失败！");
      this.$toast(res.message);
      this.aginRequest(false);
    },
    async aginRequest(options) {
      console.log(this.page);
      let result = await this.$api.collectStore({ page: options?this.page:1, per_page: this.per_page });
      if (result.status !== 1) return;
      if(!options) {
        this.storeList = result.data.data;
      }else {
        this.loading = false;
        this.newStoreList = result.data.data;
        if(this.newStoreList.length === 0) return this.finished = true;
        this.storeList = this.storeList.concat(this.newStoreList);
      };
      this.storeList.forEach((value, index) => {
        this.$set(this.storeList[index], "checked", false);
         value.store_icon_path = require(`~/assets/imgs/icon_${value.store.platform}.png`);
      });
    },
    onLoad(){
      if(this.newStoreList.length < this.per_page && this.newStoreList.length > 0 ) {
          this.finished = true;
       }else {
         this.page++;
         this.aginRequest(true)
       }
    },
    jumpInfo(item) {
      if(item.store.status !== '4') return this.$toast('该店铺已下架')
      this.$router.push(`/si/${item.store.key}`);
    }
  },
  computed: {
    getStoreListLength() {
      this.chooseArray = this.storeList.filter(item => {
        return item.checked === true;
      });
      return this.chooseArray.length;
    }
  }
};
</script>

<style lang="scss" scoped>
.edit {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
}

.my-favorite {
  padding: 0px 24px 140px;
}

.my-favorite .favorite-store-list {
  position: relative;
  margin-top: 20px;
  padding: 40px 30px;
  border-radius: 16px;
}

.my-favorite .favorite-store-list .middle-desc {
  border-radius: 16px;
  margin-top: 30px;
  padding: 0 20px;
  height: 134px;
  line-height: 40px;
}

.my-favorite .favorite-store-list .middle-desc img {
  width: 80px;
  height: 80px;
  margin-right: 22px;
  border-radius: 16px;
}

.my-favorite .favorite-store-list .middle-desc .middle-desc-r {
  flex: 1;
  overflow: hidden;
}

.my-favorite .favorite-store-list .bottom-price {
  margin: 50px 0 10px;
}

.my-favorite .favorite-store-list .bottom-price .shop-status {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  overflow: hidden;
  background: url("/imgs/selectStore.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  vertical-align: middle;
}
.my-favorite .favorite-store-list .bottmo-select-r {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.singleChose {
  position: absolute;
  right: 30px;
  bottom: 55px;
}
.my-favorite
  .favorite-store-list
  .bottom-price
  input[type="checkbox"]:checked
  + .shop-status {
  background: url("/imgs/selectStoreActive.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  vertical-align: middle;
}

.my-favorite-footer {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  height: 120px;
  border-top: 1px solid #ededed;
  padding: 24px;
  box-sizing: border-box;
}

.my-favorite-footer .favorite-l .selectAll {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-block;
  background: url("/imgs/selectStore.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  vertical-align: middle;
}

.my-favorite-footer .favorite-l .selectAll::after {
  content: "全选";
  position: absolute;
  right: -60px;
  font-size: 26px;
  color: #1c1c1c;
}

.my-favorite-footer .favorite-l input[type="checkbox"]:checked + .selectAll {
  background: url("/imgs/selectStoreActive.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  vertical-align: middle;
}

.my-favorite-footer .favorite-r {
  width: 254px;
  height: 80px;
  background: #f4632c;
  border-radius: 8px;
}
</style>
