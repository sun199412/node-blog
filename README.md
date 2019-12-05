# 开发接口
| 描述 | 接口 | 方法 | url参数 | 备注 |
| :----: | :----: | :----: | :----: | :----: |
| 获取博客列表 | /api/blog/list | get | author作者，keyword搜索关键字 | 参与为空的话，则不进行查询过滤 |
| 获取一篇博客的内容 | /api/blog/detail | get | id |   |
| 新增一篇博客 | /api/blog/new | post |  | post中有新增的信息 |
| 更新一篇博客 | /api/blog/update | post | id | postData中有更新的内容 |
| 删除一篇博客 | /api/blog/del | post | id |  |
| 登录 | /api/blog/login | post |  | postData中有用户名和密码 |

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

