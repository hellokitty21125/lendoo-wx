const AV = require('../../utils/av-weapp.js')
Page({
	data:{
		carts: [],
		goodsList: [],
		minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
		selectedAllStatus: false,
		total: ''
	},
	bindMinus: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].num;
		// 如果只有1件了，就不允许再减了
		if (num > 1) {
			num --;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = this.data.carts;
		carts[index].num = num;
		// 按钮可用状态
		var minusStatuses = this.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
		this.sum();
	},
	bindPlus: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].num;
		// 自增
		num ++;
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = this.data.carts;
		carts[index].num = num;
		// 按钮可用状态
		var minusStatuses = this.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
		this.sum();
	},
	bindManual: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var carts = this.data.carts;
		var num = e.detail.value;
		carts[index].num = num;
		// 将数值与状态写回
		this.setData({
			carts: carts
		});
		console.log(this.data.carts);
	},
	bindCheckbox: function(e) {
		/*绑定点击事件，将checkbox样式改变为选中与非选中*/
		//拿到下标值，以在carts作遍历指示用
		var index = parseInt(e.currentTarget.dataset.index);
		//原始的icon状态
		var selected = this.data.carts[index].selected;
		var carts = this.data.carts;
		// 对勾选状态取反
		carts[index].selected = !selected;
		// 写回经点击修改后的数组
		this.setData({
			carts: carts,
		});
		this.sum();
	},
	bindSelectAll: function() {
		// 环境中目前已选状态
		var selectedAllStatus = this.data.selectedAllStatus;
		// 取反操作
		selectedAllStatus = !selectedAllStatus;
		// 购物车数据，关键是处理selected值
		var carts = this.data.carts;
		// 遍历
		for (var i = 0; i < carts.length; i++) {
			carts[i].selected = selectedAllStatus;
		}
		this.setData({
			selectedAllStatus: selectedAllStatus,
			carts: carts,
		});
		this.sum();

	},
	bindCheckout: function() {
		// 遍历取出已勾选的cid
		var buys = [];
		for (var i = 0; i < this.data.carts.length; i++) {
			if (this.data.carts[i].get('selected')) {
				// 移动到Buy对象里去
				var buy = new AV.Object('Buy');
				var cart = this.data.carts[i];
				buy.set('goods', cart.get('goods'));
				buy.set('quantity', cart.get('quantity'));
				buy.set('user', cart.get('user'));
				buys[i] = buy;
				// delete carts from carts list
				cart.destroy();
			}
		}
		var that = this;
		// create order
		var user = AV.User.current();
		var order = new AV.Object('Order');
		order.set('user', user);
		order.set('buys', buys);
		order.set('status', 0);
		order.save().then(function () {
			wx.navigateTo({
				url: '../../../../../../checkout/checkout'
			});
		}, function () {
		});
	},
	bindToastChange: function() {
		this.setData({
			toastHidden: true
		});
	},
	onLoad: function() {
		var that = this;
		var user = AV.User.current();
		var query = new AV.Query('Cart');
		query.equalTo('user',user);
		query.include('goods');
		query.find().then(function (carts) {
			// set goods data
			var goodsList = [];
			for(var i = 0; i < carts.length; i++){
				var goods = carts[i].get('goods');
				goodsList[i] = goods;
			}
			console.log(goodsList);
			that.setData({
				carts: carts,
				goodsList: goodsList
			});
		});
		this.sum();
	},
	sum: function() {
		var carts = this.data.carts;
		// 计算总金额
		var total = 0;
		for (var i = 0; i < carts.length; i++) {
			if (carts[i].selected) {
				total += carts[i].num * carts[i].price;
			}
		}
		// 写回经点击修改后的数组
		this.setData({
			carts: carts,
			total: '￥' + total
		});
	}
})