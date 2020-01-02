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
      <!-- 基本信息 -->
      <div class="item_box_title">{{ $t('personal_profile.baseInfo') }}</div>
      <div class="item_list_box" style=" padding-top: .1rem; padding-bottom: 0px; max-width: 6rem;">
        <!-- 用户名 -->
        <el-form-item :label="$t('member_list.username')+'：'">
          <div>{{ user.username }}</div>
        </el-form-item>
        <!-- 真实姓名 -->
        <el-form-item :label="$t('personal_profile.name')+'：'">
          <el-input :placeholder="$t('personal_profile.name')" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- 英文名 -->
        <el-form-item :label="$t('personal_profile.englishName')+'：'">
          <el-input
            :placeholder="$t('personal_profile.englishName')"
            v-model="ruleForm.englishName"
          ></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item :label="$t('personal_profile.sex')+'：'">
          <el-radio-group v-model="ruleForm.sex">
            <!-- 男 -->
            <el-radio :label="1">{{ $t('personal_profile.male') }}</el-radio>
            <!-- 女 -->
            <el-radio :label="0">{{ $t('personal_profile.female') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item :label="$t('personal_profile.mobile')+'：'">
          <div>{{ user.mobile }}</div>
        </el-form-item>
      </div>
    </div>
    <div class="item_box" style="margin-bottom: .2rem;">
      <!-- 身份信息 -->
      <div class="item_box_title">{{ $t('personal_profile.identityInfo') }}</div>
      <div class="item_list_box" style=" padding-top: .1rem; padding-bottom: 0px; max-width: 6rem;">
        <!-- 证件类型 -->
        <el-form-item :label="$t('personal_profile.cardType')+'：'">
          <el-select v-model="ruleForm.cardType" :placeholder="$t('personal_profile.cardType')">
            <!-- 身份证 -->
            <el-option value="1" :label="$t('personal_profile.id_card')"></el-option>
            <!-- 护照 -->
            <!-- <el-option value="0" :label="$t('personal_profile.passport')"></el-option> -->
            <el-option
              :value="ruleForm.cardType!=1?ruleForm.cardType:0"
              :label="$t('personal_profile.passport')"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 证件号码 -->
        <el-form-item :label="$t('personal_profile.cardNum')+'：'">
          <el-input :placeholder="$t('personal_profile.cardNum')" v-model="ruleForm.cardNum"></el-input>
        </el-form-item>
        <!-- 证件正面 -->
        <el-form-item :label="$t('idcard_upload.card_just')+'：'">
          <Upload
            parentName="member_list_info"
            pathName="ruleForm.cardUrlJust"
            :imageUrl="ruleForm.cardUrlJust"
          ></Upload>
        </el-form-item>
        <!-- 证件反面 -->
        <el-form-item :label="$t('idcard_upload.card_back')+'：'">
          <Upload
            parentName="member_list_info"
            pathName="ruleForm.cardUrlBack"
            :imageUrl="ruleForm.cardUrlBack"
          ></Upload>
        </el-form-item>
        <!-- 国家 -->
        <el-form-item :label="$t('personal_profile.countries')+'：'">
          <el-select
            v-model="ruleForm.country"
            :placeholder="$t('personal_profile.countries')"
            @change="(code)=>{fnChangeCity(1,code)}"
          >
            <el-option
              v-for="item in country"
              :key="item.code"
              :label="lanType == 'zh'?item.areaName:item.englishName"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 省份 -->
        <el-form-item :label="$t('personal_profile.provinces')+'：'">
          <el-select
            v-model="ruleForm.province"
            :placeholder="$t('personal_profile.provinces')"
            @change="(code)=>{fnChangeCity(2,code)}"
          >
            <el-option
              v-for="item in province"
              :key="item.code"
              :label="lanType == 'zh'?item.areaName:item.englishName"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 城市 -->
        <el-form-item :label="$t('personal_profile.city')+'：'">
          <el-select v-model="ruleForm.city" :placeholder="$t('personal_profile.city')">
            <el-option
              v-for="item in city"
              :key="item.code"
              :label="lanType == 'zh'?item.areaName:item.englishName"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 地址 -->
        <el-form-item :label="$t('personal_profile.address')+'：'">
          <el-input
            :placeholder="$t('personal_profile.address')"
            type="textarea"
            v-model="ruleForm.address"
          ></el-input>
        </el-form-item>
      </div>
    </div>
    <div class="item_box" style="margin-bottom: .2rem;">
      <!-- 钱包信息 -->
      <div class="item_box_title">{{ $t('personal_profile.walletInfo') }}</div>
      <div class="item_list_box" style=" padding-top: .1rem; padding-bottom: 0px; max-width: 6rem;">
        <!-- 注册钱包 -->
        <el-form-item :label="$t('wallet.reg')+'：'">
          <div>{{ user.rp }}</div>
        </el-form-item>
        <!-- 电子钱包 -->
        <el-form-item :label="$t('wallet.ele')+'：'">
          <div>{{ user.ap }}</div>
        </el-form-item>
        <!-- 现在钱包 -->
        <el-form-item :label="$t('wallet.cash')+'：'">
          <div>{{ user.cp }}</div>
        </el-form-item>
        <!-- BTC地址 -->
        <el-form-item :label="$t('personal_profile.btc_addr')+'：'">
          <el-input :placeholder="$t('personal_profile.btc_addr')" v-model="ruleForm.btc"></el-input>
        </el-form-item>
        <!-- ETH地址 -->
        <el-form-item :label="$t('personal_profile.eth_addr')+'：'">
          <el-input :placeholder="$t('personal_profile.eth_addr')" v-model="ruleForm.eth"></el-input>
        </el-form-item>
        <!-- USDT地址 -->
        <el-form-item :label="$t('personal_profile.usdt_addr')+'：'">
          <el-input :placeholder="$t('personal_profile.usdt_addr')" v-model="ruleForm.usdt"></el-input>
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
      <!-- 审核 -->
      <el-dialog
        :modal-append-to-body="false"
        :title="$t('personal_profile.audit')"
        :visible.sync="dialogVisible1"
        :width="screenSize == 1?'40%':'90%'"
      >
        <el-form
          :model="ruleForm1"
          :label-position="screenSize == 1?'left':'top'"
          ref="ruleForm1"
          label-width="1.6rem"
          class="demo-ruleForm item_form"
        >
          <!-- 操作 -->
          <el-form-item :label="$t('asset_info.handle')">
            <!-- 审核状态 -->
            <!-- 0 未通过 -->
            <!-- 2 审核通过 -->
            <!-- <el-select v-model="ruleForm1.type" :placeholder="$t('withdraw_audit.withdraw_status')">
              <el-option :value="0" :label="$t('member_list.status.0')"></el-option>
              <el-option :value="2" :label="$t('member_list.status.2')"></el-option>
            </el-select>-->
            <el-radio v-model="ruleForm1.type" :label="0">{{ $t('member_list.status.0') }}</el-radio>
            <el-radio v-model="ruleForm1.type" :label="2">{{ $t('member_list.status.2') }}</el-radio>
          </el-form-item>
          <!-- 原因 (ZH-CN) -->
          <el-form-item :label="$t('withdraw_audit.reason')+'(ZH-CN)'">
            <el-input
              :placeholder="$t('withdraw_audit.reason')+'(ZH-CN)'"
              type="textarea"
              v-model="ruleForm1.reason"
            ></el-input>
          </el-form-item>
          <!-- 原因 (ZH-EN) -->
          <el-form-item :label="$t('withdraw_audit.reason')+'(ZH-EN)'">
            <el-input
              :placeholder="$t('withdraw_audit.reason')+'(ZH-EN)'"
              type="textarea"
              v-model="ruleForm1.reasonEnglish"
            ></el-input>
          </el-form-item>

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
                  v-if="!!dialogVisible1"
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
          <!-- 取 消 -->
          <el-button @click="dialogVisible1 = false">{{ $t('system_container.no') }}</el-button>
          <!-- 确 定 -->
          <el-button type="primary" @click="fnDoSome">{{ $t('el.colorpicker.confirm') }}</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 提交 -->
    <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('login.forget_btn') }}</el-button>
    <!-- 登录会员系统 -->
    <el-button type="primary" @click="fnEnterUserManage">{{ $t('personal_profile.login_user') }}</el-button>
    <!-- 审核 -->
    <!-- v-if="user.status == 1" -->
    <el-button v-if="user.status == 1" type="primary" @click="fnExamine">{{ $t('personal_profile.audit') }}</el-button>
    <!-- 返回 -->
    <el-button
      :class="screenSize == 1?'':'butStyle'"
      @click="fnReturn"
    >{{ $t('system_container.back') }}</el-button>
  </el-form>
