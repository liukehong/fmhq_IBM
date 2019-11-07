// 请求接口文件
import axios from './api' // 倒入 api
// 获取验证码 (不需要token,即不知道手机号或者邮箱)
export const VERIFICATION_SENDCODE = data => {
    return axios({
        url: `/verification/sendCode?key=${data.key}&type=${data.type}`,
        method: 'get',
    })
}
// 获取验证码 (需要token,即已经知道了手机号或者邮箱)
export const VERIFICATION_SENDCODES = data => {
    return axios({
        url: `/verification/sendCodes?type=${data.type}`,
        method: 'get',
    })
}
// 校验验证码 (需要token)
export const VERIFICATION_CODEVERIFICATIONS = data => {
    return axios({
        url: `/verification/codeVerifications?code=${data.code}&type=${data.type}`,
        method: 'get',
    })
}
// 校验验证码 (不需要token)
export const VERIFICATION_CODEVERIFICATION = data => {
    return axios({
        url: `/verification/codeVerification?code=${data.code}&type=${data.type}&key=${data.key}`,
        method: 'get',
    })
}
// 获取父级推荐码
export const USER_GETINVITE = data => {
    return axios({
        url: `/user/getInvite?superUserId=${data}`,
        method: 'get',
    })
}
// 找回密码获取验证码
export const VERIFICATION_SENDCODERETRIEVEPASSWORD = data => {
    return axios({
        url: `/verification/sendCodeRetrievepassword?userName=${data.userName}&type=${data.type}`,
        method: 'get',
    })
}
// 获取国家三级联动接口
export const EXHIBITION_GETCOUNTRY = data => {
    return axios({
        url: `/exhibition/getCountry?code=${data.code}&type=${data.type}`,
        // url: `/exhibition/getCountry?code=${data.code}&type=${data.type}`,
        method: 'get',
    })
}
// 上传文件
export const FILE_UPLOAD = data => {
    return axios({
        url: `/file/upload`,
        method: 'post',
        data
    })
}
// 根据用户ID精确查询
export const USER_SELECTUSERID = data => {
    return axios({
        url: `/user/selectUserId?userId=${data}`,
        method: 'get',
    })
}
// 获取汇率
export const SYSTEM_EXCHANGERATE = () => {
    return axios({
        url: `/system/exchangeRate`,
        method: 'get',
    })
}
// 合同
export const SYSTEM_HETONG = (data) => {
    return axios({
        url: `/system/hetong?lang=${data.lang}&mt4Id=${data.mt4Id}`,
        method: 'get',
    })
}
// 推荐列表
export const USER_SUPERGETUSERINFO = (data) => {
    return axios({
        url: `/user/superGetUserInfo?uuId=${data.uuId}`,
        method: 'get',
    })
}
export default {
    VERIFICATION_SENDCODE,
    VERIFICATION_SENDCODES,
    VERIFICATION_CODEVERIFICATIONS,
    VERIFICATION_CODEVERIFICATION,
    USER_GETINVITE,
    VERIFICATION_SENDCODERETRIEVEPASSWORD,
    EXHIBITION_GETCOUNTRY,
    FILE_UPLOAD,
    USER_SELECTUSERID,
    SYSTEM_EXCHANGERATE,
    SYSTEM_HETONG,
    USER_SUPERGETUSERINFO
}
