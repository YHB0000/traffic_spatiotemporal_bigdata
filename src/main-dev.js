import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 全局样式
import './assets/css/global.css'

// 导入字体图标
import './assets/font/iconfont.css'

// 导入 NProgress 包对应的 JS 和 CSS
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'

// axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 拦截器
// 在 request 拦截器中,展示进度条 NProgress.start()
axios.interceptors.request.use(config => {
  // console.log(config)
  // NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// 在 response 拦截器中,隐藏进度条 NProgress.done()
axios.interceptors.response.use(config => {
  // NProgress.done()
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
