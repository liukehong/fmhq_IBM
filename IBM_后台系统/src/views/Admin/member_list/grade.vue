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
        <!-- 原等级名称 -->
        <el-form-item :label="$t('admin_feedback.gradeName')">
          <div>{{ user.levelName }}</div>
        </el-form-item>
        <!-- 选择等级 -->
        <el-form-item :label="$t('admin_feedback.selectGrade')">
          <!-- 请选择 -->
          <el-select v-model="ruleForm.levelId" :placeholder="$t('el.select.placeholder')">
            <el-option v-for="item in gradeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
    <!-- 重置等级 -->
    <el-button type="primary" @click="fnReset">{{ $t('admin_feedback.reset_grade') }}</el-button>
    <!-- 返回 -->
    <el-button @click="fnReturn">{{ $t('system_container.back') }}</el-button>
    <el-dialog
      :modal-append-to-body="false"
      :title="$t('system_container.tips')"
      :visible.sync="dialogVisible"
      :width="screenSize == 1?'22%':'90%'"
      center
    >
      <el-form
        style="padding: .2rem;"
        :model="ruleForm"
        label-position="top"
        ref="ruleForm"
        label-width="1.6rem"
        class="demo-ruleForm item_form"
      >
        <!-- 获取验证码方式 -->
        <el-form-item :label="$t('other.text1')">
          <el-radio-group v-model="sendCodeType1">
            <el-radio :label="1">{{ $t('other.text2') }}</el-radio>
            <el-radio :label="2">{{ $t('register.email') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item :label="$t('transaction_pass.code')">
          <el-input :placeholder="$t('transaction_pass.code')" v-model="phoneCord1">
            <template slot="append">
              <GetCode
                v-if="!!dialogVisible"
                apiUrl="IBM_UTILS_GETSECURITYCODE"
                :mobile="phone"
                :codeType1="sendCodeType1"
              ></GetCode>
            </template>
          </el-input>
        </el-form-item>
        <!-- 请先输入验证码 -->
        <div
          v-if="!!codeNull"
          style="text-align:center; color: red;"
        >{{ $t('transaction_pass.resetPassErrInfo.beforeCode') }}</div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- 确 定 -->
        <el-button @click="dialogVisible = false">{{ $t('el.datepicker.cancel') }}</el-button>
        <el-button type="primary" @click="fnDoSomeModal">{{ $t('el.colorpicker.confirm') }}</el-button>
      </span>
    </el-dialog>
  </el-form>
</template>

<script>
import WatchScreen from "../../../mixins/watchScreen.js";
import GetUserInfo from "../../../mixins/getUserInfo.js";
import MessageBox from "@/mixins/messageBox.js";
import comData from "@/utils/data.js";
import GetCode from "@/components/GetCode1";
export default {
  name: "member_list_grade",
  mixins: [WatchScreen, GetUserInfo, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      codeNull: false,
      dialogVisible: false,
      phone: "",
      sendCodeType: 1, // 1 手机号 2邮箱
      dept: "",
      phoneCord: "",
      sendCodeType1: 1, // 1 手机号 2邮箱
      phoneCord1: "",


      user: {
        levelName: "" // 等级名称
      },
      ruleForm: {
        levelId: "" // 等级ID
      },
      rules: {},
      gradeList: []
    };
  },
  components: {
    GetCode
  },
  mounted: function() {
    let vm = this;
    vm.dept = vm.$main.userInfo.deptId;
    vm.phone = vm.$main.userInfo.mobile;
    vm.fnGetGradeList();
    // vm.fnInit();
  },
  methods: {
    // 模态框点击事件
    fnDoSomeModal() {
      let vm = this;
      if (!!!vm.phoneCord1) {
        vm.codeNull = true;
      } else {
        vm.dialogVisible = false;
        // 接口
        let params = {
          uId: vm.p.info.user_id,
          security_code: vm.phoneCord1
        };
        vm.$api.IBM_ADMIN_RESETLEVEL(params).then(res => {
          vm.$main.loading = false;
          if (res.code == 0) {
            // 修改成功
            vm.fnOpenMessageBox(
              vm.$t("admin_feedback.reset_success"), // 重置成功
              "success"
            );
            vm.fnReturn();
          } else {
            vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
          }
        });
      }
    },
    // 重置等级
    fnReset() {
      let vm = this;

      vm.$main.loading = true;
      let params = {
        uId: vm.p.info.user_id
      };
      if (vm.dept == 11) {
        // 打开模特框的初始化
        vm.sendCodeType1 = 1;
        vm.phoneCord1 = "";
        vm.codeNull = false;
        vm.dialogVisible = true;
      } else {
        vm.$api.IBM_ADMIN_RESETLEVEL(params).then(res => {
          vm.$main.loading = false;
          if (res.code == 0) {
            // 修改成功
            vm.fnOpenMessageBox(
              vm.$t("admin_feedback.reset_success"), // 重置成功
              "success"
            );
            vm.fnReturn();
          } else {
            vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
          }
        });
      }
    },
    // 获取等级信息
    fnGetGradeList() {
      let vm = this;
      vm.$api.IBM_ADMIN_LEVELINFO().then(res => {
        vm.gradeList = res.data;
        vm.fnInit();
      });
    },
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
          function keyObj(name = {}, data = {}) {
            for (let key in vm[name]) {
              vm[name][key] = data[key];
            }
          }
          keyObj("user", res.data);
          keyObj("ruleForm", res.data);
        });
    },
    // 页面初始化
    fnInit() {
      let vm = this;
      // 获取个人用户信息
      vm.fnInfo();
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          /* if (!!!vm.ruleForm.levelId) {
            vm.fnOpenMessageBox(vm.$t("admin_feedback.selectGrade_reg"), "error"); // 请选择等级
            return false;
          } */
          let params = {
            levelId: vm.ruleForm.levelId,
            uId: vm.p.info.user_id
          };
          vm.$main.loading = true;
          console.log(params);
          if (vm.dept == 11) {
            params.security_code = vm.phoneCord;
          }
          vm.$api.IBM_ADMIN_UPDATEUSERLEVEL(params).then(res => {
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
.member_list_grade {
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
