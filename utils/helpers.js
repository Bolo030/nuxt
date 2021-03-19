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
  *搜索参数解析
  */
  searchQuery(key, val = null, options = {}) {
    let searchRoute = {
      more: '-',
      division: 'z'
    };

    if (key instanceof Object) {
      options = key;
      key = val = null;
    }

    let query = options.query ? options.query : {};
    let platform = options.platform ? options.platform : '';
    let remove = options.remove ? this.wrap(options.remove) : [];
    let toggle = this.filled(options.toggle) ? options.toggle : true;

    if (this.blank(platform)) {
      platform = v.platform ? v.platform : 'tm';
    }

    if (this.blank(query)) {
      query = window.v ? this.clone(v.query) : {};
    }

    if (key) {
      if (this.isArray(val)) {
        if (!this.hasOwn(query, key)) {
          query[key] = [];
        }
        let value = val[0];
        query[key] = this.wrap(query[key]);
        if (query[key].includes(value) && toggle) {
          if (query[key].length === 1) {
            remove.push(key);
          } else {
            remove.push(key + this.arraySearch(value, query[key]));
          }
        }
      } else {
        // 如果 val 为空则剔除该搜索参数
        if (this.hasOwn(query, key) && this.blank(val)) {
          remove.push(key);
        }

        if (key && val) {
          if (this.hasOwn(query, key) && query[key] == val && toggle) {
            remove.push(key);
          } else {
            query[key] = val;
          }
        }
      }
    }

    // 移除分页参数
    if (key !== 'p') {
      remove.push('p');
    }

    if (remove.length > 0) {
      remove.forEach(function (item) {
        delete query[item];
      });
    }

    let params = [];

    for (let k in query) {
      if (this.isArray(query[k])) {
        params.push(k + query[k].join(searchRoute.more));
      } else {
        params.push(k + query[k]);
      }
    }

    params = params.length > 0 ? params.join(searchRoute.division) : '';

    return '/' + platform + (params ? '/' + params : '');
  },

  jumpSearchQuery(key, val, options = {}) {
    location.href = this.searchQuery(key, val, options);
  },
};
