<template>
  <transition name="fade">
    <div class="admin_home" style="overflow: hidden;">
      <!-- 首页 -->
      <div class="item_title">{{ $t('admin.admin_home') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <el-row>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 历史总充值金额 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.total1') }}</div>
                <div class="box_bottom">
                  <p>{{ (all_recharge||0)|FORMATTED_NUMBER }}</p>
                </div>
              </div>
            </el-col>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 上月总充值金额 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.total2') }}</div>
                <div class="box_bottom">
                  <p>{{ (front_recharge||0)|FORMATTED_NUMBER }}</p>
                </div>
              </div>
            </el-col>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 本月总充值金额 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.total3') }}</div>
                <div class="box_bottom">
                  <p>{{(thiss_recharge||0)|FORMATTED_NUMBER}}</p>
                </div>
              </div>
            </el-col>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 历史总出金金额 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.total4') }}</div>
                <div class="box_bottom">
                  <p>{{(all_withdraw||0)|FORMATTED_NUMBER}}</p>
                </div>
              </div>
            </el-col>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 上月总出金金额 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.total5') }}</div>
                <div class="box_bottom">
                  <p>{{(front_withdraw||0)|FORMATTED_NUMBER}}</p>
                </div>
              </div>
            </el-col>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 本月总出金金额 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.total6') }}</div>
                <div class="box_bottom">
                  <p>{{(thiss_withdraw||0)|FORMATTED_NUMBER}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 历史总注册人数 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.total7') }}</div>
                <div class="box_bottom">
                  <p>{{ (all_user||0) }}</p>
                </div>
              </div>
            </el-col>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 上月总注册人数 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.total8') }}</div>
                <div class="box_bottom">
                  <p>{{ (front_user||0) }}</p>
                </div>
              </div>
            </el-col>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 本月总注册人数 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.total9') }}</div>
                <div class="box_bottom">
                  <p>{{ (thiss_user||0) }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 时间选择 -->
          <el-row>
            <el-col
              style="padding:10px; padding-bottom: 0px;"
              :span="24"
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="24"
            >
              <TableDate format="yyyy-MM-dd" @changeDate="changeDataByDate"></TableDate>
              <div class="sel_label" style="overflow:hidden;">
                <!-- 用户名或ID -->
                <el-input
                  style="width: 2rem;"
                  class="sel_input"
                  v-model="username"
                  :placeholder="$t('common.username')"
                ></el-input>
                <!-- 搜索 -->
                <el-button @click="fnGetData" class="sel_btn" type="primary">{{ $t('common.search') }}</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 自定义周期总充值金额 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.diy_total1') }}</div>
                <div class="box_bottom">
                  <p>{{ (recharge||0)|FORMATTED_NUMBER }}</p>
                </div>
              </div>
            </el-col>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 自定义周期总出金金额 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.diy_total2') }}</div>
                <div class="box_bottom">
                  <p>{{ (withdraw||0)|FORMATTED_NUMBER }}</p>
                </div>
              </div>
            </el-col>
            <el-col style="padding:10px;" :span="24" :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
              <div class="box">
                <!-- 自定义周期总注册人数 -->
                <div class="box_top">{{ $t('admin_home.inventoryList.diy_total3') }}</div>
                <div class="box_bottom">
                  <p>{{ (user||0) }}</p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import comData from "@/utils/data.js";
import MyValidate from "@/mixins/myValidate.js";
import WatchScreen from "@/mixins/watchScreen.js";
import TableDate from "@/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
export default {
  name: "admin_home",
  mixins: [WatchScreen],
  inject: ["$main"],
  components: {
    TableDate
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      username: "",
      all_recharge: "", // 历史总充值金额
      front_recharge: "", // 上月总充值金额
      thiss_recharge: "", // 本月总充值金额
      all_withdraw: "", // 历史总出金金额
      front_withdraw: "", // 上月总出金金额
      thiss_withdraw: "", // 本月总出金金额
      all_user: "", // 历史总注册人数
      front_user: "", // 上月总注册人数
      thiss_user: "", // 本月总注册人数
      recharge: "", // 自定义周期总充值金额
      user: "", // 自定义周期总注册人数
      withdraw: "" // 自定义周期总出金金额
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
    vm.fnInit();
  },
  methods: {
    // 获取数据
    fnInit() {
      let vm = this;
      vm.$main.loading = true;
      vm.$api.IBM_ADMIN_QUERYRECHARGE().then(res => {
        vm.$main.loading = false;
        vm.all_recharge = res.data.all.recharge;
        vm.front_recharge = res.data.front.recharge;
        vm.thiss_recharge = res.data.thiss.recharge;
        vm.all_withdraw = res.data.all.withdraw;
        vm.front_withdraw = res.data.front.withdraw;
        vm.thiss_withdraw = res.data.thiss.withdraw;
        vm.all_user = res.data.all.user;
        vm.front_user = res.data.front.user;
        vm.thiss_user = res.data.thiss.user;
      });
    },
    // 获取数据
    fnGetData(type) {
      let vm = this;
      let params = {
        startTime: vm.startTime,
        endTime: vm.endTime,
        username: vm.username
      };
      vm.$main.loading = true;
      vm.$api.IBM_ADMIN_RECHARGECUSTOM(params).then(res => {
        vm.$main.loading = false;
        if (res.code == 0) {
          vm.recharge = res.data.recharge;
          vm.user = res.data.user;
          vm.withdraw = res.data.withdraw;
        }
      });
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.startTime = formDate(data.startTime, 2);
      vm.endTime = formDate(data.endTime, 2);
      vm.fnGetData();
    }
  }
};
</script>
<style lang="scss">
.admin_home {
  .box {
    // border: 1px solid #1e4758;
    background: #004994;
    font-size: 0.14rem;
    .box_top {
      color: #fff;
      background: #004994;
      text-align: center;
      line-height: 60px;
    }
    .box_bottom {
      height: 60px;
      width: 100%;
      p {
        text-align: center;
        line-height: 60px;
        color: #fa7951;
      }
    }
  }
}
</style>
