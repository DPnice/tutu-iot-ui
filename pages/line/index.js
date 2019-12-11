import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '温度湿度变化趋势',
      left: 'center'
    },
    color: ["#FFA500", "#5CACEE"],
    legend: {
      data: ['温度', '湿度'],
      top: 20,
      left: 'right',
      textStyle: {
        fontSize: 15
      },
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      name: "时间",
      nameTextStyle:{
        fontSize: 14
      },
      // type: 'time',
      boundaryGap: false,
      data: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
      axisLabel: {
        fontSize: '14',
      }
      // show: false
    },
    yAxis: {
      name: "℃",
      nameTextStyle: {
        fontSize: 14
      },
      x: 'center',
      type: 'value',
      axisLabel: {
        fontSize: '14'
      },
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      //show: false
    },
    series: [{
      name: '温度',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33, 18, 36, 65, 30, 78, 40, 33],
      label: {
        normal: {
          show: false,
          position: 'top',
          rich: {}
        }
      }
    }, {
      name: '湿度',
      type: 'line',
      smooth: true,
        data: [12, 50, 51, 35, 70, 30, 20, 18, 36, 65, 30, 78, 40, 33],
        label: {
          normal: {
            show: false,
            position: 'top',
            rich: {}
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
      title: '快来看看兔兔',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ec: {
      onInit: initChart
    }
  },

  onReady() {}
});