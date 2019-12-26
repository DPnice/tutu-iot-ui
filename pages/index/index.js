const app = getApp();
var call = require("../../utils/request.js")

Page({

  onShareAppMessage: function(res) {
    return {
      title: '🐰兔子养好，然后红烧🍖🥘🍻',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    loadingHidden: false,
    alarm: [],
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
    notice: '',
    marqueePace: 1, //滚动速度
    marqueeDistance: 10, //初始滚动距离
    size: 30,
    interval: 20, // 时间间隔
    countTime: '',
    loading: false,
    jwt: ''
  },
  jwtInput: function(key) {
    this.setData({
      jwt: key.detail.value
    })
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
    this.setData({
        notice: '🔊暂无公告📄'
      }),
      console.log("公告失败")
  },

  onLoad: function() {
    //在页面加载的时候执行方法
    let that = this;
    call.getRequest('alarm/list',
      function(data) {
        console.info(data)
        that.setData({
          alarm: data.data,
          loadingHidden: true
        })
      },
      function() {
        that.setData({
          alarm: [{
            alarmTime: new Date().toLocaleTimeString(),
            type: '',
            alarm: '暂无告警'
          }],
          loadingHidden: true
        })
        console.log("告警失败")
      });

    //公告
    call.getRequest('notice/msg', this.shuffleSuc, this.fail);

    let data = {};
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
  delay: function(milSec) {
    return new Promise(resolve => {
      setTimeout(resolve, milSec)
    })
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

  feed: function(e) {
    var that = this;
    //喂食接口
    this.setData({
      loading: true
    })
    var data = {
      jwt: that.data.jwt
    }
    console.info(data)
    call.postRequest('feed', data,
      function(redata) {
        console.info(redata)
        that.setData({
          loading: false
        })
        wx.showToast({
          title: "❤喂食成功❤",
          icon: 'none',
          image: '../../img/爱心.png',
          duration: 3000,
          mask: true
        });
      },
      function() {
        that.setData({
          loading: false
        })
        console.log("喂食失败")
        wx.showToast({
          title: "喂食失败😭",
          icon: 'none',
          image: '../../img/x.jpg',
          duration: 3000,
          mask: true
        });
      });
  },
  

});