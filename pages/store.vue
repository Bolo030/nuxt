<template>
  <div class="main">
    <main class="store">
      <div class="buyStore">
        <div class="buyStore-top">
          <!-- 步骤 -->
          <div class="tradeMsg space-evenly">
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" />
              <span>资金安全</span>
            </div>
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" />
              <span>流程简单</span>
            </div>
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" />
              <span>交易透明</span>
            </div>
            <div class="tradeMsg-item">
              <img src="~assets/imgs/store/ic_shop_guarantee_gou.png" />
              <span>专业高效</span>
            </div>
          </div>
          <!-- 菜单 -->
          <div class="storeInfo">
            <a
              href="/html/store/buy.html"
              class="storeInfo-item"
              style="
                background: linear-gradient(90deg, #ff7849 0%, #ff9975 100%);
              "
            >
              <img src="~assets/imgs/store/ic_shop_classification_goumai.png" />
              <span>网店购买</span>
            </a>
            <a
              href="/html/store/sale.html"
              class="storeInfo-item"
              style="
                background: linear-gradient(90deg, #80d04f 0%, #80d884 100%);
              "
            >
              <img src="~assets/imgs/store/ic_shop_classification_chusou.png" />
              <span>网店出售</span>
            </a>
            <a
              href="/html/store/evaluate.html"
              class="storeInfo-item"
              style="
                background: linear-gradient(90deg, #25cacc 0%, #66d9da 100%);
              "
            >
              <img src="~assets/imgs/store/ic_shop_classification_gujia.png" />
              <span>网店估价</span>
            </a>
            <a
              href="/html/store/entertm.html"
              class="storeInfo-item"
              style="
                background: linear-gradient(90deg, #ffb049 0%, #f5b96d 100%);
              "
            >
              <img src="~assets/imgs/store/ic_shop_classification_ruzhu.png" />
              <span>网店入驻</span>
            </a>
          </div>
          <!-- 服务页banner -->
          <a class="coverImg">
            <img src="~assets/imgs/store/bg_shop_fuwurukou.png" />
          </a>
        </div>
        <!-- 导航 -->
        <div id="store-filter">
          <div class="main">
            <!-- 导航 -->
            <div class="nav">
              <div class="nav-box">
                <div class="nav-item active">
                  <span>天猫</span>
                  <div class="line"></div>
                </div>
                <div class="nav-item">
                  <span>淘宝</span>
                </div>
                <div class="nav-item">
                  <span>拼多多</span>
                </div>
                <div class="nav-item">
                  <span>京东</span>
                </div>
                <div class="nav-item">
                  <span>其他网店</span>
                </div>
              </div>
            </div>
            <!-- 筛选栏 -->
            <div class="filters">
              <div class="search-box">
                <img src="~assets/imgs/store/search.png" />
                <span class="span-ellipsis content">搜索</span>
                <div class="search-clear">
                  <img
                    src="~assets/imgs/store/icon-colse.png"
                    alt="九九牛清除搜索"
                    class="clear"
                  />
                </div>
              </div>
              <div class="filter-box">
                <div class="filter-item" onclick="chooseSelect('sort')">
                  <span style="color: #f4632c">排序</span>
                  <img class="arrows" src="~assets/imgs/store/filter-top.png" />
                </div>
                <div class="filter-item" onclick="chooseSelect('price')">
                  <span>价格</span>
                  <img class="arrows" src="~assets/imgs/store/filter-bottom.png.png" />
                </div>
                <div class="filter-item" onclick="chooseSelect('filter')">
                  <span style="color: #f4632c">筛选</span>
                  <img class="filter" src="~assets/imgs/store/filter.png" />
                </div>
              </div>
            </div>
            <!-- 筛选框 -->
            <div class="select" style="display: none">
              <div class="select-box">
                <!-- 排序 -->
                <div class="sort" style="display: none">
                  <div class="sort-item active">默认排序</div>
                  <div class="sort-item">价格从高到低</div>
                  <div class="sort-item">价格从低到高</div>
                </div>
                <!-- 价格筛选 -->
                <div class="sel-price" style="display: none">
                  <div class="sel-price-section">
                    <input type="text" placeholder="最低价格" />
                    <text>—</text>
                    <input type="text" placeholder="最低价格" />
                  </div>
                  <div class="sel-price-list"></div>
                  <div class="sel-price-btn btn-store">
                    <button>取消</button>
                    <button class="active">确定</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 侧栏筛选 -->
          <div id="aside" style="display: none">
            <div class="aside-back" onclick="colse()">
              <img class="back" src="~assets/imgs/store/rectangle.png" />
              <span>返回</span>
            </div>
            <div class="aside-list"></div>
            <div class="aside-btn btn-store">
              <button class="reset">重置</button>
              <button class="confirm">确定</button>
            </div>
          </div>
          <!-- 侧栏end -->
        </div>
        <!-- 列表 -->
        <!-- 店铺列表区域 -->
        <div class="store-list">
          <div class="list-platform bg-main-color">
            <div class="platform-title d-f">
              <img
                src="~assets/imgs/icon_tm.png"
                alt="九九牛网店交易平台，店铺图标"
                class="store-icon"
              />
              <h3 class="font-size-30 font-weight">玛森堡旗舰店</h3>
            </div>
            <div class="platform-middle">
              <p class="desc font-size-26 text-wraps">
                华南地区 女装+内衣旗舰店 三字中文商标 一
                般纳税人，店铺干净，卖家诚心出售，欢迎咨询！
              </p>
              <div class="price-collect d-f d-f-between">
                <div class="price-left font-main-color">
                  <span class="font-size-20">店铺售价￥</span>
                  <span class="font-size-34 font-weight">22.8W</span>
                </div>
                <div class="collect-right font-main-color2 font-size-20">
                  321人收藏
                </div>
              </div>
            </div>
            <div class="platform-bottom d-f-flex">
              <img src="~assets/imgs/bg_home_settlement_jindong@2x.png" alt="" />
              <ul class="right-tag">
                <li class="font-main-color2 font-size-24">
                  居家日用/R标/旗舰店
                </li>
                <li class="mark">
                  <span class="d-inline-block font-size-20">牛牛严选</span>
                  <span class="d-inline-block font-size-20">牛牛品鉴</span>
                  <span class="d-inline-block font-size-20">牛牛严选</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 店铺名称被隐私保护中 -->
        <div class="store-list">
          <div class="list-platform bg-main-color">
            <div class="platform-title d-f">
              <img
                src="~assets/imgs/icon_tm.png"
                alt="九九牛网店交易平台，店铺图标"
                class="store-icon"
              />
              <img
                src="~assets/imgs/ic_home_recommend_protect@2x.png"
                alt="九九牛网店交易平台，店铺图标"
                class="secret-icon"
              />
              <h3 class="font-size-30 font-size-24 font-main-color3">
                该店名被隐私保护中
              </h3>
            </div>
            <div class="platform-middle">
              <p class="desc font-size-26 text-wraps">
                华南地区 女装+内衣旗舰店 三字中文商标 一
                般纳税人，店铺干净，卖家诚心出售，欢迎咨询！
              </p>
              <div class="price-collect d-f d-f-between">
                <div class="price-left font-main-color">
                  <span class="font-size-20">店铺售价￥</span>
                  <span class="font-size-34 font-weight">22.8W</span>
                </div>
                <div class="collect-right font-main-color2 font-size-20">
                  321人收藏
                </div>
              </div>
            </div>
            <div class="platform-bottom d-f-flex">
              <img src="~assets/imgs/bg_home_settlement_jindong@2x.png" alt="" />
              <ul class="right-tag">
                <li class="font-main-color2 font-size-24">
                  居家日用/R标/旗舰店
                </li>
                <li class="mark">
                  <span class="d-inline-block font-size-20">牛牛严选</span>
                  <span class="d-inline-block font-size-20">牛牛品鉴</span>
                  <span class="d-inline-block font-size-20">牛牛严选</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 没有店铺名称 -->
        <div class="store-list">
          <div class="list-platform bg-main-color">
            <div class="platform-title">
              <img
                src="~assets/imgs/icon_tm.png"
                alt="九九牛网店交易平台，店铺图标"
                class="store-icon store-icon-noTitle"
              />
              <h3
                class="font-size-30 font-weight font-main-color4 text-wraps desc-title"
              >
                福建地区，
                余妆旗舰店，女装+内衣类目，一般纳税，地址挂靠，无扣分，无社保
              </h3>
            </div>
            <div class="platform-middle">
              <!-- <p class="desc font-size-26 text-wraps">
                              华南地区 女装+内衣旗舰店 三字中文商标 一 般纳税人，店铺干净，卖家诚心出售，欢迎咨询！
                          </p> -->
              <div class="price-collect d-f d-f-between">
                <div class="price-left font-main-color">
                  <span class="font-size-20">店铺售价￥</span>
                  <span class="font-size-34 font-weight">22.8W</span>
                </div>
                <div class="collect-right font-main-color2 font-size-20">
                  321人收藏
                </div>
              </div>
            </div>
            <div class="platform-bottom d-f-flex">
              <img src="~assets/imgs/bg_home_settlement_jindong@2x.png" alt="" />
              <ul class="right-tag">
                <li class="font-main-color2 font-size-24">
                  居家日用/R标/旗舰店
                </li>
                <li class="mark">
                  <span class="d-inline-block font-size-20">牛牛严选</span>
                  <span class="d-inline-block font-size-20">牛牛品鉴</span>
                  <span class="d-inline-block font-size-20">牛牛严选</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- 底部tabbar -->
    <div id="tabbar">
      <div class="tabbar-box">
        <!-- tabbar左边突出部分 -->
        <div class="tabbar-important">
          <nuxt-link class="tabbar-item" to="/store">
            <img src="~assets/imgs/tabbar/ic_home_tab_maidian.png" />
            <span class="">买店</span>
          </nuxt-link>
        </div>
        <!-- tabbar右边列表 -->
        <div class="tabbar-list">
          <nuxt-link class="tabbar-item" to="/">
            <img src="~assets/imgs/tabbar/ic_home_tab_home_b.png" />
            <span>首页</span>
          </nuxt-link>
          <a class="tabbar-item" href="#">
            <img src="~assets/imgs/tabbar/ic_home_tab_maidian_b.png" />
            <span>卖店</span>
          </a>
          <a
            class="tabbar-item"
            href="#"
          >
            <img src="~assets/imgs/tabbar/ic_home_tab_geren_b.png" />
            <span>个人中心</span>
          </a>
        </div>
      </div>
      <!-- 无意义占位符 -->
      <div class="tabbar-occupy"></div>
    </div>
  </div>
</template>

<script>
export default {
  head(){
  return{
    title:'天猫商城入驻_天猫店铺转让出售_天猫网店转让-九九牛',
    meta:[
      {
        hid:"description",
        name:"description",
        content:"九九牛为你提供天猫网店代运营、店铺转让出售、天猫商城入驻服务，本站包含大量最新天猫店铺资源，买卖天猫商城，就上九九牛网店交易平台！"
      },
      {
        hid:"keywords",
        name:"keywords",
        content:"天猫商城入驻,天猫店铺转让,天猫店铺出售,天猫入驻,天猫网店转让，网店转让"
      }
    ]
  }
}
};
</script>

<style lang="scss" scoped>
@keyframes move-bottom {
  0% {
    margin-top: -17.3333vw;
    opacity: 0;
  }
  100% {
    margin-top: 0;
    opacity: 1;
  }
}
.store .back {
  width: 2.2667vw;
  height: 4vw;
  margin-right: 1.3333vw;
}
.store a {
  display: block;
}
.store .buyStore .buyStore-top {
  background: #fff;
  padding: 0 3.2vw 6.2667vw;
}
.store .buyStore .buyStore-top .coverImg img {
  width: 93.6vw;
  height: 20vw;
  border-radius: 1.3333vw;
}
.store .buyStore .buyStore-center {
  padding: 2.6667vw 3.2vw;
}
.store .buyStore .buyStore-center .noData {
  text-align: center;
  color: #ccc;
}
.store .tradeMsg {
  height: 14.1333vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.store .tradeMsg .tradeMsg-item {
  font-size: 2.6667vw;
  color: #1c1c1c;
}
.store .tradeMsg .tradeMsg-item img {
  width: 2.9333vw;
  height: 2.9333vw;
}
.store .space-evenly {
  justify-content: space-around;
}
.store .storeInfo {
  display: flex;
  height: 15.2vw;
  justify-content: space-between;
}
.store .storeInfo .storeInfo-item {
  height: 10.6667vw;
  width: 21.3333vw;
  border-radius: 5.3333vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
.store .storeInfo .storeInfo-item img {
  width: 2.9333vw;
  height: 2.9333vw;
  margin-right: 0.6667vw;
}
.store .storeInfo .storeInfo-item span {
  font-size: 2.9333vw;
  color: #fff;
}

#store-filter {
  color: #1c1c1c;
  padding-bottom: 30.1333vw;
  position: sticky;
  left: 0;
  top: 0;
  z-index: 100000;
  margin-bottom: 2.6667vw;
}
#store-filter .nav,
#store-filter .filters {
  background-color: #ffffff;
}
#store-filter .main {
  font-size: 3.7333vw;
  width: 100vw;
  position: absolute;
  left: 0;
  z-index: 9999;
}
#store-filter .nav-box {
  padding-top: 2.6667vw;
  display: flex;
  justify-content: space-between;
  height: 12.8vw;
  box-sizing: border-box;
  border-bottom: 0.1333vw solid #ededed;
  width: 93.3333vw;
  margin: 0 auto;
}
#store-filter .nav-box .back {
  margin: 1.3333vw 0 0 1.3333vw;
}
#store-filter .nav-box .nav-item {
  position: relative;
}
#store-filter .nav-box .active {
  font-size: 4.2667vw;
  font-weight: 700;
}
#store-filter .nav-box .line {
  width: 4.4vw;
  height: 0.8vw;
  background: #f4632c;
  border-radius: 0.4vw;
  position: absolute;
  bottom: 2.2667vw;
  left: 50%;
  transform: translateX(-50%);
}
#store-filter .filters {
  padding: 2.9333vw 3.2vw;
}
#store-filter .filters,
#store-filter .filters .search-box,
#store-filter .filters .filter-box,
#store-filter .filters .filter-item {
  display: flex;
  align-items: center;
}
#store-filter .filters .search-box {
  box-sizing: border-box;
  width: 42.6667vw;
  height: 11.2vw;
  background: #f4f4f4;
  border-radius: 5.6vw;
  padding-left: 4.6667vw;
  font-size: 3.7333vw;
  margin-right: 6vw;
  flex-shrink: 0;
  justify-content: space-between;
}
#store-filter .filters .search-box .content {
  flex: 1;
}
#store-filter .filters .search-box .search-clear {
  width: 8vw;
  height: 100%;
  display: flex;
  align-items: center;
}
#store-filter .filters .search-box img {
  height: 3.8667vw;
  width: 4.2667vw;
  margin-right: 1.8667vw;
  flex-shrink: 0;
}
#store-filter .filters .filter-box {
  flex: 1;
  font-weight: bold;
}
#store-filter .filters .filter-box,
#store-filter .filters .filter-box .filter-item {
  justify-content: space-between;
}
#store-filter .filters .filter-box .arrows,
#store-filter .filters .filter-box .filter-item .arrows {
  height: 1.0667vw;
  width: 1.8667vw;
  margin-left: 1.3333vw;
}
#store-filter .filters .filter-box .filter,
#store-filter .filters .filter-box .filter-item .filter {
  width: 2.9333vw;
  height: 2.9333vw;
  margin-left: 0.6667vw;
}
#store-filter .select {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.3);
}
#store-filter .select .select-box {
  background: #f4f4f4;
  border-radius: 0vw 0vw 4.8vw 4.8vw;
  padding: 7.2vw 3.2vw;
  font-size: 3.4667vw;
  line-height: 3.4667vw;
  position: relative;
  animation: move-bottom 0.5s;
}
#store-filter .select .sort-item + .sort-item {
  margin-top: 7.2vw;
}
#store-filter .select .sort-item.active {
  color: #f4632c;
}
#store-filter .select .sel-price-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#store-filter .select .sel-price-section input {
  width: 42.6667vw;
  height: 11.7333vw;
  background: #ffffff;
  border-radius: 1.0667vw;
  text-align: center;
}
#store-filter .select .sel-price-list {
  display: flex;
  flex-wrap: wrap;
  margin: 6.6667vw 0 4vw;
}
#store-filter .select .sel-price-list .item {
  width: 21.3333vw;
  height: 8.5333vw;
  font-size: 3.2vw;
  line-height: 8.5333vw;
  background: #ffffff;
  border-radius: 1.0667vw;
  margin: 0 2.6667vw 2.6667vw 0;
  text-align: center;
}
#store-filter .select .sel-price-list .item.active {
  color: #f4632c;
}
#store-filter .select .sel-price-list .item:nth-child(4n+4) {
  margin-right: 0;
}
#store-filter .select .sel-price-btn button.active {
  background: #f4632c;
  color: #ffffff;
}

