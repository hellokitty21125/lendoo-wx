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

>微信小程序官方提供的checkbox有点丑，于是就写了这个。

![图2-0](https://static.oschina.net/uploads/img/201610/11160900_Cd0j.gif "复选框效果图")

思路：

1.checkboxGroup里包着一个checkbox view组件

2.每个checkbox里都包含一个icon与text

3.icon与text点击都会选中，类似于label for的用法，icon样式会切换状态。normal与highlight状态，对应的值赋予icon的type属性。

4.每个checkbox的view都有一个value属性与text属性，分别对应实现值与字面显示，只转递前者作为数据交互。view设定2个属性，data-value与data-text。

5.每次点击都会将checkbox的value值存在到checkedValues数组中

步骤：

1. 设置布局，使用文字与图标垂直居中，左间距4px，每个独占一行。

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

![图2-1](https://static.oschina.net/uploads/img/201610/11160611_0TSe.png "布局图")

2. 响应点击事件

2.1 利用e.currentTarget.dataset.index传checkbox的index值，作点选与非点选操作，并将已选的values值单独存到数组checkedValues中，供返回提交等操作。

```
	bindCheckbox: function(e) {
		/*绑定点击事件，将checkbox样式改变为选中与非选中*/

		//拿到下标值，以在items作遍历指示用
		var index = parseInt(e.currentTarget.dataset.index);
		//原始的icon状态
		var type = this.data.items[index].type;
		var items = this.data.items;
		if (type == 'circle') {
			//未选中时
			items[index].type = 'success_circle';
		} else {
			items[index].type = 'circle';
		}

		// 写回经点击修改后的数组
		this.setData({
			items: items
		});
		// 遍历拿到已经勾选的值
		var checkedValues = [];
		for (var i = 0; i < items.length; i++) {
			if (items[i].type == 'success_circle') {
				checkedValues.push(items[i].value);
			}
		}
		// 写回data，供提交到网络
		this.setData({
			checkedValues: checkedValues
		});
	}
``` 
3. text也需要绑定bindCheckBox事件，产生label for的效果，但还可以更简单的处理，就是把事件绑在容器view上，这样点击更直观。

如下面代码：
```
<!-- CheckboxGroup容器 -->
<view class="lxCheckboxGroup">
	<view wx:for="{{items}}" data-index="{{index}}" size="20" bindtap="bindCheckbox">
		<icon type="{{item.type}}" size="20"/>
		<text>{{item.text}}</text>
	</view>
</view>
```

##购物车

[2016-10-14]

设计思路：

一、从网络上传入以下Json数据格式的数组
1.购物车id：cid
2.标题title
3.数量num
4.图片地址
5.价格price
6.小计
7.是否选中selected

二、点击复选框toggle操作
如已经选中的，经点击变成未选中，反之而反之
点击依据index作为标识，而不用cid，方便遍历

三、全选操作
首次点击即为全部选中，再次点击为全不选，全选按钮本身也跟随toggle变换

四、点击结算按钮，将已选中的cid数组取出，以供通过网络提交到服务端，这里给个toast作为结果演示。

五、利用stepper作加减运算，同样依据index作为标识，点完写回num值。

六、布局，全选与结算按钮底部对齐，购物车商城自适应高度，类似于Android的weight。

步骤：

1. 初始数据渲染

1.1 布局与样式表

上方是一个商品列表，下方是一个全选按钮与立即结算按钮

商品列表左部为商品缩略图，右上为商品标题，右下为商品价格与数量，其中商品数量使用WXStepper来实现加减操作

js：初始化一个数据源，这往往是从网络获取的，相关接口可参见：https://mp.weixin.qq.com/debug/wxadoc/dev/api/network-request.html

```
Page({
	data:{
		carts: [
			{cid:1008,title:'Zippo打火机',image:'https://img12.360buyimg.com/n7/jfs/t2584/348/1423193442/572601/ae464607/573d5eb3N45589898.jpg',num:'1',price:'198.0',sum:'198.0',selected:true},
			{cid:1012,title:'iPhone7 Plus',image:'https://img13.360buyimg.com/n7/jfs/t3235/100/1618018440/139400/44fd706e/57d11c33N5cd57490.jpg',num:'1',price:'7188.0',sum:'7188.0',selected:true},
			{cid:1031,title:'得力订书机',image:'https://img10.360buyimg.com/n7/jfs/t2005/172/380624319/93846/b51b5345/5604bc5eN956aa615.jpg',num:'3',price:'15.0',sum:'45.0',selected:false},
			{cid:1054,title:'康师傅妙芙蛋糕',image:'https://img14.360buyimg.com/n7/jfs/t2614/323/914471624/300618/d60b89b6/572af106Nea021684.jpg',num:'2',price:'15.2',sum:'30.4',selected:false},
			{cid:1063,title:'英雄钢笔',image:'https://img10.360buyimg.com/n7/jfs/t1636/60/1264801432/53355/bb6a3fd1/55c180ddNbe50ad4a.jpg',num:'1',price:'122.0',sum:'122.0',selected:true},
		]
	}
})
```

布局文件

```
<view class="container carts-list">
    <view wx:for="{{carts}}" class="carts-item" data-title="{{item.title}}" data-url="{{item.url}}" bindtap="bindViewTap">
		<view>
		  <image class="carts-image" src="{{item.image}}" mode="aspectFill"/>
		</view>
      <view class="carts-text">
        <text class="carts-title">{{item.title}}</text>
        <view class="carts-subtitle">
          <text class="carts-price">{{item.sum}}</text>
          <text>WXStepper</text>
        </view>
      </view>
    </view>
</view>
```

样式表

```
/*外部容器*/
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
} 

/*整体列表*/
.carts-list {
	display: flex;
	flex-direction: column;
	padding: 20rpx 40rpx;
}

/*每行单元格*/
.carts-item {
	display: flex;
	flex-direction: row;
	height:150rpx;
	/*width属性解决标题文字太短而缩略图偏移*/
	width:100%;
	border-bottom: 1px solid #eee;
	padding: 30rpx 0;
}

/*左部图片*/
.carts-image {
	width:150rpx;
	height:150rpx;
}


/*右部描述*/
.carts-text {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

/*右上部分标题*/
.carts-title {
	margin: 10rpx;
	font-size: 30rpx;
}

/*右下部分价格与数量*/
.carts-subtitle {
	font-size: 25rpx;
	color:darkgray;
	padding: 0 20rpx;
	display: flex;
	flex-direction: row;
	justify-content:space-between;
}

/*价格*/
.carts-price {
	color: #f60;
}
```

![图3-1](https://static.oschina.net/uploads/img/201610/14153754_gc9Z.png "基本布局")

1.2 集成WXStepper

1.2.1 复制组件内容

[2016-10-16]

将stepper.wxss的内容复制到cart.wxss中

将stepper.wxml的内容复制到cart.wxml中

与之前的单一组件不同的是：这里要定义数组minusStatuses来与每一个加减按钮相应。当然，合并入carts也是没问题的。

```
		minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled']
```
原来的静态字符WXStepper换成以下的代码
```
	          <view class="stepper">
				<!-- 减号 -->
				<text class="{{minusStatuses[index]}}" data-index="{{index}}" bindtap="bindMinus">-</text>
				<!-- 数值 -->
				<input type="number" bindchange="bindManual" value="{{item.num}}" />
				<!-- 加号 -->
				<text class="normal" data-index="{{index}}" bindtap="bindPlus">+</text>
			  </view>
```

js代码bindMinus、bindPlus分别改造为如下：

```
bindMinus: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].num;
		// 如果只有1件了，就不允许再减了
		if (num > 1) {
			num --;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = this.data.carts;
		carts[index].num = num;
		// 按钮可用状态
		var minusStatuses = this.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
	},
	bindPlus: function(e) {
		var index = parseInt(e.currentTarget.dataset.index);
		var num = this.data.carts[index].num;
		// 自增
		num ++;
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 购物车数据
		var carts = this.data.carts;
		carts[index].num = num;
		// 按钮可用状态
		var minusStatuses = this.data.minusStatuses;
		minusStatuses[index] = minusStatus;
		// 将数值与状态写回
		this.setData({
			carts: carts,
			minusStatuses: minusStatuses
		});
	},
```

效果如图：

![图4-1](https://static.oschina.net/uploads/img/201610/16214421_U41q.png "带加减按钮的购物车")

[2016-10-17]

修正手工改动数量保存到数组

1.3 集成LXCheckboxGroup

复制布局文件代码到wxml，这里需要判断一下已选状态，一般购物车勾选状态是记录在网络的。

index值用于传值js，遍历之用。

```
		<!-- 复选框图标 -->
		<icon wx:if="{{item.selected}}" type="success_circle" size="20" bindtap="bindCheckbox" data-index="{{index}}"/>
		<icon wx:else type="circle" size="20" bindtap="bindCheckbox" data-index="{{index}}"/>
		<view>
```

复选框居中

```
/*复选框样式*/
.carts-list icon {
	margin-top: 60rpx;
	margin-right: 20rpx;
}
```

绑定点击复选框事件，对选择状态做反选操作。

```
	bindCheckbox: function(e) {
		/*绑定点击事件，将checkbox样式改变为选中与非选中*/
		//拿到下标值，以在carts作遍历指示用
		var index = parseInt(e.currentTarget.dataset.index);
		//原始的icon状态
		var selected = this.data.carts[index].selected;
		var carts = this.data.carts;
		// 对勾选状态取反
		carts[index].selected = !selected;
		// 写回经点击修改后的数组
		this.setData({
			carts: carts
		});
	}
```

效果图：

![图5-1](https://static.oschina.net/uploads/img/201610/17102724_I5vQ.png "复选框")

1.4 加入全选与立即结算按钮

1.4.1 修改布局文件，实现上述按钮底部对齐，使用flex与固定高度来完成。

减少为3行，看是否还在最底；此外，还要保证悬浮在底部，不被列表项的滚动而滚动。


```
	<view class="carts-footer">
		<view bindtap="bindSelectAll">
			<icon wx:if="{{selectedAllStatus}}" type="success_circle" size="20"/>
			<icon wx:else type="circle" size="20" />
			<text>全选</text>
		</view>
		<view class="button">立即结算</view>
	</view>
```

之前用<button>立即结算</button>来实现，发现无论如何都不能实现全选部件与结算按钮分散对齐，不响应如下样式

```
	display: flex;
	flex-direction: row;
	justify-content: space-between;
```

样式表

```

/*底部按钮*/
.carts-footer {
	width: 100%;
	height: 80rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

/*复选框*/
.carts-footer icon {
	margin-left: 20rpx;
}

/*全选字样*/
.carts-footer text {
	font-size: 30rpx;
	margin-left: 8rpx;
	line-height: 10rpx;
}

/*立即结算按钮*/
.carts-footer .button {
	line-height: 80rpx;
	text-align: center;
	width:220rpx;
	height: 80rpx;
	background-color: #f60;
	color: white;
	font-size: 36rpx;
	border-radius: 0;
	border: 0;
}
```

1.4.2 全选与全不选事件

实现bindSelectAll事件，改变全选状态

首先定义一个data值，以记录全选状态

```
selectedAllStatus: false

```

事件实现：

```
	bindSelectAll: function() {
		// 环境中目前已选状态
		var selectedAllStatus = this.data.selectedAllStatus;
		// 取反操作
		selectedAllStatus = !selectedAllStatus;
		// 购物车数据，关键是处理selected值
		var carts = this.data.carts;
		// 遍历
		for (var i = 0; i < carts.length; i++) {
			carts[i].selected = selectedAllStatus;
		}
		this.setData({
			selectedAllStatus: selectedAllStatus,
			carts: carts
		});
	}

```

![图6-1](https://static.oschina.net/uploads/img/201610/17154657_V1CQ.png "结算按钮")

1.4.3 立即结算显示目前所选的cid，以供提交到网络，商品数量应该是包括在cid中的，后端设计应该只关注cid与uid

布局文件也埋一下toast，js只要改变toast的显示与否即可。

```
<toast hidden="{{toastHidden}}" bindchange="bindToastChange">
	{{toastStr}}
</toast>
```

为立即结算绑定事件bindCheckout，弹出cid弹窗

```
	bindCheckout: function() {
		// 初始化toastStr字符串
		var toastStr = 'cid:';
		// 遍历取出已勾选的cid
		for (var i = 0; i < this.data.carts.length; i++) {
			if (this.data.carts[i].selected) {
				toastStr += this.data.carts[i].cid;
				toastStr += ' ';
			}
		}
		//存回data
		this.setData({
			toastHidden: false,
			toastStr: toastStr
		});
	},
	bindToastChange: function() {
		this.setData({
			toastHidden: true
		});
	}
```

源码下载：关注下方的公众号->回复数字1007

正文完

对小程序开发有趣的朋友关注公众号: huangxiujie85，QQ群: 575136499，微信: small_application，陆续还将推出更多作品。

![公众号](https://static.oschina.net/uploads/img/201610/07111145_qD6d.jpg "二维码")