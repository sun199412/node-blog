const http = require('http')

const server = http.createServer((req, res) => {
    if(req.method === 'POST') {
        // req 数据格式
        console.log('请求头数据:', req.headers['content-type']);
        // 接收数据
        let postData = '';
        req.on('data', code => {
            postData += code.toString()
        })
        req.on('end', ()=> {
            console.log('postdata', postData)
            res.end('hello, world')
        })
    }
})

server.listen(5000, ()=>{
    console.log('server is running')
})