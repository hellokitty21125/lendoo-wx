const AV = require('../../utils/av-weapp.js')
Page({
	data: {
		banner: [],
		goods: []
	},
	onLoad: function () {
		this.loadBanner();
		this.loadMainGoods();
	},
	loadBanner: function () {
		var that = this;
		var query = new AV.Query('Banner');
		// query.include('image');
		query.find().then(function (bannerObjects) {
			var banner = [];
			for (var i = 0; i < bannerObjects.length; i++) {
				banner.push(bannerObjects[i].get('image').get('url'));
			}
			that.setData({
				banner: banner
			});
		});
	},
	loadMainGoods: function () {
		var that = this;
		var query = new AV.Query('Goods');
		query.equalTo('isHot', true);
		query.find().then(function (goodsObjects) {
			that.setData({
				goods: goodsObjects
			});
		});
	}
})