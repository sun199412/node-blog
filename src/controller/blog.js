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
module.exports = {
    getList,
    getDetail
}