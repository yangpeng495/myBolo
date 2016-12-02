window.onload=function ()
{
    var x=0;
    var oImg=document.getElementById('img1');
    var aImg=document.getElementsByTagName('img');
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
            oImg.src='img/miaov ('+i+').jpg';

            oNewImg.style.display='none';

            document.body.appendChild(oNewImg);
        })(document.createElement('img'));
    }

    document.onmousedown=function (ev)
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

        return false;
    };
};
