<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <!-- 入金流水列表 -->
      <div class="item_title">{{ $t('admin.recharge_history') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <!-- 时间选择 -->
          <TableDate @changeDate="changeDataByDate"></TableDate>
          <div class="sel_label" style="overflow:hidden;">
            <!-- 请选择 -->
            <el-select
              :class="screenSize == 1?'rem_2':'rem_100'"
              v-model="params.type"
              :placeholder="$t('select.placeholder')"
              @change="changeState"
            >
              <!-- 未支付 -->
              <el-option :label="$t('recharge_list.non_payment')" :value="0"></el-option>
              <!-- 已支付 -->
              <el-option :label="$t('recharge_list.paid')" :value="1"></el-option>
            </el-select>
          </div>
          <div class="sel_label sel_label_0" style="overflow:hidden;">
            <!-- 订单号 -->
            <el-input
              class="sel_input"
              v-model="params.orderNo"
              :placeholder="$t('recharge_history.other_order')"
            ></el-input>
            <!-- 搜索 -->
            <el-button
              @click="fnContentFil"
              class="sel_btn"
              type="primary"
            >{{ $t('common.search') }}</el-button>
          </div>
          <el-table
            border
            :empty-text="$t('el.table.emptyText')"
            row-class-name="rowClassName"
            header-row-class-name="headerRowClassName"
            style="width: 100%;"
            :stripe="true"
            :data="tableData"
          >
            <!-- 订单号 -->
            <el-table-column :label="$t('recharge_history.order_no')">
              <template slot-scope="scope">{{ scope.row.orderNo }}</template>
            </el-table-column>
            <!-- 第三方订单号 -->
            <el-table-column :label="$t('recharge_history.other_order')">
              <template slot-scope="scope">{{ scope.row.dealerOrderNo }}</template>
            </el-table-column>
            <!-- 用户名 -->
            <el-table-column :label="$t('recharge_history.username')">
              <template slot-scope="scope">{{ scope.row.username }}</template>
            </el-table-column>
            <!-- 充值时间 -->
            <el-table-column :label="$t('recharge_history.creat_time')">
              <template slot-scope="scope">{{ scope.row.creatTime|FMT_DATE }}</template>
            </el-table-column>
            <!-- ID -->
            <el-table-column :label="$t('withdraw_history.user_id')">
              <template slot-scope="scope">{{ scope.row.userId }}</template>
            </el-table-column>
            <!-- 金额 -->
            <el-table-column prop="usd" :label="$t('recharge_history.usd')">
              <template slot-scope="scope">{{ scope.row.usd|FORMATTED_NUMBER }}</template>
            </el-table-column>
            <!-- 状态 -->
            <el-table-column prop="state" :label="$t('recharge_history.state')" width="150">
              <!-- 未支付 支付成功 -->
              <template
                slot-scope="scope"
              >{{ scope.row.state == 0?$t('recharge_list.non_payment'):$t('recharge_list.paid') }}</template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column :label="$t('asset_info.handle')" min-width="100">
              <template slot-scope="scope">
                <!-- 回调 -->
                <el-button
                  type="primary"
                  size="small"
                  @click="fnBack(scope.row)"
                >{{ $t('recharge_history.audit') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination_box">
            <el-pagination
              style="overflow: auto;"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 15, 20, 25, 30]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
        </div>
      </div>

      <el-dialog
        :modal-append-to-body="false"
        :title="$t('system_container.tips')"
        :visible.sync="dialogVisible"
        :width="screenSize == 1?'22%':'90%'"
        center
      >
        <el-form
          style="padding: .2rem;"
          :model="ruleForm"
          label-position="top"
          ref="ruleForm"
          label-width="1.6rem"
          class="demo-ruleForm item_form"
        >
          <!-- 获取验证码方式 -->
          <el-form-item :label="$t('other.text1')">
            <el-radio-group v-model="sendCodeType">
              <el-radio :label="1">{{ $t('other.text2') }}</el-radio>
              <el-radio :label="2">{{ $t('register.email') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item :label="$t('transaction_pass.code')">
            <el-input :placeholder="$t('transaction_pass.code')" v-model="ruleForm.phoneCord">
              <template slot="append">
                <!-- <GetCode apiUrl="IBM_UTILS_SENDMOBILECODE" :mobile="ruleForm.mobile"></GetCode> -->
                <GetCode
                  v-if="!!dialogVisible"
                  apiUrl="IBM_UTILS_GETSECURITYCODE"
                  :mobile="phone"
                  :codeType1="sendCodeType"
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
          <!-- 确 定 -->
          <el-button @click="dialogVisible = false">{{ $t('el.datepicker.cancel') }}</el-button>
          <el-button type="primary" @click="fnDoSome">{{ $t('el.colorpicker.confirm') }}</el-button>
        </span>
      </el-dialog>
    </div>
  </transition>
</template>
  <script>
import WatchScreen from "../../../mixins/watchScreen.js";
import TableDate from "../../../../src/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
import MessageBox from "@/mixins/messageBox.js";
import GetCode from "@/components/GetCode1";
import GetUserInfo from "@/mixins/getUserInfo.js";
export default {
  name: "recharge_history",
  mixins: [WatchScreen, MessageBox, GetUserInfo],
  components: {
    TableDate,
    GetCode
  },
  inject: ["$main"],
  data() {
    return {
      ruleForm: {
        phoneCord: ""
      },
      rules: {
        phoneCord: [
          {
            required: true,
            message: "transaction_pass.resetPassErrInfo.beforeCode",
            trigger: "blur"
          } // 请先输入验证码
        ]
      },
      orderNo: "",
      phone: "",
      email: "",
      codeNull: false,
      sendCodeType: 1, // 1 手机号 2邮箱
      dialogVisible: false,
      sizeList: [10, 15, 20, 25, 30],
      currentPage: 1,
      tableData: [],
      params: {
        type: 0,
        totalPage: 10,
        currPage: 1,
        startTime: "",
        endTime: "",
        orderNo: ""
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetNewInfo().then(res => {
      console.log(res, 2233);
      vm.email = res.email;
      vm.phone = res.mobile;
    });
    vm.fnGetData();
  },
  methods: {
    // 模态框点击事件
    fnDoSome() {
      let vm = this;
      if (!!!vm.ruleForm.phoneCord) {
        vm.codeNull = true;
      } else {
        // 回调接口
        vm.$api
          .IBM_UTILS_CALLBACK({
            orderNo: vm.orderNo,
            security_code: vm.ruleForm.phoneCord
          })
          .then(res => {
            vm.dialogVisible = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("withdraw_audit.auditErrInfo.handle"),
                "success"
              );
              vm.fnGetData();
            } else {
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
            }
          });
        // vm.dialogVisible = false;
      }
    },
    // 用户名或ID筛选
    fnContentFil() {
      let vm = this;
      vm.params.currPage = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 每页要展示多少条
    fnSizeChange(val) {
      let vm = this;
      vm.params.totalPage = val;
      vm.fnGetData();
    },
    // 回调
    fnBack(data) {
      let vm = this;
      console.log(data.orderNo, 11);
      vm.orderNo = data.orderNo;
      vm.sendCodeType = 1;
      vm.ruleForm.phoneCord = "";
      vm.codeNull = false;
      vm.dialogVisible = true;

      /*  vm.$confirm(
        vm.$t("recharge_history.text1"),
        vm.$t("system_container.tips"),
        {
          confirmButtonText: vm.$t("system_container.ok"), // 确定
          cancelButtonText: vm.$t("system_container.no"), // 取消
          type: "warning"
        }
      )
        .then(() => {
          // 调删除接口
          vm.$api
            .IBM_UTILS_CALLBACK({
              orderNo: data.orderNo
            })
            .then(res => {
              if (res.code == 0) {
                vm.fnOpenMessageBox(
                  vm.$t("withdraw_audit.auditErrInfo.handle"),
                  "success"
                );
                vm.fnGetData();
              } else {
                vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
              }
            });
        })
        .catch(() => {}); */
    },
    // 支付状态选择
    changeState(val) {
      let vm = this;
      vm.params.currPage = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 时间范围选择
    changeDataByDate(data) {
      let vm = this;
      vm.params.startTime = formDate(data.startTime, 2);
      vm.params.endTime = formDate(data.endTime, 2);
      vm.fnGetData();
    },
    // 每页要展示多少条
    handleSizeChange(val) {
      let vm = this;
      vm.params.totalPage = val;
      vm.fnGetData();
    },
    // 当前第几页
    handleCurrentChange(val) {
      let vm = this;
      vm.params.currPage = val;
      vm.fnGetData();
      vm.currentPage = val;
    },
    // 获取列表数据
    fnGetData() {
      let vm = this;
      let params = Object.assign({}, vm.params);
      vm.$main.loading = true;
      vm.$api.IBM_ADMIN_SETGOLDINFO(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list; // 列表
          vm.total = res.data.totalCount;
        }
        vm.$main.loading = false;
      });
    }
  }
};
</script>
<style lang="scss">
</style>
