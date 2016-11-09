![image](https://static.oschina.net/uploads/img/201609/29105311_kzIA.png)

![image](https://static.oschina.net/uploads/img/201609/29105327_HaHf.png)

[2016-10-12] 更新

缘起：昨天官方开发有了更新v0.10.101100，Picker的mode属性已经支持date以及time（background-image的bug也修复），于是来更新此实例。

##目标：实现集成日期组件

如图

![效果图](http://p3.pstatp.com/large/e9400072ca431532e71 "目标效果")

官方文档出处：https://mp.weixin.qq.com/debug/wxadoc/dev/component/picker.html

步骤，在item.wxml文件中增加一个picker组件，如下：

```
    <view class="section">
        <picker mode="date" value="{{date}}" start="2015-09-01" end="2017-09-01" bindchange="bindDateChange">
		    <view class="section__title">
		      日期: {{date}}
		    </view>
		</picker>
    </view>
```

如图

![图1](http://p1.pstatp.com/large/f01000261d5adfc4dff "静态页面")

从图中可以看出：

>1.日期后面是空白的，应该默认显示今天日期；
2.点击确定也没有显示到组件上，需要实现bindDateChange方法。

于是我们需要在item.js文件中，声明一个data值date与wxml中的{{date}}绑定关联

然后在onLoad中初始化字符串格式的日期值，详细说明见注释：

```
//    获取当前日期
    var date = new Date();
//    格式化日期为"YYYY-mm-dd"
    var dateStr = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
//    存回data，以渲染到页面
    this.setData({
    	date: dateStr
    })
```

经过如上处理，日期组件已经显示为当前日期

如图

![图2](http://p3.pstatp.com/large/f01000261d6fed4fb25 "静态页面")

处理到此，我们还需要修复一个逻辑错误，即组件的结束日期应该不超过当日，做法也很简单，只需要在wxml文件中对picker的日期属性end由2017-09-01改为{{date}}即可

```
<picker mode="date" value="{{date}}" start="{{date}}" end="2017-09-01" bindchange="bindDateChange">
```

吐槽一下，官方的picker的还是有bug的，完全不听start与end使唤，仍可以选任意日期，暂时不去理会，代码就这么写着，什么时候开发工具修复了自然可以了，毕竟是现在还只是内测，就将就用着。

接下来处理日期组件点击确认事件bindDateChange

回到item.js文件

声明一个bindDateChange方法，添加如下代码以写回data中的date值

```
//  点击日期组件确定事件
  bindDateChange: function(e) {
    this.setData({
        date: e.detail.value
    })
  }
```

至此，已经实现集成日期picker组件。剩下的就是将它同之前的标题、类型、金额字段那样存在json再本地setStorage存储即可，这里不作赘述，具体可以参考本人公众号之前发的文章《微信小程序（应用号）实战课程之记账应用开发》。

源码下载：关注下方的公众号->回复数字1002

对小程序开发有趣的朋友关注公众号: huangxiujie85，QQ群: 575136499，微信: small_application，陆续还将推出更多作品。

![公众号](https://static.oschina.net/uploads/img/201610/07111145_qD6d.jpg "二维码")