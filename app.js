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
	          // 获取openId
	            	// TODO 缓存 openId
	            	//统一下单接口对接
	            	wx.request({
	            		url: 'https://lendoo.leanapp.cn/index.php/WXPay',
	            		data: {
	            			code: res.code
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
							// 		// wx.showToast({
							// 		// 	title: '支付成功'
							// 		// });
							// 		// console.log(res);
							// 	}
							// });
						}
					});
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
