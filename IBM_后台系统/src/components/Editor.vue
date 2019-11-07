<template>
  <div ref="editorElem" style="height:500px;" id="editor"></div>
</template>

<script>
import E from "wangeditor";
export default {
  props: ["content", "value", "showHeader"],
  data() {
    return {
      editor: null
    };
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    value(val) {
      let vm = this;
    }
  },
  mounted() {
    let vm = this;
    vm.fnEdit();
  },
  methods: {
    fnEdit() {
      let vm = this;
      vm.editor = new E("#editor");
      // 语言配置
      vm.editor.customConfig.lang = {
        字号: vm.$t("editor.text1"),
        字体: vm.$t("editor.text2"),
        宋体: vm.$t("editor.text3"),
        微软雅黑: vm.$t("editor.text4"),
        链接文字: vm.$t("editor.text5"),
        链接: vm.$t("editor.text6"),
        插入: vm.$t("editor.text7"),
        设置列表: vm.$t("editor.text8"),
        有序列表: vm.$t("editor.text9"),
        无序列表: vm.$t("editor.text10"),
        对齐方式: vm.$t("editor.text11"),
        靠左: vm.$t("editor.text12"),
        居中: vm.$t("editor.text13"),
        靠右: vm.$t("editor.text14"),
        插入表格: vm.$t("editor.text15"),
        创建: vm.$t("editor.text16"),
        行: vm.$t("editor.text17"),
        列的表格: vm.$t("editor.text18"),
        插入代码: vm.$t("editor.text19")
      };
      // 配置菜单栏
      if (!!vm.showHeader) {
        vm.editor.customConfig.menus = [
          // 'head',  // 标题
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "italic", // 斜体
          "underline", // 下划线
          "strikeThrough", // 删除线
          // 'foreColor',  // 文字颜色
          // 'backColor',  // 背景颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          // 'quote',  // 引用
          // 'emoticon',  // 表情
          // 'image',  // 插入图片
          "table", // 表格
          // 'video',  // 插入视频
          "code", // 插入代码
          "undo", // 撤销
          "redo" // 重复
        ];
      }else{
        vm.editor.customConfig.menus = [];
      }

      // 监听内容变化
      vm.editor.customConfig.onchange = html => {
        vm.$emit("change", html);
      };
      // 创建编辑器
      vm.editor.create();
      setTimeout(function() {
        vm.editor.txt.html(vm.value);
      }, 0);
    }
  }
};
</script>
<style lang="scss">
.w-e-text {
  overflow: auto !important;
}
.w-e-text-container {
  height: 400px !important;
  z-index: 1 !important;
}
/* .w-e-toolbar {
  display: flex;
  flex-wrap: wrap;
  background: none!important;
  color: #fff;
}
.w-e-toolbar .w-e-menu i{
  color: #fff;
} */
.w-e-toolbar {
  background: none !important;
}
</style>
