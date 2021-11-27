<template>
  <div class="shopdetails">
    <van-nav-bar title="样本入库" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height:56px;background-color:#F4F4F4"></div>
    <div class="box">
        <img class="images" width="60%" src="../../assets/qihuadun/扫码.png" alt="" srcset="">
    <p>请点击终端按钮进行扫码</p>
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
      time:null
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  mounted() {
    window.android.startOrStopScan('1')
    window.setScanResult = this.setScanResult
      // this.time = setTimeout(()=>{
      //   this.$router.push({
      //       name:'Wantdetails',
      //       query: {
      //         sample:'801776487'
      //       }
      //   })
      // },1500)
  },
  destroyed () {
    clearTimeout(this.time)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    setScanResult(result) {
      console.log('返回的值',result)
         this.$router.push({
            name:'Wantdetails',
            query: {
              // sample:'801776487'
              sample:result
            }
        })
      
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
}
</style>
