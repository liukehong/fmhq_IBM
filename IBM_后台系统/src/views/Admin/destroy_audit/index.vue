<template>
  <transition name="fade">
    <div class="destroy_audit" style="overflow: hidden;">
      <!-- MT4出金列表 -->
      <div class="item_title">{{ $t('admin.destroy_audit') }}</div>
      <div class="item_box">
        <div class="item_table_box">
          <!-- 时间选择 -->
          <TableDate @changeDate="changeDataByDate"></TableDate>
          <div class="sel_label" style="overflow:hidden;">
            <!-- 请选择 -->
            <el-select
              :class="screenSize == 1?'rem_2':'rem_100'"
              v-model="params.type"
              :placeholder="$t('el.select.placeholder')"
              @change="changeState"
            >
              <!-- 出金申请 -->
              <el-option :label="$t('withdraw_audit.status.submit')" :value="1"></el-option>
              <!-- 出金驳回 -->
              <el-option :label="$t('withdraw_audit.status.rejected')" :value="3"></el-option>
              <!-- 出金成功 -->
              <el-option :label="$t('withdraw_audit.status.submit_suc')" :value="6"></el-option>
            </el-select>
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
            <!-- 申请时间 -->
            <el-table-column :label="$t('withdraw_list.time')">
              <template slot-scope="scope">{{ scope.row.caTime|FMT_DATE }}</template>
            </el-table-column>
            <!-- 购买时间 -->
            <el-table-column :label="$t('product_report.bay_time')">
              <template slot-scope="scope">{{ scope.row.createTime|FMT_DATE }}</template>
            </el-table-column>
            <!-- 用户ID -->
            <el-table-column :label="$t('product_report.user_id')">
              <template slot-scope="scope">{{ scope.row.userId }}</template>
            </el-table-column>
            <!-- 配套名 -->
            <el-table-column :label="$t('product_setting.mat_name')">
              <template slot-scope="scope">{{ scope.row.matName||'--' }}</template>
            </el-table-column>
            <!-- 配套金额 -->
            <el-table-column :label="$t('product_setting.mat_money')">
              <template slot-scope="scope">{{ scope.row.money|FORMATTED_NUMBER }}</template>
            </el-table-column>
            <!-- MT4账户 -->
            <el-table-column :label="$t('product_setting.mt4_account')">
              <template slot-scope="scope">{{ scope.row.mt4User||'--' }}</template>
            </el-table-column>
            <!-- MT4密码 -->
            <el-table-column :label="$t('product_setting.mt4_pass')">
              <template slot-scope="scope">{{ scope.row.password||'--' }}</template>
            </el-table-column>
            <!-- 原因 -->
            <el-table-column :label="$t('withdraw_audit.reason')" v-if="params.type == 3">
              <template
                slot-scope="scope"
              >{{ (lanType == 'zh'?scope.row.reason:scope.row.reasonEn)||'--' }}</template>
            </el-table-column>
            <!-- 状态 -->
            <el-table-column :label="$t('product_setting.status')">
              <template slot-scope="scope">{{ STATUS(params.type)||'--' }}</template>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column :label="$t('table.handle')" width="180">
              <template slot-scope="scope">
                <div v-if="params.type == 1">
                  <!-- 通过 -->
                  <el-button
                    @click="fnChangeType(1,scope.row.id)"
                    type="success"
                    size="mini"
                  >{{ $t('withdraw_audit.through') }}</el-button>
                  <!-- 驳回 -->
                  <el-button
                    @click="fnOpenModal(scope.row.id)"
                    type="danger"
                    size="mini"
                  >{{ $t('withdraw_audit.rejected') }}</el-button>
                </div>
                <div v-if="params.type == 3">
                  <!-- 恢复 -->
                  <el-button
                    @click="fnAuditGold(scope.row.id)"
                    type="warning"
                    size="mini"
                  >{{ $t('withdraw_audit.restore') }}</el-button>
                </div>
                <div v-if="params.type == 6">--</div>
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
      <!-- 提示 -->
      <el-dialog
        :modal-append-to-body="false"
        :title="$t('system_container.tips')"
        :visible.sync="dialogVisible1"
        :width="screenSize == 1?'22%':'90%'"
        center
      >
        <el-form
          label-position="top"
          style="padding-left: .2rem; padding-right: .2rem; padding-top: .2rem;"
          label-width="80px"
        >
          <el-form-item style="color: #fff;" :label="$t('withdraw_audit.reason1')">
            <el-input type="textarea" v-model="reason1"></el-input>
          </el-form-item>
          <el-form-item style="color: #fff;" :label="$t('withdraw_audit.reason2')">
            <el-input type="textarea" v-model="reason2"></el-input>
          </el-form-item>
          <!-- 获取验证码方式 -->
          <el-form-item :label="$t('other.text1')" v-if="dept==11">
            <el-radio-group v-model="sendCodeType">
              <el-radio :label="1">{{ $t('other.text2') }}</el-radio>
              <el-radio :label="2">{{ $t('register.email') }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item :label="$t('transaction_pass.code')" v-if="dept == 11">
            <el-input :placeholder="$t('transaction_pass.code')" v-model="phoneCord">
              <template slot="append">
                <GetCode
                  v-if="!!dialogVisible1"
                  apiUrl="IBM_UTILS_GETSECURITYCODE"
                  :mobile="phone"
                  :codeType1="sendCodeType"
                ></GetCode>
              </template>
            </el-input>
          </el-form-item>
          <!-- 请先输入验证码 -->
          <div
            v-if="!!codeNull&&dept==11"
            style="text-align:center; color: red;"
          >{{ $t('transaction_pass.resetPassErrInfo.beforeCode') }}</div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- 确 定 -->
          <el-button
            style="width: 100%;"
            type="primary"
            @click="fnDoSome"
          >{{ $t('el.colorpicker.confirm') }}</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :modal-append-to-body="false"
        :title="$t('system_container.tips')"
        :visible.sync="dialogVisible"
        :width="screenSize == 1?'22%':'90%'"
        center
      >
        <el-form
          style="padding: .2rem;"
          label-position="top"
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
            <el-input :placeholder="$t('transaction_pass.code')" v-model="phoneCord">
              <template slot="append">
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
          <el-button type="primary" @click="fnDoSomeModal">{{ $t('el.colorpicker.confirm') }}</el-button>
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
export default {
  name: "destroy_audit",
  mixins: [WatchScreen, MessageBox],
  components: {
    TableDate,
    GetCode
  },
  inject: ["$main"],
  data() {
    return {
      phone: "",
      codeNull: false,
      sendCodeType: 1, // 1 手机号 2邮箱
      dialogVisible: false,
      dept: "",
      phoneCord: "",
      id: "",
      type: "",
      applyType: "通过",

      curId: "",
      reason1: "", // 中文原因
      reason2: "", // 英文原因
      dialogVisible1: false,
      sizeList: [10, 15, 20, 25, 30],
      currentPage: 1,
      tableData: [],
      params: {
        type: 1, // 1提交申请  3驳回申请  6提现成功
        totalPage: 10,
        currPage: 1,
        startTime: "",
        endTime: ""
      },
      total: 0,
      lanType: "zh"
    };
  },
  mounted: function() {
    let vm = this;
    vm.dept = vm.$main.userInfo.deptId;
    vm.phone = vm.$main.userInfo.mobile;
    // 语言类型判断
    if (window.localStorage.getItem("locale")) {
      vm.lanType = window.localStorage.getItem("locale");
    }
    vm.fnGetData();
  },
  methods: {
    // 模态框点击事件
    fnDoSomeModal() {
      let vm = this;
      if (!!!vm.phoneCord) {
        vm.codeNull = true;
      } else {
        vm.dialogVisible = false;
        // 接口
        if (vm.applyType == "通过") {
          // 通过
          vm.$main.loading = true;
          vm.$api
            .IBM_ADMIN_AUDITMT4({
              id: vm.id,
              withdrawStatus: vm.type,
              reason: "",
              security_code: vm.phoneCord
            })
            .then(res => {
              vm.$main.loading = false;
              if (res.code == 0) {
                vm.fnOpenMessageBox(
                  vm.$t("withdraw_audit.auditErrInfo.through"),
                  "success"
                );
                vm.fnGetData();
              } else {
                vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
              }
            });
        } else if (vm.applyType == "恢复") {
          vm.$main.loading = true;
          vm.$api
            .IBM_ADMIN_AUDITMT4RECOVERY({
              id: vm.id,
              security_code: vm.phoneCord
            })
            .then(res => {
              vm.$main.loading = false;
              if (res.code == 0) {
                vm.fnOpenMessageBox(
                  vm.$t("withdraw_audit.auditErrInfo.restore"),
                  "success"
                );
                vm.fnGetData();
              } else {
                vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
              }
            });
        }
      }
    },
    // 出金审核的恢复
    fnAuditGold(id) {
      let vm = this;
      vm.id = id;
      if (vm.dept == 11) {
        // 打开模特框的初始化
        vm.sendCodeType = 1;
        vm.phoneCord = "";
        vm.codeNull = false;
        vm.dialogVisible = true;
        vm.applyType = "恢复";
      } else {
        vm.$main.loading = true;
        vm.$api
          .IBM_ADMIN_AUDITMT4RECOVERY({
            id: id
          })
          .then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("withdraw_audit.auditErrInfo.restore"),
                "success"
              );
              vm.fnGetData();
            } else {
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
            }
          });
      }
    },
    // 打开模态框
    fnOpenModal(id) {
      let vm = this;
      vm.dialogVisible1 = true;
      vm.reason1 = "";
      vm.reason2 = "";
      vm.curId = id;
      vm.sendCodeType = 1;
      vm.phoneCord = "";
      vm.codeNull = false;
    },
    // 模态框点击事件
    fnDoSome() {
      let vm = this;

      let params = {
        id: vm.curId,
        withdrawStatus: 0,
        reason: vm.reason1,
        reasonEn: vm.reason2
      };
      if (vm.dept == 11) {
        params.security_code = vm.phoneCord;
        if (!!!vm.phoneCord) {
          vm.codeNull = true;
        } else {
          dd();
        }
      } else {
        dd();
      }

      function dd() {
        vm.$main.loading = true;
        vm.dialogVisible1 = false;
        // 驳回
        vm.$api.IBM_ADMIN_AUDITMT4(params).then(res => {
          vm.$main.loading = false;
          if (res.code == 0) {
            // 表单提交
            vm.fnOpenMessageBox(
              vm.$t("withdraw_audit.auditErrInfo.rejected"),
              "success"
            );
            vm.fnGetData();
          } else {
            vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
          }
        });
      }
    },
    // 状态
    STATUS(data) {
      let vm = this;
      let obj = {
        "1": vm.$t("withdraw_audit.status.submit"), // 出金申请
        "3": vm.$t("withdraw_audit.status.rejected"), // 出金驳回
        "6": vm.$t("withdraw_audit.status.submit_suc") // 出金成功
      };
      return obj[+data];
    },
    // 每页要展示多少条
    fnSizeChange(val) {
      let vm = this;
      vm.params.totalPage = val;
      vm.fnGetData();
    },
    // 列表操作
    fnChangeType(type, id) {
      let vm = this;

      if (vm.dept == 11) {
        vm.type = type;
        vm.id = id;
        vm.sendCodeType = 1;
        vm.phoneCord = "";
        vm.codeNull = false;
        vm.dialogVisible = true;
        vm.applyType = "通过";
      } else {
        // 通过
        vm.$main.loading = true;
        vm.$api
          .IBM_ADMIN_AUDITMT4({
            id: id,
            withdrawStatus: type,
            reason: ""
          })
          .then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("withdraw_audit.auditErrInfo.through"),
                "success"
              );
              vm.fnGetData();
            } else {
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
            }
          });
      }
      if (type == 1) {
      } else {
        // 驳回
        vm.$prompt(
          vm.$t("withdraw_audit.reason"),
          vm.$t("system_container.tips"),
          {
            confirmButtonText: vm.$t("system_container.ok"), // 确定
            cancelButtonText: vm.$t("system_container.no"), // 取消
            center: true,
            confirmButtonClass: "newClass",
            inputPlaceholder: vm.$t("withdraw_audit.reason"),
            showCancelButton: false
          }
        )
          .then(({ value }) => {
            vm.$main.loading = true;
            // 驳回
            vm.$api
              .IBM_ADMIN_AUDITMT4({
                id: id,
                withdrawStatus: type,
                reason: value
              })
              .then(res => {
                vm.$main.loading = false;
                if (res.code == 0) {
                  // 表单提交
                  vm.fnOpenMessageBox(
                    vm.$t("withdraw_audit.auditErrInfo.rejected"),
                    "success"
                  );
                  vm.fnGetData();
                } else {
                  vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
                }
              });
          })
          .catch(() => {});
      }
    },
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
      vm.$api.IBM_ADMIN_MT4GETGOLD(params).then(res => {
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
.destroy_audit {
  .el-form-item__label {
    // color: #fff;
  }
}
</style>
