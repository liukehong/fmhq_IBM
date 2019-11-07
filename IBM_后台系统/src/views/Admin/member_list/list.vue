<template>
  <div class="item_box">
    <div class="item_table_box">
      <!-- 时间选择 -->
      <div class="sel_label sel_label_0" style="overflow:hidden;">
        <!-- 请选择 -->
        <el-select
          :class="screenSize == 1?'rem_2':'rem_100'"
          :style="screenSize == 1?'':'padding-bottom: .2rem;'"
          v-model="params.type"
          :placeholder="$t('select.placeholder')"
          @change="changeState"
        >
          <!-- 全部 -->
          <el-option :label="$t('el.table.clearFilter')" value></el-option>
          <!-- 未通过 -->
          <el-option :label="$t('member_list.status.0')" :value="0"></el-option>
          <!-- 待审核 -->
          <el-option :label="$t('member_list.status.1')" :value="1"></el-option>
          <!-- 审核通过 -->
          <el-option :label="$t('member_list.status.2')" :value="2"></el-option>
        </el-select>
        <!-- 请选择 -->
        <el-select
          :class="screenSize == 1?'rem_2':'rem_100'"
          v-model="params.status"
          :placeholder="$t('select.placeholder')"
          @change="changeState"
        >
          <!-- 全部 -->
          <el-option :label="$t('el.table.clearFilter')" value></el-option>
          <!-- 已删除 -->
          <el-option :label="$t('member_list.delete')" :value="0"></el-option>
          <!-- 未删除 -->
          <el-option :label="$t('member_list.noDelete')" :value="1"></el-option>
        </el-select>
      </div>
      <div class="sel_label sel_label_0" style="overflow:hidden;">
        <!-- 输入用户ID -->
        <el-input class="sel_input" v-model="params.user_id" :placeholder="$t('common.user_id')"></el-input>
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
        <!-- 用户ID -->
        <el-table-column :label="$t('member_list.user_id')">
          <template slot-scope="scope">{{ scope.row.user_id }}</template>
        </el-table-column>
        <!-- 用户名 -->
        <el-table-column :label="$t('member_list.username')">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <!-- 手机号 -->
        <el-table-column :label="$t('member_list.mobile')">
          <template slot-scope="scope">{{ scope.row.mobile }}</template>
        </el-table-column>
        <!-- 登录手机号 -->
        <el-table-column :label="$t('admin_feedback.enterPhone')">
          <template slot-scope="scope">{{ scope.row.mobile2 }}</template>
        </el-table-column>
        <!-- 邮箱 -->
        <el-table-column prop="email" :label="$t('member_list.email')">
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <!-- 姓名 -->
        <el-table-column prop="name" :label="$t('member_list.name')">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <!-- 英文名 -->
        <el-table-column prop="english_name" :label="$t('member_list.english_name')">
          <template slot-scope="scope">{{ scope.row.english_name }}</template>
        </el-table-column>
        <!-- 注册时间 -->
        <el-table-column prop="create_time" :label="$t('member_list.create_time')">
          <template slot-scope="scope">{{ scope.row.time|FMT_DATE }}</template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column prop="status" :label="$t('table.status')">
          <template slot-scope="scope">{{ STATUS(scope.row.status) }}</template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column prop="user_id" :label="$t('table.handle')" width="570">
          <template slot-scope="scope">
            <!-- 查看 -->
            <el-button
              type="primary"
              size="mini"
              @click="fnSeeMemberInfo(scope.row,'info')"
            >{{ $t('admin_feedback.look') }}</el-button>
            <!-- 邮箱 -->
            <el-button
              type="primary"
              size="mini"
              @click="fnSeeMemberInfo(scope.row,'email')"
            >{{ $t('admin_feedback.email') }}</el-button>
            <!-- 手机号 -->
            <el-button
              type="primary"
              size="mini"
              @click="fnSeeMemberInfo(scope.row,'phone')"
            >{{ $t('admin_feedback.phone') }}</el-button>
            <!-- 登录手机号 -->
            <el-button
              type="primary"
              size="mini"
              @click="fnSeeMemberInfo(scope.row,'loginPhone')"
            >{{ $t('admin_feedback.enterPhone') }}</el-button>
            <!-- 等级 -->
            <el-button
              type="primary"
              size="mini"
              @click="fnSeeMemberInfo(scope.row,'grade')"
            >{{ $t('admin_feedback.grade') }}</el-button>
            <!-- 上下级 -->
            <el-button
              type="primary"
              size="mini"
              @click="fnSeeMemberInfo(scope.row,'ladder')"
            >{{ $t('admin_feedback.ladder') }}</el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              size="mini"
              @click="fnDelete(scope.row)"
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
    </div>
  </div>
</template>
  <script>
import WatchScreen from "../../../mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "member_list_list",
  mixins: [WatchScreen, MessageBox],
  inject: ["p", "$main"],
  data() {
    return {
      sizeList: [10, 15, 20, 25, 30],
      currentPage: 1,
      tableData: [],
      params: {
        type: "",
        user_id: "",
        totalPage: 10,
        currPage: 1,
        startTime: "",
        endTime: "",
        status: ""
      },
      total: 0
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 删除用户
    fnDelete(data) {
      let vm = this;
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
          console.log(data.user_id, 2233);
          vm.$api
            .IBM_ADMIN_DELECTUSER({
              uId: data.user_id
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
    },
    // 状态
    STATUS(data) {
      let vm = this;
      return vm.$t(`member_list.status.${data}`);
    },
    // 每页要展示多少条
    fnSizeChange(val) {
      let vm = this;
      vm.params.totalPage = val;
      vm.fnGetData();
    },
    // 查看会员信息
    fnSeeMemberInfo(data, type) {
      let vm = this;
      vm.$router.push({
        name: "member_info",
        query: {
          user_id: data.user_id,
          mobile: data.mobile,
          type: type
        }
      });
    },
    changeState(val) {
      let vm = this;
      vm.params.currPage = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // type类型变化
    fnTypeChange(val) {
      let vm = this;
      vm.params.type = val;
      vm.params.currPage = 1;
      vm.currentPage = 1;
      vm.fnGetData();
    },
    // 用户名或ID筛选
    fnContentFil() {
      let vm = this;
      vm.params.currPage = 1;
      vm.currentPage = 1;
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
      vm.$api.IBM_ADMIN_ALLUSERINFO(params).then(res => {
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
