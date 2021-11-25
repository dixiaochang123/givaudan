<template>
  <!-- https://www.jianshu.com/p/c7ecd50f2e52 -->
  <div class="home-category">
    <!-- <div ref="scroll" class="scroll-wrapper">
      <div class="scroll-content">
        <div v-for="(cate,idx) in list" :key="idx" class="scroll-item__wrapper">
          <div v-for="(item, index) in cate" :key="index" class="scroll-item" @click="onNavigate()">
            <image-pic width="35" height="35" fill="contain" :src="item.icon" />
            <p class="text">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="list && list.prev && list.prev.length > 5" class="dot-wrapper">
      <div class="dot" :style="{'transform': `translateX(${rate})`}" />
    </div> -->
    <div class="swiper-container">
      <div id="box1" class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in noticeList" :key="index" @click="matchdetails(item)">
          <div class="flex flex1">
            <div class="cba">{{item.leagueChs}}</div>
            <div v-if="!!item.roomNum" class="red">
              直播中
              <img src="../../../assets/index/视频 (3).png" alt="">
            </div>
            <div v-else class="red">{{matchState[item.matchState]}} {{item.titleTime}}</div>
            <!-- <div class="red">{{item.matchState}}</div> -->
          </div>
          <div class="flex flex2">
            <div>
              <img :src="item.homeLogo" alt="">
              <div class="ov" style="padding-left:22px;">{{item.homeTeamChs}}</div>
            </div>
            <span>{{item.homeScore || "0"}}</span>
          </div>
          <div class="flex flex3">
            <div>
              <img :src="item.awayLogo" alt="">
              <div class="ov" style="padding-left:22px;">{{item.awayTeamChs}}</div>
            </div>
            <span>{{item.awayScore || "0"}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Swiper from "swiper";

export default {
  props: {
    cateList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      rate: 0,
      breakPoint: 0,
      matchState: {
         '0': "未开" ,
         '1': "上半场" ,
         '2': "中长" ,
         '3': "下半场" ,
         '4': "加时" ,
         '5': "点球" ,
         '6': "2'OT" ,
         '7': "3'OT" ,
         "-1": "完场" ,
         "-10": "取消" ,
         "-11": "待定" ,
         "-12": "腰斩" ,
         "-13": "中断" ,
         '-14': "推迟" ,
      },
      // 0:未开, 1:上半场, 2:中长, 3:下半场, 4:加时, 5:点球, -1:完场, -10:取消, -11:待定, -12:腰斩, -13:中断, -14:推迟
      noticeList: [],
    };
  },
  computed: {
    list() {
      let rlt = {};
      const data = this.cateList;
      const len = this.cateList.length;
      if (len <= 5) {
        rlt = {
          prev: data,
          next: [],
        };
      } else if (len > 5 && len <= 10) {
        rlt = {
          prev: data.slice(0, 5),
          next: data.slice(5),
        };
      } else {
        const breakPoint = Math.ceil(data.length / 2);
        rlt = {
          prev: data.slice(0, breakPoint),
          next: data.slice(breakPoint),
        };
      }
      return rlt;
    },
  },
  watch: {
    cateList(val) {
      if(val) {
        this.noticeList = val;
      }
      let now = "";
      this.noticeList.map((item) => {
        item["date"] = this.timestamp(item.matchTime);
        if(new Date(item.date).toDateString() === new Date().toDateString()) {
          console.log('今天')
          now = "今天"
        } else {
          now = item.matchTime.substring(5,item.matchTime.length-9)
        }
        item['titleTime'] = now+' '+this.getdate(new Date(item.date));
      });
      // console.log(222, val);
      this.initSwiper();
      if (val.length > 5) {
        this.$nextTick(() => {
          this.init();
        });
      }
    },
  },
  beforeDestroy() {
    if (this.bs) this.bs.destroy();
  },
  mounted() {
    this.$nextTick(function () {
      this.initSwiper();
    });
  },
  methods: {
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
    getdate(now) {
        let y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return (now.toTimeString().substr(0, 5));
    },
    initSwiper() {
      new Swiper(".swiper-container", {
        slidesPerView: 2, //'auto'
        spaceBetween: 15,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        onTransitionEnd: function (swiper) {
          if (swiper.progress == 1) {
            swiper.activeIndex = swiper.slides.length - 1;
          }
        },
      });
      setTimeout(() => {
          document.getElementById("box1").style.transform = 'translate3d(0px, 0px, 0px)';
        }, 50)
    },
    // 跳转
    onNavigate(item) {
      this.$router.push({
        path: "/product",
      });
    },
    matchdetails(item) {
      let {matchId,type} = item;
      this.$router.push({
        name: "Matchdetails",
        query:{
          matchState:this.matchState[item.matchState],
          matchId,
          liveType:type
        }
      });
    },
    // 初始化
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollX: true,
        scrollY: false,
        click: true,
        // taps: true,
        probeType: 3, // listening scroll hook
      });

      const totalX = Math.abs(this.bs.maxScrollX);

      this._registerHooks(["scroll"], (pos) => {
        const currentX = Math.abs(pos.x);
        this.rate = `${Number((currentX / totalX) * 100).toFixed(2)}%`;
      });
    },
    _registerHooks(hookNames, handler) {
      hookNames.forEach((name) => {
        this.bs.on(name, handler);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.home-category {
  width: 100%;
  padding: 24px 0;
  // background: #fff;
  .scroll-wrapper {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
  .scroll-content {
    display: inline-block;
    .scroll-item__wrapper {
      .scroll-item {
        font-size: $mini;
        display: inline-block;
        text-align: center;
        color: $black;
        padding: 0 25px 24px 25px;
        img {
          display: block;
          width: 88px;
          height: 88px;
          border-radius: 50%;
          overflow: hidden;
          background: #f5f5f5;
          margin: 0 auto;
        }
        .text {
          width: 100px;
          margin-top: 12px;
        }
      }
    }
  }
  .dot-wrapper {
    width: 80px;
    height: 4px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin: 0 auto;
    overflow: hidden;
    .dot {
      box-sizing: border-box;
      width: 40px;
      height: 4px;
      transition: all 0.4s linear;
      background: $red;
    }
  }
  .swiper-container {
    height: 200px;
    width: 100%;
    .swiper-wrapper {
      .swiper-slide {
        // width: 100%;
        // height: 100%;
        // text-align: center;
        // padding:0 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-content: space-around;
        box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.06);
        border-radius: 5px;
        background: #fff;
        .flex {
          // height: 33%;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
        }
        .flex1 {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          .cba {
            color: #999999;
          }
          .red {
            color: #f1413f;
            img {
              vertical-align: bottom;
              width: 26px;
              height: 24px;
            }
          }
        }
        .flex2,
        .flex3 {
          & > div {
            display: flex;
            align-items: center;

            font-size: 22px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #000000;
          }
          img {
            width: 46px;
            height: 44px;
          }
          span {
            font-size: 28px;
            font-family: DIN;
            font-weight: bold;
            color: #21213c;
          }
          .ov {
            width: 110px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
