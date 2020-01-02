<template>
  <!--  :style="screenSize == 1?'width: 9.01rem;':'width: 3.71rem;'" -->
  <div class="login-enter" style="width: 3.71rem;">
    <!-- 880px 消失 -->
    <!-- <div class="login_bg_wrap" v-if="screenSize == 1?true:false">
      <div class="login_bg_title1">欢迎进入</div>
      <div class="login_bg_line"></div>
      <div class="login_bg_title2">IBM后台管理系统</div>
    </div>-->
    <!-- 操作按钮 -->
    <!-- <div class="login_bg_btn" v-if="screenSize == 1?true:false">
      <div class="enterBtn">
        登<br>录
      </div>
      <div class="regBtn">
        注<br>册
      </div>
    </div>-->
    <!-- :style="screenSize == 1?'margin-left: 5.3rem;':'margin-left:0px;'" -->
    <div class="login_box_bg">
      <!-- 登录 -->
      <div class="login_tit">{{ $t('login.login_btn') }}</div>
      <div class="login_logo">
        <img src="../../image/logo.png" alt />
      </div>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-position="top"
        class="demo-ruleForm item_form"
        @keydown.enter.native="submitForm('ruleForm')"
      >
        <div class="login_form">
          <!-- 语言选择 -->
          <el-form-item>
            <el-select
              @change="fnLanguageChange"
              style="width: 100%;"
              v-model="value"
              placeholder="请选择"
            >
              <el-option
                v-for="item in languageList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input :placeholder="$t('login.username')" v-model="ruleForm.username" clearable></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              type="password"
              :placeholder="$t('login.pass')"
              v-model="ruleForm.password"
              clearable
            ></el-input>
          </el-form-item>
          <!-- 验证码方式 -->
          <el-form-item v-if="ruleForm.os_type == 1&&loginType == 0">
            <el-select style="width: 100%;" v-model="sendCodeType" placeholder="请选择">
              <el-option :label="$t('other.text2')" :value="1"></el-option>
              <el-option :label="$t('register.email')" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item
            v-if="ruleForm.os_type == 1&&loginType == 0"
            class="codeWrap"
            prop="mobileCode"
          >
            <el-input :placeholder="$t('login.code')" v-model="ruleForm.mobileCode">
              <template slot="append">
                <GetCode
                  class="codeBtn"
                  :apiUrl="sendCodeType == 1?'IBM_UTILS_OPT2':'IBM_UTILS_EMAILOPT2'"
                  :username="ruleForm.username"
                  :btnText="btnText"
                ></GetCode>
              </template>
            </el-input>
          </el-form-item>
          <!-- 图片验证码 -->
          <el-form-item prop="captcha" v-if="loginType == 0">
            <el-input
              class="el-input-mixin"
              type="code"
              :placeholder="$t('login.code')"
              v-model="ruleForm.captcha"
            ></el-input>
            <div class="img-box" @click="fnCaptcha">
              <img :src="captchaImg" alt />
            </div>
          </el-form-item>
        </div>
      </el-form>
      <div class="login_btn_box">
        <div class="login_btn">
          <el-button @click="submitForm('ruleForm')" class="login-btn" type="primary">
            {{ $t('login.login_btn') }}
            <!-- 登录 -->
          </el-button>
        </div>
        <div class="login_a" v-if="loginType == 0">
          <a @click="changePage">
            {{ $t('login.forgetpass') }}
            <!-- 忘记密码 -->
          </a>
          <a @click="fnPassAgain">
            {{ $t('register.register') }}
            <!-- 新用户注册 -->
          </a>
        </div>
      </div>
    </div>
    <!-- 推荐人id 模态框 -->
    <!-- 提示 -->
    <el-dialog :title="$t('el.messagebox.title')" :visible.sync="dialogVisible" center width="3rem">
      <el-input :placeholder="$t('login.please_referral_id')" v-model="superUserId"></el-input>
      <!-- 请输入推荐人ID -->
      <!-- <el-form label-position="top" label-width="1.6rem" class="demo-ruleForm item_form reg_form" @keydown.enter.native="fnGoReg1">
          <el-form-item :label="$t('login.please_referral_id')">
            <el-input :placeholder="$t('login.please_referral_id')" v-model="superUserId"></el-input>
          </el-form-item>
      </el-form>-->
      <span slot="footer" class="dialog-footer">
        <!-- 去注册 -->
        <el-button type="primary" @click="fnGoReg">{{ $t('login.to_reg') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Utils from "@/utils/encrypt.js";
import comData from "@/utils/data.js";
import axios from "axios";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
import WatchScreen from "@/mixins/watchScreen.js";
import GetCode from "@/components/GetCode";
export default {
  name: "login-enter",
  inject: ["p"],
  mixins: [MyValidate, MessageBox, WatchScreen],
  components: {
    GetCode
  },
  data() {
    return {
      sendCodeType: 1,
      btnText: this.$t("transaction_pass.get"),
      loginType: this.fnLoginType(), // 0 用户  1管理员  2管理员2
      dialogVisible: false, // 模态框控制
      d: "", // 时间戳
      superUserId: "", // 推荐人ID
      value: "zh", // 语言种类
      captchaImg: "", // 验证码图片路径
      languageList: [
        {
          name: "中文简体",
          value: "zh"
        },
        {
          name: "English",
          value: "en"
        },
        {
          name: "日本語",
          value: "jp"
        }
      ],
      ruleForm: {
        username: "", // 用户名
        password: "", // 密码
        captcha: "", // 图片验证码
        os_type: comData.os_type, // 登录类型
        uuid: "", // 时间戳
        mobileCode: "" // 手机验证码
      },
      rules: {
        // 请输入验证码
        captcha: [
          {
            required: true,
            message: "phone_manage.setPhoneErr.beforeCode1",
            trigger: "blur"
          }
        ],
        // 请输入密码
        password: [
          {
            required: true,
            message: "login.loginErrInfo.password",
            trigger: "blur"
          }
        ],
        // 请输入用户名
        username: [
          {
            required: true,
            message: "login.loginErrInfo.username",
            trigger: "blur"
          }
        ],
        mobileCode: [
          // 请输入验证码
          {
            required: true,
            message: "phone_manage.setPhoneErr.beforeCode",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted: function() {
    let vm = this;
    let val = vm.value;
    if (window.localStorage.getItem("locale")) {
      val = window.localStorage.getItem("locale");
    }
    vm.$i18n.locale = val;
    vm.btnText = vm.$t("transaction_pass.get");
    // 判断登录类型
    vm.fnCaptcha();
    if (window.localStorage.getItem("locale")) {
      vm.value = window.localStorage.getItem("locale");
    } else {
      window.localStorage.setItem("locale", vm.value);
    }
  },
  methods: {
    fnGoReg1() {
      return false;
    },
    fnLoginType() {
      let type;
      if (this.$route.matched[0].name == "admin") {
        type = 1;
      } else {
        type = 0;
      }
      return type;
    },
    changePage() {
      let vm = this;
      vm.p.pageType = "forget";
    },
    fnPassAgain() {
      let vm = this;
      vm.$prompt(
        vm.$t("login.please_referral_id"), // 请输入推荐人ID
        vm.$t("system_container.tips"),
        {
          confirmButtonText: vm.$t("system_container.ok"), // 确定
          cancelButtonText: vm.$t("system_container.no"), // 取消
          center: true,
          confirmButtonClass: "newClass",
          inputPlaceholder: vm.$t("login.please_referral_id"), // 请输入推荐人ID
          showCancelButton: false
        }
      )
        .then(({ value }) => {
          if (!!!value) {
            vm.fnOpenMessageBox(vm.$t("login.please_referral_id"), "error"); // 请输入推荐人ID
            return false;
          }
          vm.$api
            .IBM_HOME_TJM({
              username: value
            })
            .then(res => {
              if (res.code == 0) {
                vm.p.inviteSuper = res.date.inviteCode;
                vm.p.pageType = "register";
              } else {
                vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
              }
            });
        })
        .catch(() => {});
    },
    // 打开模态框
    fnOpenDialog() {
      let vm = this;
      this.dialogVisible = true;
      vm.superUserId = ""; // 清空父级ID
    },
    // 去注册
    fnGoReg() {
      let vm = this;
      if (!!!vm.superUserId) {
        vm.fnOpenMessageBox(vm.$t("login.please_referral_id"), "error"); // 请输入推荐人ID
        return false;
      }
      vm.$api
        .IBM_HOME_TJM({
          username: vm.superUserId
        })
        .then(res => {
          if (res.code == 0) {
            vm.p.inviteSuper = res.date.inviteCode;
            vm.p.pageType = "register";
            vm.dialogVisible = false;
          } else {
            vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
          }
        });
    },
    // 语言切换
    fnLanguageChange(val) {
      let vm = this;
      vm.value = val;
      window.localStorage.setItem("locale", vm.value);
      vm.$i18n.locale = val;
      vm.btnText = vm.$t("transaction_pass.get");
    },
    // 登陆
    submitForm(formName) {
      let vm = this;
      let params; // 参数
      let pathName = vm.loginType == 0 ? "IBM_LOGIN_LOGIN" : "IBM_ADMIN_LOGIN"; //请求接口路径 0 用户 1管理员
      let tokenName = comData.tokenName; // 根据不同身份保存token comData.tokenName 普通用户  admin_token 管理员
      let _url = comData.conutry_type + "/user/home"; // 登录之后的跳转页面地址
      vm.rules = Object.assign({}, vm.rules);
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm, {
            uuid: vm.d + ""
          });
          if (vm.loginType == 1) {
            // 管理员
            params = {
              username: vm.ruleForm.username,
              password: vm.ruleForm.password
            };
            tokenName = "admin_token";
            // _url = comData.conutry_type + "/admin/admin_home";
            _url = comData.conutry_type + "/HORKVIACYBHWPQXK/admin_home";
          } else {
            // 用来判断是否从登录页面进入首页
            window.sessionStorage.setItem("isLogin", "ok");
            // 完整版还是阉割版
            if (vm.ruleForm.os_type != 1) {
              delete params.mobileCode;
            }
          }
          console.log(params);
          vm.p.loading = true;
          vm.$api[pathName](params).then(res => {
            vm.p.loading = false;
            if (res.code == 0) {
              window.localStorage.setItem(
                tokenName,
                JSON.stringify(res.data.token)
              ); // 保存token
              // 保存登录信息
              window.localStorage.setItem("userInfo", JSON.stringify(res.data));
              axios.defaults.headers.TOKEN = res.data.token; // 设置请求头
              // 如果是2844387
              if (JSON.stringify(res.data.userId) == 2844387) {
                vm.$router.push({
                  path: comData.conutry_type + "/HORKVIACYBHWPQXK/admin_feedback"
                });
              } else {
                vm.$router.push({ path: _url });
              }
            } else {
              vm.fnCaptcha();
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
            }
          });
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    },
    // 获取图片验证码
    fnCaptcha() {
      let vm = this;
      vm.d = +new Date();
      vm.captchaImg = `${comData.path}/ibm/login/beforeLogin?uuid=${vm.d}`;
    }
  }
};
</script>

<style lang="scss">
.login-enter {
  position: relative;
  // border: 7px solid #087ff9;
  border-radius: 5px;
  .login_bg_btn {
    width: 50px;
    height: 250px;
    position: absolute;
    right: -57px;
    top: 50%;
    margin-top: -125px;
    .enterBtn {
      width: 50px;
      height: 120px;
      background: #038de6;
      border-radius: 0px 10px 10px 0px;
      text-align: center;
      color: #fff;
      font-family: MicrosoftYaHei-Bold;
      font-size: 0.16rem;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-bottom: 10px;
    }
    .regBtn {
      width: 50px;
      height: 120px;
      background: #0a4c90;
      border-radius: 0px 10px 10px 0px;
      text-align: center;
      color: #fff;
      font-family: MicrosoftYaHei-Bold;
      font-size: 0.16rem;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0.6;
    }
  }
}
.login_bg_wrap {
  width: 5.3rem;
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  background: url("../../../static/image/login_bg.png") no-repeat;
  background-size: auto;
  .login_bg_title1 {
    position: absolute;
    left: 0.52rem;
    top: 1rem;
    color: #004994;
    font-size: 0.3rem;
    font-weight: bold;
  }
  .login_bg_title2 {
    position: absolute;
    left: 0.52rem;
    top: 1.54rem;
    color: #004994;
    font-size: 0.3rem;
    font-weight: bold;
    font-family: MicrosoftYaHei-Bold;
  }
  .login_bg_line {
    position: absolute;
    left: 0.53rem;
    top: 1.45rem;
    width: 0.57rem;
    height: 3px;
    background: #00a0ff;
  }
}
</style>
