<template>
  <transition name="fade">
    <div style="overflow: hidden;" class="productManage">
      <!-- 购买成功 -->
      <div class="item_title">{{ $t('buy_suc.buy_success') }}</div>
      <div class="item_box">
        <div class="item_list_box successWrap">
          <div class="back_icon" @click="back">
              <i class="el-icon-close"></i>
          </div>
          <div class="buy_suc_box">
            <div class="suc_img">
              <img src="../../../../../static/image/buy_suc.png" alt>
            </div>
            <div class="pro_msg">
                <!-- 购买配套成功！ -->
              <h5 class="suc_tit">{{ $t('buy_suc.buy_pack_suc') }}！</h5>
              <!-- 购买成功 -->
              <!-- 支付资金 -->
              <p>{{ $t('buy_suc.buy_success') }},{{ $t('buy_suc.pay_money') }}:{{ p.buyInfo.money }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import WatchScreen from "@/mixins/watchScreen.js";
export default {
  name: "buy_success", // 配套升级
  mixins: [WatchScreen],
  components: {},
  inject: ["$main","p"],
  data() {
    return {};
  },
  mounted: function() {
    let vm = this;
  },
  methods: {
    // 返回上级页面
    back() {
      this.$router.push({ name: "buy_product" });
    }
  }
};
</script>
<style lang="scss">
.back_icon {
  width: 20px;
  height: 20px;
  line-height: 20px;
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: .2rem;
  cursor: pointer;
}
.successWrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0 !important;
  .buy_suc_box {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 8rem;
    padding: 0.2rem;
    color: #fff;
    .suc_img {
      width: 1rem;
      height: 1rem;
      margin-right: 0.2rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .pro_msg {
      color: #000;
      flex: 1;
      .suc_tit {
        font-size: 0.3rem;
        margin-bottom: 0.2rem;
      }
    }
  }
}
</style>
