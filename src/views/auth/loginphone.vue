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
    <!-- <div style="height:30px;"></div> -->
    <div class="header">
      <div class="images">
        <img src="../../assets/qihuadun/logo.png" alt="" srcset="">
      </div>
      <div class="flexs">
        <p style="text-align: left;color: #FFFFFF;font-size: 20px;">奇华顿样本</p>
        <p style="text-align: left;color: #FFFFFF;font-size: 16px;">管理系统</p>

      </div>
      <!-- <div class="imags1">
        <img  src="../../assets/yiqilai/login/插画@3x.png" alt="">
      </div> -->
    </div>

    <van-form
      class="form"
      validate-trigger="onSubmit"
      :show-error="false"
      @submit="onSubmit"
    >
    <p class="p1" style="visibility: hidden;">快捷登录</p>
    <p class="p2" style="visibility: hidden;"></p>
    <p class="p2" style="visibility: hidden;"></p>
    <p class="label">账号</p>
      <van-field
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
      <p class="label">密码</p>
      <van-field
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

      <div style="margin-top: 30px">
        <van-button
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
        mobile: 'admin',
        code:'111111'
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
  // background-color: #F4F7F9;
  background-color: #ffffff;
  display:flex;
  justify-content: flex-start;
  flex-direction: column;
  // align-items: center;
  .van-nav-bar {
    background-color: rgba(255,255,255,-0.2);
    ::v-deep .van-icon {
      color: #3A3A3A;
    }
  }
  .header {
    background: url('../../assets/qihuadun/组 1.png') no-repeat  right bottom;
    background-size: cover;
    // padding-left: 30px;
    // padding-right: 25px;
    box-sizing: border-box;
    height: 500px;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // flex-direction: column;

    p{

      color: #FFFFFF;
    }
    
    .images {
      width: 100px;
      height: 100px;
      box-sizing: border-box;
      margin-left: 50px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .flexs {
      height: 100px;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
    p {
      // height: 17px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
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
    position: relative;
    z-index: 1;
    margin-top: -50px;
    padding: 24px 45px;
    // margin-top: 50px;
    background-color: #fff;
    border-top-left-radius: 60px;
    border-top-right-radius: 60px;
    height: calc(100vh - 500px);
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
      background-color: #F2F2F4 !important;
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
      background: #2D92FA;
      border:none;
      color: #313A52;
      width: 100%;
      font-size: 16px;
font-family: PingFang SC;
font-weight: 500;
color: #FFFFFF;
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
  // border-bottom: solid 1px rgba(0,0, 0, 0.05);
}
.label {
  height: 100px;;
  line-height: 100px;
  font-size: 28px;
font-family: PingFang SC;
font-weight: 500;
color: #999999;
}
</style>
