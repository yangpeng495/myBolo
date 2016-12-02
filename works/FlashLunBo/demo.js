function getByClass(oParent, sClass)
{
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    var i=0;

    for(i=0; i<aEle.length; i++)
    {
        if(aEle[i].className==sClass)
        {
            aResult.push(aEle[i]);
        }
    }

    return aResult;
};

window.onload=function ()
{
    var oDiv=document.getElementById('playimages');
    var oBtnPrev=getByClass(oDiv, 'prev')[0];
    var oBtnNext=getByClass(oDiv, 'next')[0];
    var oMarkLeft=getByClass(oDiv, 'mark_left')[0];
    var oMarkRight=getByClass(oDiv, 'mark_right')[0];
    var oTxt=getByClass(oDiv, 'text')[0];
    var oLen=getByClass(oDiv, 'length')[0];
    var arr=['城市风景', '复古摇椅', '沉浸舞蹈', '时尚名车', '性感美女', '你好色彩'];
    var oSmallUl=getByClass(oDiv, 'small_pic')[0].getElementsByTagName('ul')[0];
    var aSmallLi=oSmallUl.getElementsByTagName('li');
    var oBigUl=getByClass(oDiv, 'big_pic')[0];
    var aBigLi=oBigUl.getElementsByTagName('li');
    var iMinZindex=2;
    var iNow=0;
    var i=0;

    oSmallUl.style.width=aSmallLi.length*aSmallLi[0].offsetWidth+'px';
    oTxt.innerHTML=arr[iNow];
    oLen.innerHTML=(iNow+1)+'/'+aSmallLi.length;

    oBtnPrev.onmouseover=oMarkLeft.onmouseover=function ()
    {
        startMove(oBtnPrev, 'opacity', 100);
    };

    oBtnPrev.onmouseout=oMarkLeft.onmouseout=function ()
    {
        startMove(oBtnPrev, 'opacity', 0);
    };

    oBtnNext.onmouseover=oMarkRight.onmouseover=function ()
    {
        startMove(oBtnNext, 'opacity', 100);
    };

    oBtnNext.onmouseoout=oMarkRight.onmouseout=function ()
    {
        startMove(oBtnNext, 'opacity', 0);
    };

    for(i=0; i<aSmallLi.length; i++)
    {
        aSmallLi[i].index=i;

        aSmallLi[i].onmouseover=function ()
        {
            startMove(this, 'opacity', 100)
        }

        aSmallLi[i].onmouseout=function ()
        {

            if(this.index!=iNow)
            {
                startMove(this, 'opacity', 60) ;
            }
        }

        function tab()
        {
            for(i=0; i<aSmallLi.length; i++)
            {
                startMove(aSmallLi[i], 'opacity', 60);
            }
            startMove(aSmallLi[iNow], 'opacity', 100);

            aBigLi[iNow].style.zIndex=iMinZindex++;
            aBigLi[iNow].style.height=0;

            startMove(aBigLi[iNow], 'height', oBigUl.offsetHeight);

            if(iNow==0)
            {
                startMove(oSmallUl, 'left', 0);
            }
            else if(iNow==aSmallLi.length-1)
            {
                startMove(oSmallUl, 'left', -(iNow-2)*aSmallLi[0].offsetWidth);
            }
            else
            {
                startMove(oSmallUl, 'left', -(iNow-1)*aSmallLi[0].offsetWidth);
            };

            oTxt.innerHTML=arr[iNow];
            oLen.innerHTML=(iNow+1)+'/'+aSmallLi.length;
        }

        aSmallLi[i].onclick=function ()
        {
            if(this.index==iNow) return; //若点击的是当前的图片则什么也不做，注意前后顺序！

            iNow=this.index;

            tab();
        };

        oBtnPrev.onclick=function ()
        {
            iNow--;
            if(iNow==-1)
            {
                iNow=aSmallLi.length-1;
            };

            tab();
        };

        oBtnNext.onclick=function ()
        {
            iNow++;
            if(iNow==aSmallLi.length)
            {
                iNow=0;
            };

            tab();
        };
    }

};