const AV = require('../../../utils/av-weapp.js')
Page({
	data: {
		goods: {},
		current: 0,
		galleryHeight: getApp().screenWidth,
		detailImagesHeight: []
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
	bindImageLoad: function (e) {
		// 取出当前图片的下标
		var index = parseInt(e.currentTarget.dataset.index);
		// 先读取本地detailImagesHeight原值
		var detailImagesHeight = this.data.detailImagesHeight;
		// 相当地存入对应图片的高度
		detailImagesHeight[index] = getApp().screenWidth / (e.detail.width / e.detail.height);
		this.setData({
			detailImagesHeight: detailImagesHeight
		});
	},
	addCart: function() {
		var that = this;
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
				var cart = AV.Object('Cart');
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
					return cart.save();
				}, function (error) {
					console.log(error);
				});
			}
		}, function (error) {

		});

	},
	showCartToast: function () {
		wx.showToast({
			title: '已加入购物车',
			icon: 'success',
			duration: 1000
		});
		wx.navigateTo({
			url: '../../../../../../cart/cart'
		});

	},
	previewImage: function (e) {
		wx.previewImage({
			//从<image>的data-current取到current，得到String类型的url路径
			current: this.data.goods.get('images')[parseInt(e.currentTarget.dataset.current)],
			urls: this.data.goods.get('images') // 需要预览的图片http链接列表
		})
	}
});