import * as echarts from '../../ec-canvas/echarts';
var call = require("../../utils/request.js")
let chart = null;

function initChart(canvas, width, height) {
  var echartsComponnetGauge = this.selectComponent('#mychart-dom-gauge');
  echartsComponnetGauge.init((canvas, width, height) => {});

}


function initChartPie(canvas, width, height) {

}

Page({
  onShareAppMessage: function(res) {
    return {
      title: '红烧？爆炒？',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    countList: [],
    timeList: [],
    pieKV: [],
    ec: {
      lazyLoad: true
    },
    ecPie: {
      lazyLoad: true
    }
  },
  onReady() {
    var that = this;
    wx.showLoading({
      title: '转呀转',
      icon: 'loading',
      duration: 10000
    });
    //接口
    call.getRequest('feed/list',
      function(data) {
        console.info(data)
        var resultData = data.data;
        var c = [];
        var time = [];
        var pieList = [];
        for (var index in resultData) {
          time.push(resultData[index].key)
          c.push(resultData[index].value)
          pieList.push({
            name: resultData[index].key,
            value: resultData[index].value
          })
        }
        that.setData({
          countList: c,
          timeList: time,
          pieKV: pieList
        })
        if (time.length == 0) {
          wx.hideLoading();
          wx.showToast({
            title: "没有数据，难道是兔子啃电源了？",
            icon: 'none',
            duration: 4000,
          });
        } else {
          //渲染
          that.initChartBar();
          that.initChartPie();
        }
        wx.hideLoading();
      },
      function() {
        wx.showToast({
          title: "没有数据，难道是兔子啃电源了？",
          icon: 'none',
          duration: 4000,
        });
        console.log("暂无温度数据")
      });

  },
  initChartBar: function(canvas, width, height) {
    var echartsComponnetBar = this.selectComponent('#mychart-dom-bar');
    echartsComponnetBar.init((canvas, width, height) => {
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
          data: this.data.timeList,
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
          data: this.data.countList,
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          }
        }]
      };
      chart.setOption(option);
      return chart;
    });
  },
  initChartPie: function(canvas, width, height) {
    var echartsComponnetPie = this.selectComponent('#mychart-dom-pie');
    echartsComponnetPie.init((canvas, width, height) => {
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
          data: this.data.pieKV,
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
    });
  }
});