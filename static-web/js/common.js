$(function() {
    //兼容IE浏览器跨域访问url时的问题
    //参考 http://stackoverflow.com/questions/9160123/no-transport-error-w-jquery-ajax-call-in-ie
    $.support.cors = true;
})

/**
 * @name placeHolder
 * @class 跨浏览器placeHolder,对于不支持原生placeHolder的浏览器，通过value或插入span元素两种方案模拟
 * @param {Object} obj 要应用placeHolder的表单元素对象
 */
function readyplace(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
}
// (function (window, undefined) {

//     var hasClass = function(elem,sClass)
//     {
//         var sOldName=elem.className;
//         if(sOldName)
//         {
//             sOldName=sOldName.split(' ');
//             for(var i=0;i<sOldName.length;i++)
//             {
//                 if(sOldName[i]==sClass)
//                 {
//                     return true;
//                 }
//             }
//         }
//     }

//     var addClass = function(elem,sClass)
//     {
//         if(!hasClass(elem,sClass))
//         {
//             if(elem.className)
//             {
//                 var sOldName=elem.className, blank = (sOldName != '') ? ' ' : '';
//                 elem.className=sOldName + blank + sClass;
//             }
//             else
//             {
//                 elem.className=sClass;
//             }
//         }
//     }

//     var removeClass = function(elem,sClass)
//     {
//         var sOldName=elem.className.split(' ');
//         var sNewClass='';
//         for(var i=0;i<sOldName.length;i++)
//         {
//             if(sOldName[i] && sOldName[i]!=sClass)
//             {
//                 sNewClass+=sOldName[i]+' ';
//             }
//         }
//         elem.className=sNewClass.replace(/(^\s+)|(\s+$)/g, '');
//     }

//     var Place = (function() {
//         return function(set){
//             this.tagName    = set.tagName || "input" ;
//             this.placeattr  = set.placeattr || "placeholder" ;
//             this.isempty    = set.isempty ? true : false;
//             this.focusCls   = set.focusCls || "finps";
//             this.onblurCls  = set.onblurCls || "oinps";
//             this.init();
//         }
//     })();
//     Place.prototype = {
//         init : function() {
//             var elemTagName = document.getElementsByTagName(this.tagName);
//             for(var i=0;i<elemTagName.length;i++){
//                 this.create(elemTagName[i],this.isempty);
//             }
//         },
//         create:function(obj,isShow){
//             if (!obj.getAttribute(this.placeattr)) return;
//             var getStyle = function(obj, prop) {
//                 if (obj.currentStyle) { //IE浏览器
//                     return obj.currentStyle[prop];
//                 } else if (window.getComputedStyle) { //W3C标准浏览器
//                     return document.defaultView.getComputedStyle(obj, null)[prop];
//                 }
//                 return null;
//             };

//             var defaultValue = obj.getAttribute(this.placeattr);
//             var placeHolderCont = document.createTextNode(defaultValue);
//             var REPX=/px|em|rem/;
//             var pat=parseInt(getStyle(obj,"paddingTop").replace(REPX,'')) || 0;
//             var par=parseInt(getStyle(obj,"paddingRight").replace(REPX,'')) || 0;
//             var pab=parseInt(getStyle(obj,"paddingBottom").replace(REPX,'')) || 0;
//             var pal=parseInt(getStyle(obj,"paddingLeft").replace(REPX,'')) || 0;

//             var mat=parseInt(getStyle(obj,"marginTop").replace(REPX,'')) || 0;
//             var mar=parseInt(getStyle(obj,"marginRight").replace(REPX,'')) || 0;
//             var mab=parseInt(getStyle(obj,"marginBottom").replace(REPX,'')) || 0;
//             var mal=parseInt(getStyle(obj,"marginLeft").replace(REPX,'')) || 0;

