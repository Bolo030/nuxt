<template>
<div class="container">
 <van-nav-bar title="投诉建议" left-arrow @click-left="$router.go(-1)" />
 <main>
  <textarea v-model="content"  placeholder="请输入要投诉的内容或建议"></textarea>
  <van-button class="btn" color="#f4632c" type="primary" block @click="onSubmit">提交</van-button>
 </main>
</div>
</template>

<script>
export default {
data(){
  return{
    content:""
  }
},
  head() {
    return {
      title: "投诉建议_买卖天猫淘宝网店_九九牛网店交易平台",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "九九牛网店交易平台投诉建议，欢迎您针对我们平台提出宝贵意见，九九牛专注天猫、淘宝、京东、拼多多等平台的网店转让出售、入驻、购买服务，致力为客户提供更优质的服务。"
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "投诉建议,九九牛"
        }
      ]
    };
  },
methods:{
onSubmit(){
 this.$api.proposal({content:this.content}).then(res=>{
    if(res.status==1){
      this.$toast.success('提交成功')
      this.$router.go(-1)
    }
 })
}
}
}
</script>

<style lang="scss" scoped>
main{
  padding: 30px 24px;
  box-sizing: border-box;
}
textarea{
  background: #fff;
  width: 100%;
  height: 312px;
  padding: 40px 30px;
  box-sizing: border-box;
}
.btn{
  margin-top: 60px;
}
</style>
