// 初始化AV
const AV = require('./utils/av-weapp.js')
AV.init({ 
    appId: "SgHcsYqoLaFTG0XDMD3Gtm0I-gzGzoHsz", 
    appKey: "xdv2nwjUK5waNglFoFXkQcxP",
});

// 授权登录
App({
    onLaunch: function () {
        // auto login via SDK
        var that = this;
        AV.User.loginWithWeapp();
    }
})
