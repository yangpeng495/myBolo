/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-4-6
 * Time: 下午8:29
 * To change this template use File | Settings | File Templates.
 */
function getStyle(obj, attr)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj, false)[attr];
    };
};

function startMove(obj, json, fn)
{

    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var bStop=true;
        for(var attr in json)
        {
            //1.取当前值
            var iCur=0;
            if(attr=='opacity')
            {
                iCur=parseInt(parseFloat(getStyle(obj, attr))*100);   //干掉小数
            }
            else
            {
                iCur=parseInt(getStyle(obj, attr));
            }

            //2.算速度
            var iSpeed=(json[attr]-iCur)/8;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

            //3.检测停止

            if(iCur!=json[attr])  //iCur是值，attr是属性，当json里任何一个attr不等于iCur时，
            {                     //给个false （给bStop一个false并不意味着运动停止）
                bStop=false;
            }
            if(attr=='opacity')
            {
                obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                obj.style.opacity=(iCur+iSpeed)/100;
            }
            else
            {
                obj.style[attr]=iCur+iSpeed+'px';
            }
        };

            if(bStop) //如果a没有被赋值false（意味着a仍旧=true），代表iCur=json里任何一个attr，这时停止运动
            {
                clearInterval(obj.timer);

                if(fn)
                {
                    fn();
                };
            };
    }, 30);
};