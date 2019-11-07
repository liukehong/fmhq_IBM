<template>
  <transition name="fade">
    <div style="overflow: hidden;">
      <div class="item_title">{{ $t('admin.admin_feedback') }}</div>
      <div class="item_box">
        <div v-loading="loading" class="item_box">
    <div class="item_list_box">
      <el-form
        style="width:100%;"
        :model="ruleForm"
        :rules="rules"
        :label-position="screenSize == 1?'left':'top'"
        ref="ruleForm"
        label-width="1.6rem"
        class="demo-ruleForm item_form"
      >
        <!-- 反馈标题 -->
        <el-form-item :label="$t('admin_feedback.title')">
          <div>{{ replayData.title }}</div>
        </el-form-item>
        <!-- 反馈内容 -->
        <el-form-item style="width:100%;" :label="$t('admin_feedback.content')">
          <div v-html="replayData.content"></div>
        </el-form-item>
        <!-- 截图 -->
        <el-form-item :label="$t('admin_feedback.screenshots')">
          <ul class="screenshot_list">
            <li
              @click="fnSeeBigImg(item)"
              v-for="(item,index) in cionList"
              :key="index"
              class="screenshot_item"
            >
              <img :src="item" alt>
            </li>
          </ul>
        </el-form-item>
        <!-- 回复列表 -->
        <el-form-item :label="$t('admin_feedback.reply_list')"></el-form-item>
        <div v-if="replayList.length>0" class="reply_list_box">
          <ul class="reply_list">
            <li v-for="(item,index) in replayList" :key="index" class="reply_item gray">
              <p style="margin-bottom: .1rem;" v-if="item.userId == replayData.userId">{{ $t('admin_feedback.user_id') }}：{{ item.userId }}</p>
              <!-- 回复内容 -->
              <p class="reply_name">{{ item.type == 1?$t('admin_feedback.reply_content'):$t('admin_feedback.content') }}:</p>
              <div class="reply_content">
                <!-- 内容 -->
                <div v-html="item.content"></div>
                <!-- 图 -->
                <img class="aImg" v-for="(aImg,i) in item.cion.split(',')" :key="i" @click="fnSeeBigImg(aImg)" v-if="item.cion" :src="aImg" alt="">
              </div>
              <!-- 回复时间 -->
              <p class="reply_date">{{ item.type == 1?$t('admin_feedback.content_reply_time'):$t('admin_feedback.content_create_time') }}:{{ item.createTime|FMT_DATE }}</p>
            </li>
          </ul>
          <div class="pagination_box">
            <el-pagination
              :current-page="currentPage"
              :page-size="10"
              @current-change="handleCurrentChange"
              layout="slot,prev, pager, next"
              :total="total"
            >
              <!-- 共多少条 -->
              <span
                style="padding-right: .1rem;"
                class="el-pagination__total first"
              >{{ $t('el.pagination.total1') }}{{ total }}{{ $t('el.pagination.total2') }}</span>
              <!-- 每页展示多少条 -->
              <span class="pagination__sizes first">
                <el-select size="mini" v-model="params.totalPage" @change="fnSizeChange">
                  <el-option
                    v-for="item in sizeList"
                    :key="item"
                    :label="`${item}${$t('el.pagination.pagesize')}`"
                    :value="item"
                  ></el-option>
                </el-select>
              </span>
            </el-pagination>
          </div>
        </div>
        <!-- 回复内容 -->
        <el-form-item :label="$t('admin_feedback.reply_content')">
          <!-- <el-input :placeholder="$t('admin_feedback.reply_content')" rows="8" type="textarea" v-model="ruleForm.content"></el-input> -->
          <Editor :showHeader="showHeader" v-model="ruleForm.content"></Editor>
        </el-form-item>
        <!-- 截图 -->
        <el-form-item :label="$t('send_feedback.screenshots')">
          <!-- <Upload
            parentName="admin_feedback_info"
            pathName="ruleForm.cion"
            :imageUrl="ruleForm.cion"
          ></Upload> -->
          <el-upload
                :on-exceed="handleExceed"
                :limit="3"
                :action="path"
                :data="params1"
                name="Filedata"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
              >
                <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <!-- 提交 -->
          <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('login.forget_btn') }}</el-button>
          <!-- 返回 -->
          <el-button @click="p.pageType = 'list'">{{ $t('system_container.back') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <BigImg :path="curUrl" :dialogVisible="dialogVisible" @changeUrl="fnChangeUrl"></BigImg>
  </div>
      </div>
      <el-dialog :visible.sync="dialogVisible1">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </transition>
</template>
<script>
import Upload from "@/components/Upload";
import WatchScreen from "@/mixins/watchScreen.js";
import BigImg from "@/components/BigImg";
import MessageBox from "@/mixins/messageBox.js";
import Editor from '@/components/Editor'
import comData from "@/utils/data.js";
export default {
  name: "admin_feedback_info",
  mixins: [WatchScreen, MessageBox],
  inject: ["p",'$main'],
  components: {
    Upload,
    BigImg,
    Editor
  },
  data() {
    return {
      params1: {
        token: JSON.parse(window.localStorage.getItem("token"))
      },
      path: comData.path + "/ibm/utils/upload",
      dialogImageUrl: "",
      dialogVisible1: false,


      showHeader: false,
      sizeList: [10, 15, 20, 25, 30],
      loading: false,
      params: {
        id: this.p.info.id, // 反馈id
        startTime: "",
        endTime: "",
        currPage: 1,
        totalPage: 10
      },
      replayData: {
        title: "",
        constent: "",
        cion: ""
      },
      curUrl: "",
      dialogVisible: false,
      cionList: [],
      replayList: [],
      total: 0,
      currentPage: 1,
      ruleForm: {
        type: 0,
        content: "", // 内容
        feedbackId: this.p.info.id, // 反馈id
        cion: "" // 图片地址
      },
      rules: {}
    };
  },
  mounted: function() {
    let vm = this;
    vm.fnGetData();
  },
  methods: {
    // 图片数量的限制
    handleExceed(files, fileList) {
      /* this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      ); */
    },
    // 删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      let vm = this;
      vm.fnGetUrl(fileList);
    },
    // 查看大图
    handlePictureCardPreview(file) {
      let vm = this;
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
      vm.fnSeeBigImg(file.response.data[0]);
    },
    // 成功上传图片
    handleAvatarSuccess(res, file, fileList) {
      // console.log(res,11)
      // console.log(file,22)
      let vm = this;
      vm.fnGetUrl(fileList);
    },
    // 图片的处理
    fnGetUrl(fileList) {
      let vm = this;
      console.log(fileList, 33);
      let arrs = [];
      fileList.forEach((item, index) => {
        arrs.push(item.response.data[0]);
      });
      console.log(arrs, "arrs");
      let str = "";
      if (arrs.length > 0) {
        str = arrs.join(",");
      }
      console.log(str, "str");
      vm.ruleForm.cion = str;
    },
    // 每页要展示多少条
    fnSizeChange(val) {
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
    // 获取回复列表数据
    fnGetData() {
      let vm = this;
      let params = Object.assign({}, vm.params);
      vm.loading = true;
      vm.$api.IBM_FEEDBACK_SELECTREPLY(params).then(res => {
        if (res.code == 0) {
          vm.replayList = res.data.list;
          vm.replayData.title = res.data.obj.title;
          vm.replayData.content = res.data.obj.content;
          // vm.cionList = res.data.obj.cion.split(";") || [];
          if(!!res.data.obj.cion){
            vm.cionList = res.data.obj.cion.split(",") || [];
          }else{
            vm.cionList = [];
          }
          vm.total = res.data.totalCount;
        }
        vm.loading = false;
      });
    },
    // 隐藏模态框
    fnChangeUrl() {
      let vm = this;
      vm.dialogVisible = false;
    },
    // 查看大图
    fnSeeBigImg(url) {
      console.log(url)
      let vm = this;
      this.curUrl = url;
      vm.dialogVisible = true;
    },
    // 表单提交
    submitForm(formName) {
      let vm = this;
      if(!!!vm.ruleForm.content){
        vm.fnOpenMessageBox(vm.$t('admin_feedback.replyErrInfo.replyContent'), "error");
        return false;
      }
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.IBM_FEEDBACK_ADDREPLY(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t('send_feedback.sendErrInfo.success'), "success");
              vm.fnGetData();
              vm.p.pageType = 'list';
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

<style scoped lang="scss">
.aImg{
  width:.94rem; 
  height: .94rem; 
  display:inline-block; 
  cursor: pointer;
  margin-right: .2rem;
  margin-top: .1rem;
}
.item_form {
  max-width: 100% !important;
}
.reply_list_box {
  font-size: 0.14rem;
  margin: 0.2rem 0;
  border: 1px solid #bfbfbf;
  border-radius: 5px;
  .reply_item {
    padding: 0.2rem;
    margin-top: 0.2rem;
    .reply_name {
      margin-bottom: 0.1rem;
    }
    .reply_content {
      border: 1px solid #bfbfbf;
      border-radius: 5px;
      padding: 0.1rem;
    }
    .reply_date {
      margin-top: 0.1rem;
    }
  }
}
ul,
li {
  list-style: none;
}
.pagination_box {
  padding: 0.1rem 0;
}
.screenshot_list {
  display: flex;
  flex-wrap: wrap;
  .screenshot_item {
    margin-right: 0.1rem;
    width: 1rem;
    height: 1rem;
    padding: 2px;
    line-height: 1rem;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
