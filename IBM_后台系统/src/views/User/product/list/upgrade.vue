<template>
  <div class="item_list_box Product_upgrade">
    <el-form
      :model="ruleForm"
      :rules="rules"
      :label-position="screenSize == 1?'left':'top'"
      ref="ruleForm"
      label-width="1.6rem"
      class="demo-ruleForm item_form Product_upgrade"
    >
      <!-- 当前配套 -->
      <el-form-item :label="$t('product_upgrade.now_product')">
        <div>{{ p.item.money == 0?'-':'IBM'+ p.item.money}}</div>
      </el-form-item>
      <!-- 配套选择 -->
      <el-form-item :label="$t('new_members.product')">
        <el-select
          v-model="ruleForm.matId"
          :placeholder="$t('new_members.product')"
          @change="fnChange"
        >
          <el-option
            v-for="item in matchingList"
            :key="item.id"
            :value="item.id"
            :label="item.name+'  '+item.money"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 支付金额 -->
      <el-form-item :label="$t('product_upgrade.pay_money')">
        <div>{{ pay|FORMATTED_NUMBER }}</div>
      </el-form-item>
      <!-- 现金钱包 -->
      <el-form-item :label="$t('wallet.cash')">
        <el-input-number v-model="ruleForm.cp" controls-position="left" :min="0" :max="max_cp"></el-input-number>
        <span class="moneyBox">{{ cp|FORMATTED_NUMBER }}</span>
      </el-form-item>
      <!-- 电子钱包 -->
      <el-form-item v-if="os_type != 2" :label="$t('wallet.ele')">
        <el-input-number v-model="ruleForm.ap" controls-position="left" :min="0" :max="max_ap"></el-input-number>
        <span class="moneyBox">{{ ap|FORMATTED_NUMBER }}</span>
      </el-form-item>
      <!-- 注册钱包 -->
      <el-form-item :label="$t('wallet.reg')">
        <el-input-number v-model="ruleForm.rp" controls-position="left" :min="0" :max="max_rp"></el-input-number>
        <span class="moneyBox">{{ rp|FORMATTED_NUMBER }}</span>
      </el-form-item>
      <!-- 获取验证码方式 -->
      <el-form-item :label="$t('other.text1')">
        <el-radio-group v-model="sendCodeType">
          <el-radio :label="1">{{ $t('other.text2') }}</el-radio>
          <el-radio :label="2">{{ $t('register.email') }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 当前手机号 -->
      <el-form-item :label="sendCodeType == 1?$t('phone_manage.now_manage'):$t('other.text3')">
        <div>{{ sendCodeType == 1?user.mobile:curEmail }}</div>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item :label="$t('transaction_pass.code')">
        <el-input :placeholder="$t('transaction_pass.code')" v-model="ruleForm.phoneCord">
          <template slot="append">
            <GetCode :apiUrl="sendCodeType == 1?'IBM_UTILS_MOBILECODE':'IBM_UTILS_SENDMAILCODE'" :mobile="user.mobile"></GetCode>
          </template>
        </el-input>
      </el-form-item>
      <div style="margin-bottom: .4rem; padding-top: .2rem;">
        <!-- 我已阅读并接受 -->
        <el-checkbox v-model="checked">{{ $t('product_input.read_agree') }}</el-checkbox>
        <!-- 《风险披露声明》 -->
        <a
          :href="myUrl"
          target="view_window"
          style="font-size: 14px; color: #409EFF; cursor:pointer; textDecoration:none;"
        >{{ $t('product_input.read1') }}</a>
      </div>
      <el-form-item>
        <!-- 返回 -->
        <el-button @click="p.pageType = 'list'">{{ $t('system_container.back') }}</el-button>
        <!-- 提交 -->
        <el-button :disabled="!!!checked" type="primary" @click="submitForm('ruleForm')">{{ $t('common.submit') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
import GetCode from "@/components/GetCode";
import comData from "@/utils/data.js";
import MessageBox from "@/mixins/messageBox.js";
import floatNumber from "@/utils/floatNumber.js";
export default {
  name: "Product_upgrade", // 配套升级
  mixins: [WatchScreen, GetUserInfo,MessageBox],
  inject: ["p", "$main"],
  components: {
    GetCode
  },
  data() {
    return {
      sendCodeType: 1, // 1 手机号 2邮箱
      curEmail: "", // 当前邮箱
      os_type: comData.os_type,
      myUrl: `${comData.src}/static/files/GENERAL_RISK__DISCLOSURE.pdf`,
      matchingList: [],
      ap: "1",
      cp: "1",
      rp: "1",
      money: 0,
      checked: false,
      user: {
        mobile: "" // 手机号
      },
      ruleForm: {
        matId: "", // 配套ID
        phoneCord: "", // 验证码
        cp: 0,
        ap: 0,
        rp: 0,
        mt4id: this.p.item.id
      },
      rules: {}
    };
  },
  computed: {
    pay: function() {
      if (!!!this.money) {
        return 0;
      } else {
        return this.money - this.p.item.money;
      }
    },
    max_cp: function() {
      if (this.pay < this.cp) {
        return this.pay;
      } else {
        return this.cp;
      }
    },
    max_ap: function() {
      if (this.pay / 2 < this.cp) {
        return this.pay / 2;
      } else {
        return this.ap;
      }
    },
    max_rp: function() {
      if (this.pay < this.rp) {
        return this.pay;
      } else {
        return this.rp;
      }
    }
  },
  mounted: function() {
    let vm = this;
    vm.fnInit();
  },
  methods: {
    // 计算当前选中的套餐的价格
    fnChange(val) {
      let vm = this;
      for (var i = 0, item; (item = vm.matchingList[i++]); ) {
        if (item.id == val) {
          vm.money = item.money;
        }
      }
    },
    // 页面初始化
    fnInit() {
      let vm = this;
      // 获取基本信息
      vm.$main.loading = true;
      vm.fnGetNewInfo().then(res => {
        vm.$main.loading = false;
        vm.ap = res.ap;
        vm.cp = res.cp;
        vm.rp = res.rp;
        vm.user.mobile = res.mobile;
        vm.curEmail = res.email;
      });
      // 获取配套信息
      vm.$api.IBM_MAT_INFO().then(res => {
        let list = [];
        if (res.code == 0) {
          for (var i = 0, item; (item = res.data[i++]); ) {
            if (item.money > 0) {
              if (item.money > vm.p.item.money) {
                list.push(item);
              }
            }
          }
          vm.matchingList = list;
        }
      });
    },
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
          // money范围
          debugger
          if (
            // vm.ruleForm.cp + vm.ruleForm.ap + vm.ruleForm.rp !=
            // vm.money - vm.p.item.money
            floatNumber.add(floatNumber.add(vm.ruleForm.ap||0,vm.ruleForm.cp||0),vm.ruleForm.rp||0) != vm.money - vm.p.item.money
          ) {
            console.log(
              floatNumber.add(floatNumber.add(vm.ruleForm.ap||0,vm.ruleForm.cp||0),vm.ruleForm.rp||0)
            );
            vm.fnOpenMessageBox(vm.$t("product_input.setProductErrInfo.money"),'error') // 输入金额与总支付金额不符
            return false;
          }
          let params = {
            matId: vm.ruleForm.matId,
            money: vm.money - vm.p.item.money,
            cp: vm.ruleForm.cp,
            ap: vm.ruleForm.ap,
            rp: vm.ruleForm.rp,
            phoneCord: vm.ruleForm.phoneCord,
            mt4id: vm.ruleForm.mt4id
          };
          console.log(params);
          vm.fnPassAgain()
            .then(code => {
              if (code == 0) {
                vm.$api.IBM_MAT_UPGRADE(params).then(res => {
                  vm.$main.loading = false;
                  if (res.code == 0) {
                    vm.fnOpenMessageBox(vm.$t("product_upgrade.setProductErrInfo.success"),'success');
                    vm.p.pageType = 'list';
                  } else {
                    vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`),'error')
                  }
                });
              }
            })
            .catch(err => []);
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.Product_upgrade {
  .el-input-number__increase {
    right: 0px !important;
  }
}
.moneyBox {
  background: #32a8ee;
  display: inline-block;
  height: 40px;
  width: 1.2rem;
  text-align: center;
}
.Product_upgrade .el-input-number__increase {
  border-radius: 0px;
}
.Product_upgrade .el-checkbox {
  margin-right: 0px;
}
</style>
