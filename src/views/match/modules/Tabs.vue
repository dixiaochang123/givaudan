<template>
  <div class="tabs1">
    <!-- <span class="headimg" @click="Personal"></span> -->
    <div class="list">
      <span :class="[active==index?'active':'']" v-for="(item,index) in list" :key="item.name" @click="totab(item)">{{item.name}}</span>
    </div>
    <LoginBox v-if="LoginBoxIsShow"  />
  </div>

</template>

<script>
import LoginBox from '@/components/LoginBox'
import { mapGetters } from "vuex";
export default {
  props: ["active"],
  components: {LoginBox},
  data() {
    return {
      list: [
        { name: "全部", url: "All" },
        { name: "足球", url: "Football" },
        { name: "篮球", url: "Basketball" },
        { name: "其他", url: "Other" },
        // { name: "预约", url: "Before" },
      ],
      LoginBoxIsShow:false
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {
  },
  methods: {
    closeBox(data) {
      this.LoginBoxIsShow = data;

    },
    totab(item) {
      if (item.name=="预约" && !this.userInfo.id) {
        this.LoginBoxIsShow = true;
        return
      } else {
        this.LoginBoxIsShow = false;
      }
      this.$router.push({
        name: item.url,
      });
    },
    Personal() {
      this.$router.push({
        name: "Personal",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs1 {
  height: 75px;
  width: 100vw;
  background: #ffffff;
  position: fixed;
  z-index: 2;
  .headimg {
    position: absolute;
    left: 20px;
    top: 50%;
    margin-top: -29px;
    display: inline-block;
    width: 58px;
    height: 58px;
    border: 1px solid #999999;
    border-radius: 50%;
  }
  .list {
    height: 100%;
    padding: 0 115px;
    padding: 0 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .active {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ff5959;
      position: relative;
      &::after {
        content: "";
        display: inline-block;
        width: 30px;
        height: 6px;
        background: #ff5959;
        border-radius: 3px;
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
    }
  }
}
</style>
