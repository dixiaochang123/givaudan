<template>
  <div class="home-goods">
    <div class="title">
      <div class="triangle-topleft"></div>
      <img src="../../../assets/index/直播 (1).png" alt="">
      <p>正在热播</p>
    </div>
    <div style="height:20px;"></div>
    <van-list
      @load="onReachBottom"
    >
      <div class="main">
        <goods-item
          v-for="(item,idx) in goodsList"
          :key="idx"
          :product-id="item.uid"
          :img="item.avatar_thumb"
          :title="item.title"
          :desc="item.desc"
          :price="item.price"
          :old-price="item.oldPrice"
          :user_nicename="item.user_nicename"
          :hot="item.hot"
          :liveType="item.liveType"
        />
      </div>
    </van-list>
  </div>
</template>

<script>
// import Title from './Title'
import GoodsItem from '@/components/GoodsItem'

export default {
  components: {
    GoodsItem,
    // Title
  },
  model: {
    prop: 'isLoading'
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isFinished: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    loading: {
      get() {
        return this.isLoading
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    onReachBottom() {
      this.$emit('onReachBottom')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-goods {
  margin-top: 24px;
  border-radius: 10px;
  background-color: #fff;
  .title {
    width: 165px;
    height: 50px;
    background: #F03E3C;
    border-radius: 10px 0px 0px 0px;
    position: relative;
    .triangle-topleft{
      position: absolute;
      right: -48px;
      top: 0;
      width: 0px;
      height: 0px;
      border-top: 51px solid #F03E3C;
      border-right: 50px solid transparent;
    }
    img {
      width: 28px;
      height: 27px;
      padding-top: 10px;
      padding-left: 18px;
    }
    p {
      position: absolute;
      top: 0;
      right: 0;
      margin-top:10px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #FFFFFF;

    }
  }
  .main {
    background: #fff;
    box-sizing: border-box;
    // padding: 0 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