//             var fontSize = getStyle(obj, 'fontSize');
//             if (!obj.getAttribute("id")) {
//                 var idFor = "place" +Math.floor(Math.random().toString().substr(2,8));
//             }else{
//                 var idFor =obj.getAttribute("id");
//             }
//             obj.setAttribute("id", idFor);
//             var LabelWrap = document.createElement('label');
//             LabelWrap.setAttribute("for", idFor);
//             LabelWrap.className = 'placewrap';
//             LabelWrap.style.cssText = 'font-size:'+fontSize+';position:absolute;cursor:text;text-indent:2px;z-index:5;top:'+mat+'px;left:'+mal+'px;padding:'+pat+'px '+par+'px '+pab+'px '+pal+'px;color:#999;';
//             LabelWrap.style.width = obj.offsetWidth - (parseInt(getStyle(obj, 'marginLeft'), 10)||10) + 'px';
//             //LabelWrap.style.lineHeight = obj.nodeName.toLowerCase() == 'textarea' ? '': obj.offsetHeight-pat-pab + 'px';
//             var placebox=document.createElement("div");
//             placebox.className="labelwraps";
//             placebox.style.cssText='position:relative;visibility:visible;z-index:1;display:inline-block;';
//             obj.parentNode.insertBefore(placebox,null);
//             LabelWrap.appendChild(placeHolderCont);
//             placebox.appendChild(LabelWrap);
//             placebox.appendChild(obj);
//             obj.removeAttribute(this.placeattr);
//             LabelWrap.onclick = function() { obj.focus();  };
//             LabelWrap.style.display = obj.value == '' ? 'block': 'none';
//             var changeHandler = function() {
//                 LabelWrap.style.display = obj.value != '' ? 'none': 'block';
//             };
//             var that=this;
//             if(!isShow){
//                 obj.onclick = function() {
//                     if(obj.value == defaultValue && obj.value != ''){
//                         LabelWrap.style.display ='block';
//                         removeClass(obj,that.onblurCls);
//                         addClass(obj,that.focusCls);
//                     }else {
//                         LabelWrap.style.display ='none';
//                         removeClass(obj,that.onblurCls);
//                         addClass(obj,that.focusCls);
//                     }

//                 }
//                 obj.oninput = function() {
//                     if(obj.value != ''){
//                         LabelWrap.style.display ='none';
//                     }else{
//                         LabelWrap.style.display ='block';
//                     }
//                 }
//                 obj.onblur = function() {
//                     if(obj.value != ''){
//                         LabelWrap.style.display ='none';
//                         removeClass(obj,that.focusCls);
//                         addClass(obj,that.onblurCls);
//                     }else{
//                         LabelWrap.style.display ='block';
//                         removeClass(obj,that.focusCls);
//                         addClass(obj,that.onblurCls);
//                     }
//                 }
//                 //obj.onblur();
//             }else{
//                 obj.onclick = function() {
//                     if(obj.value == defaultValue && obj.value != ''){
//                         removeClass(obj,that.onblurCls);
//                         addClass(obj,that.focusCls);
//                     }else {
//                         removeClass(obj,that.onblurCls);
//                         addClass(obj,that.focusCls);
//                     }

//                 };
//                 obj.onblur = function() {
//                     if(obj.value != ''){
//                         removeClass(obj,that.focusCls);
//                         addClass(obj,that.onblurCls);
//                     }else{
//                         removeClass(obj,that.focusCls);
//                         addClass(obj,that.onblurCls);
//                     }
//                 };
//                 if (typeof(obj.oninput) == 'object') {
//                     obj.addEventListener("input", changeHandler, false);
//                 } else {
//                     obj.onpropertychange = changeHandler;
//                 }
//             };
//             return this;
//         }
//     }
//     var placeholder = function(options) { new Place(options); }
//     window.placeholder = placeholder;
//     return placeholder;
// })(window);

// readyplace(document, 'readystatechange', function(){
//     placeholder({focusCls:'finps',onblurCls:'oinps',isempty:false});
//     placeholder({tagName:'textarea',focusCls:'ftext',onblurCls:'otext',isempty:true});
// })


