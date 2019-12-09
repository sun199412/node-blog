const http = require('http')
const fs = require('fs')
const path = require('path')
const fileName1 = path.resolve(__dirname, 'write.txt')

const server = http.createServer((req, res) => {
  if(req.method === 'GET') {
    const readStream = fs.createReadStream(fileName1)
    readStream.pipe(res)
  }
})

server.listen(5000, ()=> {
  console.log('server is running')
})