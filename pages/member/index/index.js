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
		// 获得当前登录用户
		const user = AV.User.current();
		// 调用小程序 API，得到用户信息
		wx.getUserInfo({
			success: ({userInfo}) => {
  				that.setData({
				userInfo: userInfo
			});
		  }
		});
	}
})