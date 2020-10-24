<template>
  <!-- <div id="tripdis" ref="dis"></div> -->
  <div>
    <v-chart :options='polar'></v-chart>
  </div>
</template>

<script>
/* global echarts */
export default {
  data () {
    return {
      myChart: {}
    }
  },
  mounted () {
    this.datashow()
  },
  methods: {
    datashow () {

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
