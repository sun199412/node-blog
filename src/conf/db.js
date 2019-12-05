const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  // mysql
  MYSQL_CONF = {
    host: "localhost", // 域名
    user: "root", // mysql用户名
    password: "root", // mysql密码
    prot: "3306", // 端口号
    database: "myblog" // 数据库
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
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

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}