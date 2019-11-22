// 博客列表
const getList = (author, keyword) => {
    // 先返回假数据(格式是正确的)
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1574238970918,
            author: '张三'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1574239013571,
            author: '李四'
        }
    ]
}

// 根据id查询博客详情
const getDetail = (id) => {
    // 先返回假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1574238970918,
        author: '张三'
    }
}

// 新建博客的返回
const newBlog = (blogData = {}) => {
    // blogData 是一个对象，包含title, content属性
    console.log('newBlog blogData...', blogData)
    return {
        id: 3 // 表示新建博客，插入到数据表里面的id
    }
}

// 更新博客返回
const updateBlog = (id, blogData = {}) => {
    // id: 就是要更新博客的id
    // blogData: 一个博客对象，包含title, content属性
    console.log('update log', id, blogData)
    return true
}

// 删除博客返回
const delBlog = id => {
    // id: 要删除博客的id
    return true   
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}