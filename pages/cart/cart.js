const AV = require('../../utils/av-weapp.js')
var app = getApp()
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
		var num = this.data.carts[index].get('quantity');
		// 如果只有1件了，就不允许再减了
		if (num > 1) {
			num --;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = this.data.carts;
		carts[index].set('quantity', num);
		// 按钮可用状态
		var minusStatuses = this.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
		// update database
		carts[index].save();
		this.sum();
	},
	bindPlus: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].get('quantity');
		// 自增
		num ++;
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = this.data.carts;
		carts[index].set('quantity', num);
		// 按钮可用状态
		var minusStatuses = this.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
		// update database
		carts[index].save();
		this.sum();
	},
	bindManual: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var carts = this.data.carts;
		var num = e.detail.value;
		carts[index].set('quantity', num);
		// 将数值与状态写回
		this.setData({
			carts: carts
		});
		cart[index].save();
		console.log(this.data.carts);
	},
	bindCheckbox: function(e) {
		/*绑定点击事件，将checkbox样式改变为选中与非选中*/
		//拿到下标值，以在carts作遍历指示用
		var index = parseInt(e.currentTarget.dataset.index);
		//原始的icon状态
		var selected = this.data.carts[index].get('selected');
		var carts = this.data.carts;
		// 对勾选状态取反
		carts[index].set('selected', !selected);
		// 写回经点击修改后的数组
		this.setData({
			carts: carts,
		});
		// update database
		carts[index].save();
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
			carts[i].set('selected', selectedAllStatus);
			// update selected status to db
			carts[i].save();
		}
		this.setData({
			selectedAllStatus: selectedAllStatus,
			carts: carts,
		});
		this.sum();

	},
	bindCheckout: function() {
		// 遍历取出已勾选的cid
		// var buys = [];
		var cartIds = [];
		for (var i = 0; i < this.data.carts.length; i++) {
			if (this.data.carts[i].get('selected')) {
				// 移动到Buy对象里去
				// cartIds += ',';
				cartIds.push(this.data.carts[i].get('objectId'));
			}
		}
		if (cartIds.length <= 0) {
			wx.showToast({
				title: '请勾选商品',
				icon: 'success',
				duration: 1000
			})
			return;
		}
		cartIds = cartIds.join(',');
		wx.navigateTo({
			url: '../../../../order/checkout/checkout?cartIds=' + cartIds + '&amount=' + this.data.total
		});
	},
	onLoad: function() {
		// auto login
		app.getUserInfo(function () {
			var that = this;
			var user = AV.User.current();
			var query = new AV.Query('Cart');
			var minusStatuses = [];
			query.equalTo('user',user);
			query.include('goods');
			query.find().then(function (carts) {
				// set goods data
				var goodsList = [];
				for(var i = 0; i < carts.length; i++){
					var goods = carts[i].get('goods');
					goodsList[i] = goods;
					minusStatuses[i] = carts[i].get('quantity') <= 1 ? 'disabled' : 'normal';
				}
				// console.log(carts);
				that.setData({
					carts: carts,
					goodsList: goodsList,
					minusStatuses: minusStatuses
				});
				// sum
				that.sum();
			});
		});

	},
	sum: function() {
		var carts = this.data.carts;
		// 计算总金额
		var total = 0;
		for (var i = 0; i < carts.length; i++) {
			if (carts[i].get('selected')) {
				total += carts[i].get('quantity') * carts[i].get('goods').get('price');
			}
		}
		// 写回经点击修改后的数组
		this.setData({
			carts: carts,
			total: total
		});
	}
})