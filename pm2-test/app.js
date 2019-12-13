const http = require('http')

const server = http.createServer((req, res) => {
    // 模拟日志
    console.log('current time', Date.now())
    // 模拟错误
    console.error('假装出错', Date.now())

    // 模拟一个请求
    if(req.url === '/err') {
        throw new Error('/err 出错了')
    }

    res.setHeader('Content-type', 'application/json')
    res.end(
        JSON.stringify({
            errno: 0,
            msg: 'pm2 test server 1'
        })
    )
})
server.listen(5000, () => {
    console.log('server is running at 5000')
})