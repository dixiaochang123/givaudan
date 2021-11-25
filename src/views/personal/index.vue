<template>
  <div class="personal">
    <van-nav-bar title="个人中心" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 60px"></div>
    <div class="box box1">
      <van-cell to="/userinfo" is-link>
        <van-image
          round
          width="94"
          height="94"
          :src="info.avatar_thumb"
        />
        <div class="text">
          <h3>{{info.user_nicename}}</h3>
          <p>
            <van-image
              round
              width="27"
              height="27"
              :src="img"
            />
            <span v-if="userInfo.id">余额：{{info.huohua || 0}}</span>
            <span v-else>积分：0</span>
          </p>
        </div>
      </van-cell>
    </div>
    <div class="placeholder"></div>
    <div class="box box2">
        <van-cell v-if="false" is-link to="/message">
            <img src="../../assets/personal/消息 (7).png" alt="" srcset=""><span> 消息中心</span>
        </van-cell>
        <van-cell is-link to="/binding">
            <img src="../../assets/personal/锁 (1).png" alt="" srcset=""><span> 账号与绑定</span>
        </van-cell>
        <van-cell is-link to="/tickling">
            <img src="../../assets/personal/反馈_选中.png" alt="" srcset=""><span> 意见与反馈</span>
        </van-cell>
        <!-- <van-cell is-link to="/setup">
            <img src="../../assets/personal/设置 (8) 拷贝.png" alt="" srcset=""><span> 设置</span>
        </van-cell> -->
        <div style="height:50px"></div>
        <van-button type="info" block @click="logout">退出登录</van-button>
    </div>
    <div v-if="!this.userInfo.id" class="placeholderBox" @click="LoginBoxIsShow = true"></div>
    <LoginBox v-if="LoginBoxIsShow"  />
  </div>
</template>

<script>
import {GetUserInfo,GetIntegral} from "@/api/personal";
import { mapGetters } from "vuex";
import LoginBox from '@/components/LoginBox'
import { Dialog } from 'vant'
// import img = require("../../assets/shop/图层 4.png")
export default {
  name: "Personal",
  components: {LoginBox},
  data() {
    return {
      info:{
        avatar_thumb:require("../../assets/index/未登陆.jpg")
      },
      img:require("../../assets/shop/图层 4.png"),
      LoginBoxIsShow:false
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
    this.GetUserInfo()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
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
    closeBox(data) {
      this.LoginBoxIsShow = data;

    },
    GetUserInfo() {
       if (!this.userInfo.id) {
        this.LoginBoxIsShow = true;
        this.info.avatar_thumb = require("../../assets/index/未登陆.jpg")
        return
      } else {
        this.LoginBoxIsShow = false;
        // this.info.avatar_thumb = this.userInfo.avatar
        this.info.avatar_thumb = (!!this.userInfo.avatar && this.userInfo.avatar!="/default.jpg") ? this.userInfo.avatar : require("../../assets/index/登陆.jpg")
      }
      
      let params = {
        uid:this.userInfo.id,
        token:this.userInfo.token,
      }
      GetUserInfo(params).then(res=>{
        let {code,info,msg} = res.data;
        console.log(code,info)
        if(code==1) {
          this.info = info
          if(this.userInfo.avatar=="/default.jpg") {
            this.info.avatar_thumb = require("../../assets/index/登陆.jpg")
          }
        }
      }).catch(error=>console.log(error))
    },
    exchange() {
      this.$router.push({
        name: "Confirmorder",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.personal {
  background: #f5f5f5;
  min-height: 100vh;
  //   width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
}
.placeholderBox {
  height: 600px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.placeholder {
    height: 30px;
}
.box {
  // width: 100%;
  padding: 0 20px;
  
}
.box1 {
.van-cell--clickable {
border-radius: 10px;

}
.van-cell__value {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  padding: 20px;
}
.text {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  padding-left: 26px;
  h3 {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 800;
    color: #3a3a3a;
  }
  p {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #3a3a3a;
    display: flex;
    align-content: center;
    span {
      padding-left: 10px;
    }
  }
}

    .van-icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    margin: auto;
    }

}
.box2 {
    img {
        width: 28px;
        height: 28px;
        margin-right: 18px;
        vertical-align: middle;
    }
}
</style>
