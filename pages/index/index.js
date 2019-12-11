const app = getApp();

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () {},
      fail: function () {}
    }
  },
  data: {
    charts: [{
      id: 'bar',
      name: '柱状图'
    }, {
      id: 'pie',
      name: '饼图'
    }, {
      id: 'line',
      name: '折线图(湿度温度)'
    }, {
      id: 'gauge',
      name: '仪表盘(水量)'
    }]
  },

  onReady() {
  },

  open: function (e) {
    console.info(e.target.dataset.chart.id)
    wx.navigateTo({
      url: '../' + e.target.dataset.chart.id + '/index'
    });
  }
});
