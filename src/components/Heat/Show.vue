<template>
  <div id="container">
    <div id='heatmap'></div>
    <div class="input-card">
      <h4>下属行政区查询</h4>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text">省市区</span></div>
        <select id='province' style="width:100px" @change='search($refs.pro)' ref="pro"></select>
      </div>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text">地级市</span></div>
        <select style="width:100px" @change='search($refs.cit)' ref="cit"></select>
      </div>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text">区县</span></div>
        <select style="width:100px" @change='search($refs.dis)' ref="dis"></select>
      </div>
      <div class="input-item">
        <div class="input-item-prepend"><span class="input-item-text">街道</span></div>
        <select style="width:100px" @change='setCenter($refs.str)' ref="str"></select>
      </div>
    </div>
  </div>
</template>

<script>
/* globals AMap,Loca */
export default {
  data () {
    return {
      map: {},
      opts: {
        subdistrict: 1,
        showbiz: false
      },
      district: new AMap.DistrictSearch(this.opts),
      polygons: [],
      // citycode: '',
      option: {},
      keyword: {},
      adcode: {},
      contentSub: {},
      curlevel: '',
      curList: {}
    }
  },
  beforeCreate () {
  },
  mounted () {
    this.heatshow()
    this.searchplace()
  },
  beforeMount () {
  },
  methods: {
    searchplace () {
      var self = this
      this.district.search('中国', function (status, result) {
        if (status === 'complete') {
          self.getData(result.districtList[0])
        }
      })
    },
    setCenter (obj) {
      this.map.setCenter(obj[obj.options.selectedIndex].center)
    },
    getData (data, level) {
      var self = this
      var bounds = data.boundaries
      if (bounds) {
        for (var i = 0, l = bounds.length; i < l; i++) {
          var polygon = new AMap.Polygon({
            map: this.map,
            strokeWeight: 1,
            strokeColor: '#0091ea',
            fillColor: '#80d8ff',
            fillOpacity: 0.1,
            path: bounds[i]
          })
          this.polygons.push(polygon)
        }
        this.map.setFitView()
      }

      if (level === 'province') {
        this.$refs.cit.innerHTML = ''
        this.$refs.dis.innerHTML = ''
        this.$refs.str.innerHTML = ''
      } else if (level === 'city') {
        this.$refs.dis.innerHTML = ''
        this.$refs.str.innerHTML = ''
      } else if (level === 'district') {
        this.$refs.str.innerHTML = ''
      }

      var citycode
      var subList = data.districtList
      if (subList) {
        this.contentSub = new Option('--请选择--')
        this.curlevel = subList[0].level
        switch (this.curlevel) {
          case 'province':
            this.curList = this.$refs.pro
            break
          case 'city':
            this.curList = this.$refs.cit
            break
          case 'district':
            this.curList = this.$refs.dis
            break
          case 'street':
            this.curList = this.$refs.str
            break
        }
        this.curList.add(this.contentSub)
        for (let i = 0, l = subList.length; i < l; i++) {
          var name = subList[i].name
          var levelSub = subList[i].level
          var cityCode = subList[i].citycode
          this.contentSub = new Option(name)
          this.contentSub.setAttribute('value', levelSub)
          this.contentSub.center = subList[i].center
          this.contentSub.adcode = subList[i].adcode
          this.curList.add(this.contentSub)
        }
      }
    },
    search (obj) {
      var self = this
      for (var i = 0, l = this.polygons.length; i < l; i++) {
        this.polygons[i].setMap(null)
      }

      this.option = obj[obj.options.selectedIndex]
      this.keyword = this.option.text
      this.adcode = this.option.adcode

      this.district.setLevel(this.option.value)
      this.district.setExtensions('all')
      this.district.search(this.adcode, function (status, result) {
        if (status === 'complete') {
          self.getData(result.districtList[0], obj.id)
        }
      })
    },
    heatshow () {
      // =============== 创建底图 ===============
      this.map = new AMap.Map('heatmap', {
        resizeEnable: true,
        mapStyle: 'amap://styles/grey',
        zoom: 3,
        center: [116.366794, 39.915309]
      })
      // =============== 创建图层 ===============
      // 从 v1.3.0 版起，每个图层只描述一种展现形式的可视化类型，并且所有图层的都在 Loca 这个命名空间下。
      const layer = new Loca.HeatmapLayer({
        map: this.map,
        // 设置缩放和中心自适应
        fitView: true
      })

      // =============== 设置数据 ===============
      const data = [
        { lnglat: [116.366794, 39.915309], count: 10 },
        { lnglat: [116.486409, 39.921489], count: 15 },
        { lnglat: [116.286968, 39.863642], count: 30 },
        { lnglat: [116.386794, 39.915809], count: 10 },
        { lnglat: [116.486409, 39.928489], count: 15 },
        { lnglat: [116.283968, 39.883642], count: 10 },
        { lnglat: [116.306794, 39.915389], count: 10 },
        { lnglat: [116.486409, 39.951409], count: 15 },
        { lnglat: [116.289968, 39.963642], count: 20 }
      ]

      layer.setData(data, {
        type: 'json',
        lnglat: 'lnglat',
        value: 'count'
      })

      // =============== 样式配置 ===============
      layer.setOptions({
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

      // =============== 渲染 ===============
      layer.render()
    }
  }
}
</script>

<style scoped>
#heatmap {
  width: 100%;
  height: 100%;
}
</style>
