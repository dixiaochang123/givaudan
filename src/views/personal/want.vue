<template>
  <div class="personal">
    <van-nav-bar title="猜你想问" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
        <van-search
            v-model="value"
            shape="round"
            background="#ffffff"
            input-align="center"
            placeholder="请输入搜索关键词"
            />
      <van-cell @click="handleclickgetinto(item)" v-for="item in list" :key="item.ID" style="display: flex;align-items: center;" class="hhh" title="企业申报贷款">
        <template #title>
          <span><span style="color:#FF8686"><van-icon name="question" class="question" /></span> {{item.TITLE}}</span>
        </template>
      </van-cell>
      
    </div>
  </div>
</template>

<script>
// import { Toast } from 'vant';
import { mapGetters } from "vuex";
import {getProblemList} from "@/api/personal";
export default {
  name: "Userinfo",
  components: {},
  data() {
    return {
        value:'',
        list:[]
     
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch:{
    value(val) {
      this.getProblemList(val)
      
    }
  },
  mounted() {
    this.getProblemList('')
  },
  methods: {
    loginout() {
        this.$router.push({
            name: "Login"
          });
    },
    getProblemList(val) {
      
      getProblemList({
        SEARCH:val
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
        name:"Wantdetails",
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
//   text-align: right;
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
.question {
  color: #1F56F5;
}
</style>
