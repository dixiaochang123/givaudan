<template>
  <div class="personal">
    <van-nav-bar title="系统消息" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <van-cell @click="handleclickgetinto(item)" v-for="item in list" :key="item.ID">
        <div class="imgbox">
            <img src="../../assets/personal/通知.png" alt="">
        </div>
        <div class="text">
          <h3>{{item.TITLE}}</h3>
          <p>
            <span>{{item.CREATETIME}}</span>
          </p>
        </div>
      </van-cell>
      
    </div>

  </div>
</template>

<script>
import Nodata from "../like/modules/Nodata"
import {getNoticeList} from "@/api/personal";
import { mapGetters } from "vuex";
export default {
  name: "Message",
  components: {
    Nodata
  },
  data() {
    return {
      page:1,
      list:[]
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.getNoticeList()
  },
  methods: {
    getNoticeList() {
      getNoticeList({
        SEARCH: "",
      }).then(res=>{
       let {code,data} = res;
        if(code==0) {
          console.log(data)
          this.list = data.list;
        }
      }).catch(error=>console.log(error))

    },
    handleclickgetinto(data){
      this.$router.push({
        name:"Notice1",
        query:{
          id:data.ID
        }
      })
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
  .van-cell__value {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    padding: 10px;
  }
  .imgbox {
      width: 90px;
        height: 90px;
        background: #78AAFF;
        border-radius: 50%;
        text-align: center;
        line-height: 90px;
  }
  .text {
    display: flex;
    flex-flow: column;
    justify-content: center;
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
      color: #999999;
      display: flex;
      align-content: center;
    }
  }
  img {
    width: 30px;
    height: 30px;
    padding-top: 25px;
  }
}

</style>
