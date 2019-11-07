<template>
  <transition name="fade">
    <div class="member_reg" style="overflow: hidden;">
      <!-- 注册新会员 -->
      <div class="item_title">{{ $t('user.new_members') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <el-form
            :model="ruleForm"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.6rem"
            class="demo-ruleForm item_form"
          >
            <!-- 用户名 -->
            <el-form-item :label="$t('personal_profile.username')">
              <el-input :placeholder="$t('personal_profile.username')" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item :label="$t('new_members.pass')" prop="password">
              <el-input
                type="password"
                :placeholder="$t('new_members.pass')"
                v-model="ruleForm.password"
              ></el-input>
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item :label="$t('new_members.cfmpass')" prop="password1">
              <el-input
                type="password"
                :placeholder="$t('new_members.cfmpass')"
                v-model="ruleForm.password1"
              ></el-input>
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item :label="$t('new_members.phone')">
              <!-- 请选择 -->
              <el-input :placeholder="$t('new_members.phone')" v-model="ruleForm.mobile">
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
            <!-- 邮箱 -->
            <el-form-item :label="$t('new_members.email')">
              <el-input :placeholder="$t('new_members.email')" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <!-- 性别 -->
            <el-form-item :label="$t('new_members.sex')">
              <el-radio-group v-model="ruleForm.sex">
                <!-- 男 -->
                <el-radio :label="1">{{ $t('new_members.male') }}</el-radio>
                <!-- 女 -->
                <el-radio :label="0">{{ $t('new_members.female') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 英文名 -->
            <el-form-item :label="$t('new_members.englishName')">
              <el-input :placeholder="$t('new_members.englishName')" v-model="ruleForm.englishName"></el-input>
            </el-form-item>
            <!-- 真实姓名 -->
            <el-form-item :label="$t('new_members.name')">
              <el-input :placeholder="$t('new_members.name')" v-model="ruleForm.name"></el-input>
            </el-form-item>
            <!-- 证件类型 -->
            <el-form-item :label="$t('new_members.cardtype')">
              <el-radio-group v-model="ruleForm.cardType">
                <!-- 身份证 -->
                <el-radio :label="1">{{ $t('new_members.id_card') }}</el-radio>
                <!-- 护照 -->
                <el-radio :label="0">{{ $t('new_members.passport') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 证件号码 -->
            <el-form-item :label="$t('new_members.idNo')">
              <el-input :placeholder="$t('new_members.idNo')" v-model="ruleForm.cardNum"></el-input>
            </el-form-item>
            <!-- 配套选择 -->
            <el-form-item :label="$t('new_members.product')" prop="matId">
              <el-select
                @change="fnSelectChange"
                v-model="ruleForm.matId"
                :placeholder="$t('new_members.product')"
              >
                <el-option
                  v-for="item in matchingList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name+'  '+item.money"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 现金钱包 -->
            <el-form-item :label="$t('wallet.cash')">
              <el-input-number v-model="ruleForm.cp" controls-position="left" :min="0" :max="+cp"></el-input-number>
              <span class="moneyBox">{{ cp|FORMATTED_NUMBER }}</span>
            </el-form-item>
            <!-- 电子钱包 -->
            <el-form-item v-if="os_type != 2" :label="$t('wallet.ele')">
              <el-input-number v-model="ruleForm.ap" controls-position="left" :min="0" :max="+ap"></el-input-number>
              <span class="moneyBox">{{ ap|FORMATTED_NUMBER }}</span>
            </el-form-item>
            <!-- 注册钱包 -->
            <el-form-item :label="$t('wallet.reg')">
              <el-input-number v-model="ruleForm.rp" controls-position="left" :min="0" :max="+rp"></el-input-number>
              <span class="moneyBox">{{ rp|FORMATTED_NUMBER }}</span>
            </el-form-item>
            <el-form-item>
              <!-- 提交 -->
              <el-button type="primary" @click="submitForm('ruleForm')">{{$t('login.forget_btn')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
import comData from "@/utils/data.js";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "member_reg",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("new_members.regErr.password")); // 两次输入密码不一致
      } else if (value !== this.ruleForm.password) {
        callback(new Error("new_members.regErr.password")); // 两次输入密码不一致
      } else {
        callback();
      }
    };
    return {
      os_type: 1,
      phoneCode: "+86",
      ap: "1",
      cp: "1",
      rp: "1",
      matchingList: [],
      list: comData.phone,
      ruleForm: {
        username: "",
        sex: 1, // 性别 1男 2女
        englishName: "", // 英文名
        name: "", // 真实姓名
        cardType: 1, // 证件类型
        cardNum: "", // 证件号码
        password: "",
        password1: "",
        email: "",
        mobile: "",
        cp: "",
        ap: "",
        rp: "",
        matId: "",
        money: ""
      },
      rules: {
        // 请输入密码
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password1: [{ validator: validatePass2, trigger: "blur" }],
        // 请选择配套
        matId: [
          {
            type: "number",
            required: true,
            message: "new_members.regErr.product.selOn",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted: function() {
    let vm = this;
    vm.os_type = comData.os_type;
    vm.fnPhoneType();
    vm.fnInit();
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
    fnSelectChange(data) {
      let vm = this;
      for (var i = 0; i < vm.matchingList.length; i++) {
        if (vm.matchingList[i].id == data) {
          vm.ruleForm.money = vm.matchingList[i].money;
        }
      }
    },
    // 页面初始化
    fnInit() {
      let vm = this;
      // 查询用户钱包信息
      vm.$main.loading = true;
      vm.$api.IBM_MAT_ASSETS().then(res => {
        vm.$main.loading = false;
        if (res.code == 0) {
          vm.ap = res.data.ap;
          vm.cp = res.data.cp;
          vm.rp = res.data.rp;
        }
      });
      // 获取配套信息
      vm.$api.IBM_MAT_INFO().then(res => {
        let list = [];
        if (res.code == 0) {
          for (var i = 0, item; (item = res.data[i++]); ) {
            if (item.money > 0) {
              list.push(item);
            }
          }
          vm.matchingList = list;
        }
      });
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      let params = Object.assign({}, vm.ruleForm);
      params.mobile = vm.phoneCode + params.mobile;
      delete params.password1;
      console.log(params);
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          vm.$main.loading = true;
          vm.$api.IBM_REGISTER_REGSUB(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("new_members.regErr.success"),
                "success"
              );
              vm.$router.push(comData.conutry_type + "/user/home");
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
.member_reg {
  .el-input-number__increase {
    right: -4px !important;
    border-radius: 0px !important;
  }
  .reset_select {
    width: 0.9rem;
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
    color: #fff;
  }
}
</style>
