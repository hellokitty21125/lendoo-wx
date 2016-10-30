const AV = require('../../utils/av-weapp.js')

Page({
    onLoad: function(){
        AV.init({ 
        appId: "SgHcsYqoLaFTG0XDMD3Gtm0I-gzGzoHsz", 
        appKey: "xdv2nwjUK5waNglFoFXkQcxP",
        });
        var query = new AV.Query('Category');
        // 查询父级分类下的所有子类
        var parent = AV.Object.createWithoutData('Category', '581415bf2e958a005492150b');
        query.equalTo('parent',parent);
        
        // 查询顶级分类，设定查询条件parent为null
        // query.equalTo('parent',null);
        query.find().then(function (categories) {
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                console.log(category.attributes.title);
            }
        }).catch(function(error) {
            alert(JSON.stringify(error));
        });
    }
})