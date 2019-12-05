const { logins } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method // GET,POST

    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = logins(username, password)
        // if (result) {
        //     return new SuccessModel()
        // } else {
        //     return new ErrorModel('登录失败')
        // }

        return result.then(data => {
            if(data.username) {
                // 设置 session
                req.session.username = data.username
                req.session.realname = data.realname
                console.log('req.session is', req.session)
                // 同步到 redis
                set(req.sessionId, res.session)
                return new SuccessModel()
            }
            return new ErrorModel('登录失败')
        })
    }

    // 登录验证的测试
    // if(method === 'GET' && req.path === '/api/user/login-test') {
    //     if(req.session.username) {
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session.username
    //         }))
    //     }
    //     return Promise.resolve(new ErrorModel('尚未登录'))
    // }
}

module.exports = handleUserRouter