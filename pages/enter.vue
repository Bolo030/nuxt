<template>
<main>
  <van-nav-bar :title="platform[platformType].name" left-arrow @click-left="$router.go(-1)" />
  <div class="store-in" :class="platformType">
    <div class="store-banner">
      <div class="enter-nav">
        <a
          v-for="(item, index) in platform"
          v-if="index!=platformType"
          :key="index"
          :href="'/enter?p=' + index"
        >
          <span>{{ item.name }}</span>
          <van-icon name="arrow" color="#fff" size="15" />
        </a>
      </div>
      <img class="banner" :src="platform[platformType].banner" />
      <!-- 公告 -->
      <div class="notice">
        <div class="notice-content">
          <img :src="platform[platformType].notice" />
          <div class="notice-text">
            <img src="../assets/imgs/store/enter-horn.png" />
            <van-swipe
              class="swiper"
              :autoplay="2000"
              vertical
              loop
              :show-indicators="false"
            >
              <van-swipe-item>
                <div class="swiper-slide flex-vertical">
                  恭喜<span>人**梦</span>成功入驻天猫店铺
                </div>
              </van-swipe-item>
              <van-swipe-item>
                <div class="swiper-slide flex-vertical">
                  恭喜<span>人**梦</span>成功入驻天猫店铺
                </div>
              </van-swipe-item>
              <van-swipe-item>
                <div class="swiper-slide flex-vertical">
                  恭喜<span>人**梦</span>成功入驻天猫店铺
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
        </div>
      </div>
      <!-- 提交信息 -->
      <div class="enter-form com-width">
        <img
          class="ef-title"
          :src="platform[platformType].comIcon"
          alt="九九牛标题"
        />
        <h3 class="ef-title-text">提交需求 等待顾问来电</h3>
        <div class="ef-input-box">
          <span class="w-iconfont">&#xe604;</span>
          <input type="text" v-model="formData.product" placeholder="你的店铺主打产品是什么？" />
        </div>
        <div class="ef-input-box">
          <span class="w-iconfont">&#xe6e0;</span>
          <input type="text" v-model="formData.mobile" placeholder="请输入您的联系方式" />
        </div>
        <div class="ef-input-box more">
          <span class="w-iconfont">&#xe840;</span>
          <textarea placeholder="你还可以留言您的要求或疑问 …"></textarea>
        </div>
        <button class="ef-btn" @click="onSubmit">立即提交</button>
      </div>
      <!-- 类目入驻 -->
      <div class="enter-category com-width">
        <div class="enter-category-title">
          <text class="red">全类目</text>皆可入驻
        </div>
        <div>可入驻的类目不止这些哦，详细请联系客服</div>
        <div class="enter-type-list">
          <div>
            <img src="../assets/imgs/store/enter-fz.png" />
            <div>服饰</div>
          </div>
          <div>
            <img src="../assets/imgs/store/enter-hzp.png" />
            <div>母婴</div>
          </div>
          <div>
            <img src="../assets/imgs/store/enter-fz.png" />
            <div>化妆品</div>
          </div>
          <div>
            <img src="../assets/imgs/store/enter-sp.png" />
            <div>食品</div>
          </div>
          <div>
            <img src="../assets/imgs/store/enter-xz.png" />
            <div>鞋类箱包</div>
          </div>
          <div>
            <img src="../assets/imgs/store/enter-qc.png" />
            <div>汽车配件</div>
          </div>
          <div>
            <img src="../assets/imgs/store/enter-hw.png" />
            <div>户外运动</div>
          </div>
          <div>
            <img src="../assets/imgs/store/enter-yl.png" />
            <div>保健医疗</div>
          </div>
        </div>
        <div class="ec-more">
          <img class="ec-more-kf" src="../assets/imgs/store/enter-kf.png" />
          <span>咨询客服</span>
          <img class="ec-more-into" src="../assets/imgs/store/enter-into.png" />
        </div>
      </div>
      <img
        class="enter-line"
        src="../assets/imgs/store/enter-line.png"
        mode="widthFix"
      />
    </div>
    <!-- 专业顾问 -->
    <div class="enter-service">
      <div class="es-list">
        <div
          class="es-list-item"
          v-for="(item, index) in counselorList"
          :key="index"
        >
          <img :src="item.thumb" />
          <div class="experience">{{ item.year }}年天猫入驻经验</div>
          <div>
            成功入驻<span>{{ item.number }}</span
            >家店铺
          </div>
        </div>
      </div>
    </div>
    <!-- 优势 -->
    <div class="enter-strength com-width">
      <div class="enter-strength-title">
        选择我们的<text class="red">优势</text>
      </div>
      <div class="enter-strength-subtitle">多年代入驻经验，所以更专业</div>
      <div class="es-list">
        <div v-for="(item, index) in strengthList">
          <img :src="require(`../assets/imgs/store/${index + 1}.png`)" />
          <text></text>
          <div>{{ item }}</div>
        </div>
      </div>
    </div>
    <!-- 服务 -->
    <img
      class="com-width enter-news"
      src="../assets/imgs/store/enter-service.png"
      mode="widthFix"
    />
    <!-- 案例 -->
    <div class="enter-case com-width enter-strength">
      <div class="enter-case-title">
        天猫入驻<text class="red">成功案例</text>
      </div>
      <div class="sub-title">经验丰富 获得得10万+用户好评</div>
      <van-swipe class="enter-case-sw" indicator-color="#fe6508">
        <van-swipe-item v-for="(item, index) in caseList" :key="index">
          <img :src="item.thumb" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 底部 -->
    <div class="footer">
      <img src="../assets/imgs/store/enter-logo.png" />
      <div>四川九九牛网络科技有限公司</div>
    </div>
  </div>
