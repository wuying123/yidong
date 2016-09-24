var basePath = "http://search.10086.cn/";
var searchUrl = basePath + "search";
var settings = {
		type : 1,
		maxResult : 10,
		maxPinLei : 5,
		top : 0,
		left : 0,
		width : 0,
		out : "search_toplist",
		innerOn : "",
		innerOff : "search_li_yidong",
		areacode:'',
		areaName:'',
		charset:'',
		search_li_history:"search_li_history",
		close_line:"close_line",
		close_class:"colse_class"
	};

var identityId = +new Date;
var	searchHistory = "#searchHistory" + identityId;
var promptWord = "#searchKeyWord" + identityId;
//用于区分是搜索历史，还是提示词（1 搜索历史，2提示词）
var sign;
var inputWord;  //输入的内容

var historyTemplate = "<li class='" + settings.innerOn + "' " +
				" onmouseover=$(this).onmouseoverFun(this,'" + settings.innerOff + "')" +
				" onmouseout=$(this).onmouseleaveFun(this,'" + settings.innerOn + "')  tag='0' >" +
				"{NAME}" +
				"<span class='" + settings.search_li_history + "'>" +
					"<a href='javascript:void(0);' onclick='$(this).deleteFun(this)'>搜索历史</a>" +
				"</span>" +
				"</li>";
var promptTemplate = "<li class='" + settings.innerOn + "' " + 
						" onmouseover='this.className=\"" + settings.innerOff + "\";'" + 
						" onmouseout='this.className=\"" + settings.innerOn + "\"' " + 
						" tag='0' >{NAME}" +
					 "</li>";
