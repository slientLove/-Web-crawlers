const url = require('url');
let getUrl = require('./url.js');
let fs = require('fs');
let JSDOM = require('jsdom').JSDOM;
getUrl.getUrl("https://www.baidu.com/",buffer => {
    let html = buffer.toString();
    let dom = new JSDOM(html);
    let document = dom.window.document;
    let data = document.querySelector("#lg img");
    console.log(data);
    fs.createWriteStream('1.png',data,(err) => {
         console.log(err);
    })
},() => {
    console.log("发生错误");
})