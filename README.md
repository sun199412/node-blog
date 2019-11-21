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

                                 
                                 
                              

