<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    :label-position="screenSize == 1?'left':'top'"
    ref="ruleForm"
    label-width="1.6rem"
    class="demo-ruleForm item_form member_list_phone"
  >
    <div class="item_box" style="margin-bottom: .2rem;">
      <div class="item_list_box" style=" padding-top: .1rem; padding-bottom: 0px; max-width: 6rem;">
        <!-- 原手机号 -->
        <el-form-item :label="$t('admin_feedback.oldPhone')">
          <div>{{ user.mobile2 }}</div>
        </el-form-item>
        <!-- 新手机号 -->
        <el-form-item :label="$t('admin_feedback.newPhone')">
          <el-input :placeholder="$t('admin_feedback.newPhone')" v-model="ruleForm.mobile">
            <!-- 请选择 -->
            <el-select
              class="reset_select"
              v-model="phoneCode"
              slot="prepend"
              :placeholder="$t('select.placeholder')"
            >
              <el-option v-for="item in list" :key="item" :label="item" :value="item"></el-option>
            </el-select>
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
export default {
  name: "member_list_phone",
  mixins: [WatchScreen, GetUserInfo, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      phoneCode: "+86",
      list: comData.phone,
      user: {
        mobile2: "" // 手机号
      },
      ruleForm: {
        mobile: "" // 新手机号
      },
      rules: {}
    };
  },
  components: {},
  mounted: function() {
    let vm = this;
    vm.fnPhoneType();
    vm.fnInfo();
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
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          if (!!!vm.ruleForm.mobile) {
            vm.fnOpenMessageBox(
              vm.$t("transaction_pass.resetPassErrInfo.beforeCode"),
              "error"
            ); // 请先填写手机号
            return false;
          }
          let phone = vm.phoneCode + vm.ruleForm.mobile;
          let params = {
            mobile: phone,
            uId: vm.p.info.user_id
          };
          vm.$main.loading = true;
          console.log(params);
          vm.$api.IBM_ADMIN_UPDATEOPT(params).then(res => {
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
.member_list_phone {
  .el-dialog__header {
    display: none !important;
  }
  .reset_select {
    width: 0.9rem;
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
