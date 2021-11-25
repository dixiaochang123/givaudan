<template>
  <div class="personal">
    <van-nav-bar title="企业查询" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
        <van-search
            v-model="value"
            shape="round"
            background="#ffffff"
            input-align="center"
            placeholder="搜索"
            />
      <van-cell style="display: flex;align-items: center;" class="hhh" title="企业申报贷款">
        <template #title>
          <div class="title-temp"><van-icon name="question" class="question" /><p> <span class="s-1">江苏省常州市系统集成有限公司</span><br/><span class="s-2">江苏省常州市武进xx街道</span></p></div>
        </template>
      </van-cell>
      <van-cell style="display: flex;align-items: center;" class="hhh" title="企业申报贷款">
        <template #title>
          <div class="title-temp"><van-icon name="question" class="question" /><p> <span class="s-1">江苏省常州市系统集成有限公司</span><br/><span class="s-2">江苏省常州市武进xx街道</span></p></div>
        </template>
      </van-cell>
      <van-cell style="display: flex;align-items: center;" class="hhh" title="企业申报贷款">
        <template #title>
          <div class="title-temp"><van-icon name="question" class="question" /><p> <span class="s-1">江苏省常州市系统集成有限公司</span><br/><span class="s-2">江苏省常州市武进xx街道</span></p></div>
        </template>
      </van-cell>
      <van-cell style="display: flex;align-items: center;" class="hhh" title="企业申报贷款">
        <template #title>
          <div class="title-temp"><van-icon name="question" class="question" /><p> <span class="s-1">江苏省常州市系统集成有限公司</span><br/><span class="s-2">江苏省常州市武进xx街道</span></p></div>
        </template>
      </van-cell>
      <van-cell style="display: flex;align-items: center;" class="hhh" title="企业申报贷款">
        <template #title>
          <div class="title-temp"><van-icon name="question" class="question" /><p> <span class="s-1">江苏省常州市系统集成有限公司</span><br/><span class="s-2">江苏省常州市武进xx街道</span></p></div>
        </template>
      </van-cell>
      <van-cell style="display: flex;align-items: center;" class="hhh" title="企业申报贷款">
        <template #title>
          <div class="title-temp"><van-icon name="question" class="question" /><p> <span class="s-1">江苏省常州市系统集成有限公司</span><br/><span class="s-2">江苏省常州市武进xx街道</span></p></div>
        </template>
      </van-cell>
      <van-cell style="display: flex;align-items: center;" class="hhh" title="企业申报贷款">
        <template #title>
          <div class="title-temp"><van-icon name="question" class="question" /><p> <span class="s-1">江苏省常州市系统集成有限公司</span><br/><span class="s-2">江苏省常州市武进xx街道</span></p></div>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapGetters } from "vuex";
import {GetUserInfo,UpdateNickname,UpdateSex,UpdateBirthday} from "@/api/personal";
export default {
  name: "Userinfo",
  components: {},
  data() {
    return {
        value:'',
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
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.GetUserInfo()
  },
  methods: {
    loginout() {
        this.$router.push({
            name: "Login"
          });
    },
    GetUserInfo() {
      let params = {
        uid:this.userInfo.id,
        token:this.userInfo.token,
      }
      GetUserInfo(params).then(res=>{
        let {info} = res.data;
        this.info = info;
        this.info.avatar_thumb = (!!info.avatar_thumb && info.avatar_thumb!="/default_thumb.jpg") ? info.avatar_thumb : require("../../assets/index/已登陆默认头像.png")
        this.Nickname = info.user_nicename;
        this.sex = this.actions[info.sex].name;
        this.age = this.info.birthday;
        console.log(info)
      }).catch(error=>console.log(error))
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
    onConfirm1(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.showname = false
      this.sex = value
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.sex = value
    },
    onCancel() {
      Toast('取消');
    },
    onConfirm() {
      let params = {
        uid:this.userInfo.id,
        token:this.userInfo.token,
        nickname:this.newNickname
      }
      UpdateNickname(params).then(res=>{
        let {code} = res.data;
        if(code==1) {
          this.Nickname = this.newNickname
        }
      }).catch(error=>console.log(error))
      this.NicknameShow = false
    },
    select(action, index) {
      console.log(action, index);
      // this.sex = action.name;
      let params = {
        uid:this.userInfo.id,
        token:this.userInfo.token,
        sex:index
      }
      UpdateSex(params).then(res=>{
        let {code} = res.data;
        if(code==1) {
          this.sex = action.name;
        }
      }).catch(error=>console.log(error))
    },
    confirm(value) {
      var yearNow = value.getFullYear();
        var monthNow = value.getMonth() + 1;
        var dayNow = value.getDate();
        let str = yearNow+'-'+monthNow+'-'+dayNow
        let age = this.getAge(str)
        if(typeof age == "number") {
          // this.age = age
          let params = {
            uid:this.userInfo.id,
            token:this.userInfo.token,
            birthday:age
          }
          UpdateBirthday(params).then(res=>{
            let {code} = res.data;
            if(code==1) {
              this.age = age
            }
          }).catch(error=>console.log(error))



        } else {
          Toast('年龄有误，请重新选择');
        }
        console.log(typeof age)
      

      this.ageShow = false;
    },
    getAge(str) {
      var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/);
      if (r == null) return false;

      var d = new Date(r[1], r[3] - 1, r[4]);
      var returnStr = "输入的日期格式错误！";

      if (
        d.getFullYear() == r[1] &&
        d.getMonth() + 1 == r[3] &&
        d.getDate() == r[4]
      ) {
        var date = new Date();
        var yearNow = date.getFullYear();
        var monthNow = date.getMonth() + 1;
        var dayNow = date.getDate();

        var largeMonths = [1, 3, 5, 7, 8, 10, 12], //大月， 用于计算天，只在年月都为零时，天数有效
          lastMonth = monthNow - 1 > 0 ? monthNow - 1 : 12, // 上一个月的月份
          isLeapYear = false, // 是否是闰年
          daysOFMonth = 0; // 当前日期的上一个月多少天

        if ((yearNow % 4 === 0 && yearNow % 100 !== 0) || yearNow % 400 === 0) {
          // 是否闰年， 用于计算天，只在年月都为零时，天数有效
          isLeapYear = true;
        }

        if (largeMonths.indexOf(lastMonth) > -1) {
          daysOFMonth = 31;
        } else if (lastMonth === 2) {
          if (isLeapYear) {
            daysOFMonth = 29;
          } else {
            daysOFMonth = 28;
          }
        } else {
          daysOFMonth = 30;
        }

        var Y = yearNow - parseInt(r[1]);
        var M = monthNow - parseInt(r[3]);
        var D = dayNow - parseInt(r[4]);
        if (D < 0) {
          D = D + daysOFMonth; //借一个月
          M--;
        }
        if (M < 0) {
          // 借一年 12个月
          Y--;
          M = M + 12; //
        }

        if (Y < 0) {
          returnStr = "出生日期有误！";
        } else if (Y === 0) {
          if (M === 0) {
            // returnStr = D + "D";
            returnStr = D;
          } else {
            // returnStr = M + "M";
            returnStr = M;
          }
        } else {
          if (M === 0) {
            // returnStr = Y + "Y";
            returnStr = Y;
          } else {
            // returnStr = Y + "Y" + M + "M";
            returnStr = Y;
          }
        }
      }

      return returnStr;
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
.title-temp {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    p {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #000000;
        padding-left: 16px;
        box-sizing: border-box;
    }
    .s-2 {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #CCCCCC;
    }
}
</style>
