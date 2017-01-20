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
				var queryBuy = relation.query();
				queryBuy.include('goods');
				queryBuy.find().then(function (buyObjects) {
					console.log(buyObjects[0]);
					for (var j = 0; j < buyObjects.length; j++) {
						var buyObject = buyObjects[j];
						var buysData = that.data.buysData == undefined ? [] : that.data.buysData;
						var buy = {
							avatar: buyObject.get('goods').get('avatar'),
							title: buyObject.get('goods').get('title'),
							price: buyObject.get('goods').get('price'),
							quantity: buyObject.get('quantity')
						};
						buysData[j] = buy;
						// console.log(buy);
						that.setData({
							buysData: buysData
						});
						console.log('i:' + i);
						console.log('buysData');
						// console.log(that.data.buysData);
						// console.log(buyObject.get('objectId'));
						// console.log(buyObject.get('goods').get('avatar'));
						// console.log(buyObject.get('goods').get('title'));
						// console.log(buyObject.get('goods').get('price'));
						// console.log(buyObject.get('quantity'));

					}
				}, function (error) {
					console.log(error);
				});
			}
		});
	}
});