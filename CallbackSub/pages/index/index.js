Page({
    bindtap: function() {
        wx.navigateTo({
            url: '../detail/detail?cb='+this.cb+'&that='+this
        })
        console.log(this.cb);
    },
    cb: function(value){
        value ++;
        console.log('new result is :' + value);
    },
    onShow: function(){
        // var app = getApp();
        // app.callback(value);
    }
})