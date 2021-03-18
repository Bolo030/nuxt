import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css'
import myComponentsInstall from '~/components/myComponentsInstall'
import utils from '~/utils/helpers'
Vue.use(Vant)
Vue.use(myComponentsInstall)
export default function (context, inject) {
  inject('utils', utils)
}
