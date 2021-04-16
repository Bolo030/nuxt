<template>
  <div id="aside" >
    <div class="aside-back" @click="colse">
      <van-icon name="arrow-left" size="20"></van-icon>
      <span>返回</span>
    </div>
    <div class="aside-list">
      <div class="aside-item" v-for="(item, index) in list" :key="index">
        <div class="aside-item-title">
          {{ item.title }}
        </div>
        <div class="child">
          <div
            class="child-item text-wrap"
            :class="{ active: v.selected }"
            v-for="(v, i) in item.childList"
            :key="i"
            @click="choose(v, i, index)"
          >
            {{ v.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="aside-btn btn-store">
      <button class="reset" @click="reset">重置</button>
      <button class="confirm" @click="confirm">确定</button>
    </div>
  </div>
</template>

<script>
import store from "../data.js";

const search = {
  platform: "tm", // 平台
  area: undefined, //地区范围
  trademarkType: undefined, // 商标
  taxType: undefined, //认证/证明方式
  category: undefined, //类型--服务类型
  isNew: undefined
};
export default {
  props: {
    child: {
      type: Array,
      default: () => []
    },
    searchChild: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [
        {
          title: "商店平台",
          childList: store.platformlist,
          type: "platform"
        },
        {
          title: "是否新店",
          childList: store.isNewList,
          type: "isNew",
          short: "n"
        },
        {
          title: "商标类型",
          childList: store.trademarkTypeList,
          type: "trademarkType",
          short: "u"
        },
        {
          title: "主营类目",
          childList: this.child,
          type: "category",
          short: "c"
        },
        {
          title: "地区范围",
          childList: store.areaList,
          type: "area",
          short: "r"
        },
        {
          title: "纳税人",
          childList: store.taxTypeList,
          type: "taxType",
          short: "x"
        }
      ],
      search: { ...search },
      path: ""
    };
  },
  created() {
    this.search = Object.assign(this.search, this.searchChild);
    for (var e of this.list) {
      for (var r of e.childList) {
        if (
          this.search[e.type] &&
          (this.search[e.type] == r.id || this.search[e.type] == r.value)
        ) {
          r["selected"] = true;
        } else {
          r["selected"] = false;
        }
      }
    }
  },
  methods: {
    choose(data, idx, index) {
      var value = data.id || data.value;
      if (index == 0) {
        return this.$router.push(`/${data.value}`);
      } else {
        this.path = this.$utils.createQuery(
          this.$route.params,
          this.list[index].short,
          index == 3 ? value : 1 + idx,
          this.path
        );
        if (this.search[this.list[index].type] == value) {
          this.chooseItem(index);
          this.search[this.list[index].type] = undefined;
          return;
        }
      }
      this.chooseItem(index, idx);
      this.search[this.list[index].type] = value;
    },
    chooseItem(index, idx) {
      for (var i in this.list[index].childList) {
        if (i == idx)
          this.$set(this.list[index].childList[i], "selected", true);
       else this.$set(this.list[index].childList[i], "selected", false);
      }
    },
    setItem(index, value) {
      for (var v of this.list[index].childList) {
        if (v.value == value || v.id == value) this.$set(v, "selected", true);
        else this.$set(v, "selected", false);
      }
    },
    colse() {
      this.$emit("data", {
        show: false
        // search: this.search
      });
    },
    reset() {
      for (var i in this.list) {
        if (i == 0) this.chooseItem(0, 0);
        else this.chooseItem(i);
      }
      let shortList=['n','u','c','r','x'];
      for(var v of shortList){
        this.path=this.$utils.delQuery(this.$route.params,v,this.path)
      }
      this.search = { ...search };
      this.path&&this.$router.push(this.path);
    },
    confirm() {
      this.$router.push(this.path);
      /*    this.$emit("data", {
        show: false,
        search: this.search
      }); */
    }
  },
  watch: {
    child(newName, oldName) {
      this.list[3].childList = newName;
      if (this.searchChild.category) {
        this.setItem(3, this.searchChild.category);
      }
    },
    searchChild(newName, oldName) {
      this.reset();
      this.setItem(0, newName.platform);
      this.search = Object.assign(this.search, this.searchChild);
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes move-left {
  0% {
    left: 100%;
  }

  100% {
    top: 0;
  }
}

#aside {
  position: fixed;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  background-color: #ffffff;
  padding: 30px 24px 0;
  box-sizing: border-box;
  animation: move-left 0.5s;
  .aside-back {
    display: flex;
    align-items: center;
    .back {
      width: 17px;
      height: 30px;
      margin-right: 10px;
    }
    font-size: 30px;
    margin-bottom: 40px;
    font-weight: 700;
  }

  .aside-list {
    height: calc(100% - 220px);
    overflow-y: auto;
  }
}

.aside-item {
  .aside-item-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 25px;
  }

  .child {
    display: flex;
    flex-wrap: wrap;

    .child-item {
      width: 160px;
      height: 64px;
      background: #f4f4f4;
      border-radius: 8px;
      font-size: 24px;
      font-weight: 400;
      line-height: 64px;
      text-align: center;
      margin: 0 20px 20px 0;
      padding: 0 20px;

      &:nth-child(4n + 4) {
        margin-right: 0;
      }

      &.active {
        background: #ffebe4;
        color: #f4632c;
      }
    }
  }
}

.aside-btn {
  height: 140px;
  align-items: center;

  button {
    color: #ffffff;
  }

  .reset {
    background-color: #ffebe4;
    color: #f4632c;
  }

  .confirm {
    background-color: #f4632c;
  }
}
</style>
