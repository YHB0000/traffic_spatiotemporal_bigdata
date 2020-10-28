<template>
  <div id="container">
    <div id='heatmap'></div>
    <el-card>
      <!-- 条件标题 -->
      <el-row>
        <el-col :span="6" :offset='10'>
          <p>条件筛选</p>
        </el-col>
      </el-row>
      <!-- 地区选择 -->
      <el-row>
        <el-col :span="24">
          <el-input placeholder="请选择地区" id="tipinput" v-model="place">
            <template slot="prepend">地区</template>
          </el-input>
        </el-col>
      </el-row>
      <!-- 时段选择 -->
      <el-row>
        <el-col :span="24">
          <div class="block">
            <el-date-picker v-model="value" type="datetimerange" :picker-options="pickerOptions" range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" align="center" format="yyyy-MM-dd HH:mm"
              value-format="timestamp" :default-value="[new Date(2018, 10, 3, 0, 0), new Date(2018, 10, 3, 0, 0)]">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset='5'>
          <el-button type="primary" icon="el-icon-search" size='small' @click="setdata">搜索</el-button>
        </el-col>
        <el-col :span="2" :offset='7'>
          <el-button type="primary" icon="el-icon-refresh-left" size='small' native-type="reset" @click="clear">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
/* globals AMap,Loca */
export default {
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value: [new Date(2018, 10, 3, 0, 0), new Date(2018, 10, 3, 0, 0)],
      place: '',
      map: {},
      layer: {},
      auto: {},
      placeSearch: {},
      data: [],
      time: []
    }
  },
  mounted () {
    this.heatshow()
    this.search()
  },
  methods: {
    // 配置基本热力图属性
    async heatshow () {
      // =============== 创建底图 ===============
      this.map = new AMap.Map('heatmap', {
        mapStyle: 'amap://styles/grey',
        zoom: 8,
        center: [116.366794, 39.915309]
      })

      // =============== 创建图层 ===============
      this.layer = new Loca.HeatmapLayer({
        map: this.map,
        // 设置缩放和中心自适应
        fitView: true
      })

      // =============== 样式配置 ===============
      this.layer.setOptions({
        style: {
          // 热力半径，单位：像素
          radius: 30,
          opacity: [0.1, 0.8],
          // 颜色范围
          color: {
            0.5: '#2c7bb6',
            0.65: '#abd9e9',
            0.7: '#ffffbf',
            0.9: '#fde468',
            1.0: '#d7191c'
          }
        }
      })
    },
    // 关键字检索地址 设立地址中心
    search () {
      // =============== 检索配置 ===============
      this.auto = new AMap.Autocomplete({
        input: 'tipinput'
      })

      this.placeSearch = new AMap.PlaceSearch({
        map: this.map
      }) // 构造地点查询类

      AMap.event.addListener(this.auto, 'select', (e) => {
        this.placeSearch.setCity(e.poi.adcode)
        this.placeSearch.search(e.poi.name) // 关键字查询查询
      }) // 注册监听，当选中某条记录时会触发
    },
    // 获取数据 渲染历史热力
    async setdata () {
      // console.log(this.value[0], this.value[1])
      this.time = await this.$http.post(`history/${this.value}`)
      // =============== 设置数据 ===============
      const { data } = await this.$http.post('history')

      this.layer.setData(data, {
        type: 'json',
        lnglat: 'lnglat',
        value: 'count'
      })

      // =============== 渲染 ===============
      this.layer.render()
    },
    // 清除所有数据信息
    clear () {
      this.value = ''
      this.place = ''
    }
  }
}
</script>

<style scoped>
#heatmap {
  width: 100%;
  height: 100%;
}
.el-card {
  position: fixed;
  width: 350px;
  height: 150px;
  top: 75px;
  right: 15px;
  opacity: 0.9;
}
p {
  font-size: 14px;
  font-weight: 300;
  position: relative;
  top: -15px;
  margin-bottom: -15px;
}
.el-col {
  margin-top: 5px;
}
.el-date-editor {
  height: 32px;
  width: 308px;
}
.el-icon-time {
  position: relative;
  top: 0;
}
</style>
