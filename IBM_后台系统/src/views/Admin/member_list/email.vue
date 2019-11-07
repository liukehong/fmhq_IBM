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
export default {
  name: "member_list_email",
  mixins: [WatchScreen, GetUserInfo, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      user: {
        email: "" // 用户名
      },
      ruleForm: {
        email: "" // 新邮箱
      },
      rules: {}
    };
  },
  components: {},
  mounted: function() {
    let vm = this;
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
