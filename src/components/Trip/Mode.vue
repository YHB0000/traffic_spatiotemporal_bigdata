<template>
  <div id="tripmode" ref="mode"></div>
</template>

<script>
/* global echarts,option */
export default {
  data () {
    return {
      walkdata: '',
      // walkdata: this.$http.post('mode/walk'),
      // bikedata: this.$http.post('mode/bike'),
      // busdata: this.$http.post('mode/bus'),
      // cardata: this.$http.post('mode/car'),
      myChart: {},
      option: {
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: false
        },
        dataset: {
          source: [
            // ['product', '09.01', '09.02', '09.03', '09.04', '09.05', '09.06'],
            ['product', '09.01', '09.02', '09.03'],
            ['步行', 46.5, 12.1, 25.7, 33.1, 83.4, 25.1],
            ['自行车', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['公交车', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['自驾车', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        xAxis: {
          type: 'category',
          name: '日期'
        },
        yAxis: {
          gridIndex: 0,
          name: '数量（个）'
        },
        grid: { top: '55%' },
        series: [
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          { type: 'line', smooth: true, seriesLayoutBy: 'row' },
          {
            type: 'pie',
            id: 'pie',
            radius: '30%',
            center: ['50%', '26%'],
            label: {
              formatter: '{b}: {@09.01} ({d}%)'
            },
            encode: {
              itemName: 'product',
              value: '09.01',
              tooltip: '09.01'
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.myChart = echarts.init(this.$refs.mode)
    this.getdata()
    this.myChart.setOption(this.option)
    this.linkcharts()
  },
  methods: {
    linkcharts () {
      this.myChart.on('updateAxisPointer', (event) => {
        var xAxisInfo = event.axesInfo[0]
        if (xAxisInfo) {
          var dimension = xAxisInfo.value + 1
          this.myChart.setOption({
            series: {
              id: 'pie',
              label: {
                formatter: '{b}: {@[' + dimension + ']} ({d}%)'
              },
              encode: {
                value: dimension,
                tooltip: dimension
              }
            }
          })
        }
      })
    },
    async getdata () {
      const { data } = await this.$http.post('/mode/walk')
      console.log(data)
    }
  }
}
</script>

<style scoped>
#tripmode {
  width: 100%;
  height: 100%;
}
</style>
