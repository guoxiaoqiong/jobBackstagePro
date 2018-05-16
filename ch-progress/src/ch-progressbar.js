/*
	就业管理系统进度条js组件
*/
//ajax扩展组件
(function ($) {
    var _ajax = $.ajax;
    $.ajax = function (opt) {
        //每次调用发送ajax请求的时候定义默认的error处理方法
        var fn = {
            error: function (XMLHttpRequest, textStatus, errorThrown){}
        };
        if (opt.error){
            fn.error = opt.error;
        }
        //扩展原生的$.ajax方法，返回最新的参数
        var _opt = $.extend(opt, {
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            	var r=confirm('请求出错，重新加载页面？')
                if(r){
                	window.location.reload();
                }
                fn.error(XMLHttpRequest, textStatus, errorThrown);
            }
        });
        //将最新的参数传回ajax对象
        _ajax(_opt);
    };
 })(jQuery);

function progressBarGenerary(ele,eleImg,url,options,paradata){
	this.eleImg=eleImg;
	this.ele=ele;
	this.url=url;
	this.paradata=paradata;
	this.defaults={
		useProgressBar:true,// 是否使用进度条，默认：false
	    delayGaps : 500, // 请求间隔毫秒数
		timeout : 5000, // 一次请求超时的时间限制
		retryCount :0,  //发生错误时重试的次数
		retryLimit :10, // 当发生错误时请求的最大次数，默认：10次
		retryGaps :1000, // 发生错误时，重新发送请求的时间间隔，默认：1000毫秒
		color:'#0000ff'//默认进度条颜色（蓝色）
	}
	this.options = $.extend(this.defaults,options);//合并参数
	this.onError = function (xhr,retryCount) {};//失败后的回调函数
    this.onProcessComplete = function (data) {};//进度完成后的回调函数
    this.onProgressUpdate = function (data,ele) {};//进度进行中的回调函数
    this.onProgressError = function (data) {};//进度出现错误的回调函数
}
progressBarGenerary.prototype ={
	progressBar:function (){
		var _this=this;
		if (_this.options.useProgressBar) {
			//设置进度条背景色
			_this.ele.css('background-color',_this.options.color)
			//进行请求
			$.ajax({
			    url: _this.url,
			    type: "GET",
			    timeout:_this.options.timeout,
				data:_this.paradata,
				dataType:'json',
			    success: function(data) {
					console.log(data)
			    	try{
			    		var thisP=this;
				    	
			    		var bolOne = true;
			    		// 判断返回的值优先判断数字
			    		if(data.precent){
			    			if(data.precent>100 || data.precent<-1) throw "导入进度数值precent返回错误";
			    			if(data.precent==100){
			    				bolOne = false;
			    				_this.ele.hide()//隐藏进度条
				    			_this.onProcessComplete(data)
			    			}else if(data.precent<100){
			    				bolOne = true;
			    				_this.ele.show()//显示进度条
			    				_this.ele.css({'width':data.precent+'%'});//根据传的值改变进度条的宽度

			    				_this.onProgressUpdate(data,_this.ele)//未完成时回调函数
			    			}else if(data.precent==-1){
			    				bolOne = false;
			    				_this.ele.hide()//隐藏进度条
			    				_this.onProgressError(data)//错误时的回调函数(可展示失败的原因)

			    			}

			    		}else{
			    			if(data.status=='undefined') throw "导入进度状态status不存在";
			    			if(data.status){
			    				if(data.status=='success'){
			    					bolOne = false;
			    					_this.eleImg.hide()//隐藏loading
				    				_this.onProcessComplete(data)//已完成时的回调函数
			    				}else if(data.status=='update'){
			    					bolOne = true;
			    					_this.eleImg.show()//显示loading
				    				_this.onProgressUpdate(data)//未完成时回调函数
			    				}else if(data.status=='error'){
			    					bolOne = false;
				    				_this.eleImg.hide()//隐藏loading
				    				_this.onProgressError(data)//错误时的回调函数(可展示失败的原因)
			    				}
			    			}
			    		}
			    		
				    	if (bolOne) {
				    		_this.setTimeout=window.setTimeout(function(){$.ajax(thisP)}, _this.options.delayGaps);
				    	}
			    	}catch(err){
			    		console.log("Error: " + err + ".")
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
					var thisP=this;
	                if(status == _this.options.timeout) {
	                    $.ajax(thisP).abort();    // 超时后中断请求
	                    var r=confirm('请求超时，重新加载页面？')
	                    if(r){
	                    	window.location.reload();
	                    }
	                }
	            }
			})
			
			
		}else{
			return false;
		}
	},
	start:function(){
		this.progressBar()
	}

}



