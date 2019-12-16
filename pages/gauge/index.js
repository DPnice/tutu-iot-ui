import * as echarts from '../../ec-canvas/echarts';
var call = require("../../utils/request.js")
const app = getApp();

Page({
  onShareAppMessage: function (res) {
    return {
      title: '水量指标',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    water:0,
    waterList:[],
    timeList:[],
    ec: {
      lazyLoad: true
    },
    ec2: {
      lazyLoad: true
    }
  },
  onLoad(){
   
  },
  onReady() {
    var that = this;
    wx.showLoading({
      title: '转呀转',
      icon: 'loading',
      duration: 10000
    });
    //接口
    call.getRequest('water/list',
      function (data) {
        console.info(data)
        var resultData = data.data;
        var w = [];
        var t = [];
        for (var index in resultData) {
          w.push(resultData[index].waterQuantity)
          t.push(resultData[index].waterQuantityTime)
        }
        that.setData({
          water: w[w.length - 1],
          waterList: w,
          timeList:t
        })
        //渲染
        that.initChart();
        wx.hideLoading();
        if (t.length == 0) {
          wx.showToast({
            title: "没有数据，难道是兔子啃电源了？",
            icon: 'none',
            duration: 4000,
          });
        }
      },
      function () {
        wx.showToast({
          title: "没有数据，难道是兔子啃电源了？",
          icon: 'none',
          duration: 4000,
        });
        console.log("暂无温度数据")
      });

  },
  initChart:function() {
    var echartsComponnetGauge = this.selectComponent('#mychart-dom-gauge');
    echartsComponnetGauge.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
      var option = {
        backgroundColor: "#ffffff",
        color: ["#32C5E9", "#67E0E3", "#37A2DA"],
        series: [{
          //设置最大水量
          max: 120,
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
            value: this.data.water,
            name: '剩余水量',
          }]

        }]
      };
      chart.setOption(option, true);
      return chart;
    })

    var echartsComponnetLine = this.selectComponent('#mychart-dom-line');
    echartsComponnetLine.init((canvas, width, height) => {
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
        color: ["#5CACEE"],
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
          data: this.data.timeList,
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
          data: this.data.waterList,
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
    })
  }
});
