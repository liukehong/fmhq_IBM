<template>
  <div class="item_table_box">
    <el-form
      style="padding-left: .2rem;"
      :model="ruleForm"
      :rules="rules"
      :label-position="screenSize == 1?'left':'top'"
      ref="ruleForm"
      label-width="1.6rem"
      class="demo-ruleForm item_form"
    >
      <!-- 可提现金额 -->
      <el-form-item :label="$t('product_out.use_money')">
        <div>{{ p.item.mt4Out }}</div>
      </el-form-item>
      <!-- 提现金额 -->
      <el-form-item :label="$t('product_out.sel_money')">
        <el-input-number
          v-model="ruleForm.money"
          :min="0"
          :max="p.item.mt4Out"
          :label="$t('product_out.sel_money')"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <!-- 返回 -->
        <el-button @click="p.pageType = 'list'">{{ $t('system_container.back') }}</el-button>
        <!-- 提交 -->
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('common.submit') }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 注意事项 -->
    <p
      style="margin-top: .3rem; padding-left: .2rem; padding-right: .2rem;"
      class="line"
    >{{ $t('product_setting.tips_tit') }}</p>
    <!-- 周一至周五为交易日，在交易期间不能提款 MT4盈利，请在周末进行提款。 -->
    <p
      style="font-size: .12rem; padding-top: .1rem; padding-bottom: .2rem; padding-left: .2rem; padding-right: .2rem;"
      class="line"
    >1. {{ $t('product_out.tips1') }}</p>
  </div>
</template>
<script>
import WatchScreen from "@/mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "Product_withdrawa",
  mixins: [WatchScreen,MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      ruleForm: {
        money: 0, // 金额
        id: this.p.item.id
      },
      rules: {}
    };
  },
  mounted: function() {},
  methods: {
    // 二级密码验证
    fnPassAgain() {
      let vm = this;
      return new Promise(function(resolve, reject) {
        vm.$prompt(
          vm.$t("system_container.please_two_pass"),
          vm.$t("system_container.tips"),
          {
            confirmButtonText: vm.$t("system_container.ok"), // 确定
            cancelButtonText: vm.$t("system_container.no"), // 取消
            inputType: 'password',
            center: true,
            confirmButtonClass: 'newClass',
            inputPlaceholder: vm.$t("system_container.please_two_pass"),
            showCancelButton: false,
          }
        )
          .then(({ value }) => {
            vm.$main.loading = true;
            // 驳回
            vm.$api
              .IBM_UTILS_SECURITYPASSWORD({
                securityPassword: value
              })
              .then(res => {
                if (res.code == 0) {
                  // 表单提交
                  resolve(res.code);
                } else {
                  vm.$main.loading = false;
                  vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`),'error')
                  reject(res.code);
                }
              });
          })
          .catch(() => {});
      });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, vm.ruleForm);
          if(vm.ruleForm.money>0){
          }else{
            vm.fnOpenMessageBox(vm.$t('product_setting.text1'),'error')
          }
          vm.fnPassAgain()
            .then(code => {
              if (code == 0) {
                vm.$api.IBM_USER_GETCOLD(params).then(res => {
                  vm.$main.loading = false;
                  if (res.code == 0) {
                    vm.fnOpenMessageBox(vm.$t("product_setting.handleErrInfo.withdraw"),'success')
                    vm.p.pageType = 'list'
                  } else {
                    vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`),'error')
                  }
                });
              }
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
</style>
