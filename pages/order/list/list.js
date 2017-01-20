const AV = require('../../../utils/av-weapp.js')
Page({
	data: {
		orders: [],

	},
	onLoad: function () {
		var that = this;
		var user = AV.User.current();
		var query = new AV.Query('Order');	
		query.include('buys');
		query.equalTo('user', user);
		query.find().then(function (orderObjects) {
			that.setData({
				'orders': orderObjects
			});
			// loop search order, fetch the Buy objects
			for (var i = 0; i < orderObjects.length; i++) {
				var order = AV.Object.createWithoutData('Order', orderObjects[i].get('objectId'));
				// order = orderObjects[i]; 竟然不能使用这种方式取出目标对象，而只能使用createWithoutData的方式，LeanCloud的做法让人匪夷所思。
				var relation = order.relation('buys');
				var query2 = relation.query();
				query2.find().then(function (buyObjects) {
					console.log(buyObjects);
					console.log('success');
				}, function (error) {
					console.log(error);
				});
			}

		});
	}
});