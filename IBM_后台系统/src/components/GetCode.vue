<template>
  <el-button class="codeBtn" :disabled="codeType" @click="fnGetCode">{{ codeContent }}</el-button>
</template>

<script>
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "GetCode",
  props: ["mobile", "apiUrl", "type", "phoneCode", "errTxt", "username",'btnText'],
  mixins: [MessageBox],
  data() {
    return {
      codeType: false,
      codeContent: this.btnText||this.$t("transaction_pass.get") // 获取
    };
  },
  methods: {
    // 参数
    fnGetParams() {
      let vm = this;
      let params;
      if (vm.apiUrl == "IBM_UTILS_SENDMOBILECODE") {
        params = {
          mobile: vm.mobile
        };
      } else if (vm.apiUrl == "IBM_UTILS_MOBILECODE") {
        // 无参手机
      }else if (vm.apiUrl == "IBM_UTILS_SENDMAILCODE") {
        // 无参邮箱
      } else if (vm.apiUrl == "VERIFICATION_SENDCODE") {
        let phone = vm.phoneCode + vm.mobile;
        params = {
          type: vm.type,
          key: phone.replace("+", "%2B")
        };
      } else if (vm.apiUrl == "VERIFICATION_SENDCODERETRIEVEPASSWORD") {
        params = {
          userName: vm.mobile,
          type: vm.type
        };
      } else if (vm.apiUrl == "IBM_UTILS_OPT2") {
        params = {
          username: vm.username
        };
      }
      return params;
    },
    // 获取验证码
    fnGetCode() {
      let vm = this;
      if (vm.apiUrl == "IBM_UTILS_OPT2") {
        if( !!!vm.username ){
          vm.fnOpenMessageBox(vm.errTxt || vm.$t("login.loginErrInfo.username")); // 请输入用户名
          return false;
        }
      } else {
        if (vm.mobile == "") {
          vm.fnOpenMessageBox(vm.errTxt || vm.$t("forgetErrInfo.phone")); // 请输入手机号
          return false;
        }
      }
      let num = 60;
      let timer = null;
      function fnCountDown() {
        vm.codeType = true;
        vm.codeContent = num;
        timer = setInterval(function() {
          if (num == 0) {
            window.clearInterval(timer);
            vm.codeContent = vm.$t("transaction_pass.get"); // 获取
            vm.codeType = false;
          } else {
            num = num - 1;
            vm.codeContent = num;
          }
        }, 1000);
      }
      // 调用接口 获取验证码
      let ajaxData = vm.fnGetParams();
      fnCountDown();
      vm.$api[vm.apiUrl](ajaxData).then(res => {
        if (res.code == 0) {
          // 倒计时操作
          // fnCountDown();
        } else {
          vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
        }
      });
    }
  },
  watch: {
    btnText: function () {
      let vm = this;
      vm.codeContent = vm.btnText;
    }
  }
};
</script>

<style scoped>
</style>
