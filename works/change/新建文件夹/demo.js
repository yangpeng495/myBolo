window.onload=function ()
{
    var oUl=document.getElementById('ul1');
    var aLi=oUl.getElementsByTagName('li');
    var i=0;
    var aPos=[];
    var iMinIndex=2;

    //布局转换
    for(i=0; i<aLi.length; i++)
    {
        aPos[i]={left: aLi[i].offsetLeft, top: aLi[i].offsetTop};
    }
    for(i=0; i<aLi.length; i++)
    {
        aLi[i].style.left=aPos[i].left+'px';
        aLi[i].style.top=aPos[i].top+'px';

        aLi[i].style.position='absolute';
        aLi[i].style.margin='0';

        aLi[i].index=i;
    }

    //拖拽
    for(i=0; i<aLi.length; i++)
    {
        setDrag(aLi[i]);
    }
    function setDrag(obj)
    {
        obj.onmousedown=function (ev)
        {
            var oEvent=ev||event

            var disX=oEvent.clientX-obj.offsetLeft;
            var disY=oEvent.clientY-obj.offsetTop;

            obj.style.zIndex=iMinIndex++;

            if(obj.setCapture)
            {
                obj.onmousemove=fnMove;
                obj.onmouseup=fnUp;

                obj.setCapture();
            }
            else
            {
                document.onmousemove=fnMove;
                document.onmouseup=fnUp;

                return false;
            }
            function fnMove(ev)
            {
                var oEvent=ev||event;

                obj.style.left=oEvent.clientX-disX+'px';
                obj.style.top=oEvent.clientY-disY+'px';

                for(i=0; i<aLi.length; i++)
                {
                    aLi[i].className='';
                }

                var oNear=findNearest(obj);

                if(oNear)
                {
                    oNear.className='active';
                }

                /*for(i=0; i<aLi.length; i++)
                 {
                 aLi[i].className='';
                 if(cdTest(obj, aLi[i]))
                 {
                 if(obj==aLi[i])continue;
                 aLi[i].className='active';
                 }
                 }*/
            }
            function fnUp()
            {
                this.onmousemove=null;
                this.onmouseup=null;

                if(this.releaseCapture)
                {
                    this.releaseCapture();
                }

                var oNear=findNearest(obj);

                if(oNear)
                {
                    oNear.className='';

                    oNear.style.zIndex=iMinIndex++;
                    obj.style.zIndex=iMinIndex++;

                    startMove(oNear, aPos[obj.index]);
                    startMove(obj, aPos[oNear.index]);

                    var tmp=0;

                    tmp=obj.index;
                    obj.index=oNear.index;
                    oNear.index=tmp;

                }
                else
                {
                    startMove(obj, aPos[obj.index]);
                }
            }
            clearInterval(obj.timer);
        }
    }

    //碰撞检测
    function cdTest(obj1, obj2)
    {
        var l1=obj1.offsetLeft;
        var r1=obj1.offsetLeft+obj1.offsetWidth;
        var t1=obj1.offsetTop;
        var b1=obj1.offsetTop+obj1.offsetHeight;

        var l2=obj2.offsetLeft;
        var r2=obj2.offsetLeft+obj2.offsetWidth;
        var t2=obj2.offsetTop;
        var b2=obj2.offsetTop+obj2.offsetHeight;

        if(l1>r2 || r1<l2 || t1>b2 || b1<t2)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    function getDis(obj1, obj2)    //计算距离
    {
        var a=obj1.offsetLeft-obj2.offsetLeft;
        var b=obj1.offsetTop-obj2.offsetTop;

        return Math.sqrt(a*a+b*b);
    }

    function findNearest(obj)
    {
        var iMin=Infinity;
        var iMinIndex=-1;
        var i=0;

        for(i=0; i<aLi.length; i++)
        {
            if(obj==aLi[i])continue;

            if(cdTest(obj, aLi[i]))
            {
                var dis=getDis(obj, aLi[i]);
                if(dis<iMin)
                {
                    iMin=dis;
                    iMinIndex=i;
                }
            }
        }
        if(iMinIndex==-1)
        {
            return null;
        }
        else
        {
            return aLi[iMinIndex];
        }
    }
}
