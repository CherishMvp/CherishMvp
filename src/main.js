// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
 import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'

import SIdentify from './components/page/Identify';    //自定义组件
import "babel-polyfill";
    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

Vue.component("SIdentify",SIdentify);
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios
Vue.prototype.$echarts = echarts
import {validUsername} from '../src/valid'
Vue.use(ElementUI)
Vue.use(validUsername)
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
