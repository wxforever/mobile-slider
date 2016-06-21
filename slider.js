;(function(){
	function Slider(selector,css){
		var _this=this;
		css=css;//全局
		this.indexArr=[];//存储要隐藏页面的index，下一页显示完成后，数组pop弹出来要隐藏页面的index
	    this.currentIndex=0;//存储当前页面index 初始为0
	    this.nodelist=document.querySelectorAll(selector);//获取所有对象
	    this.getnextindex=function(direction){//1为向上，0为向下  返回下个页面的index
	    	
	    	return direction?(this.currentIndex>0?this.currentIndex-1:this.nodelist.length-1):(this.currentIndex==this.nodelist.length-1?0:this.currentIndex+1)

	    };
	  
	    (new Array).forEach.call(this.nodelist,function(obj,index){//对nodelist这个类数组对象初始化，只显示第一页，其他隐藏
	    
	
		obj.style.position='absolute';
		obj.style.width='100%';
		obj.style.height='100%';
		obj.index=index;
		if(_this.currentIndex!=index){
			obj.style.display="none";
		}
	});

	   this.obody=document.querySelector('body');
	   this.obody.slider=this;//把slider添加到body对象上，让body监听到事件的时候可以调用slider
	   this.startX=null;
	    this.startY=null;
	     this.endX=null;
	     this.endY=null;
	 
	  this.obody.addEventListener('touchstart',function(e){
		
		this.slider.startX=e.touches[0].pageX;
		this.slider.startY=e.touches[0].pageY;
		e.preventDefault();//解决游览器不触发touchend的bug
	});
	this.obody.addEventListener('touchend',function(e){
        // alert('touchomove');
	  var _this=this;
		this.slider.endX=e.changedTouches[0].pageX;
		this.slider.endY=e.changedTouches[0].pageY;
	//	console.log('endY'+endY);

	   this.slider.offsetX=this.slider.endX-this.slider.startX;
	   this.slider.offsetY=this.slider.endY-this.slider.startY;
	  if(this.slider.offsetY>20){
	  	
	  	 //up(ck);
	  	
	  	 this.slider.indexArr.push(this.slider.currentIndex);
	  	// this.slider.nodelist[this.slider.currentIndex].addClass('anim fadeOut');
	  //	this.slider.nodelist[this.slider.currentIndex].className+=' '+'anim fadeOut';
	
      //对当前页的处理
	  	 setTimeout(function(){//匿名函数是事件处理函数中的闭包,可以访问事件处理函数中的参数_this(body)，上下文是window

	  	 	var index=_this.slider.indexArr.pop();
	  	 	//_this.slider.nodelist[index].style.display='none';
	  	    _this.slider.nodelist[index].style.zIndex="-1";
	  	 	_this.slider.nodelist[_this.slider.currentIndex].style.display='block';
             setTimeout(function(){//通过setTimeout的嵌套实现在两个时间点对同样参数的访问，这里的function都是闭包
                _this.slider.nodelist[index].style.display='none';
                _this.slider.nodelist[index].style.zIndex='';
             },500)
	  	 	//  _this.slider.nodelist[index].removeClass('anim fadeOut');
            //  _this.slider.nodelist[index].className = _this.slider.nodelist[index].className.replace(new RegExp('(^|\\b)' + 'anim fadeOut'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

	  	 },10);//这里改为10ms，为0的话会影响顺序
	  	   //对下一页的处理
	  	 var index=this.slider.getnextindex(1);
	  	// this.slider.nodelist[index].addClass('anim fadein');
	  	this.slider.nodelist[index].className+=' '+css;
	  	  this.slider.nodelist[index].style.display='block';
	  	  /*
	  	   var repeate=this.slider.indexArr.indexOf(this.slider.currentIndex);
	  	 if(repeate>-1){
	  	 	this.slider.indexArr.splice(repeate,1);

	  	 }
	  	 */
	  	   this.slider.currentIndex=index;
          //移除动画类
	  	 setTimeout(function(){
	  	 	     console.log(this);
                 _this.slider.nodelist[index].className = _this.slider.nodelist[index].className.replace(new RegExp('(^|\\b)' + css.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	  	 },500);
	  	

	  }else if(this.slider.offsetY<-20){
	  	//down(ck);
	  		// this.slider.indexArr.push(this.slider.currentIndex);
	      var repeate=this.slider.indexArr.indexOf(this.slider.currentIndex);
	  	 if(repeate>-1){
	  	 	this.slider.indexArr.splice(repeate,1);

	  	 }
	  		this.slider.indexArr.push(this.slider.currentIndex);
	  	 //this.slider.nodelist[this.slider.currentIndex].className+=' '+'anim fadeOut';
	  	 var _this=this;
	  	 //对当前页的处理
	  	 setTimeout(function(){
	  	 	var index=_this.slider.indexArr.pop();
	  	 	 _this.slider.nodelist[index].style.display='none';

	  	 	 _this.slider.nodelist[_this.slider.currentIndex].style.display='block';
	  	 	
	  	 //	  _this.slider.nodelist[index].removeClass('anim fadeOut');
	  	 	// _this.slider.nodelist[index].className = _this.slider.nodelist[index].className.replace(new RegExp('(^|\\b)' + 'anim fadeOut'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

	  	 },500);
	  	 //对下一页的处理
	  	 var index=this.slider.getnextindex(0);
	  	 //this.slider.nodelist[index].addClass('anim fadein');
	  	 	this.slider.nodelist[index].className+=' '+css;
	  	  this.slider.nodelist[index].style.display='block';
	/* 	  	   var repeate=this.slider.indexArr.indexOf(this.slider.currentIndex);
	  	 if(repeate>-1){
	  	 	this.slider.indexArr.splice(repeate,1);

	  	 }  */ 
	  	   this.slider.currentIndex=index;
	  	  var _this=this;
	  	 setTimeout(function(){
                 _this.slider.nodelist[index].className = _this.slider.nodelist[index].className.replace(new RegExp('(^|\\b)' +css.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	  	 },500);
	  }

	});
   
	}  
	//把slider对象添加到全局
	window.Slider=Slider;
	})()

