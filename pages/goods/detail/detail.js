const AV = require('../../../utils/av-weapp.js')
Page({
	data: {
		goods: {}
	},
	onLoad: function(options) {
		var goodsId = options.objectId;
		this.getGoodsById(goodsId);
	},
	getGoodsById: function(goodsId) {
		var that = this
		var query = new AV.Query('Goods');
        // 生成商品对象
		query.get(goodsId).then(function (goods) {
			// console.log(goods);
			that.setData({
				goods: goods
			});
		// 成功获得实例
		}, function (error) {
		// 异常处理
		});
	},
	buyNow: function() {
		this.verifyLogin(function(){
			// buy now
		});
	},
	addCart: function() {
		var that = this;
		this.verifyLogin(function(){
			// add cart
			var user = AV.User.current();
			// search if this goods exsit or not.if did exsit then quantity ++ updated cart object;
			// if not, create cart object
			// query cart
			var query = new AV.Query('Cart');
			query.equalTo('user', user);
			query.equalTo('goods', that.data.goods);
			// if count less then zero
			query.count().then(function (count) {
				if (count <= 0) {
					// if didn't exsit, then create new one
					var Cart = AV.Object.extend('Cart');
					var cart = new Cart();
					cart.set('user', user);
					cart.set('quantity', 1);
					cart.set('goods', that.data.goods);
					cart.save().then(function(cart){
						that.showCartToast();
					},function(error) {
						console.log(error);
					});
				} else {
					// if exsit, get the cart self
					query.first().then(function(cart){
						// update quantity
						cart.increment('quantity', 1);
						// atom operation
						// cart.fetchWhenSave(true);
						that.showCartToast();
						return cart.save('fetchWhenSave',true);
					}, function (error) {
						console.log(error);
					});
				}
			}, function (error) {

			});
		});

	},
	verifyLogin: function(cb){
		//verify if user if login with AV.User.current();
		var currentUser = AV.User.current();
		if (!currentUser) {
			// login via wechat
			var app = getApp();
			app.getUserInfo(function(userInfo) {
				// console.log(userInfo);
				// login AV——接口非signUpOrlogInWithAuthData，新接口还有待提供
				// no appid, hard coding instead
				// 404 err
				// AV.User.signUpOrlogInWithAuthData({
				//   "openid": "oPrJ7uM5Y5oeypd0fyqQcKCaRv3o",
				//   "access_token": "OezXcEiiBSKSxW0eoylIeNFI3H7HsmxM7dUj1dGRl2dXJOeIIwD4RTW7Iy2IfJePh6jj7OIs1GwzG1zPn7XY_xYdFYvISeusn4zfU06NiA1_yhzhjc408edspwRpuFSqtYk0rrfJAcZgGBWGRp7wmA",
				//   "expires_at": "2017-01-06T11:43:11.904Z"
				// }, 'weixin').then(function (s) {
				// 	cb();
				// }, function (e) {

				// });
				  // 新建 AVUser 对象实例
				var user = new AV.User();
				// 设置用户名
				user.setUsername(userInfo.nickName);
				// 设置密码
				user.setPassword('123456');
				// 应该还要设置过期时间，从console.log中反应出默认是一天
				user.signUp().then(function (loginedUser) {
				  console.log(loginedUser);
				  cb();
				}, function (error) {
					console.log(error);
				});
			});
		} else {
			cb();
		}
	},
	showCartToast: function () {
		wx.showToast({
			title: '已加入购物车',
			icon: 'success',
			duration: 2000
		})
	}
});