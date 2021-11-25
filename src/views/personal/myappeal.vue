<template>
  <div class="personal">
    <van-nav-bar title="我的诉求" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <van-cell style="display: flex;align-items: center;" class="hhh" title="" is-link v-for="item in list" :key="item.ID" @click="handleclickgetto(item)">
        <template #title>
          <span><span v-if="item.PROGRESS_=='已办结'" style="color:#FF8686">●</span><span v-else style="color:#FF8686">●</span> {{item.NAME}}</span>
          <p class="p1">{{item.CREATETIME}}</p>
        </template>
        <template #right-icon>
            <van-button v-if="item.STATE==2" color="#FF8686" type="primary" size="mini">{{item.PROGRESS_}}</van-button>
            <van-button v-else color="#FF8686" type="primary" size="mini">{{item.STATE_}}</van-button>
            <!-- <van-button  color="#FF8686" type="primary" size="mini">办理中</van-button>
            <van-button  color="#5683FF" type="primary" size="mini">已办理</van-button>
            <van-button  color="#5683FF" type="primary" size="mini">已评价</van-button>
            <van-button  color="#FF9656" type="primary" size="mini">未评价</van-button> -->
            <van-icon name="arrow" class="arrow" />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {getMyAppealList} from "@/api/personal";
export default {
  name: "Userinfo",
  components: {},
  data() {
    return {
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
    this.getMyAppealList()
  },
  methods: {
    getMyAppealList() {
      getMyAppealList({
          USER_ID:this.userInfo.ID
      }).then(res=>{
        let {code,data} = res
        console.log(code,data)
        if(code==0) {
          this.list = data.list
        }

      }).catch(error=>console.log(error))
    },
    handleclickgetto(item) {
      console.log(item.STATE,item.PROGRESS)
      // 当 state 为 1的时候，可以修改
      // 当 progress 为 2的时候，可以评价
      this.$router.push({
        name: "Appealdetails",
        query: {
          id:item.ID,
          state:item.STATE,
          progress:item.PROGRESS
        }
      });
    },
    onClickLeft() {
      // this.$router.go(-1); //返回上一层
      this.$router.push({
        name: "Index"
      });
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
.p1 {
    font-size: 24px;
font-family: PingFang SC;
font-weight: 500;
color: #CCCCCC;
}
</style>
