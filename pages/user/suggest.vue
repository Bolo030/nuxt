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
