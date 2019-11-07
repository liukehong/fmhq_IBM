<template>
  <div class="item_box">
    <div class="item_list_box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        :label-position="screenSize == 1?'left':'top'"
        ref="ruleForm"
        label-width="1.6rem"
        class="demo-ruleForm item_form"
      >
        <!-- 标题 -->
        <el-form-item :label="$t('news_report.title')">
          <el-input :placeholder="$t('news_report.title')" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <!-- 链接 -->
        <el-form-item :label="$t('news_report.url')">
          <el-input :placeholder="$t('news_report.url')" v-model="ruleForm.content"></el-input>
        </el-form-item>
        <!-- 预览图 -->
        <el-form-item :label="$t('news_report.img')">
          <Upload
            parentName="news_report_add"
            pathName="ruleForm.url"
            :imageUrl="ruleForm.url"
          ></Upload>
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
import Upload from "@/components/Upload";
import WatchScreen from "../../../mixins/watchScreen.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "news_report_add",
  mixins: [WatchScreen,MessageBox],
  inject: ["p",'$main'],
  components: {
    Upload,
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      ruleForm: {
        content: '', // 链接
        title: '', // 标题
        url: '', // 预览图
      },
      rules: {},
    };
  },
  mounted: function() {
    let vm = this;
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.IBM_JOU_ADD(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              vm.fnOpenMessageBox(vm.$t('bank_card_edit.setBankErr.addSuccess'),'success');
              vm.p.pageType = 'list';
            } else {
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`),'error');
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
</style>
