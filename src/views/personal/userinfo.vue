<template>
  <div class="personal">
    <van-nav-bar title="个人信息" left-text="" right-text="保存" left-arrow fixed @click-left="onClickLeft" @click-right="onClickRight" />
    <div style="height: 46px"></div>
    <div class="box">
      <van-cell style="display: flex;align-items: center;" class="hhh" title="头像" is-link>
        <template #right-icon>
          <!-- <van-image
            round
            width="40"
            height="40"
            :src="info.avatar_thumb"
          /> -->
          <img v-if="!!userInfo.REAL_NAME && !!userInfo.PHOTO" class="photo" :src="photo"  alt="">
          <img v-else class="photo" src="../../assets/yiqilai/index/未登录头像.png" alt="">
          <input class="uploaderinput" type="file" name="" accept="image/gif,image/jpeg,image/jpg,image/png" @change="fileChange">
          <!-- <van-icon style="font-size: 16px;color: #969799;" name="arrow" /> -->
        </template>
      </van-cell>
      <van-field right-icon="edit" v-model="userInfo.REAL_NAME" readonly label="姓名" />
      <van-field v-model="userInfo.ORG_ID_" readonly="readonly"   label="企业" right-icon="arrow" />
      <van-field v-model="userInfo.PHONE" maxlength="11" type="number"  label="手机号码" right-icon="arrow" readonly  />
      <van-field v-model="userInfo.PASSWORD" maxlength="11" type="password"  label="密码" right-icon="arrow"  />
    </div>
    <div style="margin: 16px">
        <van-button class="see" round block type="info" native-type="submit" @click="loginout">退出登录</van-button>
      </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapGetters,mapActions } from "vuex";
import {doUpdate,getUserInfo} from "@/api/personal";
const config = require('../../utils/config')
import { Dialog } from 'vant';
export default {
  name: "Userinfo",
  components: {},
  data() {
    return {
      info:{},
      NicknameShow: false,
      Nickname: "",
      newNickname:'',
      sexShow: false,
      sex: "",
      actions: [{name:'保密',disabled: true},{ name: "男" }, { name: "女" }],
      ageShow: false,
      age: "13611366910",
      showname:false,
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      minDate: new Date(1800, 0, 1),
      maxDate: new Date(2020, 1, 1),
      currentDate: new Date(),
      photo:config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/downloadFile?attachId=',
      adatar:'',
      PHOTOID:''
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    if(!!this.userInfo.PHOTO) {

      this.photo +=''+this.userInfo.PHOTO;
    } else {
      this.photo += this.PHOTOID;

    }
    console.log(this.photo,this.userInfo)
    // this.doUpdate()
  },
  methods: {
    ...mapActions(['setuserinfo']),
    getUserInfo() {
      getUserInfo({
        USER_ID:this.userInfo.ID
      }).then(res=>{
        let {code,data} = res;
        this.$store
        .dispatch('user/setuserinfo', data.userMap)
        Dialog.alert({
          title: '提示',
          message: '保存成功',
        }).then(() => {
          // on close
        });
        

      }).catch(error=>console.log(error))
    },
    loginout() {
       this.$store.dispatch('user/logout')
        this.$router.push({
            name: "Login",
        });
    },
    uploader() {
      console.log('上传')
    },
    //头像选择
    fileChange(e) {
        var that = this;
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(e){
          console.log(e)
            that.adatar  = e.target.result;
        }
        reader.readAsDataURL(file);
            that.onRead(file)
    },
    onRead(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file); //接口需要传的参数
      let _this = this;
      var xhr = new XMLHttpRequest();
      const url = config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/saveFile'
      xhr.open("post", url);
      xhr.send(formData);
      xhr.onload = function () {
        if (xhr.status === 200) {
          let { data } = JSON.parse(xhr.response);
          // _this.addressInfo.ATTACHS = _this.addressInfo.ATTACHS+data.att_map.ID+',';
          // _this.uploadImages.push(data.url);
          _this.photo = config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/downloadFile?attachId='
          _this.PHOTOID = data.att_map.ID;
          _this.photo =_this.photo+_this.PHOTOID;
          console.log(data);
        }
      };
      // console.log(file);
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onClickRight() {
      this.update()
    },
    update() {
      doUpdate({
        USER_ID:this.userInfo.ID,
        PHOTO:this.PHOTOID,
        PASSWORD:this.userInfo.PASSWORD,
      }).then(res=>{
        let {code} = res;
        console.log(code)
        this.getUserInfo()
      })
    }
    
  },
};
</script>

<style lang="scss" scoped>
.personal {
  background: #ffffff;
  min-height: 100vh;
  //   width: 100vw;
}
::v-deep .van-nav-bar .van-icon {
  color: #212223;
}

.box {
  img {
    width: 28px;
    height: 28px;
    margin-right: 18px;
    vertical-align: middle;
  }
}
.dialog {
  .van-cell {
    display: flex;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;
    ::v-deep .van-field__control {
      // width: 571px;
      height: 30px;
      background: #ffffff;
      border: 1px solid #999999;
      border-radius: 5px;
    }
  }
}
::v-deep .van-field__control {
  text-align: right;
}
.see {
  width: 80%;
  height: 80px;
  padding: 0px 200px;
  font-size: 28px;
  color: #fff;
  background: rgba(255, 134, 134, 1);
  border: none;
  position: fixed;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
}
.photo {
  width: 72px !important;
  height: 72px !important;
  border-radius: 50%;
}
.hhh {
  position: relative;
  .uploaderinput {
    width: 132px !important;
  height: 72px !important;
  position: absolute;
  right: 0;
  border:solid;
  outline: none;
            opacity: 0;
            cursor: pointer;
            &:focus {
                box-shadow: none;
            }
  }
}
::v-deep .van-nav-bar__right .van-nav-bar__text {
  color: #ffffff !important;
}
</style>
