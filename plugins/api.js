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
     * 获取验证码
     *@params phone type
     */
    sendMsg(data={}) {
      return $request.post('/login/send_msg',data)
    },

    /**
     * 验证码登录 
     * @params userPhone code type
     */
    codeLogin(data = {}) {
      return $request.post('/login/sms-login',data)
    },

    /**
     * 密码登录 
     * @params username password
     */
    pwdLogin(data = {}) {
      return $request.post('/login/login',data)
    },

    /**
     * 重置密码
     * @params 
     */
    restPwd(data = {}) {
      return $request.post('/login/forget',data)
    },

    /**
     * 用户信息
     */
    getUserInfo(data={}) {
      return $request.post('/user/info',data)
    }
  })
}
