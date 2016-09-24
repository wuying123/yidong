/*
	4.0版首页立即充值
	需结合/js10086/index_new.js、/js10086/pcommon.js使用
	上线需要插码，插码需要配合基本码实现
	创建人：Jeffrey
	修改时间：2015-02-16
*/


var cz_provurls = new Array();
cz_provurls["bj"] = "http://www.bj.10086.cn/www/cmpay.jsp";
cz_provurls["gd"] = "http://gd.10086.cn/commodity/easypay/index.jsp";
cz_provurls["sh"] = "http://www.sh.10086.cn/sh/wsyyt/busi/1491.jsp";
cz_provurls["tj"] = "http://service.tj.10086.cn/app?service=page/payfeeonlinenew.PayFeeIndex&listener=initPage";
cz_provurls["cq"] = "http://service.cq.10086.cn/CHOQ/service/pay.jsp";
cz_provurls["ln"] = "http://www.ln.10086.cn/service/fee/onlinepay.xhtml";
cz_provurls["js"] = "http://service.js.10086.cn/wscz.jsp#WSCZYL";
cz_provurls["hb"] = "http://www.hb.10086.cn/service/payByBank!initExecute.action?menuid=netPay";
cz_provurls["sc"] = "http://www.sc.10086.cn/pay/bankpaymobile.jsp";
cz_provurls["sn"] = "https://service.sn.10086.cn/pay/app?service=page/BankYHKCash&listener=PayOnlineFast";
cz_provurls["he"] = "http://www.he.10086.cn/service/fee/paymentAction!initPaymentByBank.action";
cz_provurls["sx"] = "http://service.sx.10086.cn/pay.html";
cz_provurls["ha"] = "https://service.ha.10086.cn/service/pay/bank-card-pay.action?menuCode=1022";
cz_provurls["jl"] = "http://www.jl.10086.cn/service/billservice/pay/index.jsp";
cz_provurls["hl"] = "http://www.hl.10086.cn/service/fee/mobilepay/index_bankpay.jsp";
cz_provurls["nm"] = "http://www.nm.10086.cn/onlinerecharge/index.xhtml";
cz_provurls["sd"] = "http://www.sd.10086.cn/eMobile/jsp/common/prior.jsp?menuid=netPay";
cz_provurls["ah"] = "http://ah.10086.cn/czjf";
cz_provurls["zj"] = "http://service.zj.10086.cn/cz/";
cz_provurls["fj"] = "http://www.fj.10086.cn/service/fj_comm/include/frame.jsp?targetUrl=/service/mobilepay/toPayIndex.do?tagIndex=5";
cz_provurls["hn"] = "https://www.hn.10086.cn/service/fee/payment/bankPay.jsp";
cz_provurls["gx"] = "http://service.gx.10086.cn/fee/czjf2.jsp";
cz_provurls["jx"] = "http://service.jx.10086.cn/service/jxcontent/memberZone/onlinepay/payment.jsp";
cz_provurls["gz"] = "http://www.gz.10086.cn/upp/web/payfee/payTheFee/PayTheFeeAction?tag_id=TAG001&action=initPage";
cz_provurls["yn"] = "http://www.yn.10086.cn/service/app?service=page/payonline.BankPayNewEC&listener=secondInitPage";
cz_provurls["xz"] = "http://www.xz.10086.cn/service/fee/bankPayNew.jsp";
cz_provurls["hi"] = "http://www.hi.10086.cn/service/payfeenew/bankNumberChoose.do";
cz_provurls["gs"] = "http://www.gs.10086.cn/gs_obsh_service/SJZF_CZ.jsp";
cz_provurls["nx"] = "http://www.nx.10086.cn/service/payment/index.jsp";
cz_provurls["qh"] = "http://qh.10086.cn/ics/app?service=page/BankYHK&listener=initPage";
cz_provurls["xj"] = "http://www.xj.10086.cn/service/fee/payfeeonline/PayFeeDiscount/";
var notonline = ",";//未上线的省份用“,”包围起来组成字符串，如：“,qh,zj,”。首尾的“,”不可省略
var cmcurprov="sh";//插码默认省，正常默认值不会被使用


var cz_pinfo_status = 0;//未获得
var cz_pinfo_last = '';



//动态获取省份相关信息
function fun_pinfo() {
	fun_pinfo2(false);
}

function fun_pinfo2(needShowWait){
	var pho = document.getElementById("cz_pho").value;
	
	if(/^\d+$/.test(pho)){
		if(pho.length>=3){
			var sph = "";
			var checkb = false;
			if(pho.length>=7){
				sph = pho.substring(0,7);
				checkb = (isPhoneNumber(sph+"1234")==0);
			} else if(pho.length==11){
				sph = pho;
				checkb = (isPhoneNumber(sph)==0);
			} else {
				sph = pho.substring(0,3);
				checkb = (isPhoneNumber(sph+"12345678")==0);
			}
			if(checkb){
				fun_hiddenerr();
				if((pho.length==7 || pho.length==11) && cz_pinfo_last != pho.substring(0,7)){
					cz_pinfo_status = 0;
				}
				if((pho.length==7 || pho.length==11) && cz_pinfo_status == 0){
					//执行
					cz_pinfo_last=pho.substring(0,7);
					var wrong = function(){
						fun_showerr("已断开,请重试");
					}
					var tid = null;
					if(needShowWait){
						fun_showerr("请稍候...");
						tid = window.setTimeout(wrong, 5000);
					}
					//Ajax请求服务器，获得结果（是否正确获得信息,省URL或错误代码）
					var resfun= function(rst){
						var rs = rst.split(" ");
						if(rs[0]=="Y"){
							var bif = getProvBrief(rs[1]);
							var nomsg = "归属省未开通该项业务";
							nomsg = "非本省号码";
							if(notonline.indexOf("," + bif + ",") != -1){
								clearTO(tid);
								cz_pinfo_status=0;
								fun_showerr(nomsg);
							} else {
								var acurl = $('<span/>').html(json601[1][2].href).text();
								if(acurl==null || acurl==""){//正常不会被执行
									clearTO(tid);
									cz_pinfo_status=0;
									fun_showerr(nomsg);
								} else {
									/*document.getElementById("cz_form").action=acurl;
									cmcurprov=bif;
									cz_pinfo_status=1;//已获得
									clearTO(tid);
									fun_hiddenerr();*/
									//alert(location.pathname.toLowerCase().indexOf(bif));
									if(location.pathname.toLowerCase().indexOf(bif)!=-1){
										document.getElementById("cz_form").action=acurl;
										cmcurprov=bif;
										cz_pinfo_status=1;//已获得
										clearTO(tid);
										fun_hiddenerr();
									}
									else{
										clearTO(tid);
										cz_pinfo_status=0;
										fun_showerr(nomsg);
									}
								}
							}
						} else if (rs[0]=="N"){
							clearTO(tid);
							cz_pinfo_status=0;
							fun_showerr("请输入正确的移动号码");
						}
					}

					//执行Ajax
					var majax = false;
					if (window.XMLHttpRequest) {
						majax = new XMLHttpRequest();
					} else if (window.ActiveXObject) {
						majax = new ActiveXObject("Microsoft.XMLHTTP");
					}
					if (majax) {
						try{
							majax.open("GET", "/service/prov/prov.jsp?phone=" + pho.substring(0,7) + "1234",false);
							majax.onreadystatechange = function() {
								if (majax.readyState == 4) {
									if(majax.status == 200){
										resfun(majax.responseText);
									}else{
										clearTO(tid);
										cz_pinfo_status=0;
										if(needShowWait){
											fun_showerr("已断开,请重试");
										}
									}
								}
							}
							majax.send(null);
						}catch(te){
							cz_pinfo_status=0;
							if(needShowWait){
								fun_showerr("已断开,请重试");
							}
						}
					} else {
						clearTO(tid);
						if(needShowWait){
							alert("您的浏览器不支持Ajax实现!");
						}
					}
				}
			} else {
				fun_showerr("请输入正确的移动号码");
			}
		} else {
			fun_hiddenerr();
		}
	} else if (pho.length>0){
		fun_showerr("请输入正确的移动号码");
	} else {
		fun_hiddenerr();
	}
}

