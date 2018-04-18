/*
	就业管理系统进度条js组件
*/
function jobBackstagePro(objId,url,options){
	this.objId=objId;
	this.url=urltwo;
	this.defaults={
		useProgressBar:false，// 是否使用进度条，默认：false
	    delayGaps : 500， // 进程请求间隔毫秒数
		timeout : 5000， // 一次请求超时的时间限制
		retryCount :0,  //发生错误时重试的次数
		retryLimit :10; // 当发生错误时请求的最大次数，默认：10次
		retryGaps :1000, // 发生错误时，重新发送请求的时间间隔，默认：1000毫秒
		color:'#0000ff'//默认进度条颜色（蓝色）
	}
	this.options = $.extend(this.defaults,options);//合并参数
	this.onError = function (xhr,retryCount) {};//失败后的回调函数
    this.onProgressOne = function (data) {};//成功后返回值为100的回调函数
    this.onProgressTwo = function (data) {};//成功后返回值小于100的回调函数
    this.onProgressthree = function (data) {};//成功后返回值为-1的回调函数
}
jobBackstagePro.prototype ={
	progressBar:function (){
		var _this=this;
		if (_this.options.useProgressBar) {
			//设置进度条背景色
			objId.find('.progress-bar').css('background-color',_this.options.color)
			//进行进程请求
			$.ajax({
			    url: url,
			    type: "GET",
			    timeout:_this.options.timeout,
			    success: function(data) {
			    	var thisP=this;
			    	var bolOne = true;
			    	//导入进程为100
			    	if(data.progress==100){//后台返回数据形式是json，根据progress来设置进度条样式
			    		bolOne = false;
			    		_this.onProgressOne(data)
			    	}
			    	//导入进程小于100
			    	if(data.progress<100){
			    		bolOne = true;

			    		//改变进度条样式
			    		_this.objId.find('.progress-bar').css({'width':data.progress+'%'}).attr('aria-valuenow',data.progress).text(data.progress+'%');

			    		_this.onProgressTwo()//进程小于100%做的操作
			
			    	}
			    	//导入进程为-1,onProgressthree展示后台的错误原因
			    	
			    	if(data,progress==-1){
			    		bolOne = false;
			    		_this.onProgressthree(data)//进程为-1，onProgressthree（展示后台报错data.message）
			    	}
			    	if (bolOne) {
			    		_this.setTimeout=window.setTimeout(function(){$.ajax(thisP)}, _this.options.delayGaps);
			    	}
				},
				//错误的时候进行
				error:function(xhr,textstatus,errothown){
					if(parseInt(xhr.status,10)>=500){
						_this.options.retryCount++;
						_this.onError(xhr, _this.options.retryCount);
						if (_this.options.retryCount <= _this.options.retryLimit) {
                           var thisP = this; // this 指ajax
                           _this.setTimeout = window.setTimeout(function(){$.ajax(thisP);},_this.options.retryGaps);
                            return;
                        } 
					}
				},
				complete: function (XMLHttpRequest,status) {
	                if(status == _this.options.timeout) {
	                    xhr.abort();    // 超时后中断请求
	                    $.alert("网络超时，请刷新", function () {
	                        location.reload();
	                    })
	                }
	            }
			})
			
			
		}else{
			return false;
		}
	},
	start:funtion(){
		this.progressBar()
	}

}