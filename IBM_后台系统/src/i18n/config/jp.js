const jp = {
  el: {
    colorpicker: {
      confirm: 'OK',
      clear: 'クリア'
    },
    datepicker: {
      now: '現在',
      today: '今日',
      cancel: 'キャンセル',
      clear: 'クリア',
      confirm: 'OK',
      selectDate: '日付を選択',
      selectTime: '時間を選択',
      startDate: '開始日',
      startTime: '開始時間',
      endDate: '終了日',
      endTime: '終了時間',
      prevYear: '前年',
      nextYear: '翌年',
      prevMonth: '前月',
      nextMonth: '翌月',
      year: '年',
      month1: '1月',
      month2: '2月',
      month3: '3月',
      month4: '4月',
      month5: '5月',
      month6: '6月',
      month7: '7月',
      month8: '8月',
      month9: '9月',
      month10: '10月',
      month11: '11月',
      month12: '12月',
      // week: '週次',
      weeks: {
        sun: '日',
        mon: '月',
        tue: '火',
        wed: '水',
        thu: '木',
        fri: '金',
        sat: '土'
      },
      months: {
        jan: '1月',
        feb: '2月',
        mar: '3月',
        apr: '4月',
        may: '5月',
        jun: '6月',
        jul: '7月',
        aug: '8月',
        sep: '9月',
        oct: '10月',
        nov: '11月',
        dec: '12月'
      }
    },
    select: {
      loading: 'ロード中',
      noMatch: 'データなし',
      noData: 'データなし',
      placeholder: '選択してください'
    },
    cascader: {
      noMatch: 'データなし',
      loading: 'ロード中',
      placeholder: '選択してください'
    },
    pagination: {
      goto: '',
      pagesize: '件/ページ',
      total: '総計 {total} 件',
      pageClassifier: 'ページ目へ',
      total1: '総計',
      total2: '件',
    },
    messagebox: {
      title: 'メッセージ',
      confirm: 'OK',
      cancel: 'キャンセル',
      error: '正しくない入力'
    },
    upload: {
      deleteTip: 'Delキーを押して削除する',
      delete: '削除する',
      preview: 'プレビュー',
      continue: '続行する'
    },
    table: {
      emptyText: 'データなし',
      confirmFilter: '確認',
      resetFilter: '初期化',
      clearFilter: 'すべて',
      sumText: '合計'
    },
    tree: {
      emptyText: 'データなし'
    },
    transfer: {
      noMatch: 'データなし',
      noData: 'データなし',
      titles: ['リスト 1', 'リスト 2'],
      filterPlaceholder: 'キーワードを入力',
      noCheckedFormat: '総計 {total} 件',
      hasCheckedFormat: '{checked}/{total} を選択した'
    }
  },
  editor: {
    text1: 'サイズ',
    text2: 'フォント',
    text3: '宋体',
    text4: 'マイクロソフト',
    text5: 'リンクテキスト',
    text6: 'リンク',
    text7: '挿入',
    text8: '設定リスト',
    text9: '順序リスト',
    text10: '無秩序リスト',
    text11: '位置モード',
    text12: '左に寄る',
    text13: '中央にある',
    text14: '右に寄る',
    text15: '表の挿入',
    text16: '作成',
    text17: '行',
    text18: '列の表',
    text19: 'コードを挿入',
  },
  errCode: {
    "0": "アクセス請求成功",
    /**
     * 再度ログインしてください
     */
    "200": "再度ログインしてください",
    /**
     * アカウントはロックされています。管理者に連絡してください
     */
    "1002": "アカウントはロックされています。管理者に連絡してください",

    "20001": "通貨が違います",
    /**
     * 注文失敗
     */
    "20002": "注文失敗",
    /**
     * 確認コードが間違いました
     */
    "1003": "確認コードが間違いました",
    /**
     * ユーザー名には6桁以上必要
     */
    "2001": "ユーザー名には6桁以上必要",
    /**
     * パスワードは6桁以上必要
     */
    "2002": "パスワードは6桁以上必要",
    /**
     * "携帯電話番号は6桁以上必要"
     */
    "2003": "携帯電話番号は6桁以上必要",

    "2004": "ID番号は6桁以上必要",

    "2005": "名前は2桁以上必要",

    "2006": "英語名は3桁以上必要",

    "2007": "ユーザー名は既に存在しています",

    "2008": "メールアドレスが登録されています",

    "2009": "電話番号が登録されています",

    "2010": "間違ったパスワード",

    "2011": "メールアドレスの形式が正しくありません",

    "2012": "携帯番号の形式が正しくありません",

    "2013": "確認コードを再取得してください",

    "2014": "ユーザー名が既に登録されています",

    "2015": "口座残高不足,チャージしてください!",

    "2016": "上位ユーザーは存在しません",

    "8000": "登録財布残高不足",

    "8001": "引き出す金額不足",

    "8002": "Eウォレット残高不足",

    "8003": "現金財布残高不足",

    "8004": "Eウォレットはパッケージ金額の50％までしか使用できません",

    "8005": "入力した金額はパッケージ金額と一致しません",

    "8006": "現在のパッケージが購入できません",

    "8007": "引き出しは最低100ドルより",

    "8008": "引き出す金額は100ドルの倍数でなければなりません",

    "8009": "登録財布は出金できません",

    "8010": "MT4財布残高不足",

    "8011": "MT4データ異常",

    "8012": "ユーザーが存在しません",

    "8013": "MT4引き出す金額不足",

    "8014": "支払いルートがメンテナンス中",

    "8015": "ユーザー名と携帯番号が一致しません",
    /**
     * アカウントまたはパスワードが間違いました
     */
    "1001": "アカウントまたはパスワードが間違いました",

    "8016": "個人情報はロックされています！携帯番号の確認方法で個人情報を変更してください ",

    "8017": "メール確認コードが間違いました",

    "8018": "パラメータエラー",

    "8019": "携帯番号は現在のユーザーと一致しません",
    "8020": "二次パスワードをリセットしてください",
    "8021": "二次パスワードが間違いました",
    "8022": "ユーザー名が存在しません",

    "8023": "銀行カード番号を入力してください",
    "8024": "正しい銀行カード番号を入力してください",
    "8025": "銀行カードがすでに追加されました",

    "8026": "無効アカウント",
    "8027": "現在の銀行カード情報が不完全です",
    "8028": "入力情報が間違いました。再入力してください",
    "8029": "自分に送金できません",
    "8030": "負の数が入力できません",
    "8031": "金額が入力されていません",
    "8032": "MT4接続異常",

    "8033": "正しいユーザーIDを入力してください",
    "8034": "自分の上下位ユーザーだけに送金できます",

    "8035": "コールドウォレットアドレスが入力されていません",
    "8036": "下位ユーザーは存在しません",
    "8037": "メッセージが既に返信されました",
    "8038": "土日だけ現金引き出しができます",
    "8039": "本名記入が間違いました",
    "8040": "お試しパッケージにはこの機能がありません",
    "8041": "1つのID番号に1人のユーザーが登録できます",
    "8042": "コールドウォレットアドレスは追加のみ可能で、変更できません",

    "8043": "現在のMT4パッケージはロックされているためアップグレードできませ ん ",
    "8044": "現在のパッケージはリリースできません",
    "8045": "平日に申請書を提出してください",
    "8046": "メッセージをアップロードするのが間違いなので、お試し下さい",
    "8047": "当注文は返送されました",
    "8048": "実名認証を終えてください",
    "8049": "金額を入力してください",
    "8050": "現金引き出しの金額を入力してください",
    "8051": "ユーザ名にはスペースが含まれていません",
    "8052": "ユーザが追加されました",
    /**
     * レコードはすでにデータベースに存在します
     */
    "9001": "レコードはすでにデータベースに存在します",
    /**
     * 許可なし。管理者に連絡してください
     */
    "9002": "許可なし。管理者に連絡してください",

    "10001": "メールが送信しました。メールアドレスで有効にしてください",
    "19999": "MT4最近は欠損していて,現金財布に引き出せる金額は:",

    "500": "ネットワークが遅延しています。リフレッシュしてください",
    "7948": "リクエストが失敗しました。もう一度お試しください",
    "5555": "不明エラー",
    "9999": "ネットワークが遅延しています。リフレッシュしてください",
  },
  login: {
    login: "会員ログイン",
    admin_login: "管理者ログイン",
    lang: "言語",
    sel_lang: "言語を選択してください",
    username: "ユーザー名",
    userId: "ユーザーID",
    pass: "パスワード",
    code: "確認コード",
    phone: "携帯電話番号",
    please_referral_id: "紹介者IDを入力してください",
    to_reg: "登録します",
    loginErrInfo: {
      username: "ユーザー名を入力してください",
      password: "パスワードを入力してください"
    },
    forgetErrInfo: {
      phone: "携帯番号を入力してください",
      codesend: "確認コードが送信されました。",
      success: "パスワードが変更されました。"
    },
    login_btn: "ログイン",
    forget_btn: "送信",
    forgetpass: "パスワードを忘れました",
    officialweb: "公式サイトに戻ります",
    backlogin: "ログインに戻ります"
  },
  register: {
    register: "新規ユーザー登録",
    lang: "言語",
    sel_lang: "言語を選択してください",
    username: "ユーザー名",
    pass: "パスワード",
    cfmpass: "パスワード確認",
    code: "確認コード",
    phone: "携帯番号",
    englishName: "英語名前",
    name: "本名",
    id_card: "IDカード",
    passport: "パスポート",
    email: "メールアドレス",
    regErrInfo: {
      username: "ユーザー名を入力してください",
      password: "パスワードを入力してください",
      cfmpass: "２回入力したパスワードが一致しません",
      invite_code: "招待コードが間違いました",
      phone: "お先に携帯番号を記入してください",
      name: "お先に本名を記入してください",
      englishName: "お先に英語名を記入してください",
      id_card: "お先にID番号を記入してください",
      email: "お先にメールアドレスを記入してください",
      success: "登録完了",
      sendsuc: "確認コードが送信されました"
    },
    forgetErrInfo: {
      phone: "携帯番号を入力してください",
      codesend: "確認コードが送信されました。",
      success: "パスワードが変更されました。"
    },
    reg_btn: "登録",
    backlogin: "ログインに戻ります",
    nextStep: "次へ",
    preStep: "戻る"
  },
  user: {
    home: "ホーム",
    my_account: "アカウント",
    personal_profile: "個人情報",
    change_info: "ユーザー情報を変更します",
    pass_manage: "暗証番号変更。",
    transaction_pass: "二段階認証設定",
    asset_allocation: "MT4資産管理",
    asset_transfer: "資金移転",
    phone_manage: "携帯番号変更",
    opt2_phone_manage: "登録番号を変更する",
    report: "財布の詳細",
    cash_wallet: "現金財布",
    e_wallet: "Eウォレット",
    reg_wallet: "登録財布",
    mt4_wallet: "MT4利益財布",
    reg_menu: "登録メンバー",
    new_members: "新しいメンバーを登録します",
    invite_reg: "招待登録",
    recharge_menu: "アカウント入金",
    recharge: "アカウント入金",
    recharge_list: "入金記録",
    withdraw_menu: "アカウント出金",
    withdraw: "アカウント出金",
    withdraw_list: "出金記録",
    product_manage: "購入パッケージ",
    product_input: "購入パッケージ",
    buy_suc: "購入成功",
    product_chart: "歴史取引收益率",
    product_rule: "契約書",
    lower_list: "メンバーリスト",
    send_feedback: "レビューの送信",
    bank_card: "銀行カード管理",
    idcard_upload: "ID証明書アップロード",
    bank_card_upload: "銀行カードアップロード",
    feedback: "レビュー",
    feedback_list: "レビューリスト",
    bit_address: "デジタル通貨の財布",
    product_info: "パッケージ管理",
    product_setting: "パッケージリスト",
    destroy_record: "パッケージリリース記録",
    product_out: "MT4出金",
    product_upgrade: "パッケージアップグレード ",
    news_list: "ニュース",
    product_destroy: "パッケージ出金",
  },
  admin: {
    admin_home: "ホームページ",
    withdraw_history: "出金フローリスト",
    recharge_history: "入金フローリスト",
    asset_info: "コミュニティメンバーの資産情報",
    net_fund: "コミュニティメンバーの入金",
    withdraw_audit: "出金チェック",
    admin_transfer: "資金移転",
    member_list: "メンバーリスト",
    member_info: "メンバー情報",
    admin_feedback: "フィードバック情報",
    wallet_report: "メンバーの財布の詳細",
    notice_list: "お知らせ一覧",
    notice_detail: "お知らせ詳細",
    product_report: "パッケージ購入記録",
    news_report: "ニュース",
    news_detail: "ニュース詳細",
    destroy_audit: "MT4出金リスト"
  },
  system_container: {
    server_time: "サーバーの日時",
    bulletin: "お知らせ情報",
    logout: "ログアウト",
    back: "戻る",
    admin: "管理者",
    tips: "ヒント",
    ok: "確認",
    no: "キャンセル",
    hello: "こんにちは",
    please_two_pass: "二次パスワードを入力してください"
  },
  common: {
    submit: "送信",
    username: "ユーザー名またはID",
    user_id: "ユーザーIDを入力してください",
    nomsg: "データがありません",
    search: "検索します",
    copy: {
      copy: "コピーします",
      yes: "コピー成功",
      no: "コピー失败"
    },
    trade_pass: "取引パスワード",
    time: {
      day: "日",
      hours: "時間",
      minutes: "分",
      seconds: "秒"
    }
  },
  table: {
    date: "日付",
    number: "数",
    type: "タイプ",
    describe: "説明",
    status: "状態",
    handle: "操作",
    to: "へ",
  },
  wallet: {
    mt4: "MT4利益財布",
    reg: "登録財布",
    ele: "Eウォレット",
    cash: "現金財布"
  },
  home: {
    wallet: "財布",
    asset_handle: "資金操作",
    recharge: "入金",
    withdraw: "出金",
    person_asset: "個人資産",
    trading_strategy: "取引戦略",
    monthly_returns: "予想月収益率",
    my_product: "所有パッケージ",
    acc_earnings: "累積収入",
    last_date: "最後のログイン時刻",
    user_info: "ユーザー情報",
    congratulations: "おめでとうございます",
    returns_detailed: "収入の内訳",
    member: "個人情報",
    username: "ユーザー名",
    total: "トータルパフォーマンス",
    create_time: "作成時間",
    look_rule: "契約書を見ます",
    price: "金額",
    chart1: "MT4出金詳細",
    chart2: "Eウォレット詳細"
  },
  personal_profile: {
    username: "ユーザー名",
    personalInfo: "個人情報",
    baseInfo: '基本情報',
    identityInfo: '本人確認',
    Information: 'ウォレット情報',
    name: "本名",
    englishName: "英語名前",
    cardType: "本人確認書類",
    cardNum: "ID番号",
    mobile: "携帯番号",
    sex: "性别",
    male: "男",
    female: "女",
    countries: "国",
    provinces: "省",
    city: "市",
    area: "区",
    address: "住所",
    btc_addr: "BTCアドレス",
    eth_addr: "ETHアドレス",
    usdt_addr: "USDTアドレス",
    id_card: "IDカード",
    passport: "パスポート",
    demo_mt4_user: "デモアカウント",
    demo_mt4_password: "デモパスワード",
    mt4_user: "MT4アカウント",
    mt4_password: "MT4パスワード",
    sure_btn: "最終確認",
    login_user: "メンバーシステムにログイン",
    change_addr: "住所変更",
    audit: "審査",
    bit_tit: "ヒント",
    bit_tips1: "ウォレットアドレスを送信した後は、個人的な変更ができません。アドレスを変更する必要がある場合は、カスタマーサービスにご連絡ください。",
    setUserInfoErr: {
      cardNum: "お先にID番号を記入してください。",
      success: "変更完了",
      suresuc: "確認完了"
    }
  },
  pass_manage: {
    change_pass: "パスワード変更",
    old_pass: "元パスワード",
    new_pass: "新しいパスワード",
    cfm_new_pass: "パスワードを確認",
    changePassErrInfo: {
      success: "変更完了",
      old_pass: "元パスワードを記入してください",
      new_pass: "新しいパスワードを記入してください",
      newpasswordCFW: "二回記入したパスワードが一致しません"
    }
  },
  transaction_pass: {
    reset_pass: "二段階認証設定",
    now_phone: "現在の携帯電話番号",
    code: "確認コード",
    get: "取得します",
    new_pass: "新しいパスワード",
    cfm_new_pass: "新しいパスワードを確認",
    new_sec_pass: "新しいパスワード",
    cfm_sec_pass: "パスワードを確認",
    resetPassErrInfo: {
      success: "二次パスワード設置成功",
      userPass: "お先にアカウントのパスワードを入力してください",
      beforeCode: "お先に認証コードを入力してください",
      getCodeOk: "確認コードを送信しました",
      newpasswordCFW: "二回記入したパスワードが一致しません"
    }
  },
  phone_manage: {
    phone_manage: "携帯番号管理",
    now_manage: "現在の携帯番号",
    change_phone: "携帯番号変更。",
    user_pass: "アカウントのパスワード",
    code: "確認コード",
    get: "取得します",
    setPhoneErr: {
      getCodeErr: "お先に携帯番号を入力してください",
      userPass: "お先にアカウントのパスワードを入力してください",
      beforeCode: "お先に認証コードを入力してください",
      beforeCode1: "まず図の検証コードを入力してください",
      getCodeOk: "確認コードを送信しました",
      success: "変更完了",
    }
  },
  asset_allocation: {
    asset_manage: "資産管理",
    transfer_out: "財布から転出",
    transfer_in: "財布に転入",
    transfer_money: "転出金額",
    mt4put: "MT4凍結解除",
    refresh: "リフレッシュMT4利益財布",
    warm_prompt: "ヒント",
    tips1: "月曜日から金曜日までは取引日です。取引期間中はMT4の利潤を引き出すことができません。土日に引き出してください。",
    allocationErrInfo: {
      transfer_money: "金額を入力してください。",
      success: "送金しました。",
      refreshsuc: "リフレッシュ完了"
    }
  },
  asset_transfer: {
    asset_transfer: "資金移転",
    trans_in_user: "振込先アカウントID",
    trans_in_name: "振込先ユーザー名",
    query: "クエリー",
    transfer_money: "振込金額",
    describe_cn: "中国語備考",
    describe_en: "英語備考",
  },
  wallet_details: {
    mt4_details: "MT4利益財布",
    cash_details: "現金財布",
    ele_details: "Eウォレット",
    reg_details: "登録財布",
    order_no: "注文番号",
    change_amount: "所得/支出",
    into_money: "所得",
    out_money: "支出",
    old_amount: "元金額",
    new_amount: "バランス",
    user_id: "ユーザーID",
    username: "ユーザー名",
    mt4_id: "MT4 ID",
    reson: "備考",
    handleType: {
      "1": "入金",
      "2": "パッケージ購入/ アップグレード",
      "3": "自主取引",
      "4": "出金",
      "5": "取引手数料",
      "6": "同級配当",
      "7": "契約手数料",
      "8": "利益配当",
      "9": "取引利益",
      "10": "MT4利益財布",
      "11": "転出",
      "12": "転入",
      "13": "MT4財布引き出し",
      "14": "新しいアカウントを登録",
    }
  },

  new_members: {
    new_members: "新しいメンバーを登録",
    account: "ユーザー名",
    pass: "パスワード",
    cfmpass: "パスワード確認",
    phone: "携帯番号",
    email: "メールアドレス",
    product: "パッケージ選択",
    name: "本名",
    englishName: "英語名前",
    sex: "性别",
    male: "男",
    female: "女",
    cardtype: "本人確認書類",
    id_card: "IDカード",
    passport: "パスポート",
    idNo: "ID番号",
    reg: "登録",
    regErr: {
      success: "登録成功",
      product: {
        selOn: 'お先にパッケージを選んでください。'
      },
      password: "二回記入したパスワードが一致しません",
      realpass: "パスワードを入力してください。",
      payRealpass: "取引パスワードを入力してください"
    }
  },
  invite_reg: {
    invite_reg: "招待登録",
    invite_link: "招待状のリンクをクリックするか、登録するQRコードをスキャンします",
    referral_id: "紹介者ID"
  },
  product_manage: {
    look_profit: "過去の収益を見ます",
    month_profit: "予想月収益性",
    select: "選択",
    upgrade: "アップグレード",
    active: "アップグレード済み",
    sel_product: "パッケージを選択",
    input_num: "購入数量を選択してください",
    buy_btn: "今すぐ購入",
    introduce: {
      junior: "体験アカウント-より多くのお客様にIBMのAI人工知能取引システムを体験させるために、特別に100/200/300米ドルのリアルアカウント体験を紹介して、お客様に2018トレンドをリードするAI人工知能取引システムの楽しみをより全面的に体験させます。",
      basic: "システムの基礎と技術的な側面のビッグデータを線形分析処理に使用して、最高の効率、最速の実行、最短のシングルサイクル期間、ジュニアの金融専門家に適しています。",
      pro: "取引の範囲はさらに拡大され、同時にいくつかの戦略が実行され、小口損失大口の利益の判断を許可し、そして、空の注文をテストし、実際の注文を取引する能力を持ち始めました，中級資産の取引先に適しています。",
      genius: "自主的な学習能力と自主防御システムを持ち、反復的なアップグレードと反復戦略を使って分析し、分散的に実行し、インテリジェント化をさらに向上させ、高級顧客または長期的にデジタル資産を持つ顧客に適しています。"
    }
  },
  product_input: {
    buy_product: "パッケージ購入",
    sel_product: "選んだパッケージ",
    need_pay: "支払う必要があります(USD)",
    read_agree: "以下を読み、同意しました：",
    read1: "「リスク開示書」",
    sure_pay: "支払いを確認します(USD)",
    setProductErrInfo: {
      buySuccess: "購入成功",
      paypass: "二次パスワードを入力してください",
      money: "入力した金額が合計支払い金額と一致しません。",
      cp1: "CPを空にすることができません",
      cp2: "CP合計金額の50％以上でなければなりません",
      rp: "RPを空にすることができません",
    }
  },
  product_setting: {
    buy_time: "購入時間",
    date: "時間",
    id: "ID",
    mat_name: "パッケージ名",
    mat_money: "パッケージ金額",
    mt4_account: "MT4アカウント",
    mt4_pass: "MT4パスワード",
    mt4_wallet: "MT4利益財布",
    mt4_money: "MT4出金できる金額",
    mt4_out: "MT4出金した金額",
    monthly_returns: "予想月収益率",
    refresh: "リフレッシュ",
    withdraw: "引き出し",
    upgrade: "アップグレード",
    read: "契約書",
    destroy: "解約",
    status: "状態",
    lock: "ロック",
    normal: "正常",
    destroy_status: {
      1: "解約を申請します",
      3: "解約却下",
      6: "解約完了",
      7: "解約完了",
    },
    tips_tit: "注意事項",
    tips1: "月曜日から金曜日までにパッケージ出金を申請する必要があり、取引日の終了後の週末にMT4の残高を決済し、申請を確認して承認し、引き出すことができるMT4の金額を調整します。",
    handleErrInfo: {
      refresh: "リフレッシュ完了",
      withdraw: "引き出し完了",
      destroy: "出金完了",
    },
    text1: '現金引き出しの金額を入力してください',
  },
  product_out: {
    use_money: "出金できる金额",
    sel_money: "出金金额",
    tips1: "月曜日から金曜日は取引日で取引中にMT4の利益を引き出すことができません。週末にお金を引き出してください。"
  },
  product_upgrade: {
    now_product: "現在のパッケージ",
    sel_product: "パッケージアップグレード",
    pay_money: "お支払い",
    setProductErrInfo: {
      success: "アップグレード完了"
    }
  },
  buy_suc: {
    buy: "購入",
    success: "成功",
    buy_pack_suc: "購入完了",
    buy_success: "購入完了",
    pay_money: "お支払いへ",
    demo_user_tips: "アカウントをより明確に管理できるように、参考のためにデモアカウントを用意しています。",
    demo_user_account: "MT4アカウント",
    demo_user_password: "MT4パスワード"
  },
  product_rule: {
    verifyUserErr: {
      infoErr: "個人情報を早めに完全記入してください!",
      daySure: "個人情報の最終確認までは",
      submit: "そして審査にかける",
      reason: "却下原因:",
      productErr: "パッケージを先に購入してください"
    }
  },
  recharge: {
    text1: 'デジタル通貨の種類を選択してください',
    payment: "お支払い方法",
    input_num: "ドルの金額を選んでください",
    buy_num: '購入数量',
    real_num: "購入数量",
    now_usd_rate: "現在の米ドルの為替レートは",
    buy_btn: "購入申請を送信します",
    need_pay: "支払う必要があります",
    tips_tit: "入金説明",
    tips1: "アリペイは中国本土の第三者支払いプラットフォームである、すべての金額は人民元ベースの通貨で表示されているため、 米ドルに換算する場合、 人民元10の整数として、 その日のHSBC平均為替レートで計算する必要があります。 対応する人民元の金額をチャージする異なるドルの金額を選択することができます。 ",
    tips2: "入金は3％のゴールドチャンネル料金を発生させます。そして、それはグローバル銀行ゲートウェイと支払いチャンネルによって請求されます。 ",
    tips3: "2分以内にお支払いを完了するようにしてください、そして、各支払いQRコードアドレスは1回の使用に限られていますタイムアウトまたは複数の支払いは、更新してQRコードアドレスを再取得してください。 ",
    tips4: "QRコードがタイムアウトした場合は、別のユニークなQRコードを取得してください ",
    pay_addr: "指定された数量を以下の住所に送付してください。",
    submit_suc: "送信しました",
    order_no: "注文番号",
    pay_transfer: "会社に直接送金することができます",
    company: "会社",
    account: "アカウント",
    bank_name: "受取人の銀行名",
    Intermediary: "仲介銀行",
    alias: "別名",
    order_tips: "注：送金時に備考欄に注文番号を入力してください。",
    payErrInfo: {
      selpayNone: "このお支払い方法は一時的にご利用いただけません",
      ap: "購入数量を正しく記入してください",
      money: "購入金額を記入してください"
    },
    payList: {
      alipay: "アリペイ",
      btc: "ビットコイン",
      eth: "エーテルコイン",
      // usdt: "TEDA通貨"
      usdt: "Tether"
    }
  },
  recharge_list: {
    orderNo: "注文番号",
    creatTime: "入金時間",
    okTime: "支払い時間",
    money: "金額",
    type: "お支払い方法",
    state: "状態",
    alipay: "アリペイ",
    wechat: "ウェチャット",
    paid: "支払済",
    non_payment: "未払い",
    paytype: {
      "0": "ゲートウェイ",
      "1": "ショートカット",
      "2": "アリペイ",
      "3": "ウェチャット",
      "4": "京東",
      "5": "WAP",
      "6": "銀聯スキャンコード",
      "7": "振替送金",
      "22": "コールドウォレット",
    }
  },
  transfer: {
    transfer: "送金",
    conversion: "変換",
    trans_out_num: "転出金額",
    trans_in_account: "振込アカウント",
    transferErrInfo: {
      success: "振込み完了",
      account: "送金アカウントを入力してください",
      money: "正しい数を入力してください",
      sure: "送金を確認しますか？",
      paypass: "取引パスワードを入力してください"
    }
  },
  send_feedback: {
    feedback_info: "フィードバック",
    title: "タイトル",
    content: "内容",
    screenshots: "添付画像",
    sendErrInfo: {
      success: "送信しました",
      title: "タイトルを入力してください",
      content: "内容を入力してください"
    }
  },
  withdraw: {
    withdraw_money: "出金金額",
    sel_bank: "銀行カードを選択します。",
    sel_bit: "通貨の種類",
    cash: "現金",
    tips_tit: "出金説明",
    tips1: "アカウント出金は最低100ドルから",
    tips2: "出金はゴールドフローチャネルの取り扱い手数料の5％が発生します。世界の銀行ゲートウェイおよび支払いチャネルによって徴収されます。",
    tips3: "出金申請は提出後の三営業日以内に入金します。",
    bankType: {
      type1: "香港銀行カード",
      type2: "中国内陸銀行カード",
      type3: "その他の国/地域の銀行カード",
    },

    withdrawalErrInfo: {
      success: "現金引き出し申請完了",
    },
  },
  withdraw_list: {
    time: "申請時間",
    bankType: "引き出しタイプ",
    bankName: "通貨の種類",
    withdrawMoney: "金額",
    auditTime: "審査時間",
    reason: "説明",
    withdrawStatus: "状態",
    payType: {
      "1": "Eウォレット",
      "2": "現金財布",
      "3": "登録ウォレット",
    },
    status: {
      "1": "申請を出します",
      "3": "申請却下",
      "6": "現金引き出し完了",
    }
  },
  lower_list: {
    input_username: "ユーザIDを入力してください。",
    search: "検索",
    upper: "上位",
    now: "現在",
    lower: "下位",
    username: "ユーザー名",
    user_id: "ユーザーID",
    my_product: "所有パッケージ",
    member_level: "会員レベル",
    person_performance: "個人の業績",
    team_performance: "チームの業績",
    referral_num: "推奨人数",
    team_num: "チーム人数",
    no_data: "データがありません。"
  },
  bank_card: {
    card_manage: "銀行カード管理",
    add_card: "銀行カードを追加します。",
    setBankErr: {
      delSuccess: "銀行カード解除成功",
      delSure: "銀行カードを解除してもよろしいですか？"
    }
  },
  bank_card_edit: {
    sel_card: "銀行カードの種類を選択",
    china_card: "中国本土銀行カード",
    other_card: "その他の国/地域の銀行カード",
    card_info: "銀行カード情報",
    get_bank: "銀行のフルネーム",
    bank_num: "銀行カード番号",
    card_person: "銀行口座名義人",
    id_num: "ID番号",
    phone: "銀行登録携帯番号",
    bank_swift: "銀行SWIFT",
    country: "国",
    get_money: "取得した金額",
    get_num: "取得数",
    setBankErr: {
      addSuccess: "追加成功",
      editSuccess: "編集成功"
    }
  },
  idcard_upload: {
    card_just: "書類の表面",
    card_back: "書類の裏面",
    now_card_just: "現在の書類の表面",
    now_card_back: "現在の書類の裏面",
    bank_just: "銀行カードの表",
    bank_back: "銀行カードの裏",
    now_bank_just: "現在の銀行カードの表",
    now_bank_back: "現在の銀行カードの裏",
    change: "変更",
    uploadErr: {
      selIMG: "お先に画像を選択してください!",
      isIMG: "画像フォーマットのみアップロードできます!",
      isLt2M: "アップロード画像のサイズは15 MBを超えてはいけません!"
    }
  },
  admin_home: {
    input_username: "ユーザー名を入力してください",
    search: "検索します",
    inventoryList: {
      total1: "過去の合計入金金額",
      total2: "先月の合計入金金額",
      total3: "今月の合計入金金額",
      total4: "過去の合計出金金額",
      total5: "先月の合計出金金額",
      total6: "今月の合計出金金額",
      total7: "過去の合計登録人数",
      total8: "先月の合計登録人数",
      total9: "今月の合計登録人数",
      diy_total1: "カスタムサイクルの合計入金金額",
      diy_total2: "カスタムサイクルの合計出金金額",
      diy_total3: "カスタムサイクルの合計登録人数",
    }
  },
  withdraw_history: {
    order_no: "注文番号",
    time: "申請時間",
    user_id: "ID",
    real_name: "本名",
    real_bank_phone: "携帯番号",
    bank_name: "銀行名",
    withdraw_money: "出金金額"
  },
  recharge_history: {
    order_no: "注文番号",
    other_order: "第3者注文書番号",
    creat_time: "チャージ時間",
    username: "ユーザー名",
    user_id: "ID",
    usd: "金額",
    state: "状態",
    text1: '本当にコールバックしますか？',
  },
  asset_info: {
    backupper: "前に戻ります",
    username: "ユーザー名",
    creatTime: "登録時間",
    total_assets: "総資産",
    gole_assets: "総入金",
    out_of_gole: "総出金",
    profit_assets: "総所得",
    mer_name: "ユーザーが所有するパッケージ",
    handle: "操作",
    look_lower: "下位を見ます",
    asset_list: {
      total1: "総資産",
      total2: "総入金",
      total3: "総出金",
      total4: "総所得"
    },
    inventoryList: {
      diy_total1: "カスタムサイクル合計入金金額"
    }
  },
  withdraw_audit: {
    order_no: "注文番号",
    time: "申請時間",
    user_id: "ID",
    real_name: "本名",
    real_bank_phone: "携帯番号",
    bank_name: "銀行名",
    withdraw_money: "出金金額",
    withdraw_status: "状態",
    handle: "操作",
    through: "通过",
    rejected: "却下します",
    restore: "回復",
    reason: "理由",
    reason1: "中国語の理由",
    reason2: "英語の理由",
    status: {
      submit: "出金申請",
      rejected: "出金却下",
      submit_suc: "出金成功",
    },
    auditErrInfo: {
      through: "通过成功",
      rejected: "却下成功",
      restore: "回復成功",
      handle: "作業が成功する"
    },
    text1: '続けますか？',
    pass: 'ロット通過',
    select: '先に選んでください',
  },
  admin_feedback: {
    enterPhone: '携帯番号を登録する',
    no_reply: "未応答",
    replied: "返信済み",
    username: "フィードバックユーザー",
    user_id: "ユーザーID",
    content_create_time: "レビュー日付",
    content_reply_time: "返信時間",
    title: "レビュータイトル",
    content: "フィードバック内容",
    screenshots: "フィードバックのスクリーンショット",
    reply_content: "返信内容",
    reply_list: "返信リスト",
    reply: "返信",
    look: "表示",
    replyErrInfo: {
      success: "返信完了",
      replyContent: "返信内容を記入してください。"
    },
    email: 'メールアドレス',
    changeEmail: '修改邮箱',
    oldEmail: 'メールアドレスを変更',
    newEmail: '新しいメールアドレス',
    phone: '携帯の番号',
    changePhone: '修改手机号',
    oldPhone: '携帯の番号を修正します',
    newPhone: '新しい携帯番号',
    grade: 'レベル',
    changeGrade: 'レベルを変更',
    gradeName: '元のレベル',
    gradeId: 'レベルID',
    selectGrade: 'レベルを選択',
    selectGrade_reg: 'レベルを選択してください',
    reset_grade: 'レベルをリセット',
    reset_success: 'リセット成功',
    ladder: 'オルダーノ',
    changeLadder: 'ユーザーの上下を修正する',
    oldLadderID: '上位ID',
    ladderID: '新規上位ID',
    ladderID_reg: '新しい上位IDを入力してください',
  },
  member_list: {
    username: "ユーザー名",
    user_id: "ユーザーID",
    create_time: "登録時間",
    name: "名前",
    english_name: "英語名前",
    mobile: "携帯番号",
    email: "メールアドレス",
    status: {
      0: "未承認",
      1: "審査を待つ",
      2: "審査が通る"
    },
    delete: '削除しました',
    noDelete: '削除されていません',
  },
  active: {
    act1: {
      title: "2018 祝日取引時間調整公告",
      coontent: "<p>尊敬するお客様：</p><p>佳節を前に，当社は事前に全世界のお客様と仲間にお知らせします。クリスマスや年末年始には、各金融センターの営業時間は閉市と開市時間の調整がありますので、ご注意ください。</p><br><p>下の表には2018年12月25日から2019年1月2日まで、クリスマスと元旦の期間の取引スケジュールの調整状況が記載されています。</p><br><table style='width:100%;'><tr><th>日付</th><th>市場取引時間</th></tr><tr><td>2018.12.25</td><td>取引停止</td></tr><tr><td>2018.12.26</td><td>通常時間取引</td></tr><tr><td>2018.12.27</td><td>通常時間取引</td></tr><tr><td>2019.01.01</td><td>取引停止</td></tr><tr><td>2019.01.02</td><td>通常時間取引</td></tr><tr><td>2019.01.03</td><td>通常時間取引</td></tr></table><br><p>ご質問がある場合は、弊社のオンラインカスタマーサービスにご連絡いただくか、info@ibmcapital.coにメールを送ってください。</p><br><p><b>IBM Capital</b>ここで皆様のクリスマスと元旦の楽しみを祈ります！</p><br><br><br><p class='right'>IBM Capitalマネジメント 敬具</p><p class='right'>2018年 12月24日</p>"
    }
  },
  notice_list: {
    title: "タイトル",
    body: "内容",
    createTime: "作成時間",
    language: "言語",
    edit: "編集",
    sort: "並べ替え",
    add: 'お知らせを追加',
    del: "削除"
  },
  notice_detail: {
    title: "タイトル",
    content: "内容",
    language: "言語",
    sort: "並べ替え",
    editErrInfo: {
      language: "言語を選んでください",
      sort: "優先順位を記入してください",
      title: "タイトルを記入してください",
      content: "内容を記入してください",
      changeSuc: "変更完了",
      addSuc: "追加完了",
      delSuc: "削除完了",
      sureDel: "削除を確認しますか？"
    }
  },
  product_report: {
    order_no: "注文番号",
    money: "今回の費用",
    user_id: "ユーザーid",
    username: "ユーザー名",
    new_money: "購入後の所有パッケージ金額",
    mat_name: "パッケージ名",
    bay_time: "購入時間",
    state: {
      1: "購入",
      2: "アップグレード"
    },
  },
  news_report: {
    add: "追加",
    title: "タイトル",
    url: "リンク",
    img: "プレビュー図"
  },
  unusual_audit: {
    text1: 'MT4異常リスト',
    text2: 'MT4異常詳細',
    text3: 'MT4異常編集',
    text4: '未処理',
    text5: '処理済み',
    text6: '処理しない',
    text7: 'ユーザID',
    text8: '時間',
    text9: 'MT4アカウント',
    text10: 'MT4 ID',
    text11: '金額',
    text12: 'タイプ',
    text13: '状態',
    type1: '登録する',
    type2: '登録金',
    type3: 'アップグレードセット',
    type4: 'MT4提現',
    type5: 'MT4解約',
    status1: '未処理',
    status2: '処理済み',
    status3: '処理しない',
    text14: '処理が成功した',
  },
  other: {
    text1: '認証コードの取得方法',
    text2: '携帯電話',
    text3: '現在のメールボックス',
    text4: '1500文字を超えてはいけません。',
    text5: 'より低いリスト',
    text6: 'おすすめリスト会員の表示が追加されました。',
    text7: 'オープンタイプ',
    text8: 'オープン時間',
    text9: '永久に開く',
    text10: '永久に開放されていません',
    text11: '現在オープンしています',
    text12: 'まだ開いていません',
    text13: '一日咲きます',
    text14: '指定開放時間',
    text15: 'オープン時間を入力してください。',
    text16: 'オープン状態',
    text17: '状態を変更',
    text18: '日付時間を選択',
    text21: 'カテゴリ',
    text22: '注文に異常がありましたら、改めて申請してください。',
  }
};
export default jp;