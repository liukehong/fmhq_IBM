<template>
  <div class="item_box notice_list_add">
    <div class="item_list_box">
      <el-form
        :model="ruleForm"
        :label-position="screenSize == 1?'left':'top'"
        ref="ruleForm"
        label-width="1.6rem"
        class="demo-ruleForm item_form"
      >
        <!-- 语言 -->
        <el-form-item :label="$t('notice_detail.language')">
          <!-- 请选择 -->
          <el-select v-model="ruleForm.type" :placeholder="$t('el.select.placeholder')">
            <el-option
              label="中文"
              :value="1">
            </el-option>
            <el-option
              label="English"
              :value="2">
            </el-option>
            <el-option
              label="日本語"
              :value="3">
            </el-option>
          </el-select>
        </el-form-item> 
        <!-- 排序 -->
        <el-form-item :label="$t('notice_detail.sort')">
          <el-input-number v-model="ruleForm.whole" :min="0" :label="$t('notice_detail.sort')"></el-input-number>
        </el-form-item>
        <!-- 标题 -->
        <el-form-item prop="title" :label="$t('notice_detail.title')" style="max-width: 6rem;">
          <el-input :placeholder="$t('notice_detail.title')" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <!-- 内容 -->
        <el-form-item prop="content" :label="$t('notice_detail.content')" style="max-width: 10rem;">
          <Editor :showHeader="showHeader" v-model="ruleForm.content"></Editor>
        </el-form-item>
        <el-form-item>
          <!-- 提交 -->
          <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('common.submit') }}</el-button>
          <!-- 返回 -->
          <el-button @click="p.pageType = 'list'">{{ $t('system_container.back') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import WatchScreen from "../../../mixins/watchScreen.js";
import Editor from '@/components/Editor'
import MessageBox from "@/mixins/messageBox.js";
import MyValidate from "@/mixins/myValidate.js";
export default {
  name: "notice_list_add",
  mixins: [WatchScreen,MessageBox,MyValidate],
  inject: ["p",'$main'],
  components: {
    Editor
  },
  data() {
    return {
      showHeader: true,
      path: '',
      total: 0,
      currentPage: 1,
      ruleForm: {
        title: '', // 标题
        content: '', // 内容
        type: 1, // 1中文 2英语 3日本话
        whole: 0, // 排序
      },
      rules: {
        // 请填写标题
        title: [
          {
            required: true,
            message: "notice_detail.editErrInfo.title",
            trigger: "blur"
          }
        ],
        // 请填写内容
        content: [
          {
            required: true,
            message: "notice_detail.editErrInfo.content",
            trigger: "blur"
          }
        ],
      },
    };
  },
  mounted: function() {
    let vm = this;
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          let params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.IBM_ADMIN_ADDNOTICE(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              // 添加成功
              vm.fnOpenMessageBox(vm.$t('notice_detail.editErrInfo.addSuc'),'success')
              vm.p.pageType = 'list';
            } else {
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`),'error')
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
.notice_list_add{
  .item_form{
    max-width: 100%!important;
  }
}
</style>
