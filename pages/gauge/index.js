import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#32C5E9", "#67E0E3","#37A2DA"],
    series: [{
      //设置最大水量
      max: 80,
      name: '水量指标',
      type: 'gauge',
      detail: {
        formatter: '{value}ml'
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 30,
          shadowBlur: 1,
          color: [
            [0.3, '#fd666d'],
            [0.7, '#67e0e3'],
            [1, '#37a2da']
          ]
        }
      },
      data: [{
        value: 40,
        name: '剩余水量',
      }]

    }]
  };

  chart.setOption(option, true);

  return chart;
}

function initChart2(canvas, width, height) {
 
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    
    title: {
      text: '水量趋势',
      left: 'center'
    },
    color: [ "#5CACEE"],
    legend: {
      data: ['水量'],
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
      // name: "时间",
      nameTextStyle: {
        fontSize: 14
      },
      // type: 'time',
      boundaryGap: false,
      data: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
      // show: false
      axisLabel: {
        fontSize: '14',
      }
    },
    yAxis: {
      name: "ml",
      x: 'center',
      nameTextStyle: {
        fontSize: 14
      },
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      //show: false
    },
    series: [{
      name: '水量',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33, 18, 36, 65, 30, 78, 40, 33],
      label: {
        normal: {
          show: true,
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
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    ec: {
      
      onInit: initChart
    },
    ec2: {
      onInit: initChart2
    }
  },
  a:function(){
    console.info("ssssss")
  },

  onReady() {
  }
});
