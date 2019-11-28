const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: "localhost", // 域名
    user: "root", // mysql用户名
    password: "root", // mysql密码
    prot: "3306", // 端口号
    database: "myblog" // 数据库
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root",
    prot: "3306",
    database: "myblog"
  }
}

module.exports = {
  MYSQL_CONF
}