</main>
</template>

<script>
export default {
  async asyncData({ app, query }) {
    let platformType = query.p || "tm";
    let [caseList, counselorList] = await Promise.all([
      app.$api
        .getCustomized({ cid: 28, per_page: 3 })
        .then(res => (res.status == 1 ? res.data.data : [])),
      app.$api
        .getCustomizedInfo({ cid: 23 })
        .then(res =>
          res.status == 1 ? JSON.parse(res.data.content).consultant : []
        )
    ]);
    console.log(counselorList, 11111111111, caseList, 2222222222222);
    return {
      platformType,
      counselorList,
      caseList
    };
  },
  data() {
    return {
      platform: {
        tm: {
          name: "天猫入驻",
          banner:
            "https://img.996110.com/imgs-202102-52e623c2840efbb6aa24599a210f2434-20592.png!quality",
          notice: require("../assets/imgs/store/enter-notice.png"),
          comIcon: require("../assets/imgs/store/enter-com-icon.png")
        },
        jd: {
          name: "京东入驻",
          banner:
            "https://img.996110.com/imgs-202102-106d352949464c1113db7a5dc79eb73a-32263.png!quality",
          notice: require("../assets/imgs/store/enter-notice4.png"),
          comIcon: require("../assets/imgs/store/enter-com-icon4.png")
        },
        pd: {
          name: "拼多多入驻",
          banner:
            "https://img.996110.com/imgs-202102-8ea454f25c2404f5e24f1bad061a603c-99143.png!quality",
          notice: require("../assets/imgs/store/enter-notice3.png"),
          comIcon: require("../assets/imgs/store/enter-com-icon3.png")
        },
        qt: {
          name: "其他入驻",
          banner:
            "https://img.996110.com/imgs-202102-17d8dfca6fb8ed1857ac35a4524f7001-83165.png!quality",
          notice: require("../assets/imgs/store/enter-notice.png"),
          comIcon: require("../assets/imgs/store/enter-com-icon2.png")
        }
      },
      strengthList: [
        "VIP通道快速入驻，入驻成功率高达98.9%",
        "资料齐全，快至7天下店",
        "专业顾问定制一对一入驻方案，品牌包装，有效缩短入驻周期",
        "0定金，先入驻再收费",
        "提供流量扶持，广告资源位，助力店铺快速起步",
        "正规有效的法律合同，保障权益，信息资料绝对保密"
      ],
      platformType: "tm",
      formData:{
        product:"",
        mobile:"",
        origin:3
      }
    };
  },
  methods:{
    	onSubmit() {
				let form = {...this.formData};
        form.platform=this.platformType;
				if (!form.product) {
					return this.$toast("请输入您选择的主打产品");
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(form.mobile)) {
					return this.$toast("请输入正确的联系电话");
				}

				this.$api.RosterAdd(form).then((res) => {
					if (res.status == 1) {
						this.$toast("您的入驻申请提交成功，请耐心等待我们和您联系");
					}
				});
			},
  }
  /* 	onLoad(option) {
			if(option.p)
			this.platformType=option.p
		} */
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "iconfont";
  /* project id 2353350 */
  src: url("//at.alicdn.com/t/font_2353350_bdz183nryxm.eot");
  src: url("//at.alicdn.com/t/font_2353350_bdz183nryxm.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_2353350_bdz183nryxm.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_2353350_bdz183nryxm.woff") format("woff"),
    url("//at.alicdn.com/t/font_2353350_bdz183nryxm.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_2353350_bdz183nryxm.svg#iconfont") format("svg");
}

