const AV = require('../../utils/av-weapp.js')

Page({
    data: {
        topCategories: [],
        subCategories: [],
        highlight:['highlight','','']
    },
    onLoad: function(){
        this.getCategory(null);
        // hard code to read default category,maybe this is a recommend category later.
        this.getCategory(AV.Object.createWithoutData('Category', '5815b0d5d203090055c24a19'));
    },
    tapTopCategory: function(e){
        // 拿到objectId，作为访问子类的参数
        var objectId = e.currentTarget.dataset.objectId;
        // 查询父级分类下的所有子类
        var parent = AV.Object.createWithoutData('Category', objectId);
        this.getCategory(parent);
        // 设定高亮状态
        var index = parseInt(e.currentTarget.dataset.index);
        this.setHighlight(index);

    },
    getCategory: function(parent){
        var that = this;
        var query = new AV.Query('Category');
        // 查询顶级分类，设定查询条件parent为null
        query.equalTo('parent',parent);
        query.ascending('index');
        query.find().then(function (categories) {
            if (parent){
                that.setData({
                    subCategories: categories
                });
            }else{
                that.setData({
                    topCategories: categories
                });
            }
        }).catch(function(error) {
        });
    },
    setHighlight: function(index){
        var highlight = [];
        for (var i = 0; i < this.data.topCategories; i++) {
            highlight[i] = '';
        }
        highlight[index] = 'highlight';
        this.setData({
            highlight: highlight
        });
    },
    avatarTap: function(e){
        // 拿到objectId，作为访问子类的参数
        var objectId = e.currentTarget.dataset.objectId;
        wx.navigateTo({
            url: "../../../../goods/list/list?categoryId="+objectId
        });
    }
})