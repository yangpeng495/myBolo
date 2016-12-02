window.onload=function ()
{
    document.onmousemove=function (ev)
    {
        var oEvent=ev||event;
        var oDiv=document.getElementById('div1');
        var aImg=document.getElementsByTagName('img');
        var i=0;

        for(i=0; i<aImg.length; i++)
        {
            var x=aImg[i].offsetLeft+aImg[i].offsetWidth/2;
            var y=aImg[i].offsetTop+aImg[i].offsetHeight/2+oDiv.offsetTop;
            var a=x-oEvent.clientX;
            var b=y-oEvent.clientY;

            var dis=Math.sqrt(a*a+b*b);
            var scale=1-dis/300;



            if(scale<0.5)
            {
                scale=0.5;
            }

            aImg[i].width=scale*128;

        }
    }
}
