// 初始化AV
const AV = require('./utils/av-weapp.js')
AV.init({ 
    appId: "SgHcsYqoLaFTG0XDMD3Gtm0I-gzGzoHsz", 
    appKey: "xdv2nwjUK5waNglFoFXkQcxP",
});

// 授权登录
App({
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (response) {
        	//get openid fail, because of no appid
        	
			// wx.request({
			// 	url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code='+response.code+'&grant_type=authorization_code',
			// 	header: {
			// 	      'Content-Type': 'application/json'
			// 	 },
			// 		success: function (res) {
			// 		console.log(res);
			// 	}
			// });
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData:{
    userInfo:null
  }
})
