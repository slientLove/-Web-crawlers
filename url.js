const url = require('url');
exports.getUrl = function(urls,success,err){
    getUrl(urls);
    function getUrl(urls){
        let urlpath = url.parse(urls);      // 格式化请求路径
        let getWay = null;                 // 判断请求的协议
        if(urlpath.protocol=="http:"){
            getWay=require("http");
        }else{
            getWay = require("https");
        }

        let req = getWay.request({
            hostname: urlpath.hostname,
            path: urlpath.path
        },(res,err) => {
            if(res.statusCode==200){
                let arr = [];
                res.on("data",buffer => {
                    arr.push(buffer);
                });
                res.on("end",() => {
                    let data = Buffer.concat(arr);          // 将数据合并成二进制流
                    success&&success(data);
                });
            }else if(res.statusCode==301||res.statusCode==302){
                getWay(res.headers["location"])  // 当发生重定向时，会有一个location的新地址
            }else{
                console.log(`发生错误:`+res.statusCode);
                error&&error(err);
            }
        });
        req.on("err",err => {
            console.log("请求发生错误"+err);
        });
        req.end();
    }
}