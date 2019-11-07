// 请求接口文件
import axios from './api'
// 出金申请条件查询
export const ASSETS_GETWITHDRAWALAPPLYS = data => {
    return axios({
        url: `/assets/getWithdrawalApplys?withdrawType=${data.withdrawType}&withdrawStatus=${data.withdrawStatus}&userId=${data.userId}&pageSize=${data.pageSize}&pageNum=${data.page}&startTime=${data.startTime}&endTime=${data.endTime}`,
        method: 'get'
    })
}
//  提现审核
export const ASSETS_WITHDRAW = data => {
    return axios({
        url: `/assets/withdraw`,
        method: 'post',
        data
    })
}
// MT4解约申请
export const ASSETS_WITHDRAWMT4 = data => {
    return axios({
        url: `/assets/withdrawMt4`,
        method: 'post',
        data
    })
}
// 提现审核
export const ASSETS_WITHDRAWREVIEW = data => {
    return axios({
        url: `/assets/withdrawReview`,
        method: 'post',
        data
    })
}
// MT4审核
export const ASSETS_WITHDRAWREVIEWMT4 = data => {
    return axios({
        url: `/assets/withdrawReviewMt4`,
        method: 'post',
        data
    })
}
export default {
    ASSETS_GETWITHDRAWALAPPLYS,
    ASSETS_WITHDRAW,
    ASSETS_WITHDRAWMT4,
    ASSETS_WITHDRAWREVIEW,
    ASSETS_WITHDRAWREVIEWMT4
}
