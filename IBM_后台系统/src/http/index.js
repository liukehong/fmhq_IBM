// 将axios封装成插件
// 普通用户
import lkh_user from './lkh_user'
// 通用接口
import lkh_common from './lkh_common'
// 钱包
import lkh_wallet from './lkh_wallet'
// 申请/审核
import lkh_apply from './lkh_apply'
// 配套
import lkh_matching from './lkh_matching'
// 反馈
import lkh_feedback from './lkh_feedback'
// 管理员
import lkh_admin from './lkh_admin'



// 用户端
import user from './user';
// 管理员端
import admin from './admin';

let apis = {
    ...lkh_user,
    ...lkh_common,
    ...lkh_wallet,
    ...lkh_apply,
    ...lkh_matching,
    ...lkh_feedback,
    ...lkh_admin,
    ...user,
    ...admin
}
const install = Vue => {
    if (install.installed) 
        return;
    install.installed = true;

    Object.defineProperties(Vue.prototype, {
        // 注意哦，此处挂载在 Vue 原型的 $api 对象上
        $api: {
            get() {
                return apis
            }
        }
    })
}
export default install