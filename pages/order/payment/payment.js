const AV = require('../../../utils/av-weapp.js')
Page({
	data: {
		orderId: ''
	},
	onLoad: function (options) {
		var orderId = options.orderId;
		var totalFee = options.totalFee;
		this.setData({
			orderId: orderId,
			totalFee: totalFee
		})
	},
	pay: function () {
		var that = this;
		console.log(getApp().code);
		//统一下单接口对接
		wx.request({
			url: 'https://lendoo.leanapp.cn/index.php/WXPay',
			data: {
				code: getApp().code,
				body: '灵动商城',
				tradeNo: that.data.orderId,
				totalFee: parseInt(that.data.totalFee)
			},
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function (response) {
				console.log(response);
				// 发起支付
				wx.requestPayment({
					'timeStamp': response.data.timeStamp,
					'nonceStr': response.data.nonceStr,
					'package': response.data.package,
					'signType': 'MD5',
					'paySign': response.data.paySign,
					'success':function(res){
						// update order
						var query = new AV.Query('Order');
						query.get(that.data.orderId).then(function (order) {
							order.set('status', 1);
							order.save();
							console.log('status: ' + 1);
						}, function (err) {
							
						});
					}
				});
			}
		});
	}
})