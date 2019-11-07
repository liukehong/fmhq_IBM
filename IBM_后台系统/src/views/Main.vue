<template>
  <section v-loading="loading" class="wrap system_container">
    <div class="header_top" :class="{'open':open}">
      <div class="logo_box">
        <div class="logo">
          <!-- <img src='./../image/home_logo@2x.png' alt=''> -->
          <img src="./../image/logo.svg" alt>
        </div>
      </div>
    </div>
    <aside class="sidebar_box" :class="{'open': open}">
      <the-nav :userInfo="userInfo" @selectMenu="open=true"/>
    </aside>
    <section class="right_container" :class="{'open': open}">
      <el-header class="header" height=".7rem">
        <el-button class="menuBtn" id="menuBtn" icon="el-icon-tickets" @click="handleOpen"/>
        <the-header :userInfo="userInfo" style="color:#fff;" v-show="showHeader"/>
      </el-header>
      <div class="main">
        <el-scrollbar style="height: 100%;">
          <div class="container">
            <router-view></router-view>
          </div>
        </el-scrollbar>
      </div>
    </section>
    <!-- 公告信息 -->
    <el-dialog
      @close="fnClose"
      :modal-append-to-body="false"
      :title="$t('system_container.bulletin')"
      :visible.sync="dialogVisible"
      :width="screenSize == 1?'40%':'90%'"
      center
    >
      <el-scrollbar style="height: 100%;">
        <div class="newsWrap">
          <div class="newItem" v-for="item in newsList" :key="item.id">
            <div class="title">{{ item.title }}</div>
            <div class="newsWrap_content" v-html="item.content"></div>
          </div>
        </div>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer">
        <!-- 确 定 -->
        <el-button type="primary" @click="fnDoSome">{{ $t('el.colorpicker.confirm') }}</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
