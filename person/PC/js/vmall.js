/**
 * Created by 杨鹏 on 2016/8/26.
 */
/**********************搜索框************************************/

(function(){
    var oT=document.getElementById('t1');
    var oShe=document.getElementById('she');
    function search(){
        window.open('https://www.baidu.com/s?wd='+oT.value,'_self');
        oT.value='';
    }
    oT.onkeyup=oT.onfocus=function(){
        var str=this.value.replace(/(^ +)|( +$)/g,'');
        oShe.style.display=str?'block':'none';

    };
    document.body.onclick=function(e){
        e.target= e.target|| e.srcElement;
        if(e.target.id=='t1'){
            return;
        }
        if(e.target.tagName.toLowerCase()=='a'){
            oT.value=e.target.innerHTML;
        }
        if(e.target.id=='sear'){
            search();
        }
        oShe.style.display='none';
    };

})();
/**********************二维码渐隐渐现***************************/
(function (){
    var oTac=document.getElementById('tac');
    var oTacInner=oTac.getElementsByTagName('div')[0];
    var aLi=oTacInner.getElementsByTagName('li');
    var oUl=oTac.getElementsByTagName('ul')[0];
    var aSpan=oUl.getElementsByTagName('span');
    var step=0;
    function setBanner(){
        for(var i=0; i<aLi.length; i++){
            if(i===step){
                utils.css(aLi[i],'zIndex',1);

                animate(aLi[i],{opacity:1},300,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0; i<siblings.length; i++){
                        animate(siblings[i],{opacity:0});
                    }
                });
                continue;
            }
            utils.css(aLi[i],'zIndex',0)
        }
        bannerTip();
    }
    function bannerTip(){
        for(var i=0; i<aSpan.length; i++){
            aSpan[i].className=i===step?'on1':null;
        }
    }

    handleChange();
    function handleChange(){
        for(var i=0; i<aSpan.length; i++){
            aSpan[i].index=i;
            aSpan[i].onmouseover=function(){
                step=this.index;
                setBanner();
            }
        }
    }

})();
/*-----------------渐隐渐现轮播图--------------------------------*/
(function(){
    var oBox=document.getElementById('box');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oBox.getElementsByTagName('li');
    var step=0;
    var timer=null;
    clearInterval(timer);
    timer=setInterval(autoMove,5000)
    function autoMove(){
        if(step>=aDiv.length-1){
            step=-1;
        }
        step++; //1 2 3 0
        setBanner();
    }
    function setBanner(){
        for(var i=0; i<aDiv.length; i++){
            if(i===step){
                utils.css(aDiv[i],'zIndex',1);
                animate(aDiv[i],{opacity:1},500,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0; i<siblings.length; i++){
                        animate(siblings[i],{opacity:0});
                    }
                })
                continue;
            }
            utils.css(aDiv[i],'zIndex',0)
        }
        bannerTip();
    }

    // 焦点自动轮播
    function bannerTip(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].className=i===step?'on':null;
        }
    }
    // 鼠标移入停止，移出继续
    oBox.onmouseover=function(){
        clearInterval(timer);
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,5000);
    };
    // 点击焦点手动切换
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onmouseover=function(){
                step=this.index;
                setBanner();
            }
        }
    }

})();
/********************公告 评测选项卡************************/


/*******************轮播图2************************/

(function(){
    var oBox=document.getElementById('bak');
    var oBoxInner=oBox.getElementsByTagName('div')[0];
    var aDiv=oBoxInner.getElementsByTagName('div');
    var aImg=oBoxInner.getElementsByTagName('img');
    var oUl=oBox.getElementsByTagName('ul')[0];
    var aLi=oBox.getElementsByTagName('li');
    var step=0;
    var timer=null;
    clearInterval(timer);
    timer=setInterval(autoMove,5000)
    function autoMove(){
        if(step>=aDiv.length-1){
            step=-1;
        }
        step++; //1 2 3 0
        setBanner();
    }
    function setBanner(){
        for(var i=0; i<aDiv.length; i++){
            if(i===step){
                utils.css(aDiv[i],'zIndex',1);
                animate(aDiv[i],{opacity:1},500,function(){
                    var siblings=utils.siblings(this);
                    for(var i=0; i<siblings.length; i++){
                        animate(siblings[i],{opacity:0});
                    }
                })
                continue;
            }
            utils.css(aDiv[i],'zIndex',0)
        }
        bannerTip();
    }

    // 焦点自动轮播
    function bannerTip(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].className=i===step?'add':null;
        }
    }
    // 鼠标移入停止，移出继续
    oBox.onmouseover=function(){
        clearInterval(timer);
    };
    oBox.onmouseout=function(){
        timer=setInterval(autoMove,5000);
    };
    // 点击焦点手动切换
    handleChange();
    function handleChange(){
        for(var i=0; i<aLi.length; i++){
            aLi[i].index=i;
            aLi[i].onmouseover=function(){
                step=this.index;
                setBanner();
            }
        }
    }

})();






















