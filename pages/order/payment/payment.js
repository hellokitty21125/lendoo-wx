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
		var paramsJson = {
			body: '灵动商城',
			tradeNo: that.data.orderId,
			totalFee: parseFloat(that.data.totalFee) * 100
		}
		AV.Cloud.run('pay', paramsJson).then(function(response) {
			response = JSON.parse(response);
			// 调用成功，得到成功的应答 data
			console.log(response);
			// 发起支付
			wx.requestPayment({
				'timeStamp': response.timeStamp,
				'nonceStr': response.nonceStr,
				'package': response.package,
				'signType': 'MD5',
				'paySign': response.paySign,
				'success':function(res){
					wx.showToast({
						title: '支付成功'
					});
					// update order
					// var query = new AV.Query('Order');
					// query.get(that.data.orderId).then(function (order) {
					// 	order.set('status', 1);
					// 	order.save();
					// 	console.log('status: ' + 1);
					// }, function (err) {
						
					// });
					wx.navigateTo({
						url: '../list/list?status=1'
					});
				}
			});
		}, function(err) {
		  // 处理调用失败
		  console.log(err);
		});
	}
})