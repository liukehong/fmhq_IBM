<template>
  <transition name="fade">
    <div style="overflow: hidden;" class="opt2_account_phone">
      <!-- 更换手机号 -->
      <div class="item_title">{{ $t('user.opt2_phone_manage') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <el-form
            :model="ruleForm"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.6rem"
            class="demo-ruleForm item_form"
          >
            <!-- 当前手机号 -->
            <el-form-item :label="$t('phone_manage.now_manage')">
              <div>{{ ruleForm.mobile }}</div>
            </el-form-item>
            <!-- 更改手机号 -->
            <el-form-item :label="$t('phone_manage.change_phone')" prop="newMobile">
              <el-input :placeholder="$t('phone_manage.change_phone')" v-model="ruleForm.newMobile">
                <!-- 请选择 -->
                <el-select
                  class="reset_select"
                  v-model="phoneCode"
                  slot="prepend"
                  :placeholder="$t('select.placeholder')"
                >
                  <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <!-- 账号密码 -->
            <el-form-item :label="$t('phone_manage.user_pass')" prop="password">
              <el-input
                type="password"
                :placeholder="$t('phone_manage.user_pass')"
                v-model="ruleForm.password"
              ></el-input>
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
                  <!-- <GetCode apiUrl="IBM_UTILS_MOBILECODE" :mobile="ruleForm.mobile"></GetCode> -->
                  <GetCode :apiUrl="sendCodeType == 1?'IBM_UTILS_OPT2':'IBM_UTILS_SENDMAILCODE'" :username="username"></GetCode>
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
  name: "opt2_account_phone",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    return {
      sendCodeType: 1, // 1 手机号 2邮箱
      phoneCode: "+86",
      username: "",
      ruleForm: {
        password: "", // 账号密码
        newMobile: "", // 新手机号
        mobile: "", // 手机号码
        code: "", // 验证码
        os_type: comData.os_type // 验证类型 1手机 2邮箱
      },
      rules: {
        newMobile: [
          {
            required: true,
            message: "phone_manage.setPhoneErr.getCodeErr",
            trigger: "blur"
          }
        ], // 请先填写手机号
        code: [
          {
            required: true,
            message: "transaction_pass.resetPassErrInfo.beforeCode",
            trigger: "blur"
          }
        ], // 请先输入验证码
        password: [
          {
            required: true,
            message: "phone_manage.setPhoneErr.userPass",
            trigger: "blur"
          }
        ]
      },
      list: comData.phone
    };
  },
  components: {
    GetCode
  },
  mounted: function() {
    let vm = this;
    vm.fnPhoneType();
    vm.fnInit();
  },
  methods: {
    fnPhoneType() {
      let vm = this;
      let langType = "zh";
      if (!!window.localStorage.getItem("locale")) {
        langType = window.localStorage.getItem("locale");
      }
      vm.phoneCode = langType == "zh" ? "+86" : langType == "en" ? "+1" : "+81";
    },
    // 页面初始化
    fnInit() {
      let vm = this;
      vm.$main.loading = true;
      vm.fnGetNewInfo().then(res => {
        vm.$main.loading = false;
        vm.ruleForm.mobile = res.mobile2;
        vm.username = res.username;
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
          let phone = vm.phoneCode + vm.ruleForm.newMobile;
          params = {
            password: vm.ruleForm.password,
            code: vm.ruleForm.code,
            os_type: vm.ruleForm.os_type,
            mobile: phone
          };
          vm.fnPassAgain()
            .then(code => {
              if (code == 0) {
                vm.$api.IBM_USER_UPDATEOPT2(params).then(res => {
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
.opt2_account_phone {
  .reset_select {
    width: 0.9rem;
  }
}
</style>
