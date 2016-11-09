// 初始化AV
const AV = require('../../utils/av-weapp.js')
AV.init({ 
    appId: "SgHcsYqoLaFTG0XDMD3Gtm0I-gzGzoHsz", 
    appKey: "xdv2nwjUK5waNglFoFXkQcxP",
});
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    categories: []
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // load cate
    var that = this;
    var categories = [];
    var query = new AV.Query('Category');
    query.find().then(function(category){
      for(var i = 0; i < category.length; i++){
         categories.push(category[i].get('title'));

      }
      that.setData({
        'categories': categories
      });
      console.log(categories);
    }, function() {

    });

  }
})
