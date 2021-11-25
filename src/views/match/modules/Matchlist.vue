<template>
  <div class="list">
    <!-- <div v-if="data==false" class="nodata">
      <img src="../../../assets/match/没有数据信息.png" alt="">
      <p>暂时没有数据哦~</p>
    </div> -->
    <Nodata v-if="matchList.length==0" />
    <van-list v-else v-model="loading" :finished="isFinished" finished-text="没有更多了" @load="onReachBottom" :immediate-check="false">
      <div>
        <!-- <p class="date" @click="show = true">{{matchList[0].titleTime}}</p> -->
        <div v-for="(key,index) in matchList" :key="index">
          <!-- <van-cell class="date" is-link title="今天 07月23日 星期四" @click="show = true" /> -->
          <div class="list_content">
            <div class="li" @click="matchdetails(key)">
              <div class="first">
                <p class="time">{{key.hmTime}}</p>
                <p class="text">{{key.leagueChs || key.leagueChsShort}}</p>
              </div>
              <div class="nth2">
                <p>
                  <img :src="key.homeLogo || src" alt="">
                  <span>{{key.homeTeamChs || key.homeChs}}</span>
                </p>
                <p>
                  <img :src="key.awayLogo || src" alt="">
                  <span>{{key.awayTeamChs || key.awayChs}}</span>
                </p>
              </div>
              <!-- 1表示已预约 0 表示未预约. -->
              <!-- <div :class="[key.liveRooms.length>0 ? 'live nth3': key.isMatchBook=='0'?'nth3 maketrue': 'nth3 makefalse']"> -->
              <div :class="[key.liveRooms.length>0 ? 'live nth3': 'nth3']">
                <p :class="[parseInt(key.homeScore) > parseInt(key.awayScore) ? 'active':'']">{{key.homeScore || '-'}}</p>
                <p :class="[parseInt(key.homeScore) < parseInt(key.awayScore) ? 'active1':'']">{{key.awayScore || '-'}}</p>
              </div>
              <div class="nth4">
                <img v-if="key.liveRooms.length>0" src="../../../assets/match/视频 (5).png" alt="">
                <img v-if="key.liveRooms.length==0" src="../../../assets/match/视频 (3).png" alt="">
                &nbsp;&nbsp;
                <span v-if="key.liveRooms.length>0"> 直播中</span>
                <span v-if="key.liveRooms.length==0">{{ state[key.matchState]}}</span>
              </div>

            </div>
          </div>

        </div>
        <div class="anchor_list" v-if="hots.length!=0">
          <span>主播：</span>
          <div class="anchor_li">
            <div v-for="(item,index) in hots" :key="index">
              <img :src="item.avatar" alt="">
              <span>{{item.user_nicename}}</span>
            </div>
          </div>
        </div>

      </div>
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
        <van-picker show-toolbar :columns="actions" :value-key="gameTime" @confirm="fnShowTime" @cancel="show=false"></van-picker>
      </van-popup>
    </van-list>
    <LoginBox v-if="LoginBoxIsShow" />
  </div>

</template>

