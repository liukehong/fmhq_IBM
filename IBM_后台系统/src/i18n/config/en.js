const en = {
    el: {
        colorpicker: {
            confirm: 'Confirm',
            clear: 'Clear'
        },
        datepicker: {
            now: 'Now',
            today: 'Today',
            cancel: 'Cancel',
            clear: 'Clear',
            confirm: 'Confirm',
            selectDate: 'Option Date',
            selectTime: 'Option Time',
            startDate: 'From date',
            startTime: 'Start Time',
            endDate: 'Date',
            endTime: 'End Time ',
            prevYear: 'Previous Year',
            nextYear: 'Next Year',
            prevMonth: 'Last Month',
            nextMonth: 'Next Year',
            year: 'Year',
            month1: 'January',
            month2: 'February',
            month3: 'March',
            month4: 'April',
            month5: 'May',
            month6: 'June',
            month7: 'July',
            month8: 'August',
            month9: 'September',
            month10: 'October',
            month11: 'November',
            month12: 'December',
            // week: '周次',
            weeks: {
                sun: 'Sun',
                mon: 'Mon',
                tue: 'Tue',
                wed: 'Wed',
                thu: 'Thu',
                fri: 'Fri',
                sat: 'Sat'
            },
            months: {
                jan: 'Jan',
                feb: 'Feb',
                mar: 'Mar',
                apr: 'Apr',
                may: 'May',
                jun: 'Jun',
                jul: 'Jul',
                aug: 'Aug',
                sep: 'Sept',
                oct: 'Oct',
                nov: 'Nov',
                dec: 'Dec'
            }
        },
        select: {
            loading: 'Loading',
            noMatch: 'No Matching Data',
            noData: 'No Data',
            placeholder: 'Please Select'
        },
        cascader: {
            noMatch: 'No Matching Data',
            loading: 'Loading',
            placeholder: 'Please Select'
        },
        pagination: {
            goto: 'Left',
            pagesize: 'Title/Page',
            total: 'Total',
            pageClassifier: 'Page',
            total1: 'Total：',
            total2: '',
        },
        messagebox: {
            title: 'Prompt',
            confirm: 'Confirm',
            cancel: 'Cancel',
            error: 'Error!'
        },
        upload: {
            deleteTip: 'Press The Delete Key To Eliminate',

            delete: 'Delete',
            preview: 'Check Photo',
            continue: 'Continue To Upload'
        },
        table: {
            emptyText: 'No Data',
            confirmFilter: 'Screening',
            resetFilter: 'Reset',
            clearFilter: 'All',
            sumText: 'Total'
        },
        tree: {
            emptyText: 'No Data'
        },
        transfer: {
            noMatch: 'No MaTching Data',
            noData: 'No Data',
            titles: ['List 1', 'List 2'],
            filterPlaceholder: 'Please Enter The Search Content',
            noCheckedFormat: ' {total} ',
            hasCheckedFormat: ' {checked}/{total} Selected'
        }
    },
    editor: {
        text1: 'Font Size',
        text2: 'Typeface',
        text3: 'Song Style',
        text4: 'Microsoft YaHei',
        text5: 'Link Text',
        text6: 'Link',
        text7: 'Insert',
        text8: 'Set List',
        text9: 'Ordered List',
        text10: 'Unordered List',
        text11: 'Align Type',
        text12: 'Left',
        text13: 'Center',
        text14: 'Right',
        text15: 'Insert Table',
        text16: 'Create',
        text17: 'Line',
        text18: 'Column of tables',
        text19: 'Insert Code',
    },
    errCode: {
        "0": "Request Access Succeeded",
        /**
         * 请重新登录
         */
        "200": "Please Login Again",
        /**
         * 账号已被锁定,请联系管理员
         */
        "1002": "The Account Has Been Locked, Please Contact The Administrator",
        /**
         * 货币不对
         */
        "20001": "Currency Wrong",
        /**
         * 生成订单失败
         */
        "20002": "Failed To Generate Order",
        /**
         * 验证码错误
         */
        "1003": "Wrong Verification Code",
        /**
         * 用户名最少需要6位
         */
        "2001": "The Username Requires At Least 6 Digits",
        /**
         * 密码最少需要6位 
         */
        "2002": "The Password Needs At Least 6 Digits",
        /**
         * "手机号最少需要6位"
         */
        "2003": "The Mobile Number Requires At Least 6 Digits",

        "2004": "The ID Number Requires At Least 6 Digits",

        "2005": "The Name Needs At Least 2 Digits",

        "2006": "The English Name Needs At Least 3 Digits",

        "2007": "The Username Already Exists",

        "2008": "Email Registered",

        "2009": "Mobile Number Registered",

        "2010": "Incorrect Password",

        "2011": "Incorrect Email Format",

        "2012": "Incorrect Mobile Number Format",

        "2013": "Please Get The Mobile Verification Code Again",

        "2014": "The Username Has Been Registered",

        "2015": "Account Balance Is Insufficient, Please Recharge!",

        "2016": "The Superior User Does Not Exist",

        "8000": "Insufficient Balance In RP Wallet",

        "8001": "Insufficient Withdrawal Amount",

        "8002": "Insufficient Balance In E-Wallet",

        "8003": "Insufficient Balance In CP Wallet",

        "8004": "Maximum E-wallet Amount Can Be Used Is Equivalent To 50% Of Package Amount",

        "8005": "The Input Amount Does Not Match The Package Price",

        "8006": "Be Unable To Purchase Current Package",

        "8007": "The Minimum Withdrawal Is $100",

        "8008": "The Withdrawal Amount Must Be A Multiple Of $100",

        "8009": " RP Wallet Can't Be Withdrawn",

        "8010": "Insufficient Balance In MT4 Wallet",

        "8011": "MT4 Data Exception",

        "8012": "User Does Not Exist",

        "8013": "The Amount Of MT4 Available For Withdrawal Is Insufficient",

        "8014": "The Payment Channel Is Being Maintained",

        "8015": "The Username Does Not Match The Mobile Number",
        /**
         * 账号或密码错误
         */
        "1001": "Wrong Username Or Password",

        "8016": "Personal Information Is Locked!If You Need To Change, Please Authenticate By Your Mobile At First",

        "8017": "E-mail Verification Code Error",

        "8018": "Arguments Exception",

        "8019": "The Mobile Number Does Not Match The Current User",
        "8020": "Please Re-enter The Secondary Password",
        "8021": "Please Enter The Correct Secondary Password",
        "8022": "The Username Does Not Exist",

        "8023": "Please Enter The Bankcard Number",
        "8024": "Please Enter The Correct Bankcard Number",
        "8025": "The Bankcard Has Been Bound",

        "8026": "Invalid ID",
        "8027": "Bankcard Information Is Incomplete",
        "8028": "The Information Is Incorrect, Please Enter Again",
        "8029": "You Cannot Transfer Money To Yourself",
        "8030": "Do Not Enter A Negative Number",
        "8031": "Amount Not Entered",
        "8032": "MT4 Connection Exception",

        "8033": "Please Enter The Correct User ID",
        "8034": "You Can Only Transfer Money To Your Superiors And Affiliatess",
        "8035": "Cold Wallet Was Not Set",
        "8036": "Subordinate Account Does Not Exist",
        "8037": "The Message Has Been Replied",
        "8038": "Application For Withdrawal Can Only Be Submitted During Weekends",
        "8039": "Real Name Filling In Wrong",
        "8040": "It's Not An Open Experience",
        "8041": "One Id Number Can Only Register One User",
        "8042": "Digital Currency Wallet Addresses Can Only Be Added And Cannot Be Modified",
        "8043": "This Package Is Locked And No Upgrade Is Allowed",
        "8044": "The Current Contract Cannot Be Terminated",
        "8045": "Please Submit Your Application During Working Days",
        "8046": "Error Uploading Information. Please Try Again",
        "8047": "The Order Has Been Recalled",
        "8048": "Please Complete Your Personal Details For Account Verification Purpose.",
        "8049": "Please Insert Amount",
        "8050": "Please Insert Withdrawal Amount",
        "8051": "User ID cannot contain spacebar",
        /**
         * 数据库中已存在该记录
         */
        "9001": "This Record Already Exists In The Database",
        /**
         * 没有权限，请联系管理员授权
         */
        "9002": "You Don't Have Permission, Please Contact The Administrator",

        "10001": "Mail Has Been Sent Successfully, Please Go To Your Mailbox To Activate",
        "19999": "MT4 Is Losing Money Recently, The Amount That Can Be Withdrawn To CP Wallet is:",

        "500": "Network Delay, Please Refresh",
        "7948": "Request Failed, Please Try Again",
        "5555": "Unknown Error",
        "9999": "Network Delay, Please Refresh",
    },
    login: {
        login: "Login",
        admin_login: "Admin Login",
        lang: "Language",
        sel_lang: "Please Select Language",
        username: "Username",

        userId: "User ID",
        pass: "Password",
        code: "Verification Code",
        phone: "Mobile Number",
        please_referral_id: "Please Enter The ID Of Your Referral",
        to_reg: "Go To Register",
        loginErrInfo: {
            username: "Please Enter The Username",
            password: "Please Enter The Password"
        },
        forgetErrInfo: {
            phone: "Please Enter The Mobile Number",
            codesend: "The Verification Code Was Sent Successfully",
            success: "Password Is Changed"
        },
        login_btn: "Login",
        forget_btn: "Submit",
        forgetpass: "Forgot Password?",
        officialweb: "Back To Web",
        backlogin: "Return To Login"
    },
    register: {
        register: "Registration",
        lang: "Language",
        sel_lang: "Please Select Language",
        username: "Username",
        pass: "Password",
        cfmpass: "Confirm Password",
        code: "Verification Code",
        phone: "Mobile Number",
        englishName: "English Name",
        name: "Name In IC/Passport",
        id_card: "ID",
        passport: "Passport",
        email: "Email",
        regErrInfo: {
            username: "Please Enter Username",
            password: "Please Enter Password",
            cfmpass: "Password Does Not Match",
            invite_code: "The Invitation Code Is Incorrect",
            phone: "Please Fill In Your Mobile Number",
            name: "Please Fill In Your Name In IC/Passport",
            englishName: "Please Fill In Your English Name",
            id_card: "Please Fill In Your ID Information",
            email: "Please Fill In Your Email Address",
            success: "Register Successfully",
            sendsuc: "The Verification Code Was Sent Successfully"
        },
        forgetErrInfo: {
            phone: "Please Enter Your Mobile Number",
            codesend: "The Verification Code Was Sent Successfully",
            success: "The Password Is Changed"
        },
        reg_btn: "Register",
        backlogin: "Return To Login",
        nextStep: "Next Step",
        preStep: "Last Step"
    },
    user: {
        home: "My Homepage",
        my_account: "Manage Account",
        personal_profile: "Personal Information",
        change_info: "Edit User Information",
        pass_manage: "Change Account Password",
        transaction_pass: "Setup Secondary Password ",
        asset_allocation: "MT4 Assets Management",
        asset_transfer: "Wallet Transfer",
        phone_manage: "Update Mobile Number",
        opt2_phone_manage: "Update Login Mobile Number",
        report: "Wallet Details",
        cash_wallet: "CP Wallet",
        e_wallet: "E-wallet",
        reg_wallet: "RP Wallet",
        mt4_wallet: "MT4 Profit Wallet",
        reg_menu: "Register",
        new_members: "Sign Up For New Member",
        invite_reg: " Invite Members",
        recharge_menu: "Deposit",
        recharge: "Deposit Funds",
        recharge_list: "Deposit Records",
        withdraw_menu: "Withdrawal",
        withdraw: "Account Withdrawal",
        withdraw_list: "Withdrawal Records",
        product_manage: "Purchase Package",
        product_input: "Purchase Package",
        buy_suc: "Purchase Succeeded",
        product_chart: "Historical Trading Returns",
        product_rule: "Contract Agreement",
        lower_list: "Member List",
        send_feedback: "Send Feedback",
        bank_card: "Bankcard Management",
        idcard_upload: "Upload The Identity Documents",
        bank_card_upload: "Upload Your Bankcard Information",
        feedback: "Feedback",
        feedback_list: "Feedback List",
        bit_address: "Digital Wallet",
        product_info: "Packages",
        product_setting: "Package List",
        destroy_record: "Package terminated record",
        product_out: "MT4 Withdrawal",
        product_upgrade: "Upgrade Package",
        news_list: "News Information",
        product_destroy: "Package Withdrawal",
    },
    admin: {
        admin_home: "Homepage",
        withdraw_history: "Withdrawal Records",
        recharge_history: "Deposit Records",
        asset_info: "Member Asset Information",
        net_fund: "Member Total Deposits",
        withdraw_audit: "Withdrawal Audit",
        admin_transfer: "Wallet Transfer",
        member_list: "Member List",
        member_info: "Member Information",
        admin_feedback: "Feedback Information",
        wallet_report: "Member Wallet Details",
        notice_list: "Notice List",
        notice_detail: "Notice Details",
        product_report: "Purchase Record",
        news_report: "News Information",
        news_detail: "News Details",
        destroy_audit: "MT4 Withdrawal List",
        unusual_audit: "MT4 Exception List"
    },
    system_container: {
        server_time: "Server Date And Time",
        bulletin: "Notice",
        logout: "Logout",
        back: "Back",
        admin: "Administrator",
        tips: "Tips",
        ok: "Confirm",
        no: "Cancel",
        hello: "Hello",
        please_two_pass: "Please Enter Your Secondary Password"
    },
    common: {
        submit: "Submit",
        username: "Username Or ID",
        user_id: "Please Enter User ID",
        nomsg: "No Data",
        search: "Search",
        copy: {
            copy: "Copy",
            yes: "Copy success",
            no: "Duplication Defeat"
        },
        trade_pass: "Transaction Password",
        time: {
            day: "Day",
            hours: "Hour",
            minutes: "Minute",
            seconds: "Second"
        }
    },
    table: {
        date: "Date",
        number: "Quantity",
        type: "Type",
        describe: "Describe",
        status: "Status",
        handle: "Handle",
        to: "To"
    },
    wallet: {
        mt4: "MT4 Profit Wallet",
        reg: "RP Wallet",
        ele: "E-wallet",
        cash: "CP Wallet"
    },
    home: {
        wallet: "Wallet",
        asset_handle: "Funds Operation",
        recharge: "Top-Up",
        withdraw: "Withdrawal",
        person_asset: "Personal Assets",
        trading_strategy: "Trading Strategy",
        monthly_returns: "Expected Monthly Return",
        my_product: "Hold Package",
        acc_earnings: "Accumulated Credit",
        last_date: "Last Login Time",
        user_info: "User Info",
        congratulations: "Congratulations! You have attained the status of",
        returns_detailed: "Detailed Returns",
        member: "Personal Data ",
        username: "Username",
        total: "Total Performance",
        create_time: "Creation Time ",
        look_rule: "Contract Agreement",
        price: "Amount",
        chart1: "MT4 Withdrawal Details",
        chart2: "E-Wallet Details"
    },
    personal_profile: {
        username: "Username",
        personalInfo: "Personal Information",
        baseInfo: 'Basic Information',
        identityInfo: 'Identity Information',
        walletInfo: 'Wallet Information',
        name: "Name In IC/Passport",
        englishName: "English Name",
        cardType: "ID Type",
        cardNum: "ID Number",
        mobile: "Mobile Number",
        sex: "Gender",
        male: "Male",
        female: "Female",
        countries: "Country",
        provinces: "Province",
        city: "City",
        area: "District/County",
        address: "Address",
        btc_addr: "BTC Address",
        eth_addr: "ETH Address",
        usdt_addr: "USDT Address",
        id_card: "ID",
        passport: "Passport",
        demo_mt4_user: "Investors Account",
        demo_mt4_password: "Investors Password",
        mt4_user: "MT4 Account Number",
        mt4_password: "MT4 Password",
        sure_btn: "Final Confirmation",
        login_user: "Login To Member System",
        change_addr: "Change Address",
        audit: "Audit",
        bit_tit: "Note",
        bit_tips1: "After	submitting	the	wallet	address,	no	amendment	can	be	done	on	yourself.	Please	contact	customer	service	support	(Feedback)	if	there	is	any	amendment	needed.",
        setUserInfoErr: {
            cardNum: "Please Fill In The ID Number",
            success: "Modify Successfully",
            suresuc: "Confirmation Successful"
        }
    },
    pass_manage: {
        change_pass: "Change Password",
        old_pass: "Original Password",
        new_pass: "New Password",
        cfm_new_pass: "Confirm New Password",
        changePassErrInfo: {
            success: "Modified Successfully",
            old_pass: "The Original Password Cannot Be Empty",
            new_pass: "The New Password Cannot Be Empty",
            newpasswordCFW: "Password Does Not Match"
        }
    },
    transaction_pass: {
        reset_pass: "Set Up Secondary Password",
        now_phone: "Current Mobile Number",
        code: "Verification Code",
        get: "Get",
        new_pass: "New Password",
        cfm_new_pass: "Confirm New Password",
        new_sec_pass: "New Secondary Password ",
        cfm_sec_pass: "Confirm New Secondary Password",
        resetPassErrInfo: {
            success: "Secondary Password Has Been Setup Successfully",
            userPass: "Please Enter Your Password",
            beforeCode: "Please Enter The Verification Code",
            getCodeOk: "The Verification Code Was Sent Successfully",
            newpasswordCFW: "Secondary Password Does Not Match"
        }
    },
    phone_manage: {
        phone_manage: "Manage Mobile Number",
        now_manage: "Current Mobile Number",
        change_phone: "Change Mobile Number",
        user_pass: "Password",
        code: "Verification Code",
        get: "Get",
        setPhoneErr: {
            getCodeErr: "Please Fill In Your Mobile Number",
            userPass: "Please Fill In Your Password",
            beforeCode: "Please Fill In The Verification Code",
            beforeCode1: "Please Fill In The Graphic Verification Code",
            getCodeOk: "The Verification Code Was Sent Successfully",
            success: "Modified Successfully",
        }
    },
    asset_allocation: {
        asset_manage: "Assets Management",
        transfer_out: "Transfer From",
        transfer_in: "To",
        transfer_money: "Transfer Amount",
        mt4put: "MT4 Realised Profits",
        refresh: "Refresh MT4 Profit Wallet",
        warm_prompt: "Note:",
        tips1: "Transfers between accounts cannot be executed during trading hours from Monday to Friday ; Please make transfers only on the weekend.",
        allocationErrInfo: {
            transfer_money: "Please Enter The Amount",
            success: "Transfer Successfully",
            refreshsuc: "Refresh Success"
        },
        text1: 'Insufficient Balance In E-Wallet',
        text2: 'Insufficient Balance In CP Wallet',
        text3: 'Insufficient Balance In RP Wallet',
    },
    asset_transfer: {
        asset_transfer: "Wallet Transfer",
        trans_in_user: "Transfer To ID",
        trans_in_name: "Transfer To Username",
        query: "Query",
        transfer_money: "Transfer Amount",
        describe_cn: "Note In Chinese",
        describe_en: "Note In English",
    },
    wallet_details: {
        mt4_details: "MT4 Profit Wallet",
        cash_details: "CP Wallet",
        ele_details: "E-wallet",
        reg_details: "RP Wallet",
        order_no: "Order Number",
        change_amount: "Credit/Debit",
        into_money: "Credit",
        out_money: "Debit",
        old_amount: "Original Amount",
        new_amount: "Balance",
        user_id: "User ID",
        username: "Username",
        mt4_id: "MT4 ID",
        reson: "Remarks",
        handleType: {
            "1": "Deposit",
            "2": "Buy / Upgrade Package",
            "3": "Independent Transaction",
            "4": "Withdrawal",
            "5": "Pips Bonus",
            "6": "Level Bonus",
            "7": "Referal Bonus",
            "8": "Profit Sharing",
            "9": "Trading Profit",
            "10": "MT4 Profit Wallet",
            "11": "Receive",
            "12": "Expenditure",
            "13": "MT4 Wallet Withdrawal",
            "14": "Registration",
        }
    },

    new_members: {
        new_members: "Register As A New Member",
        account: "Username",
        pass: "Password",
        cfmpass: "Confirm Password",
        phone: "Mobile Number",
        email: "Email",
        product: "Select Package",
        name: "Name In IC/Passport",
        englishName: "English Name",
        sex: "Gender",
        male: "Male",
        female: "Female",
        cardtype: "Type Of ID",
        id_card: "ID",
        passport: "Passport",
        idNo: "ID Number",
        reg: "Register",
        regErr: {
            success: "Registration Successful",
            product: {
                selOn: 'Please Select Package'
            },
            password: "Password Does Not Match",
            realpass: "Please Enter Your Password",
            payRealpass: "Please Enter Your Transaction Password"
        }
    },
    invite_reg: {
        invite_reg: "Invitation To Register",
        invite_link: "Click The Invite Link Or Scan The Qr Code To Register",
        referral_id: "ID Referrer"
    },
    product_manage: {
        look_profit: "View Historical Returns",
        month_profit: "Expected Monthly Returns",
        select: "Select",
        upgrade: "Upgrade",
        active: "Upgraded",
        sel_product: "Select Package",
        input_num: "Please Select The Purchase Quantity",
        buy_btn: "Purchase Now",
        introduce: {
            junior: "Trial account - specifically set up the live account for $100、$200、$300, in order to enable more customers to experience IBM's AI trading system！",
            basic: "Utilising a large sample size to perform linear extrapolation and analysis, AI Basic provides investors with easy and quick execution. Designed for customers with little or no investing experience.",
            pro: "The AI Pro expands the scopes of markets and can concurrently execute multiple strategies at high frequencies. Designed for investors with some investing experience.",
            genius: "Enhanced version of AI Pro that is able to learn and evolve independently, thereby providing more consistent and higher returns. The AI Genius is designed for experienced investors seeking higher returns yet adopting a defensive strategy."
        }
    },
    product_input: {
        buy_product: "Purchase Package",
        sel_product: "Package Selected",
        need_pay: "Payment Amount (USD)",
        read_agree: "I have read and accepted",
        read1: "《Risk Disclosure Statement》",
        sure_pay: "Confirm Payment Amount (USD)",
        setProductErrInfo: {
            buySuccess: "Purchase Succeeded",
            paypass: "Please Enter The Secondary Password",
            money: "Entered Amount Does Not Match",
            cp1: "CP Can’t Be Empty",
            cp2: "The Balance Of CP Wallet Must Be More Than 50% Of The Total Amount",
            rp: "RPcan’t Be Empty",
        }
    },
    product_setting: {
        buy_time: "Purchase Time",
        date: "Time	Of	Application",
        id: "ID",
        mat_name: "Package Name",
        mat_money: "Package Amount",
        mt4_account: "MT4 Account",
        mt4_pass: "MT4 Password",
        mt4_wallet: "MT4 Profit",
        mt4_money: "MT4 Amount",
        mt4_out: "MT4 Amount Withdrawn",
        monthly_returns: "Expected Monthly Return",
        refresh: "Refresh",
        withdraw: "Withdrawal",
        upgrade: "Upgrade",
        read: "Contract",
        destroy: "Terminate",
        status: "Status",
        lock: "Lock",
        destroy_status: {
            1: "Apply",
            3: "Rejected",
            6: "Successful",
            7: "Package Terminate Successfully",
        },
        normal: "Normal",
        tips_tit: "Note：",
        tips1: "Request to terminate package can be made from Monday to Friday, company will calculate your MT4 balance amount, evaluate your request and adjust your amount withdrawable from MT4 during non-trading days, which is weekends.",
        handleErrInfo: {
            refresh: "Success",
            withdraw: "Success",
            destroy: "Success"
        },
        text1: 'Please Insert Withdrawal Amount',
    },
    product_out: {
        use_money: "Amount Available For Withdrawal",
        sel_money: "Withdrawal Amount",
        tips1: "Monday to Friday are trading days. During trading days, MT4 profit cannot be withdrawn. Please submit withdrawal during weekends."
    },
    product_upgrade: {
        now_product: "Current Package",
        sel_product: "Upgrade Package",
        pay_money: "Payment Amount",
        setProductErrInfo: {
            success: "Upgraded Succesfully"
        }
    },
    buy_suc: {
        buy: "Buy",
        success: "Success",
        buy_pack_suc: "Package Purchase Successful",
        buy_success: "Purchase Successful",
        pay_money: " Amount Paid",
        demo_user_tips: "In order to allow you to manage your account more clearly, we provide you with a demonstration account for your reference",
        demo_user_account: "MT4 Account Number",
        demo_user_password: "MT4 Password"
    },
    product_rule: {
        verifyUserErr: {
            infoErr: "Please Complete Your Personal Details ",
            daySure: "The Final Confirmation Of Personal Information Is Still Left",
            submit: "for Account Verification Purpose.",
            reason: "Reasons For Rejection:",
            productErr: "Please Buy The Package"
        }
    },
    recharge: {
        text1: 'Please Select Type Of Cryptocurrency',
        payment: "Payment Mode",
        input_num: "Select Amount",
        buy_num: 'Purchase Quantity',
        real_num: "Purchase Quantity",
        now_usd_rate: "Current Exchange Rate",
        buy_btn: "Submit",
        need_pay: "Amount ",
        tips_tit: "Note：",
        tips1: "As alipay is a third-party payment platform in mainland china, all the amounts are denominated in RMB as the base currency. Therefore, When it is converted into us dollars, RMB shall be calculated in tens of integers and the average exchange rate of the day of HSBC shall be adopted. You can choose different dollar amount to recharge the corresponding RMB amount.",
        tips2: "A 3% channel fee is applicable on all deposits and charged on top of the deposit amount.",
        tips3: "Please complete your transaction within 2 minutes,each QR code can only be used once; If the QR code timeouts, please refresh to get another unique QR code.",
        tips4: "If the QR code timeouts, please refresh to get another unique QR code.",
        pay_addr: "Send the specified number to the address below",
        submit_suc: "Submit Successfully",
        order_no: "Order Number",
        pay_transfer: "You can transfer directly to the company account",
        company: "Company",
        account: "Account",
        bank_name: "Name of beneficiary's bank",
        Intermediary: "Intermediary Bank",
        alias: "Alias",
        order_tips: "Note: Please enter the order number in the reference column when transferring money",
        payErrInfo: {
            selpayNone: "The payment method is temporarily unavailable",
            ap: "Please fill in the purchase quantity correctly",
            money: "Please fill in the purchase amount"
        },
        payList: {
            alipay: "Alipay",
            btc: "BTC",
            eth: "ETH",
            // usdt: "USDT"
            usdt: "Tether"
        }
    },
    recharge_list: {
        orderNo: "Order Number",
        creatTime: "Deposit Time",
        okTime: "Payment Time",
        money: "Amount",
        type: "Payment Mode",
        state: "Status",
        alipay: "Alipay",
        wechat: "Wechat",
        paid: "Paid",
        non_payment: "Non-Payment ",
        paytype: {
            "0": "Gateway",
            "1": "Quick",
            "2": "Alipay",
            "3": "WeChat",
            "4": "JD",
            "5": "WAP",
            "6": "UnionPay Scan Code",
            "7": "Transfer Remittances",
            "22": "Cold Wallet",
        }
    },
    transfer: {
        transfer: "Transfer",
        conversion: "Switch",
        trans_out_num: "Transfer Amount",
        trans_in_account: "Recipient Account Number",
        transferErrInfo: {
            success: "Transfer Is Successful",
            account: "Please Enter The Transfer Account",
            money: "Please Enter The Amount Transferred",
            sure: "Confirm The Transfer?",
            paypass: "Please Enter Transaction Password?"
        }
    },
    send_feedback: {
        feedback_info: "Feedback Information",
        title: "Title",
        content: "Content",
        screenshots: "Screenshot",
        sendErrInfo: {
            success: "Submit Successfully",
            title: "The Title Cannot Be Empty",
            content: "Content Cannot Be Empty"
        }
    },
    withdraw: {
        withdraw_money: "Withdrawal Amount",
        sel_bank: "Bankcard",
        sel_bit: "Withdrawal Type",
        cash: "Cash",
        tips_tit: "Note：",
        tips1: "Minimum withdrawal amount is US$100.",
        tips2: "5% of the channel fee is payable for withdrawal.It will be collected by global bank gateways and payment channels;",
        tips3: "Requested withdrawal amount will be received within 3 working days after submitting application.",
        bankType: {
            type1: "Hongkong Bankcard",
            type2: "Bankcard In Mainland China",
            type3: "Bankcard From Other Countries/Regions",
        },

        withdrawalErrInfo: {
            success: "The Withdrawal Application Was Submitted Successfully",
        },
    },
    withdraw_list: {
        time: "Time Of Application",
        bankType: "Withdrawal Type",
        bankName: "Coin Type",
        withdrawMoney: "Amount",
        auditTime: "Time Of Verification",
        reason: "Description",
        withdrawStatus: "Status",
        payType: {
            "1": "E-Wallet",
            "2": "CP Wallet",
            "3": "Principal",
        },
        status: {
            "1": "Submit Applications ",
            "3": "Application Rejected",
            "6": "Withdrawal Successful",
        }
    },
    lower_list: {
        input_username: "Please Enter User ID",
        search: "Search",
        upper: "Superior",
        now: "Current",
        lower: "Affiliates",
        username: "Username",
        user_id: "User ID",
        my_product: "My Package",
        member_level: "Member Level",
        person_performance: "Individual Performance ",
        team_performance: "Team Performance",
        referral_num: "Direct Member",
        team_num: "Group Member",
        no_data: "No Data"
    },
    bank_card: {
        card_manage: "Bankcard Management",
        add_card: "Add A Bankcard",
        setBankErr: {
            delSuccess: "Unlink Success",
            delSure: "Are You Sure You Want To Unlink Your Bankcard?"
        }
    },
    bank_card_edit: {
        sel_card: "Select The Card Type",
        china_card: "Bankcard In Mainland China",
        other_card: "Bankcard From Other Countries/Regions",
        card_info: "Bankcard Information",
        get_bank: "Full Name Of Bank",
        bank_num: "Bankcard Number",
        card_person: "Bank Account Holder",
        id_num: "ID Number",
        phone: "Reserve Mobile Mobile Number",
        bank_swift: "Bank SWIFT",
        country: "Country",
        get_money: "Amount Received",
        get_num: "Quantity Obtained",
        setBankErr: {
            addSuccess: "Successfully Added",
            editSuccess: "Edit Success"
        }
    },
    idcard_upload: {
        card_just: "ID's Frontside",
        card_back: "ID's Backside",
        now_card_just: "Front Side Of Current ID Card",
        now_card_back: "Reverse Side Of Current ID Card",
        bank_just: "Front Side Of Bankcard",
        bank_back: "Reverse Side Of Bankcard",
        now_bank_just: "Front Side Of Current Bankcard",
        now_bank_back: "Reverse Side Of Current Bankcard",
        change: "Modify",
        uploadErr: {
            selIMG: "Please Select A Picture!",
            isIMG: "Can Only Upload... Image Format!",
            isLt2M: "Upload Image Size Cannot Exceed 15MB!"
        }
    },
    admin_home: {
        input_username: "Please Enter Username",
        search: "Search",
        inventoryList: {
            total1: "Total Recharge",
            total2: "Total Recharge On Last Month",
            total3: "Total Recharge On This Month",
            total4: "Total Withdrawal",
            total5: "Total Withdrawal On Last Month",
            total6: "Total Withdrawal On This Month",
            diy_total1: "Custom Cycle For Total Recharge",
            diy_total2: "Custom Cycle For Total Withdrawal"
        }
    },
    withdraw_history: {
        order_no: "Order Number",
        time: "Time Of Application",
        user_id: "ID",
        real_name: "Name In IC/Passport",
        real_bank_phone: "Mobile Mobile Number",
        bank_name: "Bank Name",
        withdraw_money: "Withdrawal Amount"
    },
    recharge_history: {
        order_no: "Order Number",
        other_order: "Third Party Order Number",
        creat_time: "Deposit Time",
        username: "Username",
        usd: "Amount",
        state: "Status",
        text1: 'Are You Sure You Want To Call Back?',
        audit: 'Callback'
    },
    asset_info: {
        backupper: "Return To Last Page",
        username: "Username",
        creatTime: "Registration Time",
        total_assets: "Total Assets",
        gole_assets: "Total Deposits",
        out_of_gole: "Total Withdrawals",
        profit_assets: "Total Credits",
        mer_name: "Your Package",
        handle: "Operation",
        look_lower: "Look Over Affiliates",
        asset_list: {
            total1: "Total Assets",
            total2: "Total Deposits",
            total3: "Total Withdrawal",
            total4: "Total Credits"
        },
        inventoryList: {
            diy_total1: "Custom Cycle For Total Recharge"
        }
    },
    withdraw_audit: {
        order_no: "Order Number",
        time: "Time Of Application",
        user_id: "ID",
        real_name: "Name In IC/Passport",
        real_bank_phone: "Mobile Mobile Number",
        bank_name: "Bank Name",
        withdraw_money: "Withdrawal Amount",
        withdraw_status: "Status",
        handle: "Operation",
        through: "Pass",
        rejected: "Rejected",
        restore: "Recover",
        reason: "Reason",
        reason1: "Chinese Reason",
        reason2: "English Reason",
        status: {
            submit: "Withdrawal Applications",
            rejected: "Withdrawal Rejected",
            submit_suc: "Withdrawal Success",
        },
        auditErrInfo: {
            through: "Successfully Pass",
            rejected: "Successfully Reject",
            restore: "Successfully Recover",
            handle: "Successfully Operate"
        },
        text1: 'Do You Want To Continue?',
        pass: 'Batch Pass',
        select: 'Please choose item!',
    },
    admin_feedback: {
        enterPhone: 'Login Mobile',
        no_reply: "No Reply",
        replied: "Replied",
        username: "Feedback User",
        user_id: "User ID",
        content_create_time: "Feedback Time",
        content_reply_time: "Reply Time",
        title: "Feedback Title",
        content: "Feedback Content",
        screenshots: "Feedback Screenshots",
        reply_content: "Reply Content",
        reply_list: "Reply List",
        reply: "Reply",
        look: "View",
        replyErrInfo: {
            success: "Successful Reply",
            replyContent: "Please Fill In The Reply"
        },
        email: ' Email',
        changeEmail: 'Change Email',
        oldEmail: 'Old Email',
        newEmail: 'New Email',
        phone: 'Mobile',
        changePhone: 'Change Mobile',
        oldPhone: 'Old Mobile',
        newPhone: 'New Mobile',
        grade: 'Grade',
        changeGrade: 'Change Grade',
        gradeName: 'Old Grade',
        gradeId: 'Grade ID',
        selectGrade: 'Select Grade',
        selectGrade_reg: 'Please Select Grade！',
        reset_grade: 'Reset Grade',
        reset_success: 'Reset Success',
        ladder: 'Ladder',
        changeLadder: 'Change User Ladder',
        oldLadderID: 'Superior ID',
        ladderID: 'New Superior ID',
        ladderID_reg: 'Please Enter New Superior ID',
    },
    member_list: {
        username: "Username",
        user_id: "ID",
        create_time: "Registration Time",
        name: "Name In IC/Passport",
        english_name: "English Name",
        mobile: "Mobile Number",
        email: "Email",
        status: {
            0: "Rejected",
            1: "Pending For Verification",
            2: "Approved"
        },
        delete: 'Deleted',
        noDelete: 'Not deleted',
    },
    active: {
        act1: {
            title: "Holiday Notice",
            coontent: '<p>Dear Members:</p><p>Please Be Noted The Following Holiday Arrangements For Christmas And New Year Celebration. </p><p>25th December,2018-3rd January,2019,Wu Have Adjusted The Trading Time Like Below:</p><br><table style="width:100%;"><tr><th>Date</th><th>Trading Time</th></tr><tr><td>25/12/2018</td><td>Closed</td></tr><tr><td>26/12/2018</td><td>Normal</td></tr><tr><td>27/12/2018</td><td>Normal</td></tr><tr><td>01/01/2019</td><td>Closed</td></tr><tr><td>02/01/2019</td><td>Normal</td></tr><tr><td>03/01/2019</td><td>Normal</td></tr></table><br><p>If You Have Any Enquriy Don’t Hesitate To Contact With Our Online Customer Service, Or Send An Email To info@ibmcapital.co.</p><br><p>Merry Christmas & Happy New Year!</p><br><p>Best Regards!</p><br><br><p class="right">IBM Capital Management</p><p class="right">25/12/2018</p>'
        }
    },
    notice_list: {
        title: "Title",
        body: "Content",
        createTime: "Creation Time",
        language: "Language",
        edit: "Edit",
        sort: "Sort",
        add: 'Add Notice',
        del: "Delete"
    },
    notice_detail: {
        title: "Title",
        content: "Content",
        language: "Language",
        sort: "Sort",
        editErrInfo: {
            language: "Please Select The Language",
            sort: "Please Fill In The Order",
            title: "Please Fill In The Title",
            content: "Please fill In The Content",
            changeSuc: "Modify The Success",
            addSuc: "Successfully Add",
            delSuc: "Successfully Delete",
            sureDel: "Confirm Delete?"
        }
    },
    product_report: {
        order_no: "Order Number",
        money: "Cost Amount",
        user_id: "User ID",
        username: "Username",
        new_money: "Supporting Amount",
        mat_name: "Supporting Name",
        bay_time: "Purchase Time",
        state: {
            1: "Buy",
            2: "Upgrade"
        },
    },
    news_report: {
        add: "Add",
        title: "Title",
        url: "Link",
        img: "Preview"
    },
    unusual_audit: {
        text1: 'MT4 Exception List',
        text2: 'MT4 Exception Details',
        text3: 'MT4 Exception Editing',
        text4: 'Untreated',
        text5: 'Processed',
        text6: 'No disposal',
        text7: 'User ID',
        text8: 'Time',
        text9: 'MT4 Account',
        text10: 'MT4ID',
        text11: 'Money',
        text12: 'Type',
        text13: 'Status',
        type1: 'Register',
        type2: 'Registration Fee',
        type3: 'Upgrading Matching',
        type4: 'MT4 Cash Withdrawal',
        type5: 'MT4 Deregulation',
        status1: 'Untreated',
        status2: 'Processed',
        status3: 'No disposal',
        text14: 'Handling Success',
    },
    other: {
        text1: 'Get Verification Code Mode',
        text2: 'SMS',
        text3: 'Current Email',
    }
};
export default en;