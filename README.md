# 开发接口
| 描述 | 接口 | 方法 | url参数 | 备注 |
| :----: | :----: | :----: | :----: | :----: |
| 获取博客列表 | /api/blog/list | get | author作者，keyword搜索关键字 | 参与为空的话，则不进行查询过滤 |
| 获取一篇博客的内容 | /api/blog/detail | get | id |   |
| 新增一篇博客 | /api/blog/new | post |  | post中有新增的信息 |
| 更新一篇博客 | /api/blog/update | post | id | postData中有更新的内容 |
| 删除一篇博客 | /api/blog/del | post | id |  |
| 登录 | /api/blog/login | post |  | postData中有用户名和密码 |

# 主要功能：
  1. 处理http接口
  2. 连接数据库
  3. 实现登录
  4. 安全(sql注入，xss攻击，密码加密)
  5. 日志
  6. 上线

# nodejs的学习
  1. **简单的nodejs案例**      
    ```
      const http = require('http')

      const server = http.createServer((req, res) => {
        res.end('hello, world!')
      })

      server.listen(5000, () => {
        console.log('server is start!!!')
      })
    ```

  2. **get方式的案例**          
    ```
      const http = require('http');
      const queryString = require("querystring");

      const server = http.createServer((req, res) => {
          const url = req.url;
          req.query = queryString.parse(url.split('?')[1]);

          res.end(JSON.stringify(req.query));
      })

      server.listen(8000, ()=>{
          console.log("server is start")
      });
    ```

  3. **post方式的案例**     
    ```
      const http = require('http')

      const server = http.createServer((req, res) => {
          if(req.method === 'POST') {
              // req 数据格式
              console.log('请求头数据:', req.headers['content-type']);
              // 接收数据
              let postData = '';
              req.on('data', code => {
                  postData += code.toString()
              })
              req.on('end', ()=> {
                  console.log('postdata', postData)
                  res.end('hello, world')
              })
          }
      })

      server.listen(5000, ()=>{
          console.log('server is running')
      })
    ```

  4. **promise的案例**    
     * **普通的回调地狱模式**
      ```
        getFileContent('a.json', aData => {
          console.log('aData', aData)
          getFileContent(aData.next, bData => {
              console.log('bData', bData)
              getFileContent(bData.next, cData => {
                  console.log('cData', cData)
              })
          })
        })
      ```
     * **[详细代码请看：http-test/promise/index.js](http-test/promise/index.js)**

     * **promise模式** 
      ```
        getFileContent('a.json').then(aData => {
            console.log('aData', aData)
            return getFileContent(aData.next)
        }).then(bData => {
            console.log('bData', bData)
            return getFileContent(bData.next)
        }).then(cData => {
            console.log('cData', cData)
        })
      ```
     * **[详细代码请看：http-test/promise/promise.js](http-test/promise/promise.js)**

  5. **mysql的使用**   
    1. **下载安装mysql**       
    2. **安装可视化工具SQLyog**   

  6. **操作数据库**    
     * **创建myblog数据库**
      ```
        create Table myblog character set utf8; 
        use myblog;
      ```

     * **创建user表**
  
        * **展示内容**
          | id | username | password | realname |
          | :----: | :----: | :----: | :----: |
          | 1 | zhangsan | 123 | 张三 |
          | 2 | lisi | 123 | 李四 |

        * **创建的格式**
          | 列名 | 数据类型 | 长度 | 主键? | 非空? | 自增? | 默认 |
          | :----: | :----: | :----: | :----: | :----: | :----: | :----: |
          | id | int | 11 | Y | Y | Y |  |
          | username | varchar | 20 |  | Y |  |  | 
          | password | varchar | 20 |  | Y |  |  |
          | realname | varchar | 10 |  | Y |  |  |



     * **创建blog表**

        * **展示内容**
          | id | title | content | createtime | author |
          | :----: | :----: | :----: | :----: | :----: |
          | 1 | 标题1 | 内容1 | 1542512972176 | zhangsan |
          | 2 | 标题1 | 内容1 | 1542512982176 | lisi |

        * **创建格式**
          | 列名 | 数据类型 | 长度 | 主键? | 非空? | 自增? | 默认 |
          | :----: | :----: | :----: | :----: | :----: | :----: | :----: |
          | id | int | 11 | Y | Y | Y |  |
          | title | varchar | 50 |  | Y |  |  | 
          | content | longtext |  |  | Y |  |  |
          | createtime | bigint | 10 |  | Y |  |  |
          | author | varchar | 20 |  | Y |  |  |
                                 
     * mysql的增删改查   
        * 新增
          ```
          insert into users(username, `password`, realname) values ("zhangsan", "123", "张三"); 
          ```
        * 删除                  
          ```
          delete from users where username = "lisi";
          ```
        * 修改
          ```
            update users set realname = "李四2" where username = 'lisi';
          ```
        * 查询
          ```
            select * from users;
            select id, username from users order by id;
          ```

  7. **nodejs操作mysql**  
     * 步骤：
        1. 引入mysql
        2. 创建连接对象
        3. 连接
        4. 执行sql
        5. 关闭连接

     * **[详细代码请看：http-test/mysql.js](http-test/mysql.js)**

  8. **封装mysql工具**
     * 步骤：
        1. 在src文件夹下，创建db.js，配置变量
          * **[详细代码请看：src/conf/db.js](src/conf/db.js)**

        2. 在src文件夹下，创建mysql.js，写入公共函数exec
          * **[详细代码请看：src/db/mysql.js](src/db/mysql.js)**      

  9. **服务器端修改cookie**
      ```
        res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpries()}`)
      ```

  10. **redis的使用**
    1. **下载安装redis**
      * [下载地址： https://www.runoob.com/redis/redis-install.html](https://www.runoob.com/redis/redis-install.html)

      * **启动命令： redis-server.exe redis.windows.conf**

    2. **redis的使用步骤**
      ```
        const redis = require('redis')
        // 创建客户端
        const redisClient = redis.createClient(6379, '127.0.0.1')
        redisClient.on('error', err => {
            console.error(err)
        })

        // 测试
        redisClient.set('myname', 'zhangsan', redis.print)
        redisClient.get('myname', (err, data) => {
            if(err) {
                console.error(err)
                return
            }
            console.log('val', data)

            redisClient.quit()
        })
      ```

  11. **nginx的使用**    
    1. **nginx的下载安装**    
    2. **nginx在windows的启动**    
      * start nginx: 启动
      * nginx -s reload： 重启
    3. 将打包后的代码放到nginx目录下的html文件夹里，修改配置在conf文件里

  12. **stream的使用**      
    3. **使用场景： 解决要读写的文件过大的情况，使用pipe管道模式，用流的方式读写**
      * [详细代码请看：http-test/file/stream/readStream.js](http-test/file/stream/readStream.js)
        ```
          const fs = require('fs')
          const path = require('path')

          // 输入输出的路径
          const fileName1 = path.resolve(__dirname, 'data.txt')
          const fileName2 = path.resolve(__dirname, 'write.txt')

          // 创建stream对象
          const readStream = fs.createReadStream(fileName1)
          const writeStream = fs.createWriteStream(fileName2)

          // 管道连接
          readStream.pipe(writeStream)

          readStream.on('data', chunk => {
            console.log(chunk.toString())
          })
          readStream.on('end', () => {
            console.log('复制完成')
          })

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
        ```
  13. **使用node的readline方法，提高stream的效率**    
      * [详细代码请看：src/utils/readline.js](src/utils/readline.js)

  14. **编写日志**
      * 详细代码请看：
        1. [src/utils/readline.js](src/utils/readline.js)
        2. [src/utils/log.js](src/utils/log.js)
        3. [logs/access.log](logs/access.log)
        4. [logs/err.log](logs/err.log)
        5. [logs/event.log](logs/event.log)

  15. 安全部分：   
      * sql注入：
        * 攻击方式：输入一个sql片段，最终拼接成一段攻击代码
        * 预防措施：使用mysql的escape函数处理输入内容即可

        * 攻击代码片段：
          ```
            1. 前端输入 zhangsan' --
            这种情况下，密码输入任意值都能登录
            SELECT * FROM users WHERE username='zhangsan'-- 'and `password`='123'

            2. 前端输入 zhangsan'; delete from users; --
            这种情况下，就会删除user表
            SELECT * FROM users WHERE username='zhangsan';DELETE FROM users; -- and `password`='123'
          ```

      * xss攻击：
        * 攻击方式： 在页面展示内容中掺杂js代码，以获取网页信息
        * 预防措施： 转换生成js的特殊字符

        * 攻击代码片段：
          ```
            前端在表单中输入:
            <script>document.cookie</script>
          ```
        
        * 解决办法：
          ```
            安装xss  npm install --save xss
            然后在表单中用xss包裹
          ```

      * 密码加密

  16. PM2的使用
        1. 下载安装
            ```
              npm install -g pm2

              pm2 --version
            ```

        2. 常用命令
            ```
              pm2 start ...               // 启动
              pm2 list                    // 查看具体信息
              pm2 restart <AppName>/<id>  // 重启  
              pm2 stop <AppName>/<id>     // 停止
              pm2 delete <AppName>/<id>   // 删除
              pm2 info <AppName>/<id>     // 查看
              pm2 log <AppName>/<id>      // 日志
            ```
        
        3. [pm2的详细使用请看:](pm2-test/app.js)

        4. **pm2的配置文件(详细)**
          ```
            {
              "apps": {
                "name": "wuwu",                             // 项目名          
                "script": "./bin/www",                      // 执行文件
                "cwd": "./",                                // 根目录
                "args": "",                                 // 传递给脚本的参数
                "interpreter": "",                          // 指定的脚本解释器
                "interpreter_args": "",                     // 传递给解释器的参数
                "watch": true,                              // 是否监听文件变动然后重启
                "ignore_watch": [                           // 不用监听的文件
                    "node_modules",
                    "logs"
                ],
                "exec_mode": "cluster_mode",                // 应用启动模式，支持fork和cluster模式
                "instances": 4,                             // 应用启动实例个数，仅在cluster模式有效 默认为fork；或者 max
                "max_memory_restart": 8,                    // 最大内存限制数，超出自动重启
                "error_file": "./logs/app-err.log",         // 错误日志文件
                "out_file": "./logs/app-out.log",           // 正常日志文件
                "merge_logs": true,                         // 设置追加日志而不是新建日志
                "log_date_format": "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
                "min_uptime": "60s",                        // 应用运行少于时间被认为是异常启动
                "max_restarts": 30,                         // 最大异常重启次数，即小于min_uptime运行时间重启次数；
                "autorestart": true,                        // 默认为true, 发生异常的情况下自动重启
                "cron_restart": "",                         // crontab时间格式重启应用，目前只支持cluster模式;
                "restart_delay": "60s"                      // 异常重启情况下，延时重启时间
                "env": {
                  "NODE_ENV": "production",                // 环境参数，当前指定为生产环境 process.env.NODE_ENV
                  "REMOTE_ADDR": "爱上大声地"               // process.env.REMOTE_ADDR
                },
                "env_dev": {
                  "NODE_ENV": "development",              // 环境参数，当前指定为开发环境 pm2 start app.js --env_dev
                  "REMOTE_ADDR": ""
                },
                "env_test": {                               // 环境参数，当前指定为测试环境       pm2 start app.js --env_test
                  "NODE_ENV": "test",
                  "REMOTE_ADDR": ""
                }
              }
            }
          ```

  