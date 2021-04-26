<template>
  <div id="look-contract">
    <van-nav-bar title="我的合同" left-arrow @click-left="$router.go(-1)" />
    <pdf :src=src
         v-for="i in numPages"
         :key=i
         :page = i
    >

    </pdf>
  </div>
</template>

<script>
export default {
  data(){
    return {
      downpath:'',
      numPages: 0,
      src: '',
      vuePdf: null

    }
  },
  created() {
     this.downpath = this.$route.query.downpath;
     console.log(this.downpath);
     
     if (process.client) {
        this.vuePdf = require('vue-pdf');
        this.pdfLoadTask();
      } 
  },
  methods:{
    pdfLoadTask () {
       this.src = this.vuePdf.default.createLoadingTask(this.downpath)
      //  this.numPages = this.src._transport._numPages;
       this.src.promise.then(res => {
            this.numPages = res.numPages;
        })
    }
  }
};
</script>

<style lang="scss" scoped>
#look-contract {
  height: 100%;
  width: 100%;
}
</style>
