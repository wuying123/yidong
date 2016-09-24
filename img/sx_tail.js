//页脚区模板
//可信网站标识使用
function KNET_change(eleId){ 
	var str= document.getElementById(eleId).href; 
	var str1 =str.substring(0,(str.length-6)); 
	str1+=KNET_RndNum(6); 
	document.getElementById(eleId).href=str1; 
} 
function KNET_RndNum(k){ 
	var rnd=""; 
	for (var i=0;i < k;i++) 
	rnd+=Math.floor(Math.random()*10); 
	return rnd; 
} 
$(document).ready(function(){		
    var link=document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "/sx_tail/sx_tail.css");
    var heads = document.getElementsByTagName("head");
    if(heads.length)
        heads[0].appendChild(link);
    else
    	document.documentElement.appendChild(link);
    

	  var linksJson = eval('[{"name":"新闻中心","href":"http://www.10086.cn/aboutus/news/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"诚聘英才","href":"http://job.10086.cn/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"采购信息","href":"http://b2b.10086.cn/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"企业合作","href":"http://www.10086.cn/aboutus/hezuo/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"联系我们","href":"http://www.10086.cn/web_notice/contact/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"站点导航","href":"http://www.10086.cn/web_notice/navigation/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"中国移动研究院","href":"http://labs.chinamobile.com/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"中国移动设计院","href":"http://www.cmdi.chinamobile.com/","editable":"3","responsible":"0","isEdit":"0","highLight":"0"},{"name":"网站地图","href":"http://www.sx.10086.cn/sitemap","editable":"3","responsible":"0","isEdit":"0","highLight":"0"}]');
	    
		var footer = document.getElementById("sx_tail");
		
		
		var divFooter = document.createElement("div");  
		divFooter.className = "footer";
		
		footer.appendChild(divFooter);
		
		var footerCon = document.createElement("div");
		footerCon.className = "footcon";
		divFooter.appendChild(footerCon);
		
		var pFooter1 = document.createElement("p");  
		
		footerCon.appendChild(pFooter1);
	
	
		for(var i=0;i<linksJson.length;i++){
			if("sx"!="xz" && linksJson[i].responsible == 1)continue;
			
				var a = document.createElement("a");  
				a.href=linksJson[i].href;
				a.innerHTML=linksJson[i].name;
				
				//弹出新窗口
				if(linksJson[i].name == '中国移动研究院' || linksJson[i].name == '中国移动设计院'){
					a.target = '_blank';
				}
				if("sx"=="hl" && linksJson[i].name =="网站地图"){
						a.href = "http://www.hl.10086.cn/resource/pub-page/map.html";
				}
				if("sx"=="cq" && linksJson[i].name =="网站地图"){
						a.href = "http://service.cq.10086.cn/svcquery/webSite2014.html";
				}
				if("sx"=="fj" && linksJson[i].name =="网站地图"){
						a.href = "http://www.fj.10086.cn/siteinfo/sitemap/index.html";
				}
				if("sx"=="xz" && linksJson[i].name =="网站地图"){
						a.href = "http://xz.10086.cn/service/operate/wtywdht.jsp";
				}
				if("sx"=="zj" && linksJson[i].name =="网站地图"){
						a.href = "http://www.zj.10086.cn/sitemap/";
				}
				
				pFooter1.appendChild(a);			
						
				if(i != linksJson.length - 1){
					var span = document.createElement("span");  
					span.innerHTML="&nbsp;|&nbsp;";
					pFooter1.appendChild(span);
				}
	
		}
	//西藏添加“天上西藏”
	
		if("sx"=="xz"){
			var spanLink1 = document.createElement("span");  
			spanLink1.innerHTML="&nbsp;|&nbsp;";
			pFooter1.appendChild(spanLink1);
			var tianshang=document.createElement("a");
			tianshang.href="http://www.ctibet.cn/";
			tianshang.target="_blank";
			tianshang.innerHTML="天上西藏";
			pFooter1.appendChild(tianshang);
		}
		//添加“友情链接”
		var spanLink = document.createElement("span");  
		spanLink.innerHTML="&nbsp;|&nbsp;";
		pFooter1.appendChild(spanLink);
		var aLink = document.createElement("a");
		aLink.href="http://www.10086.cn/web_notice/links/";
		aLink.innerHTML="友情链接";
		pFooter1.appendChild(aLink);
	
	
		var pFooter2 = document.createElement("p");  
		
		footerCon.appendChild(pFooter2);
		
		var spanFooter4 = document.createElement("span");  
		spanFooter4.innerHTML="&nbsp;";
		
		pFooter2.appendChild(spanFooter4);
		
		var spanFooter1 = document.createElement("span");  
		spanFooter1.innerHTML="掌上营业厅：";
		
		pFooter2.appendChild(spanFooter1);
	
	
	
		var aFooter1 = document.createElement("a");  
		aFooter1.href="http://wap.10086.cn";
		aFooter1.innerHTML="wap.10086.cn";
		
		pFooter2.appendChild(aFooter1);
		
		
		var spanFooter2 = document.createElement("span");  
		spanFooter2.innerHTML="&nbsp;语音自助服务：10086  短信营业厅：10086&nbsp;";
		
		pFooter2.appendChild(spanFooter2);
		
		
		var aFooter2 = document.createElement("a");  
		aFooter2.href="http://www.10086.cn/support/channel/self_service/";
		aFooter2.innerHTML="自助终端";
		
		pFooter2.appendChild(aFooter2);
		
		var spanFooter3 = document.createElement("span");  
		spanFooter3.innerHTML="&nbsp;";
		
		pFooter2.appendChild(spanFooter3);
		
		var aFooter3 = document.createElement("a");  
		aFooter3.href="http://www.10086.cn/support/channel/Entity1/";
		aFooter3.innerHTML="营业厅";
		
		pFooter2.appendChild(aFooter3);
		
		
		var spanFooter4 = document.createElement("span");  
		spanFooter4.innerHTML="&nbsp;";
		
		pFooter2.appendChild(spanFooter4);
		
		var aFooter4 = document.createElement("a");  
		aFooter4.href="http://www.10086.cn/cmccclient/index.htm";
		aFooter4.innerHTML="手机营业厅下载";
		
		pFooter2.appendChild(aFooter4);
		
		//添加经营许可证
		var pFooter3 = document.createElement("p");
		pFooter3.className = "xuke";
		pFooter3.innerHTML ="Copyright&copy;1999-2016&nbsp;&nbsp;中国移动&nbsp;&nbsp;版权所有";
		footerCon.appendChild(pFooter3);
		
		var pFooter4 = document.createElement("p");
		pFooter4.className = "xuke";
		footerCon.appendChild(pFooter4);
		var pFooter4_span = document.createElement("span");
		pFooter4_span.innerHTML = "中华人民共和国增值电信业务经营许可证&nbsp;&nbsp;经营许可证编号：A2.B1.B2-20100001";
		pFooter4.appendChild(pFooter4_span);
		
		var divFootGov = document.createElement("div");  
		divFootGov.className="footgov";
	
		if("sx" == "xj"){
			var spanXJGS =document.createElement("span");
			spanXJGS.id = "XJGS";
			var spanXJGSContext = document.createElement("span");
			spanXJGSContext.className = "xjgsContext";
			var aXJGS = document.createElement("a");
			aXJGS.href = "http://120.205.6.54:8088/ei/Ei!certificate.action?id=81828384497f068c014a623730be000a";
			aXJGS.tabindex ="-1";
			aXJGS.target="_blank";
			aXJGS.style.display="inline-block";
			var imgXJGS = document.createElement("img");
			imgXJGS.src="http://120.205.6.54:8088/ei/Ei!readEiImgByMemory.action";
			imgXJGS.width = 43;
			imgXJGS.height = 59;
			imgXJGS.style.border="none";
			imgXJGS.oncontextmenu="return false";
			
			aXJGS.appendChild(imgXJGS);
			spanXJGSContext.appendChild(aXJGS);
			spanXJGS.appendChild(spanXJGSContext);
			divFootGov.appendChild(spanXJGS);
		}
		//添加可信网站标识
		var KXWZYZ = document.createElement("div");
		KXWZYZ.setAttribute("id","KXWZ");
		KXWZYZ.className = "kxyz";
		divFootGov.appendChild(KXWZYZ);	
		
		var spanKXYZ = document.createElement("span");
		KXWZYZ.appendChild(spanKXYZ);	
		
		var aKXYZ = document.createElement("a");
		aKXYZ.setAttribute("id","urlknet");
		aKXYZ.href = "https://ss.knet.cn/verifyseal.dll?sn=e130905110100423008ilb000000&pa=500267";
		aKXYZ.tabindex ="-1";
		aKXYZ.target = "_blank";
		spanKXYZ.appendChild(aKXYZ);
		
		var imgKXYZ = document.createElement("img");
		imgKXYZ.alt = "&#x53EF;&#x4FE1;&#x7F51;&#x7AD9;";
		//imgKXYZ.style.border="true";     //ie下提示参数无效
		imgKXYZ.name = "KNET_seal";
		imgKXYZ.src = "/sx_tail/images/knetSealLogo.png";
		imgKXYZ.width = 128;
		imgKXYZ.height = 47;
		imgKXYZ.oncontextmenu="return false";
		imgKXYZ.setAttribute("onclick","KNET_change('urlknet')");
		aKXYZ.appendChild(imgKXYZ);
		   
	 	var divGovtxt = document.createElement("div");  
		divGovtxt.className = "govtxt";
		var pGov = document.createElement("p");  
		pGov.className="gov";
		pGov.innerHTML="<a href='http://www.miibeian.gov.cn/'>京ICP备05002571号</a>";
		divGovtxt.appendChild(pGov);
		divFootGov.appendChild(divGovtxt);
	
		divFooter.appendChild(divFootGov);
});