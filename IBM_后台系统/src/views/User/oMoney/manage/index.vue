<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 账户出金 -->
      <div class="item_title">{{ $t('user.withdraw') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <!-- 币种类型 -->
          <el-row class="paylist1">
            <el-col
              v-for="item in currencyList"
              :key="item.type"
              class="col-item"
              :span="24"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="8"
              :xl="6"
            >
              <div class="aItem" :class="item.type" @click="currency=item.type">
                <div class="right_icon" :class="currency==item.type?'active':''"></div>
                <p>{{ item.name }}</p>
                <p>${{ item.money|FORMATTED_NUMBER }}</p>
              </div>
            </el-col>
          </el-row>
          <!-- 表单 -->
          <div class="pay_form_box">
            <el-form
              :model="ruleForm"
              ref="ruleForm"
              :label-position="screenSize == 1?'left':'top'"
              label-width="1.6rem"
              class="item_form"
            >
              <!-- 提现金额（USD） -->
              <el-form-item :label="$t('withdraw.withdraw_money')+'（USD）'">
                <el-input-number
                  :min="0"
                  v-model="ruleForm.money"
                  :placeholder="$t('withdraw.withdraw_money')"
                ></el-input-number>
              </el-form-item>
              <!-- 提币类型 -->
              <el-form-item :label="$t('withdraw.sel_bit')">
                <!-- 请选择 -->
                <el-select
                  v-model="ruleForm.receiptType"
                  @change="fnGetMoney"
                  :placeholder="$t('select.placeholder')"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 获得的金额 -->
              <el-form-item :label="$t('bank_card_edit.get_money')">
                <div>{{ coinNum }} {{ ruleForm.receiptType == 1?'BTC':ruleForm.receiptType == 2?'ETH':'USDT' }}</div>
              </el-form-item>
              <!-- 获取验证码方式 -->
              <el-form-item :label="$t('other.text1')">
                <el-radio-group v-model="sendCodeType">
                  <el-radio :label="1">{{ $t('other.text2') }}</el-radio>
                  <el-radio :label="2">{{ $t('register.email') }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 当前手机号 -->
              <el-form-item
                :label="sendCodeType == 1?$t('phone_manage.now_manage'):$t('other.text3')"
              >
                <div>{{ sendCodeType == 1?user.mobile:curEmail }}</div>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item :label="$t('transaction_pass.code')" prop="strCode">
                <el-input :placeholder="$t('transaction_pass.code')" v-model="ruleForm.strCode">
                  <template slot="append">
                    <GetCode
                      :apiUrl="sendCodeType == 1?'IBM_UTILS_MOBILECODE':'IBM_UTILS_SENDMAILCODE'"
                      :mobile="user.mobile"
                    ></GetCode>
                  </template>
                </el-input>
              </el-form-item>
              <!-- 提交 -->
              <el-form-item label>
                <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                >{{ $t('login.forget_btn') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 提示语 -->
          <div class="alertText">
            <!-- 出金说明 -->
            <p>{{ $t('withdraw.tips_tit') }}</p>
            <!--  账户出金要求最低100美元起； -->
            <p>1. {{ $t('withdraw.tips1') }}</p>
            <!-- 出金需在周一至周五进行提交申请，到账时间T+3。 -->
            <p>2. {{ $t('withdraw.tips3') }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
import GetCode from "@/components/GetCode";
import MyValidate from "@/mixins/myValidate.js";
import floatNumber from "@/utils/floatNumber.js";
import comData from "@/utils/data.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "oMoney_manage",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  components: {
    GetCode
  },
  inject: ["$main"],
  data() {
    return {
      sendCodeType: 1, // 1 手机号 2邮箱
      curEmail: "", // 当前邮箱
      exchangeRate: "",
      rate: "",
      user: {
        mobile: "" // 手机号码
      },
      ruleForm: {
        money: "", // 提现金额
        strCode: "", // 验证码
        receiptType: 1
      },
      rules: {
        // 请输入验证码
        strCode: [
          {
            required: true,
            message: "transaction_pass.resetPassErrInfo.beforeCode",
            trigger: "blur"
          }
        ]
      },
      options: [
        {
          value: 1,
          label: "BTC"
        },
        {
          value: 2,
          label: "ETH"
        },
        {
          value: 3,
          label: "USDT"
        }
      ],
      currencyList: [
        /* 
        {
          type: "cp",
          name: this.$t('wallet.cash'), // 现金钱包
          money: ""
        },
        {
          type: "ap",
          name: this.$t('wallet.ele'), // 电子钱包
          money: ""
        },
        {
          type: "rp",
          name: this.$t('wallet.reg'), // 注册钱包
          money: ""
        } */
      ],
      currency: "cp",
      rate: "", // 汇率
      uuid: "",
      AP: 0,
      dpt: 0.95,
      dpt_code: "" // 31就要算
    };
  },
  computed: {
    coinNum: function() {
      let num = floatNumber.multiply(this.ruleForm.money, 1 / this.rate, 4);
      if (this.dpt_code == 31) {
        num = floatNumber.multiply(num, 0.95, 4);
      }
      return num;
    }
  },
  mounted: function() {
    let vm = this;
    if (comData.os_type == 2) {
      vm.currencyList = [
        {
          type: "cp",
          name: this.$t("wallet.cash"), // 现金钱包
          money: ""
        }
      ];
    } else {
      vm.currencyList = [
        {
          type: "cp",
          name: this.$t("wallet.cash"), // 现金钱包
          money: ""
        },
        {
          type: "ap",
          name: this.$t("wallet.ele"), // 电子钱包
          money: ""
        }
      ];
    }
    vm.fnGetDpt();
    vm.fnInit();
    vm.fnExchangeRate();
  },
  methods: {
    // 获取...
    fnGetDpt() {
      let vm = this;
      vm.$api.IBM_USER_DEPT().then(res => {
        console.log(res);
        vm.dpt_code = res.data;
      });
    },
    // 计算汇率
    fnGetMoney() {
      let vm = this;
      let rateName =
        vm.ruleForm.receiptType == 1
          ? "BTCUSD"
          : vm.ruleForm.receiptType == 2
          ? "ETHUSD"
          : "USDT";
      vm.exchangeRate.forEach((item, index) => {
        if (rateName == "USDT") {
          vm.rate = 1;
        } else {
          if (item.symbol == rateName) {
            vm.rate = item.price;
          }
        }
      });
    },
    // 获取汇率
    fnExchangeRate() {
      let vm = this;
      vm.$api
        .EXRATE_PAIR_NUMF_15()
        .then(res => {
          vm.exchangeRate = res;
        })
        .then(() => {
          vm.fnGetMoney();
        });
    },
    fnInit() {
      let vm = this;
      // 获取用户信息
      vm.$main.loading = true;
      vm.fnGetNewInfo().then(res => {
        vm.$main.loading = false;
        vm.curEmail = res.email;
        vm.user.mobile = res.mobile;
        for (var i = 0, item; (item = vm.currencyList[i++]); ) {
          item.money = res[item.type];
        }
      });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          /* params = Object.assign({},vm.ruleForm,{
              type: vm.currency == 'cp'?1:vm.currency == 'ap'?2:3
            }) */
          params = {
            money: vm.ruleForm.money,
            bankId: "",
            type: vm.currency == "ap" ? 1 : vm.currency == "cp" ? 2 : 3,
            getGoldType:
              vm.ruleForm.receiptType == 1
                ? 11
                : vm.ruleForm.receiptType == 2
                ? 12
                : 13,
            strCode: vm.ruleForm.strCode
          };
          vm.$main.loading = true;
          vm.$api.IBM_WITHDRAW_GETGOLD(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("withdraw.withdrawalErrInfo.success"),
                "success"
              );
              vm.$router.push(comData.conutry_type + "/user/home");
            } else {
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
            }
          });
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.paylist1 {
  .col-item {
    padding: 0.12rem;
    .aItem {
      color: #fff;
      height: 1.84rem;
      margin: 0 auto;
      border-radius: 0.15rem;
      background: linear-gradient(
        216deg,
        rgba(49, 36, 130, 1) 0%,
        rgba(79, 70, 131, 1) 100%
      );
      cursor: pointer;
      .right_icon {
        width: 0.25rem;
        height: 0.2rem;
        position: absolute;
        right: 0.1rem;
        top: 50%;
        transform: translateY(-50%);
        background: url("../../../../image/golden_icon1.png");
        display: none;
      }
      position: relative;
      @media screen and (max-width: 748px) {
        width: auto;
      }
    }
    .aItem p:nth-of-type(1) {
      padding-top: 0.53rem;
      font-size: 0.24rem;
      font-weight: 500;
      padding-left: 0.4rem;
    }
    .aItem p:nth-of-type(2) {
      font-size: 0.36rem;
      padding-top: 0.23rem;
      font-weight: bold;
      padding-left: 0.4rem;
    }
    .cp {
      background: linear-gradient(
        216deg,
        rgba(49, 36, 130, 1) 0%,
        rgba(79, 70, 131, 1) 100%
      );
      .active {
        display: block;
      }
    }
    .ap {
      background: linear-gradient(
        216deg,
        rgba(49, 36, 130, 1) 0%,
        rgba(79, 70, 131, 1) 100%
      );
      .active {
        display: block;
      }
    }
    .rp {
      background: linear-gradient(
        216deg,
        rgba(49, 36, 130, 1) 0%,
        rgba(79, 70, 131, 1) 100%
      );
      .active {
        display: block;
      }
    }
  }
}
.pay_form_box {
  margin-top: 0.5rem;
}
.alertText {
  font-size: 0.14rem;
  font-weight: 400;
  line-height: 0.36rem;
}
</style>
