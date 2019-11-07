import Vue from 'vue'
import Router from 'vue-router'
import comData from '@/utils/data.js'
// 容器
import Main from '@/views/Main'
// 登录页
import Login from '@/views/Login/Index'
// 首页
// import Home from '@/views/User/Home/index'
import Home from '@/views/User/Home/index2'
// 个人资料
import PersonalProfile from '@/views/User/account/information/index'
// 数字货币钱包
import BitAddress from '@/views/User/account/bit/index'
// 账号密码
import PassManage from '@/views/User/account/password'
// 交易密码
import TransactionPass from '@/views/User/account/payPassword'
// 财务转账
import AssetTransfer from '@/views/User/account/asset'
// 手机号码管理
import PhoneManage from '@/views//User/account/phone'
// OTP2手机号码管理
import opt2_phone from '@/views//User/account/opt2_phone'
// 现金钱包
import CashWallet from '@/views/User/wallet/cp/index'
// 注册钱包
import RegWallet from '@/views/User/wallet/rp/index'
// 电子钱包
import EleWallet from '@/views/User/wallet/ele/index'
// Mt4盈利钱包
import Mt4Wallet from '@/views/User/wallet/mt4/index'
// 账户入金
import AccountEnter from '@/views/User/eMoney/manage/index'
// 入金记录
import EnterList from '@/views/User/eMoney/history/index'
// 账户出金
import AccountReturn from '@/views/User/oMoney/manage/index'
// 出金记录
import ReturnList from '@/views/User/oMoney/history/index'
// 注册新会员
import NewMembers from '@/views/User/member/reg/index'
// 邀请注册
import InviteReg from '@/views/User/member/invite/index'
// 购买配套
import BuyProduct from '@/views/User/product/buy/index'
// 购买配套form页
import ProductManage from '@/views/User/product/buy/manage'
// 配套列表
import ProductList from '@/views/User/product/list/index'
// 推荐列表
import LowerList from '@/views/User/lowerList/index'
// 解约记录
import DestroyRecord from '@/views/User/product/destroy'
// 发送反馈
import SendFeedback from '@/views/User/feedback/send/index'
// 反馈列表
import FeedbackList from '@/views/User/feedback/history'

Vue.use(Router)
// 用户登陆
const LOGIN_USER = {
  path: `${comData.conutry_type}`+'/',
  name: 'login',
  component: Login,
  children: [
    {
      path: `${comData.conutry_type}`+'/login',
      name: 'login',
      component: Login
    },
    {
      path: `${comData.conutry_type}`+'/register',
      name: 'register',
      component: Login
    }
  ]
}