//算法-自动填充数据
function assemblyValue(arrayData, $target) {
    return function av(arrayData, $target, namespace) {
        for (var key in arrayData) {
            if (typeof arrayData[key] == "object")
                av(arrayData[key], $target, namespace + key + ".");
            else try {
                var $t = $target.find("[name='" + namespace + key + "']");
                if ($t.hasClass("editor-rich")) //富文本编辑器
                    $t.code(arrayData[key]);
                else if ($t.attr("type") == "checkbox")
                    $t.click();
                else
                    $t.val(arrayData[key]);
            } catch (e) {
                // console.log("找不到" + key);
            }
        }
    }(arrayData, $target, "");
}

function assemblyText(arrayData, $target) {
    return function at(arrayData, $target, namespace) {
        for (var key in arrayData) {
            if (typeof arrayData[key] == "object")
                at(arrayData[key], $target, namespace + key + ".");
            else try {
                $target.find("[name='" + namespace + key + "']").text(arrayData[key]);
            } catch (e) {
                // console.log("找不到" + key);
            }
        }
    }(arrayData, $target, "");
}


//AJAX封装
function post(_url, _data) {
    var data = null;
    $.ajax({
        async: false,
        url: _url,
        type: "POST",
        data: _data,
        success: function (data) {
            data = data;
        },
        error: function (e) {
            throw e;
        }
    });
    return data;
}

function getJson(_url, _data) {
    var json = null;
    $.ajax({
        async: false,
        url: _url,
        type: "POST",
        data: _data,
        dataType: 'json',
       // xhrFields: {
       //     withCredentials: true
        //},
        //crossDomain: true,
        success: function (data) {
            json = data;
        },
        error: function (e) {
            throw e;
        }
    });
    return json;
}

function getJsonP(_url, _data, _success, _error) {
    var json = null;
    if(_data == undefined) _data = {};
    _data.jsonpCallback = "handler"
    $.ajax({
        url: _url,
        cache: false,
        type: "POST",
        data: _data,
        dataType: 'jsonp',
        jsonpCallback: "handler",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        success: _success,
        error: _error
    });
    return json;
}

function jsonP(_url, _data) {
    if(_data == undefined) _data = {};
    _data.jsonpCallback = "handler"
    $.ajax({
        url: _url,
        cache: false,
        type: "POST",
        data: _data,
        dataType: 'jsonp',
        jsonpCallback: "handler",
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true
    });
}

function getPageCrossDomain(_url, _data, _success, _error) {
    var json = null;
    if(_data == undefined) _data = {};
    $.ajax({
        url: _url,
        dataType: "html",
        contentType: 'text/plain',
        type: "GET",
        data: _data,
        success: _success,
        error: _error
    });
    return json;
}

/**
 * 参考 http://stackoverflow.com/questions/3362474/jquery-ajax-fails-in-ie-on-cross-domain-calls @MarkPieszak
 * @param url
 * @param successCallback
 * @returns {Boolean}
 */
function crossDomainAjax (url, successCallback) {

    // IE8 & 9 only Cross domain JSON GET request
    if ('XDomainRequest' in window && window.XDomainRequest !== null) {

        var xdr = new XDomainRequest(); // Use Microsoft XDR
        xdr.open('get', url);
        xdr.onload = function (data) {
            var dom  = new ActiveXObject('Microsoft.XMLDOM'),
                JSON = $.parseJSON(xdr.responseText);

            dom.async = false;

            if (JSON == null || typeof (JSON) == 'undefined') {
                JSON = $.parseJSON(data.firstChild.textContent);
            }

            successCallback(xdr.responseText); // internal function
        };

        xdr.onerror = function() {
            _result = false;  
        };

        xdr.send();
    } 

    // IE7 and lower can't do cross domain
    else if (navigator.userAgent.indexOf('MSIE') != -1 &&
             parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
       return false;
    }    

    // Do normal jQuery AJAX for everything else          
    else {
        $.ajax({
            url: url,
            cache: false,
            dataType: 'json',
            type: 'GET',
            async: false, // must be set to false
            success: function (data, success) {
                successCallback(data);
            }
        });
    }
}

