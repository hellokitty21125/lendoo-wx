const AV = require('../../../utils/av-weapp.js')
Page({
	add: function () {
		wx.navigateTo({
			url: '../add/add'
		});
	},
	onShow: function () {
		this.loadData();
	},
	delete: function (e) {
		var that = this;
		// 取得下标
		var index = parseInt(e.currentTarget.dataset.index);
		// 找到当前地址AVObject对象
		var address = that.data.addressObjects[index];
		// 给出确认提示框
		wx.showModal({
			title: '确认',
			content: '要删除这个地址吗？',
			success: function(res) {
				if (res.confirm) {
					// 真正删除对象
					address.destroy().then(function (success) {
						// 删除成功提示
						wx.showToast({
							title: '删除成功',
							icon: 'success',
							duration: 2000
						});
						// 重新加载数据
						that.loadData();
					}, function (error) {

					});
				}
			}
		})
		
	},
	loadData: function () {
		// 加载网络数据，获取地址列表
		var that = this;
		var query = new AV.Query('Address');
		query.equalTo('user', AV.User.current());
		query.find().then(function (addressObjects) {
			that.setData({
				addressObjects: addressObjects
			});
		});
	}
})