<template>
  <div class="shopdetails">
    <van-nav-bar title="修改密码" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <p class="ppp">验证码将发送发到 {{phone}} </p>
    <van-form @submit="onSubmit">
      <van-field v-model="code" type="number" center clearable label="" placeholder="请输入短信验证码" :rules="[{ required: true, message: '请输入短信验证码' }]">
        <template #label>
          <img src="../../assets/personal/安全.png" alt="">
        </template>
        <template #button>
          <!-- <van-button size="small" type="primary" @click="getCode">获取验证码</van-button> -->
          <van-button size="small" type="primary" @click="getCode">{{safety.text}}</van-button>
        </template>
      </van-field>
      <van-field class="password" v-model="password" maxlength="11" type="text" name="密码" label="" placeholder="请设置6-20由两个字符组成的密码" :rules="[{ required: true, message: '请设置6-20由两个字符组成的密码' }]">
        <template #label>
          <img src="../../assets/personal/锁(2).png" alt="">
        </template>
      </van-field>
      <van-field class="password" v-model="password1" maxlength="11" type="text" name="密码" label="" placeholder="请再次确认密码" :rules="[{ required: true, message: '请再次确认密码' }]">
        <template #label>
          <img src="../../assets/personal/锁(2).png" alt="">
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button class="see" round block type="info" native-type="submit" @click="submit">确定</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GetBaseInfo, GetForgetCode, UserForget } from "@/api/personal";
import { Toast } from 'vant';
export default {
  name: "Changepassword",
  components: {},
  data() {
    return {
      phone: "",
      phone1: "",
      password: "",
      password1: "",
      code: "",
      // 验证码
      safety: {
        time: 60,
        state: false,
        interval: "",
        text: "获取验证码",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.GetBaseInfo();
  },
  beforeDestroy() {
    clearInterval(this.safety.interval);
  },
  methods: {
    mobileNumberChange(str) {
      return str.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    // 校检密码
    checkPassword(value) {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/
      return reg.test(value)
    },
    // onSubmit(values) {
    //   this.submit()
    //   // this.$router.push({
    //   //   name: "Binding",
    //   // });
    // },
    GetBaseInfo() {
      let params = {
        token: this.userInfo.token,
        uid: this.userInfo.id,
      };
      GetBaseInfo(params)
        .then((res) => {
          console.log(res);
          let { code, info } = res.data;
          this.phone = this.mobileNumberChange(info[0].mobile);
          this.phone1 = info[0].mobile;
        })
        .catch((error) => console.log(error));
    },
    getCode() {
      if (!this.userInfo.token) {
        this.$router.push({
          name: "Login",
        });
      }
      let params = {
        token: this.userInfo.token,
        uid: this.userInfo.id,
        mobile: this.phone1,
      };
      GetForgetCode(params)
        .then((res) => {
          let { code, info, msg } = res.data;
          if (code != 1) {
            Toast({
              message: msg,
              position: "top",
            });
          } else {
            Toast({
              message: "发送成功",
              position: "top",
            });
            this.safety.state = true;
            this.safety.interval = setInterval(() => {
              this.safety.text = this.safety.time + " s";
              if (this.safety.time-- <= 0) {
                this.safety.time = 60;

                this.safety.state = false;
                this.safety.text = "获取验证码";
                clearInterval(this.safety.interval);
              }
            }, 1000);

            // this.code = info.code;
          }
        })
        .catch((error) => console.log(error));
    },
    onSubmit() {
      if (!this.userInfo.token) {
        this.$router.push({
          name: "Login",
        });
      }
      let params = {
        token: this.userInfo.token,
        uid: this.userInfo.id,
        mobile: this.phone1,
        password: this.password,
        code:this.code
      };
      if (!this.phone1 || !this.password || !this.password1) return;
      if (this.password1 !== this.password) {
        Toast({
          message: "两次密码不一致，请重新输入",
          position: "top",
        });
        this.password1 = "";
        return;
      }
      UserForget(params)
        .then((res) => {
          let { code, info, msg } = res.data;
          if (code != 1) {
            Toast({
              message: msg,
              position: "top",
            });
          } else {
            Toast({
              message: msg,
              position: "密码重置成功",
            });
            this.$router.go(-1); //返回上一层
          }
        })
        .catch((error) => console.log(error));
    },
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
      height: 29px;
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
  ::v-deep .van-field--error .van-field__control::placeholder {
    color: #969799;
    -webkit-text-fill-color: currentColor;
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
input::placeholder {
  color: #999999 !important;
}
.van-field__control::-webkit-input-placeholder {
  color: #999999 !important;
}

/* Firefox 4-18 */
.van-field__control:-moz-placeholder {
  color: #999999 !important;
}

/* Firefox 19-50 */
.van-field__control::-moz-placeholder {
  color: #999999 !important;
}
</style>
