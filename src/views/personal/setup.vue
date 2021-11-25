<template>
  <div class="personal">
    <van-nav-bar title="设置" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <!-- <van-cell title="清除缓存" value="23.1kb"></van-cell> -->
      <van-cell class="edition" title="版本号" value="v1.0.2"></van-cell>
      <div class="btn"></div>
      <van-button type="primary" color="#ffffff" block @click="logout">退出登录</van-button>

    </div>

  </div>
</template>

<script>
import { Dialog } from 'vant'
import { mapGetters } from "vuex";
export default {
  name: "Setup",
  components: {},
  data() {
    return {
      password: "",
      phone: "",
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
    onOversize(file) {
      Toast("正在上传");
      console.log(file);
      Toast("文件大小不能超过 500kb");
    },
    onRead(file) {
      Toast("正在上传");
      console.log(file);
    },
    logout() {
      
      Dialog.confirm({
        title: "确定要退出当前账号嘛？",
        message: "",
      })
        .then(() => {
          this.$store.dispatch('user/logout').then((res) => {
            this.$notify({ type: 'success', message: '退出登录成功' })
            // this.$router.replace('/')
            this.$router.push({
                name:"Login"
            })
          })
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.personal {
  background: #f5f5f5;
  min-height: 100vh;
}
::v-deep .van-nav-bar .van-icon {
  color: #212223;
}
.placeholder {
  height: 30px;
}
.box {
  .edition {
    .van-cell__value {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #3a3a3a;
    }
  }

  .btn {
    height: 30px;
  }
  .van-button__text {
    font-family: PingFang SC;
    font-weight: 400;
    color: #ff3333;
  }
}
</style>
