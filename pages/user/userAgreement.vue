<template>
  <div id="user-agreement">
    <van-nav-bar :title="pathName" left-arrow @click-left="$router.go(-1)" />
    <iframe :src="path" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      pathName: ""
    };
  },
  created() {
    this.pathName = sessionStorage.getItem('pathNmae');
    this.path = sessionStorage.getItem('path')
  }
};
</script>

<style lang="scss">
  #user-agreement {
    width: 100%;
    height: 100%;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
