<template>
  <transition name="fade">
    <div style="overflow: hidden;" class="account_email">
      <!-- 修改邮箱 -->
      <div class="item_title">{{ $t('admin_feedback.changeEmail') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <el-form
            :model="ruleForm"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.6rem"
            class="demo-ruleForm item_form"
          >
            <!-- 原邮箱 -->
            <el-form-item :label="$t('admin_feedback.oldEmail')">
              <div>{{ email }}</div>
            </el-form-item>
            <!-- 新邮箱 -->
            <el-form-item :label="$t('admin_feedback.newEmail')" prop="email">
              <el-input :placeholder="$t('admin_feedback.newEmail')" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <!-- 获取验证码方式 -->
            <el-form-item :label="$t('other.text1')">
              <el-radio-group v-model="sendCodeType">
                <el-radio :label="1">{{ $t('other.text2') }}</el-radio>
                <el-radio :label="2">{{ $t('register.email') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item :label="$t('transaction_pass.code')" prop="code">
              <el-input :placeholder="$t('transaction_pass.code')" v-model="ruleForm.code">
                <template slot="append">
                  <GetCode
                    :apiUrl="sendCodeType == 1?'IBM_UTILS_MOBILECODE':'IBM_UTILS_SENDMAILCODE'"
                    :mobile="ruleForm.mobile"
                  ></GetCode>
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
import comData from "@/utils/data.js";
import GetCode from "@/components/GetCode";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "account_email",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    return {
      sendCodeType: 1, // 1 手机号 2邮箱
      email: "",
      mobile: "",
      ruleForm: {
        email: "", // 新邮箱
        code: "", // 验证码
      },
      rules: {
        email: [
          {
            required: true,
            message: "register.regErrInfo.email",
            trigger: "blur"
          }
        ], // 请输入邮箱
        code: [
          {
            required: true,
            message: "transaction_pass.resetPassErrInfo.beforeCode",
            trigger: "blur"
          }
        ], // 请先输入验证码
      },
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
        vm.mobile = res.mobile;
        vm.email = res.email;
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
          params = {
            email: vm.ruleForm.email,
            phoneCord: vm.ruleForm.code,
          };
          vm.fnPassAgain()
            .then(code => {
              if (code == 0) {
                vm.$api.IBM_USER_UPDATEUSER(params).then(res => {
                  vm.$main.loading = false;
                  if (res.code == 0) {
                    vm.fnOpenMessageBox(
                      vm.$t("personal_profile.setUserInfoErr.success"),
                      "success"
                    ); // 修改成功
                    vm.$router.push(comData.conutry_type + "/user/home");
                  } else {
                    vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
                  }
                });
              }
            })
            .catch(err => {});
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    }
  }
};
</script>
<style lang="scss">
.account_email {
  .reset_select {
    width: 0.9rem;
  }
}
</style>
