const AV = require('../../../utils/av-weapp.js')
var app = getApp()
var that;
Page({
	onLoad: function () {
		that = this;
	},
	login: function (e) {
		// 获取用户名与密码
		var username = e.detail.value.username;
		var password = e.detail.value.password;
		// 退出原买家身份
		if (AV.User.current()) {
			AV.User.logOut();
			// 登录管理员身份
			AV.User.logIn(username, password).then(function (user) {
				wx.showToast({
					title: '登录成功',
					icon: 'success'
				});
				// 自刷新跳转到管理面板
				wx.redirectTo({
					url: '../dashboard/dashboard'
				});
			}, function (){
				wx.showModal({
					title: '登录失败',
					showCancel: false
				});
			});
		}
	}
})