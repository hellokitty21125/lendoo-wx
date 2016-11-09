var cb = function(v){console.log(++v)}
Page({
    data:{
        value: '',
        cb: function(e){}
    },
    bindchange: function(e){
        // this.setData({
        //     value: e.detail.value
        // });
        var value = e.detail.value;
        cb(value);
        wx.navigateBack();
        // console.log(e.detail.value);
    },
    onLoad: function(options) {
        // var callback = options.cb;
        // console.log(callback);
        // callback(23);
        console.log(options.that);
        var that = options.that;
        that.cb();
        // this.setData({
        //     cb: callback
        // });
        // cb = callback;
    }
})