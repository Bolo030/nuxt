<template>
  <div class="container">
    <van-nav-bar title="选择开户行" left-arrow @click-left="$router.go(-1)" />
    <main class="selectBank-box ">
      <div class="selectBank-header bg-main-color">
        <span class="iconfont iconsousuo position-a1"></span>
        <input v-model="name" type="text" placeholder="请输入银行卡名称" @change="getData" />
      </div>

      <!-- 银行卡列表 -->
      <div class="bank-list wrapper bg-main-color ">
        <ul class="bankList-item content bg-main-color">
          <li class="d-f" v-for="(item,index) in list" :key="index" @click="selectBank(item)">
            <img
              :src="item.logo"
              alt="银行图标"
            />
            <span class="font-size-30 font-mian-color4">{{item.name}}</span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
export default {
async asyncData({app}){
  let list=await app.$api.getOpenBank().then(res=>res.status==1?res.data.banks:[]);
  return {
    list
  }
},
data(){
return{
  list:[],
  name:""
}
},
methods:{
  getData(){
    this.$api.getOpenBank({name:this.name}).then(res=>{
          if(res.status==1){
            this.list=res.data.banks;
          }
    })
  },
  selectBank(item){
    this.$store.commit('auth/UPDATE_OPENBANK',item);
    this.$router.go(-1)
  }
}
};
</script>

<style lang="scss" scoped>
.selectBank-box .selectBank-header {
  /* position: fixed;
  top: 11.7333vw; */
  height: 17.3333vw;
  width: 100%;
  padding: 2.6667vw 3.2vw;
  box-sizing: border-box;
}

.selectBank-box .selectBank-header span {
  left: 7.2vw;
  top: 6.6667vw;
  font-size: 4.2667vw;
}

.selectBank-box .selectBank-header input {
  background: #f4f4f4;
  height: 11.7333vw;
  width: 100%;
  border-radius: 2.1333vw;
  padding-left: 11.3333vw;
  box-sizing: border-box;
}

.bank-list {
 /*  position: fixed;
  top: 31.7333vw;
  bottom: 0; */
  width: 100%;
}

.bank-list .bankList-item {
  padding-left: 3.2vw;
  box-sizing: border-box;
}

.bank-list .bankList-item li {
  height: 16vw;
  border-bottom: 0.1333vw solid #ededed;
}

.bank-list .bankList-item li img {
  width: 6.6667vw;
  height: 6.6667vw;
  margin-right: 2.4vw;
}

</style>
