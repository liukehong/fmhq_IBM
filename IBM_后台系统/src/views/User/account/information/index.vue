<template>
  <transition name="fade">
    <div style="overflow:hidden;">
      <div class="item_title">{{ $t('user.personal_profile') }}</div>
      <el-form
        :model="ruleForm"
        :label-position="screenSize == 1?'left':'top'"
        ref="ruleForm"
        label-width="1.6rem"
        class="demo-ruleForm item_form"
      >
        <div class="item_box" style="margin-bottom: .2rem;">
          <!-- 基本信息 -->
          <div class="item_box_title">{{ $t('personal_profile.baseInfo') }}</div>
          <div
            class="item_list_box"
            style=" padding-top: .1rem; padding-bottom: 0px; max-width: 6rem;"
          >
            <!-- 真实姓名 -->
            <el-form-item :label="$t('personal_profile.name')+'：'" prop="name">
              <el-input
                v-if="ruleForm.status == 0"
                :placeholder="$t('personal_profile.name')"
                v-model="ruleForm.name"
              ></el-input>
              <div v-if="ruleForm.status != 0">{{ ruleForm.name }}</div>
            </el-form-item>
            <!-- 英文名 -->
            <el-form-item :label="$t('personal_profile.englishName')+'：'" prop="englishName">
              <el-input
                v-if="ruleForm.status == 0"
                :placeholder="$t('personal_profile.englishName')"
                v-model="ruleForm.englishName"
              ></el-input>
              <div v-if="ruleForm.status != 0">{{ ruleForm.englishName }}</div>
            </el-form-item>
            <!-- 性别 -->
            <el-form-item :label="$t('personal_profile.sex')+'：'">
              <el-radio-group v-if="ruleForm.status == 0" v-model="ruleForm.sex">
                <el-radio :label="1">{{ $t('personal_profile.male') }}</el-radio>
                <el-radio :label="0">{{ $t('personal_profile.female') }}</el-radio>
              </el-radio-group>
              <div
                v-if="ruleForm.status != 0"
              >{{ ruleForm.sex == 0?$t('personal_profile.female'):$t('personal_profile.male') }}</div>
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item :label="$t('personal_profile.mobile')+'：'">
              <div>{{ ruleForm.mobile }}</div>
            </el-form-item>
          </div>
        </div>
        <div class="item_box" style="margin-bottom: .2rem;">
          <!-- 身份信息 -->
          <div class="item_box_title">{{ $t('personal_profile.identityInfo') }}</div>
          <div
            class="item_list_box"
            style=" padding-top: .1rem; padding-bottom: 0px; max-width: 6rem;"
          >
            <!-- $t('phone_manage.setPhoneErr.beforeCode') -->
            <!-- 证件类型 -->
            <el-form-item :label="$t('personal_profile.cardType')+'：'">
              <el-select
                v-if="ruleForm.status == 0"
                v-model="ruleForm.cardType"
                :placeholder="$t('personal_profile.cardType')"
              >
                <!-- 身份证 -->
                <el-option value="1" :label="$t('personal_profile.id_card')"></el-option>
                <!-- 护照 -->
                <!-- <el-option value="0" :label="$t('personal_profile.passport')"></el-option> -->
                <el-option
                  :value="ruleForm.cardType!=1?ruleForm.cardType:0"
                  :label="$t('personal_profile.passport')"
                ></el-option>
              </el-select>
              <div
                v-if="ruleForm.status != 0"
              >{{ ruleForm.cardType == 1?$t('personal_profile.id_card'):$t('personal_profile.passport') }}</div>
            </el-form-item>
            <!-- 证件号码 -->
            <el-form-item :label="$t('personal_profile.cardNum')+'：'">
              <el-input
                v-if="ruleForm.status == 0"
                :placeholder="$t('personal_profile.cardNum')"
                v-model="ruleForm.cardNum"
              ></el-input>
              <div v-if="ruleForm.status != 0">{{ ruleForm.cardNum }}</div>
            </el-form-item>
            <!-- 证件正面 -->
            <el-form-item :label="$t('idcard_upload.card_just')+'：'">
              <Upload
                v-if="ruleForm.status == 0"
                parentName="account_information"
                pathName="ruleForm.cardUrlJust"
                :imageUrl="ruleForm.cardUrlJust"
              ></Upload>
              <div v-if="ruleForm.status != 0">
                <img
                  :src="ruleForm.cardUrlJust"
                  alt
                  style="width: 1.78rem; height: 1.78rem; display:block;"
                />
              </div>
            </el-form-item>
            <!-- 证件反面 -->
            <el-form-item :label="$t('idcard_upload.card_back')+'：'">
              <Upload
                v-if="ruleForm.status == 0"
                parentName="account_information"
                pathName="ruleForm.cardUrlBack"
                :imageUrl="ruleForm.cardUrlBack"
              ></Upload>
              <div v-if="ruleForm.status != 0">
                <img
                  :src="ruleForm.cardUrlBack"
                  alt
                  style="width: 1.78rem; height: 1.78rem; display:block;"
                />
              </div>
            </el-form-item>

            <!-- 国家 -->
            <el-form-item :label="$t('personal_profile.countries')+'：'">
              <el-select
                :disabled="ruleForm.status == 0?false:true"
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
                :disabled="ruleForm.status == 0?false:true"
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
              <el-select
                :disabled="ruleForm.status == 0?false:true"
                v-model="ruleForm.city"
                :placeholder="$t('personal_profile.city')"
              >
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
                v-if="ruleForm.status == 0"
                :placeholder="$t('personal_profile.address')"
                type="textarea"
                v-model="ruleForm.address"
              ></el-input>
              <div v-if="ruleForm.status != 0">{{ ruleForm.address }}</div>
            </el-form-item>
            <!-- 获取验证码方式 -->
            <el-form-item :label="$t('other.text1')">
              <el-radio-group v-model="sendCodeType">
                <el-radio :label="1">{{ $t('other.text2') }}</el-radio>
                <el-radio :label="2">{{ $t('register.email') }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item
              :label="$t('login.code')+'：'"
              prop="phoneCord"
              v-if="ruleForm.status == 0"
            >
              <el-input :placeholder="$t('login.code')" v-model="ruleForm.phoneCord">
                <template slot="append">
                  <GetCode :apiUrl="sendCodeType == 1?'IBM_UTILS_SENDMOBILECODE':'IBM_UTILS_SENDMAILCODE'" :mobile="ruleForm.mobile"></GetCode>
                </template>
              </el-input>
            </el-form-item>
            <!-- 状态 -->
            <el-form-item :label="$t('table.status')+'：'">
              <!-- 未通过  审核中  审核通过 -->
              <!-- <div>{{ ruleForm.status == 0?'未通过':ruleForm.status == 1?'审核中':'审核通过' }}</div> -->
              <div>{{ $t(`member_list.status.${ruleForm.status}`) }}</div>
            </el-form-item>
          </div>
        </div>
        <el-button
          v-if="ruleForm.status == 0"
          type="primary"
          @click="submitForm('ruleForm')"
        >{{ $t('login.forget_btn') }}</el-button>
      </el-form>
    </div>
  </transition>
</template>

<script>
import Upload from "@/components/Upload";
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
import GetCode from "@/components/GetCode";
import MyValidate from "@/mixins/myValidate.js";
import MessageBox from "@/mixins/messageBox.js";
import comData from "@/utils/data.js";
export default {
  name: "account_information",
  mixins: [WatchScreen, GetUserInfo, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    return {
      sendCodeType: 1, // 1 手机号 2邮箱
      lanType: "zh", // zh中文 en英文 jp日文
      ruleForm: {
        name: "", // 真实姓名
        englishName: "", // 英文名
        sex: 1, // 性别 1男 2女
        cardType: 1, // 证件类型
        country: "", // 国家
        province: "", // 省份
        city: "", // 城市
        address: "", // 地址
        cardNum: "", // 证件号码
        cardUrlJust: "", // 身份证正面
        cardUrlBack: "", // 身份证反面
        phoneCord: "", // 验证码
        mobile: "", // 手机号
        status: "" // 状态  0未通过  1审核中  2审核通过
      },
      rules: {
        name: [
          {
            required: true,
            message: "register.regErrInfo.name",
            trigger: "blur"
          }
        ],
        englishName: [
          {
            required: true,
            message: "register.regErrInfo.englishName",
            trigger: "blur"
          }
        ],
        phoneCord: [
          {
            required: true,
            message: "phone_manage.setPhoneErr.beforeCode",
            trigger: "blur"
          }
        ]
      },
      country: [], // 国家列表
      province: [], // 省份列表
      city: [] // 城市列表
    };
  },
  components: {
    Upload,
    GetCode
  },
  computed: {},
  created: function() {
    let vm = this;
    vm.fnInit();
  },
  mounted: function() {
    let vm = this;
    if (window.localStorage.getItem("locale")) {
      vm.lanType = window.localStorage.getItem("locale");
    }
  },
  methods: {
    // 页面初始化
    fnInit() {
      let vm = this;
      vm.$main.loading = true;
      // 先获取国家信息
      vm.fnGetCityList(0);
      // 获取个人用户信息
      vm.fnGetNewInfo().then(res => {
        vm.$main.loading = false;
        console.log(res, 1112233);
        function keyObj(name = {}, data = {}) {
          for (let key in vm[name]) {
            vm[name][key] = data[key];
          }
        }
        keyObj("ruleForm", res); // 遍历可修改的信息
        // 省份
        if (!!res.country) {
          vm.fnGetCityList(1, res.country);
        }
        // 城市
        if (!!res.province) {
          vm.fnGetCityList(2, res.province);
        }
      });
    },
    // 获取城市列表数据  type 0 国家 1省份 2城市  code 编码  查询国家不需要编码
    fnGetCityList(type, code = "") {
      let vm = this;
      let arrs = ["country", "province", "city"];
      let ajaxData = {
        id: code || 0,
        type: 2
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
            inputType: "password",
            center: true,
            confirmButtonClass: "newClass",
            inputPlaceholder: vm.$t("system_container.please_two_pass"),
            showCancelButton: false
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
                  vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
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
      let params = {};
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          for (var key in vm.ruleForm) {
            if (!!vm.ruleForm[key]) {
              params[key] = vm.ruleForm[key];
            }
          }
          params.cardType = vm.ruleForm.cardType;
          params.sex = vm.ruleForm.sex;
          if (vm.ruleForm.cardType != 1) {
            params.cardType = 0;
          }
          delete params.status;
          delete params.mobile;
          console.log(params);
          vm.fnPassAgain()
            .then(code => {
              if (code == 0) {
                vm.$api.IBM_USER_UPDATEUSER(params).then(res => {
                  vm.$main.loading = false;
                  if (res.code == 0) {
                    vm.fnOpenMessageBox(
                      vm.$t("personal_profile.setUserInfoErr.success"),
                      "success"
                    );
                    vm.$router.push(comData.conutry_type + "/user/home");
                  } else {
                    vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
                  }
                });
              }
            })
            .catch(err => {});
        } else {
          vm.fnOpenMessageBox(err, "error");
        }
      });
    }
  }
};
</script>

<style lang="scss">
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
