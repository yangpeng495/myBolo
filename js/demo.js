window.onload=function ()
{
	var oDiv=document.getElementById('div1');
	var oNavBox=oDiv.children[0];
	var oUl=oDiv.children[1];
	var aLi=oUl.children;
	var oMySelft = document.getElementById('myself');
	var oBtnMy = document.getElementById('myself_btn');
	
	var opened=false;
	
	var ready=true;
	for(var i=0;i<aLi.length;i++)
	{
		if(i%2==1)
		{
			aLi[i].style.left=-aLi[i].offsetWidth+'px';
		}
		else
		{
			aLi[i].style.left=aLi[i].offsetWidth+'px';
		}
		aLi[i].style.display='none';
	}
	
	function showList(){
		oNavBox.className='navBox nav_active';
		var i=0;
		var timer=setInterval(function (){
			aLi[i].style.display='block';
			(function (i){
				startMove(aLi[i], {left: 0, opacity: 100}, function (){
					if(i==aLi.length-1)ready=true;
					
				});
			})(i);
			
			i++;
			if(i==aLi.length)
			{
				clearInterval(timer);
				opened = true;
			}
		}, 77);
	}
	
	oNavBox.onclick=function ()
	{
		startMove(oMySelft, {opacity:0},function (){
			startMove(oMySelft, {bottom:-500});
			
				if(!ready)return;
			
				ready=false;
				if(opened)
				{
					oNavBox.className='navBox';
					var i=aLi.length-1;
					var timer=setInterval(function (){
						var left=i%2?-aLi[i].offsetWidth:aLi[i].offsetWidth;
						
						(function (i){
							startMove(aLi[i], {left: left, opacity: 0}, function (){
								aLi[i].style.display='none';
								
								if(i==0)ready=true;
							});
						})(i);
						
						i--;
						if(i==-1)
						{
							clearInterval(timer);
						}
					}, 77);
				}
				else
				{
					showList();
				}
				opened = !opened;	
			})
	};
	
	for(var i=0;i<aLi.length;i++)
	{
		aLi[i].onclick=function ()
		{
			oNavBox.className='navBox';
			var oSpan=oNavBox.children[0];
			
			opened=false;
			
			oSpan.innerHTML=this.children[0].innerHTML;
			
			var i=aLi.length-1;
			var timer=setInterval(function (){
				var left=i%2?-aLi[i].offsetWidth:aLi[i].offsetWidth;
				
				(function (i){
					startMove(aLi[i], {left: left, opacity: 0}, function (){
						aLi[i].style.display='none';
					});
				})(i);
				
				i--;
				if(i==-1)
				{
					clearInterval(timer);
				}
			}, 77);
		};
		
	}
	aLi[4].onclick=function (){
		
		oNavBox.className='navBox';
		var oSpan=oNavBox.children[0];
		
		opened=false;
		
		oSpan.innerHTML=this.children[0].innerHTML;
		
		var i=aLi.length-1;
		var timer=setInterval(function (){
			var left=i%2?-aLi[i].offsetWidth:aLi[i].offsetWidth;
			
			(function (i){
				startMove(aLi[i], {left: left, opacity: 0}, function (){
					aLi[i].style.display='none';
				});
			})(i);
			
			i--;
			if(i==-1)
			{
				clearInterval(timer);
				startMove(oMySelft, {bottom:100, opacity:100})
			}
		}, 77);	
		
		var oMyClose = document.getElementById('my_close');
		oMyClose.onclick=function (){
			startMove(oMySelft, {opacity:0},function (){
				showList();
				startMove(oMySelft, {bottom:-500});
			})
		};
	}
	
};