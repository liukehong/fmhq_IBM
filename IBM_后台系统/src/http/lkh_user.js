// 请求接口文件
import axios from './api' // 倒入 api
// 登录
export const USER_LOGIN = data => {
    return axios({
        url: `/user/login?userName=${data.userName}&password=${data.password}&type=${data.type}&capText=${data.capText}&timestamp=${data.timestamp}`,
        method: 'get',
    })
}
// 修改密码（手机号验证修改）
export const USER_UPDATEPASSWORD = data => {
    return axios({
        url: `/user/updatePassword`,
        method: 'post',
        data
    })
}
//  用户注册接口
export const USER_RECOMMENDREDISTERED = data => {
    return axios({
        url: `/user/recommendRegistered`,
        method: 'post',
        data
    })
}
// 找回登录密码
export const USER_RETRIEVEPASSWORD = data => {
    return axios({
        url: `/user/retrievePassword`,
        method: 'post',
        data
    })
}
// 用户基础信息查询
export const USER_GETUSERINFO = () => {
    return axios({
        url: `/user/getUserInfo`,
        method: 'get',
    })
}
// 修改用户基础信息
export const USER_UPDATEUSERINFO = data => {
    return axios({
        url: `/user/updateUserInfo`,
        method: 'post',
        data
    })
}
// 修改手机号
export const USER_UPDATEMOBILE = data => {
    return axios({
        url: `/user/updateMobile`,
        method: 'post',
        data
    })
}
// 注册新会会员
export const USER_REGISTERED = data => {
    return axios({
        url: `/user/registered`,
        method: 'post',
        data
    })
}
export default {
    USER_LOGIN,
    USER_UPDATEPASSWORD,
    USER_RECOMMENDREDISTERED,
    USER_RETRIEVEPASSWORD,
    USER_GETUSERINFO,
    USER_UPDATEUSERINFO,
    USER_UPDATEMOBILE,
    USER_REGISTERED,
}
