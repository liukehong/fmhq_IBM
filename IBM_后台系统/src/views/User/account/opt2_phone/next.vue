<template>
  <el-form
    :model="ruleForm1"
    :label-position="screenSize == 1?'left':'top'"
    ref="ruleForm1"
    label-width="1.6rem"
    class="demo-ruleForm item_form"
  >
    <!-- 新手机号码 -->
    <el-form-item label="新手机号码">
      <!-- 请输入新的手机号码 -->
      <el-input placeholder="请输入新的手机号码" v-model="ruleForm1.newMobile">
        <!-- 请选择 -->
        <el-select class="reset_select" v-model="phoneCode" slot="prepend" placeholder="请选择">
          <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item label="验证码">
      <el-input placeholder="请输入验证码" v-model="ruleForm1.codePhone">
        <template slot="append">
          <GetCode
            apiUrl="VERIFICATION_SENDCODE"
            :phoneCode="phoneCode"
            :mobile="ruleForm1.newMobile"
            type="1"
          ></GetCode>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <!-- 返回 -->
      <el-button @click="returnPage">返回</el-button>
      <!-- 提交 -->
      <el-button type="primary" @click="submitForm('ruleForm1')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import WatchScreen from "@/mixins/watchScreen.js";
import comData from "@/utils/data.js";
import GetCode from "@/components/GetCode";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "PhoneManageNext",
  mixins: [WatchScreen, MessageBox],
  props: ["oldCode"],
  data() {
    return {
      phoneCode: "+86",
      user: {
        mobile: "" // 手机号码
      },
      ruleForm1: {
        newMobile: "", // 新手机号
        code: "", // 老手机号验证码
        newCode: "" // 新手机号验证码
      },
      list: comData.phone
    };
  },
  components: {
    GetCode
  },
  mounted: function () {
      let vm = this;
      vm.fnPhoneType();
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
    // 返回上一步
    returnPage() {
      let vm = this;
      vm.$emit("changeNext");
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      if (!!!vm.ruleForm1.newMobile) {
        //请输入新手机号码
        vm.fnOpenMessageBox("请输入新手机号码", "error");
        return false;
      }
      if (!!!vm.ruleForm1.newCode) {
        // 请输入验证码
        vm.fnOpenMessageBox("请输入验证码", "error");
        return false;
      }
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let phone = vm.phoneCode + vm.ruleForm1.newMobile;
          let params = {
            key: phone.replace("+", "%2B"),
            code: vm.ruleForm1.codePhone,
            type: 1
          };
          // 校验验证码
          vm.$api.VERIFICATION_CODEVERIFICATION(params).then(res => {
            if (res.code == 0) {
              // 调用修改接口
              vm.$api
                .USER_UPDATEMOBILE({
                  newMobile: phone,
                  code: vm.oldCode,
                  newCode: vm.ruleForm1.codePhone
                })
                .then(res => {
                  if (res.code == 0) {
                    vm.fnOpenMessageBox("ok", "success");
                  } else {
                    vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
                  }
                });
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
.reset_select {
  width: 0.9rem;
}
</style>
