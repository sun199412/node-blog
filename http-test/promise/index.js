const fs = require('fs')
const path = require('path')

// callback方式获取一个文件的内容
function getFileContent(fillname, callback) {
    const fullFileName = path.resolve(__dirname, fillname)
    fs.readFile(fullFileName, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        callback(
            JSON.parse(data.toString())
        )
    })
}

// 测试
getFileContent('a.json', aData => {
    console.log('aData', aData)
    getFileContent(aData.next, bData => {
        console.log('bData', bData)
        getFileContent(bData.next, cData => {
            console.log('cData', cData)
        })
    })
})
