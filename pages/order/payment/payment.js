const AV = require('../../../utils/av-weapp.js')
Page({
	data: {
		orderId: ''
	},
	onLoad: function (options) {
		var orderId = options.orderId;
		console.log('order id : ' + orderId);
		this.setData({
			orderId: orderId
		})
	},
	pay: function () {
			// wx.requestPayment({
			//    'timeStamp': '',
			//    'nonceStr': '',
			//    'package': '',
			//    'signType': 'MD5',
			//    'paySign': '',
			//    'success':function(res){
			//    		console.log(res);
			//    },
			//    'fail':function(res){
			//    		console.log(res);
			//    }
			// })

			// update order
			var query = new AV.Query('Order');
			query.get(this.data.orderId).then(function (order) {
				order.set('status', 1);
				order.save();
				console.log('status: ' + 1);
			}, function (err) {
				
			});
	}
})