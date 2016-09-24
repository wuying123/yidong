//1.删除数组中指定数字
  function arrDel(arr,val){
      var newArr=[];
       for(var i=0; i<arr.length;i++){
          if(arr[i]!=val){
          newArr.push(arr[i]);
          }
         
      }return newArr;
      
     }





//2.排序 回调函数
   function sort(arr,callback){
      
      var temp;
      
          for(var i=0; i<arr.length;i++){
                for(var j=i+1;j<arr.length;j++){
                    if(callback(arr[i],arr[j])){
                      temp=arr[j];
                      arr[j]=arr[i];
                      arr[i]=temp;
                     }                     
                }     
           }return arr;   
  }
 


//3.排序 类型   
   function order(arr,type){
      var type=type||'max'
      var temp;
      if(type=='min'){
          for(var i=0; i<arr.length;i++){
                for(var j=i+1;j<arr.length;j++){
                    if(arr[j]<arr[i]){
                      temp=arr[j];
                      arr[j]=arr[i];
                      arr[i]=temp;
                     }
                }     
           }return arr;
      }
      if(type=='max'){
          for(var i=0; i<arr.length;i++){
                for(var j=i+1;j<arr.length;j++){
                    if(arr[i]<arr[j]){
                      temp=arr[j];
                      arr[j]=arr[i];
                      arr[i]=temp;
                     }
                }     
           }return arr;
      }    
  }




//4.输出数组中最大或最小的数字  
   function getValue(arr,type){
     var type=type||'max';
     temp=arr[0];
     if(type=='max'){
        for(var i=0; i<arr.length;i++){    
           if(arr[i]>temp){
           temp=arr[i];
           }
      }return temp;
     }
    if(type=='min'){
       for(var i=0; i<arr.length;i++){
        if(arr[i]<temp){
          temp=arr[i];
        }
      }return temp;
   }
   }



//5.for 回调函数
   function each(a,callback){
       for(var i=0;i<a;i++){
          callback();
       }
     }





//6.删除重复的元素
/*开关*/
   function delRepeat(arr){
      var newArr=[];
       for(var i=0; i<arr.length;i++){
          var flag=true;
          for(var j=i+1;j<arr.length;j++){
            if(arr[i]==arr[j]){
              flag=false;
              break;     //效率
            }
          }if(flag){
          newArr.push(arr[i]);
         }
      }return newArr;
      
     }



//7.杨辉三角135
function triangle(){
var num=prompt('请输入行数');
    var str='<table>';
    for(var i=0;i<num;i++){
      str+='<tr>';
      for(var j=0;j<num-i;j++){
        str+='<td></td>';
      }
      for(var k=0;k<=2*i;k++){
          str+='<td>'+'*'+'</td>';
      }
      str+='</tr>';
    }str+='</table>';
     return str;
}





// 8.杨辉三角123
function triangle123(){
var num=prompt('请输入行数');
    var str='<table>';
    for(var i=0;i<num;i++){
      str+='<tr>';
      for(var j=0;j<num-i;j++){
        str+='<td></td>';
      }
      for(var k=0;k<=i;k++){
          str+='<td>'+'*'+'</td>';
        str+='<td></td>';
      }
      str+='</tr>';
    }str+='</table>';
    return str;
  }



  //9.随机取数
  function random(arr,num){
    var newArr=[];
    for(var i=0;i<num;i++){
      var j=Math.floor(Math.random()*arr.length);
      while(check(newArr,arr[j])){
                 var j=Math.floor(Math.random()*arr.length);
      }newArr.push(arr[j]);
    }return newArr; 
  }
  function check(array,k){
    for(var i=0;i<array.length;i++){
           if(array[i]==k){
            return true;
           }

    }return false;
  } 
  //10.  ie中选择className的方法
  function getClass(className,name){    
    var range=name?name:document;
    //判断浏览器类型
    if(document.getElementsByClassName){
      //w3c   var range=document.getElementsByClassName(name)[0]||document;
       return range.getElementsByClassName(className);       
    } 
    else{
      //新数组
      var arr=[];
      //获取所有元素                                           
      var all=range.getElementsByTagName('*');                  
        for(var i=0;i<all.length;i++){
           //挑选指定元素                  
          if(checkClass(all[i].className,className)){
            arr.push(all[i]);
            
          }
        }return arr;                                       
      }
    }
    function checkClass(str,innerStr){

      var arr=str.split(' ');
      for(var i=0;i<arr.length;i++){       
        if(arr[i]==innerStr){
          
          return true;         
        }                        
      } return false; 
    }
    



    //11. 奇怪???
   function getClass2(className,name){
    
    
    //var range==range?range:document;
    //判断浏览器类型
    if(document.getElementsByClassName){
      //w3c
       var range=document.getElementsByClassName(name)[0]||document;
       return range.getElementsByClassName(className);       
    } 
    else{
      //新数组
      var arr=[];
      var all=document.getElementsByTagName('*');                  
        for(var i=0;i<all.length;i++){
           //挑选指定元素                  
          if(checkClass(all[i].className,name)){
            var part=all[i].getElementsByTagName('*');
             for(var j=0;j<part.length;j++){
              if(checkClass(part[j].className,className)){
                arr.push(part[j]);
              }
            }
          }
        }return arr;
        }
      }
      //12.函数重载
     
      function getContent(obj,val){
        if(obj.innerText){
          if(val===undefined){
        return obj.innerText;
      }else{
        obj.innerText=val;
      }
        }else{
          if(val===undefined){
        return obj.textContent;
      }else{
        obj.textContent=val;
      }
        }
      }
      //13.获取指定元素样式
      function getStyle(obj,attr){
        if(obj.currentStyle){
          return obj.currentStyle[attr];
        }else{
          return getComputedStyle(obj,null)[attr];
        }
      } 
      //14. $函数
      function $2(selecter){
        switch(select.charAt(0)){
          case '.':return getClass(selecter.slice(1));break;
          case '#':return document.getElementById(selecter.slice(1));break;
          /*case/^[a-z][a-z1-6]{0,10}$/  返回boolean值*/ 
        }
      }
      function $(selecter,name){
        var range=name?name:document;
        if(selecter.charAt(0)=='.'){
          return getClass(selecter.slice(1),range);
        }
          else if(selecter.charAt(0)=='#'){
            return document.getElementById(selecter.slice(1));
          }
          else if(/^[a-z][a-z1-6]{0,10}$/.test(selecter)){
            return range.getElementsByTagName(selecter);
        }
      }
      //15 autoRadio
      function  autoRadio(obj,len,num){
        for (var i = 0; i < len; i++) {
              obj[i].style.display='none';
               }
               obj[num].style.display='block';
      }
     