var fs = require('fs');
//mock假数据， 将线上环境的路由   ajax访问 映射到开发环境
/**
 *  @param route: ./mock/data/distHTML/test.html
 *
**/
var redirect = function(route){
    console.log("redirect执行...");
	return function(req, res, param){
        //重定向到 ./mock/data/distHTML/test.html
		res.writeHead(302, {
		  'Location': route + param
		});
		res.end();
	}
};
/**
 *  @param route: ./mock/data/json/test.json
 *  @param jsonStr: {isSuccess:1}
**/
var ajax = function(route, jsonStr){
    console.log("ajax执行...");
    return function(req, res){        
        res.setHeader("Access-Control-Allow-Origin",true);
        res.setHeader("Content-Type", "application/json;charset=utf-8");
        if(route){
            delete require.cache[require.resolve(route)];
            res.end(JSON.stringify(require(route)));
        } else {
            res.end(JSON.stringify(jsonStr));
        }
    }
}
/**
 *  @param route: ./mock/data/json/jsonP.json
 *  @param jsonStr: {isSuccess:1}
**/
var jsonP = function(route, jsonStr){
    console.log("jsonP执行...");
    return function(req, res, param, jsonpCallback){        
        res.setHeader("Access-Control-Allow-Origin",true);
        res.setHeader("Content-Type", "application/json;charset=utf-8");
        if(route){
            delete require.cache[require.resolve(route)];
            res.end(jsonpCallback + "(" + JSON.stringify(require(route)) + ")");
        } else {
            res.end(jsonpCallback + "(" + JSON.stringify(jsonStr) + ")");
        }
    }
}
var render_html = function(filePath){
    console.log("render_html执行...");
    return function(req, res){
        res.setHeader("Content-Type", "text/html");
        res.end(readFile(filePath));
    }
}
/**
 *  @param filePath: ./mock/data/renderHTML/test.html
 *
**/
var readFile = function(filePath){
    console.log("readFile执行...");
    try {
        var str = fs.readFileSync(filePath, 'utf8');
    } catch(e) {
        console.error('readFile ', filePath, ' error!');
        console.error(e);
    }
    return str;
}

/**
 *   gulp task 启动时，ajax，render_html，readFile， redirect函数会执行...
 *
**/
var mocks = {
    //'/getJson.do': ajax('./mock/data/json/test.json'),
    '/getJson.do': ajax(null, {"success" : true}),
    '/getHTML.do': render_html('./mock/data/renderHTML/test.html'),
    '/redirectToHTML.do': redirect('./mock/data/distHTML/test.html'),
    // '/getJsonP.do': jsonP('./mock/data/json/jsonP.json')
    '/getJsonP.do': jsonP(null, {"success" : false})
}

var middleware = function(){
    //任何一个请求(css,js,img,ajax)都会经过这里
    return function (req, res, next){
        var url = req.url;
        //如果是ajax请求，如/getJson.do?type=1，截取查询参数：type=1
        var parameter = "";
        //jsonP回调函数
        var jsonpCallback = null;
        //如果请求中包含参数
        if(url.indexOf('?') > 0) {
            if(url.indexOf("callback") === -1) {
                //非jsonp请求.请求格式为："/getJsonP.do?callback=handler321&jsonpCallback=handler321&_=1464251185988"，因此包含callback字符串
                var index =  url.indexOf('?');
                parameter = index > 0 ? url.slice(index) : "";
                url = url.slice(0, url.indexOf('?'));
            } else {
                //jsonp请求.请求格式为："/getJsonP.do?callback=handler&jsonpCallback=handler&_=1464161171204"，因此包含callback字符串
                jsonpCallback = url.slice(url.indexOf("jsonpCallback")+14,url.indexOf("&_="));
                url = url.slice(0, url.indexOf('?'));
            }
        }
        if (mocks[url]) {
            // ajax('./mock/data/json/test.json')(req, res, parameter);
            mocks[url](req, res, parameter, jsonpCallback);
        }
        next();
    }
}
exports.middleware = middleware;
exports.mocks = mocks;