const AV = require('../../../utils/av-weapp.js')
Page({
	add: function () {
		wx.navigateTo({
			url: '../add/add'
		});
	},
	onShow: function () {
		var that = this;
		var query = new AV.Query('Address');
		query.equalTo('user', AV.User.current());
		query.find().then(function (addressObjects) {
			that.setData({
				address: addressObjects
			});
		});
	}
})