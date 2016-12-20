const AV = require('../../../utils/av-weapp.js')
Page({
	isDefault: false,
	formSubmit: function(e) {
		// user 
		var user = AV.User.current();
		// detail
		var detail = e.detail.value.detail;
		// realname
		var realname = e.detail.value.realname;
		// mobile
		var mobile = e.detail.value.mobile;
		// save address to leanCloud
		var address = new AV.Object('Address');
		// if isDefault address
		address.set('isDefault', this.isDefault);
		address.set('detail', detail);
		// set province city region
		address.set('province', this.data.province[this.data.provinceIndex]);
		address.set('city', this.data.city[this.data.cityIndex]);
		address.set('region', this.data.region[this.data.regionIndex]);
		address.set('user', user);
		address.set('realname', realname);
		address.set('mobile', mobile);
		address.save().then(function (address) {
			console.log(address);
			wx.showToast({
				title: 'Add Success'
			});
			// navi back
			wx.navigateBack();
		}, function (error) {
			console.log(error);
		});
	},
	data: {
		province: [],
		city: [],
		region: [],
		provinceObjects: [],
		cityObjects: [],
		regionObjects: [],
		maskVisual: 'hidden'
	},
	getArea: function (pid, cb) {
		var that = this;
		// query area by pid
		var query = new AV.Query('Area');
		query.equalTo('pid', pid);
		query.find().then(function (area) {
			cb(area);
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
		// if isDefault, address is empty
		this.setDefault();
		// TODO:load default city...
	},
	setDefault: function () {
		var that = this;
		var user = AV.User.current();
		// if user has no address, set the address for default
		var query = new AV.Query('Address');
		query.equalTo('user', user);
		query.count().then(function (count) {
			if (count <= 0) {
				that.isDefault = true;
			}
		});
	},
    cascadePopup: function() {
    	var animation = wx.createAnimation({
		      duration: 500,
		        timingFunction: 'ease-in-out',
		    });
	    this.animation = animation;
	    animation.translateY(-100).step();
	    this.setData({
	      animationData:animation.export(),
	      maskVisual: 'show'
	    })
    },
    cascadeDismiss: function () {
		var animation = wx.createAnimation({
		      duration: 500,
		        timingFunction: 'ease-in-out',
		    });
	    this.animation = animation;
	    animation.translateY(100).step();
	    this.setData({
	      animationData:animation.export(),
	      maskVisual: 'hidden'
	    })
    }
})