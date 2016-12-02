window.onload=function ()
{
    var oDiv=document.getElementById('main');
    var R=8;
    var C=19;
    //1。蛇
    var  aSnake=[];

    /*var oNewDiv=document.createElement('div');
     oNewDiv.style.background='url(img/snake0.png)'  //蛇头
     oDiv.appendChild(oNewDiv);
     aSnake[0]={r: 0, c: 5, div: oNewDiv};
     setPos(aSnake[0]);*/

    for(var i=0; i<5; i++)
    {
        var oNewDiv=document.createElement('div');
        oNewDiv.style.background='url(img/snake'+i+'.png)'
        oDiv.appendChild(oNewDiv);
        // r-行 c-列 div-蛇 d-方向
        aSnake[i]={r: 0, c:14+i, div: oNewDiv, d: 'l', type: 'snake'}; //蛇身子
        setPos(aSnake[i]);
    }

    //设置坐标
    function setPos(obj)
    {
        obj.div.style.left=obj.c*30+'px';
        obj.div.style.top=obj.r*30+'px';

        if(obj.type=='eat')
        {
            obj.div.className='';
        }
        else
        {
            obj.div.className=obj.d;
        }
    }

    //蛇移动
    var dir='l';

    var timer=setInterval(startSnake, 300);
    function startSnake(){
        //看看蛇有没有撞墙
        if(aSnake[0].c<0 || aSnake[0].r<0 || aSnake[0].c>=C || aSnake[0].r>=R)
        {
            alert('Game Over');
            clearInterval(timer);
            return;
        }
        //看看蛇有没有撞在不对的吃的上
        for(var i=1; i<aEat.length; i++)
        {
            if(aSnake[0].r==aEat[i].r && aSnake[0].c==aEat[i].c)
            {
                alert('Game Over');
                clearInterval(timer);
                return;
            }
        }
        //看看蛇有没有撞在自己的身上
        for(var i=1; i<aSnake.length; i++)
        {
            if(aSnake[0].r==aSnake[i].r && aSnake[0].c==aSnake[i].c)
            {
                alert('Game Over');
                clearInterval(timer);
                return;
            }
        }

        //看看有没有吃到东西
        if(aSnake[0].c==aEat[0].c && aSnake[0].r==aEat[0].r)
        {
            aSnake.splice(aSnake.length-3, 0, aEat[0]);
            aEat.shift();

            if(aEat.length==0)
            {
                createEat();
            }
        }

        //移动蛇身子
        for(var i=aSnake.length-1; i>0; i--)
        {
            aSnake[i].r=aSnake[i-1].r;
            aSnake[i].c=aSnake[i-1].c;
            aSnake[i].d=aSnake[i-1].d;
        }

        //移动蛇头
        switch(dir)
        {
            case 'l':
                aSnake[0].c--;
                break;
            case 'r':
                aSnake[0].c++;
                break;
            case 't':
                aSnake[0].r--;
                break;
            case 'b':
                aSnake[0].r++;
                break;
        }

        for(var i=0; i<aSnake.length; i++)
        {
            setPos(aSnake[i]);
        }
    }

    document.onkeydown=function (ev)
    {
        var oEvent=ev||event;

        switch (oEvent.keyCode)
        {
            case 37 :
                dir='l';
                aSnake[0].d='l';
                break;
            case 38 :
                dir='t';
                aSnake[0].d='t';
                break;
            case 39 :
                dir='r';
                aSnake[0].d='r';
                break;
            case 40 :
                dir='b';
                aSnake[0].d='b';
                break;
        }
    }

    //2.放置吃的
    var aEat=[];
    var nowRow=0; //吃到第几行

    function createEat()
    {
        while(aEat.length<4)
        {
            var r=parseInt(Math.random()*R);
            var c=parseInt(Math.random()*C);

            var bFound=false;

            for(var i=0; i<aSnake.length; i++)
            {
                if(r==aSnake[i].r && c==aSnake[i].c)
                {
                    bFound=true;
                }
            }
            for(var i=0; i<aEat.length; i++)
            {
                if(r==aEat[i].r && c==aEat[i].c)
                {
                    bFound=true;
                }
            }

            if(!bFound)
            {

                var oNewDiv=document.createElement('div');
                oNewDiv.style.background='url(img/iconBg.jpg) -'+30*aEat.length+'px -'+30*nowRow+'px';
                oDiv.appendChild(oNewDiv);
                aEat.push({r: r, c: c, div: oNewDiv, type: 'eat'});
            }
        }

        for(i=0; i<aEat.length; i++)
        {
            setPos(aEat[i]);
        }
        nowRow++;
    }

    createEat();

};