<template>
  <div class="login-container">
    <van-nav-bar
      title=""
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="header">
      <h3>重置密码</h3>
      <p>注册登录看即代表你已同意<span>《用户协议》</span></p>
    </div>

    <van-form
      class="form"
      validate-trigger="onSubmit"
      :show-error="false"
      @submit="onSubmit"
    >
      <van-field
      class="phone"
      style="background:none;"
        v-model="form.mobile"
        type="text"
        clearable
        name="手机号码"
        label="+86"
        placeholder="请输入手机号码"
        :rules="[
          {
            validator: checkEmail,
            required: true,
            message: '请输入正确的手机号码!',
          },
        ]"
      />

      <!-- <van-field
        v-model="form.newPassword"
        type="newPassword"
        required
        center
        clearable
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请输入正确的密码！' }]"
      /> -->
      <van-field
      style="background:none;"
        v-model="form.mobileCode"
        center
        clearable
        label=""
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码！' }]"
      >
        <template #button>
          <van-button size="small" type="primary" @click="getCode">{{safety.text}}</van-button>
        </template>
      </van-field>
      <van-field
      style="background:none;"
        v-model="form.newPassword"
        center
        clearable
        label=""
        placeholder="请设置密码（6个字符以上）"
        :rules="[{ validator: checkPassword,required: true, message: '请设置密码（6个字符以上）' }]"
      >
      </van-field>

      <div style="margin: 36px">
        <van-button
          round
          block
          :loading="loading"
          type="info"
          loading-text="登录中..."
          native-type="submit"
        >确定并登录</van-button>
        <!-- <p class="noregister">未注册手机验证后自动登陆</p> -->

        <!-- <van-button
          style="margin-top: 10px"
          plain
          round
          block
          type="info"
          native-type="button"
          to="/registration"
        >注册</van-button> -->
      </div>
    </van-form>
  </div>
</template>

<script>
import { SendResetCode,ResetPassword } from '@/api/login'
import { Toast } from 'vant';
import { mapMutations } from 'vuex'
export default {
  name: 'Forget',
  data() {
    return {
      form: {
        mobile: '',
        newPassword: '',
        mobileCode: ''
      },
      // 验证码
      safety: {
        time: 60,
        state: false,
        interval: '',
        text:'获取验证码'
      },

      loading: false,
      captchaSvg: ''
    }
  },
  watch: {
    $route: {
      handler(route) {
        console.log('route:', route)
        this.redirect = (route.query && route.query.redirect) || '/'
      },
      immediate: true
    }
  },
  mounted() {

  },
  beforeDestroy() {
    clearInterval(this.safety.interval);
  },
  methods: {
    // ...mapMutations({
    //   SET_TOKEN,
    //   SET_USER_INFO
    // }),
    onClickLeft() {
      this.$router.go(-1);//返回上一层
    },
    getCode() {
      let flg = this.checkEmail(this.form.mobile);
      console.log(flg)
      if(!flg)return;
      SendResetCode(this.form.mobile).then(res=>{
        console.log(res)
        let {ret,msg} = res;
        console.log(res,ret,msg)
        if(ret!=200) {
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
      }).catch(error=>console.log(error))

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
      this.$store
        .dispatch('user/forget', this.form)
        .then(() => {
          this.$notify({
            type: 'success',
            message: '登录成功',
            duration: 2000,
            onOpened: () => {
              this.loading = false
              location.href = this.redirect
            }
          })
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url(../../assets/login/bg.png) no-repeat  center;
  background-size: cover;
  .van-nav-bar {
    background-color: rgba(255,255,255,-0.2);
    ::v-deep .van-icon {
      color: #3A3A3A;
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
      color: #3A3A3A;
    }
    p {
      height: 17px;
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      padding-top: 13px;
      span {
        color: #FF5959;
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
      color: #0084FF;
    }
    .van-button--info {
      // width: 600px;
      // height: 80px;
      background: #FF5959;
      border:none;
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

</style>
