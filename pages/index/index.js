const AV = require('../../utils/av-weapp.js')
Page({
	data: {
		banner: []

	},
	onLoad: function () {
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
	}
})