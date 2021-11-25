<template>
  <div class="login-container">
    <van-nav-bar title="" left-text="" right-text="" left-arrow @click-left="onClickLeft" />
    <div class="header">
      <h3>密码登陆</h3>
      <p>注册登录看即代表你已同意<span>《用户协议》</span></p>
    </div>

    <van-form class="form" validate-trigger="onSubmit" :show-error="false" @submit="onSubmit">
      <van-field class="phone" style="background:none;" v-model="form.user_login" type="number" clearable name="手机号码" maxlength="11" label="+86" placeholder="请输入正确的手机号码" :rules="[
          {
            validator: checkMobile,
            required: true,
            message: '请输入正确的手机号码!',
          },
        ]" />
      <van-field style="background:none;" v-model="form.user_pass" center clearable label="" placeholder="请输入正确的密码" :rules="[{required: true, message: '请输入密码！' }]">
        <template #button>
          <van-button to="/forget" size="small" type="primary">忘记密码</van-button>
        </template>
      </van-field>

      <div style="margin: 36px">
        <van-button :class="{disabled:!islogin}" round block :loading="loading" type="info" loading-text="登录中..." native-type="submit">登录</van-button>
        <div class="btns">

          <van-button class="smslogin" to="/registration" style="color:#FF5959;" type="primary" size="mini">注册</van-button>
          <van-button class="smslogin" to="/loginphone" style="color:#FF5959;" type="primary" size="mini">验证码登陆</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getCaptcha } from "@/api/public";
import { Login } from "@/api/login";
import { v4 as uuidv4 } from "uuid";
import { Toast } from "vant";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      form: {
        user_login: "",
        user_pass: "",
        // user_login: "15520723955",
        // user_pass: "ll93929ll",
        // captcha: '',
        // isCaptchaShow: false,
        // sid: localStorage.getItem('sid') || ''
      },

      loading: false,
      islogin:true,
      captchaSvg: "",
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch: {
    $route: {
      handler(route) {
        console.log("route:", route);
        this.redirect = (route.query && route.query.redirect) || "/";
      },
      immediate: true,
    },
  },
  mounted() {
    
  },
  methods: {
    onClickLeft() {
      // console.log(this.redirect,this.$router)
      // this.$router.go(-1); //返回上一层
       this.$router.push({
          name:"Index"
      });
    },
    // 校检手机号码
    checkMobile(value) {
      const reg = /^1[3456789]\d{9}$/;
      return reg.test(value);
    },
    // 校检密码
    checkPassword(value) {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/
      return reg.test(value)
    },
    // 提交
    onSubmit() {
      this.loading = true;
      // Login(this.form).then(res=>{
      //   console.log(res)
      //   this.loading = false
      // }).catch(error=>this.loading = false)
      // return;
      this.$store
        .dispatch("user/login", this.form)
        .then(() => {
          this.$notify({
            type: "success",
            message: "登录成功",
            duration: 2000,
            onOpened: () => {
              this.loading = false;
              location.href = this.redirect;
            },
          });
        })
        .catch((error) => {
          let { msg } = error.data;
          Toast({
            message: msg,
            position: "top",
          });
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url(../../assets/login/bg.png) no-repeat center;
  background-size: cover;
  .van-nav-bar {
    background-color: rgba(255, 255, 255, -0.2);
    ::v-deep .van-icon {
      color: #3a3a3a;
    }
  }
  .header {
    padding-left: 30px;
    padding-right: 25px;
    h3 {
      padding-top: 62px;
      font-size: 60px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #3a3a3a;
    }
    p {
      height: 17px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      padding-top: 13px;
      span {
        color: #ff5959;
      }
    }
  }

  .form {
    // background: red;
    padding: 24px;
    margin-top: 50px;
    .van-cell.van-field {
      background-color: none !important;
    }
    .phone {
      ::v-deep .van-field__label {
        -webkit-box-flex: 0;
        -webkit-flex: none;
        flex: none;
        box-sizing: border-box;
        width: 2.2em;
        margin-right: 12px;
        color: #646566;
        text-align: left;
        word-wrap: break-word;
      }
    }
    .van-button--primary {
      border: none !important;
      background: none !important;
      color: #0084ff;
      display: flex;
      justify-content: center;
    }
    .van-button--info {
      // width: 600px;
      // height: 80px;
      background: #ff5959;
      border: none;
    }
    .disabled {
      background: #dfdfdf;
      pointer-events: none; 

    }
    input:-internal-autofill-selected {
      box-shadow: inset 0 0 0 1000px #281840 !important; // 改变了背景色
      -webkit-text-fill-color: #c0aefa; // 改变了字体颜色
    }

    .noregister {
      height: 17px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      text-align: center;
      padding-top: 35px;
    }
    .btns {
      display: flex;
      justify-content: center;
    }
    .smslogin {
      height: 17px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ff5959;
      text-align: center;
      margin-top: 96px;
      display: flex;
      justify-content: center;
    }
  }

  .forget {
    box-sizing: border-box;
    color: #323233b9;
    font-size: 26px;
    text-align: right;
    padding-right: 34px;
    padding-top: 20px;
  }
}
</style>
