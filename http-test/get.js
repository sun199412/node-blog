/* 
    get方式
*/
const http = require('http');
const queryString = require("querystring");

const server = http.createServer((req, res) => {
    const url = req.url;
    req.query = queryString.parse(url.split('?')[1]);

    res.end(JSON.stringify(req.query));
})

server.listen(8000, ()=>{
    console.log("server is start")
});