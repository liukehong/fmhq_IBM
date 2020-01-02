<template>
  <transition name="fade">
    <div class="admin_transfer" style="overflow: hidden;">
      <!-- 财务转账 -->
      <div class="item_title">{{ $t('asset_transfer.asset_transfer') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <!-- 币种类型 -->
          <el-row class="paylist1">
            <el-col
              v-for="item in walletTypeList"
              :key="item.type"
              class="col-item"
              :span="24"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="8"
              :xl="8"
            >
              <div class="aItem" :class="item.type" @click="walletType = item.type">
                <div class="right_icon" :class="walletType==item.type?'active':''"></div>
                <p>{{ item.name }}</p>
                <p>${{ item.money|FORMATTED_NUMBER }}</p>
              </div>
            </el-col>
          </el-row>
          <!-- 表单 -->
          <div class="pay_form_box">
            <el-form
              :model="ruleForm"
              :label-position="screenSize == 1?'left':'top'"
              ref="ruleForm"
              label-width="1.6rem"
              class="demo-ruleForm item_form"
            >
              <!-- 转入账号ID -->
              <el-form-item :label="$t('asset_transfer.trans_in_user')">
                <el-input
                  :placeholder="$t('asset_transfer.trans_in_user')"
                  v-model="ruleForm.user_id"
                ></el-input>
              </el-form-item>
              <!-- 转入用户名 -->
              <el-form-item :label="$t('asset_transfer.trans_in_name')">
                <span v-show="toUserName" style="padding-right: 10px;">{{ toUserName }}</span>
                <!-- 查询 -->
                <el-button @click="fnFinduserName">{{ $t('asset_transfer.query') }}</el-button>
              </el-form-item>
              <!-- 转账金额 -->
              <el-form-item :label="$t('asset_transfer.transfer_money')" prop="money">
                <el-input-number
                  v-model="ruleForm.money"
                  :label="$t('asset_transfer.transfer_money')"
                ></el-input-number>
              </el-form-item>
              <!-- 中文备注 -->
              <el-form-item :label="$t('asset_transfer.describe_cn')">
                <el-input
                  :placeholder="$t('asset_transfer.describe_cn')"
                  v-model="ruleForm.translate"
                ></el-input>
              </el-form-item>
              <!-- 英文备注 -->
              <el-form-item :label="$t('asset_transfer.describe_en')">
                <el-input
                  :placeholder="$t('asset_transfer.describe_en')"
                  v-model="ruleForm.translateEnglish"
                ></el-input>
              </el-form-item>
              <!-- 获取验证码方式 -->
              <el-form-item :label="$t('other.text1')" v-if="dept == 11">
                <el-radio-group v-model="sendCodeType">
                  <el-radio :label="1">{{ $t('other.text2') }}</el-radio>
                  <el-radio :label="2">{{ $t('register.email') }}</el-radio>
                </el-radio-group>
              </el-form-item>

              <!-- 验证码 -->
              <el-form-item :label="$t('transaction_pass.code')" v-if="dept == 11">
                <el-input :placeholder="$t('transaction_pass.code')" v-model="phoneCord">
                  <template slot="append">
                    <GetCode
                      apiUrl="IBM_UTILS_GETSECURITYCODE"
                      :mobile="phone"
                      :codeType1="sendCodeType"
                    ></GetCode>
                  </template>
                </el-input>
              </el-form-item>

              <el-form-item>
                <!-- 提交 -->
                <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('common.submit') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
import comData from "@/utils/data.js";
import GetCode from "@/components/GetCode1";
export default {
  name: "admin_transfer",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    return {
      dept: '',
      phone: '',
      sendCodeType: 1,
      phoneCord: '',
      walletType: "rp",
      user: {
        mobile: "" // 手机号
      },
      toUserName: "",
      ruleForm: {
        user_id: "", //转账人id
        money: "", // 转账金额
        translate: "", // 中文备注
        translateEnglish: "" // 英文备注
      },
      rules: {
        money: [
          // 请输入转账金额
          {
            type: "number",
            required: true,
            message: "asset_allocation.allocationErrInfo.transfer_money",
            trigger: "blur"
          }
        ]
      },
      walletTypeList: [
        // 注册钱包
        {
          type: "rp",
          name: this.$t("wallet.reg"),
          money: ""
        },
        // 现金钱包
        {
          type: "cp",
          name: this.$t("wallet.cash"),
          money: ""
        },
        // 电子钱包
        {
          type: "ap",
          name: this.$t("wallet.ele"),
          money: ""
        }
      ]
    };
  },
  components: {
    GetCode
  },
  computed: {},
  created: function() {
    let vm = this;
    vm.fnGetNewInfo().then(res => {
      console.log(res, 2233);
      vm.phone = res.mobile;
      vm.dept = res.deptId;
      console.log(vm.dept)
    });
    vm.fnInit();
  },
  methods: {
    // 根据id查询用户名
    fnFinduserName() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api
        .IBM_USER_USERNAMECOMPLETION({
          str: vm.ruleForm.user_id
        })
        .then(res => {
          vm.$main.loading = false;
          if (res.code == 0) {
            vm.toUserName = res.data.username;
          } else {
            vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
          }
        });
    },
    // 初始化
    fnInit() {
      let vm = this;
      // 查询钱包信息
      vm.$main.loading = true;
      vm.$api.IBM_MAT_ASSETS().then(res => {
        vm.$main.loading = false;
        if (res.code == 0) {
          for (var i = 0, item; (item = vm.walletTypeList[i++]); ) {
            item.money = res.data[item.type];
          }
        }
      });
    },
    // 二级密码验证
    fnPassAgain() {
      let vm = this;
      return new Promise(function(resolve, reject) {
        vm.$prompt(
          vm.$t("system_container.please_two_pass"),
          vm.$t("system_container.tips"),
          {
            confirmButtonText: vm.$t("system_container.ok"), // 确定
            cancelButtonText: vm.$t("system_container.no"), // 取消
            inputType: "password",
            center: true,
            confirmButtonClass: "newClass",
            inputPlaceholder: vm.$t("system_container.please_two_pass"),
            showCancelButton: false
          }
        )
          .then(({ value }) => {
            vm.$main.loading = true;
            // 驳回
            vm.$api
              .IBM_UTILS_SECURITYPASSWORD({
                securityPassword: value
              })
              .then(res => {
                if (res.code == 0) {
                  // 表单提交
                  resolve(res.code);
                } else {
                  vm.$main.loading = false;
                  vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
                  reject(res.code);
                }
              });
          })
          .catch(() => {});
      });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          // 金额为0时，不能进行提交
          // 注册钱包  rp  现金钱包 cp  电子钱包 ap
          if (vm.ruleForm.money > 0) {
          } else if (vm.ruleForm.money == 0) {
            if (vm.walletType == "cp") {
              vm.fnOpenMessageBox(vm.$t("asset_allocation.text3"), "error");
            } else if (vm.walletType == "rp") {
              vm.fnOpenMessageBox(vm.$t("asset_allocation.text1"), "error");
            } else {
              vm.fnOpenMessageBox(vm.$t("asset_allocation.text2"), "error");
            }
            return false;
          } else {
          }
          vm.fnPassAgain()
            .then(code => {
              if (code == 0) {
                params = Object.assign({}, vm.ruleForm, {
                  type:
                    vm.walletType == "cp" ? 1 : vm.walletType == "ap" ? 2 : 3
                });
                if(vm.dept == 11){
                  params.security_code = vm.phoneCord;
                }
                vm.$api.IBM_ADMIN_TRANSFER(params).then(res => {
                  vm.$main.loading = false;
                  if (res.code == 0) {
                    vm.fnOpenMessageBox(
                      vm.$t("asset_allocation.allocationErrInfo.success"),
                      "success"
                    );
                    // vm.$router.push(comData.conutry_type + "/admin/admin_home");
                    vm.$router.push(
                      comData.conutry_type + "/HORKVIACYBHWPQXK/admin_home"
                    );
                    vm.fnInit();
                  } else {
                    vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
                  }
                });
              }
            })
            .catch(err => []);
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.admin_transfer {
  .paylist1 {
    .col-item {
      padding: 0.12rem;
      .aItem {
        color: #fff;
        background-size: cover;
        background-repeat: no-repeat;
        height: 1.84rem;
        margin: 0 auto;
        border-radius: 0.15rem;
        cursor: pointer;
        .right_icon {
          width: 0.25rem;
          height: 0.2rem;
          position: absolute;
          right: 0.1rem;
          top: 50%;
          transform: translateY(-50%);
          background: url("../../../image/golden_icon1.png");
          background-size: contain;
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
      .rp {
        background-image: url("../../../image/transfer_image1.png");
        .active {
          display: block;
        }
      }
      .cp {
        background-image: url("../../../image/transfer_image2.png");
        .active {
          display: block;
        }
      }
      .ap {
        background-image: url("../../../image/transfer_image2.png");
        .active {
          display: block;
        }
      }
    }
  }
}
</style>
