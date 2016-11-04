const AV = require('../../../utils/av-weapp.js')
Page({
	formSubmit: function(e) {
		var detail = e.detail.value.detail;
		// save address to leanCloud
		var address = new AV.Object('Address');
		address.set('detail', detail);
		// set province city region
		address.set('province', this.data.province[this.data.provinceIndex]);
		address.set('city', this.data.city[this.data.cityIndex]);
		address.set('region', this.data.region[this.data.regionIndex]);
		address.set('user', AV.User.current());
		address.save().then(function (address) {
			console.log(address);
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
		region: [],
		provinceObjects: [],
		cityObjects: [],
		regionObjects: []
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
	bindProvincePickerChange: function(e) {
		var that = this;
		// load city
	    this.setData({
	    	provinceIndex: e.detail.value
	    })
	    this.getArea(this.data.provinceObjects[e.detail.value].get('aid'), function (area) {
	    	var array = [];
			for (var i = 0; i < area.length; i++) {
				array[i] = area[i].get('name');
			}
			that.setData({
				city: array,
				cityObjects: area
			});
	    });
	},
	bindCityPickerChange: function(e) {
		var that = this;
		// load city
	    this.setData({
	    	cityIndex: e.detail.value
	    })
	    this.getArea(this.data.cityObjects[e.detail.value].get('aid'), function (area) {
	    	var array = [];
			for (var i = 0; i < area.length; i++) {
				array[i] = area[i].get('name');
			}
			that.setData({
				region: array,
				regionObjects: area
			});
	    });
	},
	bindRegionPickerChange: function(e) {
	    this.setData({
	    	regionIndex: e.detail.value
	    })
	},
	onLoad: function () {
		var that = this;
		// load province
		this.getArea(0, function (area) {
			var array = [];
			for (var i = 0; i < area.length; i++) {
				array[i] = area[i].get('name');
			}
			that.setData({
				province: array,
				provinceObjects: area
			});
		});
		// TODO:load default city...
	}
})