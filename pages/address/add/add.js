const AV = require('../../../utils/av-weapp.js')
Page({
	formSubmit: function(e) {
		var detail = e.detail.value.detail;
		// save address to leanCloud
		var address = new AV.Object('Address');
		address.set('detail', this.data.detail);
		address.save().then(function (address) {
			wx.showToast({
				title: 'Add Success'
			});
			// navi back
			wx.navigateBack();
		});
	},
	data: {
		province: [],
		city: [],
		region: []
	},
	getArea: function (pid, cb) {
		var that = this;
		// query area by pid
		var query = new AV.Query('Area');
		query.equalTo('pid', pid);
		query.find().then(function (area) {
			cb(area);
			// that.setData({
			// 	area: area
			// });
		}, function (err) {
			
		});
	},
	bindPickerChange: function(e) {
	    console.log('picker发送选择改变，携带值为', e.detail.value)
	    this.setData({
	    	index: e.detail.value
	    })
	},
	onLoad: function () {
		var that = this;
		// load province
		this.getArea(0, function (area) {
			var province = [];
			for (var i = 0; i < area.length; i++) {
				province[i] = area[i].get('name');
			}
			that.setData({
				province: province
			});
		});
	}
})