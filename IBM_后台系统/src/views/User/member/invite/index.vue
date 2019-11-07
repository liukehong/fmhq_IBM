<template>
  <transition name="fade">
    <div class="InviteReg" style="overflow: hidden;">
      <!-- 邀请注册 -->
      <div class="item_title">{{ $t('invite_reg.invite_reg') }}</div>
      <div class="code_box">
        <div class="top_box">
          <!-- 推荐人ID -->
          <div>{{ $t('invite_reg.referral_id') }}</div>
          <div>{{ user.levelId }}</div>
          <div>
            <!-- 复制ID -->
            <p @click="fnDoCopy">{{ $t('common.copy.copy') }}</p>
          </div>
          <div>
            <!-- <img src="../../../../image/invitation_image2.png" alt> -->
            <canvas id="canvas"></canvas>
          </div>
          <!-- 扫一扫 -->
          <!-- 点击邀请链接或扫描二维码注册 -->
          <div>{{ $t('invite_reg.invite_link') }}</div>
        </div>
        <div class="bottom_box">
          <!-- 邀请链接： -->
          <!-- <p>邀请链接：</p> -->
          <p>
            <a target="_blank" style="color: #fff;" :href="path">{{ path }}</a>
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import WatchScreen from "@/mixins/watchScreen.js";
import GetUserInfo from "@/mixins/getUserInfo.js";
import QRCode from "qrcode";
import comData from "@/utils/data.js";
import MessageBox from "@/mixins/messageBox.js";
export default {
  name: "InviteReg",
  mixins: [WatchScreen, GetUserInfo, MessageBox],
  inject: ["$main"],
  data() {
    return {
      user: {
        invite: "",
        levelId: ""
      },
      path: "",
      langType: 'zh',
    };
  },
  mounted: function() {
    this.fnInit();
  },
  methods: {
    fnInit() {
      let vm = this;
      vm.$main.loading = true;
      if (!!window.localStorage.getItem("locale")) {
        vm.langType = window.localStorage.getItem("locale");
      }
      // 获取基本信息
      vm.fnGetNewInfo().then(res => {
        vm.$main.loading = false;
        vm.user.levelId = res.userId;
        vm.user.invite = res.invite;
        vm.path = `${comData.inviteUrl}/#${comData.conutry_type}/login?inviteSuper=${vm.user.invite}&langType=${vm.langType}`;
        vm.useqrcode();
      });
    },
    useqrcode() {
      let vm = this;
      let canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, vm.path, function(err) {
        if (err) {
          console.log("error");
        } else {
          console.log("QRCode success!");
        }
      });
    },
    fnDoCopy() {
      let vm = this;
      vm.$copyText(vm.user.levelId).then(
        function(res) {
          vm.fnOpenMessageBox(vm.$t("common.copy.yes"), "success"); // 复制成功
        },
        function(err) {
          vm.fnOpenMessageBox(vm.$t("common.copy.no"), "error"); // 复制失败
        }
      );
    }
  }
};
</script>
<style lang="scss">
.InviteReg {
  .code_box {
    width: 3.45rem;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 1.14rem;
    background: url("../../../../image/invitation_image1.png");
    .top_box {
      // height: 4.62rem;
      text-align: center;
      color: #32a8ee;
    }
    .bottom_box {
      min-height: 0.87rem;
      background: rgb(28, 52, 113);
      font-size: 0.14rem;
    }
  }
  .top_box div:nth-of-type(1) {
    padding-top: 0.31rem;
    font-size: 0.14rem;
  }
  .top_box div:nth-of-type(2) {
    padding-top: 0.14rem;
    font-size: 0.36rem;
  }
  .top_box div:nth-of-type(3) {
    margin-top: 0.21rem;
    height: 0.4rem;
    p {
      cursor: pointer;
      width: 1.07rem;
      height: 0.4rem;
      background: #32a8ee;
      border-radius: 0.04rem;
      margin: 0 auto;
      color: #fff;
      line-height: 0.4rem;
      font-size: 0.14rem;
    }
  }
  .top_box div:nth-of-type(4) {
    margin-top: 0.6rem;
    // height: 1.63rem;
    img {
      display: block;
      // height: 1.63rem;
      width: 1.63rem;
      margin: 0 auto;
    }
  }
  .top_box div:nth-of-type(5) {
    padding-top: 0.1rem;
    font-size: 0.16rem;
    padding-bottom: 0.1rem;
  }
  .top_box div:nth-of-type(6) {
    padding-top: 0.1rem;
    font-size: 0.14rem;
  }
  .bottom_box p:nth-of-type(1) {
    padding-left: 0.19rem;
    padding-top: 0.24rem;
    padding-bottom: 0.05rem;
  }
  .bottom_box p:nth-of-type(2) {
    padding-left: 0.19rem;
    word-break: break-all;
    padding-bottom: 0.1rem;
  }
}
</style>
