<template>
  <div class="menuBox" style="width:2.8rem;">
    <!-- 名称 -->
    <el-scrollbar style="height: 100%;">
      <div class="title_wrap">
        <div class="name">{{ userInfo.username }}</div>
        <div class="id">ID：{{ userInfo.userId }}</div>
      </div>
      <!-- 菜单 -->
      <el-menu
        class="el-menu-vertical-demo navBox"
        :unique-opened="true"
        router
        :default-active="default_active"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <template v-for="item1 in menuList">
          <!-- 只有一级菜单 -->
          <el-menu-item v-if="fnShowMenu(item1)" :index="item1.index" :key="item1.index">
            <i :class="item1.icon"></i>
            <span slot="title">{{ item1.name }}</span>
          </el-menu-item>
          <!-- 有二级 -->
          <el-submenu :index="item1.index" v-if="!!item1.haschildren" :key="item1.index">
            <template slot="title">
              <i :class="item1.icon"></i>
              <span>{{ item1.name }}</span>
            </template>
            <template v-for="item1_1 in item1.list">
              <!-- 没有三级 -->
              <el-menu-item
                v-if="!!!item1_1.haschildren"
                :index="item1_1.index"
                :key="item1_1.index"
              >{{ item1_1.name }}</el-menu-item>
              <!-- 有三级 -->
              <el-submenu v-if="!!item1_1.haschildren" :key="item1_1.index" :index="item1_1.index">
                <template slot="title">{{ item1_1.name }}</template>
                <el-menu-item
                  v-for="item1_1_1 in item1_1.list"
                  :key="item1_1_1.index"
                  :index="item1_1_1.index"
                >{{ item1_1_1.name }}</el-menu-item>
              </el-submenu>
            </template>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import comData from "../utils/data.js";
export default {
  name: "TheNav",
  props: ["userInfo"],
  data: function() {
    return {
      user: {
        username: "", // 用户名
        userId: "" // 用户id
      },
      default_active: "", // 值是menuList里的index，这里index对应的是跳转路径
      menuList: [],
      organization: "",
      dept: ""
    };
  },
  mounted: function() {
    let active = this.$route.path;
    this.default_active = active;
    if (!!window.localStorage.getItem("userInfo")) {
      let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      this.organization = userInfo.organization;
      this.dept = userInfo.dept;
    }
    this.initMenuList();
  },
  methods: {
    fnShowMenu(data) {
      if (!!window.localStorage.getItem("userInfo")) {
        let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
        this.organization = userInfo.organization;
        this.dept = userInfo.dept;
      }
      if (!!!data.haschildren) {
        if (this.dept == 31) {
          return true;
        }
        // 如果是partner以及organization == 1则展示推荐列表
        if (data.index == "/user/lowerList") {
          if (comData.os_type == 1 && this.organization == 1) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    handleSelect(index, indexPath) {
      let vm = this;
      let w = document.documentElement.offsetWidth || document.body.offsetWidth;
      if (w < 700) {
        vm.$emit("selectMenu");
      }
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    initMenuList() {
      let num;
      // 0 用户菜单  1 管理员
      if (this.$route.matched[0].name == "admin") {
        num = "1";
      } else {
        num = "0";
      }
      // 如果id是2844387这个用户，只能看到反馈内容
      let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      let arrs = [
        {
          name: this.$t("admin.admin_feedback"), // 反馈信息
          haschildren: false,
          index: "admin_feedback",
          icon: "el-icon-s-comment",
          list: []
        }
      ];
      if (userInfo.userId == 2844387) {
        this.menuList = arrs;
        // this.menuList = comData.menuList(num, this);
      } else {
        this.menuList = comData.menuList(num, this);
      }
    }
  },
  watch: {
    $route(to, from) {
      let active = to.path;
      this.default_active = active;
      if (to.matched[0].name != from.matched[0].name) {
        this.initMenuList();
      }
    }
  }
};
</script>
<style scoped lang='scss'>
.menuBox {
  height: 100%;
  overflow: auto;
  width: 2.75rem;
}
.navBox {
  background: #070e38;
}
.title_wrap {
  width: 100%;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  text-align: center;
  color: #fff;
  .name {
    font-size: 0.24rem;
    font-weight: bold;
  }
  .id {
    font-size: 0.18rem;
    font-weight: 400;
    opacity: 0.6;
  }
}
</style>
