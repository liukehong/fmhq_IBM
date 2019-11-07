<template>
<div>
  <el-upload
    class="avatar-uploader"
    :data="params"
    name="Filedata"
    :action="path"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <div v-if="imageUrl" @click.stop class="deleteBox">
        <div class="box">
            <span @click="seeImg" class="el-icon-zoom-in"></span>
            <span @click="fnDelete" class="el-icon-error"></span>
        </div>
    </div>
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <BigImg :path="imageUrl" :dialogVisible="dialogVisible" @changeUrl="fnChangeUrl"></BigImg>
  </div>
</template>


<script>
import comData from '../utils/data.js'
import BigImg from './BigImg'
export default {
  props: [
    'imageUrl', // 图片路径
    'parentName', // 组件名称
    'pathName', // 保存路径的属性名
  ],
  components: {
    BigImg
  },
  data() {
    return {
      params: {
        token: JSON.parse(window.localStorage.getItem('token'))
      },
      parent: '',
      path: comData.path + '/ibm/utils/upload',
      dialogVisible: false,
    };
  },
  mounted: function () {
    if(this.$route.matched[0].name == 'admin'){
      this.params.token = JSON.parse(window.localStorage.getItem('admin_token'));
    }else{
      this.params.token = JSON.parse(window.localStorage.getItem(comData.tokenName));
    }
    this.findParent(this.parentName);
  },
  methods: {
    seeImg () {
      // 查看大图
      let vm = this;
      vm.dialogVisible = true;
    },
    // 隐藏模态框
    fnChangeUrl() {
      let vm = this;
      vm.dialogVisible = false;
    },
    findParent (componentName) {
      let parent = this.$parent;
      let name = parent.$options.name;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      if(parent){
        this.parent = parent;
      }
    },
    handleAvatarSuccess(res, file) {
      let vm = this;
      let url = res.data[0];
      let arrs = this.pathName.split('.');
      if(arrs.length==1){
        vm.parent[this.pathName] = url;
      }
      if(arrs.length == 2){
        vm.parent[arrs[0]][arrs[1]] = url;
      }
    },
    beforeAvatarUpload(file) {
      let vm = this;
      // const isJPG = file.type === "image/jpeg";
      const isJPG = true;
      const isLt2M = file.size / 1024 / 1024 < 2;

      /* if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      } */
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    fnDelete() {
        let vm = this;
        let arrs = this.pathName.split('.');
        if(arrs.length==1){
          vm.parent[this.pathName] = '';
        }
        if(arrs.length == 2){
          vm.parent[arrs[0]][arrs[1]] = '';
        }
    }
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px!important;
  line-height: 178px!important;
  text-align: center!important;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.deleteBox {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
}
.deleteBox:hover {
  opacity: 1;
}
.deleteBox:hover span{
    display: inline-block;
}
.deleteBox .box{
    width: 100%;
    text-align: center;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}


</style>