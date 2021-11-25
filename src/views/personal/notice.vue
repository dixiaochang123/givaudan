<template>
  <div class="personal">
    <van-nav-bar title="系统通知" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <div>
        <p class="date" style="text-align: center;">2020/03/12 下午 12:00</p>
        <div class="content">
          <div class="imgbox">
            <img src="../../assets/personal/通知.png" alt="">
          </div>
          <div class="text">
            <span>【系统】消费通知</span>
            <p>您于2020-03-14 13:20:09参与幸运大转盘，成功获得 一等奖，请及时和主播联系</p>
          </div>

        </div>
      </div>
      <div>
        <p class="date" style="text-align: center;">2020/03/12 下午 12:00</p>
        <div class="content">
          <div class="imgbox">
            <img src="../../assets/personal/通知.png" alt="">
          </div>
          <div class="text">
            <span>【系统】消费通知</span>
            <p>您于2020-03-14 13:20:09参与幸运大转盘，成功获得 一等奖，请及时和主播联系</p>
          </div>

        </div>
        <div class="content">
          <div class="imgbox">
            <img src="../../assets/personal/通知.png" alt="">
          </div>
          <div class="text">
            <span>【系统】消费通知</span>
            <p>您于2020-03-14 13:20:09参与幸运大转盘，成功获得 一等奖，请及时和主播联系</p>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Notice",
  components: {},
  data() {
    return {
      showPopover: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
  },
};
</script>

<style lang="scss" scoped>
.personal {
  background: #f5f5f5;
  min-height: 100vh;
  //   width: 100vw;
}
::v-deep .van-nav-bar .van-icon {
  color: #212223;
}

.box {
  padding: 0 22px;
  .date {
    padding: 23px 0 40px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  .content {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 30px;
    .imgbox {
      width: 50px;
      height: 50px;
      background: #78aaff;
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      margin-right: 20px;
      img {
        width: 20px;
        height: 20px;
        padding-top: 10px;
      }
    }
    .text {
      width: 556px;
      height: 121px;
      background: #ffffff;
      border-radius: 10px;
      padding: 15px 38px 21px 28px;
      position: relative;
      &::before {
        content: "◀";
        position: absolute;
        left: -9px;
        top: 5px;
        color: #ffffff;
      }
      span {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #3a3a3a;
      }
      p {
        padding-top: 17px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #3a3a3a;
        line-height: 27px;
      }
    }
  }
}
</style>
