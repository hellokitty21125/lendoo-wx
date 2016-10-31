const AV = require('../../../utils/av-weapp.js')
Page({
	onLoad: function(options) {
		var goodsId = options.objectId;
		console.log(goodsId);
		this.getGoodsById(goodsId);
	},
	getGoodsById: function(goodsId) {
		var query = new AV.Query('Goods');
        // 生成商品对象
		query.get(goodsId).then(function (goods) {
			console.log(goods.attributes.images);
		// 成功获得实例
		}, function (error) {
		// 异常处理
		});
	}
});