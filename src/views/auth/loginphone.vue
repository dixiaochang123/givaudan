<template>
  <div class="login-container">
    <!-- <van-nav-bar
      title=""
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    /> -->
    <div style="height:30px;"></div>
    <div class="header">
      <!-- <van-image
        width="156"
        height="156"
        src="../../assets/yiqilai/login/logo@3x.png"
      /> -->
      <div class="imags">
        <img  src="../../assets/yiqilai/login/logo@3x.png" alt="">
      </div>
      <h3 style="text-align: center;"><span style="color:#566BFF;">“一企来”</span>一起来~</h3>
      <p style="text-align: center;">“为企业开通一键直达的服务快速通道”</p>
      <div class="imags1">
        <img  src="../../assets/yiqilai/login/插画@3x.png" alt="">
      </div>
    </div>

    <van-form
      class="form"
      validate-trigger="onSubmit"
      :show-error="false"
      @submit="onSubmit"
    >
    <p class="p1">快捷登录</p>
    <p class="p2" style="visibility: hidden;"></p>
    <p class="p2"></p>
      <van-field
       left-icon="friends-o"
      class="phone"
      style="background:none;"
        v-model="form.mobile"
        type="text"
        clearable
        name="手机号码"
        placeholder="请输入您的账号"
        :rules="[
          {
            required: true,
            message: '请输入正确的您的账号!',
          },
        ]"
      />

      <!-- <van-field
        v-model="form.password"
        type="password"
        required
        center
        clearable
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请输入正确的密码！' }]"
      /> -->
      <van-field
       left-icon="bag-o"
      style="background:none;"
        v-model="form.code"
        center
        clearable
        label=""
        type="password"
        placeholder="请输入您的密码"
        :rules="[{ required: true, message: '请输入您的密码！' }]"
      >
        <!-- <template #button>
          <van-button size="small" :disabled="safety.state" type="primary" @click="GetCode">{{safety.text}}</van-button>
        </template> -->
      </van-field>
      <!-- <van-button style="float: right;" to="/orderinfo" size="small" type="primary">注册</van-button> -->

      <div style="margin: 30px">
        <van-button
          round
          block
          :loading="loading"
          type="info"
          loading-text="登录中..."
          native-type="submit"
        >登录</van-button>

      </div>
    </van-form>
  </div>
</template>

<script>
import {GetLoginCode} from '@/api/login'
import { Toast } from 'vant';
import md5 from 'js-md5';
export default {
  name: 'LoginPhone',
  data() {
    return {
      form: {
        // mobile: '18862631752',
        // code:'123456'
        mobile: '',
        code:''
      },
      // 验证码
      safety: {
        time: 60,
        state: false,
        interval: '',
        text:'获取验证码'
      },
      loading: false
    }
  },
  watch: {
    $route: {
      handler(route) {
        console.log('route:', route)
        // this.redirect = (route.query && route.query.redirect) || '/'
      },
      immediate: true
    }
  },
  mounted() {
    // this.getCaptcha()
  },
  beforeDestroy() {
    clearInterval(this.safety.interval);
  },
  methods: {
    onClickLeft() {
      Toast('返回');
       this.$router.go(-1);//返回上一层
    },
    onClickRight() {
      Toast('按钮');
    },
    // 获取验证码
    GetCode() {
      GetLoginCode(this.form.mobile).then(res=>{
        let {code,msg} = res.data;
        if(code!=1) {
          Toast({
            message: msg,
            position: 'top',
          });
        } else {
          Toast({
            message: "发送成功",
            position: 'top',
          });
          this.safety.state = true;
                // 倒计时
                this.safety.interval = setInterval(() => {
                  this.safety.text = this.safety.time+" s"
                  if (this.safety.time-- <= 0) {
                    this.safety.time = 60;
                    
                    this.safety.state = false;
                    this.safety.text = "获取验证码"
                    clearInterval(this.safety.interval);
                  }
                }, 1000);
        }
        console.log(code,msg)
      }).catch(error=>console.log(res))
    },
    // 校检手机号码
    checkEmail(value) {
      const reg = /^1[3456789]\d{9}$/
      return reg.test(value)
    },
    // 校检密码
    checkPassword(value) {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![!#$%^&*]+$)[\da-zA-Z!#$%^&*]{6,20}$/
      return reg.test(value)
    },
    // 提交
    onSubmit() {
      this.loading = true
      let {mobile ,code} = this.form
      let data = {
        USER_NAME:mobile,
        PASSWORD: md5(code),
      }
      this.$store
        .dispatch('user/logincode', data)
        .then((res) => {
          console.log(res)
          this.$notify({
            type: 'success',
            message: '登录成功',
            duration: 1500,
            onOpened: () => {
              this.loading = false
              // location.href = this.redirect
              this.$router.push({
                path:'/index'
              })
            }
          })
        })
        .catch((error) => {
          console.log(error)
          let {msg} = error;
          Toast({
            message: msg,
            position: 'top',
          });
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  // background: url(../../assets/login/bg.png) no-repeat  center;
  // background-size: cover;
  background-color: #F4F7F9;
  display:flex;
  justify-content: space-between;
  flex-direction: column;
  // align-items: center;
  .van-nav-bar {
    background-color: rgba(255,255,255,-0.2);
    ::v-deep .van-icon {
      color: #3A3A3A;
    }
  }
  .header {
    padding-left: 30px;
    padding-right: 25px;
    text-align: center;
    box-sizing: border-box;
    .imags {
      width: 156px;
      height: 156px;
      background: #FFFFFF;
      box-shadow: 0px 9px 43px 2px rgba(0, 18, 148, 0.05);
      border-radius: 33px;
      padding:40px 26px;
      box-sizing: border-box;
      margin: 0 auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .imags1 {
      width: 527px;
      height: 362px;
      margin: 0 auto;
      background:url("../../assets/yiqilai/login/模糊背景.png") no-repeat center center;
      background-size: contain;
      padding:40px 26px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h3 {
      padding-top: 62px;
      font-size: 60px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #3A3A3A;
    }
    p {
      // height: 17px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      padding-top: 13px;
      span {
        color: #FF5959;
      }
    }
    // ::v-deep .van-image {
    //   margin: 0 auto;
    // }
  }

  .form {
    // background: red;
    padding: 24px 45px;
    margin-top: 50px;
    .p1 {
      font-size: 43px;
      font-family: PingFangSC;
      font-weight: 800;
      color: #000000;
      line-height: 48px;
    }
    .p2 {
      width: 69px;
      height: 7px;
      background: #567AFF;
      border-radius: 3px;
      line-height: 48px;
    }
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
      color: #313A52;
    }
    .van-button--info {
      // width: 600px;
      // height: 80px;
      background: #ffffff;
      border:none;
      color: #313A52;
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
::v-deep .van-field {
  border-bottom: solid 1px rgba(0,0, 0, 0.05);
}

</style>