//页面判断、表单提交
function fun_czsubmit(){
	//fun_chama("INDEX_LJCZ_ZS");
	
	var cz_pho = $("#cz_pho").get(0);
	var pho = cz_pho.value;
	
	if (pho == cz_pho.defaultValue) {
		$("#cz_pho").css("color","#ff0000");
		$("#cz_pho").css("font-family","微软雅黑");
		return;
	}
	
	
	if (isPhoneNumber(pho) != 0) {
		fun_showerr("请输入正确的移动号码");
		fun_chama("INDEX_LJCZ_SB");
		return;
	}

	//Add Cookie
	setCookie("czonehis", pho);

	var sum = document.getElementById("cz_val").value;
	if(sum!=30 && sum != 50 && sum!=100 && sum!=300 && sum!=500 && sum!=0){//正常不会被执行
		fun_showerr("请重新选择金额");
		fun_chama("INDEX_LJCZ_SB");
		return;
	}
	if (!fun_iserrblock()) {
		if (cz_pinfo_status==1) {
			cz_pinfo_status = 0;
			fun_chama("INDEX_LJCZ_" + cmcurprov);
			fun_chama2();
			document.getElementById("cz_form").submit();
		}
		else if(cz_pinfo_status==0) {
			fun_pinfo2(true);
			if(cz_pinfo_status == 1){
				cz_pinfo_status = 0;
				fun_chama("INDEX_LJCZ_" + cmcurprov);
				fun_chama2();
				document.getElementById("cz_form").submit();
			}
			else {
				fun_chama("INDEX_LJCZ_SB");
			}
		}
	}else{
		fun_chama("INDEX_LJCZ_SB");
	}
}


function fun_czsubmit2(){
	//fun_chama("INDEX_LJCZ_ZS");
	var pho = document.getElementById("cz_pho").value;
	
	if (pho == "请输入手机号码") {
		$("#cz_pho").css("color","#ff0000");
		$("#cz_pho").css("font-family","微软雅黑");
		return;
	} 
	
	if(isPhoneNumber(pho) != 0){
		fun_showerr("请输入正确的移动号码");
		fun_chama("INDEX_LJCZ_SB");
		return;
	}

	//Add Cookie
	setCookie("czonehis", pho);

	var sum = document.getElementById("cz_val").value;
	if(sum!=30 && sum != 50 && sum!=100 && sum!=300 && sum!=500 && sum!=0){//正常不会被执行
		fun_showerr("请重新选择金额");
		fun_chama("INDEX_LJCZ_SB");
		return;
	}
	if (!fun_iserrblock()) {
		if (cz_pinfo_status==1) {
			cz_pinfo_status = 0;
			fun_chama("INDEX_LJCZ_" + cmcurprov);
			fun_chama2();
			document.getElementById("cz_form").submit();
		}
		else if(cz_pinfo_status==0) {
			fun_pinfo2(true);
			if(cz_pinfo_status == 1){
				cz_pinfo_status = 0;
				fun_chama("INDEX_LJCZ_" + cmcurprov);
				fun_chama2();
				document.getElementById("cz_form").submit();
			}
			else {
				fun_chama("INDEX_LJCZ_SB");
			}
		}
	}else{
		fun_chama("INDEX_LJCZ_SB");
	}
}


//插码函数，避免异常
function fun_chama(sign){
	try{
		if (typeof(_tag)!= 'undefined'){
			_tag.dcsMultiTrack('WT.event', sign);
		}
	}catch(t){}
}

//分号码、金额插码
function fun_chama2(){
	try{
		var amountobj = document.getElementById("cz_val");
		var mobileNoobj = document.getElementById("cz_pho");
		if (typeof(_tag)!= 'undefined'){
			_tag.dcsMultiTrack('WT.INDEX_mobile',mobileNoobj.value,'WT.INDEX_money',amountobj.value);
		}
	}catch(t){}
}

//初始化手机号码框
function fun_initpho(){
	var pho = getCookie("czonehis");
	if(pho!=null && isPhoneNumber(pho) == 0){
		document.getElementById("cz_pho").value=pho;
	}
}

function fun_showerr(str){
	setInnerText(document.getElementById("cz_div_notice"),str);
	fun_showdiv("cz_div_notice");
}

function fun_hiddenerr(){
	fun_hiddendiv("cz_div_notice");
}

function fun_iserrblock(){
	return (document.getElementById("cz_div_notice").style.display=="block");
}

function fun_tocamountdis(){
	var o = document.getElementById("cz_amall");
	if(o.style.display=="block"){
		o.style.display="none"
	} else {
		o.style.display="block"
	}
}

//清除定时任务
function clearTO(tid){
	try{
		window.clearTimeout(tid);
	}catch(e){}
}

function setInnerText(obj,str){
	while (obj.childNodes.length != 0) {
		obj.removeChild(obj.childNodes[0]);
	}
	
	obj.appendChild(document.createTextNode(str));
}

function fun_showfs(){
	fun_showdiv("cz_fs");
}

function fun_hidfs(){
	fun_hiddendiv("cz_fs");
}

function fun_showdiv(oid){
	var o = document.getElementById(oid);
	if(o){
		o.style.display = "block";
	}
}

function fun_hiddendiv(oid){
	var o = document.getElementById(oid);
	if(o){
		o.style.display = "none";
	}
}

function fun_update_samount(amount){
	// setInnerText(document.getElementById("cz_amdis"),"充值"+amount + "元");
	
	if (amount == 0) {
		document.getElementById("cz_val").value = "";
	}
	else {
		document.getElementById("cz_val").value = amount;
	}
	

	$("#cz0").attr("class","");
	$("#cz30").attr("class","");
	$("#cz50").attr("class","");
	$("#cz100").attr("class","");
	$("#cz300").attr("class","");
	$("#cz500").attr("class","");
	var czsubmit_src = "";
    $(".czsubmit span").html(czsubmit_src);
	
	
	if(amount == 0){ $("#cz0").attr("class","on");rebate("0");}
	if(amount == 30){ $("#cz30").attr("class","on");rebate("30");}
	if(amount == 50) {$("#cz50").attr("class","on");rebate("50");}
	if(amount == 100){ $("#cz100").attr("class","on");rebate("100");}
	if(amount == 300){ $("#cz300").attr("class","on");rebate("300");}
	if(amount == 500){ $("#cz500").attr("class","on");rebate("500");}

}


function rebate(money){
	var jsonURL = './depositprompt'+getProvNum(previewProv)+'.json';
					
	$.getJSON(jsonURL,function(data){
		var czsubmit_src = "";
		for(var i = 0;i<data['data'].length;i++){
			if(money==data['data'][i].money_sum){
				czsubmit_src = $('<span/>').html(data['data'][i].special_offer).text();
				break;
			}
		}
		$(".czsubmit span").html(czsubmit_src);
	});
	
}




	//省份相关数据
