var app = getApp();
//域名
var host = 'http://192.168.0.102:7777/iot/';
// var host = 'http://192.168.1.81:7777/iot/';
// var host = 'https://www.dpnice.online:7777/iot/';

/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function postRequest(url, postData, doSuccess, doFail) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function () {
      doFail();
    },
  })
}

//GET请求，不需传参，直接URL调用，
function getRequest(url, doSuccess, doFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res.data);
    },
    fail: function () {
      doFail();
    },
  })
}

/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 */
module.exports = {
  postRequest: postRequest,
  getRequest: getRequest
}