import WatchScreen from "../mixins/watchScreen.js";
import TheHeader from "@/components/TheHeader";
import TheNav from "@/components/TheNav";
import GetUserInfo from "@/mixins/getUserInfo.js";
import comData from "@/utils/data.js";
export default {
  name: "home",
  mixins: [WatchScreen, GetUserInfo],
  provide() {
    return {
      $main: this
    };
  },
  data() {
    return {
      open: false, // true是隐藏左侧菜单
      name: "wxx",
      smallSize: false, // true是小屏幕的情况
      loading: false,
      userInfo: {},
      dialogVisible: false,
      newsList: [],
      isLogin: !!window.sessionStorage.getItem("isLogin")
        ? window.sessionStorage.getItem("isLogin")
        : ""
    };
  },
  computed: {
    showHeader: function() {
      let vm = this;
      if (vm.screenSize == 1) {
        return true;
      } else if (vm.screenSize == 2) {
        if (!!vm.open) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  components: {
    TheHeader,
    TheNav
  },
  mounted: function() {
    let vm = this;
    vm.fnGetUserInfo(); // 获取用户信息
    vm.fnGetNews(); // 获取公告信息
    vm.fnInit(); // 获取登录进来的信息
    document.addEventListener("click", function(e) {
      let _div = document.getElementsByClassName("menuBox")[0];
      // 下面这句代码是获取 点击的区域是否包含你的菜单，如果包含，说明点击的是菜单以外，不包含则为菜单以内
      // if(!!!_div.hasOwnProperty('contains')){
      //   return false;
      // }
      try {
        if (_div.contains(e.target)) {
        } else {
          let type = document.getElementsByClassName("menuBtn")[0];
          if (type.contains(e.target)) {
          } else {
            if (vm.screenSize == 2) {
              vm.open = true;
            }
          }
        }
      } catch (err) {}
      return false;
    });
  },
  methods: {
    fnClose() {
      let vm = this;
      window.sessionStorage.removeItem("isLogin"); // 清除缓存
    },
    // 模态框确定事件
    fnDoSome() {
      let vm = this;
      window.sessionStorage.removeItem("isLogin"); // 清除缓存
      vm.dialogVisible = false;
    },
    // 获取公告信息
    fnGetNews() {
      let vm = this;
      let langType = 'zh';
      if(!!window.localStorage.getItem("locale")){
        langType = window.localStorage.getItem('locale');
      }
      if (!!vm.isLogin) {
        if (this.$route.matched[0].name != "admin") {
          // 是登录页进来并且不是管理员系统
          let params = {
            type: langType == 'zh'?1:2,
            currPage: 1,
            totalPage: 999
          };
          vm.$api.IBM_HOME_NOTICEINFO(params).then(res => {
            if (res.data.list.length > 0) {
              vm.dialogVisible = true;
              vm.newsList = res.data.list;
            } else {
              window.sessionStorage.removeItem("isLogin"); // 清除缓存
            }
          });
        }
      }
    },
    handleOpen() {
      this.open = !this.open;
    },
    // 提示框的展示
    fnOpen(data) {
      let vm = this;
      // 都弹出
      vm.$confirm(
        `<p>${vm.$t("product_rule.verifyUserErr.infoErr")}</p><p>${vm.$t(
          "product_rule.verifyUserErr.submit"
        )}</p><p style="color: red;">${data||''}</p>`,
        vm.$t("system_container.tips"),
        {
          confirmButtonText: vm.$t("system_container.ok"),
          dangerouslyUseHTMLString: true,
          // type: 'warning',
          type: "error",
          center: true,
          // showCancelButton: false,
          showClose: false
          // confirmButtonClass: 'newClass'
        }
      )
        .then(() => {
          window.sessionStorage.removeItem("isLogin"); // 清除缓存
          vm.$router.push(comData.conutry_type + "/user/account/information");
        })
        .catch(() => {
          window.sessionStorage.removeItem("isLogin"); // 清除缓存
        });
    },
    fnInit() {
      let vm = this;
      // 获取用户信息
      if (!!vm.isLogin) {
        if (this.$route.matched[0].name != "admin") {
          // 如果不符合，要清除缓存
          if (!!window.localStorage.getItem("userInfo")) {
            let userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
            if(userInfo.cardStatus == 0){
              // 判断中文还是英文
              if(!!window.localStorage.getItem("locale")){
                let langTyp = window.localStorage.getItem("locale");
                let msg;
                if(langTyp == 'zh'){
                  msg = userInfo.cardReason;
                }else{
                  msg = userInfo.cardReasonEnglish;
                }
                vm.fnOpen(msg); // 弹出信息
              }
            }
          }
        }
      }
    },
    fnGetUserInfo () {
      let vm = this;
      vm.fnGetNewInfo().then(res => {
        vm.userInfo = res;
      });
    }
  },
  watch: {
    screenSize(val) {
      let vm = this;
      vm.open = val == 1 ? false : true;
    },
    // '$route': 'fnInit',
    $route(to, from) {
      let vm = this;
      vm.isLogin = !!window.sessionStorage.getItem("isLogin")? window.sessionStorage.getItem("isLogin"): ""
      vm.fnGetUserInfo();
      if(!!vm.isLogin){
        vm.fnInit();
        vm.fnGetNews();
      }
    }
  }
};
</script>
<style lang="scss">
@import "~@/common/css/base.scss";
.header_top {
  @media screen and (max-width: $smallSize) {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
  }
  &.open {
    display: none;
  }
}
.logo_box {
  // box-shadow: 0px 0px 13px 0px rgba(83, 93, 113, 0.33);
  // background: #0d1752;
  width: 2.8rem;
  height: 0.7rem;
  .logo {
    // background: rgba(20, 41, 102, 1);
    border-radius: 0px 0px 35px 0px;
    height: 100%;
    position: relative;
    overflow: hidden;
    img {
      display: block;
      // width: .63rem;
      // height: .46rem;
      width: 1.2rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
.system_container {
  .el-dialog--center .el-dialog__body {
    padding: 0px !important;
  }
  margin-left: -5px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  height: 100%;
  // background: #060b2c;
  .sidebar_box {
    background: #004994;
    overflow: auto;
    box-sizing: border-box;
    flex-shrink: 0;
    width: 2.8rem;
    position: fixed;
    top: 0.7rem;
    bottom: 0;
    left: 0;
    &.open {
      display: none;
    }
    @media screen and (max-width: $smallSize) {
      position: fixed;
      left: 0;
      top: 0.7rem;
      bottom: 0;
      z-index: 999;
    }
  }
  .right_container {
    display: flex;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;
    flex-direction: column;
    @media screen and (max-width: $smallSize) {
      transition: transform 0.1s;
      transform: translateX(2.85rem);
      &.open {
        transform: translateX(0);
      }
    }
    .el-header {
      position: relative;
      line-height: 0.7rem;
      // background: #0d1752;
      box-shadow: 8px 0px 8px 0px rgba(83, 93, 113, 0.33);
      .el-button {
        border: #fff;
        background-color: #fff;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
.main {
  background: #f8f8f8;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 0;
}
.newsWrap {
  color: #000;
  padding: 0.2rem;
  height: 4rem;
  word-break: break-word;
  .newItem {
    .title {
      font-size: 0.16rem;
      padding: 0.2rem;
      text-align: center;
      margin-bottom: 0.1rem;
      border-top: 1px solid rgba(247, 245, 245, 0.1);
      border-bottom: 1px solid rgba(247, 245, 245, 0.1);
      font-weight: 700;
    }
  }
}
</style>


