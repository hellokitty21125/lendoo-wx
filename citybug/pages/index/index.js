//index.js
//获取应用实例
var app = getApp()
Page({
  data:{
   "result": [
    {
      "campusList": [
        {
          "campusName": "中南财经政法大学"
        },
        {     
          "campusName": "湖北第二师范大学"
        }	  
	    ],
      "cityname": "济南市"
    },
    {
      "campusList": [
        {
          "campusName": "中南财经政法大学"
        },
        {     
          "campusName": "湖北第二师范大学"
        }
      ],
      "cityname": "武汉市"
    }
  ]

  },
  onReady:function(){
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title: '通讯录',
      
    })
  }
})

