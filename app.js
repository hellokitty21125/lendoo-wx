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
	            	console.log(openId);
	            	// TODO 缓存 openId
	            	//统一下单接口对接
	            	wx.request({
	            		url: 'https://lendoo.leanapp.cn/index.php/WXPay',
	            		data: {
	            			openId: openId
	            		},
	            		method: 'POST',
	            		header: {
						    'content-type': 'application/json'
						},
	            		success: function (response) {
	            			console.log(response);
			            	// 发起支付
			            	// var appId = 'wx9114b997bd86f8ed';
			            	var appId = response.data.appid;
			            	var timeStamp = (Date.parse(new Date()) / 1000).toString();
			            	// var pkg = 'prepay_id=' + 'wx2017010310144508a4f7b72b0255261470';
			            	// var nonceStr = 'MauUXdes5ni9wjis';
			            	var pkg = 'prepay_id=' + response.data.prepay_id;
			            	var nonceStr = response.data.nonce_str;
			            	console.log('appId='+appId+'&nonceStr='+nonceStr+'&package='+pkg+'&signType=MD5&timeStamp='+timeStamp);
			            	var paySign = md5.hex_md5('appId='+appId+'&nonceStr='+nonceStr+'&package='+pkg+'&signType=MD5&timeStamp='+timeStamp+"&key=d27551c7803cf16015e536b192d5d03b").toUpperCase();
			            	console.log(paySign);
			            	console.log(appId);
			            	wx.requestPayment({
								'timeStamp': timeStamp,
								'nonceStr': nonceStr,
								'package': pkg,
								'signType': 'MD5',
								'paySign': paySign,
								'success':function(res){
									console.log('success');
									console.log(res);
								}
							});

	            		}
	            	});

	            }
	          })
	        } else {
	          console.log('获取用户登录态失败！' + res.errMsg)
	        }
	      }
	    });



    }
})
