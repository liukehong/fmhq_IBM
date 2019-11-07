// 请求接口文件
import axios from './api'
// 查询配套列表
export const MATCHING_GETUSERMT4S = data => {
    return axios({
        url: `/matching/getUserMt4s?pageSize=${data.pageSize}&pageNum=${data.page}&startTime=${data.startTime}&endTime=${data.endTime}&mt4Id=${data.mt4Id}`,
        method: 'get'
    })
}
// 配套列表-mt4提现
export const ASSETS_TRANSFERACCOUNTMT4 = data => {
    return axios({
        url: `/assets/transferAccountMt4`,
        method: 'post',
        data
    })
}
// 获取所有配套信息
export const MATCHING_GETMATCHINGS = data => {
    return axios({
        url: `/matching/getMatchings`,
        method: 'get',
    })
}
// 配套升级
export const MATCHING_UPGRADEMATCHING = data => {
    return axios({
        url: `/matching/upgradeMatching`,
        method: 'post',
        data
    })
}
// 购买配套
export const MATCHING_BUYMATCHING = data => {
    return axios({
        url: `/matching/buyMatching`,
        method: 'post',
        data
    })
}
// 获取配套购买流水
export const MATCHING_GETBUYMATCHINGINFO = data => {
    return axios({
        url: `/matching/getBuyMatchingInfo?userId=${data.userId}&startTime=${data.startTime}&endTime=${data.endTime}&pageNum=${data.pageNum}&pageSize=${data.pageSize}`,
        method: 'get',
    })
}
export default {
    MATCHING_GETUSERMT4S,
    ASSETS_TRANSFERACCOUNTMT4,
    MATCHING_GETMATCHINGS,
    MATCHING_UPGRADEMATCHING,
    MATCHING_BUYMATCHING,
    MATCHING_GETBUYMATCHINGINFO
}
