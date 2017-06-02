const AV = require('../../../utils/av-weapp.js')
var app = getApp()
var that;
Page({
	onLoad: function () {
		that = this;
	},
	orderManage: function () {
		wx.navigateTo({
			url: '../order/order'
		});
	}
})