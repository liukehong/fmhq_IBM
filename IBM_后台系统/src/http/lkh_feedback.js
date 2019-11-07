// 请求接口文件
import axios from './api' // 倒入 api
// 发送反馈接口
export const SYSTEM_ADDFEED = data => {
    return axios({
        url: `/system/addFeed`,
        method: 'post',
        data
    })
}
// 反馈列表
export const SYSTEM_SELECT = data => {
    return axios({
        url: `/system/select?pageSize=${data.pageSize}&pageNum=${data.page}&startTime=${data.startTime}&endTime=${data.endTime}&type=${data.type}`,
        method: 'get'
    })
}
// 回复反馈
export const SYSTEM_ADDREPLY = data => {
    return axios({
        url: `/system/addReply`,
        method: 'post',
        data
    })
}
// 回复列表
export const SYSTEM_SELECTREPLY = data => {
    return axios({
        url: `/system/selectReply?feedbackId=${data.feedbackId}&pageSize=${data.pageSize}&pageNum=${data.page}&startTime=${data.startTime}&endTime=${data.endTime}`,
        method: 'get'
    })
}
export default {
    SYSTEM_ADDFEED,
    SYSTEM_SELECT,
    SYSTEM_ADDREPLY,
    SYSTEM_SELECTREPLY
}
