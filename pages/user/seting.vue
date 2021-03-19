<template>
  <div>
    <header id="header">
        <div class="header-content">
            <a href="javascript:history.go(-1)" title="返回箭头"><img class="back" src="~assets/imgs/store/rectangle.png"
                    alt="九九牛返回" /></a>
            <span class="title">设置中心</span>
        </div>
    </header>
    <main id="setting-center">
        <div class="setting-box">
            <ul class="setting-list bg-main-color">
                <li class="list-item d-f d-f-between font-size-30">
                    <span>实名验证</span>
                    <div class="right">
                        <!-- <img src="/imgs/icon-entry2.png" alt="箭头"> -->
                        <i class="iconfont iconjinru1"></i>
                    </div>
                </li>
                <li class="list-item d-f d-f-between font-size-30">
                    <span>修改手机号码</span>
                    <div class="right">
                        <span class="font-size-26 font-main-color2">18282678181</span>
                        <i class="iconfont iconjinru1"></i>
                    </div>
                </li>
                <li class="list-item d-f d-f-between font-size-30">
                    <span>修改密码</span>
                    <div class="right">
                        <i class="iconfont iconjinru1"></i>
                    </div>
                </li>
                <li class="list-item d-f d-f-between font-size-30">
                    <span>投诉建议</span>
                    <div class="right">
                        <i class="iconfont iconjinru1"></i>
                    </div>
                </li>
            </ul>
            <ul class="setting-list bg-main-color">
                <li class="list-item d-f d-f-between font-size-30">
                    <span>关于我们</span>
                    <div class="right">
                        <i class="iconfont iconjinru1"></i>
                    </div>
                </li>
                <li class="list-item d-f d-f-between font-size-30" style="display: none;">
                    <span>检查更新</span>
                    <div class="right">
                        <span class="font-size-26 font-main-color2">V1.2.0</span>
                        <i class="iconfont iconjinru1"></i>
                    </div>
                </li>
                <li class="list-item d-f d-f-between font-size-30">
                    <span>清除缓存</span>
                    <div class="right">
                        <span class="font-size-26 font-main-color2">8M</span>
                    </div>
                </li>
              
            </ul>
            <ul class="setting-list bg-main-color">
                <li class="list-item d-f d-f-between font-size-30">
                    <span class="font-main-color">退出登录</span>
                    <div class="right">
                       
                    </div>
                </li>
            </ul>
        </div>
    </main>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
#setting-center {
  padding-top: 20px;
}

.setting-box {
  padding: 0 24px;
}

.setting-box .setting-list {
  padding: 0 30px;
  border-radius: 16px;
  margin-bottom: 20px;
}

.setting-box .setting-list .list-item {
  height: 120px;
  border-bottom: 1px solid #ededed;
}

.setting-box .setting-list .list-item:last-child {
  border-bottom: none;
}

.setting-box .setting-list .list-item .right i {
  font-size: 28px;
}

</style>