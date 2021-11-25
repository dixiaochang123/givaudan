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
      <h3>注册</h3>
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
        v-model="form.user_login"
        type="number"
        maxlength="11"
        clearable
        name="手机号码"
        label="+86"
        placeholder="请输入手机号码"
        :rules="[
          {
            validator: checkMobile,
            required: true,
            message: '请输入正确的手机号码!',
          },
        ]"
      />
      <van-field
      style="background:none;"
        v-model="form.code"
        type="number"
        maxlength="6"
        center
        clearable
        label=""
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码！' }]"
      >
        <template #button>
          <van-button size="small" :disabled="safety.state" type="primary" @click="getCode">{{safety.text}}</van-button>
        </template>
      </van-field>
      <van-field
      style="background:none;"
        v-model="form.user_pass"
        center
        clearable
        label=""
        placeholder="请设置6-20位至少两种字符组合密码"
        :rules="[{validator: checkPassword, required: true, message: '请设置密码' }]"
      >
      </van-field>

      <div style="margin: 36px">
        <van-button
          class="disabled"
          round
          block
          :loading="loading"
          type="info"
          loading-text="注册中..."
          native-type="submit"
        >立即注册</van-button>

      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant';
import {GetCode,UserRegister} from '@/api/login'

export default {
  name: 'Registration',
  data() {
    return {
      form: {
        user_login: '',
        user_pass: '',
        code: ''
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
  computed:{

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
    onClickLeft() {
      this.$router.go(-1);//返回上一层
    },
    // 获取验证码
    getCode() {
      GetCode(this.form.user_login).then(res=>{
        let {code,msg} = res.data;
        if(code!=0) {
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
    checkMobile(value) {
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
      UserRegister(this.form).then(res=>{
        let {code,msg} = res.data;

        if (code == 1) {
						this.$notify({
              type: 'success',
              message: '注册成功',
              duration: 2000,
              onOpened: () => {
                this.loading = false
                this.$router.push({name:"Login"})
              }
            })

					} else {
					   Toast({
            message: msg,
            position: 'top',
          });
					}
        // if(code!=0) {
        //   Toast({
        //     message: msg,
        //     position: 'top',
        //   });
        // }
        console.log(code,msg)
      }).catch(error=>console.log(res))
      // this.$store
      //   .dispatch('user/login', this.form)
      //   .then(() => {
      //     this.$notify({
      //       type: 'success',
      //       message: '登录成功',
      //       duration: 2000,
      //       onOpened: () => {
      //         this.loading = false
      //         location.href = this.redirect
      //       }
      //     })
      //   })
      //   .catch(() => {
      //     this.loading = false
      //   })
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
