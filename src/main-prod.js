import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 全局样式
import './assets/css/global.css'

// 导入字体图标
import './assets/font/iconfont.css'

// axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8899/'

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
