<template>
  <div class="container">
    <van-nav-bar title="资金记录" left-arrow @click-left="$router.go(-1)" />
    <main id="waterSubsidiary">
      <div class="main-top d-f font-size-24">
        <!-- <div class="item" @click="showCalendar = true">
          <span>时间</span>
          <img src="../../assets/imgs/pull-icon.png" alt="三角图标" />
        </div> -->
        <div class="item" @click="showPicker = true">
          <span>{{typeName||"状态"}}</span>
          <img src="../../assets/imgs/pull-icon.png" alt="三角图标" />
        </div>
      </div>

      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="main-middle bg-main-color"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="item-middle">
            <div class="top d-f d-f-between font-main-color2 ">
              <span class="font-size-22 "> 流水号：{{item.number}}</span>
              <span class="right font-size-20" @click="$utils.copy(item.number)">复制</span>
            </div>
            <div class="bottom d-f d-f-between">
              <div class="bt-l ">
                <h4 class="text-wrap">
                  <span class="font-weight font-size-28">{{
                    item.type==1?'充值':'提现'
                  }}</span>
                  <span class="font-size-24" v-if="item.remark"> [{{item.remark}}]</span>
                </h4>
                <i class="font-size-20 font-main-color2">{{
                  item.createdDate
                }}</i>
              </div>
              <div class="bt-r">
                <h4 class="font-size-30 font-weight">
                  {{ item.cash }}
                </h4>
                <i class="font-size-20" :style="{'color':(item.status==1?'#f4632c':'')}">{{item.status==1?'待处理':item.status==2?'成功':'驳回'}}</i>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </main>
    <!-- 类型 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!-- 日历 -->
  <!--   <van-calendar
      v-model="showCalendar"
      :min-date="minDate"
      @confirm="onConfirmDate"
    /> -->
      <van-popup v-model="showCalendar" position="bottom">
      <van-datetime-picker
        @confirm="onConfirmDate"
        type="year-month"
        title="选择年月"
        :formatter="formatter"
        :min-date="minDate"
        @cancel="showCalendar = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    let list = await app.$api
      .assetsCashDetails()
      .then(res => (res.status == 1 ? res.data.data : []));
    console.log(list, "list");
    return {
      list
    };
  },
  data() {
    return {
      loading: false,
      finished: false,
      showPicker: false,
      showCalendar: false,
      search: {
        page: 1,
        type: "",
      },
      list: [],
      columns: [
        "充值",
        "提现",
      ],
      typeName:"",
      minDate: new Date(2018, 0, 1)
    };
  },
  methods: {
    onConfirm(value, index) {
      this.typeName=value
      console.log(index,'indexindex')
      this.search.type = index?'cash':'recharge';
      this.showPicker = false;
      this.getData(true, true);
    },
 /*    onConfirmDate(date) {
      this.search.date = `${date.getFullYear()}-${date.getMonth() + 1}`;
      this.getData(true, true);
      this.showCalendar = false;
    }, */
    onLoad() {
      this.search.page++;
      this.getData(true, false);
    },
    getData(loading = true, remove = false) {
      this.loading = loading;
      if (remove) this.search.page = 1;
      this.$api.assetsCashDetails(this.search).then(res => {
        if (res.status == 1) {
          if (remove) this.list = res.data.data;
          else this.list.push(...res.data.data);
          if (res.data.data.length == 0) {
            this.finished = true;
          }
        } else {
          this.finished = true;
        }
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#waterSubsidiary {
  padding: 0 3.2vw 4vw;
}

#waterSubsidiary .main-top {
  height: 12.6667vw;
}

#waterSubsidiary .main-top .item:first-child {
  margin-right: 7.4667vw;
}

#waterSubsidiary .main-top .item img {
  width: 2.6667vw;
  height: 2.6667vw;
}

#waterSubsidiary .main-middle {
  padding: 0 4vw;
  border-radius: 2.1333vw;
  margin-bottom: 2.6667vw;
}

#waterSubsidiary .main-middle .item-middle .top {
  height: 12vw;
  border-bottom: 0.1333vw solid #ededed;
}

#waterSubsidiary .main-middle .item-middle .top .right {
  padding: 1.3333vw 2.6667vw;
  background: #f4f4f4;
  border-radius: 4vw;
}

#waterSubsidiary .main-middle .item-middle .bottom {
  height: 19.3333vw;
  text-align: right;
}

#waterSubsidiary .main-middle .item-middle .bottom .bt-l {
  text-align: left;
}

#waterSubsidiary .main-middle .item-middle .bottom .bt-l h4 {
  margin-bottom: 3.0667vw;
  width: 46.6667vw;
}

#waterSubsidiary .main-middle .item-middle .bottom .bt-r {
  line-height: 6.6667vw;
}
</style>