var currentThis;
$.fn.extend({
	search:function(options, callback) {
		options = options || {};
		$.extend(settings, options);
		currentThis = this;
		var $this = $(this);
		var tagName1 = $this.attr("tagName");
		if (tagName1 != null && tagName1 != 'undefind') {
			if ($this.attr("tagName").toLowerCase() != "input") {
				return;
			}
		}
		
		//初始化搜索历史
		var createDom = $(searchHistory);
		if (createDom.length == 0) {
			var createDiv = $('<ul></ul>');
			$(this).after(createDiv);
		
			$(createDiv).attr({
				'id' : "searchHistory" + identityId,
				"class" : settings.out
			});
			createDom = createDiv;
		}
		$(searchHistory).hide();
		
		//初始化提示词样式
		var promptWordDom = $(promptWord);
		if (promptWordDom.length == 0) {
			var createPromptDiv = $('<ul></ul>');
			$(this).after(createPromptDiv);
		
			$(createPromptDiv).attr({
				'id' : "searchKeyWord" + identityId,
				"class" : settings.out
			});
			promptWordDom = createPromptDiv;
		}
		$(promptWord).hide();
		
		$(this).bind( "keydown", function(e) {
			var key = e.keyCode;
			if (!(key == 38 || key == 40)) {
				return;
			}
			
			(function() {
				var word = $(currentThis).val();
				//搜索框为空时，加载搜索历史；不为空时，加载提示词
				if(word == "" || word == undefined || word == null || sign == 1) {
					var currentObj = null;
					$(searchHistory).find("li").each(
						function(i, obj) {
							if ($(obj).attr("class") == settings.innerOff) {
								currentObj = obj;
								return false;
							}
						}
					);
					if (key == 38) {
						if (currentObj == null || currentObj == undefined) {
							if ($(searchHistory).find("li").length > 0) {
								$(searchHistory).find("li:last").attr("class",settings.innerOff);
							}
							
							if ($(searchHistory).find("li:last").attr("tag") != "1") {
								var objA = ($(searchHistory).find("li:last A"))[0];
								var objB = ($(searchHistory).find("li:last A"))[1];
								if(objA != undefined) {
									$(currentThis).val(objA.innerHTML);
									objB.innerHTML = "删除";
								}
							}
						} else {
							$(currentObj).attr("class", settings.innerOn);
							$(currentObj).prev().attr("class", settings.innerOff);
							if ($(currentObj).prev() != "1") {
								var obj = $(currentObj).prev();
								var objA = (obj.find("A"))[0];
								var objB = (obj.find("A"))[1];
								var objC = (obj.next().find("A"))[1];
								if(objA != undefined) {
									$(currentThis).val(objA.innerHTML);
									objB.innerHTML = "删除";
									objC.innerHTML = "搜索历史";
								} else {
									var objD = obj.prevObject;
									(objD.find("A"))[1].innerHTML = "搜索历史";
								}
							}
						}
					}
					if (key == 40) {
						sign = 1;  //标示是搜索历史
						if (currentObj == null || currentObj == undefined) {
							if ($(searchHistory).find("li").length > 0) {
								$(searchHistory).find("li:first").attr("class",settings.innerOff);
							}
							
							if ($(currentThis).attr("tag") != "1") {
								var objA = ($(searchHistory).find("li:first a"))[0];
								var objB = ($(searchHistory).find("li:first a"))[1];
								if(objA != undefined) {
									$(currentThis).val(objA.innerHTML);
									objB.innerHTML = "删除";
								}
							}
						} else {
							$(currentObj).attr("class", settings.innerOn);
							var nextClass = $(currentObj).next().attr("class");
							if(nextClass != settings.close_line) {
								$(currentObj).next().attr("class", settings.innerOff);
							}
							
							if ($(currentObj).next().attr("tag") != "1") {
								var obj = $(currentObj).next();
								var objA = (obj.find("A"))[0] ;
								var objB = (obj.find("A"))[1] ;
								var objC = (obj.prev().find("A"))[1] ;
								if(objA != undefined) {
									$(currentThis).val(objA.innerHTML);
									objC.innerHTML = "搜索历史";
									objB.innerHTML = "删除";
								} else {
									objC.innerHTML = "搜索历史";
								}
							}
						}
					}
				} else {
					//加载提示词
					var currentObj = null;
					$(promptWord).find("li").each(
						function(i, obj) {
							if ($(obj).attr("class") == settings.innerOff) {
								currentObj = obj;
								return false;
							}
						}
					);
					if (key == 38) {
						if (currentObj == null || currentObj == undefined) {
							if ($(promptWord).find("li").length > 0) {
								$(promptWord).find("li:last").attr("class",settings.innerOff);
							}
							
							if ($(promptWord).find("li:last").attr("tag") != "1") {
								$(currentThis).val($(promptWord).find("li:last A").attr("showname"));
							}
						} else {
							$(currentObj).attr("class", settings.innerOn);
							$(currentObj).prev().attr("class", settings.innerOff);
							if ($(currentObj).prev().attr("tag") != "1") {
								var prev = $(currentObj).prev().find("A").attr("showname");
								if(prev == "" || prev == undefined) {
									prev = inputWord;
								}
								$(currentThis).val(prev);
							}
						}
					}
					if (key == 40) {
						sign = 2; //标示是提示词
						if (currentObj == null || currentObj == undefined) {
							if ($(promptWord).find("li").length > 0) {
								$(promptWord).find("li:first").attr("class",settings.innerOff);
							}
							
							if ($(currentThis).attr("tag") != "1") {
								$(currentThis).val($(promptWord).find("li:first a").attr("showname"));
							}
						} else {
							$(currentObj).attr("class", settings.innerOn);
							$(currentObj).next().attr("class", settings.innerOff);
							
							if ($(currentObj).next().attr("tag") != "1") {
								var next =  $(currentObj).next().find("A").attr("showname");
								if(next == "" || next == undefined) {
									next = inputWord;
								}
								$(currentThis).val(next);
							}
						}
					}
				}
			})();
		});
		
		$('body').click(function() {
			$(searchHistory).empty();
			$(searchHistory).hide();
			$(promptWord).empty();
			$(promptWord).hide();
		});

		$(this).bind("mouseup" , function(e) {
			var word = $(currentThis).val();
			if(word == "" || word == undefined || word == null){
				sign = 1;
				$(promptWord).empty();
				$(promptWord).hide();
				$(this).getSearchHistoryData();
			} else {
				sign = 2;
				inputWord = word;
				$(searchHistory).empty();
				$(searchHistory).hide();
				
				$(this).getPromptWordData(word);
			}
	    });
		
		$("#frm_search_id").bind("mouseleave" , function(e) {
			$(searchHistory).empty();
			$(searchHistory).hide();
			
			$(promptWord).empty();
			$(promptWord).hide();
		});
		
		$this.bind("keyup" , function(e) {
			var keyNum = e.keyCode;
			if (keyNum == 38 || keyNum == 40) {
				return;
			}
			var word = $(currentThis).val();
			if(word == "" || word == undefined || word == null){
				sign = 1;
				$(promptWord).empty();
				$(promptWord).hide();
				$(this).getSearchHistoryData();
			} else {
				sign = 2;
				inputWord = word;
				$(searchHistory).empty();
				$(searchHistory).hide();
				$(this).getPromptWordData(word);
			}
	    });
	},
	getSearchHistoryData:function() {
		var url =  basePath + "historySearch/searchHistory_jsonp.json";
		
		$.ajax({
			type : "get",
			url : url,
			data : {'charset':settings.charset},
			dataType : 'jsonp',
			cache : false,
			jsonp : "jsonpcallback",
			success:function(json) {
				if (json != null && json != "") {
					$(searchHistory).empty();
					$.each(json,function(i,n){
                        $(searchHistory).append(historyTemplate.replace(/\{NAME\}/ig,"<a target='_blank'  style='display:block;' href='"+searchUrl+'?content='+json[i] + "&areacode="+settings.areacode+"&areaName="+settings.areaName+"' showname ='" + json[i] + "'>"+json[i]+"</a>"));
					});
//					for ( var i in json) {
//						$(searchHistory).append(historyTemplate.replace(/\{NAME\}/ig,"<a target='_blank'  style='display:block;' href='"+searchUrl+'?content='+json[i] + "&areacode="+settings.areacode+"&areaName="+settings.areaName+"' showname ='" + json[i] + "'>"+json[i]+"</a>"));
//					}
					$(searchHistory).append("<span class='" + settings.close_line + "'></span>");
					$(searchHistory).append("<span class='" + settings.close_class + "'>关闭</span>");
					$(searchHistory).show();
				} else {
					$(searchHistory).empty();
				}
			}
		});
	},
	getPromptWordData:function(word) {
		var url = basePath + "list_ajax_jsonp.json";
		$.ajax({
			type : "get",
			data : {'content':word,'charset':settings.charset,'areacode':settings.areacode},
			url : url,
			dataType:"jsonp",
			jsonp:"jsonpcallback",
			success:function(json) {
				if (json != null && json != 'undefind' && json != "") {
					$(promptWord).empty();
					if (json.searchWord.length > 0) {
						for ( var i in json.searchWord) {
							if (json.searchWord[i].Word != undefined) {
								$(promptWord).append($(promptTemplate.replace(/\{NAME\}/ig,"<a target='_blank' style='display:block;' href='"+searchUrl+'?content='+json.searchWord[i].Word+"&areacode="+settings.areacode+"&areaName="+settings.areaName+"'showname = " + json.searchWord[i].Word +">"+json.searchWord[i].Word.replace(word,"<font color='red'>" + word + "</font>")+"</a>") ) );
							}
						}         
						$(promptWord).show();
					} else {
						$(promptWord).css("display" , "none");
					}
				} else {
					$(promptWord).hide();
				}
			}
		});
	},
	onmouseoverFun : function(obj,className) {
		obj.className = className;
		var historySpan = $(obj).find("a")[1];
		historySpan.innerHTML = "删除";
	},
	onmouseleaveFun : function(obj,className) {
		obj.className = className;
		var historySpan = $(obj).find("a")[1];
		historySpan.innerHTML = "搜索历史";
	},
	deleteFun : function(obj) {
		//var word = $(obj).parents("." + settings.innerOff).find("a")[0].innerText;
		var word =  $(obj).parent().prev()[0].innerHTML;
		var delUrl = basePath + "historySearch/del_history_jsonp.json";
		$.ajax({
			type : "get",
			url : delUrl,
			data : {"word":word},
			dataType : "jsonp",
			jsonp:"jsonpcallback",
			cache:false,
			success : function(json) {
				if(json == true) {
					$(currentThis).getSearchHistoryData();
				}
			}
		});
	}
});

