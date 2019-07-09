// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import store from "./store/index"
import router from './router'
import 'babel-polyfill'
import 'iview/dist/styles/iview.css';
import 'swiper/dist/css/swiper.css';
import VueProgressiveImage from 'vue-progressive-image'// 渐进式
import i18n from './common/lang/index'
Vue.use(VueProgressiveImage, {
  delay: 2000
});
Vue.config.productionTip = false
Vue.prototype.$http = axios




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
