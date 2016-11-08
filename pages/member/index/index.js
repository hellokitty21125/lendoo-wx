const AV = require('../../../utils/av-weapp.js')
var app = getApp()
Page({
	navigateToAddress: function () {
		wx.navigateTo({
			url: '../../address/list/list'
		});
	},
	logout: function () {
		if (AV.User.current()) {
			AV.User.logOut();
			wx.showToast({
				'title': '退出成功'
			});
		} else {
			wx.showToast({
				'title': '请先登录'
			});
		}
	},
	onShow: function () {
		var that = this;
		app.getUserInfo(function (openid) {
			that.setData({
				userInfo: app.globalData.userInfo
			});
		});
	}
})