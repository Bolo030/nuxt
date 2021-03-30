export default ({
  app: {
    $request
  }
}, inject) => {
  inject('api', {
    /**
     * 登录验证
     * @param {string} password - 密码
     * @param {string} phoneNumber - 手机号码
     */
    /*  loginAuth(data) {
       return $request.post('/v2/auth/login', data)
     }, */
    /**
     * 获取首页列表
     */
    getIndexList() {
      return $request.get('/index')
    },
    /**
     * 获取首页商品列表
     */
    getBoutique(params={}){
      return $request.get('/boutique',params)
  },
    /**
     * 搜索商品
     */
    getStoreList(params={}){
      return $request.get('/store/',params)
    },

    /**
     * 获取一级分类
     */
    getStoreSearchParams(params={}){
      return $request.get('/store/search-params',params)
    },

    /**
     * 获取验证码
     *@params phone type
     */
    sendMsg(data = {}) {
      return $request.post('/login/send_msg', data)
    },

    /**
     * 验证码登录
     * @params userPhone code type
     */
    codeLogin(data = {}) {
      return $request.post('/login/sms-login', data)
    },

    /**
     * 密码登录
     * @params username password
     */
    pwdLogin(data = {}) {
      return $request.post('/login/login', data)
    },

    /**
     * 重置密码
     * @params
     */
    restPwd(data = {}) {
      return $request.post('/login/forget', data)
    },

    /**
     * 用户信息
     */
    getUserInfo(data = {}) {
      return $request.post('/user/info', data)
    },
    /**
     * 文章资讯
     */
    articlesInfo(data = {}) {
      return $request.post('/article/list', data)
    },
    /**
     * 文章详情
     */
    articleDetail(data = {}) {
      return $request.post('/article/info',data)
    },
    /**
     * 店铺收藏
     */
    collectStore(data = {}) {
      return $request.post('/user/collect/list',data)
    },
    /**
     * 删除收藏
     */
    deleteCollect(data = {}) {
      return $request.post('/user/collect/del',data)
    },
    /**
     * 我的合同
     */
    contractList(params = {}) {
      return $request.get('/user/contract/',params)
    },
    /**
     * 邮箱发送合同
     */
    sendEmailContract(contract,data={}) {
      return $request.post('/user/contract/sendemail/'+contract,data)
    },
    /**
     * 头像上传
     */
    upload(data) {
      return $request.post('upload',data)
    },
    /**
     * 个人资料修改
     */
    modifyData(data) {
      return $request.post('/user/improve',data)
    },
    /**
     * 挂店信息
     */
    myStoreInfo(params = {}) {
      return $request.get('/store/my',params)
    },

      /**
     * 获取热门搜索
     */
       getHotSearch(data){
        return $request.get('/customized/info/'+data)
      },

      /*
      *店铺详情
      */
     getStoreInfo(key){
       return $request.get('/store/info/'+key)
     },

     /*
     *猜你喜欢
     */
     StoreList(key){
      return $request.get('/store/other/'+ key);
     },

     /*
     *添加收藏
     */
     CollectAdd(key){
      return $request.post('/user/collect/add/' + key);
     },

     /*
     *取消收藏
     */
     CollectDel(key){
      return $request.post('/user/collect/del/' + key, data);
     },
  })


}
