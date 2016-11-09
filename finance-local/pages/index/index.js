//index.js
//获取应用实例
// var app = getApp()
Page({
  data: {
//    motto: 'Hello World',
//    userInfo: {}
      items: []
  },
  addItem: function() {
      wx.navigateTo({
      url: '../item/item'
    })
  },
  // 使用onShow而不使用onLoad，使得添加返回后自刷新
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'db',
      success: function(res) {
        console.log(res.data.length);
        that.setData({
          'items':res.data
        });
      }
    })
//    console.log('onLoad')
//    var that = this
//    //调用应用实例的方法获取全局数据
//    app.getUserInfo(function(userInfo){
//      //更新数据
//      that.setData({
//        userInfo:userInfo
//      })
//    })
  }
})
