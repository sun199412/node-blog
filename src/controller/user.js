const { exec } = require('../db/mysql')

const loginCheck = (username, password) => {
    // 先使用假数据
    // if (username === 'admin' && password === '123456') {
    //     return true
    // }
    // return false

    const sql = `
        select * from users where username='${username}' and password='${password}'
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}
module.exports = {
    loginCheck
}