<script>
import { Toast } from "vant";
import LoginBox from "@/components/LoginBox";
import Nodata from "./Nodata";
import { GetDate, GetHot, Reservation, GetReservationList } from "@/api/match";
import { mapGetters } from "vuex";
export default {
  props: ["match", "isLoading", "isFinished", "hots"],
  components: {
    Nodata,
    LoginBox,
  },
  data() {
    return {
      src: require("../../../assets/index/未登陆29x29.png"),
      show: false,
      LoginBoxIsShow: false,
      actions: [],
      gameTime: "",
      matchAll: [],
      matchList: [],
      state: {
        0: "未开",
        1: "上半场",
        2: "中长",
        3: "下半场",
        4: "加时",
        5: "点球",
        "-1": "完场",
        "-10": "取消",
        "-11": "待定",
        "-12": "腰斩",
        "-13": "中断",
        "-14": "推迟",
      },
    };
  },
  watch: {
    match: {
      handler(val) {
        this.matchList = val;
        let now = "";
        this.matchList.map((item) => {
          if (!item["matchState"]) {
            item["matchState"] = item.matchState || item.state;
          }
           if(item.awayScore=='暂无数据') {
                  item.awayScore = 0
                }
                if(item.homeScore=='暂无数据') {
                  item.homeScore = 0
                }
                // if(item.matchState=='暂无数据') {
                //   item.matchState = 0
                // }
          if (
            new Date(item.date).toDateString() === new Date().toDateString()
          ) {
            now = "今天";
          } else {
            now = "";
          }

          item["titleTime"] =
            now +
            " " +
            this.getdate(new Date(item.date)) +
            "  " +
            this.getWeek(new Date(item.date));
          item["hmTime"] = item.matchTime.substring(
            item.matchTime.length - 8,
            item.matchTime.length - 3
          );
          item["ywdTime"] = this.getdate1(new Date(item.date));
        });
        let params = {
          page: 1,
          date: '2021-03-04',
          token: this.userInfo.token,
          uid: this.userInfo.id,
        };
        if (!!this.userInfo.id) {
          GetReservationList(params)
            .then((res) => {
              let { ret, data } = res;
              if (ret == 200) {
                data.info.result.map((item) => {
                  this.matchList.map((key) => {
                    if (item.matchId == key.matchId) {
                      key["isMatchBook"] = "1";
                    }
                  });
                });
                console.log(this.matchList)
              }
            })
            .catch((error) => console.log(error));
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
    loading: {
      get() {
        return this.isLoading;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  mounted() {
    this.GetDate();
    // this.GetHot();
  },
  methods: {
    closeBox(data) {
      this.LoginBoxIsShow = data;
    },
    onReachBottom() {
      this.$emit("onReachBottom");
    },
    GetHot() {
      GetHot()
        .then((res) => {
          let { ret, data } = res;
          if (ret == 200) {
            this.hots = data.info[0].list;
          }
        })
        .catch((error) => console.log(error));
    },
    //时间戳转时间
    getdate(now) {
      let y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return (m < 10 ? "0" + m : m) + "月" + (d < 10 ? "0" + d : d) + "日";
    },
    //时间戳转时间
    getdate1(now) {
      let y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    },
    // 时间转时间戳
    timestamp(strtime) {
      var date = new Date(strtime);
      //传入一个时间格式，如果不传入就是获取现在的时间了，这样做不兼容火狐。
      // Date()参数形式有7种
      // new Date("month dd,yyyy hh:mm:ss");=>new Date("September 16,2016 14:15:05");
      // new Date("month dd,yyyy");=>new Date("September 16,2016");
      // new Date("yyyy/MM/dd hh:mm:ss");=>new Date("2016/09/16 14:15:05");
      // new Date("yyyy/MM/dd");=>new Date("2016/09/16");
      // new Date(yyyy,mth,dd,hh,mm,ss);=>new Date(2016,8,16,14,15,5); => 月份从0～11
      // new Date(yyyy,mth,dd);=>new Date(2016,8,16);
      // new Date(ms);=>new Date(1474006780);
      // 可以这样做
      var date = new Date(strtime.replace(/-/g, "/"));

      // 有三种方式获取，在后面会讲到三种方式的区别
      let time1 = date.getTime(); //精确到毫秒:1398250549123
      let time2 = date.valueOf(); //精确到毫秒:1398250549123
      let time3 = Date.parse(date); //只能精确到秒，毫秒将用0来代替:1398250549000
      // console.log(time1, time2, time3); //1398250549012 1398250549012 1398250549000
      return time1;
    },
    formatTime(number, format) {
      var formateArr = ["Y", "M", "D", "h", "m", "s"];
      var returnArr = [];

      var date = new Date(number * 1000);
      returnArr.push(date.getFullYear());
      returnArr.push(this.formatNumber(date.getMonth() + 1));
      returnArr.push(this.formatNumber(date.getDate()));

      returnArr.push(this.formatNumber(date.getHours()));
      returnArr.push(this.formatNumber(date.getMinutes()));
      returnArr.push(this.formatNumber(date.getSeconds()));

      for (var i in returnArr) {
        format = format.replace(formateArr[i], returnArr[i]);
      }
      return format;
    },

    //数据转化
    formatNumber(n) {
      n = n.toString();
      return n[1] ? n : "0" + n;
    },
    getWeek(timedat) {
      //timedat参数格式：   getWeek（new Date("2017-10-27" )）
      var week;
      if (timedat.getDay() == 0) week = "星期日";
      if (timedat.getDay() == 1) week = "星期一";
      if (timedat.getDay() == 2) week = "星期二";
      if (timedat.getDay() == 3) week = "星期三";
      if (timedat.getDay() == 4) week = "星期四";
      if (timedat.getDay() == 5) week = "星期五";
      if (timedat.getDay() == 6) week = "星期六";
      return week;
    },
    GetDate() {
      GetDate()
        .then((res) => {
          let { ret, data } = res;
          if (ret == 200) {
            this.actions = data.info.list.map((item) => {
              let curKey = Object.keys(item); //Object.keys可以提取出对象中的key值,注意取出的key是数组
              return item[curKey[0]];
            });

            this.gameTime = "0";
          }
        })
        .catch((error) => console.log(error));
    },
    //选择时间
    fnShowTime(val) {
      this.gameTime = this.actions.findIndex((item) => item == val) + "";
      console.log(this.gameTime);
      this.show = false;
    },
    matchdetails(key) {
      if (!this.userInfo.id) {
        this.LoginBoxIsShow = true;
        return;
      } else {
        this.LoginBoxIsShow = false;
      }
      let {
        liveType,
        leagueId,
        matchId,
        matchTime,
        homeTeamId,
        homeTeamChs,
        awayTeamId,
        awayTeamChs,

        homeId,
        homeChs,
        awayId,
        awayChs
      } = key;
      let params = {
        liveType,
        leagueId,
        matchId,
        matchTime,
        homeId: homeId||homeTeamId,
        homeChs: homeChs|| homeTeamChs,
        awayId: awayId||awayTeamId,
        awayChs: awayChs||awayTeamChs,
        uid: this.userInfo.id,
        token: this.userInfo.token,
      };
      console.log(789,key,params);
      if(key.matchState!="-1") {

        Reservation(params).then((res) => {});
      }
      // return;
      this.$router.push({
        name: "Matchdetails",
        query: {
          matchState: this.state[key.matchState],
          matchId,
          liveType,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 100%;
  .nodata {
    width: 100%;
    text-align: center;
    padding-top: 185px;
    p {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      padding-top: 51px;
    }
  }
  .date {
    height: 72px;
    line-height: 72px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #333333;
    background-color: #f5f5f5;
    padding-left: 20px;
    position: -webkit-sticky;
    position: sticky;
    top: 75px;
    z-index: 2;
  }
  .list_content {
    width: 100%;
    .li {
      height: 130px;
      background-color: #fff;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      > div {
        width: 25%;
        &.first {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-left: 20px;
          .time {
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
          }
          .text {
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
          }
        }
        &.nth2 {
          width: 40%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p {
            display: flex;
          }
          img {
            vertical-align: middle;
            width: 48px;
            height: 37px;
          }
          span {
            display: inline-block;
            padding-left: 20px;
            font-size: 24px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
          }
        }
        &.nth3 {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: flex-end;
          font-family: DIN;
          font-weight: bold;
          color: #999999;
          position: relative;
          padding-right: 22px;
          &::after {
            content: "";
            display: inline-block;
            width: 2px;
            height: 89px;
            background: #e5e5e5;
            position: absolute;
            right: 0;
            top: 20px;
          }
          &.live {
            &::before {
              content: "";
              display: inline-block;
              background: url(../../../assets/live@2x.gif) no-repeat center
                center;
              background-size: contain;
              width: 26px;
              height: 26px;
              // background: #e5e5e5;
              position: absolute;
              left: 30%;
              top: 40%;
            }
          }
          &.makefalse {
            &::before {
              content: "";
              display: inline-block;
              background: url(../../../assets/match/矢量智能对象.png) no-repeat
                center center;
              background-size: contain;
              width: 26px;
              height: 26px;
              // background: #e5e5e5;
              position: absolute;
              left: 30%;
              top: 40%;
            }
          }
          &.maketrue {
            &::before {
              content: "";
              display: inline-block;
              background: url(../../../assets/match/闹钟.png) no-repeat center
                center;
              background-size: contain;
              width: 26px;
              height: 26px;
              // background: #e5e5e5;
              position: absolute;
              left: 30%;
              top: 40%;
            }
          }
          .active {
            color: #3a3a3a;
            &::after {
              content: "◀";
              display: inline-block;
              font-size: 14px;
              color: "#000" !important;
              position: absolute;
              right: 0;
              top: 20px;
            }
          }
          .active1 {
            color: #3a3a3a;
            &::after {
              content: "◀";
              display: inline-block;
              font-size: 14px;
              color: "#000" !important;
              position: absolute;
              right: 0;
              bottom: 20px;
            }
          }
        }
        &.nth4 {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-right: 21px;
          img {
            vertical-align: middle;
            width: 20px;
            height: 19px;
          }
          span {
            display: inline-block;
            padding-left: 2px;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
          }
        }
      }
    }
  }
  .anchor_list {
    height: 109px;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: start;
    > span {
      line-height: 109px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #333333;
      padding-left: 20px;
      white-space: nowrap;
    }
    .anchor_li {
      border-top: solid 1px #eeeeee;
      display: flex;
      flex-wrap: nowrap;
      width: calc(100% - 100px);
      white-space: nowrap;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      overflow-x: scroll;
      > div {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        padding-right: 15px;
        img {
          vertical-align: middle;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
    }
    .noanchor {
      width: auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img {
        border-radius: 50%;
      }
      p {
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        padding-left: 22px;
      }
    }
  }
}
</style>
