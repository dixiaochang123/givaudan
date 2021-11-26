<template>
  <div class="shopdetails">
    <van-nav-bar title="样本出库" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height:56px;background-color:#F4F4F4"></div>
    <div class="box">
        <img class="images" width="60%" src="../../assets/qihuadun/扫码.png" alt="" srcset="">
        <p>请将您扫码枪靠近商品</p>
        <p>请确保15cm内</p>
        <p>按下扫码枪上的按钮后开始扫码</p>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Warehousing",
  components: {},
  data() {
    return {
      
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
      setTimeout(()=>{
        this.$router.push({
            name:'Checkout'
        })
      },1500)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    }
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #fff;
  height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
}
.box {
    width: 100%;
    background-color: #fff;
    text-align: center;
}
.images {
    margin: 80px auto;
}
p {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 50px;
}
</style>
