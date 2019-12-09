const fs = require('fs')
const path = require('path')
// 写入路径
const fileName = path.resolve(__dirname, 'write.txt')

// 写入数据
const writeData = '这是要写入的数据'
fs.writeFile(fileName, writeData, (err)=> {
  if(err) {
    console.error(err)
  }
  console.log('写入成功')
})