// 首页
const ONE_ROUTER = {
  path: `${comData.conutry_type}`+'user',
  name: 'oneRouter',
  component: Main,
  children: [
    {
      path: `${comData.conutry_type}`+'/user/home',
      name: 'home',
      component: Home
    },
  ]
}
// 我的账户
const MY_ACCOUNT = {
  path: `${comData.conutry_type}`+'/user',
  name: 'myAccount',
  component: Main,
  children: [
    {
      path: `${comData.conutry_type}`+'/user/account/information',
      name: 'personal_profile',
      component: PersonalProfile
    },
    {
      path: `${comData.conutry_type}`+'/user/account/password',
      name: 'pass_manage',
      component: PassManage
    },
    {
      path: `${comData.conutry_type}`+'/user/account/payPassword',
      name: 'transaction_pass',
      component: TransactionPass
    },
    {
      path: `${comData.conutry_type}`+'/user/account/asset',
      name: 'asset_transfer',
      component: AssetTransfer
    },
    {
      path: `${comData.conutry_type}`+'/user/account/phone',
      name: 'phone_manage',
      component: PhoneManage
    },
    {
      path: `${comData.conutry_type}`+'/user/account/opt2_phone',
      name: 'opt2_phone',
      component: opt2_phone
    },
    {
      path: `${comData.conutry_type}`+'/user/account/bit',
      name: 'bit_address',
      component: BitAddress
    },
  ]
}
// 钱包明细
const CASH = {
  path: `${comData.conutry_type}`+'/user',
  name: 'myAccount',
  component: Main,
  children: [
    {
      path: `${comData.conutry_type}`+'/user/wallet/cp',
      name: 'cash_wallet',
      component: CashWallet
    },
    {
      path: `${comData.conutry_type}`+'/user/wallet/rp',
      name: 'reg_wallet',
      component: RegWallet
    },
    {
      path: `${comData.conutry_type}`+'/user/wallet/ele',
      name: 'ele_wallet',
      component: EleWallet
    },
    {
      path: `${comData.conutry_type}`+'/user/wallet/mt4',
      name: 'mt4_wallet',
      component: Mt4Wallet
    },
  ]
}
// 注册会员
const MEMBER = {
  path: `${comData.conutry_type}`+'/user',
  name: 'member',
  component: Main,
  children: [
    {
      path: `${comData.conutry_type}`+'/user/member/reg',
      name: 'new_members',
      component: NewMembers
    },
    {
      path: `${comData.conutry_type}`+'/user/member/invite',
      name: 'invite_reg',
      component: InviteReg
    },
  ]
}
// 账户入金
const ACCOUNTENTER = {
  path: `${comData.conutry_type}`+'/user',
  name: 'member',
  component: Main,
  children: [
    {
      path: `${comData.conutry_type}`+'/user/eMoney/manage',
      name: 'account_enter',
      component: AccountEnter
    },
    {
      path: `${comData.conutry_type}`+'/user/eMoney/history',
      name: 'enter_list',
      component: EnterList
    },
  ]
}
// 账户出金
const ACCOUNTRETURN = {
  path: `${comData.conutry_type}`+'/user',
  name: 'member',
  component: Main,
  children: [
    {
      path: `${comData.conutry_type}`+'/user/oMoney/manage',
      name: 'account_return',
      component: AccountReturn
    },
    {
      path: `${comData.conutry_type}`+'/user/oMoney/history',
      name: 'return_list',
      component: ReturnList
    },
  ]
}
// 配套管理
const PRODUCT_MANAGE = {
  path: `${comData.conutry_type}`+'/user',
  name: 'productManage',
  component: Main,
  children: [
    {
      path: `${comData.conutry_type}`+'/user/product/buy',
      name: 'buy_product',
      component: BuyProduct
    },
    {
      path: `${comData.conutry_type}`+'/user/product/buy/manage',
      name: 'product_manage',
      component: ProductManage
    },
    {
      path: `${comData.conutry_type}`+'/user/product/list',
      name: 'product_list',
      component: ProductList
    },
    {
      path: `${comData.conutry_type}`+'/user/product/destroy',
      name: 'destroy_record',
      component: DestroyRecord
    },
  ]
}
// 推荐列表 lowerList
const LOWER_LIST = {
  path: `${comData.conutry_type}`+'/user',
  name: 'lowerList',
  component: Main,
  children: [
    {
      path: `${comData.conutry_type}`+'/user/lowerList',
      name: 'lower_list_index',
      component: LowerList
    },
  ]
}
// 会员反馈
const MEMBER_BACK = {
  path: `${comData.conutry_type}`+'/user',
  name: 'memberBack',
  component: Main,
  children: [
    {
      path: `${comData.conutry_type}`+'/user/feedback/send',
      name: 'send_feedback',
      component: SendFeedback
    },
    {
      path: `${comData.conutry_type}`+'/user/feedback/history',
      name: 'feedback_list',
      component: FeedbackList
    },
  ]
}
// 管理员_首页
import admin_home from '@/views/Admin/home/index'
// 出金流水列表
import withdraw_history from '@/views/Admin/withdraw_history/index'
// 入金流水列表
import recharge_history from '@/views/Admin/recharge_history/index'
// 社区成员入金
import net_fund from '@/views/Admin/net_fund/index'
// 会员钱包明细
import wallet_report from '@/views/Admin/wallet_report/index'
// 出金审核
import withdraw_audit from '@/views/Admin/withdraw_audit/index'
// 会员列表
import member_list from '@/views/Admin/member_list/index'
// 会员详情
import member_info from '@/views/Admin/member_list/info1'
// 配套购买记录
import product_report from '@/views/Admin/product_report/index'
// 反馈信息
import admin_feedback from '@/views/Admin/admin_feedback/index'
// 公共列表
import notice_list from '@/views/Admin/notice_list/index'
// 新闻资讯
import news_report from '@/views/Admin/news_report/index'
// MT4出金列表
import destroy_audit from '@/views/Admin/destroy_audit/index'
// MT4异常列表
import unusual_audit from '@/views/Admin/unusual_audit/index'
// MT4出金列表
import admin_transfer from '@/views/Admin/admin_transfer/index'

