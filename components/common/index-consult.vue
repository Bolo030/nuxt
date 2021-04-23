<template>
  <div class="consult-wrapper">
    <div class="consult-box">
      <div class="consult-top">
        <h2>资讯攻略</h2>
        <span @click="$router.push('/article/list-1')">更多></span>
      </div>
      <div class="consult-tab">
        <span @click="tabBtn(index,item.cid)" :class="currenIndex === index? 'active': ''" v-for="(item,index) in tabTitle" :key="index" >{{item.title}}</span>
      </div>
      <ul class="consult-list">
        <a 
          :href="currenIndex===4?'/article/interview-' + item.id + '.html':'/article/detail-' + item.id + '.html' "
          v-for="item in consultList.data.slice(0,4)" 
          :key="item.id">
          <li class="font-size-26 text-wrap text-wrap" >{{item.title}}</li>
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    consultList:{
      type:Object,
      required: true,
      default: {}
    }
  },
  data(){
    return {
      tabTitle:[
        {title:'新闻资讯',cid:1},
        {title:'行业资讯' ,cid:2},
        {title:'交易攻略', cid:4},
        {title:'系统公告', cid:25},
        {title:'客户采访',cid:17}],
      currenIndex:0,
      cid:1,
    }
  },
  methods:{
   async tabBtn(index,cid){
      this.currenIndex = index;
      this.cid = cid;
      this.$emit('tabBtn',this.cid);
    }
  }
}
</script>

<style scoped lang="scss">
.consult-wrapper {
  width: 100%;
  height: 498px;
  padding: 0 24px;
  margin-bottom: 20px;
  .consult-box {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 16px;
    padding: 0 30px;
    box-sizing: border-box;
    .consult-top {
      display: flex;
      justify-content: space-between;
      height: 115px;
      align-items: center;
      border-bottom: 1px solid #ededed;
      h2 {
        font-size: 32px;
        font-weight: 700;
        color: #1c1c1c;
      }
      span {
        font-size: 24px;
        color: #999;
      }
    }
    .consult-tab {
      display: flex;
      justify-content: space-between;
      height: 122px;
      align-items: center;
      span {
        border: 1px solid #ccc;
        border-radius: 25px;
        padding: 10px 8px;
        font-size: 20px;
        background: #f4f4f4;
        &.active {
          background: #fff1eb;
          color: #f4632c;
          border-color: #f4632c;
        }
      }
    }
    .consult-list {
      li {
        margin-bottom: 20px;
      }
    }
  }
}
</style>