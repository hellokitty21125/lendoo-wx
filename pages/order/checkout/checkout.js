const AV = require('../../../utils/av-weapp.js')
Page({
	data: {
		amount : 0,
		carts: [],
		addressList: [],
		addressIndex: 0
	},
	addressObjects: [],
	onLoad: function (options) {
		this.readCarts(options);
		this.loadAddress();
	},
	readCarts: function (options) {
		// from carts
		// amount
		var amount = parseInt(options.amount);
		this.setData({
			amount: amount
		});

		// cartIds str
		var cartIds = options.cartIds;
		var cartIdArray = cartIds.split(',');
		// restore carts object
		var carts = [];
		for (var i = 0; i < cartIdArray.length; i++) {
			var query = new AV.Query('Cart');
			query.include('goods');
			query.get(cartIdArray[i]).then(function (cart) {
				carts.push(cart);
			}, function (error) {

			});
		}
		this.setData({
			carts: carts
		});
	},
	confirmOrder: function () {
		// submit order
		var carts = this.data.carts;
		var buys = [];
		for (var i = 0; i < carts.length; i++) {
			// move cart to buy
			var buy = new AV.Object('Buy');
			var cart = carts[i];
			buy.set('goods', cart.get('goods'));
			buy.set('quantity', cart.get('quantity'));
			buy.set('user', cart.get('user'));
			buys[i] = buy;
			// delete carts from carts list
			cart.destroy();
		}
		// create order
		var that = this;
		var user = AV.User.current();
		var order = new AV.Object('Order');
		order.set('user', user);
		order.set('buys', buys);
		order.set('status', 0);
		order.set('amount', this.data.amount);
		// get address
		var address = this.addressObjects[this.data.addressIndex];
		order.set('address', address);
		order.save().then(function (order) {
			console.log('pay me from carts...');
			wx.navigateTo({
				url: '../../../../../payment/payment?orderId=' + order.get('objectId')
			});
		}, function () {
		});
	},
	loadAddress: function () {
		var that = this;
		var user = AV.User.current();
		var query = new AV.Query('Address');
		query.equalTo('user', user);
		query.find().then(function (address) {
			var addressList = [];
			var addressObjects = [];
			for (var i = 0; i < address.length; i ++) {
				addressList.push(address[i].get('detail'));
			}
			that.setData({
				addressList: addressList
			});
			that.addressObjects = address;
		});
	},
	bindPickerChange: function (e) {
		this.setData({
	    	addressIndex: e.detail.value
	    })
	}
})