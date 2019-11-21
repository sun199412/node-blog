const fs = require('fs')
const path = require('path')

// 用promise获取文件内容
function getFileContent(fileName) {
    return new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, fileName)
        fs.readFile(fullFileName, (err, data) => {
            if(err) {
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
}

// promise测试
getFileContent('a.json').then(aData => {
    console.log('aData', aData)
    return getFileContent(aData.next)
}).then(bData => {
    console.log('bData', bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log('cData', cData)
})