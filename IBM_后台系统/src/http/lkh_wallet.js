// 请求接口文件
import axios from './api' // 倒入 api
// 用户转账
export const ASSETS_TRANSFERACCOUNTS = data => {
    return axios({
        url: `/assets/transferAccounts`,
        method: 'post',
        data
    })
}
// 冷钱包充值接口
export const TRA_MAT = data => {
    return axios({
        url: `/tra/mat`,
        method: 'post',
        data
    })
}
// 入金记录查询
export const ASSETS_GETUSERRECHARGES = data => {
    return axios({
        url: `/assets/getUserRecharges?pageSize=${data.pageSize}&pageNum=${data.page}&startTime=${data.startTime}&endTime=${data.endTime}&state=${data.state}`,
        method: 'get'
    })
}
// 钱包日志查询
export const ASSETS_SELECTASSETSLOGTYPE = data => {
    return axios({
        url: `/assets/selectAssetsLogType?assetsLogType=${data.assetsLogType}&walletType=${data.walletType}&pageSize=${data.pageSize}&pageNum=${data.page}&startTime=${data.startTime}&endTime=${data.endTime}`,
        method: 'get'
    })
}
// 查询用户钱包信息
export const ASSETS_GETUSERASSETS = data => {
    return axios({
        url: `/assets/getUserAssets`,
        method: 'get'
    })
}
// 管理员转账
export const ASSETS_SUPERTRANSFERACCOUNTS = data => {
    return axios({
        url: `/assets/supertransferAccounts`,
        method: 'post',
        data
    })
}
// 所有用户钱包日志查询
export const ASSETS_SELECTASSETSLOGTYPEALL = data => {
    return axios({
        url: `/assets/selectAssetsLogTypeAll?userId=${data.userId}&assetsLogType=${data.assetsLogType}&walletType=${data.walletType}&pageSize=${data.pageSize}&pageNum=${data.page}&startTime=${data.startTime}&endTime=${data.endTime}`,
        method: 'get'
    })
}
export default {
    ASSETS_TRANSFERACCOUNTS,
    TRA_MAT,
    ASSETS_GETUSERRECHARGES,
    ASSETS_SELECTASSETSLOGTYPE,
    ASSETS_GETUSERASSETS,
    ASSETS_SUPERTRANSFERACCOUNTS,
    ASSETS_SELECTASSETSLOGTYPEALL
}
