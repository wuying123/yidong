window.onload=function(){
    //1. banner头部导航
    var bn=$(".bn")[0];
    var item = document.getElementsByClassName("item",bn);
    var son = document.getElementsByClassName("son",bn);

    for (i = 0; i < item.length; i++) {
        item[i].index = i;
        item[i].onmouseover = function() {
            for (j = 0; j < son.length; j++) {
                son[j].style.display = "none";
            }
            son[this.index].style.display = "block";
        }
        item[i].onmouseout = function() {
            for (j = 0; j < son.length; j++) {
                son[j].style.display = "none";
            }
        }
    }

    // 2.banner图片

    // 获取类名 标签名
    var bn=$("bn")[0];
    var mid=$(".middle",bn)[0];
	var as=$("a", mid);
	var len=as.length;
    var lis=$("li",mid);
    var zsL=$(".zsL",mid)[0];
    var zsR=$(".zsR",mid)[0];
    var zs=$(".zs",mid)[0];

    var num=0;
    var flag=true;

    // 最初状态  显示第一张  影藏后面的
     for(var i=0;i<len;i++){
        if(i==0){
        	continue;
            as[0].style.opacity=1;
        }else{
        	as[i].style.opacity=0;
        }
	}

    // 循环
    var t;
    t=setInterval(move,1000);

    //鼠标点上banner循环停止
    mid.onmouseover=function(){
        clearInterval(t);
        animate(zs,{opacity:1});
    } 

    // 鼠标移开banner 循环开始
    mid.onmouseout=function(){
        t=setInterval(move,1000);
        animate(zs,{opacity:0});
    }
    
    // 左手
    zsL.onclick=function(){
         if(flag){
           moveL();
           flag=false;
         }
    }
    zsR.onclick=function(){
         if(flag){
           move();
           flag=false;
         }
    }

    // 鼠标点上轮播小圆点 的一些效果

    for(var i=0;i<len;i++){
        lis[i].index=i;
        lis[i].onclick=function(){

            // 解决bug
            num=this.index;

            
            for(var j=0;j<len;j++){
                animate(as[j],{opacity:0});
                lis[j].style.background=" #C9B0B1";
            }
             animate(as[this.index],{opacity:1},function(){
                flag=true;
             });
            lis[this.index].style.background="#E62589";
        }
    }
    // 定义move函数  循环时的样式
    function move(){
        num++;
        if(num==len){
            num=0;
            lis[0].style.background="#E62589";
        }
        for(var i=0;i<len;i++){
            animate(as[i],{opacity:0});
            lis[i].style.background="#C9B0B1";
        }
        animate(as[num],{opacity:1},function(){
            flag=true;
        });
        lis[num].style.background="#E62589";
    }
    // 左手函数
     function moveL(){
        num--;
        if(num<0){
            num=len-1;
            lis[0].style.background="#E62589";
        }
        for(var i=0;i<len;i++){
            animate(as[i],{opacity:0});
            lis[i].style.background="#C9B0B1";
        }
        animate(as[num],{opacity:1},function(){
            flag=true;
        });
        lis[num].style.background="#E62589";
    }


    //下拉框
    var xl=$("#xl");
    var cson=$(".icon-son")[0];
    xl.onmouseover=function(){
       cson.style.display="block";
    }
    xl.onmouseout=function(){
       cson.style.display="none";
    }

    // 二维码
    var ybb=$("#ybb");
    var sjm=$("#sjm");
    ybb.onmouseover=function(){
        sjm.style.display="block";
    }
    ybb.onmouseout=function(){
        sjm.style.display="none";
    }

    var dlz=$("#dlz");
    var srk=$("#srk");
    dlz.onmouseover=function(){
        srk.style.display="block";
    }
    dlz.onmouseout=function(){
        srk.style.display="none";
    }

    // 无缝轮播
    var lb=$(".lb")[0];
    var mgs=$("img",lb);
    var zs1=$(".zs1",lb)[0];
    var zs2=$(".zs2",lb)[0];
    var ws=parseInt(getStyle(mgs[0],"width"));
    var pre=0;
    var next=0;
    var flag=true;
    var lens=mgs.length;
    for(var i=0;i<lens;i++){
        if(i==0){
         continue;   
        }
        mgs[i].style.left=ws+"px";
}
    var t=setInterval(moveZ,3000);
    lb.onmouseover=function(){
        clearInterval(t);
        zs1.style.display="block";
        zs2.style.display="block";
    }
    lb.onmouseout=function(){
        t=setInterval(moveZ,3000);
        zs1.style.display="none";
        zs2.style.display="none";
    }
    zs1.onclick=function(){
        if(flag){
         moveZ();
         flag=false;
        }
    }
    zs2.onclick=function(){
         if(flag){
         moveY();
         flag=false;
        }
    }
    function moveZ(){
        next++;
        if(next==lens){
            next=0;
        }
        mgs[next].style.left=ws+"px";
        animate(mgs[pre],{left:-ws},Tween.Quad.easeInOut);
        animate(mgs[next],{left:0},Tween.Quad.easeInOut,function(){
            flag=true;
        });
        pre=next;
    }
    function moveY(){
        next--;
        if(next<0){
            next=lens-1;
        }
        mgs[next].style.left=-ws+"px";
        animate(mgs[pre],{left:ws},Tween.Quad.easeInOut);
        animate(mgs[next],{left:0},Tween.Quad.easeInOut,function(){
            flag=true;
        });
        pre=next;
    }

    






























}