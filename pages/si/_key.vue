<template>
  <div class="container">
    <van-nav-bar title="店铺详情" left-arrow @click-left="$router.go(-1)" />

    <div class="storeInfo-box">
      <!-- 顾客服务组件 -->
      <customer-service
        :customerService="customerService"
        :platform="storeInfo.platform"
        @changeWx="$refs.pop.openDialog()"
        @changeCall="callPhone()"
      />
      <!-- 店铺信息组件 -->
      <store-list
        isInfo
        :storeList="storeList"
        :isShowList="false"
        :jump="false"
      ></store-list>
      <!-- 网店编号 -->
      <div class="storeMsg si-copy">
        <span>网店编号：{{ storeInfo.code | fourFormat }}</span>
        <div class="copy" @click="$utils.copy(storeInfo.code, that)">
          复制
        </div>
      </div>
      <!-- 店铺详情 -->
      <div class="storeMsg">
        <div class="storeMsg-top">
          <div
            @click="event(0)"
            class="text"
            :class="{ active: activeIndex === 0 }"
          >
            店铺信息
            <div v-if="activeIndex === 0"></div>
          </div>
          <div
            @click="event(1)"
            class="text"
            v-if="storeInfo.storeType != 200 || storeInfo.platform != 'tb'"
            :class="{ active: activeIndex === 1 }"
          >
            企业信息
            <div v-if="activeIndex === 1"></div>
          </div>
          <div
            @click="event(2)"
            class="text"
            v-if="storeInfo.platform != 'tb'"
            :class="{ active: activeIndex === 2 }"
          >
            商标信息
            <div v-if="activeIndex === 2"></div>
          </div>
        </div>
        <div class="storeMsg-center" v-if="activeIndex === 0">
          <div v-if="storeInfo.platform === 'tb'">
            <div class="storeMsg-item">
              <span>店铺类型:</span>
              {{
                storeInfo.parse_store_type ? storeInfo.parse_store_type : "-"
              }}
            </div>
            <div class="storeMsg-item grade">
              <span>店铺等级:</span>
              <img
                mode="heightFix"
                v-if="storeInfo.creditRate <= 5"
                :src="
                  '../../static/img/credit_' + storeInfo.creditRate + '.png'
                "
                alt="店铺等级图标"
              />
              <img
                mode="heightFix"
                v-else
                :src="
                  '../../static/img/credit_' + storeInfo.creditRate + '.gif'
                "
                alt="店铺等级图标"
              />
            </div>
            <div class="storeMsg-item">
              <span>好评率:</span>
              {{ storeInfo.critics ? storeInfo.critics + "%" : "-" }}
            </div>
            <div class="storeMsg-item">
              <span>创店年份:</span>
              {{ storeInfo.year ? storeInfo.year : "-" }}
            </div>
          </div>

          <div v-else-if="storeInfo.platform === 'jd'">
            <div class="storeMsg-item">
              <span>店铺类型:</span>
              {{
                storeInfo.parse_store_type ? storeInfo.parse_store_type : "-"
              }}
            </div>
            <div class="storeMsg-item">
              <span>店铺等级:</span>
              <van-rate
                v-if="storeInfo.jdCredit"
                allow-half
                size="16"
                :readonly="true"
                v-model="storeInfo.jdCredit"
              />
              <span v-else>-</span>
            </div>
            <div class="storeMsg-item">
              <span>有无爆款:</span>
              {{ storeInfo.haveHotGoods === 1 ? "是" : "无" }}
            </div>
            <div class="storeMsg-item">
              <span>创店年份:</span>
              {{ storeInfo.year ? storeInfo.year : "-" }}
            </div>
          </div>
          <!-- 天猫 -->
          <div v-else>
            <div class="storeMsg-item">
              <span>店铺类型:</span>
              {{
                storeInfo.parse_store_type ? storeInfo.parse_store_type : "-"
              }}
            </div>
            <div class="storeMsg-item">
              <span>创店年份:</span>
              {{ storeInfo.year ? storeInfo.year : "-" }}
            </div>
            <div class="storeMsg-item">
              <span>已开通类目:</span>
              <div v-if="storeInfo.parse_first_category.length > 0">
                <span
                  class="more-type"
                  space="ensp"
                  v-for="(item, index) in storeInfo.parse_first_category"
                  :key="index"
                >
                  {{ item ? item + " " : "-" }}
                </span>
              </div>
              <span class="more-type" v-else>-</span>
            </div>
            <div class="storeMsg-item">
              <span>违规扣分:</span>
              一般 {{ storeInfo.violationsGeneral }}分/ 严重
              {{ storeInfo.violationsSerious }}分/ 售价
              {{ storeInfo.violationsSellingFake }}分
            </div>
          </div>
          <!-- 分割区域 -->
          <div class="moreInfo" @click="showMore()" v-if="isShowMore">
            <span>展示更多店铺信息</span>
            <!-- <img src="../../assets/imgs/ic_shop_details_information_xiala.png" /> -->
          </div>
          <!-- 超出6条隐藏 -->
          <div v-else>
            <!-- 京东平台 -->
            <div v-if="storeInfo.platform === 'jd'">
              <div class="storeMsg-item">
                <span>违规扣分:</span>
                一般 {{ storeInfo.violationsGeneral }}分/ 严重
                {{ storeInfo.violationsSerious }}分/ 售价
                {{ storeInfo.violationsSellingFake }}分
              </div>
              <div class="storeMsg-item">
                <span>收藏人数:</span>
                {{ storeInfo.collectCount ? storeInfo.collectCount : "-" }}
              </div>
              <div class="storeMsg-item">
                <span>经营状态:</span>
                {{ storeInfo.operationStatus === 1 ? "在经营" : "未经营" }}
              </div>
              <div class="storeMsg-item">
                <span>运营经验:</span>
                {{ storeInfo.operationExp === 1 ? "传授" : "不传授" }}
              </div>
              <div class="storeMsg-item">
                <span>店铺贷款：</span>
                {{ storeInfo.is_loan ? "有贷款" : "无贷款" }}
              </div>
              <div class="storeMsg-item">
                <span>直播权限:</span>
                {{ storeInfo.live === 1 ? "有" : "无" }}
              </div>
              <div class="storeMsg-item">
                <span>当面交易：</span>
                {{ storeInfo.faceTransaction == 1 ? "是" : "否" }}
              </div>
              <div class="storeMsg-item">
                <span>带货出售:</span>
                {{ storeInfo.sellWithGoods === 1 ? "是" : "否" }}
              </div>
              <div class="storeMsg-item">
                <span>提供货源:</span>
                {{ storeInfo.supplySource === 1 ? "是" : "否" }}
              </div>
            </div>

            <!-- 淘宝平台 -->
            <div v-else-if="storeInfo.platform === 'tb'">
              <div class="storeMsg-item">
                <span>店铺信誉:</span>
                {{ storeInfo.reputation ? storeInfo.reputation : "-" }}
              </div>
              <div class="storeMsg-item">
                <span>粉丝数量:</span>
                {{ storeInfo.fans ? storeInfo.fans : "-" }}
              </div>
              <div class="storeMsg-item">
                <span>收藏人气:</span>
                {{ storeInfo.collectCount ? storeInfo.collectCount : "-" }}
              </div>
              <div class="storeMsg-item">
                <span>违规扣分:</span>
                一般 {{ storeInfo.violationsGeneral }}分/ 严重
                {{ storeInfo.violationsSerious }}分/ 售价
                {{ storeInfo.violationsSellingFake }}分
              </div>
              <div class="storeMsg-item">
                <span>所在地区：</span>
                {{ storeInfo.regionalRegion ? storeInfo.regionalRegion : "-" }}
              </div>
              <div class="storeMsg-item">
                <span>店铺贷款：</span>
                {{ storeInfo.is_loan ? "有贷款" : "无贷款" }}
              </div>
              <div class="storeMsg-item">
                <span>直播权限：</span>
                {{ storeInfo.live ? "有" : "无" }}
              </div>
              <div class="storeMsg-item">
                <span>当面交易：</span>
                {{ storeInfo.faceTransaction === 1 ? "是" : "否" }}
              </div>
              <div class="storeMsg-item">
                <span>带货出售:</span>
                {{ storeInfo.sellWithGoods === 1 ? "是" : "否" }}
              </div>
              <div class="storeMsg-item">
                <span>提供货源:</span>
                {{ storeInfo.supplySource === 1 ? "是" : "否" }}
              </div>
            </div>

            <!-- 天猫平台 -->
            <div v-else>
              <div class="storeMsg-item">
                <span>经营状态:</span>
                {{ storeInfo.operationStatus === 1 ? "在经营" : "未经营" }}
              </div>
              <div class="storeMsg-item">
                <span>运营经验:</span>
                {{ storeInfo.operationExp === 1 ? "传授" : "不传授" }}
              </div>
              <div class="storeMsg-item">
                <span>运营团队转让：</span>
                {{ storeInfo.teamTransfer === 1 ? "转让" : "不转让" }}
              </div>
              <div class="storeMsg-item">
                <span>店铺贷款：</span>
                {{ storeInfo.is_loan ? "有贷款" : "无贷款" }}
              </div>
              <div class="storeMsg-item">
                <span>当面交易：</span>
                {{ storeInfo.faceTransaction == 1 ? "是" : "否" }}
              </div>
              <div class="storeMsg-item">
                <span>带货出售:</span>
                {{ storeInfo.sellWithGoods === 1 ? "是" : "否" }}
              </div>
              <div class="storeMsg-item">
                <span>提供货源:</span>
                {{ storeInfo.supplySource === 1 ? "是" : "否" }}
              </div>
              <div class="storeMsg-item">
                <span>是否带行业字眼:</span>
                {{ storeInfo.industryWord === 1 ? "是" : "否" }}
              </div>
              <div class="storeMsg-item">
                <span>是否带实体:</span>
                {{ storeInfo.entity === 1 ? "是" : "否" }}
              </div>
            </div>
          </div>
        </div>

        <!-- 公司 -->
        <div class="storeMsg-center" v-if="activeIndex === 1">
          <div class="storeMsg-item">
            <span>所在地区：</span>
            {{ storeInfo.regionalRegion ? storeInfo.regionalRegion : "-" }}
          </div>
          <div class="storeMsg-item">
            <span>纳税性质：</span>
            {{ storeInfo.parse_tax_type ? storeInfo.parse_tax_type : "-" }}
          </div>
          <div class="storeMsg-item">
            <span>注册资金：</span>
            {{
              storeInfo.registeredCapital
                ? storeInfo.registeredCapital + "万"
                : "-"
            }}
          </div>
          <div class="storeMsg-item">
            <span>企业贷款：</span>
            {{ storeInfo.enLoan == 1 ? "有" : "无" }}
          </div>
          <div class="storeMsg-item">
            <span>企业债权：</span>
            {{ storeInfo.enCreditors == 1 ? "有" : "无" }}
          </div>
          <div class="storeMsg-item">
            <span>公司类型：</span>
            {{ storeInfo.parse_type ? storeInfo.parse_type : "-" }}
          </div>
          <div class="storeMsg-item">
            <span>迁移地址：</span>
            {{ storeInfo.transferAddress === 1 ? "可迁移" : "不可迁移" }}
          </div>
          <div class="storeMsg-item">
            <span>公司过户：</span>
            {{ storeInfo.enTransfer === 1 ? "是" : "否" }}
          </div>
          <div class="storeMsg-item">
            <span>地址类型：</span>
            {{
              storeInfo.parse_address_type ? storeInfo.parse_address_type : "-"
            }}
          </div>
        </div>

        <!-- 商标 -->
        <div class="storeMsg-center" v-if="activeIndex === 2">
          <div class="storeMsg-item">
            <span>商标类型：</span>
            {{
              storeInfo.parse_trademark_type
                ? storeInfo.parse_trademark_type
                : "-"
            }}
          </div>
          <div class="storeMsg-item">
            <span>商标类别：</span>
            <div v-if="storeInfo.parse_trademark.length > 0">
              <span
                class="more-type"
                space="ensp"
                v-for="(item, index) in storeInfo.parse_trademark"
                :key="index"
              >
                {{ item.name }}</span
              >
            </div>
            <span class="more-type" v-else>-</span>
          </div>
          <div class="storeMsg-item">
            <span>商标名称类型：</span>
            {{
              storeInfo.parse_trademark_name_type
                ? storeInfo.parse_trademark_name_type
                : "-"
            }}
          </div>
          <div class="storeMsg-item">
            <span>商标归属：</span>
            {{
              storeInfo.parse_trademark_ownership
                ? storeInfo.parse_trademark_ownership
                : "-"
            }}
          </div>
          <div class="storeMsg-item">
            <span>商标属性：</span>
            {{
              storeInfo.parse_trademark_attr
                ? storeInfo.parse_trademark_attr
                : "-"
            }}
          </div>
          <div class="storeMsg-item">
            <span>商标持有人：</span>
            {{
              storeInfo.parse_trademark_hold
                ? storeInfo.parse_trademark_hold
                : "-"
            }}
          </div>
        </div>
      </div>
      <!-- 卡片组件 -->
      <card title="店铺截图" v-if="screenshotList.length != 0">
        <div class="screenshot">
          <div
            v-for="(item, index) in screenshotList"
            :key="index"
            class="screenshot-item"
          >
            <img
              :src="item.thumb"
              @click="previewImg(screenshotList, index)"
              :alt="storeInfo.title + '截图' + (index + 1)"
            />
          </div>
        </div>
      </card>
      <!-- 店铺动态 -->
      <card title="店铺动态">
        <div
          class="shopDynamic"
          v-for="(item, index) in shopDynamics"
          :key="index"
        >
          <span>{{ item.title }}</span>
          <div class="progress">
            <van-progress
              color="#f4632c"
              :show-pivot="false"
              :percentage="percent[item.keys]"
            />
          </div>
          <div class="evaluate" :class="'evaluate-' + item.keys">
            {{ desc[item.keys] }}
          </div>
        </div>
      </card>
      <!-- 店铺费用 -->
      <card title="网店预估费用">
        <div class="qiun-columns qiun-bg-white">
          <div class="qiun-bg-white qiun-title-bar qiun-common-mt"></div>
          <div class="qiun-charts">
            <canvas id="myChart" class="charts"></canvas>
          </div>
          <div class="chart-legend">
            <div
              class="chart-legend-item"
              v-for="(item, index) in legendList"
              :key="index"
            >
              <div class="cl-dot" :style="{ background: item.color }"></div>
              <div class="cl-content">
                <div class="cl-title">
                  {{ item.name }}
                </div>
                <div class="cl-price">￥{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </card>
      <!-- 顾客服务组件 -->
      <customer-service
        :customerService="customerService"
        :platform="storeInfo.platform"
        @changeWx="$refs.pop.openDialog()"
        @changeCall="callPhone()"
      />
      <!-- 交易流程 -->
      <card title="网店交易流程">
        <div class="trade-process">
          <div v-for="(item, index) in tradeList" :key="index">
            <div class="trade-item">
              <div>
                <img :src="item.src" :alt="item.title" />
              </div>
              <span>{{ item.title }}</span>
            </div>
            <div class="trade-arrow">
              <img
                v-if="index !== tradeList.length - 1"
                src="../../assets/imgs/ic_shop_details_process_jiantou.png"
                class="arrow-img"
                alt="箭头图标"
              />
            </div>
          </div>
        </div>
        <div class="divider">
          <img
            src="../../assets/imgs/ic_shop_details_process_zhishitiao.png"
            alt=""
          />
        </div>
      </card>
      <!-- 猜你喜欢 -->
      <div class="storeInfo-bottom">
        <div class="guessLikes">
          <div class="left">
            <img src="../../assets/imgs/ic_shop_details_guess_aixing.png" />
            <span>{{
              "更多" + $utils.getPname(storeInfo.platform) + "网店"
            }}</span>
          </div>
          <div class="right" @click="getRecommend()">
            <img
              src="../../assets/imgs/ic_shop_details_guess_huanyipi.png"
              alt="换一批图标"
            />
            <span>换一批</span>
          </div>
        </div>
      </div>
      <store-list :storeList="recommendList" :isShowList="true"></store-list>
      <div class="footerFixed">
        <div class="collent" @click="isShowCollect()">
          <img
            :src="
              isCollect
                ? require('../../assets/imgs/ic_shop_details_tab_shoucang_b.png')
                : require('../../assets/imgs/ic_shop_details_tab_shoucang_a.png')
            "
            alt="收藏图标"
          />
          <span :class="isCollect ? 'active-color' : ''">{{
            isCollect ? "已收藏" : "收藏"
          }}</span>
        </div>
        <div class="collent" @click="$refs.pop.openDialog()">
          <img
            src="../../assets/imgs/ic_shop_details_tab_weixin.png"
            alt="客服微信图标"
          />
          <span>微信</span>
        </div>
        <div class="collent" @click="callPhone()">
          <img
            src="../../assets/imgs/ic_shop_details_tab_dianhua.png"
            alt="客服电话图标"
          />
          <span>电话</span>
        </div>
        <div class="order-bargainirg">
          <span @click="immediatelypurchase()">0元下单</span>
          <span @click="bargain()">我要砍价</span>
        </div>
      </div>
    </div>
    <custom-dialog
      ref="pop"
      type="code"
      :qrcode="customerService.wechatQr"
      title="扫码添加客服微信"
    >
    </custom-dialog>
  </div>
</template>

<script>
import CustomerService from "../../components/store-info/customer-service";
import { ImagePreview } from "vant";
export default {
  async asyncData({ app, params, error }) {
    let key = params.key || "";
    let [storeInfo, recommendList] = await Promise.all([
      app.$api.getStoreInfo(key).then(res => (res.status == 1 ? res.data : {})),
      app.$api.StoreList(key).then(res => (res.status == 1 ? res.data : []))
    ]);
    if (JSON.stringify(storeInfo) == "{}") {
      return error({
        message: "This page could not be found.",
        statusCode: 404
      });
    }
    let customerService = storeInfo.customer_service;
    let storeList = [];
    storeList.push(storeInfo);
    let screenshotList = storeInfo.thumbs;
    let shopDynamics = [];
    for (let key in storeInfo) {
      if (
        key === "consistentScore" ||
        key === "attitudeScore" ||
        key === "logisticsScore"
      ) {
        shopDynamics.push({
          keys: storeInfo[key]
        });
      }
    }
    shopDynamics[0].title = "宝贝与描述相符";
    shopDynamics[1].title = "卖家的服务态度";
    shopDynamics[2].title = "卖家的发货速度";
    let isCollect = storeInfo.is_collect;
    let legendList = [
      {
        value: Number(storeInfo.price) || 0,
        name: "网店售价",
        color: "#ED4F48"
      },
      {
        value: Number(storeInfo.protectionPrice) || 0,
        name: "消费者保障金",
        color: "#9262FF"
      },
      {
        value: Number(storeInfo.technologyYearPrice) || 0,
        name: "技术年费",
        color: "#FF9860"
      },
      {
        value: Number(storeInfo.buyer_commission) || 0,
        name: "服务费",
        color: "#56E4CE"
      }
    ];
    return {
      key,
      storeInfo,
      storeList,
      customerService,
      screenshotList,
      shopDynamics,
      recommendList,
      isCollect,
      legendList
    };
  },
  head() {
    return {
      title: `${this.storeInfo.title}_${this.storeInfo.parse_platform}店铺购买-九九牛`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: `${this.storeInfo.title},九九牛网店交易平台提供网店编号为${this.storeInfo.code}的${this.storeInfo.parse_platform}店铺购买服务。`
        },
        {
          hid: "keywords",
          name: "keywords",
          content: `${this.storeInfo.title},${this.storeInfo.parse_platform}店铺购买,${this.storeInfo.parse_platform}商城转让,${this.storeInfo.parse_platform}商城出售`
        }
      ],
      script: [
        {
          src:
            "https://dgt.zoosnet.net/JS/LsJS.aspx?siteid=DGT54828764&float=1&lng=cn"
        }
      ]
    };
  },
  data() {
    return {
      cWidth: "",
      cHeight: "",
      pixelRatio: 1,
      serverData: "",
      storeList: [],
      customerService: {},
      recommendList: [],
      legendList: [],
      that: this,
      tradeList: [
        {
          title: "确定店铺",
          src: require("../../assets/imgs/store/ic_shop_details_process_quedingdianpu.png")
        },
        {
          title: "验证店铺",
          src: require("../../assets/imgs/store/ic_shop_details_process_yanzhengdianpu.png")
        },
        {
          title: "签署合同",
          src: require("../../assets/imgs/store/ic_shop_details_process_qianshuhetong.png")
        },
        {
          title: "店铺过户",
          src: require("../../assets/imgs/store/ic_shop_details_process_guohu.png")
        },
        {
          title: "交易完成",
          src: require("../../assets/imgs/store/ic_shop_details_process_wancheng.png")
        }
      ],
      screenshotList: [],
      prediv: [],
      shopDynamics: [],
      percent: ["0", "20", "50", "100"],
      desc: ["无", "低", "中", "高"],
      storeInfo: "",
      storeMsgTitle: [
        {
          name: "店铺信息"
        },
        {
          name: "企业信息"
        },
        {
          name: "商标信息"
        }
      ],
      activeIndex: 0,
      isShowMore: true,
      isCollect: true,
      key: ""
    };
  },
  components: {
    CustomerService
  },
  filters: {
    fourFormat(str) {
      if (str) {
        str = str.replace(/\s/g, "").replace(/(.{4})/g, "$1 ");
      }
      return str;
    }
  },
  mounted() {
    this.echartsInit();
  },
  methods: {
    // 拨打电话
    callPhone() {
      window.location.href = "tel:" + this.customerService.workTel;
    },
    // 店铺信息选择
    event(val) {
      this.activeIndex = val;
    },
    // 展示更多店铺信息
    showMore() {
      this.isShowMore = false;
    },
    // 获取推荐列表数据
    async getRecommend(key = this.key) {
      let res = await this.$api.StoreList(key);
      this.recommendList = res.data;
    },
    // 判断是否收藏
    isShowCollect() {
      if (!this.$utils.isLogin(this)) {
        return this.$router.push("/login");
      }
      this.isCollect = !this.isCollect;
      if (!this.isCollect) {
        this.$api.CollectDel(this.key).then(res => {
          this.$toast("已取消收藏");
        });
      } else {
        this.$api.CollectAdd(this.key).then(res => {
          this.$toast("收藏成功！");
        });
      }
    },
    //砍价
    bargain() {
      if (this.storeInfo.status != "4") {
        return this.$toast("店铺已出售");
      }
      this.$router.push("/bargain/" + this.key);
    },
    immediatelypurchase() {
      if (!this.$utils.isLogin(this)) {
        // 存储判断0元下单信息
        sessionStorage.setItem("customer", 1);
        sessionStorage.setItem("key", this.key);
        //return this.redirect('"/login/visitorsOrder?key=" + this.key')
        return this.$router.push("/login/visitorsOrder?key=" + this.key);
      }
      if (this.storeInfo.status != "4") {
        return this.$toast("店铺已出售");
      }
      this.$toast.loading({
        message: "创建中...",
        forbidClick: true,
        loadingType: "spinner"
      });
      this.$api
        .CreateOrder(this.key)
        .then(res => {
          if (res.status == 1) {
            this.$toast.success("订单创建成功");
            this.$router.push("/order-success/" + res.data.key);
          }
          this.$toast.clear();
        })
        .catch(err => {
          this.$toast.clear();
        });
    },
    echartsInit() {
      // 找到容器
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let _this = this;
      // 开始渲染
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#ED4F48", "#9262FF", "#FF9860", "#56E4CE"],
        series: [
          {
            type: "pie",
            radius: [30, 50],
            data: _this.legendList,
            emphasis: {
              itemStyle: {
                borderColor: "#fff",
                borderWidth: 1
              }
            },
            label: {
              normal: {
                show: true,
                formatter: "{d}%",
                textStyle: {
                  fontSize: 10
                }
              }
            }
          }
        ]
      });
    },
    // 图片预览
    previewImg(val, index) {
      ImagePreview({
        images: val,
        closeable: true,
        startPosition: index
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.grade {
  img {
    height: 30px;
  }
}

.storeInfo-box {
  padding-bottom: 125px;

  // 查看截图
  .screenshot {
    height: 120px;
    width: 750px;
    display: flex;
    width: 100%;
    white-space: nowrap;
    overflow: scroll;
    .screenshot-item {
      width: 170px;
      height: 120px;
      background: pink;
      margin-right: 20px;
      display: inline-block;
      border-radius: 32px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // 店铺动态
  .shopDynamic {
    padding: 0 24px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
      font-size: 24px;
    }

    .progress {
      flex: 1;
      margin: 0 26px 0 36px;
    }

    .evaluate,
    .evaluate-0,
    .evaluate-1 {
      padding: 10px 26px;
      background: #e5e5e5;
      border-radius: 20px;
      font-size: 20px;
    }

    .evaluate-2 {
      color: #ffffff;
      background-color: #0cc367;
    }

    .evaluate-3 {
      color: #f4632c;
      background-color: #fff1eb;
    }
  }

  // 交易流程样式
  .trade-process {
    padding: 0 39px;
    display: flex;
    font-size: 20px;
    color: #1c1c1c;
    justify-content: space-between;
    margin-top: 10px;
    block {
      display: flex;
    }
    .trade-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 44px;
        height: 38px;
        margin-bottom: 18px;
      }
    }

    .trade-arrow {
      height: 44px;
      display: flex;
      align-items: center;

      .arrow-img {
        width: 24px;
        height: 14px;
        vertical-align: center;
      }
    }
  }

  .divider {
    margin-top: 26px;
    text-align: center;

    img {
      width: 674px;
      height: 15px;
    }
  }

  .storeInfo-bottom {
    padding: 0 24px;
  }

  // 猜你喜欢
  .guessLikes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;

    .left {
      font-size: 30px;
      font-weight: 700;

      img {
        width: 28px;
        height: 24px;
        margin-right: 10px;
      }
    }

    .right {
      font-size: 26px;
      color: #999;

      img {
        width: 22px;
        height: 22px;
        margin-right: 10px;
      }
    }
  }

  // :class=" ? 'active-storeMsg-tetx' : ''"
  // 店铺详情
  .storeMsg {
    border-radius: 32px;
    background: #fff;
    padding: 0 24px;
    margin-bottom: 20px;
    .storeMsg-top {
      height: 109px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 28px;
      border-bottom: 1px solid #ededed;
      .active {
        font-weight: 700;
      }
      .text {
        height: 109px;
        line-height: 109px;
        position: relative;

        div {
          position: absolute;
          width: 42px;
          height: 6px;
          background: #f4632c;
          -webkit-border-radius: 3px;
          border-radius: 3px;
          position: absolute;
          bottom: 0px;
          left: 50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
        }
      }
    }

    .active-storeMsg-tetx {
      color: #f4632c;
      font-weight: 700;
      border-bottom: 6px solid #f4632c;
      border-radius: 3px;
    }

    .storeMsg-center {
      // line-height: 109px;
      font-size: 26px;

      .storeMsg-item {
        min-height: 109px;
        border-bottom: 1px solid #ededed;
        display: flex;
        align-items: center;
        padding: 15px 0;
        box-sizing: border-box;

        /* overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap; */
        .more-type {
          color: #000000;
        }

        span {
          font-size: 26px;
          color: #999;
          margin-right: 8px;
          flex-shrink: 0;
        }
      }

      .moreInfo {
        height: 109px;
        color: #f4632c;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 14px;
          height: 8px;
          vertical-align: center;
          margin-left: 8px;
        }
      }
    }
  }

  /* 复制 */
  .si-copy {
    font-size: 24px;
    display: flex;
    padding: 35px 24px;
    justify-content: space-between;
    align-items: center;

    .copy {
      height: 46px;
      line-height: 46px;
      text-align: center;
      width: 86px;
      background-color: #f4f4f4;
      border-radius: 23px;
      font-size: 20px;
    }
  }
}

.footerFixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  z-index: 999;
  background: #fff;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .collent {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 24px;
    color: #1c1c1c;

    img {
      width: 32px;
      height: 30px;
      margin-bottom: 10px;
    }
  }

  .order-bargainirg {
    height: 88px;
    width: 373px;
    border-radius: 44px;
    padding: 0 40px 0 50px;
    background: url("../../assets/imgs/bt_shop_details_tab_xiadan.png");
    background-size: cover;
    font-size: 28px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .active-color {
    color: #f4632c;
  }
}

.chart-legend {
  width: 700px;
  margin: 0 auto;
  border-top: 1px solid #ededed;
  // background-color: #FFFFFF;
  padding: 40px 20px 0;

  &,
  .chart-legend-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .chart-legend-item {
    .cl-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      margin-right: 15px;
    }

    .cl-content {
      font-size: 20px;
      text-align: center;

      .cl-title {
        color: #999999;
      }
    }
  }
}
</style>
<style>
page {
  background: #f2f2f2;
  width: 750px;
  overflow-x: hidden;
}

.qiun-padding {
  padding: 2%;
  width: 96%;
}

.qiun-wrap {
  display: flex;
  flex-wrap: wrap;
}

.qiun-rows {
  display: flex;
  flex-direction: row !important;
}

.qiun-columns {
  display: flex;
  flex-direction: column !important;
}

.qiun-common-mt {
  margin-top: 10px;
}

.qiun-bg-white {
  background: #ffffff;
}

.qiun-title-bar {
  width: 96%;
  padding: 10px 2%;
  flex-wrap: nowrap;
}

.qiun-title-dot-light {
  border-left: 10px solid #0ea391;
  padding-left: 10px;
  font-size: 32px;
  color: #000000;
}

.qiun-charts {
  width: 750px;
  height: 500px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.charts {
  background-color: #ffffff;
  height: 75%;
  width: 100%;
}
</style>
