const AV = require('../../../utils/av-weapp.js')
var that;
Page({
	data: {
		images: [],
		imageWidth: getApp().screenWidth / 4 - 10
	},
	onLoad: function (options) {
		that = this;
		that.setData({
			images: ["wxfile://tmp_1319638221o6zAJsyOMl81KZyBLvZsExE1WAvYc54054c974de6fb387cc68ff84d024ed.png", "wxfile://tmp_1319638221o6zAJsyOMl81KZyBLvZsExE1WAvYeceb8dadd5f9db88457dfc3216cb47d5.jpg", "wxfile://tmp_1319638221o6zAJsyOMl81KZyBLvZsExE1WAvY5de13c0d2c52c0c2f785dad5913036c6.jpg","wxfile://tmp_1319638221o6zAJsyOMl81KZyBLvZsExE1WAvY1ab885b07d055165b0ed9cd24e61e2bb.png"]
		});
	},
	chooseImage: function () {
		// 选择图片
		wx.chooseImage({
			sizeType: ['compressed'], 
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
				var tempFilePaths = res.tempFilePaths;
				console.log(tempFilePaths);
				that.setData({
					images: that.data.images.concat(tempFilePaths)
				});
			}
		})
	},
	previewImage: function () {
		// 预览图集
		wx.previewImage({
			urls: that.data.images
		});
	},
	submit: function () {
		// 提交图片，事先遍历图集数组
		that.data.images.forEach(function (tempFilePath) {
			new AV.File('file-name', {
				blob: {
					uri: tempFilePath,
				},
			}).save().then(
				// file => console.log(file.url())
				function(file) {
					console.log(file.url());
				}
			).catch(console.error);
		});
	},
	delete: function (e) {
		var index = e.currentTarget.dataset.index;
		var images = that.data.images;
		images.splice(index, 1);
		that.setData({
			images: images
		});
	}
})