export default ({ app: { $request, $axios } }, inject) => {
  inject("api", {
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
      return $request.get("/index");
    },
    /**
     * 获取首页商品列表
     */
    getBoutique(params = {}) {
      return $request.get("/boutique", params);
    },
    /**
     * 搜索商品
     */
    getStoreList(params = {}) {
      return $request.get("/store/", params);
    },

    /**
     * 获取一级分类
     */
    getStoreSearchParams(params = {}) {
      return $request.get("/store/search-params", params);
    },

    /**
     * 获取验证码
     *@params phone type
     */
    sendMsg(data = {}) {
      return $request.post("/login/send_msg", data);
    },

    /**
     * 验证码登录
     * @params userPhone code type
     */
    codeLogin(data = {}) {
      return $request.post("/login/sms-login", data);
    },

    /**
     * 密码登录
     * @params username password
     */
    pwdLogin(data = {}) {
      return $request.post("/login/login", data);
    },

    /**
     * 重置密码
     * @params
     */
    restPwd(data = {}) {
      return $request.post("/login/forget", data);
    },

    /**
     * 用户信息
     */
    getUserInfo(data = {}) {
      return $request.post("/user/info", data);
    },
    /**
     * 文章资讯
     */
    articlesInfo(data = {}) {
      return $request.post("/article/list", data);
    },
    /**
     * 文章详情
     */
    articleDetail(data = {}) {
      return $request.post("/article/info", data);
    },
    /**
     * 店铺收藏
     */
    collectStore(data = {}) {
      return $request.post("/user/collect/list", data);
    },
    /**
     * 删除收藏
     */
    deleteCollect(data = {}) {
      return $request.post("/user/collect/del", data);
    },
    /**
     * 我的合同
     */
    contractList(params = {}) {
      return $request.get("/user/contract/", params);
    },
    /**
     * 邮箱发送合同
     */
    sendEmailContract(contract, data = {}) {
      return $request.post("/user/contract/sendemail/" + contract, data);
    },
    /**
     * 头像上传
     */
    upload(data) {
      return $request.post("upload", data);
    },
    /**
     * 个人资料修改
     */
    modifyData(data) {
      return $request.post("/user/improve", data);
    },
    /**
     * 挂店信息
     */
    myStoreInfo(params = {}) {
      return $request.get("/store/my", params);
    },

    /**
     * 获取热门搜索
     */
    getHotSearch(data) {
      return $request.get("/customized/info/" + data);
    },

    /*
     *店铺详情
     */
    getStoreInfo(key) {
      return $request.get("/store/info/" + key);
    },

    /*
     *猜你喜欢
     */
    StoreList(key) {
      return $request.get("/store/other/" + key);
    },

    /*
     *添加收藏
     */
    CollectAdd(key) {
      return $request.post("/user/collect/add/" + key);
    },

    /*
     *取消收藏
     */
    CollectDel(key) {
      return $request.post("/user/collect/del/" + key);
    },

    /*
     *店铺详情简略信息
     */
    getSimple(key) {
      return $request.get("/store/simple/" + key);
    },
    /*
     *卖店 && 砍价
     */
    RosterAdd(data) {
      return $request.post("/leads/roster_add", data);
    },
    /*
     *游客下单
     */
    visitorsOrder(data) {
      return $request.post("/login/tourist-order", data);
    },
    /*
     *发送短信
     */
    sendMsg(data) {
      return $request.post("/login/send_msg", data);
    },
    /*
     *订单列表
     */
    myOrders(data) {
      return $request.get("/order/olist", data);
    },
    /*
     *取消订单
     */
    orderCancel(key) {
      return $request.post("/order/cancel/" + key);
    },
    /**
     * 删除订单
     *
     * @param key
     * @returns {AxiosPromise<any>}
     */
    orderDel(key) {
      return $request.post("/order/orderdel/" + key);
    },
    /*
     *订单详情
     */
    orderInfo(key) {
      return $request.get("/order/oinfo/" + key);
    },
    /*
     *结算详情
     */
    GetSettlement(key) {
      return $request.get("/order/settlement/" + key);
    },
    /*
     *收银台
     */
    orderCashier(data) {
      return $request.get("/order/cashier", data);
    },
    /**
     * 订单结算
     *
     * @param data
     * @returns {*}
     */
    SettlementDo(key, data) {
      return $request.post("/order/settlement/" + key, data);
    },
    /**
     * 支付宝支付
     *
     * @param key
     * @returns {*}
     */
    aliPay(key, data) {
      return $request.post("/payment/aliqrcode/" + key, data);
    },
    /**
     * 支付订单状态
     *
     * @param key
     * @returns {*}
     */
    orderStatus(key) {
      return $request.get("/payment/payment-query/" + key);
    },
    /**
     * 微信支付
     *
     * @param key
     * @returns {*}
     */
    wechatPay(key, data) {
      return $request.post("/payment/wechat-app-pay/" + key, data);
    },
    /*
     *创建订单
     */
    CreateOrder(key) {
      return $request.post("/order/create/" + key);
    },
    /*
     *获取高级定制数据
     */
    getCustomizedInfo(data) {
      return $request.get("/customized/info/" + data.cid);
    },
    getCustomized(data) {
      return $request.get("/customized/list/" + data.cid, data);
    },
    /*
     *获取明星顾问
     */
    getConsultant(data) {
      return $request.get("/consultant/" + data);
    },
    /*
     *获取用户资金
     */
    getCapital() {
      return $request.get("/assets/capital");
    },
    /*
     *获取收款账号
     */
    assetsDepositor() {
      return $request.post("/assets/depositor");
    },

    /**
     * 文件上传
     * @param file
     * @returns {Promise<AxiosResponse<any>>}
     */
    uploadFile(file, Oup) {
      let form = new FormData();
      form.append("file", file);
      $axios.defaults.headers["Content-Type"] = "multipart/form-data";
      let res = $axios({
        url: "/upload",
        method: "post",
        data: form,
        onUploadProgress: Oup ? Oup : false
      });
      $axios.defaults.headers["Content-Type"] = "application/json";
      return res;
    },
    /*
    *是否实名认证
    */
    isReal(){
      return $request.get('/user/real/whether-real')
    },
    /*
     *提交充值信息
     */
    assetsRecharge(data) {
      return $request.post("/assets/recharge", data);
    },
    /*
     *提现申请
     */
    subWithdrawal(data) {
      return $request.post("/assets/withdrawal", data);
    },
    /*
     *获取银行列表
     */
    getBankList(data) {
      return $request.post("/user/bank/list", data);
    },
    /*
     *资金流水
     */
    assetsCashrecords(data) {
      return $request.post("/assets/cashrecords", data);
    },
    /*
     *资金记录
     */
    assetsCashDetails(data) {
      return $request.get("/assets/cash-details", data);
    },
    /*
     *提现
     */
    withdraw(data) {
      return $request.post("/assets/cash", data);
    },
    /*
     *银行卡列表
     */
    getMyBank() {
      return $request.get("/user/bank/index");
    },
    /*
     *所属银行列表
     */
    getOpenBank(data) {
      return $request.get("/user/bank/banks", data);
    },
    /*
     *银行卡所属银行
     */
    getBankType(data) {
      return $request.get("/user/bank/get-type", data);
    },
    /*
     *添加银行卡
     */
    addBankCard(data) {
      return $request.post("/user/bank/store", data);
    },
    /*
     *绑定账号实名认证
     */
    bindReal(data) {
      return $request.post("/user/real/bind-real/" + data);
    },
    /*
     *删除银行卡
     */
    bankDel(data) {
      return $request.post("/user/bank/del", data);
    },
    /*
     *消息列表
     */
    getMessage(data) {
      return $request.get("/user/notifications", data);
    },
    /*
     *实名认证列表
     */
    getRealList() {
      return $request.get("/user/real/index");
    },
    /*
     *银行卡认证
     */
    realBank(data) {
      return $request.post("/user/real/bank-real", data);
    },
    /*
     *手机号认证
     */
    realPhone(data) {
      return $request.post("/user/real/phone-real", data);
    },
    /* 实名认证删除 */
    realDel(data){
      return $request.post('user/real/del',data)
    },
    /*
     *跟换手机号
     */
    editPhone(data) {
      return $request.post("/user/change-phone", data);
    },
    /*
    *投诉建议
    */
    proposal(data){
      return $request.post('/feedback/proposal-simple',data)
    },
    /**
     * 登录后修改密码
     */
    loginModfiy(data) {
      return $request.post('/user/update-password',data)
    }
  });
};