@keyframes move-left {
  0% {
    left: 100%;
  }
  100% {
    top: 0;
  }
}
#aside {
  position: fixed;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  background-color: #ffffff;
  padding: 4vw 3.2vw 0;
  box-sizing: border-box;
  animation: move-left 0.5s;
}
#aside .aside-back {
  display: flex;
  align-items: center;
  font-size: 4vw;
  margin-bottom: 5.3333vw;
  font-weight: 700;
}
#aside .aside-list {
  height: calc(100% - 29.3333vw);
  overflow-y: auto;
}

.aside-item .aside-item-title {
  font-size: 3.7333vw;
  font-weight: 700;
  margin-bottom: 3.3333vw;
}
.aside-item .child {
  display: flex;
  flex-wrap: wrap;
}
.aside-item .child .child-item {
  width: 21.3333vw;
  height: 8.5333vw;
  background: #f4f4f4;
  border-radius: 1.0667vw;
  font-size: 3.2vw;
  font-weight: 400;
  line-height: 8.5333vw;
  text-align: center;
  margin: 0 2.6667vw 2.6667vw 0;
  padding: 0 2.6667vw;
  box-sizing: border-box;
}
.aside-item .child .child-item:nth-child(4n+4) {
  margin-right: 0;
}
.aside-item .child .child-item.active {
  background: #ffebe4;
  color: #f4632c;
}

