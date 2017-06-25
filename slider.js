window.Slider=(function(){
	var Slider={};

	function TimerManager(){
		this.timers=[];
		this.isFiring=false;
		this.args=[];
	}

	TimerManager.makeInstance=function(element){
		if(!element.__TimerManager__ || element.__TimerManager__.constructor!=TimerManager){
			element.__TimerManager__=new TimerManager();
		}
	}

	TimerManager.prototype.add=function(timer){
		this.timers.push(timer);
	}

	TimerManager.prototype.fire=function(){
		if(!this.isFiring){
			var firsttimer=this.timers.shift();
			if(firsttimer){
				firsttimer();
				this.isFiring=false;
			}
		}
	}

	function fnSlideUp(element,time){
		if(element.offsetHeight>0){
			var elementHeight=element.offsetHeight;
			var currentHeight=elementHeight;

			var timer=setInterval(function(){
				currentHeight-=elementHeight/time;
				element.style.height=currentHeight+"px";

				if(currentHeight<=0){
					clearInterval(timer);
					element.style.display="none";
					element.style.height=elementHeight+"px";

					if(element.__TimerManager__ && element.__TimerManager__.constructor==TimerManager){
						element.__TimerManager__.fire();
					}
				}
			},10)

		}else{
			if(element.__TimerManager__ && element.__TimerManager__.constructor==TimerManager){
						element.__TimerManager__.fire();
					}
		}

	}

	function fnSlideDown(element,time){
		if(element.offsetHeight==0){
			element.style.display="block";
			var elementHeight=element.offsetHeight;
			element.style.height="0px";
			var currentHeight=0;
			var timer=setInterval(function(){
				currentHeight+=elementHeight/time;
				element.style.height=currentHeight+"px";
				if(currentHeight>=elementHeight){
					clearInterval(timer);
					if(element.__TimerManager__ && element.__TimerManager__.constructor==TimerManager){
						element.__TimerManager__.fire();
					}
				}
			},10)
		}else{
			if(element.__TimerManager__ && element.__TimerManager__.constructor==TimerManager){
						element.__TimerManager__.fire();
					}
		}
	}


	Slider.slideDown=function(element,time){
		TimerManager.makeInstance(element);
		element.__TimerManager__.add(fnSlideDown(element,time));
		element.__TimerManager__.fire();
		//return this;
	}

	Slider.slideUp=function(element,time){
		TimerManager.makeInstance(element);
		element.__TimerManager__.add(fnSlideUp(element,time));
		element.__TimerManager__.fire();
		//return this;
	}

	return Slider;

})()
