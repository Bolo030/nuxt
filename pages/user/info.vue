<template>
  <div>
    <header id="header">
      <div class="header-content">
        <a href="javascript:history.go(-1)" title="返回箭头"
          ><img
            class="back"
            src="~/assets/imgs/store/rectangle.png"
            alt="九九牛返回"
        /></a>
        <span class="title">编辑资料</span>
      </div>
    </header>
    <main class="editData-box" >
      <ul class="editData-in bg-main-color">
        <li class="d-f d-f-between editaData-item">
          <span class="font-size-28">头像</span>
          <div class="right-editData position-a ">
            <van-uploader v-model="userInfoBackfill.avatar" multiple :max-count="1" preview-size="60px"  :preview-full-image="false" :after-read="afterRead" />
          </div>
        </li>
        <li class="d-f d-f-between editaData-item">
          <span class="font-size-28">昵称</span>
          <div class="right-editData font-size-28">
            <!-- 新用户_8181 -->
            <input type="text" v-model="userInfoBackfill.name" @blur="changNickname">
          </div>
        </li>
        <li class="d-f d-f-between editaData-item">
          <span class="font-size-28">性别</span>
          <div class="right-editData font-size-28" @click="selectSex">
            {{userInfoBackfill.gender}}
            <i class="iconfont iconjinru1 font-size"></i>
          </div>
        </li>
      </ul>

      <div  @click="saveBtn" class="editData-btn bg-main-color2 font-size-30 font-main-color6">
        <button>保存</button>
      </div>

      <!-- 弹出框 -->
      <div class="edit-mask">
        <div class="edit-mask-in font-size-30">
          <ul class="edit-mask-item bg-main-color">
            <li>保密</li>
            <li>男</li>
            <li>女</li>
          </ul>
          <button class="edit-cancel-btn bg-main-color">取消</button>
        </div>
      </div>
      <van-action-sheet
          v-model="maskShow"
          :actions="actions"
          cancel-text="取消"
          close-on-click-action
          @cancel="onCancel"
          @select="selectName"
      />
    </main>
  </div>
</template>

<script>
export default {
  async  asyncData({ params,query,app }) {

     // 获取个人中心数据
    let userInfo = await app.$api.getUserInfo();
    if (userInfo.status !== 1) {
      return;
    } else {
       userInfo.data.status = 1;
       userInfo = userInfo.data.user;
       let userInfoBackfill = {}
       userInfoBackfill.avatar = [];
       userInfoBackfill.name = userInfo.name;
       userInfoBackfill.avatar.push({url:userInfo.contact.avatar});
       userInfoBackfill.gender = userInfo.contact.gender;
       userInfoBackfill.gender = userInfoBackfill.gender === ''? 'u':userInfoBackfill.gender;
       userInfoBackfill.sex = userInfoBackfill.gender;
       if(userInfoBackfill.gender === 'u') {
         userInfoBackfill.gender = '保密'
       }else if (userInfoBackfill.gender === 'f') {
         userInfoBackfill.gender = '女'
       }else if (userInfoBackfill.gender === 'm') {
         userInfoBackfill.gender = '男'
       }
       return {userInfoBackfill}
    }
  },
  data(){
     return {
      fileList: [],
      maskShow: false,
      actions: [{ name: '保密', value: 'u' }, { name: '男',value:'m' }, { name: '女',value:'f' }],
      userInfoBackfill:{
        name: '',
        avatar:[],
        gender: '',
        sex: ''
      }
    };
  },
  methods:{
    onCancel() {
      this.$toast('已取消');
    },
    selectSex() {
      this.maskShow = true
    },
    selectName(sex) {
      this.$set(this.userInfoBackfill,'gender',sex.name);
      this.userInfoBackfill.sex = sex.value;
    },
    afterRead(file,b) {
      // 此时可以自行将文件上传至服务器
      let formData = new FormData()
      formData.append('file', file.file);
      this.$api.upload(formData).then(res=>{
        if(res.status !== 1) this.$toast(res.message);
        this.userInfoBackfill.avatar[0] = res.data.url;
      })
    },
    changNickname(){
      if(this.userInfoBackfill.name.trim().length === 0 ) this.$toast('昵称不能为空！')
    },
    saveBtn(){
      if(this.userInfoBackfill.avatar.length ===0 )  return this.$toast('头像不能为空');
      if(this.userInfoBackfill.name.trim().length === 0)  return this.$toast('昵称不能为空')
      this.$api.modifyData({
        avatar: this.userInfoBackfill.avatar[0],
        gender:this.userInfoBackfill.sex,
        name: this.userInfoBackfill.name
      }).then( res=>{
        if(res.status !== 1) return this.$toast(res.message);
         this.$toast(res.message);
         this.$router.push('/user')
      })
      
      
    }
  },
  
};
</script>

<style scoped lang="scss">
/deep/ .van-uploader__upload {
  width: 76px;
  height: 76px;
  border-radius: 50%;
}
.editData-box {
  padding: 0 24px;
}

.editData-in {
  margin-top: 30px;
  padding: 30px 30px 0;
  border-radius: 16px;
  box-sizing: border-box;
}
.editData-in .editaData-item:first-child {
  height: 150px;
  padding: 10px 0;
  box-sizing: border-box;
}
.editData-in .editaData-item {
  height: 120px;
  border-bottom: 1px solid #ededed;
}

.editData-in .editaData-item:last-child {
  border: none;
}

.editData-in .editaData-item .right-editData img {
  position: absolute;
  width: 76px;
  height: 76px;
  border-radius: 50%;
}

.editData-in .editaData-item .right-editData input {
  text-align: right;
}

.editData-in .editaData-item .right-editData .font-size {
  font-size: 20px;
}

.editData-btn {
  margin-top: 40px;
  height: 100px;
  border-radius: 16px;
  line-height: 100px;
  background: #f4632c;
  text-align: center;
}

.edit-mask {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 666666;
  background: rgba(0, 0, 0, 0.5);
}

.edit-mask .edit-mask-in {
  position: absolute;
  bottom: 30px;
  padding: 0 24px;
  box-sizing: border-box;
  width: 100%;
}

.edit-mask .edit-mask-in .edit-mask-item {
  border-radius: 16px;
  padding: 0 30px;
  box-sizing: border-box;
  text-align: center;
  line-height: 110px;
}

.edit-mask .edit-mask-in .edit-mask-item li {
  height: 110px;
  border-bottom: 1px solid #ededed;
}

.edit-mask .edit-mask-in .edit-mask-item li:last-child {
  border: none;
}

.edit-mask .edit-mask-in .edit-cancel-btn {
  margin-top: 20px;
  height: 110px;
  width: 100%;
  border-radius: 16px;
}
</style>
