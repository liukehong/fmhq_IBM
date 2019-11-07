// 请求接口文件
import axios from './api' // 倒入 api
const baseURL = 'https://api.exchangerate.enrich-global.com:8443'
// 登录
export const IBM_ADMIN_LOGIN = data => {
    return axios({
        url: `/ibm/admin/login`,
        method: 'post',
        data
    })
}
// 退出
export const IBM_ADMIN_LOGOUT = data => {
    return axios({
        url: `/ibm/admin/logout`,
        method: 'post',
        data
    })
}
// 出金流水列表
export const IBM_ADMIN_GETGOLDINFO = data => {
    return axios({
        url: `/ibm/admin/getGoldInfo`,
        method: 'post',
        data
    })
}
// 入金流水列表
export const IBM_ADMIN_SETGOLDINFO = data => {
    return axios({
        url: `/ibm/admin/setGoldInfo`,
        method: 'post',
        data
    })
}
// 入金回调
export const IBM_UTILS_CALLBACK = data => {
    return axios({
        url: `/ibm/utils/callback`,
        method: 'post',
        data
    })
}
// 社区成员净入金
export const IBM_ADMIN_RECHARGECUSTOM = data => {
    return axios({
        url: `/ibm/admin/rechargeCustom`,
        method: 'post',
        data
    })
}
// 会员钱包明细列表
export const IBM_ADMIN_WALLETINFO = data => {
    return axios({
        url: `/ibm/admin/walletInfo`,
        method: 'post',
        data
    })
}
// 出金审核
export const IBM_ADMIN_AUDITGOLD = data => {
    return axios({
        url: `/ibm/admin/auditGold`,
        method: 'post',
        data
    })
}
// 管理员转账
export const IBM_ADMIN_TRANSFER = data => {
    return axios({
        url: `/ibm/admin/transfer`,
        method: 'post',
        data
    })
}
// 会员列表
export const IBM_ADMIN_ALLUSERINFO = data => {
    return axios({
        url: `/ibm/admin/allUserInfo`,
        method: 'post',
        data
    })
}
// 管理员获取用户详情
export const IBM_ADMIN_INFO = data => {
    return axios({
        url: `/ibm/admin/info`,
        method: 'post',
        data
    })
}
// 管理员修改用户信息
export const IBM_ADMIN_UPDATEUSER = data => {
    return axios({
        url: `/ibm/admin/updateUser`,
        method: 'post',
        data
    })
}
// 管理员审核用户状态
export const IBM_ADMIN_USEREXAMINE = data => {
    return axios({
        url: `/ibm/admin/userExamine`,
        method: 'post',
        data
    })
}
// 配套购买记录列表
export const IBM_ADMIN_MATINFO = data => {
    return axios({
        url: `/ibm/admin/matInfo`,
        method: 'post',
        data
    })
}
// 反馈信息列表
export const IBM_ADMIN_SELECT = data => {
    return axios({
        url: `/ibm/admin/select`,
        method: 'post',
        data
    })
}
// 回复列表
export const IBM_FEEDBACK_SELECTREPLY = data => {
    return axios({
        url: `/ibm/feedback/selectReply`,
        method: 'post',
        data
    })
}
// 提交回复
export const IBM_ADMIN_ADDREPLY = data => {
    return axios({
        url: `/ibm/admin/addReply`,
        method: 'post',
        data
    })
}
// 公告列表
export const IBM_ADMIN_NOTICEINFO = data => {
    return axios({
        url: `/ibm/admin/noticeInfo`,
        method: 'post',
        data
    })
}
// 添加公告
export const IBM_ADMIN_ADDNOTICE = data => {
    return axios({
        url: `/ibm/admin/addNotice`,
        method: 'post',
        data
    })
}
// 删除公告
export const IBM_ADMIN_DELECTNOTICE = data => {
    return axios({
        url: `/ibm/admin/delectNotice`,
        method: 'post',
        data
    })
}
// 修改公告
export const IBM_ADMIN_UPDATENOTICE = data => {
    return axios({
        url: `/ibm/admin/updateNotice`,
        method: 'post',
        data
    })
}
// 新闻资讯列表
export const IBM_JOU_SELECT = data => {
    return axios({
        url: `/ibm/jou/select`,
        method: 'post',
        data
    })
}
// 添加新闻
export const IBM_JOU_ADD = data => {
    return axios({
        url: `/ibm/jou/add`,
        method: 'post',
        data
    })
}
// 修改新闻
export const IBM_JOU_UPDATE = data => {
    return axios({
        url: `/ibm/jou/update`,
        method: 'post',
        data
    })
}
// 删除新闻
export const IBM_JOU_DELETE = data => {
    return axios({
        url: `/ibm/jou/delete`,
        method: 'post',
        data
    })
}
// MT4出金列表
export const IBM_ADMIN_MT4GETGOLD = data => {
    return axios({
        url: `/ibm/admin/mt4GetGold`,
        method: 'post',
        data
    })
}
// MT4出金审核
export const IBM_ADMIN_AUDITMT4 = data => {
    return axios({
        url: `/ibm/admin/auditMt4`,
        method: 'post',
        data
    })
}
// 管理员首页数据
export const IBM_ADMIN_QUERYRECHARGE = data => {
    return axios({
        url: `/ibm/admin/queryRecharge`,
        method: 'post',
        data
    })
}
// 管理员登录用户页面
export const IBM_ADMIN_ADMINLOGIN = data => {
    return axios({
        url: `/ibm/admin/adminLogin`,
        method: 'post',
        data
    })
}
// 修改邮箱
export const IBM_ADMIN_UPDATEUSEREMAIL = data => {
    return axios({
        url: `/ibm/admin/updateUserEmail`,
        method: 'post',
        data
    })
}
// 修改手机号
export const IBM_ADMIN_UPDATEMOBILE = data => {
    return axios({
        url: `/ibm/admin/updateMobile`,
        method: 'post',
        data
    })
}
// 修改登录手机号
export const IBM_ADMIN_UPDATEOPT = data => {
    return axios({
        url: `/ibm/admin/updateOTP`,
        method: 'post',
        data
    })
}
// 获取等级信息
export const IBM_ADMIN_LEVELINFO = data => {
    return axios({
        url: `/ibm/admin/levelInfo`,
        method: 'post',
        data
    })
}
// 修改用户等级
export const IBM_ADMIN_UPDATEUSERLEVEL = data => {
    return axios({
        url: `/ibm/admin/updateUserLevel`,
        method: 'post',
        data
    })
}
// 重置用户等级
export const IBM_ADMIN_RESETLEVEL = data => {
    return axios({
        url: `/ibm/admin/resetLevel`,
        method: 'post',
        data
    })
}
// 修改用户上下级
export const IBM_ADMIN_LADDER = data => {
    return axios({
        url: `/ibm/admin/ladder`,
        method: 'post',
        data
    })
}
// 批量出金
export const IBM_ADMIN_BATCHAUDIT = data => {
    return axios({
        url: `/ibm/admin/batchAudit`,
        method: 'post',
        data
    })
}
// 管理员注销用户
export const IBM_ADMIN_DELECTUSER = data => {
    return axios({
        url: `/ibm/admin/delectUser`,
        method: 'post',
        data
    })
}
// MT4异常信息接口
export const IBM_ADMIN_MT4ERRORINFO = data => {
    return axios({
        url: `/ibm/admin/mt4ErrorInfo`,
        method: 'post',
        data
    })
}
// MT4异常状态修改接口
export const IBM_ADMIN_MT4ERRORUPDATESTATE = data => {
    return axios({
        url: `/ibm/admin/mt4ErrorUpdateState`,
        method: 'post',
        data
    })
}
// MT4异常删除接口
export const IBM_ADMIN_MT4ERRORDELETE = data => {
    return axios({
        url: `/ibm/admin/mt4ErrorDelete`,
        method: 'post',
        data
    })
}
// 查询用户上级ID
export const IBM_ADMIN_QUERYLADDER = data => {
    return axios({
        url: `/ibm/admin/queryladder`,
        method: 'post',
        data
    })
}
// 出金审核恢复
export const IBM_ADMIN_RECOVERYGOLD = data => {
    return axios({
        url: `/ibm/admin/recoveryGold`,
        method: 'post',
        data
    })
}
// MT4出金列表恢复
export const IBM_ADMIN_AUDITMT4RECOVERY = data => {
    return axios({
        url: `/ibm/admin/auditMt4Recovery`,
        method: 'post',
        data
    })
}
export default {
    IBM_ADMIN_LOGIN,
    IBM_ADMIN_LOGOUT,
    IBM_ADMIN_GETGOLDINFO,
    IBM_ADMIN_SETGOLDINFO,
    IBM_UTILS_CALLBACK,
    IBM_ADMIN_RECHARGECUSTOM,
    IBM_ADMIN_WALLETINFO,
    IBM_ADMIN_AUDITGOLD,
    IBM_ADMIN_TRANSFER,
    IBM_ADMIN_ALLUSERINFO,
    IBM_ADMIN_INFO,
    IBM_ADMIN_UPDATEUSER,
    IBM_ADMIN_USEREXAMINE,
    IBM_ADMIN_MATINFO,
    IBM_ADMIN_SELECT,
    IBM_FEEDBACK_SELECTREPLY,
    IBM_ADMIN_ADDREPLY,
    IBM_ADMIN_NOTICEINFO,
    IBM_ADMIN_ADDNOTICE,
    IBM_ADMIN_DELECTNOTICE,
    IBM_ADMIN_UPDATENOTICE,
    IBM_JOU_SELECT,
    IBM_JOU_ADD,
    IBM_JOU_UPDATE,
    IBM_JOU_DELETE,
    IBM_ADMIN_MT4GETGOLD,
    IBM_ADMIN_AUDITMT4,
    IBM_ADMIN_QUERYRECHARGE,
    IBM_ADMIN_ADMINLOGIN,
    IBM_ADMIN_UPDATEUSEREMAIL,
    IBM_ADMIN_UPDATEMOBILE,
    IBM_ADMIN_UPDATEOPT,
    IBM_ADMIN_LEVELINFO,
    IBM_ADMIN_UPDATEUSERLEVEL,
    IBM_ADMIN_RESETLEVEL,
    IBM_ADMIN_LADDER,
    IBM_ADMIN_BATCHAUDIT,
    IBM_ADMIN_DELECTUSER,
    IBM_ADMIN_MT4ERRORINFO,
    IBM_ADMIN_MT4ERRORUPDATESTATE,
    IBM_ADMIN_MT4ERRORDELETE,
    IBM_ADMIN_QUERYLADDER,
    IBM_ADMIN_RECOVERYGOLD,
    IBM_ADMIN_AUDITMT4RECOVERY
}
