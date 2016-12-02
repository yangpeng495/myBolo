window.onload=function ()
{
    var oDiv=document.getElementById('div1');
    var oUl=oDiv.children[0].children[1];
    var aLi=oUl.children;
    var oMove=aLi[aLi.length-1];

    //span
    var oCont=document.getElementById('cont');
    var aWork_Wrap=getByClass(oCont, 'work_wrap');
    var aExplain=getByClass(oCont, 'explain');
    var aSearch=getByClass(oCont, 'search');
	var oContUl = document.getElementById('cont_ul');
	var aContLi = oContUl.getElementsByTagName('li');
	var aHeaderActive = getByClass(oUl, 'header_active');
	var iSpeed=0;
	var left=0;
	var zIndex = 1;
	function toMove(obj, iTarget)
	{
		clearInterval(obj.timer)
	
		obj.timer=setInterval(function (){
			iSpeed+=(iTarget-obj.offsetLeft)/5;
			iSpeed*=0.7;
			left+=iSpeed;
	
			if(Math.abs(iSpeed)<1 && Math.abs(iTarget-left)<1)
			{
				clearInterval(obj.timer);
				obj.style.left=iTarget+'px';
			}
			else
			{
				obj.style.left=left+'px';
			}
		}, 30)
	}


    for(var i=0; i<aWork_Wrap.length; i++)
    {
        aWork_Wrap[i].index=i;
        aWork_Wrap[i].onmouseover=function ()
        {
			
            var oSpan=this.getElementsByTagName('span')[0];
            _this=this;
            startMove(oSpan, {top: 120, opacity: 100}, 4);
            startMove(aSearch[this.index], {top: 45, opacity:100}, 4);
            aSearch[this.index].onmouseover=function ()
            {
                if(aSearch[_this.index].offsetTop==45)
                {
                    clearInterval(aSearch[_this.index].timer);
                }
                else
                {
                    startMove(aSearch[_this.index], {top: 45, opacity:100}, 4);
                }

                startMove(oSpan, {top: 120, opacity: 100}, 4);
                _this.style.border='#ccc 9px solid';
                aExplain[_this.index].style.background='#fff';
                aExplain[_this.index].style.border='#ccc 1px solid'
            }

            this.style.border='#ccc 9px solid';
            aExplain[this.index].style.background='#fff';
            aExplain[this.index].style.border='#ccc 1px solid'
        }
        aWork_Wrap[i].onmouseout=function ()
        {
            var oSpan=this.getElementsByTagName('span')[0];
            startMove(oSpan, {top: 144, opacity: 0}, 4);
            startMove(aSearch[this.index], {top: -55, opacity: 0}, 4);
            this.style.border='#ececec 9px solid';
            aExplain[this.index].style.background='#ececec';
            aExplain[this.index].style.border='#ececec 1px solid'
        }
    }

    for(var i=0; i<aLi.length-1; i++)
    {
		aLi[i].index = i;
        aLi[i].onmouseover=function ()
        {
			var oA = this.getElementsByTagName('a')[0];
			for(var j=0; j<aLi.length-1; j++){
				aLi[j].getElementsByTagName('a')[0].className = '';	
			}
            toMove(oMove, this.offsetLeft);
			
			oA.className = 'header_active';

        }
    }
	
	var aPos = [];
	for(var i=0; i<aContLi.length; i++){
		aPos[i] = {left:aContLi[i].offsetLeft, top:aContLi[i].offsetTop};
	}
	var oBtnRnd = document.getElementById('btn_rnd');
	var bRnd = true;
	var bHref = false;
	var rndTime = null;
	oBtnRnd.onclick=function (){
		if(!bRnd)return;
		bRnd = !bRnd;
		aPos.sort(function (){
			return Math.random()-0.5;	
		});
		for(var i=0; i<aContLi.length; i++){
			doMove(aContLi[i],aPos[aContLi[i].index],{fn:function (){
				bRnd = true;	
			}});	
		}
	};
	oBtnRnd.onselectstart=function (){
		return false;	
	};
	
	function drag(obj){
		var _href = obj.getElementsByTagName('a')[0].href;
		obj.onmousedown=function (ev){
			var oEvent = ev || event;
			var disX = oEvent.clientX-obj.offsetLeft;
			var disY = oEvent.clientY-obj.offsetTop;
			zIndex++;
			obj.style.zIndex = zIndex;			
			document.onmousemove=function (ev){
				var oEvent = ev || event;
				var l = oEvent.clientX-disX;
				var t = oEvent.clientY-disY;
				bHref = true;
				obj.getElementsByTagName('a')[0].href = 'javascript:;';
				obj.style.left = l+'px';
				obj.style.top = t+'px';	
				
				for(var i=0; i<aContLi.length; i++){
					aContLi[i].children[0].className = '';	
				}
				var oNear = findNearest(obj);
				if(oNear){
					oNear.children[0].className = 'active';	
				}
			
			};
			document.onmouseup=function (){
				document.onmousemove = null;
				document.onmouseup = null;
				obj.releaseCapture && obj.releaseCapture();
				if(!bHref){
					obj.getElementsByTagName('a')[0].href = _href;	
				}
				var oNear = findNearest(obj);
				if(oNear){
					oNear.children[0].className = '';	
					doMove(obj,aPos[oNear.index]);
					doMove(oNear,aPos[obj.index]);
					var tmp;
					tmp = obj.index;
					obj.index = oNear.index;
					oNear.index = tmp;
				}else{
					doMove(obj,aPos[obj.index])	
				}	
			};
			obj.setCapture && obj.setCapture();
			return false;
		};	
	}
	
	function collTest(obj1, obj2){
		var l1 = obj1.offsetLeft;
		var r1 = obj1.offsetLeft+obj1.offsetWidth;
		var t1 = obj1.offsetTop;
		var b1 = obj1.offsetTop+obj1.offsetHeight;
		var l2 = obj2.offsetLeft;
		var r2 = obj2.offsetLeft+obj2.offsetWidth;
		var t2 = obj2.offsetTop;
		var b2 = obj2.offsetTop+obj2.offsetHeight;
		if(r1<l2 || b1<t2 || l1 > r2 || t1>b2){
			return false;	
		}else{
			return true;	
		}	
	}
	function getDis(obj1, obj2){
		var a = obj1.offsetLeft+obj1.offsetWidth/2-(obj2.offsetLeft+obj2.offsetWidth/2);
		var b = obj1.offsetTop+obj1.offsetHeight/2-(obj2.offsetTop+obj2.offsetHeight/2);
		return Math.sqrt(a*a+b*b);	
	}
	
	function findNearest(obj){
		var iMin = 999999;
		var iMinIndex = -1;
		
		for(var i=0; i<aContLi.length; i++){
			if(obj==aContLi[i])continue;
			if(collTest(obj,aContLi[i])){
				var dis = getDis(obj, aContLi[i]);
				if(dis<iMin){
					iMin = dis;
					iMinIndex = i;	
				}	
			}	
		}
		
		if(iMinIndex==-1){
			return null;	
		}else{
			return aContLi[iMinIndex];	
		}	
	}
	
	for(var i=0; i<aContLi.length; i++){
		aContLi[i].index = i;
		aContLi[i].style.position = 'absolute';
		aContLi[i].style.left = aPos[i].left+'px';
		aContLi[i].style.top = aPos[i].top+'px';
		aContLi[i].style.margin = 0;
		drag(aContLi[i]);
		aContLi[i].getElementsByTagName('a')[0].onclick=function (){
			bHref = false;
		}
	}
	
	(function (){
		var oUl = $('#nav');
		var aLi = $('#nav li');
		var oSlide = $('.header');
		var oOuterBox = $('.outer_box');
		var oSlide1 = $('.slide1');
		var oSlide2 = $('.slide2');
		var oAttention = $('.guanzhu');
		var oWeixin = $('.weixin span');
		var oSlide1LogBtn = $('#slide1_log_btn');
		var oSlide1ResBtn = $('#slide1_res_btn');
		var aSlide1LoginMask = $('.slide1_login_mask');
		var oSlide1Login = $('.slide1_login_txt');
		var oShowTabBox = $('.show_tab_box');
		var aShowDiv = $('.show_div');
		var iShowTabNow = -2;
		var iShowZindex = 0;
		var timer = null;
		var oWeixinTimer = null;
		var bSys = false;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		
		oSlide.css('top',$(window).height()-oSlide.height());
		
		window.fnClickUp = function (){
			iShowZindex++;
			oSlide2.css('zIndex', iShowZindex);
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			oSlide.stop().animate({top:'0px'});
			oSlide1.stop().animate({top:-oSlide1.height()+'px'});
			oSlide2.stop().animate({top:'0px'},{complete:function (){
				oShowTabBox.css('top', $(window).height()+'px');
			}});
			oOuterBox.stop().animate({height:aShowDiv.eq($(this).index()).height()+'px'});
			iShowTabNow = -2;
			if(scrollTop){
				scrollMove();	
			};
		}
		window.fnClickDown = function (){
			iShowZindex++;
			oSlide1.css('zIndex', iShowZindex);
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			oSlide.stop().animate({top:($(window).height()-oSlide.height())+'px'});
			oSlide1.stop().animate({top:'0px'});
			oSlide2.stop().animate({top:oSlide1.height()+'px'});
			oOuterBox.stop().animate({height:aShowDiv.eq($(this).index()).height()+'px'});
			oShowTabBox.stop().animate({top:$(window).height()+'px'});
			if(scrollTop){
				scrollMove();	
			};
		}
		function scrollMove(){
			var start = document.documentElement.scrollTop || document.body.scrollTop;
			var dis = 0-start;
			var count = Math.floor(1000/30);
			var n = 0;
			timer = setInterval(function (){
				bSys = false;
				n++;
				var a = 1-(n/count);
				var cur = start+dis*(1-Math.pow(a, 3));
				document.documentElement.scrollTop = document.body.scrollTop = cur;
				if(n==count){
					clearInterval(timer);
					bSys = false;
					scrollTop = document.documentElement.scrollTop || document.body.scrollTop;	
				}	
			},30);	
		}
		$(document).scroll(function (){
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(bSys){
				clearInterval(timer);
			}
			bSys = true;	
		});
		aLi.eq(0).bind('click',fnClickDown);
		aLi.eq(1).bind('click',fnClickUp);
		
		$(window).resize(function (){
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			if(oSlide.offset().top-scrollTop){
				oSlide.css('top',$(window).height()-oSlide.height());
			}else {
				oSlide.css('top','0px');	
			}	
		});
		
		oAttention.hover(function (){
			clearTimeout(oWeixinTimer);
			oWeixinTimer = setTimeout(function (){
				oWeixin.stop().animate({top:'0px'});
			}, 500);
		},function (){
			clearTimeout(oWeixinTimer);
			oWeixinTimer = setTimeout(function (){
				oWeixin.stop().animate({top:'-100px'});
			}, 500);
		});
		
		oWeixin.hover(function (){
			clearTimeout(oWeixinTimer);
		},function (){
			clearTimeout(oWeixinTimer);
			oWeixinTimer = setTimeout(function (){
				oWeixin.stop().animate({top:'-100px'});
			}, 500);	
		});
		
		aSlide1LoginMask.click(function (){
			$(this).prev().focus();
			$(this).css('display','none');	
		});
		oSlide1Login.focus(function (){
			$(this).next().css('display','none');
		});
		oSlide1Login.blur(function (){
			if($(this).val()==''){
				$(this).next().css('display','block');	
			}
		});
		var reg = {
			email:/^\w+@[a-z0-9-]+(\.[a-z]{2,6}){1,2}$/,
			pass:/^\w{6,12}$/	
		};
		
		oSlide1LogBtn.click(function (){
			if(!oSlide1Login.eq(0).val()){
				alert('用户名不能为空！');	
			}else{
				
				if(reg.email.test(oSlide1Login.eq(0).val())){;
					if(!oSlide1Login.eq(1).val()){
						alert('密码不能为空！');	
					}else{
						if(reg.pass.test(oSlide1Login.eq(1).val())){
							alert('登录成功!');
						}else{
							alert('请输入6-12位由数字、字母、下划线构成的密码！');	
						}
					}
				}else{
					alert('请输入正确的邮箱格式！');	
				}
			}	
		});
		
		oSlide1ResBtn.click(function (){
			if(!oSlide1Login.eq(0).val()){
				alert('用户名不能为空！');	
			}else{
				
				if(reg.email.test(oSlide1Login.eq(0).val())){;
					if(!oSlide1Login.eq(1).val()){
						alert('密码不能为空！');	
					}else{
						if(reg.pass.test(oSlide1Login.eq(1).val())){
							alert('注册成功!');
						}else{
							alert('请输入6-12位由数字、字母、下划线构成的密码！');	
						}
					}
				}else{
					alert('请输入正确的邮箱格式！');	
				}
			}	
		});
		
		/*show_tab_box*/
		
		oShowTabBox.css('left', -$(window).width()+'px');
		oShowTabBox.css('top', $(window).height()+'px');
		aLi.click(function (){
			if($(this).index()>1){
				iShowZindex++;
				oShowTabBox.eq($(this).index()-2).css('left', '0px');
				oSlide.stop().animate({top:'0px'});
		  		oShowTabBox.eq($(this).index()-2).css('zIndex',iShowZindex);
				oSlide1.stop().animate({top:-oSlide1.height()+'px'});
				oOuterBox.stop().animate({height:aShowDiv.eq($(this).index()).height()+'px'});
				var showTabScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				if(showTabScrollTop){
					scrollMove();	
				};
				if(oSlide.offset().top-scrollTop){
					//oShowTabBox.eq($(this).index()-2).css('left', '0px');
					oShowTabBox.stop().animate({top:'0px'});
					iShowTabNow = $(this).index()-2;
					;	
				}else{
					oShowTabBox.css('top', '0px');
					if($(this).index()-2-iShowTabNow>0){
							oShowTabBox.eq($(this).index()-2).css('left', -$(window).width()+'px');
							oShowTabBox.eq($(this).index()-2).stop().animate({left:'0px'},{complete:function (){
							oSlide1.stop().animate({top:-oSlide1.height()+'px'});
							oSlide2.stop().animate({top:oOuterBox.height()+'px'});	
						}});
						iShowTabNow = $(this).index()-2;
					}else if($(this).index()-2-iShowTabNow<0){
							oShowTabBox.eq($(this).index()-2).css('left', $(window).width()+'px');
							oShowTabBox.eq($(this).index()-2).stop().animate({left:'0px'},{complete:function (){
							oSlide1.stop().animate({top:-oSlide1.height()+'px'});
							oSlide2.stop().animate({top:oOuterBox.height()+'px'});	
						}});
						iShowTabNow = $(this).index()-2;
					}else if($(this).index()-2-iShowTabNow==0){
						oSlide1.stop().animate({top:-oSlide1.height()+'px'});
						oSlide2.stop().animate({top:oOuterBox.height()+'px'});
					}
				}
			}	
		})
	})();
	
	/*show_tab1*/
	(function (){
		var oShowTab1 = document.getElementById('show_tab1');
		var x=0;
		var oImg=document.getElementById('img1');
		var aImg=oShowTab1.getElementsByTagName('img');
		var oLastImg=oImg;
		var lastX=0;
		var iSpeed=0;
		var timer=null;
		var i=0;
	
		for(i=1;i<77;i++)
		{
			(function (oNewImg){
				var oImg=new Image();
	
				oImg.onload=function ()
				{
					oNewImg.src=this.src;
				};
				oImg.src='images/360qj/me('+i+').jpg';
	
				oNewImg.style.display='none';
	
				oShowTab1.appendChild(oNewImg);
			})(document.createElement('img'));
		}
		oShowTab1.onmousedown=function (ev)
		{
			var oEvent=ev||event;
			var disX=oEvent.clientX-x;
	
			clearInterval(timer);
	
			document.onmousemove=function (ev)
			{
				var oEvent=ev||event;
	
				x=oEvent.clientX-disX;
	
				move();
	
				iSpeed=x-lastX;
				lastX=x;
				return false;
			};
	
			document.onmouseup=function ()
			{
				document.onmousemove=null;
				document.onmouseup=null;
	
				timer=setInterval(function (){
					x+=iSpeed;
	
					move();
				}, 30);
			};
	
			return false;
		};
		function move()
			{
				if(iSpeed>0)
				{
					iSpeed--;
				}
				else
				{
					iSpeed++;
				}
	
				if(iSpeed==0)
				{
					clearInterval(timer);
				}
	
				var l=parseInt(-x/10);
	
				if(l>0)
				{
					l=l%77;
				}
				else
				{
					l=l+-Math.floor(l/77)*77;
				}
	
				if(oLastImg!=aImg[l])
				{
					oLastImg.style.display='none';
					aImg[l].style.display='block';
					oLastImg=aImg[l];
				}
			}
	})();
	
	/*show_tab2*/
	(function (){
		var oDiv=document.getElementById('div2');
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
					startMove(aLi[i], {left: 0, opacity: 100},4, function (){
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
			startMove(oMySelft, {opacity:0},4,function (){
				startMove(oMySelft, {bottom:-500},4);
				
					if(!ready)return;
				
					ready=false;
					if(opened)
					{
						oNavBox.className='navBox';
						var i=aLi.length-1;
						var timer=setInterval(function (){
							var left=i%2?-aLi[i].offsetWidth:aLi[i].offsetWidth;
							
							(function (i){
								startMove(aLi[i], {left: left, opacity: 0},4, function (){
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
						startMove(aLi[i], {left: left, opacity: 0},4, function (){
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
		$(aLi[2]).bind('click', fnClickDown);
		$(aLi[3]).bind('click', fnClickUp);
		aLi[4].onclick=function (){
			
			oNavBox.className='navBox';
			var oSpan=oNavBox.children[0];
			
			opened=false;
			
			oSpan.innerHTML=this.children[0].innerHTML;
			
			var i=aLi.length-1;
			var timer=setInterval(function (){
				var left=i%2?-aLi[i].offsetWidth:aLi[i].offsetWidth;
				
				(function (i){
					startMove(aLi[i], {left: left, opacity: 0},4, function (){
						aLi[i].style.display='none';
					});
				})(i);
				
				i--;
				if(i==-1)
				{
					clearInterval(timer);
					startMove(oMySelft, {bottom:200, opacity:100},4)
				}
			}, 77);	
			
			var oMyClose = document.getElementById('my_close');
			oMyClose.onclick=function (){
				startMove(oMySelft, {opacity:0},4,function (){
					showList();
					startMove(oMySelft, {bottom:-500},4);
				})
			};
		}	
	})();
	
	/*show_tab3*/
	(function (){
		var oBtn = $('#liuyan_btn1');
		var oTxt = $('#tijiaoText');
		var oMask = $('.liuyan_mask');
		var oMsgBox = $('.msg_box');
		var oStar = $('.star');
		var aSpan = oStar.find('span');
		var oScore = $('#score');
		var oNoContent = $('#noContent');
		
		oMask.click(function (){
			if(!oTxt.val()){
				$(this).css('display','none');	
			}
			oTxt.focus();	
		});
		oTxt.focus(function (){
			oMask.css('display','none');	
		});
		oTxt.blur(function (){
			if(!oTxt.val()){
				oMask.css('display','block');	
			}	
		});
		
		oBtn.click(function (){
			var oDate = new Date();
			var sDate = oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+oDate.getDate()+' '+oDate.getHours()+':'+oDate.getMinutes()+':'+oDate.getSeconds();
			oNoContent.css('display', 'none');
			if(oTxt.val()){
				var oNewDiv = $('<div></div');
				oNewDiv.addClass('commentOn');
				oNewDiv.html('<div class="messList" id="box"><div class="reply"><p class="replyContent">'+oTxt.val()+'</p><p class="operation"><span class="replyTime">'+sDate+'</span></p></div></div>');
				oNewDiv.prependTo(oMsgBox);
				
				var iHeight = oNewDiv.height();
				oNewDiv.css('height','0px');
				oNewDiv.stop().animate({height:iHeight+'px'});
				
				oTxt.val('');
				oMask.css('display','block');
			}else{
				alert('^_^不能提交空的留言^_^');	
			}	
		});
		
		function score(){
			oScore.html($(this).index()-6+'分');
			for(var i=0; i<aSpan.size(); i++){
				if((i>=$(this).index()-1 && i<=5) || (i>=5 && i<=$(this).index()-1)){
					//document.title = i;
					aSpan.eq(i).addClass('star_on');	
				}else{
					aSpan.eq(i).removeClass('star_on');
				}		
			}
		}
		function submitScore(){
			alert('评分成功！')
			aSpan.unbind('mouseover',score);
			aSpan.unbind('click',submitScore);	
		}
		
		aSpan.bind('mouseover',score);
		aSpan.bind('click',submitScore);
	})();
	
	/*show_tab4*/
	(function (){
		var oBdTxt = $('#bd_txt');
		var oBdBtn = $('#bd_btn');
		var oBdMask = $('.bd_mask');
		var oBdTxtSpan = $('.bd_txt_span');
		var oUl = $('#bd_search_cont');
		var oDiv = $('.bd_search');
		var URL='http://suggestion.baidu.com/su';
		
		var iNow = -1;
		var oldValue = '';
		
		oBdMask.click(function (){
			if(!oBdTxt.val()){
				$(this).css('display', 'none');	
			}
			oBdTxt.focus();
			oBdTxtSpan.addClass('active');	
		});
		oBdTxt.focus(function (){
			oBdMask.css('display', 'none');
			oBdTxtSpan.addClass('active');
		});
		oBdTxt.blur(function (){
			if(!oBdTxt.val()){
				oBdMask.css('display', 'block');
			}
			oBdTxtSpan.removeClass('active');
			oDiv.css('display','none');
		});
		
		oBdTxt.keyup(function (ev){
			if(ev.keyCode==40 || ev.keyCode==38)return;
			if(ev.keyCode==13){
				window.open('http://www.baidu.com/s?wd='+oBdTxt.val());	
				oBdTxt.val('');
			}
			
			jsonp({
				url:URL,
				data:{
					wd:oBdTxt.val()
				},
				success:function(json){
					var arr=json.s;
					oUl.html('');
					if(!oBdTxt.val()){
						oDiv.css('display','none');
					}else{
						oDiv.css('display','block');
					}
					
					for(var i=0; i<arr.length; i++){
						$('<li>'+arr[i]+'</li>').appendTo(oUl);
					}
					var aLi=oUl.find('li');
					aLi.mouseover(function (){
						oBdTxt.val($(this).html());
						aLi.removeClass('selected');
						$(this).addClass('selected');
							
					});
					aLi.click(function (){
						oBdTxt.val($(this).html());	
						oDiv.css('display','none');
					});	
				}	
			});
			oldValue=oBdTxt.val();
			
		});
		
		oBdTxt.keydown(function (ev){
			if(ev.keyCode==40){
				var aLi=oUl.find('li');
				iNow++;
				if(iNow==aLi.size())iNow=-1;
				
				for(var i=0; i<aLi.size(); i++){
					aLi.eq(i).removeClass('selected');
				}
				
				if(iNow==-1){
					oBdTxt.val(oldValue);
				}else{
					aLi.eq(iNow).addClass('selected');
					oBdTxt.val(aLi.eq(iNow).html());	
				}
			}
			if(ev.keyCode==38){
				var aLi=oUl.find('li');
				iNow--;
				if(iNow==-2)iNow=aLi.size()-1;
				
				for(var i=0; i<aLi.size(); i++){
					aLi.eq(i).removeClass('selected');
				}
				
				if(iNow==-1){
					oBdTxt.val(oldValue);
				}else{
					aLi.eq(iNow).addClass('selected');
					oBdTxt.val(aLi.eq(iNow).html());	
				}
				return false;	
			}	
		});
		oBdBtn.click(function (){
			if(oBdTxt.val()){
				window.open('http://www.baidu.com/s?wd='+oBdTxt.val());	
				oBdTxt.val('');
			}	
		})
	})();

}
