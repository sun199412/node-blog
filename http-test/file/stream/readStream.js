const fs = require('fs')
const path = require('path')

// 输入输出的路径
const fileName1 = path.resolve(__dirname, 'data.txt')
const fileName2 = path.resolve(__dirname, 'write.txt')

// 创建stream对象
const readStream = fs.createReadStream(fileName1)
const writeStream = fs.createWriteStream(fileName2)

// 管道连接
readStream.pipe(writeStream)

readStream.on('data', chunk => {
  console.log(chunk.toString())
})
readStream.on('end', () => {
  console.log('复制完成')
})
