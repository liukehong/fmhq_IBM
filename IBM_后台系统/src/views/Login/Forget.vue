<template>
  <div class="login_box_bg">
    <div class="login_tit">{{ $t('login.forgetpass') }}<!-- 忘记密码 --></div>
    <div class="login_logo">
      <img src="../../image/logo.png" alt>
    </div>
    <el-form :model="ruleForm" ref="ruleForm" label-position="top" class="demo-ruleForm item_form">
      <div class="login_form">
        <!-- 用户ID -->
        <el-form-item prop="username">
          <el-input :placeholder="$t('login.userId')" v-model="ruleForm.username" clearable></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item>
          <el-input class="select_wrap" :placeholder="$t('login.phone')" v-model="ruleForm.mobile">
            <el-select class="reset_select" v-model="phoneCode" slot="prepend" placeholder="请选择">
              <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item class="codeWrap" prop="mobileCode">
          <el-input :placeholder="$t('login.code')" v-model="ruleForm.mobileCode">
            <template slot="append">
              <GetCode
                class="codeBtn"
                apiUrl="IBM_UTILS_SENDMOBILECODE"
                :mobile="(phoneCode+ruleForm.mobile)"
              ></GetCode>
            </template>
          </el-input>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            :placeholder="$t('pass_manage.new_pass')"
            v-model="ruleForm.password"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 确认新密码 -->
        <el-form-item prop="password3">
          <el-input
            type="password"
            :placeholder="$t('pass_manage.cfm_new_pass')"
            v-model="ruleForm.password3"
            clearable
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="login_btn_box">
      <div class="login_btn">
        <!-- 修改密码 -->
        <el-button @click="submitForm('ruleForm')" class="login-btn" type="primary">{{ $t('pass_manage.change_pass') }}</el-button>
      </div>
      <!-- 返回登陆 -->
      <div class="login_back" @click="changePage">
        <a>{{ $t('login.backlogin') }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import Utils from "@/utils/encrypt.js";
import comData from "@/utils/data.js";
import GetCode from "../../components/GetCode";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "Login_forget",
  inject: ["p"],
  mixins: [ MyValidate,MessageBox ],
  components: {
    GetCode
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          // 新密码不能为空
          callback(new Error('pass_manage.changePassErrInfo.new_pass'));
        } else if (value !== this.ruleForm.password) {
          // 两次密码输入不一致
          callback(new Error('pass_manage.changePassErrInfo.newpasswordCFW'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
        username: "", // 用户名
        mobile: '', // 手机号码
        mobileCode: "", // 手机验证码
        password: "", // 新密码
        password3: "", // 确认密码
      },
      rules: {
        username: [
          // 请输入用户名
          { required: true, message: 'login.loginErrInfo.username', trigger: "blur" }
        ],
        mobileCode: [
          // 请输入验证码
          { required: true, message: 'phone_manage.setPhoneErr.beforeCode', trigger: "blur" }
        ],
        password: [
          // 请输入密码
          { required: true, message: 'pass_manage.changePassErrInfo.new_pass', trigger: "blur" }
        ],
        password3: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      phoneCode: "+86", // 手机类型编码
      list: comData.phone, // 手机号码类型
    };
  },
  mounted: function () {
    this.fnPhoneType();
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
    changePage() {
      let vm = this;
      vm.p.pageType = "login";
    },
    // 找回登录密码
    submitForm(formName) {
      let vm = this;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          let params = {
            mobile: vm.phoneCode + vm.ruleForm.mobile,
            mobileCode: vm.ruleForm.mobileCode,
            password: vm.ruleForm.password,
            username: vm.ruleForm.username,
            os_type: comData.os_type,
          }
          vm.p.loading = true;
          vm.$api.IBM_LOGIN_RETPASS(params).then(res => {
            vm.p.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t('personal_profile.setUserInfoErr.success'),'success')
            } else {
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`),'error')
            }
          });
        } else {
          vm.fnOpenMessageBox(err,'error')
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>
