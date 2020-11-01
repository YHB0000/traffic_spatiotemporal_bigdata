<template>
  <div id="tripdur" ref="dur"></div>
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
            name: '数量 (个)',
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
            data: [24, 34, 90, 28, 34, 434, 144, 34, 94, 157]
          },
          {
            name: '自行车',
            type: 'bar',
            data: [10, 130, 30, 118, 30, 130, 430, 100, 130, 160]
          },
          {
            name: '公交',
            type: 'bar',
            data: [110, 230, 130, 110, 90, 130, 30, 100, 130, 100]
          },
          {
            name: '自驾车',
            type: 'bar',
            data: [210, 430, 130, 210, 130, 170, 330, 107, 130, 120]
          }
        ]
      }
    }
  },
  mounted () {
    this.myChart = echarts.init(this.$refs.dur)
    this.getdata()
    this.myChart.setOption(this.option)
    this.resize()
  },
  methods: {
    getdata () {

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
#tripdur {
  width: 100%;
  height: 100%;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
