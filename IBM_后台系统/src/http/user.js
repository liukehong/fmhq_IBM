// 请求接口文件
import axios from './api' // 倒入 api
const baseURL = 'https://api.exchangerate.enrich-global.com:8443'
// 登录
export const IBM_LOGIN_LOGIN = data => {
    return axios({
        url: `/ibm/login/login`,
        method: 'post',
        data
    })
}
// 退出
export const IBM_LOGIN_LOGOUT = data => {
    return axios({
        url: `/ibm/login/logout`,
        method: 'post',
        data
    })
}
// 忘记密码
export const IBM_LOGIN_RETPASS = data => {
    return axios({
        url: `/ibm/login/retPass`,
        method: 'post',
        data
    })
}
// 拿推荐ID去注册
export const IBM_HOME_TJM = data => {
    return axios({
        url: `/ibm/home/tjm`,
        method: 'post',
        data
    })
}
// 邀请注册
export const IBM_REGISTER_REG = data => {
    return axios({
        url: `/ibm/register/reg`,
        method: 'post',
        data
    })
}
// 获取用户基础信息
export const IBM_UTILS_INFO = data => {
    return axios({
        url: `/ibm/utils/info`,
        method: 'post',
        data
    })
}
// 获取个人资产
export const IBM_HOME_PERSONALASSETS = data => {
    return axios({
        url: `/ibm/home/personalAssets`,
        method: 'post',
        data
    })
}
// 省市区三级联动
export const IBM_UTILS_LINKAGE = data => {
    return axios({
        url: `/ibm/utils/linkage`,
        method: 'post',
        data
    })
}
// 发送手机验证码(有参)
export const IBM_UTILS_SENDMOBILECODE = data => {
    return axios({
        url: `/ibm/utils/sendMobileCode`,
        method: 'post',
        data
    })
}
// 发送手机验证码(无参)
export const IBM_UTILS_MOBILECODE = data => {
    return axios({
        url: `/ibm/utils/mobileCode`,
        method: 'post',
        data
    })
}
// 发送邮箱验证码(无参)
export const IBM_UTILS_SENDMAILCODE = data => {
    return axios({
        url: `/ibm/utils/sendMailCode`,
        method: 'post',
        data
    })
}
// 修改用户信息
export const IBM_USER_UPDATEUSER = data => {
    return axios({
        url: `/ibm/user/updateUser`,
        method: 'post',
        data
    })
}
// 修改钱包地址
export const IBM_USER_UPDATEBLOCKCHAIN = data => {
    return axios({
        url: `/ibm/user/updateBlockChain`,
        method: 'post',
        data
    })
}
// 修改账号密码
export const IBM_USER_UPDATEPW = data => {
    return axios({
        url: `/ibm/user/updatePW`,
        method: 'post',
        data
    })
}
// 修改二级密码
export const IBM_USER_UPDATESECPASSWORD = data => {
    return axios({
        url: `/ibm/user/updateSecPassword`,
        method: 'post',
        data
    })
}
// 修改手机号
export const IBM_USER_UPDATEMOBILE = data => {
    return axios({
        url: `/ibm/user/updateMobile`,
        method: 'post',
        data
    })
}
// 通过用户ID查询用户名
export const IBM_USER_USERNAMECOMPLETION = data => {
    return axios({
        url: `/ibm/home/usernameCompletion`,
        method: 'post',
        data
    })
}
// 财务转账
export const IBM_HOME_TRANSFER = data => {
    return axios({
        url: `/ibm/home/transfer`,
        method: 'post',
        data
    })
}
// 钱包明细列表
export const IBM_WALLET_INFO = data => {
    return axios({
        url: `/ibm/wallet/info`,
        method: 'post',
        data
    })
}
// 钱包数额
export const IBM_MAT_ASSETS = data => {
    return axios({
        url: `/ibm/mat/assets`,
        method: 'post',
        data
    })
}
// 配套信息列表
export const IBM_MAT_INFO = data => {
    return axios({
        url: `/ibm/mat/info`,
        method: 'post',
        data
    })
}
// 帮用户注册
export const IBM_REGISTER_REGSUB = data => {
    return axios({
        url: `/ibm/register/regSub`,
        method: 'post',
        data
    })
}
// 获取币种兑换率
export const EXRATE_PAIR_NUMF_15 = data => {
    return axios({
        url: `/ExRate/pair/numf/15`,
        method: 'get',
        baseURL: baseURL
    })
}
// 账户入金
export const IBM_TRA_MAT = data => {
    return axios({
        url: `/ibm/tra/mat`,
        method: 'post',
        data
    })
}
// 人民币汇率
export const IBM_RATE_RATE = data => {
    return axios({
        url: `/ibm/rate/rate`,
        method: 'post',
        data
    })
}
// 入金列表
export const IBM_RECHARGE_GOLDRECHARGE = data => {
    return axios({
        url: `/ibm/recharge/goldRecharge`,
        method: 'post',
        data
    })
}
// 账户出金
export const IBM_WITHDRAW_GETGOLD = data => {
    return axios({
        url: `/ibm/withdraw/getGold`,
        method: 'post',
        data
    })
}
// 出金列表
export const IBM_WITHDRAW_GOLDFLOWINGWATER = data => {
    return axios({
        url: `/ibm/withdraw/goldFlowingWater`,
        method: 'post',
        data
    })
}
// 反馈列表
export const IBM_FEEDBACK_SELECT = data => {
    return axios({
        url: `/ibm/feedback/select`,
        method: 'post',
        data
    })
}
// 发送反馈
export const IBM_FEEDBACK_ADDFEED = data => {
    return axios({
        url: `/ibm/feedback/addFeed`,
        method: 'post',
        data
    })
}
// 配套列表
export const IBM_USER_MT4LIST = data => {
    return axios({
        url: `/ibm/user/mt4List`,
        method: 'post',
        data
    })
}
// 购买配套
export const IBM_MAT_BUY = data => {
    return axios({
        url: `/ibm/mat/buy`,
        method: 'post',
        data
    })
}
// 配套解约记录
export const IBM_MAT_GETMT4INFO = data => {
    return axios({
        url: `/ibm/mat/getMt4Info`,
        method: 'post',
        data
    })
}
// 获取合同
export const IBM_HOME_HT = data => {
    return axios({
        url: `/ibm/home/ht`,
        method: 'post',
        data
    })
}
// 刷新配套
export const IBM_USER_MT4WALLET = data => {
    return axios({
        url: `/ibm/user/mt4Wallet`,
        method: 'post',
        data
    })
}
// MT4提现
export const IBM_USER_GETCOLD = data => {
    return axios({
        url: `/ibm/user/getGold`,
        method: 'post',
        data
    })
}
// 升级配套
export const IBM_MAT_UPGRADE = data => {
    return axios({
        url: `/ibm/mat/upgrade`,
        method: 'post',
        data
    })
}
// 解约配套
export const IBM_MAT_GETMT4 = data => {
    return axios({
        url: `/ibm/mat/getMt4`,
        method: 'post',
        data
    })
}
// 推荐列表
export const IBM_HOME_TJT = data => {
    return axios({
        url: `/ibm/home/tjt`,
        method: 'post',
        data
    })
}
// MT4出金明细
export const IBM_HOME_ASSA = data => {
    return axios({
        url: `/ibm/home/assA`,
        method: 'post',
        data
    })
}
// 电子钱包明细
export const IBM_HOME_ASS = data => {
    return axios({
        url: `/ibm/home/ass`,
        method: 'post',
        data
    })
}
// 历史交易回报
export const IBM_MAT_YHB = data => {
    return axios({
        url: `/ibm/mat/yhb`,
        method: 'post',
        data
    })
}
// 验证二级密码
export const IBM_UTILS_SECURITYPASSWORD = data => {
    return axios({
        url: `/ibm/utils/securityPassword`,
        method: 'post',
        data
    })
}
// 用户回复
export const IBM_FEEDBACK_ADDREPLY = data => {
    return axios({
        url: `/ibm/feedback/addReply`,
        method: 'post',
        data
    })
}
// 公告
export const IBM_HOME_NOTICEINFO = data => {
    return axios({
        url: `/ibm/home/noticeInfo`,
        method: 'post',
        data
    })
}
// 发送otp2手机验证码
export const IBM_UTILS_OPT2 = data => {
    return axios({
        url: `/ibm/utils/otp2`,
        method: 'post',
        data
    })
}
// 修改OTP2手机号
export const IBM_USER_UPDATEOPT2 = data => {
    return axios({
        url: `/ibm/user/updateOtp2`,
        method: 'post',
        data
    })
}
// 获取状态
export const IBM_USER_DEPT = data => {
    return axios({
        url: `/ibm/user/dept`,
        method: 'post',
        data
    })
}
export default {
    IBM_LOGIN_LOGIN,
    IBM_LOGIN_LOGOUT,
    IBM_LOGIN_RETPASS,
    IBM_HOME_TJM,
    IBM_REGISTER_REG,
    IBM_UTILS_INFO,
    IBM_HOME_PERSONALASSETS,
    IBM_UTILS_LINKAGE,
    IBM_UTILS_SENDMOBILECODE,
    IBM_UTILS_MOBILECODE,
    IBM_UTILS_SENDMAILCODE,
    IBM_USER_UPDATEUSER,
    IBM_USER_UPDATEBLOCKCHAIN,
    IBM_USER_UPDATEPW,
    IBM_USER_UPDATESECPASSWORD,
    IBM_USER_UPDATEMOBILE,
    IBM_USER_USERNAMECOMPLETION,
    IBM_HOME_TRANSFER,
    IBM_WALLET_INFO,
    IBM_MAT_ASSETS,
    IBM_MAT_INFO,
    IBM_REGISTER_REGSUB,
    EXRATE_PAIR_NUMF_15,
    IBM_TRA_MAT,
    IBM_RATE_RATE,
    IBM_RECHARGE_GOLDRECHARGE,
    IBM_WITHDRAW_GETGOLD,
    IBM_WITHDRAW_GOLDFLOWINGWATER,
    IBM_FEEDBACK_SELECT,
    IBM_FEEDBACK_ADDFEED,
    IBM_USER_MT4LIST,
    IBM_MAT_BUY,
    IBM_MAT_GETMT4INFO,
    IBM_HOME_HT,
    IBM_USER_MT4WALLET,
    IBM_USER_GETCOLD,
    IBM_MAT_UPGRADE,
    IBM_MAT_GETMT4,
    IBM_HOME_TJT,
    IBM_HOME_ASSA,
    IBM_HOME_ASS,
    IBM_MAT_YHB,
    IBM_UTILS_SECURITYPASSWORD,
    IBM_FEEDBACK_ADDREPLY,
    IBM_HOME_NOTICEINFO,
    IBM_UTILS_OPT2,
    IBM_USER_UPDATEOPT2,
    IBM_USER_DEPT
}
