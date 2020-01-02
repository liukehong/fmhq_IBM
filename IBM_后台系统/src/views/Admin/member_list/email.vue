<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    :label-position="screenSize == 1?'left':'top'"
    ref="ruleForm"
    label-width="1.6rem"
    class="demo-ruleForm item_form"
  >
    <div class="item_box" style="margin-bottom: .2rem;">
      <div class="item_list_box" style=" padding-top: .1rem; padding-bottom: 0px; max-width: 6rem;">
        <!-- 原邮箱 -->
        <el-form-item :label="$t('admin_feedback.oldEmail')">
          <div>{{ user.email }}</div>
        </el-form-item>
        <!-- 新邮箱 -->
        <el-form-item :label="$t('admin_feedback.newEmail')">
          <el-input :placeholder="$t('admin_feedback.newEmail')" v-model="ruleForm.email"></el-input>
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
              <GetCode apiUrl="IBM_UTILS_GETSECURITYCODE" :mobile="phone" :codeType1="sendCodeType"></GetCode>
            </template>
          </el-input>
        </el-form-item>
      </div>
    </div>
    <!-- 提交 -->
    <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('login.forget_btn') }}</el-button>
    <!-- 返回 -->
    <el-button @click="fnReturn">{{ $t('system_container.back') }}</el-button>
  </el-form>
</template>

<script>
import WatchScreen from "../../../mixins/watchScreen.js";
import GetUserInfo from "../../../mixins/getUserInfo.js";
import MessageBox from "@/mixins/messageBox.js";
import comData from "@/utils/data.js";
import GetCode from "@/components/GetCode1";
export default {
  name: "member_list_email",
  mixins: [WatchScreen, GetUserInfo, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      phone: "",
      sendCodeType: 1, // 1 手机号 2邮箱
      dept: "",
      phoneCord: "",
      user: {
        email: "" // 用户名
      },
      ruleForm: {
        email: "" // 新邮箱
      },
      rules: {}
    };
  },
  components: {
    GetCode
  },
  mounted: function() {
    let vm = this;
    vm.dept = vm.$main.userInfo.deptId;
    vm.phone = vm.$main.userInfo.mobile;
    vm.fnInit();
  },
  methods: {
    // 返回列表页
    fnReturn() {
      let vm = this;
      vm.$router.push({ name: "member_list" });
    },
    fnInfo() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api
        .IBM_ADMIN_INFO({
          userId: vm.p.info.user_id
        })
        .then(res => {
          vm.$main.loading = false;
          console.log(res,11)
          function keyObj(name = {}, data = {}) {
            for (let key in vm[name]) {
              vm[name][key] = data[key];
            }
          }
          keyObj("user", res.data);
        });
    },
    // 页面初始化
    fnInit() {
      let vm = this;
      // 获取个人用户信息
      console.log(this.p.user);
      vm.fnInfo();
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          if (!!!vm.ruleForm.email) {
            vm.fnOpenMessageBox(vm.$t("register.regErrInfo.email"), "error");
            return false;
          }
          let params = {
            email: vm.ruleForm.email,
            uId: vm.p.info.user_id
          };
          vm.$main.loading = true;
          console.log(params);
          if(vm.dept == 11){
            params.security_code = vm.phoneCord;
          }
          vm.$api.IBM_ADMIN_UPDATEUSEREMAIL(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              // 修改成功
              vm.fnOpenMessageBox(
                vm.$t("personal_profile.setUserInfoErr.success"),
                "success"
              );
              vm.fnReturn();
            } else {
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
            }
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.member_list_email {
  .el-dialog__header {
    display: none !important;
  }
}
.butStyle {
  margin-left: 0px !important;
  margin-top: 10px !important;
}
.item_box_title {
  height: 0.4rem;
  line-height: 0.4rem;
  background: #0d1752;
  font-size: 0.16rem;
  font-weight: bold;
  color: #fff;
  padding-left: 0.5rem;
}
</style>