var base_provinces = new Array();
var i_prov = 0;
base_provinces[i_prov++] = new Array("100","bj","北京");
base_provinces[i_prov++] = new Array("200","gd","广东");
base_provinces[i_prov++] = new Array("210","sh","上海");
base_provinces[i_prov++] = new Array("220","tj","天津");
base_provinces[i_prov++] = new Array("230","cq","重庆");
base_provinces[i_prov++] = new Array("240","ln","辽宁");
base_provinces[i_prov++] = new Array("250","js","江苏");
base_provinces[i_prov++] = new Array("270","hb","湖北");
base_provinces[i_prov++] = new Array("280","sc","四川");
base_provinces[i_prov++] = new Array("290","sn","陕西");
base_provinces[i_prov++] = new Array("311","he","河北");
base_provinces[i_prov++] = new Array("351","sx","山西");
base_provinces[i_prov++] = new Array("371","ha","河南");
base_provinces[i_prov++] = new Array("431","jl","吉林");
base_provinces[i_prov++] = new Array("451","hl","黑龙江");
base_provinces[i_prov++] = new Array("471","nm","内蒙古");
base_provinces[i_prov++] = new Array("531","sd","山东");
base_provinces[i_prov++] = new Array("551","ah","安徽");
base_provinces[i_prov++] = new Array("571","zj","浙江");
base_provinces[i_prov++] = new Array("591","fj","福建");
base_provinces[i_prov++] = new Array("731","hn","湖南");
base_provinces[i_prov++] = new Array("771","gx","广西");
base_provinces[i_prov++] = new Array("791","jx","江西");
base_provinces[i_prov++] = new Array("851","gz","贵州");
base_provinces[i_prov++] = new Array("871","yn","云南");
base_provinces[i_prov++] = new Array("891","xz","西藏");
base_provinces[i_prov++] = new Array("898","hi","海南");
base_provinces[i_prov++] = new Array("931","gs","甘肃");
base_provinces[i_prov++] = new Array("951","nx","宁夏");
base_provinces[i_prov++] = new Array("971","qh","青海");
base_provinces[i_prov++] = new Array("991","xj","新疆");
base_provinces[i_prov++] = new Array("000","","集团");
var default_prov = new Array("210","sh","上海");

//根据省份名称(北京)、省份三位识别码(100)、省份两位简称(bj)，返回省份三位识别码
function getProvNum(sim){
	var pnum = "";
	for(var i=0;i<=31;i++){
		if(base_provinces[i][0] == sim || base_provinces[i][1] == sim || base_provinces[i][2] == sim){
			pnum = base_provinces[i][0];
			break;
		}
	}
	return pnum;
}





	/*
	*   快捷服务翻转
	*   by SUKI_SUN
	*/
	var temp = 0;

	$(document).ready(function(){
		
		// 初始url
		$('#kuaijiefuwu_1').attr("href",$('<span/>').html(json601[0][1].href).text());
		$('#kuaijiefuwu_2').attr("href",$('<span/>').html(json601[0][2].href).text());
		$('#kuaijiefuwu_3').attr("href",$('<span/>').html(json601[0][3].href).text());
		$('#kuaijiefuwu_4').attr("href",$('<span/>').html(json601[0][4].href).text());
		$('#kuaijiefuwu_5').attr("href",$('<span/>').html(json601[0][5].href).text());
			
		
		$('#kuaijiefuwu_0').click(function(){
			
			if(temp==0){
				$('.btns a').html("");
				$('.xtip').hide();
				$('.btns a').animate({ width: "0px",left: "41px"}, 250,function(){bbn()});
				$('.btns a').animate({ width: "92px",left: "0px"}, 250,function(){temp=1;});
			}
			setTimeout(function(){
				$('#kuaijiefuwu_0').html(json601[0][6].name).attr("href",$('<span/>').html(json601[0][6].href).text()).css('overflow','visible');
				$('#kuaijiefuwu_1').html(json601[0][7].name).attr("href",$('<span/>').html(json601[0][7].href).text()).css('overflow','visible');
				$('#kuaijiefuwu_2').html(json601[0][8].name).attr("href",$('<span/>').html(json601[0][8].href).text()).css('overflow','visible');
				$('#kuaijiefuwu_3').html(json601[0][9].name).attr("href",$('<span/>').html(json601[0][9].href).text()).css('overflow','visible');
				$('#kuaijiefuwu_4').html(json601[0][10].name).attr("href",$('<span/>').html(json601[0][10].href).text()).css('overflow','visible');
				$('#kuaijiefuwu_5').html(json601[0][11].name).css('overflow','visible');
				},500);
		});
		
		
		$('#kuaijiefuwu_5').click(function(){

			if(temp==1){
				$('.btns a').html("");
				$('.btns a').animate({ width: "0px",left: "41px"}, 250,function(){ccn()});
				$('.btns a').animate({ width: "92px",left: "0px"}, 250,function(){temp=0;});
			}
			setTimeout(function(){
				$('#kuaijiefuwu_0').html(json601[0][0].name).css('overflow','visible');
				$('#kuaijiefuwu_1').html(json601[0][1].name).attr("href",$('<span/>').html(json601[0][1].href).text()).css('overflow','visible');
				$('#kuaijiefuwu_2').html(json601[0][2].name).attr("href",$('<span/>').html(json601[0][2].href).text()).css('overflow','visible');
				$('#kuaijiefuwu_3').html(json601[0][3].name).attr("href",$('<span/>').html(json601[0][3].href).text()).css('overflow','visible');
				$('#kuaijiefuwu_4').html(json601[0][4].name).attr("href",$('<span/>').html(json601[0][4].href).text()).css('overflow','visible');
				$('#kuaijiefuwu_5').html(json601[0][5].name).attr("href",$('<span/>').html(json601[0][5].href).text()).css('overflow','visible');
				$('.xtip').show();
				},500);
		});

	});

function bbn(){
	var strprovcity = getProvCity(); // 获得省市代码
	
	document.getElementById("kuaijiefuwu_0").className="q6";
	document.getElementById("kuaijiefuwu_0").setAttribute("target","_blank");
	document.getElementById("kuaijiefuwu_0").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_HFCX_YECX_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_0").setAttribute("href",$('<span/>').html(json601[0][6].href).text());
	document.getElementById("kuaijiefuwu_1").className="q7";
	document.getElementById("kuaijiefuwu_1").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_HFCX_TCYL_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_1").setAttribute("href",$('<span/>').html(json601[0][7].href).text());
	document.getElementById("kuaijiefuwu_2").className="q8";
	document.getElementById("kuaijiefuwu_2").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_HFCX_ZDCX_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_2").setAttribute("href",$('<span/>').html(json601[0][8].href).text());
	document.getElementById("kuaijiefuwu_3").className="q9";
	document.getElementById("kuaijiefuwu_3").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_HFCX_XDCX_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_3").setAttribute("href",$('<span/>').html(json601[0][9].href).text());
	document.getElementById("kuaijiefuwu_4").className="q10";
	document.getElementById("kuaijiefuwu_4").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_HFCX_DGYW_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_4").setAttribute("href",$('<span/>').html(json601[0][10].href).text());
	document.getElementById("kuaijiefuwu_5").className="q11";
	document.getElementById("kuaijiefuwu_5").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_HFCX_FH_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_5").removeAttribute("target");
	document.getElementById("kuaijiefuwu_5").setAttribute("href","javascript:void(0)");
}

