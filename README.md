## 就业管理系统进度条js组件
这是针对于就业管理系统的一个js组件，根据后台所传的值可以实现进度条效果

### 依赖 dependence
- jquery
> 请务必先引入https://t1.chei.com.cn/common/jquery/1.8.3/jquery.min.js

### 特性 feature
- 实现进度条效果（依赖后台返回的数据结构）
- 根据后台的返回值，判断后台返回的不同的数据类型，进行不同的操作
- 发生错误继续重新请求
- ajax进行扩展，利用extend方法，修改默认的error函数，若用户没有定义，则使用默认的报错函数
- 利用try catch 来判断后台是否传了所需的值，并抛出错误


### 数据结构
接口返回是json对象，结构如下：


```
{
    status:"success", // 必选类型，字符串，共三种："success","update"和"error"
    precent:"100", // 可选类型，若没有precent则显示loading效果，否则显示进度条
    message:"请求失败" // 展示后台返回的错误原因，默认为""
}
```
### 实例方法methods

> onError : function(xhr,retryCount){} 出现错误时的回调函数（xhr为ajax的对象，retryCount为当前请求重试的次数）

> onProcessComplete : function (data) {}进度完成后的回调函数

> onProgressUpdate : function (data) {}进度进行中的回调函数

> onProgressError : function (data) {}进度出现错误的回调函数(展示错误原因)

### 用法

- 简单用法
```
var progressBarAss = new progressBarGenerary($('.progressBar'),$('.loadingImg'), '/employer/export/progress.ation');
progressBarAss.start();//请求开始
```
- 高级用法

```
var progressBarAss = new progressBarGenerary($('.progressBox'),$('.loadingImg'), '/employer/export/progress.ation',{"useProgressBar":true,'color':'#428bca'});
progressBarAss.start();//请求开始
    
//完成后的回调函数
progressBarAss.onProcessComplete = function (data) {
	//跳转到完成页面
	$(window).attr('location','/complete.html');
	
};

//进行中的回调函数
progressBarAss.onProgressUpdate = function (data) {
	//在页面中展示进度
	if(data.precent){
	    document.append('<p>'+data.precent+'</p>')
	}
	
};

//出现错误的回调函数
progressBarAss.onProgressError = function (data) {
	//显示出现错误
	alert(data.message)
};
```




#### options配置项

- useProgressBar:false，// 是否使用进度条，默认：false
- delayGaps : 500， // 请求间隔递增毫秒数，默认：500毫秒（建议不要超过1000，否则进度条反应慢，影响用户体验，）
- timeout : 5000， // 一次请求超时的时间限制
- retryCount :0,  //发生错误时重试的次数
- retryLimit :10; // 当发生错误时请求的最大次数，默认：10次
- retryGaps :1000, // 发生错误时，重新发送请求的时间间隔，默认：1000毫秒
- color:'#0000ff'//默认进度条颜色（蓝色）














