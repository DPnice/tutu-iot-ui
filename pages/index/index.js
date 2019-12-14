const app = getApp();
var call = require("../../utils/request.js")

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
    axis: [
      {
        time: '2018-2-15',
        type: '水量',
        event: '告警23333333'
      },
      {
        time: '2018-2-15',
        type: '温度🌡',
        event: '告警23333333'
      },
      {
        time: '2018-2-15',
        type: '湿度',
        event: '告警23333333'
      },
      {
        time: '2018-2-15',
        type: '湿度',
        event: '告警23333333'
      },
    ],
    charts: [{
      id: 'bar',
      name: '🐰以🍚🥗为天'
    }, {
      id: 'line',
      name: '🏡🌡❄💧🔥☔'
    }, {
      id: 'gauge',
      name: '🥛🍺是🐰命之源'
    }],

    hideNotice: false,
    notice: '🔊暂无公告📄',
    marqueePace: 1, //滚动速度
    marqueeDistance: 10, //初始滚动距离
    size: 30,
    interval: 20, // 时间间隔
    countTime: ''
  },

  onReady() {},

  open: function(e) {
    console.info(e.target.dataset.chart.id)
    wx.navigateTo({
      url: '../' + e.target.dataset.chart.id + '/index'
    });
  },

  shuffleSuc: function(data) {
    this.setData({
      notice: "🔊" + data.data
    })
  },
  fail: function() {
    console.log("失败")
  },

  onLoad: function() {
    //在页面加载的时候执行方法
    call.getRequest('notice/msg', this.shuffleSuc, this.fail);
    let data = {},
      that = this;
    var length = that.data.notice.length * that.data.size; //文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
    that.setData({
      length,
      windowWidth
    });
    that.setData({
      marqueeDistance: windowWidth
    });
    that.run1();
  },
  run1: function() {
    var that = this;
    that.data.countTime = setInterval(function() {
      if (-that.data.marqueeDistance < that.data.length) {
        that.setData({
          marqueeDistance: that.data.marqueeDistance - that.data.marqueePace,
        });
      } else {
        clearInterval(that.data.countTime);
        that.setData({
          marqueeDistance: that.data.windowWidth
        });
        that.run1();
      }
    }, that.data.interval);
  },

});