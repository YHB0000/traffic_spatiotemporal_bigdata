<template>
  <div id="tripdis" ref="dis"></div>
</template>

<script>
/* global echarts */
export default {
  data () {
    return {
      myChart: {},
      isChange: document.getElementsByClassName('toggle-button'),
      option: {
        textStyle: {
          color: 'rgba(255, 255, 255, 0.9)'
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        toolbox: {
          show: true,
          itemSize: 18,
          iconStyle: {
            color: 'rgba(255, 255, 255, 0.6)'
          },
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        brush: {
          toolbox: ['rect', 'keep', 'clear'],
          brushMode: 'single',
          throttleType: 'debounce',
          removeOnClick: true
        },
        calculable: true,
        legend: {
          data: ['步行', '自行车', '公交', '自驾车'],
          textStyle: {
            color: 'rgba(255, 255, 255, 0.9)'
          },
          itemGap: 5
        },
        grid: {
          top: '12%',
          left: '5%',
          right: '10%',
          containLabel: true,
          show: true,
          bordercolor: 'rgba(255, 255, 255, 0.9)',
          borderWidth: 0.5
        },
        xAxis: [
          {
            type: 'category',
            data: ['10.01', '10.02', '10.03', '10.04', '10.05', '10.06', '10.07', '10.08', '10.09', '10.10']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '距离 (km)',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                opacity: 0.8
              }
            }
          }
        ],
        dataZoom: [
          {
            show: true,
            start: 0,
            end: 100
          },
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            show: true,
            yAxisIndex: 0,
            filterMode: 'empty',
            width: 30,
            height: '80%',
            showDataShadow: false,
            left: '93%'
          }
        ],
        series: [
          {
            name: '步行',
            type: 'bar',
            data: []
          },
          {
            name: '自行车',
            type: 'bar',
            data: []
          },
          {
            name: '公交',
            type: 'bar',
            data: []
          },
          {
            name: '自驾车',
            type: 'bar',
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    this.myChart = echarts.init(this.$refs.dis)
    this.getdata()
    this.myChart.setOption(this.option)
    this.resize()
  },
  methods: {
    async getdata () {
      const { data: walkdata } = await this.$http.post('mode/walk')
      const { data: bickdata } = await this.$http.post('mode/bick')
      const { data: busdata } = await this.$http.post('mode/bus')
      const { data: cardata } = await this.$http.post('mode/car')
      var walk = []
      var bick = []
      var bus = []
      var car = []
      for (let i = 0; i < 10; i++) {
        walk.push(walkdata[i].number)
        bick.push(bickdata[i].number)
        bus.push(busdata[i].number)
        car.push(cardata[i].number)
      }
      this.myChart.setOption({
        series: [{
          name: '步行',
          type: 'bar',
          data: walk
        }, {
          name: '自行车',
          type: 'bar',
          data: bick
        }, {
          name: '公交',
          type: 'bar',
          data: bus
        }, {
          name: '自驾车',
          type: 'bar',
          data: car
        }]
      })
    },
    resize () {
      window.onresize = this.myChart.resize
      const resizeOb = new ResizeObserver(() => {
        this.myChart.resize()
      })
      resizeOb.observe(document.getElementsByClassName('toggle-button')[0])
    }
  }
}
</script>

<style scoped>
#tripdis {
  width: 100%;
  height: 100%;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
