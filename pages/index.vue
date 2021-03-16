<template>
  <div class="container">
    <main>
      <div id="scrollHeight">
        <van-swipe
          class="banner bg-main-color"
          :autoplay="2000"
          :show-indicators="false"
        >
          <van-swipe-item
            class="swiper-container"
            v-for="(item, index) in info.banner"
            :key="index"
          >
            <img :src="item.thumb" alt="九九牛网店交易平台，banner图" />
          </van-swipe-item>
        </van-swipe>
        <!-- 交易快报区域 -->
        <div class="trade-box bg-main-color d-f">
          <div class="trade-box-left">
            <img
              src="~assets/imgs/trade_icon.png"
              alt="九九牛网店交易平台，交易快报！"
            />
          </div>
          <van-swipe
            class="swiper2"
            :autoplay="4000"
            :show-indicators="false"
            vertical
          >
            <van-swipe-item v-for="(item, index) in info.trade" :key="index">
              <div class="trade-box-right font-size-24">
                <span class="font-main-color font-weight"
                  >{{ item.name }}
                </span>
                <span>
                  以￥{{ item.price }}购得{{ platform[item.platform]
                  }}{{ item.storeType }}</span
                >
              </div></van-swipe-item
            >
          </van-swipe>
        </div>
        <!-- 购买店铺区域 -->
        <div class="buyStore-box bg-main-color d-f d-f-between">
          <a href="" target="_blanck" title="九九牛网店交易平台，我要买店">
            <img
              src="~assets/imgs/icon_homeShop.png"
              alt="九九牛网店交易平台，我要买店"
            />
          </a>
          <a href="" target="_blanck" title="九九牛网店交易平台，我要卖店">
            <img
              src="~assets/imgs/icon_sellShop.png"
              alt="九九牛网店交易平台，我要卖点"
            />
          </a>
        </div>

        <!-- 快速入口区域 -->
        <div class="entryNav bg-main-color d-f d-f-around font-size-24">
          <div class="entryNav-item d-f-column">
            <img
              src="~assets/imgs/ic_home_classification_tianmao@2x.png"
              alt=""
            />
            天猫店
          </div>
          <div class="entryNav-item d-f-column">
            <img
              src="~assets/imgs/ic_home_classification_taobao@2x.png"
              alt=""
            />
            淘宝店
          </div>
          <div class="entryNav-item d-f-column">
            <img
              src="~assets/imgs/ic_home_classification_pinduoduo@2x.png"
              alt=""
            />
            拼多多店
          </div>
          <div class="entryNav-item d-f-column">
            <img
              src="~assets/imgs/ic_home_classification_jindong@2x.png"
              alt=""
            />
            京东店
          </div>
          <div class="entryNav-item d-f-column">
            <img src="~assets/imgs/ic_home_classification_qita@2x.png" alt="" />
            其他
          </div>
        </div>

        <!-- 品牌保障区域 -->
        <div class="brandProtection bg-main-color d-f d-f-between">
          <div class="brandProtection-item font-size-20 d-f">
            <img
              src="~assets/imgs/ic_home_service_pinpaibaozhang@2x.png"
              alt=""
            />
            品牌保障
          </div>
          <div class="brandProtection-item font-size-20 d-f">
            <img src="~assets/imgs/ic_home_service_zijinanquan@2x.png" alt="" />
            资金安全
          </div>
          <div class="brandProtection-item font-size-20 d-f ">
            <img
              src="~assets/imgs/ic_home_service_jiaoyipeitong@2x.png"
              alt=""
            />
            交易陪同
          </div>
          <div class="brandProtection-item font-size-20 d-f">
            <img
              src="~assets/imgs/ic_home_service_hetongyiqian@2x.png"
              alt=""
            />
            合同易签
          </div>
          <div class="brandProtection-item font-size-20 d-f">
            <img src="~assets/imgs/ic_home_service_falvyuanzhu@2x.png" alt="" />
            法律援助
          </div>
        </div>

        <!-- 网店入驻区域 -->
        <div class="storeIn-box bg-main-color">
          <div class="store-top d-f">
            <img src="~assets/imgs/bg_home_settlement_biaoshi@2x.png" alt="" />
            <h2 class="font-size-32 font-weight">网店入驻</h2>
            <span class="font-size-24 font-main-color2"
              >高效率快速入驻各大平台</span
            >
          </div>
          <div class="store-bottom d-f-between d-f">
            <a href="" target="_blanck" title="九九网店交易平台，天猫入驻">
              <img
                src="~assets/imgs/bg_home_settlement_tianmao@2x.png"
                alt=""
              />
            </a>
            <a href="" target="_blanck" title="九九网店交易平台，京东入驻">
              <img
                src="~assets/imgs/bg_home_settlement_jindong@2x.png"
                alt=""
              />
            </a>
            <a href="" target="_blanck" title="九九网店交易平台，拼多多入驻">
              <img
                src="~assets/imgs/bg_home_settlement_pinduoduo@2x.png"
                alt=""
              />
            </a>
            <a href="" target="_blanck" title="九九网店交易平台，其他入驻">
              <img src="~assets/imgs/bg_home_settlement_qita@2x.png" alt="" />
            </a>
          </div>
        </div>

        <!-- 大牌精选区域 -->

        <div class="bigSelection">
          <div class="bigSelection-top d-f">
            <img src="~assets/imgs/bg_home_settlement_biaoshi@2x.png" alt="" />
            <h2 class="font-size-32 font-weight">大牌精选</h2>
            <span class="font-size-24 font-main-color2"
              >近3000家大牌授权店</span
            >
          </div>
          <van-swipe
            class="bigSelection-bottom swiper-container "
            id="swiper3"
            :autoplay="3000"
            indicator-color="#F4632C"
          >
            <van-swipe-item
              v-for="(item, index) in Math.ceil(info.great.length / 8)"
              :key="index"
            >
              <div class="swiper-slide d-f  d-f-wrap">
                <img
                  v-for="(v, i) in info.great.slice(index*8,8*(index+1))"
                  :key="i"
                  :src="v.thumb"
                  alt="九九牛网店交易平台，大牌精选"
                />
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>

        <!-- 交易量区域 -->
        <div class="tradingVolume d-f d-f-around">
          <ul class="trading-item">
            <li class="font-size-46 font-weight font-main-color">
              {{ info.total.today.value }}<span class="font-size-22">个</span>
            </li>
            <li class="font-main-color2 font-size-20">今日交易量</li>
          </ul>
          <ul class="trading-item">
            <li class="font-size-46 font-weight font-main-color">
              {{ (info.total.amount.value / 10000).toFixed()
              }}<span class="font-size-22">万</span>
            </li>
            <li class="font-main-color2 font-size-20">历史交易量</li>
          </ul>
          <ul class="trading-item">
            <li class="font-size-46 font-weight font-main-color">
              {{ (info.total.count.value / 10000).toFixed()
              }}<span class="font-size-22">亿</span>
            </li>
            <li class="font-main-color2 font-size-20">历史交易金额</li>
          </ul>
        </div>

        <!-- 店铺精选 -->
        <div class="storeVip d-f d-f-between">
          <a
            class="vip-left d-block"
            href=""
            target="_blanck"
            title="九九牛网店交易平台，店铺精选"
          >
            <img
              src="~assets/imgs/bg_home_Porcelain_jinxuan@2x.png"
              alt="九九网店交易平台，天猫精选"
            />
          </a>
          <a
            class="vip-right d-block"
            href=""
            target="_blanck"
            title="九九牛网店交易平台，店铺精选"
          >
            <img
              src="~assets/imgs/bg_home_Porcelain_vip@2x.png"
              alt="九九牛网店交易平台，洋码头精选"
            />
            <img
              src="~assets/imgs/bg_home_Porcelain_xiangbao@2x.png"
              alt="九九牛网店交易平台，亚马逊精选"
            />
          </a>
        </div>
      </div>
      <!-- 店铺平台选择 -->
      <div class="platformSelect d-f d-f-between" >
        <h4  v-for="(item,index) in platformList" :key="index" @click="choosePlatform(item.value)" :class="item.value==pType?'font-size-32 font-weight':'font-size-28'">
          {{item.name}}
          <div v-if="item.value==pType" class="active-line"></div>
        </h4>
      </div>

      <!-- 店铺列表区域 -->
      <div class="store-list" v-for="(item,index) in list" :key="index">
        <div class="list-platform bg-main-color">
          <div class="platform-title d-f">
            <img
              src="~assets/imgs/icon_tm.png"
              alt="九九牛网店交易平台，店铺图标"
              class="store-icon"
            />
            <h3 class="font-size-30 font-weight">{{item.name}}</h3>
          </div>
          <div class="platform-middle">
            <p class="desc font-size-26 text-wraps">
              {{item.title}}
            </p>
            <div class="price-collect d-f d-f-between">
              <div class="price-left font-main-color">
                <span class="font-size-20">店铺售价￥</span>
                <span class="font-size-34 font-weight">{{ item.parse_price }}</span>
              </div>
              <div class="collect-right font-main-color2 font-size-20">
               {{item.collect}}人收藏
              </div>
            </div>
          </div>
          <div class="platform-bottom d-f-flex">
            <img :src="item.main_category.thumb" alt="" />
            <ul class="right-tag">
              <li class="font-main-color2 font-size-24">  {{
              item.main_category.name === "" ? "" : item.main_category.name + ""
            }}
            {{
              item.parse_trademark_type === ""
                ? ""
                : "/" + item.parse_trademark_type + "标"
            }}
            {{
              item.parse_store_type === "" ? "" : "/" + item.parse_store_type
            }}</li>
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
              <li class="font-main-color2 font-size-24">居家日用/R标/旗舰店</li>
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
              class="font-size-30 font-weight font-main-color4 text-wraps desc-title "
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
              <li class="font-main-color2 font-size-24">居家日用/R标/旗舰店</li>
              <li class="mark">
                <span class="d-inline-block font-size-20">牛牛严选</span>
                <span class="d-inline-block font-size-20">牛牛品鉴</span>
                <span class="d-inline-block font-size-20">牛牛严选</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 公司介绍 -->
      <div class="company-profile">
        <div class="bg-box">
          <div class="company-text">
            <h3 class="title font-weight font-size-32 bg-main-color">
              关于九九牛
            </h3>
            <p class="font-size-26">
              九九牛网店交易平台是一家集
              <span class="font-main-color font-weight">网店交易</span>、
              <span class="font-main-color font-weight">网店入驻</span>、
              <span class="font-main-color font-weight">网店转让</span>
              等电商综合服务于一体的交易服务平台，
              旗下业务覆盖淘宝、天猫、京东、拼多多、亚马逊、
              洋码头等电商平台，首创
              <span class="font-main-color font-weight">0佣金0差价</span>
              的服务体系，以
              <span class="font-main-color font-weight"
                >资金安全、流程简单、交易透明、专业高效</span
              >
              著称，致力于为买卖双方提供最放心、最权威的交易保障，
              使客户体验到最优质的交易服务。
            </p>
          </div>
          <div class="look-more font-main-color  ">
            <a
              href=""
              target="_blanck"
              class="d-block bg-main-color font-size-24 "
              title="九九牛网店交易平台，查看更多"
              >查看更多></a
            >
          </div>
        </div>
      </div>

      <!-- 版权 -->
      <div class="copyright d-f d-f-between">
        <a href="" title="九九牛网店交易平台" target="_blanck">
          <img src="~assets/imgs/draw1.png" alt="九九牛网店交易平台" />
        </a>
        <a href="" title="九九牛网店交易平台" target="_blanck">
          <img src="~assets/imgs/draw2.png" alt="九九牛网店交易平台" />
        </a>
        <a href="" title="九九牛网店交易平台" target="_blanck">
          <img src="~assets/imgs/draw3.png" alt="九九牛网店交易平台" />
        </a>
        <a href="" title="九九牛网店交易平台" target="_blanck">
          <img src="~assets/imgs/draw4.png" alt="九九牛网店交易平台" />
        </a>
      </div>

      <!-- 九九牛公司 -->
      <div class="jiujiuniu font-size-22">
        <p>川公网安备51010702002135号 &nbsp;&nbsp; 蜀ICP备20021454号-2</p>
        <p>四川九九牛网络科技有限公司</p>
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
          <nuxt-link class="tabbar-item active" to="/">
            <img src="~assets/imgs/tabbar/ic_home_tab_home_a.png" />
            <span>首页</span>
          </nuxt-link>
          <a class="tabbar-item" href="">
            <img src="~assets/imgs/tabbar/ic_home_tab_maidian_b.png" />
            <span>卖店</span>
          </a>
          <a class="tabbar-item" href="">
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
  async asyncData({ app }) {
    let [info, list] = await Promise.all([
      app.$api.getIndexList().then(res => (res.status === 1 ? res.data : {})),
      app.$api
        .getBoutique({
          platform: "normal",
          limit: 6
        })
        .then(res => (res.status === 1 ? res.data.store : []))
    ]);
    return {
      info,
      list
    };
  },
  data() {
    return {
      platform: {
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
      },
      platformList:[
         { value:'normal',name:"推荐"},
         { value:'tm',name:"天猫"},
         { value:'tb',name:"淘宝"},
         { value:'jd',name:"京东"},
         { value:'pdd',name:"拼多多"},
         { value:'qt',name:"其他"},
      ],
      pType:'normal',
      list:[]
    };
  },
  head() {
    return {
      title: "天猫淘宝网店出售_店铺入驻转让_专业网店交易平台-九九牛",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "九九牛是一家集网店交易、入驻、转让等电商综合业务于一体的虚拟资产交易平台，旗下业务覆盖淘宝、天猫、京东、小红书、唯品会等平台，以专业、高效为客户提供最优质的虚拟资产交易服务，为实现共同定义电商新时代的目标不懈努力。丰富行业经验帮您轻松买网店！网店转让交易就上九九牛!"
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "网店转让,网店交易，天猫店铺转让,天猫网店转让,网店出售,网店入驻，九九牛"
        }
      ]
    };
  },
  methods:{
    choosePlatform(v){
      this.pType=v;
      this.$api.getBoutique({
          platform:this.pType,
          limit: 6
        })
        .then(res => {
          if(res.status==1){
            this.list=res.data.store;
          }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
main {
}

.banner {
  box-sizing: border-box;
  .swiper-container {
    padding: 4vw 3.2vw;
  }
}
.banner .swiper-container img {
  width: 100%;
  height: 100%;
}

.trade-box {
  padding: 0vw 3.2vw;
  height: 4.5333vw;
}

.trade-box .trade-box-left img {
  width: 13.8667vw;
  height: 3.4667vw;
  padding-right: 2.2667vw;
  border-right: 0.1333vw solid #ededed;
}

.trade-box .swiper2 {
  height: 4.5333vw;
  margin-left: 0;
}

.trade-box .trade-box-right {
  padding-left: 2.6667vw;
}

.buyStore-box {
  height: 20.2667vw;
  padding: 0 3.2vw;
}

.buyStore-box img {
  width: 45.3333vw;
  height: 11.7333vw;
}

.entryNav {
  padding: 0 3.2vw;
  height: 22.8vw;
}

.entryNav .entryNav-item img {
  width: 11.7333vw;
  height: 11.7333vw;
  margin-bottom: 2.2667vw;
}

.brandProtection {
  padding: 3.8667vw 3.2vw 1.6vw;
  height: 12.5333vw;
  border-top: 0.1333vw solid #ededed;
  border-radius: 0vw 0vw 4.2667vw 4.2667vw;
  margin-bottom: 2.6667vw;
}

.brandProtection .brandProtection-item img {
  width: 2.9333vw;
  height: 2.9333vw;
  margin-right: 0.8vw;
}

.storeIn-box {
  padding: 2.6667vw 3.2vw;
  border-radius: 4.2667vw;
  margin-bottom: 2.6667vw;
}

.storeIn-box .store-top {
  height: 11.3333vw;
}

.storeIn-box .store-top img {
  width: 3.2vw;
  height: 3.6vw;
}

.storeIn-box .store-top h2 {
  margin: 0 2.5333vw 0 1.7333vw;
}

.storeIn-box .store-bottom {
  padding-bottom: 3.7333vw;
}

.storeIn-box .store-bottom img {
  width: 22.4vw;
  height: 17.3333vw;
}

.bigSelection {
  width: 100%;
  padding: 2.6667vw 3.2vw 0;
  border-radius: 4.2667vw 4.2667vw 0 0;
  background-image: linear-gradient(0deg, #f4f4f4 0%, #ffffff 100%);
  box-sizing: border-box;
  z-index: 666;
}

.bigSelection .bigSelection-top {
  height: 11.3333vw;
}

.bigSelection .bigSelection-top img {
  width: 3.2vw;
  height: 3.6vw;
}

.bigSelection .bigSelection-top h2 {
  margin: 0 2.5333vw 0 1.7333vw;
}

.bigSelection .bigSelection-bottom {
  padding-bottom: 4vw;
  height: 400px;
}

.bigSelection .bigSelection-bottom .swiper-pagination {
  bottom: 0;
}

.bigSelection .bigSelection-bottom img {
  width: 22.4vw;
  height: 22.4vw;
  border-radius: 2.1333vw;
  margin-bottom: 1.3333vw;
}

.bigSelection .bigSelection-bottom .my-bigSelection {
  display: inline-block;
  width: 5.3333vw;
  height: 0.8vw;
  background: #fff;
}

.bigSelection .bigSelection-bottom  .swiper-slide {
  height: 24.8vw;
  img{
    margin-right: 10px;
  }
  img:nth-child(4n+4){
    margin-right: 0 ;
  }
}

.bigSelection .bigSelection-bottom .my-bigSelection-active {
  display: inline-block;
  width: 4vw;
  height: 0.8vw;
  background: #f4632c;
  border-radius: 0.4vw;
}

.tradingVolume {
  height: 22.6667vw;
  padding: 3.2vw 3.2vw 0;
  background-image: linear-gradient(0deg, #f4f4f4 0%, #ffffff 100%);
  border-radius: 4.2667vw 4.2667vw 0 0;
}

.tradingVolume .trading-item {
  text-align: center;
}

.storeVip {
  padding: 0 3.2vw;
}

.storeVip .vip-left {
  width: 38.4vw;
}

.storeVip .vip-right {
  width: 53.6vw;
}

.storeVip .vip-right img:first-child {
  margin-bottom: 1.6vw;
}

.platformSelect {
  height: 17.3333vw;
  width: 100%;
  padding: 0 3.2vw;
  background: #f4f4f4;
  box-sizing: border-box;
}

.platformSelect h4 {
  position: relative;
}

.platformSelect h4 .active-line {
  position: absolute;
  bottom: -2.4vw;
  left: 50%;
  transform: translateX(-50%);
  width: 4.4vw;
  height: 0.8vw;
  background: #f4632c;
  border-radius: 0.4vw;
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
  line-height: 2.6667vw;
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

.store-list
  .list-platform
  .platform-bottom
  .right-tag
  .mark
  span:nth-child(2n) {
  background: #fff1eb;
  color: #f4632c;
}

.store-list .list-platform .platform-bottom .right-tag li {
  margin-top: 1.3333vw;
}

.company-profile {
  padding: 0 3.2vw;
}

.company-profile .bg-box {
  position: relative;
  width: 93.6vw;
  height: 82.6667vw;
  padding: 9.3333vw 4vw 0vw;
  border-radius: 4.2667vw;
  background: url("~assets/imgs/bg_home_about_us@2x.png") no-repeat;
  background-size: cover;
  box-sizing: border-box;
}

.company-profile .bg-box .company-text {
  position: relative;
  background: #fff;
  border-radius: 4.2667vw;
  padding: 8vw 4.4vw 3.8667vw 5.2vw;
  line-height: 6vw;
}

.company-profile .bg-box .company-text .title {
  position: absolute;
  top: -6.6667vw;
  left: 50%;
  transform: translateX(-50%);
  padding: 3.3333vw 7.2vw;
  border-radius: 13.3333vw;
  box-shadow: 0vw 0vw 4vw 0vw rgba(252, 106, 48, 0.2);
}

.company-profile .bg-box .look-more {
  position: absolute;
  right: 4vw;
  bottom: 2.6667vw;
}

.company-profile .bg-box .look-more a {
  padding: 2.6667vw 3.2vw 2.4vw 3.7333vw;
  border-radius: 6.6667vw;
}

.copyright {
  margin-top: 2.6667vw;
  padding: 0 3.2vw;
}

.copyright a {
  display: block;
  width: 22.6667vw;
  height: 10.6667vw;
}

.jiujiuniu {
  padding: 0 2.4vw;
  text-align: center;
}

.jiujiuniu p {
  margin-top: 2.6667vw;
}
</style>
