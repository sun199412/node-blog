const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')
// 读取数据
fs.readFile(fileName, (err, data) => {
  if(err){
    console.error(err)
  }
  console.log('读取的数据为:', data.toString())
})