const AV = require('../../../utils/av-weapp.js')
Page({
	data: {
		goods: {}
	},
	onLoad: function(options) {
		var goodsId = options.objectId;
		console.log(goodsId);
		this.getGoodsById(goodsId);
	},
	getGoodsById: function(goodsId) {
		var that = this
		var query = new AV.Query('Goods');
        // 生成商品对象
		query.get(goodsId).then(function (goods) {
			console.log(goods);
			that.setData({
				goods: goods
			});
		// 成功获得实例
		}, function (error) {
		// 异常处理
		});
	}
});