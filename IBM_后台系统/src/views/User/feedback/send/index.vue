<template>
  <transition name="fade">
    <div class="feedback_send" style="overflow:hidden;">
      <!-- 发送反馈 -->
      <div class="item_title">{{ $t('user.send_feedback') }}</div>
      <div class="item_box">
        <div class="item_list_box">
          <el-form
            style="max-width: 100%;!important"
            :model="ruleForm"
            :label-position="screenSize == 1?'left':'top'"
            ref="ruleForm"
            label-width="1.6rem"
            class="demo-ruleForm item_form"
          >
            <!-- 标题 -->
            <el-form-item :label="$t('send_feedback.title')" prop="title">
              <el-input
                style="max-width: 6rem;"
                :placeholder="$t('send_feedback.title')"
                v-model="ruleForm.title"
              ></el-input>
            </el-form-item>
            <!-- 截图 -->
            <el-form-item :label="$t('send_feedback.screenshots')">
              <!-- <Upload parentName="feedback_send" pathName="ruleForm.cion" :imageUrl="ruleForm.cion"></Upload> -->
              <el-upload
                :on-exceed="handleExceed"
                :limit="3"
                :action="path"
                :data="params"
                name="Filedata"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
            <!-- 内容 -->
            <el-form-item :label="$t('send_feedback.content')" prop="content">
              <!-- <el-input :rows="8" :placeholder="$t('send_feedback.content')" type="textarea" v-model="ruleForm.content"></el-input> -->
              <Editor :showHeader="showHeader" v-model="ruleForm.content"></Editor>
            </el-form-item>
            <el-form-item>
              <!-- 提交 -->
              <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('login.forget_btn') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <BigImg :path="curUrl" :dialogVisible="dialogVisible" @changeUrl="fnChangeUrl"></BigImg>
    </div>
  </transition>
</template>

<script>
import Upload from "@/components/Upload";
import WatchScreen from "@/mixins/watchScreen.js";
import MyValidate from "@/mixins/myValidate.js";
import Editor from "@/components/Editor";
import MessageBox from "@/mixins/messageBox.js";
import comData from "@/utils/data.js";
import BigImg from "@/components/BigImg";
export default {
  name: "feedback_send",
  mixins: [WatchScreen, MyValidate, MessageBox],
  inject: ["$main"],
  data() {
    return {
      params: {
        token: JSON.parse(window.localStorage.getItem("token"))
      },
      path: comData.path + "/ibm/utils/upload",
      dialogImageUrl: "",
      dialogVisible: false,

      curUrl: "",
      showHeader: false,
      ruleForm: {
        cion: "", // 图片地址
        title: "", // 标题
        content: "" // 内容
      },
      rules: {
        title: [
          // 请输入标题
          {
            required: true,
            message: "send_feedback.sendErrInfo.title",
            trigger: "blur"
          }
        ],
        content: [
          // 请输入内容
          {
            required: true,
            message: "send_feedback.sendErrInfo.content",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    Upload,
    Editor,
    BigImg
  },
  mounted: function() {
    let vm = this;
    if (this.$route.matched[0].name == "admin") {
      this.params.token = JSON.parse(
        window.localStorage.getItem("admin_token")
      );
    } else {
      this.params.token = JSON.parse(
        window.localStorage.getItem(comData.tokenName)
      );
    }
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
      // this.dialogImageUrl = file.url;
      // this.dialogVisible = true;
      let vm = this;
      vm.fnSeeBigImg(file.response.data[0]);
    },
    // 查看大图
    fnSeeBigImg(url) {
      console.log(url)
      let vm = this;
      this.curUrl = url;
      vm.dialogVisible = true;
    },
    // 隐藏模态框
    fnChangeUrl() {
      let vm = this;
      vm.dialogVisible = false;
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
    // 表单提交
    submitForm(formName) {
      let vm = this;
      // console.log(vm.ruleForm.content);
      // console.log(document.getElementsByClassName('w-e-text')[0].innerText.replace(/\ +/g,"").length);
      // return false;
      if(vm.ruleForm.content.length>1500){
        vm.fnOpenMessageBox(vm.$t('other.text4'), "error");
        return false;
      }
      let params;
      vm.myValidate(formName).then(err => {
        if (!!!err) {
          params = Object.assign({}, vm.ruleForm);
          vm.$main.loading = true;
          vm.$api.IBM_FEEDBACK_ADDFEED(params).then(res => {
            vm.$main.loading = false;
            if (res.code == 0) {
              // 发送成功
              vm.fnOpenMessageBox(
                vm.$t("send_feedback.sendErrInfo.success"),
                "success"
              );
              vm.$router.push(comData.conutry_type + "/user/home");
            } else {
              vm.fnOpenMessageBox(vm.$t(`errCode.${res.code}`), "error");
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

<style scoped lang="scss">
</style>
