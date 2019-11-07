/**
*工具类
*/

/* 
  普通用户:
  os_type   1
  tokenName 0
  inviteUrl 0
  菜单有推荐列表、电子钱包、更换OTP2手机号
  路由: 首页引用 @/views/User/Home/index


  阉割版用户
  os_type   2
  tokenName 1
  inviteUrl 1
  菜单没有推荐列表、电子钱包、更换OTP2手机号
  路由: 首页引用 @/views/User/Home/index2
*/
// 1正式版  2是阉割版
const os_type = 1;
// 国家类型
const COUNTRY_TYPE = '';  // '' /jp  这个不需要改
const COUNTRY_TYPE_1 = '';  // '' /jp
const data = {
    os_type: os_type,
    conutry_type: COUNTRY_TYPE,
    // 风险纰漏说明
    src: (function (num) {
        switch (num) {
            case 0:
                // 测试
                return "https://www.hswow.cn"+COUNTRY_TYPE_1
                break;
            case 1:
                // 正式版本
                return "https://partner.ibmcapital.co"+COUNTRY_TYPE_1
                // return "https://www.hswow.cn"+COUNTRY_TYPE_1
                break;
            case 2:
                // 阉割版
                return "https://login.ibmcapital.co"+COUNTRY_TYPE_1
                break;
            default:
                return "https://www.hswow.cn"+COUNTRY_TYPE_1
        }
    })(os_type),
    // 邀请链接
    inviteUrl: (function (num) {
        switch (num) {
            case 0:
                // 正式版本
                return "https://partner.ibmcapital.co"+COUNTRY_TYPE_1
                break;
            case 1:
                // 阉割版
                return "https://login.ibmcapital.co"+COUNTRY_TYPE_1
                break;
            case 2:
                // 测试
                return "https://www.hswow.cn"+COUNTRY_TYPE_1
                break;
            default:
                return "https://partner.ibmcapital.co"+COUNTRY_TYPE_1
        }
    })(0),
    // user的token名称
    tokenName: (function (num) {
        switch (num) {
            case 1:
                // 正式版本
                return "user_token"
                break;
            case 2:
                // 阉割版
                return "user_token2"
                break;
            default:
                return "user_token"
        }
    })(os_type),
    // 接口地址
    path: (function (num) {
        switch (num) {
            case 0:
                // 国际版
                return "https://api.ibmcapital.co:18443"
                break;
            case 1:
                // 日本版
                return "https://api.ibmcapital.co:18442"
                break;
            case 2:
                // 本地
                return "http://192.168.1.125:8080"
                break;
            default:
                return "https://api.ibmcapital.co:18443"
        }
    })(1),
    phone: [
        "+1", "+1242", "+1246", "+1264", "+1268", "+1340", "+1345", "+1441", "+1473", "+1649", "+1664", "+1671",
        "+1758", "+1767", "+1784", "+1809", "+1868", "+1869", "+1876", "+20", "+212", "+213", "+216", "+218", "+220", "+221",
        "+222", "+223", "+224", "+225", "+226", "+227", "+228", "+229", "+230", "+231", "+232", "+233", "+234", "+235", "+236", "+237",
        "+238", "+239", "+240", "+241", "+242", "+243", "+244", "+247", "+248", "+249", "+250", "+251", "+253", "+254", "+255", "+256",
        "+257", "+258", "+260", "+261", "+262", "+263", "+264", "+265", "+266", "+267", "+268", "+269", "+27", "+298",
        "+297", "+299", "+30", "+31", "+32", "+33", "+34", "+350", "+351", "+352", "+353", "+354", "+355", "+356", "+357",
        "+358", "+359", "+36", "+370", "+371", "+372", "+373", "+374", "+375", "+376", "+377", "+378", "+380", "+381",
        "+382", "+383", "+385", "+386", "+387", "+389", "+40", "+41", "+420", "+421", "+423", "+43", "+44", "+45", "+46",
        "+47", "+48", "+501", "+502", "+503", "+504", "+505", "+506", "+507", "+509", "+51", "+52", "+53", "+54", "+55",
        "+56", "+57", "+58", "+590", "+591", "+592", "+593", "+594", "+595", "+596", "+597", "+598", "+599", "+60", "+61",
        "+62", "+63", "+64", "+65", "+66", "+670", "+673", "+675", "+676", "+678", "+679", "+682", "+684", "+685", "+687",
        "+689", "+7", "+81", "+82", "+84", "+852", "+853", "+855", "+856", "+86", "+880", "+886", "+90", "+91", "+92", "+93", "+94",
        "+95", "+960", "+961", "+962", "+963", "+964", "+965", "+966", "+967", "+968", "+970", "+971", "+972", "+973", "+974",
        "+975", "+976", "+977", "+98", "+992", "+993", "+994", "+995", "+996", "+998",
    ],
    // 菜单列表
    menuList: function (type, _this) {
        let obj = {
            '0': [
                {
                    name: _this.$t('user.home'), // 个人面板
                    icon: 'el-icon-s-home',
                    haschildren: false,
                    index: COUNTRY_TYPE+'/user/home',
                },
                {
                    name: _this.$t('user.my_account'), // 我的账户
                    haschildren: true,
                    index: COUNTRY_TYPE+'my_account',
                    icon: 'el-icon-s-custom',
                    list: [
                        {
                            name: _this.$t('user.personal_profile'), // 个人信息
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/account/information',
                        },
                        {
                            name: _this.$t('user.bit_address'), // 数字货币钱包
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/account/bit',
                        },
                        {
                            name: _this.$t('user.pass_manage'), // 修改账号密码
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/account/password',
                        },
                        {
                            name: _this.$t('user.transaction_pass'), // 设置二级密码
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/account/payPassword',
                        },
                        {
                            name: _this.$t('user.phone_manage'), // 更换手机号码
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/account/phone',
                        },
                        {
                            name: _this.$t('user.opt2_phone_manage'), // 更换OTP2手机号
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/account/opt2_phone',
                        },
                        {
                            name: _this.$t('user.asset_transfer'), // 财务转账
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/account/asset',
                        },
                    ]
                },
                {
                    name: _this.$t('user.report'), // 钱包明细
                    haschildren: true,
                    index: COUNTRY_TYPE+'cash',
                    icon: 'el-icon-wallet',
                    list: [
                        {
                            name: _this.$t('user.cash_wallet'), // 现金钱包
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/wallet/cp',
                        },
                        {
                            name: _this.$t('user.e_wallet'), // 电子钱包
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/wallet/ele',
                        },
                        {
                            name: _this.$t('user.reg_wallet'), // 注册钱包
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/wallet/rp',
                        },
                        {
                            name: _this.$t('user.mt4_wallet'), // MT4盈利钱包
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/wallet/mt4',
                        },
                    ],
                },
                {
                    name: _this.$t('user.reg_menu'), // 注册会员
                    haschildren: true,
                    index: COUNTRY_TYPE+'member',
                    icon: 'el-icon-user',
                    list: [
                        /* {
                            name: _this.$t('user.new_members'), // 注册新会员
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/member/reg',
                        }, */
                        {
                            name: _this.$t('user.invite_reg'), // 邀请注册
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/member/invite',
                        }
                    ]
                },
                {
                    name: _this.$t('user.recharge_menu'), // 账号入金
                    haschildren: true,
                    index: COUNTRY_TYPE+'account_enter',
                    icon: 'el-icon-sell',
                    list: [
                        {
                            name: _this.$t('user.recharge'), // 账号入金
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/eMoney/manage',
                        },
                        {
                            name: _this.$t('user.recharge_list'), // 入金记录
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/eMoney/history',
                        }
                    ]
                },
                {
                    name: _this.$t('user.withdraw_menu'), // 账号出金
                    haschildren: true,
                    index: COUNTRY_TYPE+'account_return',
                    icon: 'el-icon-sold-out',
                    list: [
                        {
                            name: _this.$t('user.withdraw'), // 账号出金
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/oMoney/manage',
                        },
                        {
                            name: _this.$t('user.withdraw_list'), // 出金记录
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/oMoney/history',
                        }
                    ]
                },
                {
                    name: _this.$t('user.product_info'), // 配套管理
                    haschildren: true,
                    index: COUNTRY_TYPE+'product_manage',
                    icon: 'el-icon-s-operation',
                    list: [
                        {
                            name: _this.$t('user.product_manage'), // 购买配套
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/product/buy',
                        },
                        {
                            name: _this.$t('user.product_setting'), // 配套列表
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/product/list',
                        },
                        {
                            name: _this.$t('user.destroy_record'), // 解约记录
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/product/destroy',
                        }
                    ]
                },
                // 推荐列表
                {
                    name: _this.$t('user.lower_list'),
                    icon: 'el-icon-document',
                    haschildren: false,
                    index: COUNTRY_TYPE+'/user/lowerList',
                },
                //会员反馈
                {
                    name: _this.$t('user.feedback'), // 会员反馈
                    haschildren: true,
                    index: COUNTRY_TYPE+'member_back',
                    icon: 'el-icon-edit-outline',
                    list: [
                        {
                            name: _this.$t('user.send_feedback'), // 发送反馈
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/feedback/send',
                        },
                        {
                            name: _this.$t('user.feedback_list'), // 反馈列表
                            haschildren: false,
                            index: COUNTRY_TYPE+'/user/feedback/history',
                        },
                    ]
                },
            ],
            '1': [
                {
                    name: _this.$t('admin.admin_home'), // 首页
                    haschildren: false,
                    index: 'admin_home',
                    icon: 'el-icon-s-home',
                    list: []
                },
                {
                    name: _this.$t('admin.withdraw_history'), // 出金流水列表
                    haschildren: false,
                    index: 'withdraw_history',
                    icon: 'el-icon-s-data',
                    list: []
                },
                {
                    name: _this.$t('admin.recharge_history'), // 入金流水列表
                    haschildren: false,
                    index: 'recharge_history',
                    icon: 'el-icon-s-data',
                    list: []
                },
                {
                    name: _this.$t('admin.net_fund'), // 社区成员净入金
                    haschildren: false,
                    index: 'net_fund',
                    icon: 'el-icon-money',
                    list: []
                },
                {
                    name: _this.$t('admin.wallet_report'), // 会员钱包明细
                    haschildren: false,
                    index: 'wallet_report',
                    icon: 'el-icon-bank-card',
                    list: []
                },
                {
                    name: _this.$t('admin.withdraw_audit'), // 出金审核
                    haschildren: false,
                    index: 'withdraw_audit',
                    icon: 'el-icon-edit-outline',
                    list: []
                },
                {
                    name: _this.$t('admin.admin_transfer'), // 财务转账
                    haschildren: false,
                    index: 'admin_transfer',
                    icon: 'el-icon-money',
                    list: []
                },
                {
                    name: _this.$t('admin.member_list'), // 会员列表
                    haschildren: false,
                    index: 'member_list',
                    icon: 'el-icon-s-custom',
                    list: []
                },
                {
                    name: _this.$t('admin.product_report'), // 配套购买记录
                    haschildren: false,
                    index: 'product_report',
                    icon: 'el-icon-reading',
                    list: []
                },
                {
                    name: _this.$t('admin.admin_feedback'), // 反馈信息
                    haschildren: false,
                    index: 'admin_feedback',
                    icon: 'el-icon-s-comment',
                    list: []
                },
                {
                    name: _this.$t('admin.notice_list'), // 公告列表
                    haschildren: false,
                    index: 'notice_list',
                    icon: 'el-icon-s-data',
                    list: []
                },
                {
                    name: _this.$t('admin.news_report'), // 新闻资讯
                    haschildren: false,
                    index: 'news_report',
                    icon: 'el-icon-news',
                    list: []
                },
                {
                    name: _this.$t('admin.destroy_audit'), // MT4出金列表
                    haschildren: false,
                    index: 'destroy_audit',
                    icon: 'el-icon-s-data',
                    list: []
                },
                {
                    name: _this.$t('admin.unusual_audit'), // MT4异常列表
                    haschildren: false,
                    index: 'unusual_audit',
                    icon: 'el-icon-s-data',
                    list: []
                },
            ]
        }
        return obj[type]
    }
}
export default data