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
        <!-- 上级ID -->
        <el-form-item :label="$t('admin_feedback.oldLadderID')">
          <div>{{ parentId }}</div>
        </el-form-item>
        <!-- 新上级ID -->
        <el-form-item :label="$t('admin_feedback.ladderID')">
          <el-input :placeholder="$t('admin_feedback.ladderID_reg')" v-model="ruleForm.parUserId"></el-input>
        </el-form-item>
        <!-- 转入用户名 -->
        <el-form-item :label="$t('asset_transfer.trans_in_name')">
          <span v-show="toUserName" style="padding-right: 10px;">{{ toUserName }}</span>
          <!-- 查询 -->
          <el-button @click="fnFinduserName">{{ $t('asset_transfer.query') }}</el-button>
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
  name: "member_list_ladder",
  mixins: [WatchScreen, GetUserInfo, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      parentId: '',
      ruleForm: {
        parUserId: "" // 新上级ID
      },
      rules: {},
      toUserName: ""
    };
  },
  components: {},
  mounted: function() {
    let vm = this;
    vm.fnInit();
    vm.fnGetData();
  },
  methods: {
    // 查询用户上级ID
    fnGetData() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api
        .IBM_ADMIN_QUERYLADDER({
          user_id: vm.p.info.user_id
        })
        .then(res => {
          vm.$main.loading = false;
          vm.parentId = res.data.userIdParent;
        });
    },
    // 根据id查询用户名
    fnFinduserName() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api
        .IBM_USER_USERNAMECOMPLETION({
          str: vm.ruleForm.parUserId
        })
        .then(res => {
          vm.$main.loading = false;
          if (res.code == 0) {
            vm.toUserName = res.data.username;
          } else {
            vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
          }
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
        });
    },
    // 页面初始化
    fnInit() {
      let vm = this;
      // 获取个人用户信息
      //   vm.fnInfo();
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          if (!!!vm.ruleForm.parUserId.length) {
            vm.fnOpenMessageBox(vm.$t("admin_feedback.ladderID_reg"), "error"); // 请输入父级ID
            return false;
          }
          let params = {
            parUserId: vm.ruleForm.parUserId,
            subUserId: vm.p.info.user_id
          };
          vm.$main.loading = true;
          vm.$api.IBM_ADMIN_LADDER(params).then(res => {
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
.member_list_ladder {
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
