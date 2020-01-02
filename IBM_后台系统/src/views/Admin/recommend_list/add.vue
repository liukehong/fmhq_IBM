<template>
  <div class="item_box notice_list_add">
    <div class="item_list_box">
      <el-form
        :model="ruleForm"
        :label-position="screenSize == 1?'left':'top'"
        ref="ruleForm"
        label-width="1.6rem"
        class="demo-ruleForm item_form"
      >
        <!-- 用户id -->
        <el-form-item :label="$t('login.userId')" style="max-width: 6rem;">
          <el-input :placeholder="$t('login.userId')" v-model="ruleForm.uid"></el-input>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item :label="$t('other.text7')">
          <!-- 请选择 -->
          <el-select v-model="ruleForm.type" :placeholder="$t('el.select.placeholder')">
            <!-- 永久开发 -->
            <el-option :label="$t('other.text9')" :value="1"></el-option>
            <!-- 开发一天 -->
            <el-option :label="$t('other.text13')" :value="2"></el-option>
            <!-- 指定开发时间 -->
            <el-option :label="$t('other.text14')" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <!-- 类型 -->
        <el-form-item :label="$t('other.text8')" v-if="ruleForm.type != 1">
          <TableDate :openType="ruleForm.type" @changeDate="changeDataByDate"></TableDate>
        </el-form-item>
        <!-- 获取验证码方式 -->
        <el-form-item :label="$t('other.text1')" v-if="dept == 11">
          <el-radio-group v-model="sendCodeType">
            <el-radio :label="1">{{ $t('other.text2') }}</el-radio>
            <el-radio :label="2">{{ $t('register.email') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item :label="$t('transaction_pass.code')" style="max-width: 6rem;" v-if="dept == 11">
          <el-input :placeholder="$t('transaction_pass.code')" v-model="phoneCord">
            <template slot="append">
              <GetCode apiUrl="IBM_UTILS_GETSECURITYCODE" :mobile="phone" :codeType1="sendCodeType"></GetCode>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <!-- 提交 -->
          <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('common.submit') }}</el-button>
          <!-- 返回 -->
          <el-button @click="p.pageType = 'list'">{{ $t('system_container.back') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import WatchScreen from "../../../mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
import MyValidate from "@/mixins/myValidate.js";
import TableDate from "../../../../src/components/TableDate2.vue";
import formDate from "@/utils/formDate.js";
import GetCode from "@/components/GetCode1";
export default {
  name: "notice_list_add",
  mixins: [WatchScreen, MessageBox, MyValidate],
  inject: ["p", "$main"],
  components: {
    TableDate,
    GetCode
  },
  data() {
    return {
      phone: "",
      sendCodeType: 1, // 1 手机号 2邮箱
      dept: "",
      phoneCord: "",
      ruleForm: {
        uid: "",
        type: 1, //（1永久开放，2开放一天，3指定开放时间）
        startTime: "",
        endTime: ""
      },
      rules: {}
    };
  },
  mounted: function() {
    let vm = this;
    vm.dept = vm.$main.userInfo.deptId;
    vm.phone = vm.$main.userInfo.mobile;
  },
  methods: {
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      console.log(data, 777);
      if (vm.ruleForm.type == 2) {
        vm.ruleForm.startTime = data;
      } else {
        vm.ruleForm.startTime = data[0];
        vm.ruleForm.endTime = data[1];
        // vm.ruleForm.startTime = data.startTime;
        // vm.ruleForm.endTime = data.endTime;
      }
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          let params;
          if (vm.ruleForm.type == 1) {
            params = {
              uId: vm.ruleForm.uid, // 390273
              type: vm.ruleForm.type
              // startTime: '',
              // endTime: '',
            };
          } else if (vm.ruleForm.type == 2) {
            if (!!!vm.ruleForm.startTime) {
              vm.fnOpenMessageBox(vm.$t("other.text15"), "error");
              return false;
            }
            params = {
              uId: vm.ruleForm.uid, // 390273
              type: vm.ruleForm.type,
              startTime: vm.ruleForm.startTime
              // endTime: '',
            };
          } else {
            if (!!!vm.ruleForm.startTime || !!!vm.ruleForm.endTime) {
              vm.fnOpenMessageBox(vm.$t("other.text15"), "error");
              return false;
            }
            params = {
              uId: vm.ruleForm.uid, // 390273
              type: vm.ruleForm.type,
              startTime: vm.ruleForm.startTime,
              endTime: vm.ruleForm.endTime
            };
          }
          vm.$main.loading = true;
          if(vm.dept == 11){
            params.security_code = vm.phoneCord;
          }
          vm.$api.IBM_ADMIN_ADDORGANIZATION(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              // 添加成功
              vm.fnOpenMessageBox(
                vm.$t("notice_detail.editErrInfo.addSuc"),
                "success"
              );
              vm.p.pageType = "list";
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
.notice_list_add {
  .item_form {
    max-width: 100% !important;
  }
}
</style>
