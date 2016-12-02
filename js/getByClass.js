function hasClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b');
	
	return reg.test(obj.className);
}
function addClass(obj,sClass){
	if(obj.className){
		if(!hasClass(obj,sClass)){
			obj.className+=' '+sClass;	
		}
	}else{
		obj.className=sClass;	
	}
}
function removeClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b','g');
	if(hasClass(obj,sClass)){
		obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
	}
}
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{  //IE 8 7 6
		var arr=[];
		var aEle=oParent.getElementsByTagName('*');
		var reg=new RegExp('\\b'+sClass+'\\b');
		for(var i=0; i<aEle.length; i++){
			if(reg.test(aEle[i].className)){
				arr.push(aEle[i]);	
			}
		}
		return arr;
	}
}