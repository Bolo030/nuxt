export default {
  getPname(val) {
    let platform = {
      tm: "天猫",
      tb: "淘宝",
      jd: "京东",
      wp: "唯品会",
      xh: "小红书",
      pd: "拼多多",
      mg: "蘑菇街",
      dd: "当当网",
      bb: "贝贝网",
      al: "阿里巴巴",
      sn: "苏宁",
      yx: "亚马逊",
      ym: "洋码头",
      qt: "其他"
    };
    return platform[val];
  },
  /**
   * 匹配文本中的url
   * @param {string} str
   * @return {array}
   */
  matchUrl(str) {
    if (typeof str !== "string") {
      return [];
    }
    return (
      str.match(
        /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
      ) || []
    );
  },
  /**
   * 处理文本（分割文本和链接）
   * @param {string} str
   * @return {array}
   */
  splitContentToArray(str) {
    if (typeof str !== "string") {
      return [];
    }
    let i = 1;
    // 提取链接
    let urls = this.matchUrl(str);
    if (urls.length === 0) {
      return [{ id: i, type: "text", value: str }];
    }
    let splitContent = str.split(
      /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
    );
    // 分隔文本和链接
    splitContent = splitContent.reduce((prev, curr) => {
      if (curr === "") {
        return prev;
      }
      if (/^(https?|ftp|file)$/.test(curr)) {
        let url = urls.shift() || "";
        prev = prev.concat({
          id: i++,
          type: "url",
          value: url.length > 40 ? url.slice(0, 40) + "..." : url,
          url
        });
      } else {
        prev = prev.concat({ id: i++, type: "text", value: curr });
      }
      return prev;
    }, []);
    return splitContent;
  },
  /**
   * 设置登录验证信息
   * @param {object} ctx - 服务端传入context 客户端传入this
   * @param {object} res - 登录验证信息
   */
  setAuthInfo(ctx, res) {
    let $cookies, $store;
    // 客户端
    if (process.client) {
      $cookies = ctx.$cookies;
      $store = ctx.$store;
    }
    // 服务端
    if (process.server) {
      $cookies = ctx.app.$cookies;
      $store = ctx.store;
    }
    if ($cookies && $store) {
      const expires = $store.state.auth.cookieMaxExpires;
      $cookies.set("userId", res.userId, { expires });
      $cookies.set("clientId", res.clientId, { expires });
      $cookies.set("token", res.token, { expires });
      $cookies.set("userInfo", res.user, { expires });
      $store.commit("auth/UPDATE_USERINFO", res.user);
      $store.commit("auth/UPDATE_CLIENTID", res.clientId);
      $store.commit("auth/UPDATE_TOKEN", res.token);
      $store.commit("auth/UPDATE_USERID", res.userId);
    }
  },
  /**
   * 移除登录验证信息
   * @param {object} ctx - 服务端传入context 客户端传入this
   */
  removeAuthInfo(ctx) {
    let $cookies, $store;
    // 客户端
    if (process.client) {
      $cookies = ctx.$cookies;
      $store = ctx.$store;
    }
    // 服务端
    if (process.server) {
      $cookies = ctx.app.$cookies;
      $store = ctx.store;
    }
    if ($cookies && $store) {
      $cookies.remove("userInfo");
      $cookies.remove("clientId");
      $cookies.remove("token");
      $cookies.remove("userId");
      $store.commit("auth/UPDATE_USERINFO", null);
      $store.commit("auth/UPDATE_CLIENTID", "");
      $store.commit("auth/UPDATE_TOKEN", "");
      $store.commit("auth/UPDATE_USERID", "");
    }
  },
  /*
   *拼接搜索参数
   */
  createQuery(params, type, data, pwd) {
    let { store, id } = params;
    let path = pwd || $nuxt.$route.path;
    if (pwd) {
      id = path.split("/")[2];
    }
    let newStr = type + data;
    if (id && id != "undefined") {
      if (id.includes(type)) {
        var list = id.split("z");
        let index = this.getFindIdx(list, type);
        if (type == "f") {
          newStr = data;
          var flist = list[index].substr(0, 1).split("-");
          var findex = this.getFindIdx(flist, type);
          flist = this.checkList(flist, findex, newStr);
          list[index] = "f" + flist.join("-");
        } else {
          list = this.checkList(list, index, newStr);
        }
        path = `/${store}/${list.join("z")}`;
      } else {
        path = path + "z" + newStr;
      }
    } else {
      path = `/${store}/${newStr}`;
    }
    return path;
  },
  // 删除参数
  delQuery(params, type, pwd) {
    let { store, id } = params;
    let path = pwd || $nuxt.$route.path;
    if (pwd) {
      id = path.split("/")[2];
    }
    if (id && id != "undefined") {
      var list = id.split("z");
      let index = this.getFindIdx(list, type);
      list.splice(index, 1);
      path = `/${store}/${list.join("z")}`;
    }
    return path;
  },
  // 检查数组包含某元素下标
  getFindIdx(list, type) {
    var index = list.findIndex(v => {
      return v.includes(type);
    });
    return index;
  },
  // 数组替换/去除
  checkList(list, idx, val) {
    if (list[idx] != val) list[idx] = val;
    else list.splice(idx, 1);
    return list;
  },
  // 解析搜索条件
  getSearchQuery(data, typeList, search) {
    let list = data.split("z");
    let newSearch = { ...search };
    for (var v of list) {
      var short = v.slice(0, 1);
      var idx = v.slice(1);
      var name = typeList.searchShort[short];
      if (short == "c" || short == "w" || short == "f") {
        newSearch[name] = idx;
      } else if (short == "h" || short == "l") {
        newSearch[name] = typeList[name + "List"][idx].value;
      } else {
        newSearch[name] = typeList[name + "List"][idx - 1].value;
      }
    }
    // console.log(newSearch,'newSearchnewSearchnewSearch')
    return newSearch;
  },

};
