// 初始化AV
const AV = require('./utils/av-weapp.js');
var md5 = require('./utils/md5.js');
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
	            	// 获取openId
	            	var openId = response.data.openid;
	            	// TODO 缓存 openId
	            	//统一下单接口对接
	            	wx.request({
	            		url: 'https://lendoo.leanapp.cn/index.php/WXPay',
	            		data: {
	            			openId: openId
	            		},
	            		method: 'POST',
	            		header: {
						    'content-type': 'application/x-www-form-urlencoded'
						},
	            		success: function (response) {
			            	// 发起支付
							// wx.requestPayment({
							// 	'timeStamp': response.data.timeStamp,
							// 	'nonceStr': response.data.nonceStr,
							// 	'package': response.data.package,
							// 	'signType': 'MD5',
							// 	'paySign': response.data.paySign,
							// 	'success':function(res){
							// 		console.log('success');
							// 		console.log(res);
							// 	}
							// });
	            		}
	            	});

	            }
	          })
	        } else {
	          console.log('获取用户登录态失败！' + res.errMsg)
	        }
	      }
	    });

		// 设备信息
		wx.getSystemInfo({
			success: function(res) {
				that.screenWidth = res.windowWidth;
				that.pixelRatio = res.pixelRatio;
			}
		});
    }
})
