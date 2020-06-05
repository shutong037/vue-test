import Vue from 'vue'
import App from './App.vue'
import router from './router'

const Base64 = require('js-base64').Base64

import {get,post} from './api/http.js'
Vue.prototype.$get = get
Vue.prototype.$post = post 


import store from './store/index.js'


//样式重置
import './assets/css/reset.css'
import './assets/css/animate.min.css'
import Common from './assets/js/common.js'
Vue.prototype.Common = Common;


//pc端引入样式
/* import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI); */


//移动端引入样式
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
import './assets/js/rem.js'
Vue.use(Mint);





Vue.config.productionTip = false

new Vue({
  router,
  Base64,
  store,
  render: h => h(App)
}).$mount('#app')