.aside-btn {
  height: 18.6667vw;
  align-items: center;
}
.aside-btn button {
  color: #ffffff;
}
.aside-btn .reset {
  background-color: #ffebe4;
  color: #f4632c;
}
.aside-btn .confirm {
  background-color: #f4632c;
}

.store-list {
  padding: 0 3.2vw;
  margin-bottom: 2.6667vw;
}
.store-list .list-platform {
  padding: 5.3333vw 4vw;
  border-radius: 4.2667vw;
}
.store-list .list-platform .platform-title {
  position: relative;
}
.store-list .list-platform .platform-title .store-icon {
  width: 4vw;
  height: 3.7333vw;
  margin-right: 1.3333vw;
}
.store-list .list-platform .platform-title .secret-icon {
  width: 2.5333vw;
  height: 3.2vw;
  margin-right: 1.3333vw;
}
.store-list .list-platform .platform-title .store-icon-noTitle {
  position: absolute;
  left: 0;
  top: 0.5333vw;
}
.store-list .list-platform .platform-title .desc-title {
  text-indent: 5.3333vw;
}
.store-list .list-platform .platform-middle .desc {
  margin-top: 4.6667vw;
}
.store-list .list-platform .platform-middle .price-collect {
  margin-top: 6.6667vw;
  padding-bottom: 4vw;
  border-bottom: 0.1333vw solid #ededed;
}
.store-list .list-platform .platform-bottom {
  margin-top: 5.3333vw;
}
.store-list .list-platform .platform-bottom img {
  width: 11.4667vw;
  height: 12vw;
  margin-right: 3.0667vw;
  border-radius: 50%;
}
.store-list .list-platform .platform-bottom .right-tag .mark span {
  padding: 1.3333vw;
  border-radius: 13.3333vw;
  background: #defff5;
  color: #76e0c0;
}
.store-list .list-platform .platform-bottom .right-tag .mark span:nth-child(2n) {
  background: #fff1eb;
  color: #f4632c;
}
.store-list .list-platform .platform-bottom .right-tag li {
  margin-top: 0.6667vw;
}
</style>
