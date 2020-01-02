<template>
  <div class="item_table_box">
    <!-- 时间选择 -->
    <!-- 添加 -->
    <el-button
      style="margin-bottom: .2rem;"
      @click="fnAdd"
      class="sel_btn"
      type="primary"
    >{{ $t('news_report.add') }}</el-button>
    <TableDate @changeDate="changeDataByDate" v-if="false"></TableDate>
    <div class="sel_label sel_label_0" style="overflow:hidden;">
      <!-- 是否永久开发 -->
      <el-select
        :class="screenSize == 1?'rem_2':'rem_100'"
        v-model="params.type"
        :placeholder="$t('el.select.placeholder')"
        @change="changeState"
      >
        <!-- 未永久开发 -->
        <el-option :label="$t('other.text10')" :value="0"></el-option>
        <!-- 永久开发 -->
        <el-option :label="$t('other.text9')" :value="1"></el-option>
      </el-select>
      <!-- 目前是否开发 -->
      <el-select
        v-if="params.type == 0"
        :class="screenSize == 1?'rem_2':'rem_100'"
        v-model="params.status"
        :placeholder="$t('el.select.placeholder')"
        @change="changeState"
      >
        <!-- 目前开发 -->
        <el-option :label="$t('other.text11')" :value="1"></el-option>
        <!-- 目前未开发 -->
        <el-option :label="$t('other.text12')" :value="2"></el-option>
      </el-select>
    </div>
    <div class="sel_label sel_label_0" style="overflow:hidden;">
      <!-- 输入用户ID -->
      <el-input class="sel_input" v-model="params.uId" :placeholder="$t('common.user_id')"></el-input>
      <!-- 搜索 -->
      <el-button @click="fnContentFil" class="sel_btn" type="primary">{{ $t('common.search') }}</el-button>
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
      <!-- 创建时间 -->
      <el-table-column :label="$t('notice_list.createTime')">
        <template slot-scope="scope">{{ scope.row.time|FMT_DATE }}</template>
      </el-table-column>
      <!-- 用户id -->
      <el-table-column :label="$t('login.userId')">
        <template slot-scope="scope">{{ scope.row.userId }}</template>
      </el-table-column>
      <!-- 用户名 -->
      <el-table-column :label="$t('login.username')">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <!-- 开始时间 -->
      <el-table-column :label="$t('el.datepicker.startTime')">
        <template slot-scope="scope">{{ fnTime(scope.row.startTime) }}</template>
      </el-table-column>
      <!-- 结束时间 -->
      <el-table-column :label="$t('el.datepicker.endTime')">
        <template slot-scope="scope">{{ fnTime(scope.row.endTime) }}</template>
      </el-table-column>
      <!-- 开发状态 -->
      <el-table-column :label="$t('other.text16')">
        <template slot-scope="scope">{{ fnOpenType(scope.row.type) }}</template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column width="200" :label="$t('table.handle')">
        <template slot-scope="scope">
          <!-- 操作 -->
          <el-button
            @click="fnEdit(scope.row)"
            type="primary"
            size="mini"
          >{{ $t('notice_list.edit') }}</el-button>
          <!-- 删除 -->
          <el-button
            @click="fnDelete(scope.row)"
            type="danger"
            size="mini"
          >{{ $t('notice_list.del') }}</el-button>
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
</template>
  <script>
import WatchScreen from "../../../mixins/watchScreen.js";
import TableDate from "../../../../src/components/TableDate.vue";
import formDate from "@/utils/formDate.js";
import MessageBox from "@/mixins/messageBox.js";
import GetCode from "@/components/GetCode1";
export default {
  name: "notice_list_list",
  mixins: [WatchScreen, MessageBox],
  inject: ["p", "$main"],
  components: {
    TableDate,
    GetCode
  },
  data() {
    return {
      id: "",
      phone: "",
      codeNull: false,
      sendCodeType: 1, // 1 手机号 2邮箱
      dialogVisible: false,
      dept: "",
      phoneCord: "",
      sizeList: [10, 15, 20, 25, 30],
      currentPage: 1,
      tableData: [],
      params: {
        type: 0, // 1永久开发  0未永久开发
        status: 1, // (1目前开放，2目前未开放。注：type = 0时传1或者2.type=1时不要传1或2就行)
        uId: "",
        totalPage: 10,
        currPage: 1
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.dept = vm.$main.userInfo.deptId;
    vm.phone = vm.$main.userInfo.mobile;
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
        // 调删除接口
        vm.$main.loading = true;
        vm.$api
          .IBM_ADMIN_DELECTORGANIZATION({
            id: vm.id,
            security_code: vm.phoneCord
          })
          .then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(
                vm.$t("notice_detail.editErrInfo.delSuc"),
                "success"
              ); // 删除成功
              vm.fnGetData();
            } else {
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
            }
          });
      }
    },

    // 用户名或ID筛选
    fnContentFil() {
      let vm = this;
      vm.params.currPage = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    fnTime(data) {
      let vm = this;
      return formDate(data);
    },
    // 开放状态
    fnOpenType(type) {
      let vm = this;
      if (type == 1) {
        return vm.$t("other.text9");
      } else {
        return vm.$t("other.text10");
      }
    },
    // 每页要展示多少条
    fnSizeChange(val) {
      let vm = this;
      vm.params.totalPage = val;
      vm.fnGetData();
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
    // 添加新闻
    fnAdd() {
      this.p.pageType = "add";
    },
    // 删除新闻
    fnDelete(data) {
      let vm = this;

      if (vm.dept == 11) {
        // 打开模特框的初始化
        vm.sendCodeType = 1;
        vm.phoneCord = "";
        vm.codeNull = false;
        vm.dialogVisible = true;
        vm.id = data.id;
      } else {
        // 确认删除
        // 提示
        vm.$confirm(
          vm.$t("notice_detail.editErrInfo.sureDel"),
          vm.$t("system_container.tips"),
          {
            confirmButtonText: vm.$t("system_container.ok"), // 确认
            cancelButtonText: vm.$t("system_container.no"), // 取消
            type: "warning"
          }
        )
          .then(() => {
            // 调删除接口
            vm.$main.loading = true;
            vm.$api
              .IBM_ADMIN_DELECTORGANIZATION({
                id: data.id
              })
              .then(res => {
                vm.$main.loading = false;
                if (res.code == 0) {
                  vm.fnOpenMessageBox(
                    vm.$t("notice_detail.editErrInfo.delSuc"),
                    "success"
                  ); // 删除成功
                  vm.fnGetData();
                } else {
                  vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
                }
              });
          })
          .catch(() => {});
      }
    },
    // 编辑新闻
    fnEdit(data) {
      let vm = this;
      vm.p.pageType = "edit";
      vm.p.info = data;
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
      // 参数的处理
      let params;
      if (vm.params.type == 0) {
        params = {
          type: vm.params.type, // 1永久开发  0未永久开发
          status: vm.params.status, // (1目前开放，2目前未开放。注：type = 0时传1或者2.type=1时不要传1或2就行)
          uId: vm.params.uId,
          totalPage: vm.params.totalPage,
          currPage: vm.params.currPage
        };
      } else {
        params = {
          type: vm.params.type, // 1永久开发  0未永久开发
          status: "",
          uId: vm.params.uId,
          totalPage: vm.params.totalPage,
          currPage: vm.params.currPage
        };
      }
      vm.$main.loading = true;
      vm.$api.IBM_ADMIN_SELECTORGANIZATION(params).then(res => {
        if (res.code == 0) {
          vm.tableData = res.data.list;
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
