// 请求接口文件
import axios from './api' // 倒入 api
// 管理员登录
export const USER_LOGINADMIN = data => {
    return axios({
        url: `/user/loginAdmin?userName=${data.userName}&password=${data.password}&capText=${data.capText}&timestamp=${data.timestamp}`,
        method: 'get',
    })
}
// 管理员查询入金记录查询
export const ASSETS_GETUSERRECHARGESALL = data => {
    return axios({
        url: `/assets/getUserRechargesAll?state=${data.state}&uuId=${data.uuId}&pageSize=${data.pageSize}&pageNum=${data.page}&startTime=${data.startTime}&endTime=${data.endTime}`,
        method: 'get'
    })
}
// 管理员用户信息查询
export const USER_GETUSERS = data => {
    return axios({
        url: `/user/getUsers?pageSize=${data.pageSize}&pageNum=${data.page}&userId=${data.userId}`,
        method: 'get'
    })
}
// 管理员修改用户基础信息
export const USER_UPDATEUSERINFOSUPER = data => {
    return axios({
        url: `/user/updateUserInfoSuper`,
        method: 'post',
        data
    })
}
// 管理员后台登陆普通用户账号
export const USER_LOGINTEST = data => {
    return axios({
        url: `/user/loginTest?userName=${data.userName}`,
        method: 'get'
    })
}
// 管理员反馈列表
export const SYSTEM_SELECTFEEDBACK = data => {
    return axios({
        url: `/system/selectFeedback?uuId=${data.uuId}&type=${data.type}&pageSize=${data.pageSize}&pageNum=${data.page}&startTime=${data.startTime}&endTime=${data.endTime}`,
        method: 'get'
    })
}
// 获取新闻列表
export const SYSTEM_GETJOUS = data => {
    return axios({
        url: `/system/getJous?id=${data.id}&pageSize=${data.pageSize}&pageNum=${data.page}`,
        method: 'get'
    })
}
// 发布新闻
export const SYSTEM_SETJOU = data => {
    return axios({
        url: `/system/setJou`,
        method: 'post',
        data
    })
}
// 修改新闻
export const SYSTEM_UPDATEJOU = data => {
    return axios({
        url: `/system/updateJou`,
        method: 'post',
        data
    })
}
// 删除新闻
export const SYSTEM_DELETEJOU = data => {
    return axios({
        url: `/system/deleteJou`,
        method: 'post',
        data
    })
}
// 获取公告列表
export const SYSTEM_GETNOTICES = data => {
    return axios({
        url: `/system/getNotices?id=${data.id}&pageSize=${data.pageSize}&pageNum=${data.page}`,
        method: 'get'
    })
}
// 添加公告
export const SYSTEM_SETNOTICE = data => {
    return axios({
        url: `/system/setNotice`,
        method: 'post',
        data
    })
}
// 修改公告
export const SYSTEM_UPDATENOTICES = data => {
    return axios({
        url: `/system/updateNotices`,
        method: 'post',
        data
    })
}
// 删除公告
export const SYSTEM_DELETENOTICES = data => {
    return axios({
        url: `/system/deleteNotices`,
        method: 'post',
        data
    })
}
export default {
    USER_LOGINADMIN,
    ASSETS_GETUSERRECHARGESALL,
    USER_GETUSERS,
    USER_UPDATEUSERINFOSUPER,
    USER_LOGINTEST,
    SYSTEM_SELECTFEEDBACK,
    SYSTEM_GETJOUS,
    SYSTEM_SETJOU,
    SYSTEM_UPDATEJOU,
    SYSTEM_DELETEJOU,
    SYSTEM_GETNOTICES,
    SYSTEM_SETNOTICE,
    SYSTEM_UPDATENOTICES,
    SYSTEM_DELETENOTICES
}
