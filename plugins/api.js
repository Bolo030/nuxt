export default ({ app: { $request } }, inject) => {
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
    getIndexList () {
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
    }
  })
}