.w-iconfont {
  font-family: "iconfont" !important;
  font-style: normal;
  font-weight: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #cccccc;
  margin-right: 14px;
}

.com-width {
  margin: 0 auto;
  width: 702px;
  border-radius: 16px;
}

.red {
  color: #e31919;
}

.store-in {
  background-image: linear-gradient(#ec5551, #e9332e);
  min-height: 100%;

  .enter-nav {
    position: absolute;
    right: 0;
    display: flex;
    padding-top: 22px;

    a {
      height: 46px;
      line-height: 46px;
      background-color: rgba($color: #ffffff, $alpha: 0.3);
      border-radius: 23px;
      font-size: 20px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 18px;
      margin-right: 11px;

      span {
        margin-right: 7px;
      }
    }
  }

  .banner {
    height: 870px;
    width: 100%;
  }
}

.notice {
  text-align: center;
  margin-top: -35px;
  margin-bottom: 55px;

  .notice-content {
    position: relative;
    width: 642px;
    height: 132px;
    margin: 0 auto;

    > img {
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
    }
  }

  .notice-text {
    position: relative;
    z-index: 66;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    > img {
      width: 43px;
      height: 41px;
      margin: 0 30px;
    }
  }

  .swiper {
    height: 100%;
    width: 100%;
    margin: 0;
    font-size: 28px;

    .swiper-slide {
      height: 100%;
    }

    span {
      color: red;
      margin: 0 10px;
    }
  }
}

.enter-form {
  background-color: #ffffff;
  height: 810px;
  margin-top: 55px;
  position: relative;
  display: block;

  .ef-title {
    width: 448px;
    height: 87px;
    margin: 0 auto;
    transform: translateY(-20px);
    display: block;
    margin-bottom: 30px;
  }

  .ef-title-text {
    font-size: 34px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
  }

  .ef-input-box {
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 27px;
    box-sizing: border-box;
    width: 642px;
    height: 110px;
    background-color: #f4f4f4;
    border-radius: 16px;
    margin-bottom: 26px;

    input {
      height: 100%;
      flex: 1;
      font-size: 28px;
    }
  }

  .more {
    box-sizing: border-box;
    height: 210px;
    align-items: flex-start;
    padding: 40px 20px;

    img {
      margin-top: 8px;
    }

    textarea {
      resize: none;
      width: 100%;
      height: 100%;
      font-size: 28px;
    }
  }

  .ef-btn {
    width: 642px;
    height: 100px;
    line-height: 100px;
    background-color: #e31919;
    border-radius: 16px;
    color: #ffffff;
    display: block;
    margin: 0 auto;
    margin-top: 50px;
    font-size: 30px;
  }
}

.enter-category {
  height: 610px;
  background-color: #fdeded;
  margin-bottom: 42px;
  margin-top: 30px !important;
  text-align: center;
  overflow: hidden;

  .enter-category-title {
    font-size: 34px;
    line-height: 34px;
    font-weight: 700;
    margin: 40px 0 23px 0;
    color: #1c1c1c;
  }

  > div {
    font-size: 24px;
    color: #999999;
  }

  .enter-type-list {
    padding: 0 30px;
    font-size: 24px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;

    > div {
      width: 150px;
      height: 150px;
      background-color: #ffffff;
      border-radius: 20px;
      display: flex;
      flex-flow: nowrap column;
      align-items: center;
      justify-content: center;
      margin-right: 14px;
      margin-bottom: 15px;

      &:nth-child(4n + 4) {
        margin-right: 0;
      }
    }

    img {
      width: 40px;
      height: 34px;
      margin-bottom: 15px;
    }
  }

  .ec-more {
    width: 702px;
    height: 110px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    margin-top: 15px;

    span {
      margin: 0 10px;
    }

    .ec-more-kf {
      width: 26px;
      height: 26px;
    }

    .ec-more-into {
      width: 20px;
      height: 20px;
    }
  }
}

.enter-line {
  width: 100%;
}

.enter-service {
  height: 448px;
  background-color: #c7110c;
  margin-top: -30px;

  .es-list {
    display: flex;
    justify-content: space-between;
    padding: 70px 24px 45px;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    font-size: 20px;
    line-height: 20px;

    img {
      width: 220px;
      height: 232px;
      background-color: #ffffff;
      display: block;
      margin: 0 auto;
      margin-bottom: 19px;
    }

    .es-list-item {
      color: #ffffff;

      .experience {
        margin-bottom: 14px;
      }

      span {
        color: #ffc241;
      }

      border-bottom: 4px solid #aa0500;
      padding-bottom: 15px;
      box-sizing: border-box;
    }
  }
}

.enter-strength {
  height: 1208px;
  background-color: #ffffff;
  margin-top: 47px;
  padding: 50px 30px 0;
  box-sizing: border-box;
  font-size: 28px;

  > div {
    text-align: center;
  }

  .enter-strength-title {
    font-size: 34px;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .enter-strength-subtitle {
    color: #999999;
  }

  .es-list {
    margin-top: 40px;
    text-align: left;

    > div {
      display: flex;
      align-items: center;
      width: 642px;
      height: 140px;
      background-color: #fff2ea;
      border-radius: 70px;
      padding: 0 30px;
      box-sizing: border-box;
      color: #fe6508;
      margin-bottom: 26px;

      img {
        width: 86px;
        height: 86px;
        flex-shrink: 0;
      }

      span {
        width: 4px;
        height: 40px;
        background-color: #fe6508;
        margin: 0 30px;
        flex-shrink: 0;
      }
    }
  }
}

.enter-news {
  display: block;
  margin-top: 24px;
}

.enter-case {
  height: 630px;
  margin-top: 29px;
  background-color: #ffffff;
  padding-right: 0;

  .enter-case-title {
    font-size: 34px;
    font-weight: 700;
  }

  .sub-title {
    color: #999999;
    margin-top: 14px;
  }

  .enter-case-sw {
    height: 430px;
    margin-top: 35px;
    .van-swipe-item {
      width: 352px !important;
      margin-right: 20px;
    }
    img {
      width: 352px;
      height: 388px;
      background-color: #e31919;
    }
  }
}
.footer {
  height: 184px;
  display: flex;
  align-items: center;
  flex-flow: nowrap column;
  justify-content: center;
  color: #ffffff;
  img {
    width: 156px;
    height: 55px;
    margin-bottom: 18px;
  }
}

// 其他
.qt {
  background-image: linear-gradient(#fe835f, #d73700);
  .notice .notice-text text {
    color: #f04900;
  }
  .enter-form .ef-btn {
    background-color: #f04900;
  }
  .enter-service {
    background-color: #b02d00;
  }
  .enter-case .swiper-scrollbar .swiper-scrollbar-drag {
    background: #f04900;
  }
}

// pdd
.pd {
  background-image: linear-gradient(#ef6b05 40%, #b3430e);
  .notice .notice-text text {
    color: #ff5200;
  }
  .enter-form .ef-btn {
    background-color: #ff5200;
  }
  .enter-service {
    background-color: #c75501;
  }
  .enter-case .swiper-scrollbar .swiper-scrollbar-drag {
    background: #ff5200;
  }
  .enter-service .es-list > div {
    border-bottom: 4rem solid #b34c00;
  }
}

// jd
.jd {
  background-image: linear-gradient(#ffa054 40%, #f76617);
  .notice .notice-text text {
    color: #ff8f34;
  }
  .enter-form .ef-btn {
    background-color: #ff8f34;
  }
  .enter-service {
    background-color: #c35812;
  }
  .enter-case .swiper-scrollbar .swiper-scrollbar-drag {
    background: #ff8f34;
  }
  .enter-service .es-list > div {
    border-bottom: 4rem solid #b34c00;
  }
}
</style>
