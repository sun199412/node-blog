const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeStram, log) {
    writeStram.write(log + '\n')
}

// 生成write Stream
function createWriteStream(fileName) {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStram = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStram
}
// 写访问日志
const accessWriteStram = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStram, log)
}
module.exports = {
    access
}