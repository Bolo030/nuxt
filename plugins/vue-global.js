import Vue from 'vue'
import Vant from 'vant';
import echarts from 'echarts' // 引入echarts
import 'vant/lib/index.css'
import myComponentsInstall from '~/components/myComponentsInstall'
import utils from '~/utils/helpers'
Vue.prototype.$echarts = echarts // 引入组件（将echarts注册为全局）
Vue.use(Vant)
Vue.use(myComponentsInstall)
export default function (context, inject) {
  inject('utils', utils)
}
