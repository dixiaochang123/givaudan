import Vue from 'vue'

// A modern alternative to CSS resets
// https://github.com/necolas/normalize.css
import 'normalize.css/normalize.css'
import './styles/index.scss'

import { ActionSheet,Popup,Step, Steps,Area,DatetimePicker,Picker,Uploader } from 'vant';

Vue.use(Uploader).use(Picker).use(DatetimePicker).use(Area).use(Step).use(Steps).use(ActionSheet).use(Popup);

import 'swiper/dist/css/swiper.min.css'
import 'swiper/dist/js/swiper.min'

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;

import Videojs from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Videojs

import App from './App.vue'
import router from './router'
import store from './store'

import './icons'
import './permission'

import * as filters from '@/filters'
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// import vant
import '@/components/Vant'
// register common components globally
import '@/components/common'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
