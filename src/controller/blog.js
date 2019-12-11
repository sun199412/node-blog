
const { exec, escape } = require('../db/mysql')
const xss = require('xss')
// 博客列表
const getList = (author, keyword) => {
    // 先返回假数据(格式是正确的)
    // return [
    //     {
    //         id: 1,
    //         title: '标题A',
    //         content: '内容A',
    //         createTime: 1574238970918,
    //         author: '张三'
    //     },
    //     {
    //         id: 2,
    //         title: '标题B',
    //         content: '内容B',
    //         createTime: 1574239013571,
    //         author: '李四'
    //     }
    // ]

    let sql = `select * from blogs where 1=1 `
    if(author) {
        sql += `and author = ${author}`
    }
    if(keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += `order by createtime desc;`

    // 返回promise
    return exec(sql)
}

// 根据id查询博客详情
const getDetail = (id) => {
    // 先返回假数据
    // return {
    //     id: 1,
    //     title: '标题A',
    //     content: '内容A',
    //     createTime: 1574238970918,
    //     author: '张三'
    // }

    const sql = `select * from blogs where id='${id}' `
    return exec(sql).then(rows => {
        return rows[0]
    })
}

// 新建博客的返回
const newBlog = (blogData = {}) => {
    // blogData 是一个对象，包含title, content属性
    // return {
    //     id: 3 // 表示新建博客，插入到数据表里面的id
    // }

    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author
    const createtime = Date.now()

    const sql = `
        insert into blogs(title, content, createtime, author) values('${title}', '${content}', '${createtime}', '${author}')
    `

    return exec(sql).then(insertData => {
        console.log('insertData is ', insertData)
        return {
            id: insertData.insertId
        }
    })
}

// 更新博客返回
const updateBlog = (id, blogData = {}) => {
    // id: 就是要更新博客的id
    // blogData: 一个博客对象，包含title, content属性
    // return true


    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const sql = `
        update blogs set title='${title}',content='${content}' where id='${id}'
    `
    return exec(sql).then(updateData => {
        console.log('updateData is', updateData)
        if(updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

// 删除博客返回
const delBlog = (id, author) => {
    // id: 要删除博客的id
    // return true   

    const sql = `
        delete from blogs where id='${id}' and author='${author}'
    `
    return exec(sql).then(val => {
        console.log
        if(val.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}