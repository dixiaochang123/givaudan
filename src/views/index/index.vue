<template>
  <div class="main">
    <div class="header">
      <div class="banner">
        <p><img src="../../assets/qihuadun/logo.png" alt="" srcset="">QC奇华顿</p>
        <img src="../../assets/qihuadun/bj.png" alt="" srcset="">
      </div>
      <div class="header-info">
        <div>
          <span class="number">142</span>
          <span>现有库存</span>
        </div>
        <div>
          <span class="number">142</span>
          <span>已出库</span>
        </div>
        <div>
          <span class="number">142</span>
          <span>已报废</span>
        </div>
      </div>

    </div>
    <div class="main-box">
      <div class="flex2">
        <div class="flex-1" @click="gotoWantdetails">
          <p class="p1">样本入库</p>
          <p class="p2"></p>
          <p class="p3">Sample warehousing</p>
          <img src="../../assets/qihuadun/入库.png" alt="" srcset="">
        </div>
        <div class="flex-2" @click="gotocheckout">
          <p class="p1">样本出库</p>
          <p class="p2"></p>
          <p class="p3">Sample delivery</p>
          <img src="../../assets/qihuadun/出库.png" alt="" srcset="">
        </div>

      </div>
      <div class="flex3" @click="scrapprocess">
        <p class="p1">报废流程</p>
        <p class="p2"></p>
        <p class="p3">Sample delivery</p>
        <p class="p2" style="visibility: hidden;"></p>
        <img src="../../assets/qihuadun/报废流程.png" alt="" srcset="">
      </div>
    </div>
    <div class="btn" style="margin: 15px">
      <van-button block type="info" @click="loginout">安全退出</van-button>

    </div>

  </div>
</template>

<script>
import { getUserInfo } from "@/api/personal";
import { mapGetters, mapActions } from "vuex";
const config = require("../../utils/config");
export default {
  name: "Index",
  components: {},
  data() {
    return {
      isLogin: false,
      refreshing: false,
      loading: false,
      photo:
        config[process.env.NODE_ENV].mockUrl +
        "/wjyql/uploadFile/downloadFile?attachId=",
      url:
        config[process.env.NODE_ENV].mockUrl +
        "/wjyql/uploadFile/downloadFile?attachId=",
      indexData: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    $route: {
      handler(route) {
        console.log("route:", this.userInfo);
        this.getUserInfo();
      },
      immediate: true,
      deep: true,
    },
    // 'userInfo': {
    //   handler(newName) {
    //     this.getUserInfo()
    //   },
    //   immediate: true,
    //   deep: true
    // }
  },
  created() {
    this.getUserInfo();
  },
  mounted() {
    this.photo =
      config[process.env.NODE_ENV].mockUrl +
        "/wjyql/uploadFile/downloadFile?attachId=" +
        this.userInfo.PHOTO || 12067;
  },
  methods: {
    ...mapActions(["setuserinfo"]),
    getUserInfo() {
      getUserInfo({
        USER_ID: this.userInfo.ID,
      })
        .then((res) => {
          let { code, data } = res;
          this.$store.dispatch("user/setuserinfo", data.userMap);
          this.photo =
            config[process.env.NODE_ENV].mockUrl +
              "/wjyql/uploadFile/downloadFile?attachId=" +
              this.userInfo.PHOTO || 12067;
          // this.setuserinfo(data.userMap)
        })
        .catch((error) => console.log(error));
    },
    loginout() {
       this.$store.dispatch('user/logout')
        this.$router.push({
            name: "LoginPhone",
        });
    },
    gotoWantdetails() {
      this.$router.push({
        name:'Wantdetailsscan'
      })
    },
    gotocheckout() {
      this.$router.push({
        name:'Checkoutscan'
      })
    },
    scrapprocess() {
      this.$router.push({
        name:'Scrapprocess'
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  background: #f4f4f4;
  height: 100vh;
}
.header {
  height: 300px;
  position: relative;
  .banner {
    height: 250px;
    position: relative;
    p {
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 30%;
      margin: 0 auto;
      font-weight: bold;
      color: #ffffff;
      img {
        width: 50px;
        height: 50px;
        vertical-align: middle;
        margin-right: 20px;
        box-sizing: border-box;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .header-info {
    height: 150px;
    margin: 0 30px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #ffffff;
    box-shadow: -1px 11px 27px 0px rgba(68, 68, 68, 0.14);
    border-radius: 12px;
    > div {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #666666;
      .number {
        font-size: 25px;
        font-family: DIN;
        font-weight: bold;
        color: #333333;
        padding-bottom: 20px;
      }
    }
  }
}
.main-box {
  padding: 0 30px;
  padding-top: 30px;
  box-sizing: border-box;

  img {
    width: 65px;
    height: 65px;
    position: absolute;
    left: 30px;
    bottom: 30px;
  }
  .flex2 {
    display: flex;
    justify-content: space-between;
    > div {
      width: 50%;
      height: 335px;
      border-radius: 10px;
      text-align: left;
      padding: 30px;
      box-sizing: border-box;
      position: relative;
    }
    .flex-1 {
      background: url("../../assets/qihuadun/组 2.png") no-repeat center;
      background-size: cover;
      margin-right: 15px;
    }
    .flex-2 {
      background: url("../../assets/qihuadun/组 3.png") no-repeat center;
      background-size: cover;
      margin-left: 15px;
    }
  }
  .flex3 {
    height: 335px;
    width: 100%;
    border-radius: 10px;
    background: url("../../assets/qihuadun/组 5.png") no-repeat center;
    background-size: cover;
    margin-top: 30px;
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .p2 {
      margin: 10px auto;
    }
    img {
      width: 55px;
      height: 55px;
      position: initial;
    }
  }
  .p1 {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    line-height: 41px;
  }
  .p2 {
    width: 25px;
    height: 3px;
    background: #5cf1e7;
    border-radius: 1.5px;
    margin: 10px 0;
    box-sizing: border-box;
  }
  .p3 {
    font-size: 24px;
    font-family: DIN;
    font-weight: bold;
    color: #ffffff;
    line-height: 41px;
  }
}
.btn {
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;

  bottom: 100px;
}
.van-button--info {
  // width: 600px;
  // height: 80px;
  background: #2d92fa;
  border: none;
  color: #313a52;
  width: 100%;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
</style>