function getData(_url) {
    var data = null;
    $.ajax({
        async: false,
        url: _url,
        type: "GET",
        dataType: "text",
        success: function (d) {
            data = d;
        }
    });
    return data;
}

function getJsonAsync(_url, _data, _successcallback, _errorcallback, _beforecallback, _completecallback) {
    $.ajax({
        async: true,
        url: _url,
        type: "POST",
        data: _data,
        dataType: "json",
        success: _successcallback,
        error: _errorcallback,
        beforeSend: _beforecallback,
        complete: _completecallback
    });
}

/*倒计时*/
function countdown(count, completecallback, intervalcallback) {
    if (count == 0) {
        completecallback();
    } else {
        intervalcallback(count);
        setTimeout(function () {
            return countdown(count - 1, completecallback, intervalcallback);
        }, 1000);
    }
};

function detectOS() {
    var sUserAgent = navigator.userAgent;
    var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
    var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
    if (isMac)
        return ["Mac"];
    var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
    if (isUnix) return ["Unix"];
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    if (isLinux) return ["Linux"];
    if (isWin) {
        if (sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1) return ["Windows NT", 5.0, "Windows 2000"];
        if (sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1) return ["Windows NT", 5.1, "Windows XP"];
        if (sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1) return ["Windows NT", 5.2, "Windows 2003"];
        if (sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1) return ["Windows NT", 6.0, "Windows Vista"];
        if (sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1) return ["Windows NT", 6.1, "Windows 7"];
        if (sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1) return ["Windows NT", 6.2, "Windows 8"];
        if (sUserAgent.indexOf("Windows NT 6.3") > -1 || sUserAgent.indexOf("Windows 8.1") > -1) return ["Windows NT", 6.3, "Windows 8.1"];
        if (sUserAgent.indexOf("Windows NT 6.4") > -1 || sUserAgent.indexOf("Windows 10") > -1) return ["Windows NT", 6.4, "Windows 10 Technical Preview"];
        if (sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1) return ["Windows NT", 10.0, "Windows 10"];
    }
    return ["other"];
}


$(function(){
	var platform = detectionOS();
	if (platform == "Android") {
		location.href = "http://m.kaike.la";
	}
});


/**
 * JS判断访问设备加载不同页面
 * @author chenlc
 * @returns {String}
 */
function detectionOS() {
	var sUserAgent = navigator.userAgent;
	var isWin = (navigator.platform === "Win32") || (navigator.platform === "Windows");
    var isMac = (navigator.platform === "Mac68K") || (navigator.platform === "MacPPC") || (navigator.platform === "Macintosh") || (navigator.platform === "MacIntel");
    var bIsIpad = sUserAgent.match(/ipad/i) === "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) === "iphone os";
    var isUnix = (navigator.platform === "X11") && !isWin && !isMac;
    var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
    var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) === "android";
    var bIsCE = sUserAgent.match(/windows ce/i) === "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) === "windows mobile";
    if (isMac){ return "Mac"; }
    if (isUnix){ return "Unix"; }
    if (isLinux) { if (bIsAndroid){ return "Android"; } else { return "Linux"; } }
    if(bIsCE || bIsWM){ return 'wm'; }
    if (isWin) {
        var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K){ return "Win2000"; }
        var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP){ return "WinXP"; }
        var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003){ return "Win2003"; }
        var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista){ return "WinVista"; }
        var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7){ return "Win7"; }
        var isWin8 = sUserAgent.indexOf("Windows NT 6.2") > -1 || sUserAgent.indexOf("Windows 8") > -1;
        if (isWin8){ return "Win8"; }
    }
    return "other";
}

/**
 * 替换 <、>、&、" 为 &lt;、&gt;、&amp;、&quot;
 * @param str
 * @returns
 */
function htmlEscape(str) {
	str = str.replace(/</g, "&lt;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/&/g, "&amp;");
	str = str.replace(/\"/g, "&quot;");
	
	return str;
}