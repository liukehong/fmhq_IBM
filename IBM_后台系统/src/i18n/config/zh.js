const zh = {
  el: {
    colorpicker: {
      confirm: '确定',
      clear: '清空'
    },
    datepicker: {
      now: '此刻',
      today: '今天',
      cancel: '取消',
      clear: '清空',
      confirm: '确定',
      selectDate: '选择日期',
      selectTime: '选择时间',
      startDate: '开始日期',
      startTime: '开始时间',
      endDate: '结束日期',
      endTime: '结束时间',
      prevYear: '前一年',
      nextYear: '后一年',
      prevMonth: '上个月',
      nextMonth: '下个月',
      year: '年',
      month1: '1 月',
      month2: '2 月',
      month3: '3 月',
      month4: '4 月',
      month5: '5 月',
      month6: '6 月',
      month7: '7 月',
      month8: '8 月',
      month9: '9 月',
      month10: '10 月',
      month11: '11 月',
      month12: '12 月',
      // week: '周次',
      weeks: {
        sun: '日',
        mon: '一',
        tue: '二',
        wed: '三',
        thu: '四',
        fri: '五',
        sat: '六'
      },
      months: {
        jan: '一月',
        feb: '二月',
        mar: '三月',
        apr: '四月',
        may: '五月',
        jun: '六月',
        jul: '七月',
        aug: '八月',
        sep: '九月',
        oct: '十月',
        nov: '十一月',
        dec: '十二月'
      }
    },
    select: {
      loading: '加载中',
      noMatch: '无匹配数据',
      noData: '无数据',
      placeholder: '请选择'
    },
    cascader: {
      noMatch: '无匹配数据',
      loading: '加载中',
      placeholder: '请选择'
    },
    pagination: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {total} 条',
      pageClassifier: '页',
      total1: '共',
      total2: '条'
    },
    messagebox: {
      title: '提示',
      confirm: '确定',
      cancel: '取消',
      error: '输入的数据不合法!'
    },
    upload: {
      deleteTip: '按 delete 键可删除',
      delete: '删除',
      preview: '查看图片',
      continue: '继续上传'
    },
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      clearFilter: '全部',
      sumText: '合计'
    },
    tree: {
      emptyText: '暂无数据'
    },
    transfer: {
      noMatch: '无匹配数据',
      noData: '无数据',
      titles: ['列表 1', '列表 2'],
      filterPlaceholder: '请输入搜索内容',
      noCheckedFormat: '共 {total} 项',
      hasCheckedFormat: '已选 {checked}/{total} 项'
    }
  },
  // new
  editor: {
    text1: '字号',
    text2: '字体',
    text3: '宋体',
    text4: '微软雅黑',
    text5: '链接文字',
    text6: '链接',
    text7: '插入',
    text8: '设置列表',
    text9: '有序列表',
    text10: '无序列表',
    text11: '对齐方式',
    text12: '靠左',
    text13: '居中',
    text14: '靠右',
    text15: '插入表格',
    text16: '创建',
    text17: '行',
    text18: '列的表格',
    text19: '插入代码',
  },
  errCode: {
    "0": "请求访问成功",
    /**
     * 请重新登录
     */
    "200": "请重新登录",
    /**
     * 账号已被锁定,请联系管理员
     */
    "1002": "账号已被锁定,请联系管理员",
    /**
     * 货币不对
     */
    "20001": "货币不对",
    /**
     * 生成订单失败
     */
    "20002": "生成订单失败",
    /**
     * 验证码错误
     */
    "1003": "验证码错误",
    /**
     * 用户名最少需要6位
     */
    "2001": "用户名最少需要6位",
    /**
     * 密码最少需要6位 
     */
    "2002": "密码最少需要6位",
    /**
     * "手机号最少需要6位"
     */
    "2003": "手机号最少需要6位",

    "2004": "证件号码最少需要6位",

    "2005": "姓名最少需要2位",

    "2006": "英文名最少需要3位",

    "2007": "用户名已经存在",

    "2008": "邮箱已注册",

    "2009": "手机号已注册",

    "2010": "密码错误",

    "2011": "邮箱格式不正确",

    "2012": "手机号格式不正确",

    "2013": "请重新获取手机验证码",

    "2014": "该用户名已注册",

    "2015": "账户余额不足,请充值!",

    "2016": "上级用户不存在",

    "8000": "注册钱包可用余额不足",

    "8001": "可提现金额不足",

    "8002": "电子钱包可用余额不足",

    "8003": "现金钱包可用余额不足",

    "8004": "电子钱包最多只能使用配套金额的50%",

    "8005": "输入的金额和配套金额不匹配",

    "8006": "不能购买当前配套",

    "8007": "最低提现100美金",

    "8008": "提现金额必须是100美金的倍数",

    "8009": "注册钱包不能提现",

    "8010": "MT4钱包余额不足",

    "8011": "MT4数据异常",

    "8012": "该用户不存在",

    "8013": "MT4可提现金额不足",

    "8014": "支付渠道正在维护",

    "8015": "用户名和手机号不匹配",
    /**
     * 账号或密码错误
     */
    "1001": "账号或密码错误",

    "8016": "个人信息已锁定!请使用手机号验证方式来更改个人信息",

    "8017": "邮箱验证码错误",

    "8018": "参数异常",

    "8019": "手机号和当前用户不匹配",
    "8020": "请重置二级密码",
    "8021": "二级密码错误",
    "8022": "用户名不存在",

    "8023": "请输入银行卡号",
    "8024": "请输入正确的银行卡号",
    "8025": "该银行卡已绑定",

    "8026": "无效账号",
    "8027": "当前银行卡信息不完善",
    "8028": "输入信息有误,请重新输入",
    "8029": "不能给自己转账",
    "8030": "不能输入负数",
    "8031": "未输入金额",
    "8032": "MT4连接异常",

    "8033": "请输入正确的用户ID",
    "8034": "只能给自己上下级进行转账",

    "8035": "未录入冷钱包地址",
    "8036": "下级用户不存在",
    "8037": "该消息已回复",
    "8038": "只能在周六和周日进行提现",
    "8039": "真实姓名填写错误",
    "8040": "体验配套未开放此功能",
    "8041": "一个证件号码只可以注册一个用户",
    "8042": "冷钱包地址只可以添加不能修改",

    "8043": "当前MT4配套已锁定，不能进行升级",
    "8044": "当前配套不能解约",
    "8045": "请在周一至周五提交申请",
    "8046": "上传信息错误,请重试",
    "8047": "该订单已回调",
    "8048": "请先完成实名认证审核",
    "8049": "请输入金额",
    "8050": "请输入提现金额",
    "8051": "用户名不能包含空格",
    /**
     * 数据库中已存在该记录
     */
    "9001": "数据库中已存在该记录",
    /**
     * 没有权限，请联系管理员授权
     */
    "9002": "没有权限，请联系管理员授权",

    "10001": "邮件已发送成功，请到您的邮箱中进行激活",
    "19999": "MT4近期亏损,目前可提现至现金钱包的金额为:",

    "500": "网络出现延迟，请刷新并耐心等候",
    "7948": "请求失败,请重新尝试",
    "5555": "未知错误",
    "9999": "网络出现延迟，请刷新并耐心等候",
  },
  login: {
    login: "会员登录",
    admin_login: "管理员登录",
    lang: "语言",
    sel_lang: "请选择语言",
    username: "用户名",
    userId: "用户ID",
    pass: "密码",
    code: "验证码",
    phone: "手机号",
    please_referral_id: "请输入推荐人ID",
    to_reg: "去注册",
    loginErrInfo: {
      username: "请输入用户名",
      password: "请输入密码"
    },
    forgetErrInfo: {
      phone: "请输入手机号",
      codesend: "验证码发送成功",
      success: "密码修改成功"
    },
    login_btn: "登录",
    forget_btn: "提交",
    forgetpass: "忘记密码",
    officialweb: "返回官网",
    backlogin: "返回登陆"
  },
  register: {
    register: "新用户注册",
    lang: "语言",
    sel_lang: "请选择语言",
    username: "用户名",
    pass: "密码",
    cfmpass: "确认密码",
    code: "验证码",
    phone: "手机号",
    englishName: "英文名",
    name: "真实姓名",
    id_card: "身份证",
    passport: "护照",
    email: "邮箱",
    regErrInfo: {
      username: "请输入用户名",
      password: "请输入密码",
      cfmpass: "两次输入密码不一致",
      invite_code: "邀请码不正确",
      phone: "请先填写手机号",
      name: "请先填写真实姓名",
      englishName: "请先填写英文名",
      id_card: "请先填写身份证",
      email: "请先填写邮箱",
      success: "注册成功",
      sendsuc: "验证码发送成功"
    },
    forgetErrInfo: {
      phone: "请输入手机号",
      codesend: "验证码发送成功",
      success: "密码修改成功"
    },
    reg_btn: "注册",
    backlogin: "返回登陆",
    nextStep: "下一步",
    preStep: "上一步"
  },
  user: {
    home: "个人面板",
    my_account: "我的账户",
    personal_profile: "个人信息",
    change_info: "修改用户信息",
    pass_manage: "修改账号密码",
    transaction_pass: "设置二级密码",
    asset_allocation: "MT4资产管理",
    asset_transfer: "财务转账",
    phone_manage: "更换手机号码",
    opt2_phone_manage: "更换登录手机号",
    report: "钱包明细",
    cash_wallet: "现金钱包",
    e_wallet: "电子钱包",
    reg_wallet: "注册钱包",
    mt4_wallet: "MT4盈利钱包",
    reg_menu: "注册会员",
    new_members: "注册新会员",
    invite_reg: "邀请注册",
    recharge_menu: "账号入金",
    recharge: "账号入金",
    recharge_list: "入金记录",
    withdraw_menu: "账号出金",
    withdraw: "账号出金",
    withdraw_list: "出金记录",
    product_manage: "购买配套",
    product_input: "购买配套",
    buy_suc: "购买成功",
    product_chart: "历史交易回报",
    product_rule: "合同协议书",
    lower_list: "推荐列表",
    send_feedback: "发送反馈",
    bank_card: "银行卡管理",
    idcard_upload: "证件上传",
    bank_card_upload: "银行卡上传",
    feedback: "会员反馈",
    feedback_list: "反馈列表",
    bit_address: "数字货币钱包",
    product_info: "配套管理",
    product_setting: "配套列表",
    destroy_record: "配套解约记录",
    product_out: "MT4提现",
    product_upgrade: "配套升级",
    news_list: "新闻资讯",
    product_destroy: "配套出金",
  },
  admin: {
    admin_home: "首页",
    withdraw_history: "出金流水列表",
    recharge_history: "入金流水列表",
    asset_info: "社区成员资产信息",
    net_fund: "社区成员净入金",
    withdraw_audit: "出金审核",
    admin_transfer: "财务转账",
    member_list: "会员列表",
    member_info: "会员信息",
    admin_feedback: "反馈信息",
    wallet_report: "会员钱包明细",
    notice_list: "公告列表",
    notice_detail: "公告详情",
    product_report: "配套购买记录",
    news_report: "新闻资讯",
    news_detail: "新闻详情",
    destroy_audit: "MT4出金列表",
    unusual_audit: "MT4异常列表"
  },
  system_container: {
    server_time: "服务器日期和时间",
    bulletin: "公告信息",
    logout: "退出",
    back: "返回",
    admin: "管理员",
    tips: "提示",
    ok: "确认",
    no: "取消",
    hello: "您好",
    please_two_pass: "请输入二级密码"
  },
  common: {
    submit: "提交",
    username: "用户名或ID",
    user_id: "请输入用户ID",
    nomsg: "暂无数据",
    search: "搜索",
    copy: {
      copy: "复制",
      yes: "复制成功",
      no: "复制失败"
    },
    trade_pass: "交易密码",
    time: {
      day: "天",
      hours: "小时",
      minutes: "分钟",
      seconds: "秒"
    }
  },
  table: {
    date: "日期",
    number: "数量",
    type: "类型",
    describe: "描述",
    status: "状态",
    handle: "操作",
    to: "至",
  },
  wallet: {
    mt4: "MT4盈利钱包",
    reg: "注册钱包",
    ele: "电子钱包",
    cash: "现金钱包"
  },
  home: {
    wallet: "钱包",
    asset_handle: "资金操作",
    recharge: "充值",
    withdraw: "提现",
    person_asset: "个人资产",
    trading_strategy: "交易策略",
    monthly_returns: "预期月回报率",
    my_product: "所持配套",
    acc_earnings: "累计收益",
    last_date: "上次登录时间",
    user_info: "用户信息",
    congratulations: "恭喜您已经成为我们",
    returns_detailed: "收益明细",
    member: "个人资料",
    username: "用户名",
    total: "总业绩",
    create_time: "创建时间",
    look_rule: "查看合同协议书",
    price: "金额",
    chart1: "MT4出金明细",
    chart2: "电子钱包明细"
  },
  personal_profile: {
    username: "用户名",
    personalInfo: "个人信息",
    baseInfo: '基本信息',
    identityInfo: '身份信息',
    walletInfo: '钱包信息',
    name: "真实姓名",
    englishName: "英文名",
    cardType: "证件类型",
    cardNum: "证件号码",
    mobile: "手机号",
    sex: "性别",
    male: "男",
    female: "女",
    countries: "国家",
    provinces: "省份",
    city: "城市",
    area: "区/县",
    address: "地址",
    btc_addr: "BTC地址",
    eth_addr: "ETH地址",
    usdt_addr: "USDT地址",
    id_card: "身份证",
    passport: "护照",
    demo_mt4_user: "演示账号",
    demo_mt4_password: "演示密码",
    mt4_user: "MT4账号",
    mt4_password: "MT4密码",
    sure_btn: "最终确认",
    login_user: "登录会员系统",
    change_addr: "修改地址",
    audit: "审核",
    bit_tit: "温馨提示",
    bit_tips1: "钱包地址提交后将无法个人操作更改， 如需更改地址请在线反馈联系客服。",
    setUserInfoErr: {
      cardNum: "请先填写证件号",
      success: "修改成功",
      suresuc: "确认成功"
    }
  },
  pass_manage: {
    change_pass: "修改密码",
    old_pass: "原密码",
    new_pass: "新密码",
    cfm_new_pass: "确认新密码",
    changePassErrInfo: {
      success: "修改成功",
      old_pass: "原密码不能为空",
      new_pass: "新密码不能为空",
      newpasswordCFW: "两次密码输入不一致"
    }
  },
  transaction_pass: {
    reset_pass: "设置二级密码",
    now_phone: "当前手机号",
    code: "验证码",
    get: "获取",
    new_pass: "新密码",
    cfm_new_pass: "确认新密码",
    new_sec_pass: "新二级密码",
    cfm_sec_pass: "确认新二级密码",
    resetPassErrInfo: {
      success: "设置二级密码成功",
      userPass: "请先输入账号密码",
      beforeCode: "请先输入验证码",
      getCodeOk: "验证码发送成功",
      newpasswordCFW: "两次密码输入不一致"
    }
  },
  phone_manage: {
    phone_manage: "手机号码管理",
    now_manage: "当前手机号",
    change_phone: "更改手机号",
    user_pass: "账号密码",
    code: "验证码",
    get: "获取",
    setPhoneErr: {
      getCodeErr: "请先填写手机号",
      userPass: "请先输入账号密码",
      beforeCode: "请先输入验证码",
      beforeCode1: "请先输入图形验证码",
      getCodeOk: "验证码发送成功",
      success: "修改成功",
    }
  },
  asset_allocation: {
    asset_manage: "资产管理",
    transfer_out: "转出钱包",
    transfer_in: "转入钱包",
    transfer_money: "转出金额",
    mt4put: "MT4已解冻盈利",
    refresh: "刷新MT4盈利钱包",
    warm_prompt: "温馨提示",
    tips1: "周一至周五为交易日，在交易期间不能提款MT4盈利，请在周末进行提款。",
    allocationErrInfo: {
      transfer_money: "请先输入金额",
      success: "转账成功",
      refreshsuc: "刷新成功"
    },
    text1: '注册钱包可用余额不足',
    text2: '电子钱包可用余额不足',
    text3: '现金钱包可用余额不足',
  },
  asset_transfer: {
    asset_transfer: "财务转账",
    trans_in_user: "转入账号ID",
    trans_in_name: "转入用户名",
    query: "查询",
    transfer_money: "转账金额",
    describe_cn: "中文备注",
    describe_en: "英文备注",
  },
  wallet_details: {
    mt4_details: "MT4盈利钱包",
    cash_details: "现金钱包",
    ele_details: "电子钱包",
    reg_details: "注册钱包",
    order_no: "订单号",
    change_amount: "收入/支出",
    into_money: "收入",
    out_money: "支出",
    old_amount: "原金额",
    new_amount: "余额",
    user_id: "用户ID",
    username: "用户名",
    mt4_id: "MT4 ID",
    reson: "备注",
    handleType: {
      "1": "入金",
      "2": "购买 / 升级配套",
      "3": "自主交易",
      "4": "出金",
      "5": "交易佣金",
      "6": "同级分红",
      "7": "合约佣金",
      "8": "利润分红",
      "9": "交易盈利",
      "10": "MT4盈利钱包",
      "11": "转出",
      "12": "转入",
      "13": "MT4钱包提现",
      "14": "注册新账户",
    }
  },

  new_members: {
    new_members: "注册新会员",
    account: "用户名",
    pass: "密码",
    cfmpass: "确认密码",
    phone: "手机号",
    email: "邮箱",
    product: "配套选择",
    name: "真实姓名",
    englishName: "英文名",
    sex: "性别",
    male: "男",
    female: "女",
    cardtype: "证件类型",
    id_card: "身份证",
    passport: "护照",
    idNo: "证件号码",
    reg: "注册",
    regErr: {
      success: "注册成功",
      product: {
        selOn: '请先选择配套'
      },
      password: "两次输入密码不一致",
      realpass: "请输入密码",
      payRealpass: "请输入交易密码"
    }
  },
  invite_reg: {
    invite_reg: "邀请注册",
    invite_link: "点击邀请链接或扫描二维码注册",
    referral_id: "推荐人ID"
  },
  product_manage: {
    look_profit: "查看历史回报",
    month_profit: "预期月回报能力",
    select: "选择",
    upgrade: "升级",
    active: "已升级",
    sel_product: "选择配套",
    input_num: "请选择购买数量",
    buy_btn: "立即购买",
    introduce: {
      junior: "体验账户 - 为了实现让更多客户体验IBM的AI人工智能交易系统，特别引荐100/200/300美金真实账户体验，让客户能更全面体验引领2018趋势的AI人工智能交易系统的乐趣！",
      basic: "利用系统基础面与技术面大数据进行线性分析处理，效率最高，执行最快，持单周期最短，适合初级理财人士。",
      pro: "交易范围进一步拓宽，同时执行多项策略，允许小单亏损大单盈利的判断并开始具备高频测试空单并交易实单的能力，适合中级资产客户。",
      genius: "拥有自主学习能力及自主防御系统，使用迭代升级及迭代策略分析并分布式执行，智能化进一步提高，适合高级客户或长期持有数字资产的客户。"
    }
  },
  product_input: {
    buy_product: "购买配套",
    sel_product: "您选择的配套",
    need_pay: "需支付资金(USD)",
    read_agree: "我已阅读并接受",
    read1: "《风险披露声明》",
    sure_pay: "确认支付资金(USD)",
    setProductErrInfo: {
      buySuccess: "购买成功",
      paypass: "请输入二级密码",
      money: "输入金额与总支付金额不符",
      cp1: "CP不能为空",
      cp2: "CP必须大于总金额的50%",
      rp: "RP不能为空",
    }
  },
  product_setting: {
    buy_time: "购买时间",
    date: "时间",
    id: "ID",
    mat_name: "配套名",
    mat_money: "配套金额",
    mt4_account: "MT4账户",
    mt4_pass: "MT4密码",
    mt4_wallet: "MT4盈利钱包",
    mt4_money: "MT4可提现金额",
    mt4_out: "MT4已提现金额",
    monthly_returns: "预期月回报率",
    refresh: "刷新",
    withdraw: "提现",
    upgrade: "升级",
    read: "合同",
    destroy: "解约",
    status: "状态",
    lock: "锁定",
    normal: "正常",
    destroy_status: {
      1: "申请解约",
      3: "解约驳回",
      6: "解约成功",
      7: "解约成功",
    },
    tips_tit: "注意事项：",
    tips1: "配套出金需在周一至周五提交申请，本公司将在交易日结束后的周末为您结算MT4余额，以及审核通过您的申请及调整您可提现的MT4金额。",
    handleErrInfo: {
      refresh: "刷新成功",
      withdraw: "提现成功",
      destroy: "出金成功",
    },
    text1: '请输入提现金额',
  },
  product_out: {
    use_money: "可提现金额",
    sel_money: "提现金额",
    tips1: "周一至周五为交易日，在交易期间不能提款 MT4盈利，请在周末进行提款。"
  },
  product_upgrade: {
    now_product: "当前配套",
    sel_product: "升级配套",
    pay_money: "支付金额",
    setProductErrInfo: {
      success: "升级成功"
    }
  },
  buy_suc: {
    buy: "购买",
    success: "成功",
    buy_pack_suc: "购买配套成功",
    buy_success: "购买成功",
    pay_money: "支付资金",
    demo_user_tips: "为了让您更清晰的管理您的账户，我们为您提供一个演示账户供您参考！",
    demo_user_account: "MT4账号",
    demo_user_password: "MT4密码"
  },
  product_rule: {
    verifyUserErr: {
      infoErr: "请尽快完善个人信息!",
      daySure: "距离最终确认个人信息还剩",
      submit: "并且提交审核",
      reason: "驳回原因：",
      productErr: "请先购买配套"
    }
  },
  recharge: {
    text1: '请选择数字货币种类',
    payment: "支付方式",
    input_num: "请选择美元金额",
    buy_num: '购买数量',
    real_num: "购买数量",
    now_usd_rate: "当前美元汇率为",
    buy_btn: "提交购买申请",
    need_pay: "您需要支付",
    tips_tit: "入金说明：",
    tips1: "由于支付宝属于中国大陆第三方支付平台，所有金额以人民币为基础货币进行计价，所以在兑换美元时，人民币需以十位整数进行计算，并采取汇丰银行当日平均汇率。您可选择不同的美元金额，以充值相应的人民币金额。",
    tips2: "入金将产生3%的金流通道手续费，将由全球各银行网关及支付通道收取。",
    tips3: "请务必在2分钟内完成支付，且每个支付二维码地址仅限使用一次，超时或多次支付请刷新重新获取二维码地址。",
    tips4: "如果二维码超时，请刷新获取另一个独特的二维码",
    pay_addr: "将指定的数量发送到下面的地址",
    submit_suc: "提交成功",
    order_no: "订单号",
    pay_transfer: "您可以直接转账给公司",
    company: "公司",
    account: "账户",
    bank_name: "受益人的银行名称",
    Intermediary: "中介银行",
    alias: "别名",
    order_tips: "注：转账时请在备注栏里输入订单编号",
    payErrInfo: {
      selpayNone: "该支付方式暂时无法使用",
      ap: "请正确填写购买数量",
      money: "请先填写购买金额"
    },
    payList: {
      alipay: "支付宝",
      btc: "比特币",
      eth: "以太币",
      usdt: "泰达币"
    }
  },
  recharge_list: {
    orderNo: "订单号",
    creatTime: "充值时间",
    okTime: "支付时间",
    money: "金额",
    type: "支付方式",
    state: "状态",
    alipay: "支付宝",
    wechat: "微信",
    paid: "已支付",
    non_payment: "未支付",
    paytype: {
      "0": "网关",
      "1": "快捷",
      "2": "支付宝",
      "3": "微信",
      "4": "京东",
      "5": "WAP",
      "6": "银联扫码",
      "7": "转账汇款",
      "22": "冷钱包",
    }
  },
  transfer: {
    transfer: "转账",
    conversion: "转换",
    trans_out_num: "转出数额",
    trans_in_account: "转入账号",
    transferErrInfo: {
      success: "转账成功",
      account: "请输入转出账号",
      money: "请输入转出正确的数量",
      sure: "确认转账?",
      paypass: "请输入交易密码"
    }
  },
  send_feedback: {
    feedback_info: "反馈信息",
    title: "标题",
    content: "内容",
    screenshots: "截图",
    sendErrInfo: {
      success: "提交成功",
      title: "标题不能为空",
      content: "内容不能为空"
    }
  },
  withdraw: {
    withdraw_money: "提现金额",
    sel_bank: "选择银行卡",
    sel_bit: "提币类型",
    cash: "现金",
    tips_tit: "出金说明：",
    tips1: "账户出金要求最低100美元起；",
    tips2: "出金将产生5%的金流通道手续费，将由全球各银行网关及支付通道收取；",
    tips3: "出金申请将在提交后的三个工作日内到账。",
    bankType: {
      type1: "香港银行卡",
      type2: "中国内地银行卡",
      type3: "其他国家/地区银行卡",
    },

    withdrawalErrInfo: {
      success: "提现申请成功",
    },
  },
  withdraw_list: {
    time: "申请时间",
    bankType: "提现类型",
    bankName: "提币币种",
    withdrawMoney: "金额",
    auditTime: "审核时间",
    reason: "描述",
    withdrawStatus: "状态",
    payType: {
      "1": "电子钱包",
      "2": "现金钱包",
      "3": "注册钱包",
    },
    status: {
      "1": "提交申请",
      "3": "驳回申请",
      "6": "提现成功",
    }
  },
  lower_list: {
    input_username: "请输入用户ID",
    search: "搜索",
    upper: "上级",
    now: "当前",
    lower: "下级",
    username: "用户名",
    user_id: "用户ID",
    my_product: "持有配套",
    member_level: "会员等级",
    person_performance: "个人业绩",
    team_performance: "团队业绩",
    referral_num: "推荐人数",
    team_num: "团队人数",
    no_data: "暂无数据"
  },
  bank_card: {
    card_manage: "银行卡管理",
    add_card: "添加银行卡",
    setBankErr: {
      delSuccess: "解绑成功",
      delSure: "确定要解绑银行卡吗？"
    }
  },
  bank_card_edit: {
    sel_card: "选择银行卡类型",
    china_card: "中国内地银行卡",
    other_card: "其他国家/地区银行卡",
    card_info: "银行卡信息",
    get_bank: "开户银行全名",
    bank_num: "银行卡号码",
    card_person: "银行账户持有人",
    id_num: "身份证号码",
    phone: "预留手机号码",
    bank_swift: "银行SWIFT",
    country: "国家",
    get_money: "获得的金额",
    get_num: "获得的数量",
    setBankErr: {
      addSuccess: "添加成功",
      editSuccess: "编辑成功"
    }
  },
  idcard_upload: {
    card_just: "证件正面",
    card_back: "证件反面",
    now_card_just: "当前证件正面",
    now_card_back: "当前证件反面",
    bank_just: "银行卡正面",
    bank_back: "银行卡反面",
    now_bank_just: "当前银行卡正面",
    now_bank_back: "当前银行卡反面",
    change: "修改",
    uploadErr: {
      selIMG: "请先选择图片!",
      isIMG: "只能上传图片格式!",
      isLt2M: "上传图片大小不能超过 15MB!"
    }
  },
  admin_home: {
    input_username: "请输入用户名",
    search: "搜索",
    inventoryList: {
      total1: "历史总充值金额",
      total2: "上月总充值金额",
      total3: "本月总充值金额",
      total4: "历史总出金金额",
      total5: "上月总出金金额",
      total6: "本月总出金金额",
      total7: "历史总注册人数",
      total8: "上月总注册人数",
      total9: "本月总注册人数",
      diy_total1: "自定义周期总充值金额",
      diy_total2: "自定义周期总出金金额",
      diy_total3: "自定义周期总注册人数",
    }
  },
  withdraw_history: {
    order_no: "订单号",
    time: "申请时间",
    user_id: "ID",
    real_name: "真实姓名",
    real_bank_phone: "手机号",
    bank_name: "银行名称",
    withdraw_money: "提现金额"
  },
  recharge_history: {
    order_no: "订单号",
    other_order: "第三方订单号",
    creat_time: "充值时间",
    username: "用户名",
    user_id: "ID",
    usd: "金额",
    state: "状态",
    audit: "回调",
    text1: '确定要回调吗？',
  },
  asset_info: {
    backupper: "返回上一级",
    username: "用户名",
    creatTime: "注册时间",
    total_assets: "总资产",
    gole_assets: "总入金",
    out_of_gole: "总出金",
    profit_assets: "总收益",
    mer_name: "用户持有的配套",
    handle: "操作",
    look_lower: "查看下级",
    asset_list: {
      total1: "总资产",
      total2: "总入金",
      total3: "总出金",
      total4: "总收益"
    },
    inventoryList: {
      diy_total1: "自定义周期总充值金额"
    }
  },
  withdraw_audit: {
    order_no: "订单号",
    time: "申请时间",
    user_id: "ID",
    real_name: "真实姓名",
    real_bank_phone: "手机号",
    bank_name: "银行名称",
    withdraw_money: "提现金额",
    withdraw_status: "状态",
    handle: "操作",
    through: "通过",
    rejected: "驳回",
    restore: "恢复",
    reason: "原因",
    reason1: "中文原因",
    reason2: "英文原因",
    status: {
      submit: "出金申请",
      rejected: "出金驳回",
      submit_suc: "出金成功",
    },
    auditErrInfo: {
      through: "通过成功",
      rejected: "驳回成功",
      restore: "恢复成功",
      handle: "操作成功"
    },
    text1: '是否继续？',
    pass: '批量通过',
    select: '请先选择！',
  },
  admin_feedback: {
    enterPhone: '登录手机号',
    no_reply: "未回复",
    replied: "已回复",
    username: "反馈用户",
    user_id: "用户ID",
    content_create_time: "反馈时间",
    content_reply_time: "回复时间",
    title: "反馈标题",
    content: "反馈内容",
    screenshots: "反馈截图",
    reply_content: "回复内容",
    reply_list: "回复列表",
    reply: "回复",
    look: "查看",
    replyErrInfo: {
      success: "回复成功",
      replyContent: "请先填写回复内容"
    },
    email: '邮箱',
    changeEmail: '修改邮箱',
    oldEmail: '原邮箱',
    newEmail: '新邮箱',
    phone: '手机号',
    changePhone: '修改手机号',
    oldPhone: '原手机号',
    newPhone: '新手机号',
    grade: '等级',
    changeGrade: '修改等级',
    gradeName: '原等级',
    gradeId: '等级ID',
    selectGrade: '选择等级',
    selectGrade_reg: '请选择等级',
    reset_grade: '重置等级',
    reset_success: '重置成功',
    ladder: '上下级',
    changeLadder: '修改用户上下级',
    oldLadderID: '上级ID',
    ladderID: '新上级ID',
    ladderID_reg: '请输入新上级ID',
  },
  member_list: {
    username: "用户名",
    user_id: "用户ID",
    create_time: "注册时间",
    name: "姓名",
    english_name: "英文名",
    mobile: "手机号",
    email: "邮箱",
    status: {
      0: "未通过",
      1: "待审核",
      2: "审核通过"
    },
    delete: '已删除',
    noDelete: '未删除',
  },
  active: {
    act1: {
      title: "2018 节日交易时间调整公告",
      coontent: "<p>尊敬的客户：</p><p>佳节临近，在此本公司提前通知全球的客户与伙伴们，圣诞节和元旦节假日期间，各大金融中心的工作时间将有闭市与开市时间的调整，敬请各位留意。</p><br><p>下表列出了2018年12月25日至2019年1月2日，圣诞节与元旦节期间的交易时间表调整情况：</p><br><table style='width:100%;'><tr><th>日期</th><th>市场交易时间</th></tr><tr><td>2018.12.25</td><td>不交易</td></tr><tr><td>2018.12.26</td><td>正常时间交易</td></tr><tr><td>2018.12.27</td><td>正常时间交易</td></tr><tr><td>2019.01.01</td><td>不交易</td></tr><tr><td>2019.01.02</td><td>正常时间交易</td></tr><tr><td>2019.01.03</td><td>正常时间交易</td></tr></table><br><p>如果您有任何问题，请联系我们的在线客服，或发送邮件至info@ibmcapital.co。</p><br><p><b>IBM Capital</b>在此恭祝各位圣诞节及元旦节快乐！</p><br><br><br><p class='right'>IBM Capital管理层 敬上</p><p class='right'>2018年 12月24日</p>"
    }
  },
  notice_list: {
    title: "标题",
    body: "内容",
    createTime: "创建时间",
    language: "语言",
    edit: "编辑",
    sort: "排序",
    add: '添加公告',
    del: "删除"
  },
  notice_detail: {
    title: "标题",
    content: "内容",
    language: "语言",
    sort: "排序",
    editErrInfo: {
      language: "请先选择语言",
      sort: "请先填写排序",
      title: "请先填写标题",
      content: "请先填写内容",
      changeSuc: "修改成功",
      addSuc: "添加成功",
      delSuc: "删除成功",
      sureDel: "确认删除？"
    }
  },
  product_report: {
    order_no: "订单号",
    money: "本次花费金额",
    user_id: "用户id",
    username: "用户名",
    new_money: "购买后持有配套金额",
    mat_name: "配套名称",
    bay_time: "购买时间",
    state: {
      1: "购买",
      2: "升级"
    },
  },
  news_report: {
    add: "添加",
    title: "标题",
    url: "链接",
    img: "预览图"
  },
  unusual_audit: {
    text1: 'MT4异常列表',
    text2: 'MT4异常详情',
    text3: 'MT4异常编辑',
    text4: '未处理',
    text5: '已处理',
    text6: '不处理',
    text7: '用户ID',
    text8: '时间',
    text9: 'MT4账户',
    text10: 'MT4ID',
    text11: '金额',
    text12: '类型',
    text13: '状态',
    type1: '注册',
    type2: '注册入金',
    type3: '升级配套',
    type4: 'MT4提现',
    type5: 'MT4解约',
    status1: '未处理',
    status2: '已处理',
    status3: '不处理',
    text14: '处理成功',
  },
  other: {
    text1: '获取验证码方式',
    text2: '手机',
    text3: '当前邮箱',
  }
};
export default zh;