function ccn(){
	var strprovcity = getProvCity(); // 获得省市代码
	
	document.getElementById("kuaijiefuwu_0").className="q0";
	document.getElementById("kuaijiefuwu_0").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_HFCX_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_0").removeAttribute("target");
	document.getElementById("kuaijiefuwu_0").setAttribute("href","javascript:void(0)");
	document.getElementById("kuaijiefuwu_1").className="q1";
	document.getElementById("kuaijiefuwu_1").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_LLCX_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_1").setAttribute("href",$('<span/>').html(json601[0][1].href).text());
	document.getElementById("kuaijiefuwu_2").className="q2";
	document.getElementById("kuaijiefuwu_2").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_ZFZQ_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_2").setAttribute("href",$('<span/>').html(json601[0][2].href).text());
	document.getElementById("kuaijiefuwu_3").className="q3";
	document.getElementById("kuaijiefuwu_3").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_JFDH_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_3").setAttribute("href",$('<span/>').html(json601[0][3].href).text());
	document.getElementById("kuaijiefuwu_4").className="q4";
	document.getElementById("kuaijiefuwu_4").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_YHCX_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_4").setAttribute("href",$('<span/>').html(json601[0][4].href).text());
	document.getElementById("kuaijiefuwu_5").className="q5";
	document.getElementById("kuaijiefuwu_5").setAttribute("onclick", "javascript:if(typeof(_tag)!= 'undefined'){_tag.dcsMultiTrack('WT.event','INDEX_YWBL_" + strprovcity + "')}");
	document.getElementById("kuaijiefuwu_5").setAttribute("target","_blank");
	document.getElementById("kuaijiefuwu_5").setAttribute("href",$('<span/>').html(json601[0][5].href).text());
}

// 根据cookie返回归属省市,如果cookie中不存在归属省市,则返回000|000.
function getProvCity() {
	var rv = "000|000";
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (2 <= arr.length && "CmLocation" == arr[0]) {
            rv = arr[1];
            break;
        }
    }
	return rv;
}




//省份相关数据
var base_provinces = new Array();
var i_prov = 0;
base_provinces[i_prov++] = new Array("100","bj","北京");
base_provinces[i_prov++] = new Array("200","gd","广东");
base_provinces[i_prov++] = new Array("210","sh","上海");
base_provinces[i_prov++] = new Array("220","tj","天津");
base_provinces[i_prov++] = new Array("230","cq","重庆");
base_provinces[i_prov++] = new Array("240","ln","辽宁");
base_provinces[i_prov++] = new Array("250","js","江苏");
base_provinces[i_prov++] = new Array("270","hb","湖北");
base_provinces[i_prov++] = new Array("280","sc","四川");
base_provinces[i_prov++] = new Array("290","sn","陕西");
base_provinces[i_prov++] = new Array("311","he","河北");
base_provinces[i_prov++] = new Array("351","sx","山西");
base_provinces[i_prov++] = new Array("371","ha","河南");
base_provinces[i_prov++] = new Array("431","jl","吉林");
base_provinces[i_prov++] = new Array("451","hl","黑龙江");
base_provinces[i_prov++] = new Array("471","nm","内蒙古");
base_provinces[i_prov++] = new Array("531","sd","山东");
base_provinces[i_prov++] = new Array("551","ah","安徽");
base_provinces[i_prov++] = new Array("571","zj","浙江");
base_provinces[i_prov++] = new Array("591","fj","福建");
base_provinces[i_prov++] = new Array("731","hn","湖南");
base_provinces[i_prov++] = new Array("771","gx","广西");
base_provinces[i_prov++] = new Array("791","jx","江西");
base_provinces[i_prov++] = new Array("851","gz","贵州");
base_provinces[i_prov++] = new Array("871","yn","云南");
base_provinces[i_prov++] = new Array("891","xz","西藏");
base_provinces[i_prov++] = new Array("898","hi","海南");
base_provinces[i_prov++] = new Array("931","gs","甘肃");
base_provinces[i_prov++] = new Array("951","nx","宁夏");
base_provinces[i_prov++] = new Array("971","qh","青海");
base_provinces[i_prov++] = new Array("991","xj","新疆");
base_provinces[i_prov++] = new Array("000","","集团");
var default_prov = new Array("210","sh","上海");

//根据省份名称(北京)、省份三位识别码(100)、省份两位简称(bj)，返回省份三位识别码
function getProvCode(sim){
	var pname = "";
	for(var i=0;i<=31;i++){
		if(base_provinces[i][0] == sim || base_provinces[i][1] == sim || base_provinces[i][2] == sim){
			pname = base_provinces[i][0];
			break;
		}
	}
	return pname;
}

//根据省份名称(北京)、省份三位识别码(100)、省份两位简称(bj)，返回省份两位简称
function getProvBrief(sim){
	var pname = "";
	for(var i=0;i<=31;i++){
		if(base_provinces[i][0] == sim || base_provinces[i][1] == sim || base_provinces[i][2] == sim){
			pname = base_provinces[i][1];
			break;
		}
	}
	return pname;
}

//根据省份名称(北京)、省份三位识别码(100)、省份两位简称(bj)，返回省份名称
function getProvName(sim){
	var pname = "";
	for(var i=0;i<=31;i++){
		if(base_provinces[i][0] == sim || base_provinces[i][1] == sim || base_provinces[i][2] == sim){
			pname = base_provinces[i][2];
			break;
		}
	}
	return pname;
}

