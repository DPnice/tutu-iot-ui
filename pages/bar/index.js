import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {

  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    label: {
      normal: {
        fontSize: 14,
        rich: {}
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['喂食次数']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [{
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        fontSize: '14',
        color: '#666'
      }
    }],
    yAxis: [{
      type: 'category',
      axisTick: {
        show: false
      },
      data: ['00:00-04:00', '04:00-08:00', '08:00-12:00', '12:00-16:00', '16:00-20:00', '20:00-00:00'],
      axisLine: {
        lineStyle: {
          fontSize: '14',
          color: '#999'
        }
      },
      axisLabel: {
        fontSize: 14,
        color: '#666'
      }
     
    }],
    series: [{
      name: '喂食次数',
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'inside'
        }
      },
      data: [1, 2, 1, 3, 4, 2],
      itemStyle: {
        // emphasis: {
        //   color: '#37a2da'
        // }
      }
    }]
  };
  chart.setOption(option);
  return chart;
}


function initChartPie(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
    series: [{
      label: {
        normal: {
          fontSize: 14,
          rich: {}
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      radius: [0, '60%'],
      data: [{
        value: 55,
        name: '00:00-04:00'
      }, {
        value: 20,
        name: '04:00-08:00'
      }, {
        value: 10,
        name: '08:00-12:00'
      }, {
        value: 20,
        name: '12:00-16:00'
      }, {
        value: 38,
        name: '16:00-20:00'
      }, {
        value: 38,
        name: '20:00-00:00'
      }],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 2, 2, 0.3)'
        }
      }
    }]
  };
  chart.setOption(option);
  return chart;
}



Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    ecPie: {}
  },

  onReady() {
    setTimeout(function() {
      // 获取 chart 实例的方式
      console.log(chart)
    }, 2000);
  },
  echartInitPie(e) {
    initChartPie(e.detail.canvas, e.detail.width, e.detail.height);
  }
});