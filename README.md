#lendoo-wx

LXStepper组件，用于购物车商品数量的加减。

总体思路：

最左边框，最右边框由最后外层的容器的border-left与border-right设定；中间2段由input来设定；左右按钮不设边框，圆角效果由最外面容器来设定，这样刚好实现了一个耳熟能详的stepper样式。

1. 布局：

1.1 准备一个容器view，设置它的宽为width: 70px;height: 21px;边框颜色为#ccc灰色；圆角3px;

1.2 内置3个组件，分别是左text，中input，右text，之所以不用button是因为系统自带的button带了样式，为了遵守设计规范，不去重写button的样式。其中input的默认高度是21px。宽度分别为19px，30px，19px，之所以是19px，是因为容器带了左右边距，共占据了2px。

1.3 3个组件都是文字居中，text-align: center实现；垂直居中使用line-height: 21px来实现

1.4 3个组件都是向左浮动，由于我们计算好3个组件的宽度绝对值，于是不必设定加号按钮的浮动float: right

如图：

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
	color: gray;
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

2.2.1 绑定text事件bindtap，在取出data中的num值后作自增与自减，对于自减操作要先判断是否大于1才做自减操作，也就是说已经是1的时候，就不要自减了

2.2.2 当num已经为1的时候，我们将减号按钮设置为disabled样式



源码下载：关注下方的公众号->回复数字1007

对小程序开发有趣的朋友关注公众号: huangxiujie85，QQ群: 575136499，微信: small_application，陆续还将推出更多作品。

![公众号](https://static.oschina.net/uploads/img/201610/07111145_qD6d.jpg "二维码")