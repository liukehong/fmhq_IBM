<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 修改账号密码 -->
      <div class="item_title">{{ $t('user.pass_manage') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <!-- 旧密码 -->
          <el-form
            :model="ruleForm"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.6rem"
            class="demo-ruleForm item_form"
          >
            <el-form-item :label="$t('pass_manage.old_pass')" prop="password">
              <el-input
                type="password"
                :placeholder="$t('pass_manage.old_pass')"
                v-model="ruleForm.password"
              ></el-input>
            </el-form-item>
            <!-- 新密码 -->
            <el-form-item :label="$t('pass_manage.new_pass')" prop="newPassword">
              <el-input
                type="password"
                :placeholder="$t('pass_manage.new_pass')"
                v-model="ruleForm.newPassword"
              ></el-input>
            </el-form-item>
            <!-- 确认新密码 -->
            <el-form-item :label="$t('pass_manage.cfm_new_pass')" prop="newPassword2">
              <el-input
                type="password"
                :placeholder="$t('pass_manage.cfm_new_pass')"
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
            <el-form-item :label="$t('transaction_pass.code')" prop="strCode">
              <el-input :placeholder="$t('transaction_pass.code')" v-model="ruleForm.strCode">
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
import GetCode from "@/components/GetCode";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
import comData from "@/utils/data.js";
export default {
  name: "account_password",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("pass_manage.changePassErrInfo.new_pass")); // 新密码不能为空
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("pass_manage.changePassErrInfo.newpasswordCFW")); // 两次密码输入不一致
      } else {
        callback();
      }
    };
    return {
      sendCodeType: 1, // 1 手机号 2邮箱
      curEmail: "", // 当前邮箱
      ruleForm: {
        password: "", // 旧密码
        newPassword: "", // 新密码
        newPassword2: "", // 再次确认密码
        os_type: comData.os_type,
        strCode: "", // 手机验证码
        mobile: "" // 手机号
      },
      rules: {
        password: [
          {
            required: true,
            message: "pass_manage.changePassErrInfo.old_pass",
            trigger: "blur"
          } // 旧密码不能为空
        ],
        newPassword: [
          {
            required: true,
            message: "pass_manage.changePassErrInfo.new_pass",
            trigger: "blur"
          } // 新密码不能为空
        ],
        newPassword2: [{ validator: validatePass2, trigger: "blur" }],
        strCode: [
          {
            required: true,
            message: "transaction_pass.resetPassErrInfo.beforeCode",
            trigger: "blur"
          } // 请先输入验证码
        ]
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
          params = Object.assign({}, vm.ruleForm);
          delete params.newPassword2;
          delete params.mobile;
          vm.fnPassAgain()
            .then(code => {
              if (code == 0) {
                vm.$api.IBM_USER_UPDATEPW(params).then(res => {
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
</style>
