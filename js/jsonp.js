function jsonp(json){
	json=json || {};
	if(!json.url)return;
	json.data=json.data || {};
	json.cbName=json.cbName || 'cb';
	
	var fnName='jsonp'+Math.random();
	fnName=fnName.replace('.','');
	
	window[fnName]=function(a){
		json.success && json.success(a);
		
		oHead.removeChild(oS);
	};
	
	json.data[json.cbName]=fnName;
	
	var arr=[];
	for(var name in json.data){
		arr.push(name+'='+json.data[name]);
	}
	
	var str=arr.join('&');
	
	var oS=document.createElement('script');
	oS.src=json.url+'?'+str;
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}