var cur_prov_code = "";
function initProvCodeByIp() {
	cur_prov_code = "";
	var XMLHttpRequestObject = false;
	if (window.XMLHttpRequest) {
		XMLHttpRequestObject = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if (XMLHttpRequestObject) {
		XMLHttpRequestObject.open("GET", "/service/ip/ip.jsp",false);
		XMLHttpRequestObject.onreadystatechange = function() {
			if (XMLHttpRequestObject.readyState == 4
				&& XMLHttpRequestObject.status == 200) {
				cur_prov_code = getProvCode(XMLHttpRequestObject.responseText.substring(0,3));
			}
		}
		XMLHttpRequestObject.send(null);
	}
}
function initProvCodeByCookie(){
	cur_prov_code = "";
	var strCookie = document.cookie;
	var arrCookie = strCookie.split("; ");
	for ( var i = 0; i < arrCookie.length; i++) {
		var arr = arrCookie[i].split("=");
		if ("CmProvid" == arr[0]) {
			cur_prov_code = getProvCode(arr[1]);
			break;
		}
	}
}
function initProvCodeByUrl(){
	cur_prov_code = "";
	var curl = document.URL;
	for(var i=0;i<=30;i++){
		if(curl.indexOf("/" + base_provinces[i][1] + "/") != -1){
			cur_prov_code = base_provinces[i][1];
			break;
		}
	}
}

//根据URL获取当前登录省份两位简称
function getCurProvCodeByUrl(){
	initProvCodeByUrl();
	return getProvCode(cur_prov_code);
}

//根据Cookie获取当前登录省份两位简称
function getCurProvCodeByCookie(){
	initProvCodeByCookie();
	return getProvCode(cur_prov_code);
}

//根据IP获取当前登录省份两位简称
function getCurProvCodeByIp(){
	initProvCodeByIp();
	return getProvCode(cur_prov_code);
}

//初始化省份数据
function initProvCode(){
	initProvCodeByUrl();//第一步：按URL地址初始化
	if(getProvCode(cur_prov_code) == "000"){
		initProvCodeByCookie();//第二步：按Cookie初始化
	}
	if(getProvCode(cur_prov_code) == "000"){
		initProvCodeByIp();//第三步：按IP初始化
	}
}


//获取当前登录省份三位代码
function getCurProvCode(){
	initProvCode();
	return getProvCode(cur_prov_code);
}

//获取当前登录省份两位简称
function getCurProvBrief(){
	initProvCode();
	return getProvBrief(cur_prov_code);
}

//获取当前登录省份名称
function getCurProvName(){
	initProvCode();
	return getProvName(cur_prov_code);
}

//获取当前登录省份三位代码，默认北京
function getCurProvCode2(){
	var rv = "";
	initProvCode();
	if(getProvCode(cur_prov_code) == "000"){
		rv = default_prov[0];
	} else {
		rv = getProvCode(cur_prov_code);
	}
	return rv;
}

//获取当前登录省份两位简称，默认北京
function getCurProvBrief2(){
	var rv = "";
	initProvCode();
	if(getProvCode(cur_prov_code) == "000"){
		rv = default_prov[1];
	} else {
		rv = getProvBrief(cur_prov_code);
	}
	return rv;
}

//获取当前登录省份名称，默认北京
function getCurProvName2(){
	var rv = "";
	initProvCode();
	if(getProvCode(cur_prov_code) == "000"){
		rv = default_prov[2];
	} else {
		rv = getProvName(cur_prov_code);
	}
	return rv;
}



// 工具函数

// 判断用户输入的手机号码是否正确，并给出提示。
function checkMBPhone(phone) {
	var rv = false;
	
	var ispn = 0;
	
	ispn = isPhoneNumber(phone);

	if (ispn == 0) {
		rv = true;
	}
	else if (ispn == 1) {
		window.alert("请输入11位数字组成的手机号码!");
		rv = false;
	}
	else if (ispn == 2) {
		window.alert("请正确输入中国移动手机号码!");
		rv = false;
	}
     
	return rv;
}

// 判断字符串是否是手机号码
// 0是手机号码 1不是11位数字 2号码前缀不正确
/* 用于检验手机号的位数以及检验此手机中是否为中国移动的手机号*/
/* 由于存在携号转网的情况 允许3个运营商的全部号段（试点中）*/
// 中国移动号码段：134(0至8号段) 135 136 137 138 139 147 150 151 152 157 158 159 178 182 183 184 187 188
// 中国联通号码段：130 131 132 145 155 156 175 176 185 186
// 中国电信号码段：133 153 173 177 180 181 189
// 虚拟运营商号码段：170 171
function isPhoneNumber(phone) {
	var rv = 0;

	var mbphnoM = /^(13[4-9])|^(147)|^(150)|^(151)|^(152)|^(157)|^(158)|^(159)|^(178)|^(182)|^(183)|^(184)|^(187)|^(188)/;
	var mbphnoU = /^(130)|^(131)|^(132)|^(145)|^(155)|^(156)|^(175)|^(176)|^(185)|^(186)/;
	var mbphnoT = /^(133)|^(153)|^(173)|^(177)|^(180)|^(181)|^(189)/;
	var mbphnoV =/^(170)|^(171)/;
      
	var num11 = /^\d{11}$/; //11位数字;
      
	if (null != phone && "" != phone && num11.exec(phone)) {
		
		if (mbphnoM.exec(phone) || mbphnoU.exec(phone) || mbphnoT.exec(phone) || mbphnoV.exec(phone)) {
			rv = 0;
		}
		else {
			rv = 2;
		}
	}
	else {
		rv = 1;
	}
     
	return rv;
}

// 判断输入的参数是否为4位数字组成的验证码 返回或false
function isImgVal(val) {
	var rv = false;

	var num4 = /\d{4}/; // 4位数字
      
	if (null != val && "" != val && num4.exec(val)) {
		rv = true;
	}
	else {
		rv = false;
	}
     
	return rv;
}



// Create a cookie with the specified name and value.
function setCookie(sName, sValue) {
	
	// Expires the cookie in one month
	var date = new Date();
	date.setMonth(date.getMonth() + 1);

	if (window.location.hostname == 'www.10086.cn' || window.location.hostname == '10086.cn') {
		document.cookie = sName + "=" + escape(sValue) + "; expires=" + date.toUTCString() + "; domain=10086.cn; path=/";
	}
	else {
		document.cookie = sName + "=" + escape(sValue) + "; expires=" + date.toUTCString() + "; path=/";
	}

}
 
// Retrieve the value of the cookie with the specified name.
function getCookie(sName) {
	// cookies are separated by semicolons
	var aCookie = document.cookie.split("; ");
	var aCrumb = null;
	for (var i=0; i < aCookie.length; i++) {
    	// a name/value pair (a crumb) is separated by an equal sign
		aCrumb = aCookie[i].split("=");
		if (sName == aCrumb[0]) {
			return unescape(aCrumb[1]);
		}
	}
	// a cookie with the requested name does not exist
	return null;
}
 
// Delete the cookie with the specified name.
function delCookie(sName) {
	
	if (window.location.hostname == 'www.10086.cn' || window.location.hostname == '10086.cn') {
		document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT; domain=10086.cn; path=/";
	}
	else {
		document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT; path=/";
	}
	
	
}



// 本文件为10086.cn网站导航菜单所需的js程序 

// 菜单滑动
function navOver(navNumber) {
	var navDiv =  document.getElementById("js0" + navNumber);
	navDiv.style.display = "block";
}
function navOut(navNumber) {
	var navDiv =  document.getElementById("js0" + navNumber);
	navDiv.style.display = "none";
}


// 网站群连接
function ShowDivCity() {
    document.getElementById("DivCity").style.display= "block";
}

function HiddenDivCity() {
    document.getElementById("DivCity").style.display = "none";
}

function ShowDivCity2() {
    document.getElementById("DivCity2").style.display= "block";
}

function HiddenDivCity2() {
    document.getElementById("DivCity2").style.display = "none";
}
function ShowDivCity3() {
    document.getElementById("DivCity3").style.display= "block";
}

function HiddenDivCity3() {
    document.getElementById("DivCity3").style.display = "none";
}

function ShowDivCity4() {
    document.getElementById("DivCity4").style.display= "block";
}

function HiddenDivCity4() {
    document.getElementById("DivCity4").style.display = "none";
}


function ShowDivkjbl() {
    document.getElementById("DivCity6").style.display= "block";
}

function HiddenDivkjbl() {
    document.getElementById("DivCity6").style.display = "none";
}

function ShowDivkjbl2() {
    document.getElementById("DivCity7").style.display= "block";
}

function HiddenDivkjbl2() {
    document.getElementById("DivCity7").style.display = "none";
}
function ShowDivkjbl3() {
    document.getElementById("DivCity8").style.display= "block";
}

function HiddenDivkjbl3() {
    document.getElementById("DivCity8").style.display = "none";
}

function ShowDivgmbtn1() {
    document.getElementById("Divgm1").style.display= "block";
}

function HiddenDivgmbtn1() {
    document.getElementById("Divgm1").style.display = "none";
}
function ShowDivgmbtn2() {
    document.getElementById("Divgm2").style.display= "block";
}

function HiddenDivgmbtn2() {
    document.getElementById("Divgm2").style.display = "none";
}
function ShowDivgmbtn3() {
    document.getElementById("Divgm3").style.display= "block";
}

function HiddenDivgmbtn3() {
    document.getElementById("Divgm3").style.display = "none";
}
function ShowDivgmbtn4() {
    document.getElementById("Divgm4").style.display= "block";
}

function HiddenDivgmbtn4() {
    document.getElementById("Divgm4").style.display = "none";
}
function ShowDivgmbtn5() {
    document.getElementById("Divgm5").style.display= "block";
}

function HiddenDivgmbtn5() {
    document.getElementById("Divgm5").style.display = "none";
}

function chk_frm_search() {

	if (document.frm_search.qt.value == '' || document.frm_search.qt.value.length < 2) {
		document.frm_search.qt.focus(); 
		return false;
	} 
	
	if (document.frm_search.qt.value == '关键字搜索') {
		document.frm_search.qt.focus();
		document.frm_search.qt.value = '';
		return false;
	}
	
	return true;
}

function search_network_click() {
	document.frm_search.style.value = 'standard';
	document.frm_search.database.value = '';
	return true;
}

function search_local_click() {
	document.frm_search.style.value = 'china';
	document.frm_search.database.value = 'chinamobile';
	return true;
}

// 首页图片轮播
function setTab(/*string*/name,/*int*/ curItem, /**/classHide, /**/classShow)
{
	var itemCnt = 20;
	for(i=1;i<=itemCnt;i++){
		var tab_h = document.getElementById("tab_" + name + "_" + i);
		if(tab_h){
			tab_h.className = classHide;
		}
	} 
	var tab_show = document.getElementById("tab_" + name + "_" + curItem);
	if(tab_show)tab_show.className = classShow;

	for(i=1;i<=itemCnt;i++){
		var ele_hide = document.getElementById("con_" + name + "_" + i);
		if(ele_hide) {
			ele_hide.style.display = "none";
		}
	}
	var ele_play = document.getElementById("con_" + name + "_" + curItem);
	if(ele_play) ele_play.style.display = "block";
}


//普通标签页
 function ExpTabs(obj,cur){
			for(var i=0;i<8;i++){
				if((i+1)%4==0){
					document.getElementById("Exp_Tabs_"+i).className = "norborder";	
				}else{
				document.getElementById("Exp_Tabs_"+i).className = "";
				}
				document.getElementById("ExpCon_"+i).className = "hidden";	
			}
			if((cur+1)%4==0){
			document.getElementById("Exp_Tabs_"+cur).className = "cur norborder";
			}else{
				document.getElementById("Exp_Tabs_"+cur).className = "cur";
			}
			document.getElementById("ExpCon_"+cur).className = "tab_con";		
}
function ChangeTabs(obj,cur){
	var objParent = obj.parentNode;
	var liObjs = objParent.getElementsByTagName("li");
	for(var k=0; k<liObjs.length;k++){
		liObjs[k].className = "";
		document.getElementById("Pro_"+k).className = "hidden";
	}
	obj.className = "cur";
	document.getElementById("Pro_"+cur).className = "";
}
function ChangeTabs2(obj,cur){
	var objParent = obj.parentNode;
	var liObjs = objParent.getElementsByTagName("li");
	for(var k=0; k<liObjs.length;k++){
		liObjs[k].className = "";
		document.getElementById("Pro2_"+k).className = "hidden";
	}
	obj.className = "cur";
	document.getElementById("Pro2_"+cur).className = "";
}
function ZFTabs(obj,cur){
	var objParent = obj.parentNode;
	var liObjs = objParent.getElementsByTagName("li");
	for(var k=0; k<liObjs.length;k++){
		liObjs[k].className = "";
		document.getElementById("ZFCon_"+k).className = "hidden";
	}
	obj.className = "cur";
	document.getElementById("ZFCon_"+cur).className = "";
}
var isActive = false;
function showTip()
{
	isActive = true;
	document.getElementById("SubNav").className = "";	
	
}

function hiddenDiv()
{
	isActive = false;
	setTimeout("hiddenTip()",200);
}
function hiddenTip()
{
	if(!isActive){
	document.getElementById("SubNav").className = "hidden";
	}
}
function ZFmap(){
	var zfobj = document.getElementById("zfMap");
	zfobj.className=zfobj.className=="hidden"?"block":"hidden";	
}

		
		

// 首页轮播图
jQuery.fn.bannerTurnPage = function(userOptions)
{
    // Default options
	var options = {
	  allpage:0,
	  container:"",
	  imgs:"",
	  tabs:"",
	  leftBtn:"",
	  rightBtn:"",
	  allPos:{}
	};
			
    var pageIndex=1,preIndex,isAuto=true,isTurn=true,inteval;
	
	function init(){
	    var length = $("#index_tab").find("li").length;
		options.allpage=length;
		preIndex=length;
		var allUl=$("#index_tab").find("li");
		var allImgs=$(options.imgs).find("div");
		for(var i=0 ;i<length-1;i++ ){
			options.allPos[i+1]=i;
		}
		options.allPos[0]=length-1;
		for(var i=0 ;i <length;i++){
			$(allImgs[options.allPos[i]]).css('position','absolute');
			$(allImgs[options.allPos[i]]).css('left','0px');
			$(allImgs[options.allPos[i]]).css('z-index','-2');
			$(allImgs[options.allPos[i]]).css('opacity',0.00);
		}
		$(allImgs[0]).css('z-index','-1');
		$(allImgs[0]).css('opacity',1.00);
		
		for(var i=0 ;i <length;i++){
			$(allUl[i]).find("a:first-child").attr("liidx",i);
			$(allUl[i]).find("a:first-child").attr("href",$("#con_tophome_" + (i+1) + " a:first-child").attr("href"));
		}
		allUl.mousemove(function () {jumpTo();});
		
	}
			
    function turnAuto(where){
        return function _move(){
		    
		    loadBanner();
		    
		    if(isAuto){
			    var allUl=$(where).find("li");	
                var allImgs=$(options.imgs).find("div");
				var returnPos=options.allPos[0];
				for(var i=1;i<options.allpage;i++){
				    options.allPos[i-1]=options.allPos[i];
				}
				options.allPos[options.allpage-1]=returnPos;				
				for(var i=0 ;i <options.allpage;i++){
					if (i==1) {
						$(allImgs[options.allPos[i]]).css('z-index','-1');
						$(allImgs[options.allPos[i]]).fadeTo("slow",1.00);
						$(allUl[options.allPos[i]]).attr('class','on');
					}else if(i==0){
                        $(allImgs[options.allPos[i]]).css('z-index','-2');
                        $(allImgs[options.allPos[i]]).fadeTo("slow",0.00);
                        $(allUl[options.allPos[i]]).attr('class','out');
                    }else{
					    $(allImgs[options.allPos[i]]).css('z-index','-2');
						$(allImgs[options.allPos[i]]).css("opacity",0.00);
						$(allUl[options.allPos[i]]).attr('class','out');
						
					}						
				}
			}
		};
    }
			
	function jumpTo(){
		
		loadBanner();
		
		var theEvent = window.event || arguments.callee.caller.arguments[0];
		var srcElement = (theEvent.srcElement) ? theEvent.srcElement : theEvent.target;
		if (srcElement.tagName != "A") {
			return;
		}
		
		var index = new Number($(srcElement).attr("liidx"));
		
		
		var allUl = $("#index_tab").find("li");
		var allImgs = $(options.imgs).find("div");
		
		if (!isTurn){
		    return;
		}
		else {
		    isTurn = false;
		}
		
		if (index == options.allPos[1]) {
			isTurn = true;
			return;
		}
		else if (index < options.allPos[1]) { // 要显示的图在左边
			
			$(allUl[options.allPos[1]]).attr('class','out');
			$(allUl[index]).attr('class','on');
			
			$(allImgs[options.allPos[1]]).css('z-index','-2');
			$(allImgs[options.allPos[1]]).fadeTo("slow",0.00);
			
			$(allImgs[index]).css('z-index','-1');
			$(allImgs[index]).css('left','0px');
			$(allImgs[index]).fadeTo("slow",1.00,function() {
				
					for (var i=0;i<options.allpage;i++) {
						options.allPos[i] = i + index - 1;
						if (options.allPos[i] < 0) {
							options.allPos[i] += options.allpage;
						}
						else if (options.allpage <= options.allPos[i]) {
							options.allPos[i] -= options.allpage;
						}
						
						if (i != 1) {
							$(allImgs[options.allPos[i]]).css('left','0px');
						}
					}
					
					isTurn = true;
				}
			);
			
		}
		else { // 要显示的图在右边

			$(allUl[options.allPos[1]]).attr('class','out');
			$(allUl[index]).attr('class','on');

			$(allImgs[options.allPos[1]]).css('z-index','-2');
			$(allImgs[options.allPos[1]]).fadeTo("slow",0.00);
			
			$(allImgs[index]).css('z-index','-1');
			$(allImgs[index]).css('left','0px');
			$(allImgs[index]).fadeTo("slow",1.00,function() {

					for (var i=0;i<options.allpage;i++) {
						options.allPos[i] = i + index - 1;
						if (options.allPos[i] < 0) {
							options.allPos[i] += options.allpage;
						}
						else if (options.allpage <= options.allPos[i]) {
							options.allPos[i] -= options.allpage;
						}
						
						if (i != 1) {
							$(allImgs[options.allPos[i]]).css('left','0px');
						}
					}


					isTurn = true;
				}
			);

		}
		
	}
	
	function turnClick(where,para){
		
		loadBanner();
		
	    if(!isTurn){
		    return;
		}else{
		    isTurn=false;
		}
        var allUl=$(where).find("li");
		var allImgs=$(options.imgs).find("div");
		if(para==1){			       	    
				var returnPos=options.allPos[0];
				for(var i=1;i<options.allpage;i++){
				    options.allPos[i-1]=options.allPos[i];
				}
				options.allPos[options.allpage-1]=returnPos;				
				for(var i=0 ;i <options.allpage;i++){
					if(i==1){    
						$(allImgs[options.allPos[i]]).css('z-index','-1');
						$(allImgs[options.allPos[i]]).fadeTo("slow",1.00,function(){
						isTurn=true;});
						$(allUl[options.allPos[i]]).attr('class','on');
					}else if(i==0){
                        $(allImgs[options.allPos[i]]).css('z-index','-2');
						$(allImgs[options.allPos[i]]).fadeTo("slow",0.00);
                        $(allUl[options.allPos[i]]).attr('class','out');
                    }else{
                        $(allImgs[options.allPos[i]]).css('z-index','-2');
						$(allImgs[options.allPos[i]]).css({'left':'0px'});
						$(allUl[options.allPos[i]]).attr('class','out');
                    }						
				}	   
		}else{
				var returnPos=options.allPos[options.allpage-1];
				for(var i=options.allpage-2;i>=0;i--){
				    options.allPos[i+1]=options.allPos[i];
				}
				options.allPos[0]=returnPos;				
				for(var i=0 ;i <options.allpage;i++){
					if(i==1){    
						$(allImgs[options.allPos[i]]).css('z-index','-1');
						$(allImgs[options.allPos[i]]).fadeTo("slow",1.00,function(){
						isTurn=true;});
						$(allUl[options.allPos[i]]).attr('class','on');
					}else if(i==2){
                        $(allImgs[options.allPos[i]]).css('z-index','-2');
						$(allImgs[options.allPos[i]]).fadeTo("slow",0.00);
						$(allUl[options.allPos[i]]).attr('class','out');
                    }else{
                        $(allImgs[options.allPos[i]]).css('z-index','-2');
						$(allImgs[options.allPos[i]]).css({'left':'0px'});
						$(allUl[options.allPos[i]]).attr('class','out');
                    }						
				}		    
		}
    }
			
	function checkMouse(onOrNot){
	    if(onOrNot){
		    isAuto=false;
		}else{
		    isAuto=true;
		}
	}
	
	function loadBanner() {
		
		
		var imgobj = $("#banner_img").find('img');
		var imglength = imgobj.length;

		var i;
		var imgsrc;
		var imgbannersrc;
		
		for (i=1;i<imglength;i++) {

			imgsrc = $(imgobj[i]).attr("src");
			imgbannersrc = $(imgobj[i]).attr("bannersrc");
			
			if (typeof(imgbannersrc) != "undefined") { 
				if (imgsrc != imgbannersrc) {
					$(imgobj[i]).attr("src",imgbannersrc);
				}
			}
		}
	}
	
	
	$.extend(options,userOptions);
	var here = "."+this.attr('class');
	$(options.leftBtn).bind("click",function(){turnClick(here,1)});
	$(options.rightBtn).bind("click",function(){turnClick(here,0)});
	this.on('mouseover',function(evt){checkMouse(true)});
	this.on('mouseout',function(evt){checkMouse(false)});
	init();
	interval=setInterval(turnAuto(here),5000);
}

$(function(){
    if(1 < $('#banner_img').find('div').length){
	    $("#banner").bannerTurnPage({
		    imgs:"#banner_img",
		    tabs:"#index_tab",
		    leftBtn:"#banner .lbpre",
		    rightBtn:"#banner .lbnext",
			left:710
		});
    }
    else {
    	$("#tab_tophome_1").attr("class","out").css("display","none");
    }
    
	// Jeffrey 添加 2014-05-22
	$(".lbpre").css("display","none"); 
	$(".lbnext").css("display","none"); 

	$("#banner").mouseenter( 
		function () {
			if(1 < $('#banner_img').find('div').length){
				$(".lbpre").css("display","block"); 
				$(".lbnext").css("display","block"); 
			}
		} 
	); 

	$("#banner").mouseleave( 
		function () { 
			$(".lbpre").css("display","none"); 
			$(".lbnext").css("display","none"); 
		} 
	);
});




// 优惠促销区轮播
jQuery.fn.xmyhphoneTurnPage = function(userOptions) {
    // Default options
	var options = {
		leftBtn:"",
		rightBtn:"",
		container:"",
		pagecount:0,
		allPos:{}
	}
    
    var isAuto = true; // 是否自动滚动
    var isTurn = false; // 是否正在移动

	function isLargeScreen() {
		var rv = false;
		rv = (1250 <= document.body.clientWidth) ? true : false;
		return rv;
	}

	// 执行窗口缩放
	function execResize() {
		
		if (isLargeScreen()) {
			picdistance = 295;
		}
		else {
			picdistance = 245;
		}

		var allUl = $(options.container).find("div");

		for(var i=0 ;i <4;i++){
			$(allUl[options.allPos[i]]).css('position','absolute');
			$(allUl[options.allPos[i]]).css('left',(i * picdistance) + 'px');
		}
	}
	
	function init() {

		var allUl = $(options.container).find("div");
	    var length = allUl.length;
		options.pagecount = length; // 
		
		var picdistance = 0; // 图片间距
		if (isLargeScreen()) {
			picdistance = 295;
		}
		else {
			picdistance = 245;
		}
		
		options.allPos = new Array(options.pagecount);
		for (var i=0;i<options.pagecount;i++) {
			options.allPos[i] = i;
		}
		
		for(var i=0 ;i <options.pagecount;i++){
			$(allUl[options.allPos[i]]).css('position','absolute');
			$(allUl[options.allPos[i]]).css('left',(i * picdistance) + 'px');
		}


	}
	
	
    function turnAuto() {

	    if (isAuto && (isTurn == false)) {
			isTurn = true;
			
			var allUl = $(options.container).find("div");
	   		var picdistance = 0; // 图片间距
			if (isLargeScreen()) {
				picdistance = 295;
			}
			else {
				picdistance = 245;
			}
			


			// 图片向左移一屏
			turnLeft(allUl,picdistance);
			

		
		}


    }
	
	function turnClick(para){

		if (isTurn == false) {
			isTurn = true;
		
			var allUl = $(options.container).find("div");
	   		var picdistance = 0; // 图片间距
			if (isLargeScreen()) {
				picdistance = 295;
			}
			else {
				picdistance = 245;
			}
		
			if (para == 0) { // 向左
	
	
				// 图片向右移一屏
				turnRight(allUl,picdistance);
				
			}
			else { // 向右
				// 图片向左移一屏
				turnLeft(allUl,picdistance);

			}
		}

    }
	
	// 图片向左移一屏(按右键，自动轮播)
	function turnLeft(allUl,picdistance) {
		
		
		// 将隐藏图片的位置排放正确
		for (var i = 4;i < options.pagecount;i++) {
			$(allUl[options.allPos[i]]).css('left',(i * picdistance) +'px');
		}

		// 在数组中移动位置
		for (var i = 0;i < 4;i++) {
			options.allPos.push(options.allPos[0]);
			options.allPos.shift();
		}

		// 设置动画效果
		$(allUl[options.allPos[options.pagecount-1]]).animate({'left':(-1 * picdistance) +'px'},"fast");
		$(allUl[options.allPos[options.pagecount-2]]).animate({'left':(-2 * picdistance) +'px'},"fast");
		$(allUl[options.allPos[options.pagecount-3]]).animate({'left':(-3 * picdistance) +'px'},"fast");
		$(allUl[options.allPos[options.pagecount-4]]).animate({'left':(-4 * picdistance) +'px'},"fast");
		for (var i = 0;i < 4;i++) {
			if (i == 4 - 1) {
				$(allUl[options.allPos[i]]).animate(
					{'left':(i * picdistance) +'px'}
					,"fast"
					,""
					,
					function() {
						execResize(); // 处理轮播过程中的窗口缩放。
						isTurn = false;

					}
				);
			}
			else {
				$(allUl[options.allPos[i]]).animate({'left':(i * picdistance) +'px'},"fast");
			}
		}
		
		


	}
	
	// 图片向右移一屏(按左键)
	function turnRight(allUl,picdistance) {
		
		// 将隐藏图片的位置排放正确
		for (var i = 4;i < options.pagecount;i++) {
			$(allUl[options.allPos[i]]).css('left',(-1 * (options.pagecount - i) * picdistance) +'px');
		}

		// 在数组中移动位置
		for (var i = 0;i < 4;i++) {
			options.allPos.unshift(options.allPos[options.pagecount - 1]);
			options.allPos.pop();
		}
		
		// 设置动画效果
		for (var i = 0;i < options.pagecount;i++) {
			if (i == options.pagecount - 1) {
				$(allUl[options.allPos[i]]).animate(
					{'left':(i * picdistance) +'px'}
					,"fast"
					,""
					,
					function() {
						execResize(); // 处理轮播过程中的窗口缩放。
						isTurn = false;

					}
				);
			}
			else {
				$(allUl[options.allPos[i]]).animate({'left':(i * picdistance) +'px'},"fast");
			}
		}
		
	}
		
	function checkMouse(onOrNot){
	    if(onOrNot){
			if(8 < $('.yhgundong').find('div').length) {
				$(options.leftBtn).css("display","block");
				$(options.rightBtn).css("display","block");
			}
		    isAuto=false;
		}
		else {
			$(options.leftBtn).css("display","none");
			$(options.rightBtn).css("display","none");
		    isAuto=true;
		}
	}
	

	$.extend(options,userOptions);

	$(options.leftBtn).bind("click",function(){turnClick(0)});
	$(options.rightBtn).bind("click",function(){turnClick(1)});

	$(".yhcx").on('mouseenter',function(evt){checkMouse(true)});
	$(".yhcx").on('mouseleave',function(evt){checkMouse(false)});
	init();


	if(8 < $(options.container).find('div').length) { // 当多于4张图时，循环播放。
		interval = setInterval(turnAuto,6000);
	}


	// 绑定窗口缩放函数
	$(window).on('resize orientationchange', function () {
		execResize();
	});

	
}


$(document).ready(function(){
    if(8 <= $('.yhgundong').find('div').length) {
		$(".yhgundong").xmyhphoneTurnPage({
		    leftBtn:".yhnext",
			rightBtn:".yhpre",
			container:".yhgundong"
		});
    }
});



// 公告
jQuery.fn.turnPage = function(userOptions)
{
    // Default options
    var options = {
	  allpage:0,
	  container:""
	}
	
    var pageIndex=1,preIndex,isAuto=true,inteval;
	
	function init(where){
	    var length=where.find("ul").length;
		options.allpage=length;
		preIndex=length;
	}
	
    function turnAuto(where){
        return function _move(){
		    if(isAuto){
			    pageIndex++;
			    preIndex=pageIndex-1;
			    if(pageIndex>options.allpage){
			        pageIndex=1;
			    }
				if(preIndex==0){
			        preIndex=options.allpage;
			    }
			    var allUl=where.find("ul");
			    $(allUl[pageIndex-1]).css('display','block');
			    $(allUl[preIndex-1]).css('display','none');
			}
		};
    }
	
	function turnClick(where,para){
        if(para==1){			    
				pageIndex++;
			    preIndex=pageIndex-1;
			    if(pageIndex>options.allpage){
			        pageIndex=1;
			    }
				if(preIndex<=0){
			        preIndex=options.allpage;
			    }
			    var allUl=$("."+where).find("ul");
			    $(allUl[pageIndex-1]).css('display','block');
			    $(allUl[preIndex-1]).css('display','none');			   
		}else{
		    pageIndex--;
			    preIndex=pageIndex+1;
			    if(pageIndex<=0){
			        pageIndex=options.allpage;
			    }
			if(preIndex>options.allpage){
			        preIndex=1;
			    }
			    var allUl=$("."+where).find("ul");
			    $(allUl[pageIndex-1]).css('display','block');
			    $(allUl[preIndex-1]).css('display','none');		    
		}
    }
	
	function checkMouse(onOrNot){
	    if(onOrNot){
		    isAuto=false;
		}else{
		    isAuto=true;
		}
	}
	var here=this.attr('class');
    //var allA=this.find("a");
	$.extend(options,userOptions);
	$("."+this.attr('class')+" .left").bind("click",function(){turnClick(here,0)});
	$("."+this.attr('class')+" .right").bind("click",function(){turnClick(here,1)});
	this.on('mouseover',function(evt){checkMouse(true)});
	this.on('mouseout',function(evt){checkMouse(false)});
	init(this);
	interval=setInterval(turnAuto(this),5000);
}

$(function(){
    if($('.indexgg').find('li').length>2){
	$(".indexgg").turnPage();
    }
});

