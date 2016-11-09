// item.js
Page({
  data: {
    title: '',
    cate:'',
    account: '',
    modalHidden: true,
    alertHidden: true,
    alertHidden: '添加成功',
    date: ''
  },
//   标题文本框
  bindTitleInput: function(e) {
      this.setData( {
          title: e.detail.value
      })
    // console.log(e.detail.value)
  },
//   金额radio
  radioChange: function(e) {
      this.setData({
          cate: e.detail.value
      })
    // console.log(e.detail.value)
  },
//   金额文本框  
  bindAccountInput: function(e) {
      this.setData( {
          account: e.detail.value
      })
    // console.log(e.detail.value)
  },
  save: function() {
    var that = this
    if (this.data.title == '') {
        // 提示框
        that.setData({
          alertHidden: false,
          alertTitle: '标题不能为空'
        });
        return
    }

    var re = /^[0-9]+.?[0-9]*$/;         
    if (!re.test(this.data.account))  
    {  
         // 提示框
        that.setData({
          alertHidden: false,
          alertTitle: '金额只能是数字'
        });
        return
     }  

    // 本条数据打包成json
    var record = {
      title: this.data.title,
      cate: this.data.cate,
      account: this.data.account,
      date: this.data.date
    }
    var data = []

    wx.getStorage({
      key: 'db',
      success: function(res) {
        console.log('db:' + res.data)
        data = res.data
        // 取出本地数据
        data.push(record)
        // 存回本地
        wx.setStorage({
          key: 'db',
          data: data
        })
        
        // 提示框
        that.setData({
          modalHidden: false
        });
      }
    })
  },

  onLoad: function() {
    wx.getStorage({
      key: 'db',
      // 初始加载无数据，故插入一条空数组的新key
      fail: function() {
                // 存回本地
        wx.setStorage({
          key: 'db',
          data: []
        })
      }
    })
//    获取当前日期
    var date = new Date();
//    格式化日期为"YYYY-mm-dd"
    var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    console.log(dateStr);
//    存回data，以渲染到页面
    this.setData({
    	date: dateStr
    })
  },

  // 关闭添加成功对话框
  hideModal: function() {
    this.setData({
      'modalHidden': true
    })
    // 返回上一页
    wx.navigateBack()
  },
  // 关闭表单验证对话框
  hideAlertView: function() {
    this.setData({
      'alertHidden': true
    })
  },
//  点击日期组件确定事件
  bindDateChange: function(e) {
    this.setData({
        date: e.detail.value
    })
  }
})