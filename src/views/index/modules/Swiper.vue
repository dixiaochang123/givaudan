<template>
  <div>
    <!-- <van-swipe style="border-radius: 5px;" :autoplay="3000" indicator-color="white"> -->
    <van-swipe style="border-radius: 5px;" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banner" :key="index" @click="onNavigate">
        <image-pic width="100%" height="150" :src="item.slide_pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    onNavigate() {
      // this.$router.push({
      //   path: '/product'
      // })
    }
  }
}
</script>
<style  lang="scss" scoped>
::v-deep .van-swipe__indicators {
    position: absolute;
    bottom: 12px;
    left: 90%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}
::v-deep .van-swipe__indicator--active {
    opacity: 1;
    width: 17px;
    border-radius: 2px;
    height: 5px;
    color: red;
    background-color: red;
}
</style>
