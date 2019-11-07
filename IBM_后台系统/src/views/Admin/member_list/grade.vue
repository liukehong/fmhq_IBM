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
      </div>
    </div>
    <!-- 提交 -->
    <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('login.forget_btn') }}</el-button>
    <!-- 重置等级 -->
    <el-button type="primary" @click="fnReset">{{ $t('admin_feedback.reset_grade') }}</el-button>
    <!-- 返回 -->
    <el-button @click="fnReturn">{{ $t('system_container.back') }}</el-button>
  </el-form>
</template>

<script>
import WatchScreen from "../../../mixins/watchScreen.js";
import GetUserInfo from "../../../mixins/getUserInfo.js";
import MessageBox from "@/mixins/messageBox.js";
import comData from "@/utils/data.js";
export default {
  name: "member_list_grade",
  mixins: [WatchScreen, GetUserInfo, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
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
  components: {},
  mounted: function() {
    let vm = this;
    vm.fnGetGradeList();
    // vm.fnInit();
  },
  methods: {
    // 重置等级
    fnReset() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api
        .IBM_ADMIN_RESETLEVEL({
          uId: vm.p.info.user_id
        })
        .then(res => {
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
