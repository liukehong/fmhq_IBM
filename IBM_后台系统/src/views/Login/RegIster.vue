<template>
  <div class="login_box_bg">
    <!-- 新用户注册 -->
    <div class="login_tit">{{ $t('register.register') }}</div>
    <div class="login_logo">
      <img src="../../image/logo.png" alt />
    </div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      v-show="step==1"
      label-position="top"
      class="demo-ruleForm item_form"
    >
      <div class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input :placeholder="$t('login.username')" v-model="ruleForm.username" clearable></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            :placeholder="$t('register.pass')"
            v-model="ruleForm.password"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item prop="password2">
          <el-input
            type="password"
            :placeholder="$t('register.cfmpass')"
            v-model="ruleForm.password2"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item prop="mobile">
          <el-input
            class="select_wrap"
            :placeholder="$t('register.phone')"
            v-model="ruleForm.mobile"
          >
            <el-select class="reset_select" v-model="phoneCode" slot="prepend" placeholder="请选择">
              <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item class="codeWrap" prop="mobileCode">
          <el-input :placeholder="$t('register.code')" v-model="ruleForm.mobileCode">
            <template slot="append">
              <GetCode
                class="codeBtn"
                apiUrl="IBM_UTILS_SENDMOBILECODE"
                :mobile="(phoneCode+ruleForm.mobile)"
              ></GetCode>
            </template>
          </el-input>
        </el-form-item>
      </div>
    </el-form>
    <el-form
      :model="ruleForm2"
      ref="ruleForm2"
      v-show="step==2"
      label-position="top"
      class="demo-ruleForm item_form"
    >
      <div class="login_form">
        <!-- 英文名 -->
        <el-form-item prop="englishName">
          <el-input
            :placeholder="$t('register.englishName')"
            v-model="ruleForm2.englishName"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 真实姓名 -->
        <el-form-item prop="name">
          <el-input :placeholder="$t('register.name')" v-model="ruleForm2.name" clearable></el-input>
        </el-form-item>
        <!-- 身份证 -->
        <el-form-item prop="cardNum">
          <el-input :placeholder="$t('register.id_card')" v-model="ruleForm2.cardNum" clearable></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input :placeholder="$t('register.email')" v-model="ruleForm2.email" clearable></el-input>
        </el-form-item>
      </div>
    </el-form>
    <div class="login_btn_box" v-show="step == 1">
      <div class="login_btn">
        <!-- 下一步 -->
        <el-button
          @click="submitForm('ruleForm')"
          class="login-btn"
          type="primary"
        >{{ $t('register.nextStep') }}</el-button>
      </div>
      <div class="login_back" @click="changePage">
        <!-- 返回登陆 -->
        <a>{{ $t('register.backlogin') }}</a>
      </div>
    </div>
    <!-- 第二步 -->
    <div class="login_btn_box" v-show="step == 2">
      <div class="login_btn">
        <!-- 注册 -->
        <el-button
          @click="fnRegSubmit('ruleForm2')"
          class="login-btn"
          type="primary"
        >{{ $t('register.reg_btn') }}</el-button>
      </div>
      <div class="login_back" @click="step=1">
        <!-- 上一步 -->
        <a>{{ $t('register.preStep') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import Utils from "@/utils/encrypt.js";
import comData from "@/utils/data.js";
import axios from "axios";
import GetCode from "../../components/GetCode";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "Login_register",
  inject: ["p"],
  mixins: [MyValidate, MessageBox],
  components: {
    GetCode
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        // 两次输入密码不一致
        callback(new Error("register.regErrInfo.cfmpass"));
      } else if (value !== this.ruleForm.password) {
        // 两次输入密码不一致
        callback(new Error("register.regErrInfo.cfmpass"));
      } else {
        callback();
      }
    };
    return {
      step: 1,
      phoneCode: "+86", // 手机类型编码
      list: comData.phone, // 手机号码类型
      ruleForm: {
        username: "", // 用户名
        password: "", // 密码
        password2: "", // 再次输入密码
        mobile: "", // 手机号
        mobileCode: "", // 验证码
        inviteCode: this.p.inviteSuper // 推荐码
      },
      ruleForm2: {
        email: "", // 邮箱
        englishName: "", // 英文名
        name: "", // 真实姓名
        cardNum: "", // 身份证
        cardType: 1, // 身份证类型
        sex: 1 //性别
      },
      rules: {
        englishName: [
          {
            required: true,
            message: "register.regErrInfo.englishName",
            trigger: "blur"
          } //请先填写英文名
        ],
        name: [
          {
            required: true,
            message: "register.regErrInfo.name",
            trigger: "blur"
          } // 请填写真实姓名
        ],
        cardNum: [
          {
            required: true,
            message: "register.regErrInfo.id_card",
            trigger: "blur"
          } // 请填写身份证
        ],
        username: [
          {
            required: true,
            message: "register.regErrInfo.username",
            trigger: "blur"
          } // 请输入用户名
        ],
        password: [
          {
            required: true,
            message: "register.regErrInfo.password",
            trigger: "blur"
          } // 请输入密码
        ],
        password2: [{ validator: validatePass2, trigger: "blur" }],
        mobile: [
          {
            required: true,
            message: "register.regErrInfo.phone",
            trigger: "blur"
          } // 请先填写手机号
        ],
        mobileCode: [
          {
            required: true,
            message: "phone_manage.setPhoneErr.beforeCode",
            trigger: "blur"
          } // 请输入验证码
        ],
        email: [
          {
            required: true,
            message: "register.regErrInfo.email",
            trigger: "blur"
          }, // 请输入邮箱
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted: function() {
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
    // 下一步 step=2
    submitForm(formName) {
      let vm = this;
      vm.myValidate(formName).then(err => {
        // 用户名不能有空格
        if (vm.ruleForm.username.indexOf(" ") >= 0) {
          vm.fnOpenMessageBox(vm.$t(`errCode.8051`), "error");
          return false;
        }
        if (!!!err) {
          vm.step = 2;
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    },
    // 注册提交
    fnRegSubmit(formName) {
      let vm = this;
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm, vm.ruleForm2);
          console.log(params);
          params.mobile = vm.phoneCode + vm.ruleForm.mobile;
          delete params.password2;
          vm.p.loading = true;
          vm.$api.IBM_REGISTER_REG(params).then(res => {
            vm.p.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("register.regErrInfo.success"),
                "success"
              );
              vm.p.pageType = "login";
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
