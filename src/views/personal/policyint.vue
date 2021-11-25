<template>
  <div class="personal">
    <van-nav-bar title="政策解读" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
      </van-dropdown-menu>
      <van-cell @click="handleclickgetinto(item)" v-for="item in list" :key="item.ID" style="display: flex;align-items: center;" class="hhh" title="加大授企稳岗力度">
        <template #title>
          <span><span v-if="false" style="color:#5683FF">●</span> {{item.TITLE}}</span>
          <p class="p1">{{item.ORG_ID_}}</p>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import {
  getOrganList,
  getPolicyList
} from "@/api/personal";
export default {
  name: "Userinfo",
  components: {},
  data() {
    return {
      value1: 0,
      option1: [
        { text: "全部", value: '0' }
      ],
      list:[],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  watch:{
     value1:{//深度监听，可监听到对象、数组的变化
         handler(val, oldVal){
             this.getPolicyList(val)
         },
         deep:true, //true 深度监听
         immediate: true
     }
  },
  mounted() {
    this.getOrganList();
  },
  methods: {
    loginout() {
      this.$router.push({
        name: "Login",
      });
    },
    getOrganList() {
      getOrganList({
        ORG_TYPE: 1,
        ORG_PLATE: "",
        SEARCH: "",
      })
        .then((res) => {
          let { code, data } = res;
          if (code == 0) {
            data.list.map((item) => {
              this.option1.push({
                text: item.ORG_NAME,
                value: item.ID,
              })
            });
            this.value1 = this.option1[0].value;
          }
        })
        .catch((error) => console.log(error));
    },
    getPolicyList(id) {
      getPolicyList({
        ORG_ID:id=='0'?"":id
      }).then(res=>{
        let {code,data} = res;
        this.list = data.list;

      }).catch(error=>console.log(error))

    },
    handleclickgetinto(data){
      this.$router.push({
        name:"Policyintitem",
        query:{
          id:data.ID
        }
      })
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onBeforeClose(action, done) {
      if (action == "confirm") {
        if (this.newNickname == "") {
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
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
  color: #cccccc;
}
::v-deep .van-dropdown-menu__bar {
  width: 90%;
  height: 47px;
  margin: 0 auto;
  background: #5683ff;
  border-radius: 33px;
  margin-top: 20px;
  .van-dropdown-menu__title {
    color: #ffffff;
  }
}
</style>
