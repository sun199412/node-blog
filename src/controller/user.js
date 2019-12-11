const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const logins = (username, password) => {
    // 先使用假数据
    // if (username === 'admin' && password === '123456') {
    //     return true
    // }
    // return false

    username = escape(username)

    // 生成加密密码
    password = genPassword(password)
    password = escape(password)
    const sql = `
        select * from users where username=${username} and password=${password}
    `
    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}
module.exports = {
    logins
}