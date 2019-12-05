const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.error(err)
})

// 测试
redisClient.set('myname', 'zhangsan', redis.print)
redisClient.get('myname', (err, data) => {
    if(err) {
        console.error(err)
        return
    }
    console.log('val', data)

    redisClient.quit()
})