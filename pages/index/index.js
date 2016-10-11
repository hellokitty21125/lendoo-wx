Page({
	data: {
    items: [
	      {value: 'USA', text: '美国', type: 'circle'},
	      {value: 'CHN', text: '中国', type: 'success_circle'},
	      {value: 'BRA', text: '巴西', type: 'circle'},
	      {value: 'JPN', text: '日本', type: 'circle'},
	      {value: 'ENG', text: '英国', type: 'circle'},
	      {value: 'TUR', text: '法国', type: 'circle'},
	    ]
  	},
	bindCheckbox: function(e) {
		//绑定点击事件，将checkbox样式改变为选中与非选中
		console.log('s' + e.currentTarget.dataset.value);
	}
})