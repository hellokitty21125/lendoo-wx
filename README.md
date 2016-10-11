##LXStepper组件，用于购物车商品数量的加减。

>翻看了个文档，微信没有提供现成的组件，于是写了这个小widget。

![图0](https://static.oschina.net/uploads/img/201610/10213214_MTmK.gif "效果图")

总体思路：

最左边框，最右边框由最后外层的容器的border-left与border-right设定；中间2段由input来设定；左右按钮不设边框，圆角效果由最外面容器来设定，这样刚好实现了一个耳熟能详的stepper样式。

1. 布局：

1.1 准备一个容器view，设置它的宽为width: 70px;height: 21px;边框颜色为#ccc灰色；圆角3px;

1.2 内置3个组件，分别是左text，中input，右text，之所以不用button是因为系统自带的button带了样式，为了遵守设计规范，不去重写button的样式。其中input的默认高度是21px。宽度分别为19px，30px，19px，之所以是19px，是因为容器带了左右边距，共占据了2px。

1.3 3个组件都是文字居中，text-align: center实现；垂直居中使用line-height: 21px来实现

1.4 3个组件都是向左浮动，由于我们计算好3个组件的宽度绝对值，于是不必设定加号按钮的浮动float: right

![图1](https://static.oschina.net/uploads/img/201610/10213317_FAph.png "初始")

布局文件代码

```
<!-- Stepper容器 -->
<view class="stepper">
	<!-- 减号 -->
	<text>-</text>
	<!-- 数值 -->
	<input type="number" value="{{num}}" />
	<!-- 加号 -->
	<text>+</text>
</view>
```

样式表代码

```
/*stepper容器*/
.stepper {
	border: 1px solid #ccc;
	border-radius: 3px;
	width: 70px;
	height: 21px;
	margin:0 auto;
}


/*加号与减号*/
.stepper text {
	width: 19px;
	height: 28px;
	line-height: 21px;
	text-align: center;
	float: left;
}


/*数值*/
.stepper input {
	float: left;
	margin: 0 auto;
	width: 30px;
	text-align: center;
	font-size: 12px;
	border-left: 1px solid #ccc;
	border-right: 1px solid #ccc;
}
```

2. 绑定事件

2.1 准备两个按钮样式分别对应普通与禁用状态

```
/*普通样式*/
.stepper .normal{
	color: black;
}

/*禁用样式*/
.stepper .disabled{
	color: #ccc;
}
```

还要准备一个data的值对象，用于监测数值与状态的改变：

```
data: {
	num: 1,
	minusStatus: 'disabled'
}
```

2.2 加号与减号事件

2.2.1 绑定text事件bindtap，分别是bindMinus，bindPlus。按如下处理：取出data中的num值后作自增与自减，对于自减操作要先判断是否大于1才做自减操作，也就是说已经是1的时候，就不要自减了

2.2.2 当num已经为1的时候，我们将减号按钮设置为disabled样式，一旦大于1，又变回normal状态，加减事件均要如此处理，不然到了临界值1的时候，回不到normal状态

js代码：

```
bindMinus: function() {
	var num = this.data.num;
	// 如果只有1件了，就不允许再减了
	if (num > 1) {
		num --;
	}
	// 只有大于一件的时候，才能normal状态，否则disable状态
	var minusStatus = num <= 1 ? 'disabled' : 'normal';
	// 将数值与状态写回
	this.setData({
		num: num,
		minusStatus: minusStatus
	});
},
```

效果如图，注意减号是灰色的#ccc

![图2](https://static.oschina.net/uploads/img/201610/10213354_fdYl.png "加入了禁用状态")

2.3 文本框输入事件

2.3.1 在wxml文件中的input输入框监听值变更事件bindchange="bindManual"。注：bindchange是失去焦点才会调用一次的，而bininput是每当有值有改变会有调用一次，敲打123，则会产生值1，12，123三次，比较适合于输入验证。

2.3.2 实现bindManual

```
bindManual: function(e) {
	var num = e.detail.value;
	// 将数值与状态写回
	this.setData({
		num: num
	});
}
```

这个步骤看似多余，实则为了num个数同步，以作为提交到网络数据时是真正的data.num，而不是input手工改写的数值

[2016-10-11]

fix iPhone6 height bug

```.stepper input {height: 26px}```

##LXCheckboxGroup复选框

>微信小程序官方提供的checkbox有那么点原始，就给写个。

思路：

1.checkboxGroup里包着一个checkbox view组件

2.每个checkbox里都包含一个icon与text

3.icon与text点击都会选中，类似于label for的用法，icon样式会切换状态。normal与highlight状态，对应的值赋予icon的type属性。

4.每个checkbox的view都有一个value属性与text属性，分别对应实现值与字面显示，只转递前者作为数据交互。view设定2个属性，data-value与data-text。

5.每次点击都会将checkbox的value值存在到valueArray数组中，存在于checkboxGroup的data-valueArray

步骤：
1. 利用e.currentTarget.dataset.value传checkbox的值

设置布局，使用文字与图标垂直居中，左间距4px，每个独占一行。

布局文件
```
<!-- CheckboxGroup容器 -->
<view class="lxCheckboxGroup">
	<view wx:for="{{items}}">
		<icon type="{{item.type}}" data-value="{{item.value}}" size="20" bindtap="bindCheckbox"/>
		<text>{{item.text}}</text>
	</view>
</view>
```

样式表
```
/*整个复选框组容器*/
.lxCheckboxGroup {
	width: 80px;
	height: 26px;
	margin:20px auto;
}

/*单个复选框容器*/
.lxCheckboxGroup view {
	/*上下间距4px*/
	margin: 4px auto;
}

/*复选框图标*/
.lxCheckboxGroup icon {
	/*text用block描述，所以要左浮动*/
	float: left;
}

/*文字标签样式*/
.lxCheckboxGroup text{
	font-size: 14px;
	/*20px是左按钮的大小，4px是真实的左间距*/
	margin-left: 24px;
	/*高亮与icon相等，实现垂直居中*/
	height: 20px;
	/*文本垂直居中*/
	line-height: 20px;
	/*块布局，否则文本高度无效*/
	display: block;
}
```
js代码

```
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
```

如图

正文完

源码下载：关注下方的公众号->回复数字1007

对小程序开发有趣的朋友关注公众号: huangxiujie85，QQ群: 575136499，微信: small_application，陆续还将推出更多作品。

![公众号](https://static.oschina.net/uploads/img/201610/07111145_qD6d.jpg "二维码")