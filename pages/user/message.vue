<template>
  <div class="container">
    <van-nav-bar title="消息中心" left-arrow @click-left="$router.go(-1)" />
    <main class="messageCenter-box">
      <ul class="messageCenter-in">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <li class="message-item" v-for="(item, index) in list" :key="index">
            <h5 class="message-time font-size-222 font-main-color2">
              {{ item.created_at }}
            </h5>
            <div class="message-info bg-main-color position-r">
              <span
                class="inform font-size-20 font-main-color6 bg-gradient-color2"
                >系统</span
              >
              <p>{{ item.abstract }}</p>
            </div>
          </li>
        </van-list>
        <!--
            <li class="message-item">
                <h5 class="message-time font-size-222 font-main-color2">2020-01-22 09:32</h5>
                <div class="message-info bg-main-color position-r">
                    <span class="inform font-size-20 font-main-color6 bg-gradient-color3">通知</span>
                    <p>九九牛平台将于2月13号 对部分功能进行维护，维护过程中部分功能将不可使用，如有不便敬请谅解~</p>
                </div>
            </li> -->
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ app }) {
    let list = await app.$api
      .getMessage()
      .then(res => (res.status == 1 ? res.data.list.data : []));
    console.log(list, 6666);
    return {
      list
    };
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      list: []
    };
  },
  methods: {
    onLoad() {
      this.page++;
      this.getData(true, false);
    },
    getData(loading = true, remove = false) {
      this.loading = loading;
      if (remove) this.page = 1;
      this.$api.getMessage({ page: this.page }).then(res => {
        if (res.status == 1) {
          if (remove) this.list = res.data.list.data;
          else this.list.push(...res.data.list.data);
          if (res.data.list.data.length == 0) {
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
.messageCenter-box {
  padding: 6.6667vw 3.2vw;
}

.messageCenter-in .message-item {
  margin-bottom: 6.6667vw;
}

.messageCenter-in .message-item .message-time {
  text-align: center;
  margin-bottom: 4vw;
}

.messageCenter-in .message-item .message-info {
  padding: 8vw 4vw 4vw;
  border-radius: 2.1333vw;
  line-height: 6vw;
}

.messageCenter-in .message-item .message-info .inform {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0vw 2.6667vw;
  border-radius: 2.1333vw 0 2.1333vw 0;
}
</style>
