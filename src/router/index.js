import Vue from 'vue'
import VueRouter from 'vue-router'

// import Login from '../components/Login.vue'
const Login = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Login.vue')
// import Home from '../components/Home.vue'
const Home = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Home.vue')
// import Welcome from '../components/Welcome.vue'
const Welcome = () => import(/* webpackChunkName: "login_home_welcome" */ '../components/Welcome.vue')

// import Show from '../components/Heat/Show.vue'
const Show = () => import(/* webpackChunkName: "Heat" */ '../components/Heat/Show.vue')
// import History from '../components/Heat/History.vue'
const History = () => import(/* webpackChunkName: "Heat" */ '../components/Heat/History.vue')

// import Mode from '../components/Trip/Mode.vue'
const Mode = () => import(/* webpackChunkName: "Trip" */ '../components/Trip/Mode.vue')
// import Distance from '../components/Trip/Distance.vue'
const Distance = () => import(/* webpackChunkName: "Trip" */ '../components/Trip/Distance.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: './login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/show', component: Show },
      { path: '/history', component: History },
      { path: '/mode', component: Mode },
      { path: '/distance', component: Distance }
      // { path: '/reports', component: Report }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   //  next() 放行   next('./login') 强制跳转

//   if (to.path === '/login') return next()
//   // 获取 token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