</template>

<script>
import Upload from "@/components/Upload";
import WatchScreen from "../../../mixins/watchScreen.js";
import GetUserInfo from "../../../mixins/getUserInfo.js";
import MessageBox from "@/mixins/messageBox.js";
import comData from "@/utils/data.js";
import GetCode from "@/components/GetCode1";
export default {
  name: "member_list_info",
  mixins: [WatchScreen, GetUserInfo, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      phone: "",
      sendCodeType: 1, // 1 手机号 2邮箱
      dept: "",
      phoneCord: "",

      codeNull: false,
      sendCodeType1: 1, // 1 手机号 2邮箱
      phoneCord1: "",

      lanType: "zh", // zh中文 en英文 jp日文
      dialogVisible1: false,
      user: {
        username: "", // 用户名
        rp: "", // 注册钱包
        ap: "", // 电子钱包
        cp: "", // 现金钱包
        mobile: "", // 手机号
        status: "" // 审核状态
      },
      ruleForm: {
        name: "", // 真实姓名
        englishName: "", // 英文名
        cardType: "", // 证件类型
        cardNum: "", // 卡号
        cardUrlJust: "", // 身份证正面
        cardUrlBack: "", // 身份证反面
        sex: "", // 性别
        country: "", // 国家
        province: "", // 省份
        city: "", // 市
        address: "", // 详细地址
        btc: "", // btc地址
        eth: "", // eth地址
        usdt: "", // usdt地址
        type: 0,
        userId: "" // 用户id
      },
      ruleForm1: {
        type: 0, // 0未通过  2通过
        reason: "",
        reasonEnglish: ""
      },
      rules: {},
      country: [], // 国家列表
      province: [], // 省份列表
      city: [], // 城市列表
      code: "" // 验证码
    };
  },
  components: {
    Upload,
    GetCode
  },
  mounted: function() {
    let vm = this;
    vm.dept = vm.$main.userInfo.deptId;
    vm.phone = vm.$main.userInfo.mobile;
    if (window.localStorage.getItem("locale")) {
      vm.lanType = window.localStorage.getItem("locale");
    }
    vm.fnInit();
  },
  methods: {
    // 返回列表页
    fnReturn() {
      let vm = this;
      vm.$router.push({ name: "member_list" });
    },
    // 打开模态框
    fnExamine() {
      let vm = this;

      // 打开模特框的初始化
      vm.sendCodeType1 = 1;
      vm.phoneCord1 = "";
      vm.codeNull = false;

      vm.dialogVisible1 = true;
    },
    fnDoSome() {
      let vm = this;
      let params = {
        type: vm.ruleForm1.type,
        reason: vm.ruleForm1.reason,
        reasonEnglish: vm.ruleForm1.reasonEnglish,
        user_id: vm.ruleForm.userId
      };
      if (vm.dept == 11) {
        params.security_code = vm.phoneCord1;
        if (!!!vm.phoneCord1) {
          vm.codeNull = true;
        } else {
          dd();
        }
      }else{
        dd();
      }

      function dd() {
        vm.dialogVisible1 = false;
        vm.$main.loading = true;
        vm.$api.IBM_ADMIN_USEREXAMINE(params).then(res => {
          vm.$main.loading = false;
          if (res.code == 0) {
            vm.fnOpenMessageBox(
              vm.$t("withdraw_audit.auditErrInfo.handle"),
              "success"
            );
            vm.fnInit();
          } else {
            vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
          }
        });
      }
    },
    // 登录会员系统
    fnEnterUserManage() {
      let vm = this;
      let params = {
        userId: vm.p.info.user_id
      };
      vm.$main.loading = true;
      vm.$api.IBM_ADMIN_ADMINLOGIN(params).then(res => {
        vm.$main.loading = false;
        if (res.code == 0) {
          window.localStorage.setItem(
            comData.tokenName,
            JSON.stringify(res.data.token)
          ); // 保存token
          window.sessionStorage.setItem("isLogin", "ok"); // 判断是否从登录页进来
          window.localStorage.setItem("userInfo", JSON.stringify(res.data)); // 保存登录信息
          vm.$router.push({ path: comData.conutry_type + "/user/home" });
        } else {
          vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
        }
      });
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
          vm.user.mobile = vm.p.info.mobile;
          keyObj("ruleForm", res.data);
          keyObj("user", res.data);

          // 省份
          if (!!res.data.country) {
            vm.fnGetCityList(1, res.data.country);
          }
          // 城市
          if (!!res.data.province) {
            vm.fnGetCityList(2, res.data.province);
          }
        });
    },
    // 页面初始化
    fnInit() {
      let vm = this;
      // 先获取国家信息
      vm.fnGetCityList(0);
      // 获取个人用户信息
      vm.fnInfo();
    },
    // 获取城市列表数据  type 0 国家 1省份 2城市  code 编码  查询国家不需要编码
    fnGetCityList(type, code = "") {
      let vm = this;
      let arrs = ["country", "province", "city"];
      let ajaxData = {
        id: code || 0,
        type: 1
      };
      vm.$api.IBM_UTILS_LINKAGE(ajaxData).then(res => {
        if (res.code == 0) {
          vm[arrs[type]] = res.data;
        }
      });
    },
    // 城市三级联动select
    fnChangeCity(type, code) {
      // type代表要更新的列表 0国家 1省份 2城市  code 其中获取国家不需要
      let vm = this;
      if (type == 1) {
        vm.province = [];
        vm.city = [];
        vm.ruleForm.province = "";
        vm.ruleForm.city = "";
      } else if (type == 2) {
        vm.city = [];
        vm.ruleForm.city = "";
      }
      vm.fnGetCityList(type, code);
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          // let params = Object.assign({}, vm.ruleForm);
          let params = {};
          for (var key in vm.ruleForm) {
            if (!!vm.ruleForm[key]) {
              params[key] = vm.ruleForm[key];
            }
          }
          params.type = 0;
          params.sex = vm.ruleForm.sex;
          params.btc = vm.ruleForm.btc || "";
          params.usdt = vm.ruleForm.usdt || "";
          params.eth = vm.ruleForm.eth || "";
          if (vm.ruleForm.cardType != 1) {
            params.cardType = 0;
          }
          console.log(params);
          if (vm.dept == 11) {
            params.security_code = vm.phoneCord;
          }
          vm.$main.loading = true;
          vm.$api.IBM_ADMIN_UPDATEUSER(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("personal_profile.setUserInfoErr.success"),
                "success"
              );
              // vm.fnReturn();
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
.member_list_info {
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
  background: #004994;
  font-size: 0.16rem;
  font-weight: bold;
  color: #fff;
  padding-left: 0.5rem;
}
</style>
