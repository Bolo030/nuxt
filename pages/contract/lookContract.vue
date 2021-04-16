<template>
  <div id="look-contract">
    <van-nav-bar title="我的合同" left-arrow @click-left="$router.go(-1)" />
    <iframe
      :src="downpath"
    ></iframe>
  </div>
</template>

<script>
export default {
  data(){
    return {
      downpath:''
    }
  },
  created() {
    this.downpath = this.$route.query.downpath
  }
};
</script>

<style lang="scss" scoped>
#look-contract {
  height: 100%;
  width: 100%;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
