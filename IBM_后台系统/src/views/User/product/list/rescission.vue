<template>
  <div class="item_list_box">
    <el-form
      :model="ruleForm"
      :label-position="screenSize == 1?'left':'top'"
      ref="ruleForm"
      label-width="1.6rem"
      class="demo-ruleForm item_form Product_upgrade"
    >
      <!-- 配套名 -->
      <el-form-item :label="$t('product_setting.mat_name')">
        <div>{{ p.item.matName }}</div>
      </el-form-item>
      <!-- 配套金额 -->
      <el-form-item :label="$t('product_setting.mat_money')">
        <div>{{ p.item.money|FORMATTED_NUMBER }}</div>
      </el-form-item>
      <!-- MT4账户 -->
      <el-form-item :label="$t('product_setting.mt4_account')">
        <div>{{ p.item.mt4User }}</div>
      </el-form-item>
      <!-- MT4密码 -->
      <el-form-item :label="$t('product_setting.mt4_pass')">
        <div>{{ p.item.password }}</div>
      </el-form-item>
      <!-- 获取验证码方式 -->
      <el-form-item :label="$t('other.text1')">
        <el-radio-group v-model="sendCodeType">
          <el-radio :label="1">{{ $t('other.text2') }}</el-radio>
          <el-radio :label="2">{{ $t('register.email') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 当前手机号 -->
      <el-form-item :label="sendCodeType == 1?$t('phone_manage.now_manage'):$t('other.text3')">
        <div>{{ sendCodeType == 1?user.mobile:curEmail }}</div>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item :label="$t('transaction_pass.code')">
        <el-input :placeholder="$t('transaction_pass.code')" v-model="ruleForm.phoneCord">
          <template slot="append">
            <GetCode :apiUrl="sendCodeType == 1?'IBM_UTILS_MOBILECODE':'IBM_UTILS_SENDMAILCODE'" :mobile="user.mobile"></GetCode>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <!-- 返回 -->
        <el-button @click="p.pageType = 'list'">{{ $t('system_container.back') }}</el-button>
        <!-- 提交 -->
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('common.submit') }}</el-button>
      </el-form-item>
    </el-form>
    <div class="bank_tips">
      <!-- 注意事项 -->
      <h5>{{ $t('product_setting.tips_tit') }}</h5>
      <!-- 配套出金需在周一至周五提交申请，本公司将在交易日结束后的周末为您结算MT4余额，以及审核通过您的申请及调整您可提现的MT4金额。 -->
      <p>1. {{ $t('product_setting.tips1') }}</p>
    </div>
  </div>
</template>
<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
import GetCode from "@/components/GetCode";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "Producr_rescission", // 配套解约
  mixins: [WatchScreen, GetUserInfo, MessageBox],
  inject: ["p", "$main"],
  components: {
    GetCode
  },
  data() {
    return {
      sendCodeType: 1, // 1 手机号 2邮箱
      curEmail: "", // 当前邮箱
      user: {
        mobile: "" // 手机号
      },
      ruleForm: {
        mt4Id: this.p.item.id,
        phoneCord: ""
      }
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnInit();
  },
  methods: {
    fnInit() {
      let vm = this;
      // 获取基本信息
      vm.$main.loading = true;
      vm.fnGetNewInfo().then(res => {
        vm.$main.loading = false;
        vm.user.mobile = res.mobile;
        vm.curEmail = res.email;
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
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, vm.ruleForm);
          vm.fnPassAgain()
            .then(code => {
              if (code == 0) {
                vm.$api.IBM_MAT_GETMT4(params).then(res => {
                  vm.$main.loading = false;
                  if (res.code == 0) {
                    let num = 7;
                    vm.fnOpenMessageBox(
                      vm.$t(`product_setting.destroy_status.${num}`),
                      "success"
                    );
                    vm.p.pageType = "list";
                  } else {
                    vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
                  }
                });
              }
            })
            .catch(err => []);
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.bank_tips {
  font-size: 0.14rem;
  line-height: 0.25rem;
  p {
    font-size: 0.12rem;
  }
}
</style>