function findCmProvid(){
	var cookies =  document.cookie.split("; ");
	var CmProvid;
	for ( var i = 0; i < cookies.length; i++) {
		var arr = cookies[i].split("=");
		if ("CmProvid" == arr[0]) {
			CmProvid = arr[1];
			break;
		}
	}
	return CmProvid;
} 

/**
* 获取当前页面的编码格式
*/
function getPageCharset(){  
    var charset = "";  
    var oType = getBrowser();  
    switch(oType) {  
        case "IE":  
            charset = document.charset;break;  
        case "FIREFOX":  
            charset = document.characterSet;break;  
        case "CHROME":  
            charset = document.characterSet;break;  
        default:  
        	charset = document.charset;break;  
    }
    return charset;  
}

/**
 * 获取当前浏览器
 * @returns {String}
 */
function getBrowser(){  
    var oType = "";  
    if(navigator.userAgent.indexOf("MSIE")!=-1) {  
        oType="IE";  
    } else if(navigator.userAgent.indexOf("Firefox")!=-1) {  
        oType="FIREFOX";
    } else if(navigator.userAgent.indexOf("WebKit")!=-1 ) {  
        oType="CHROME";  
    }
    return oType;  
}

$(function() {
	var areacode = findCmProvid();
	var charset = getPageCharset();

	$("#skeywords").search({
		type:1,
		maxResult:10,
		areacode:areacode,
		charset:charset
	});
});