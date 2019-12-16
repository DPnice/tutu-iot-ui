import * as echarts from '../../ec-canvas/echarts';
var call = require("../../utils/request.js")
const app = getApp();


Page({
  onReady: function() {
    this.setTH();
  },
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
      lazyLoad: true
    },
    time: [],
    // 温度
    temperature: [],
    //湿度
    humidity: []
  },
  setTH: function() {
    //在页面加载的时候执行方法
    wx.showLoading({ title: '加载中', icon: 'loading', duration: 10000 });
    let that = this;
    call.getRequest('humidity/list',
      function(data) {
        console.info(data)
        let resultData = data.data;
        let timeList = [];
        let h = [];
        for (var index in resultData) {
          timeList.push(resultData[index].humidityTime)
          h.push(resultData[index].humidity)
        }
        that.setData({
          time: timeList,
          humidity: h
        })
        
      },
      function() {
        that.setData({})
        console.log("暂无湿度数据")
        
      });

    call.getRequest('temperature/list',
      function(data) {
        console.info(data)
        let resultData = data.data;
        let t = [];
        for (var index in resultData) {
          t.push(resultData[index].temperature)
        }
        that.setData({
          temperature: t
        })
        //渲染
        that.initChart();
        wx.hideLoading();
      },
      function() {
        wx.showToast({
          title: "暂无数据",
          icon: 'none',
          duration: 2000,
        });
        console.log("暂无温度数据")
      });
  },

  initChart: function() {
    
    console.info(this.data.time)
    let echartsComponnet = this.selectComponent('#mychart-dom-line');
    echartsComponnet.init((canvas, width, height) => {
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
          trigger: 'axis',
          position: function(pos, params, dom, rect, size) {
            var obj = {
              top: 60
            };
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
            return obj;
          }
        },
        xAxis: {
          // name: "时间",
          nameTextStyle: {
            fontSize: 14
          },
          // type: 'time',
          boundaryGap: false,
          data: this.data.time,
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
          data: this.data.temperature,
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
          data: this.data.humidity,
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
    });

  }
});