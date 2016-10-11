Page({
	data: {
	    items: [
		      {value: 'USA', text: '美国', type: 'circle'},
		      {value: 'CHN', text: '中国', type: 'success_circle'},
		      {value: 'BRA', text: '巴西', type: 'circle'},
		      {value: 'JPN', text: '日本', type: 'circle'},
		      {value: 'ENG', text: '英国', type: 'circle'},
		      {value: 'TUR', text: '法国', type: 'circle'},
		    ],
	    checkedValues: []
  	},
	bindCheckbox: function(e) {
		/*绑定点击事件，将checkbox样式改变为选中与非选中*/

		//拿到下标值，以在items作遍历指示用
		var index = parseInt(e.currentTarget.dataset.index);
		//原始的icon状态
		var type = this.data.items[index].type;
		var items = this.data.items;
		if (type == 'circle') {
			//未选中时
			items[index].type = 'success_circle';
		} else {
			items[index].type = 'circle';
		}

		// 写回经点击修改后的数组
		this.setData({
			items: items
		});
		// 遍历拿到已经勾选的值
		var checkedValues = [];
		for (var i = 0; i < items.length; i++) {
			if (items[i].type == 'success_circle') {
				checkedValues.push(items[i].value);
			}
		}
		// 写回data，供提交到网络
		this.setData({
			checkedValues: checkedValues
		});
	}
})