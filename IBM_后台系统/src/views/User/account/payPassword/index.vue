<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 设置二级密码 -->
      <div class="item_title">{{ $t('user.transaction_pass') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <el-form
            :model="ruleForm"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.8rem"
            class="demo-ruleForm item_form"
          >
            <!-- 新二级密码 -->
            <el-form-item :label="$t('transaction_pass.new_sec_pass')" prop="password">
              <el-input
                type="password"
                :placeholder="$t('transaction_pass.new_sec_pass')"
                v-model="ruleForm.password"
              ></el-input>
            </el-form-item>
            <!-- 确认新二级密码 -->
            <el-form-item :label="$t('transaction_pass.cfm_sec_pass')" prop="newPassword2">
              <el-input
                type="password"
                :placeholder="$t('transaction_pass.cfm_sec_pass')"
                v-model="ruleForm.newPassword2"
              ></el-input>
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
              <div>{{ sendCodeType == 1?ruleForm.mobile:curEmail }}</div>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item :label="$t('transaction_pass.code')" prop="code">
              <el-input :placeholder="$t('transaction_pass.code')" v-model="ruleForm.code">
                <template slot="append">
                  <!-- <GetCode apiUrl="IBM_UTILS_SENDMOBILECODE" :mobile="ruleForm.mobile"></GetCode> -->
                  <GetCode :apiUrl="sendCodeType == 1?'IBM_UTILS_MOBILECODE':'IBM_UTILS_SENDMAILCODE'" :mobile="ruleForm.mobile"></GetCode>
                </template>
              </el-input>
            </el-form-item>
            <!-- 提交 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('login.forget_btn') }}</el-button>
            </el-form-item>
          </el-form>
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
import MessageBox from "@/mixins/messageBox.js";
import comData from "@/utils/data.js";
export default {
  name: "account_payPassword",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("transaction_pass.resetPassErrInfo.newpasswordCFW")); // 两次密码输入不一致
      } else if (value !== this.ruleForm.password) {
        callback(new Error("transaction_pass.resetPassErrInfo.newpasswordCFW")); // 两次密码输入不一致
      } else {
        callback();
      }
    };
    return {
      sendCodeType: 1, // 1 手机号 2邮箱
      curEmail: "", // 当前邮箱
      ruleForm: {
        password: "", // 新密码
        newPassword2: "", // 再次确认密码
        code: "", // 手机验证码
        mobile: "" // 手机号码
      },
      rules: {
        password: [
          {
            required: true,
            message: "transaction_pass.resetPassErrInfo.userPass",
            trigger: "blur"
          } // 请先输入账号密码
        ],
        code: [
          {
            required: true,
            message: "transaction_pass.resetPassErrInfo.beforeCode",
            trigger: "blur"
          } // 请先输入验证码
        ],
        newPassword2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  components: {
    GetCode
  },
  created: function() {
    let vm = this;
    vm.fnInit();
  },
  methods: {
    // 页面初始化
    fnInit() {
      let vm = this;
      vm.$main.loading = true;
      vm.fnGetNewInfo().then(res => {
        vm.$main.loading = false;
        vm.ruleForm.mobile = res.mobile;
        vm.curEmail = res.email;
      });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          let params = Object.assign({}, vm.ruleForm);
          delete params.newPassword2;
          vm.$main.loading = true;
          vm.$api.IBM_USER_UPDATESECPASSWORD(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("transaction_pass.resetPassErrInfo.success"),
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

<style lang="scss">
</style>
