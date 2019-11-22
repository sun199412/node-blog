const loginCheck = (username, password) => {
    // 先使用假数据
    if (username === 'admin' && password === '123456') {
        return true
    }
    return false
}
module.exports = {
    loginCheck
}