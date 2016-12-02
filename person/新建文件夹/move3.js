// JavaScript Document
function getStyle(obj,name){
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name];
}
function startMove(obj,name,target,time){
	var count = Math.floor(time/30);
	var start = parseFloat(getStyle(obj,name));
	var dis = target-start;
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		var cur = start+n*dis/count;
		//1.opcity没有px
		//2.opcity还要设置filter
		if(name=='opacity'){
			obj.style[name] = cur;
			obj.style.filter = 'alpha(opcity:'+(cur)*100+')';
		}else{
			obj.style[name] = cur+'px';
		}
		if(n==count){
			clearInterval(obj.timer);	
		}
	},30);
}	



































