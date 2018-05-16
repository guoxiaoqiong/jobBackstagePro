## 就业管理系统进度条js组件
这是针对于就业管理系统的一个js组件，根据后台所传的值可以实现进度条效果

### 特性 feature
- 实现进度条效果（依赖后台返回的数据结构）
- 根据后台的返回值，判断后台返回的progress的数据类型，进行不同的操作
- 发生错误继续重新请求
- ajax进行扩展，利用extend方法，修改默认的error函数，若用户没有定义，则使用默认的报错函数
- 利用try catch 来判断后台是否传了所需的值，并抛出错误
### 依赖 dependence
- jquery

### 数据结构
返回的数据是json格式

 - progress

 返回的progress是字符串

> success //进程已完成

> update //进程未完成

> error //进程出现错误

返回的progress是具体的数字

>  100 //进程已完成

> <100 //进程未完成

> -1   //进程出现错误

- message

> 开发返回的错误信息

### 用法
- 依赖于jquery
- objId（上传页面的父级id）
- url（请求进程的路径）
- options（配置的参数）


#### options配置项

- useProgressBar:false，// 是否使用进度条，默认：false
- delayGaps : 500， // 进程请求间隔递增毫秒数，默认：0毫秒（建议不要超过1000，否则进度条反应慢，影响用户体验，）
- timeout : 5000， // 一次请求超时的时间限制
- retryCount :0,  //发生错误时重试的次数
- retryLimit :10; // 当发生错误时请求的最大次数，默认：10次
- retryGaps :1000, // 发生错误时，重新发送请求的时间间隔，默认：1000毫秒
- color:'#0000ff'//默认进度条颜色（蓝色）

### 实例方法methods

> onError : function(xhr,retryCount){} 出现错误时的回调函数（xhr为ajax的对象，retryCount为当前请求重试的次数）

> onProcessComplete : function (data) {}进度完成后的回调函数

> onProgressUpdate : function (data) {}进度进行中的回调函数

> onProgressError : function (data) {}进度出现错误的回调函数(展示错误原因)

### 实例



    var progressBarAss = new progressBarGenerary('progressBox', '/employer/export/progress',{"useProgressBar":true,'color':'#428bca'});
    
    progressBarAss.start();//请求开始
    var progressBox=$('#progressBox');
    var loadingImgBox=$('#loadingImgBox');
    
    //进度完成后的回调函数
    progressBarAss.onProcessComplete = function (data) {
    	//隐藏进度条
    	progressBox.addClass('hide')
    	//隐藏loading
    	loadingImgBox.addClass('hide')
    	alert('进度完成')
    };
    
    //进度进行中的回调函数
    progressBarAss.onProgressUpdate = function (data,objId) {
    	if(typeof data.progress=='string'){
    	    //显示进度条
        	    progressBox.removeClass('hide')
        	    //隐藏loading
        	    loadingImgBox.addClass('hide')
    	}else{
    	    objId.find('.progress-bar').css({'width':data.progress+'%'}).attr('aria-valuenow',data.progress).text(data.progress+'%');
    	    //隐藏进度条
        	    progressBox.addClass('hide')
        	    //显示loading
        	    loadingImgBox.removeClass('hide')
    	}
    };
    
    //进度出现错误的回调函数
    progressBarAss.onProcessComplete = function (data) {
    	//显示出现错误
    	alert(data.message)
    };










