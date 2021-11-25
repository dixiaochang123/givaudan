<template>
  <div class="shopdetails">
    <van-nav-bar title="改绑手机" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <p class="ppp">设置新的手机 </p>
    <van-form @submit="onSubmit">
      <van-field class="phone" v-model="phone" maxlength="11" type="number" name="手机号码" label="" placeholder="请填写收件人手机号码" :rules="[{ required: true, message: '请填写手机号码' }]">
        <template #label>
          <img src="../../assets/personal/手机 (3).png" alt="">
        </template>
      </van-field>
      <van-field v-model="sms" type="number" center clearable label="" placeholder="请输入短信验证码" :rules="[{ required: true, message: '请输入短信验证码' }]">
        <template #label>
          <img src="../../assets/personal/安全.png" alt="">
        </template>
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button class="see" round block type="info" native-type="submit">确定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Changephonenew",
  components: {},
  data() {
    return {
      phone: "",
      sms: ""
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
    onSubmit(values) {
      console.log("submit", values);
      this.$router.push({
        name: "Binding",
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #ffffff;
  min-height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
}
.ppp {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #3a3a3a;
  padding-left: 20px;
  padding-top: 32px;
  padding-bottom: 49px;
}
.van-form {
  .van-cell__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #3a3a3a;
  }
  ::v-deep .van-field__label {
    width: 2.2em;
    img {
      width: 22px;
      height: 33px;
    }
  }
  .phone {
    ::v-deep input {
      padding-left: 10px;
    }
    ::v-deep .van-field__body {
      &::before {
        content: "+86";
        font-size: 14px;

        color: #3a3a3a;
      }
    }
  }
}

.see {
  width: 80%;
  height: 60px;
  padding: 0px 200px;
  font-size: 14px;
  color: #fff;
  background: linear-gradient(0deg, #fa342e, #ff6f53);
  border: none;
  margin: auto;
  margin-top: 100px;
}
::v-deep .van-field__button {
  .van-button {
    width: 124px;
    height: 40px;
    background: #ff5959;
    border-radius: 20px;
    border-color: #ff5959;
  }
}
</style>
