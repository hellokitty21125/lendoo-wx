// 初始化AV
const AV = require('./utils/av-weapp.js')
const appId = "SgHcsYqoLaFTG0XDMD3Gtm0I-gzGzoHsz";
const appKey = "xdv2nwjUK5waNglFoFXkQcxP";

AV.init({ 
    appId: appId, 
    appKey: appKey,
});

// 授权登录
App({
    onLaunch: function () {
        // auto login via SDK
        var that = this;
        AV.User.loginWithWeapp();
        
        var user = AV.User.current();
        // console.log(user.get('username'));
		wx.login({
	      success: function(res) {
	        if (res.code) {
	          //发起网络请求
	          wx.request({
	            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9114b997bd86f8ed&secret=d27551c7803cf16015e536b192d5d03b&js_code='+res.code+'&grant_type=authorization_code',
	            data: {
	              code: res.code
	            },
	            success: function (response) {
	            	console.log(response);
	            }
	          })
	        } else {
	          console.log('获取用户登录态失败！' + res.errMsg)
	        }
	      }
	    });



    }
})
