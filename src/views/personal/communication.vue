<template>
  <div class="personal">
    <van-nav-bar title="交流园地" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <van-search v-model="value1" shape="round" background="#ffffff" input-align="center" placeholder="请输入搜索关键词" />
      <div class="tbs">
        <van-cell to="/releasepost">
          <img src="../../assets/yiqilai/index/edit.png" alt="">
          <p>发布需求分享</p>
        </van-cell>
        <van-cell to="/mypost">
          <img src="../../assets/yiqilai/index/xl.png" alt="">
          <p>我的需求分享</p>
        </van-cell>

      </div>
      <div class="box-main" @click="gotoviewpost1(item)" v-for="item in list" :key="item.ID">
        <p class="p1"><span class="s-1">{{item.TITLE}}</span><span class="s-2">{{item.CREATETIME}}</span></p>
        <p class="p2"><span class="s-1" style="visibility: hidden;"></span>{{item.ORG_ID_}}</p>
        <div class="img">
          <van-image  fit="cover" :src="item.url" />
          <!-- <img :src="item.url" alt="" srcset=""> -->
        </div>
      </div>
      <div style="height:20px;"></div>
      <!-- <div class="box-main">
        <p class="p1"><span class="s-1">寻求口罩机零配件供应商</span><span class="s-2">2020.03.18</span></p>
        <p class="p2"><span class="s-1"></span><span class="s-1" style="visibility: hidden;"></span>虹新技术有限公司</p>
      </div> -->

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getPostList } from "@/api/personal";
const config = require('../../utils/config')
export default {
  //   name: "Userinfo",
  components: {},
  data() {
    return {
      value1: '',
      list:[]
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch:{
    value1(val) {
      this.getPostList(val)
      
    }
  },
  mounted() {
    this.getPostList('');
  },
  methods: {
    gotoviewpost1(val) {
      this.$router.push({
        name:"Viewpost1",
        query:{
          id:val.ID
        }
      })
    },
    getPostList(val) {

      getPostList({
        SEARCH:val
      }).then((res) => {
          let {code,data} = res;
        if(code==0) {
          console.log(data)
          if(!!data.list) {
            data.list.map((item,index)=>{
              item['url'] = config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/downloadFile?attachId='+item.FIRST_ATTACH;
              item.CREATETIME = item.CREATETIME.substring(0,10)
              // this.$set(this.list,index,item)
            })
            this.list = data.list;
          } else {
            this.list = []
          }
          // this.list = data.list;
          // this.$set()
          console.log(this.list )
        }
        })
        .catch((error) => console.log(error));
    },
    loginout() {
      this.$router.push({
        name: "Login",
      });
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
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
  width: 100%;
  padding: 0 30px;
  padding-top: 30px;
  box-sizing: border-box;
}
.tbs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 30px 0;
  > div {
    width: 320px;
    height: 100px;
    background: linear-gradient(0deg, #557EFF, #91ACFF);
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    box-sizing: border-box;
    > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #FFFFFF;
    }
    img {
      width: 55px;
      height: 55px;
      // vertical-align: middle;
    }
    p {
      padding-left: 13px;
    }
  }
}
.box-main {
  width: 100%;
  padding: 20px;
  background-color: #f3f4f7;
  border-radius: 20px;
  box-sizing: border-box;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  margin-bottom: 30px;
  color: #000000;
  p {
    line-height: 50px;
  }
  .p1 {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .s-1 {
      font-size: 32px;
      display: inline-block;
    }
  }
  .p2 {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    font-weight: 400;
    .s-1 {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: rgba(86, 131, 255, 0);
      border: 3px solid #5683ff;
    }
  }
  .img {
      // height: 260px;
      border-radius: 20px;
      overflow: hidden;
  }
}
</style>
