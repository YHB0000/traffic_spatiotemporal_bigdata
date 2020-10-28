<template>
  <el-container class="home_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <!-- <img src="../assets/heima.png" alt=""> -->
        <span>交通时空大数据挖掘系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
        <el-aside :width="isCollapse ? '65px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单区 -->
          <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened :collapse='isCollapse' :collapse-transition='false' router :default-active='activePath'>
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <!-- 一级菜单模板区 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // 数据
  data () {
    return {
      // 左侧菜单数据
      menulist: [
        // 热力分析
        {
          id: 110,
          authName: '热力分析',
          path: 'heat',
          children: [{
            id: 111,
            authName: '热力展示',
            path: 'show',
            children: []
          }, {
            id: 112,
            authName: '历史记录',
            path: 'history',
            children: []
          }]
        },
        // 出行分析
        {
          id: 120,
          authName: '出行分析',
          path: 'trip',
          children: [{
            id: 121,
            authName: '出行方式',
            path: 'mode',
            children: []
          }, {
            id: 122,
            authName: '出行距离',
            path: 'distance',
            children: []
          }, {
            id: 123,
            authName: '出行时长',
            path: 'duration',
            children: []
          }]
        },
        // 驻留分析
        {
          id: 130,
          authName: '驻留分析',
          path: null,
          children: [{
            id: 131,
            authName: '居住人口',
            path: 'resident',
            children: []
          }, {
            id: 132,
            authName: '工作人口',
            path: 'work',
            children: []
          }, {
            id: 133,
            authName: '娱乐人口',
            path: 'entertain',
            children: []
          }]
        }],
      iconsObj: {
        110: 'iconfont icon-relitu',
        120: 'iconfont icon-navigation-fill',
        130: 'iconfont icon-pin-distance-fill'
      },
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  // 创建时运行函数
  created () {
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  // 事件方法
  methods: {
    logout () {
      // 清空 token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // // 获取所有的菜单
    // async getMenuList () {
    //   const { data: res } = await this.$http.get('menus')
    //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    //   this.menulist = res.data
    //   // console.log(res)
    // },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: white;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
  padding: 0;
  width: 100%;
  height: 100%;
}

.iconfont {
  margin-right: 15px;
  font-size: 23px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

.slow-enter-active,
.slow-leave-active {
  transition: all 1s;
}
</style>
