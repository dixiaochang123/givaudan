<template>
  <div class="match">
    <Tabs v-if="active!=9" :active="active" />
    <!-- <p v-if="dateShow" class="date" @click="show = true">{{dateTransform}} <van-icon name="arrow-down" /></p> -->
    <van-cell v-if="dateShow" class="date" @click="show = true" :title="dateTransform" is-link arrow-direction="down" value="" />
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" :key="key" @activeChange="activeChange" :date="date" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" :key="key" @activeChange="activeChange" :date="date" /> -->
    <router-view :key="key" @activeChange="activeChange" :date="date" />
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-picker show-toolbar :columns="actions" :value-key="gameTime" @confirm="fnShowTime" @cancel="show=false"></van-picker>
    </van-popup>

  </div>

</template>

<script>
import { GetDate, GetHot } from "@/api/match";
import Tabs from "./modules/Tabs";
export default {
  name: "Match",
  components: {
    Tabs,
  },
  data() {
    return {
      active: 0,
      show: false,
      dateShow:true,
      gameTime: "",
      actions: [],
      date: "",
      dateTransform: "",
    };
  },
  watch:{
    date(val) {
      console.log(22,val)
      let dateTransform = "";
      if (new Date(val).toDateString() === new Date().toDateString()) {
        dateTransform = "今天 "+this.getdate(new Date(val))+' '+this.getWeek(new Date(val))
      } else {
        dateTransform = this.getdate(new Date(val))+' '+this.getWeek(new Date(val));
      }
      this.dateTransform = dateTransform;
    }

  },
  computed: {
    key() {
      if(this.$route.path=="/other" || this.$route.path== "/matchdetails") {
        this.dateShow = false
      } else {
        this.dateShow = true;
      }
      return this.$route.fullPath;
    },
  },
  created() {
    this.GetDate();
  },
  mounted() {
    // this.GetDate();
  },
  methods: {
    activeChange(data) {
      this.active = data;
    },
    GetDate() {
      GetDate()
        .then((res) => {
          let { ret, data } = res;
          if (ret == 200) {
            let actions = data.info.list.map((item) => {
              let curKey = Object.keys(item); //Object.keys可以提取出对象中的key值,注意取出的key是数组
              return item[curKey[0]];
            });
            this.actions = actions;
            this.date = actions[0]

            this.gameTime = "0";
          }
        })
        .catch((error) => console.log(error));
    },
    //选择时间
    fnShowTime(val) {
      this.date = val;
      this.gameTime = this.actions.findIndex((item) => item == val) + "";
      console.log(this.gameTime, val);
      this.show = false;
    },
    dateChange(date) {
      this.date = date
    },
    //时间戳转时间
    getdate(now) {
      let y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return (m < 10 ? "0" + m : m) + "月" + (d < 10 ? "0" + d : d) + "日";
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
  },
};
</script>

<style lang="scss" scoped>
.match {
  background: #f5f5f5;
  min-height: 100vh;
  width: 100vw;
}
.date {
  // height: 72px;
  // line-height: 72px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #333333;
  background-color: #f5f5f5;
  padding-left: 20px;
  position: -webkit-sticky;
  position: sticky;
  top: 75px;
  z-index: 1;
}
</style>