// 管理员登录
const LOGIN_ADMIN = {
  // path: '/admin_login',
  path: `${comData.conutry_type}`+'/admin_login',
  name: 'admin',
  component: Login,
}
// 管理员路由
const ADMIN_ROUTER = {
  path: `${comData.conutry_type}`+'/admin',
  name: 'admin',
  component: Main,
  children: [
    {
      path: `${comData.conutry_type}`+'/admin/admin_home',
      name: 'admin_home',
      component: admin_home
    },
    {
      path: `${comData.conutry_type}`+'/admin/withdraw_history',
      name: 'withdraw_history',
      component: withdraw_history
    },
    {
      path: `${comData.conutry_type}`+'/admin/recharge_history',
      name: 'recharge_history',
      component: recharge_history
    },
    {
      path: `${comData.conutry_type}`+'/admin/net_fund',
      name: 'net_fund',
      component: net_fund
    },
    {
      path: `${comData.conutry_type}`+'/admin/wallet_report',
      name: 'wallet_report',
      component: wallet_report
    },
    {
      path: `${comData.conutry_type}`+'/admin/withdraw_audit',
      name: 'withdraw_audit',
      component: withdraw_audit
    },
    {
      path: `${comData.conutry_type}`+'/admin/admin_transfer',
      name: 'admin_transfer',
      component: admin_transfer
    },
    {
      path: `${comData.conutry_type}`+'/admin/member_list',
      name: 'member_list',
      component: member_list,
    },
    {
      path: `${comData.conutry_type}`+'/admin/member_info',
      name: 'member_info',
      component: member_info
    },
    {
      path: `${comData.conutry_type}`+'/admin/product_report',
      name: 'product_report',
      component: product_report
    },
    {
      path: `${comData.conutry_type}`+'/admin/admin_feedback',
      name: 'admin_feedback',
      component: admin_feedback
    },
    {
      path: `${comData.conutry_type}`+'/admin/notice_list',
      name: 'notice_list',
      component: notice_list
    },
    {
      path: `${comData.conutry_type}`+'/admin/news_report',
      name: 'news_report',
      component: news_report
    },
    {
      path: `${comData.conutry_type}`+'/admin/destroy_audit',
      name: 'destroy_audit',
      component: destroy_audit
    },
    {
      path: `${comData.conutry_type}`+'/admin/unusual_audit',
      name: 'unusual_audit',
      component: unusual_audit
    },
  ]
}
export default new Router({
  routes: [
    LOGIN_ADMIN,
    LOGIN_USER,
    ONE_ROUTER,
    MY_ACCOUNT,
    CASH,
    MEMBER,
    ACCOUNTENTER,
    ACCOUNTRETURN,
    PRODUCT_MANAGE,
    MEMBER_BACK,
    LOWER_LIST,
    ADMIN_ROUTER
  ]
})
