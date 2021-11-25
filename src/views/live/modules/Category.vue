<template>
  <div class="home-goods">
    <van-list @load="onReachBottom">
      <div class="main">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in goodsList" :key="index">
              <goods-item :key="index"  :product-id="item.uid" :img="item.thumb" :title="item.title" :desc="item.desc" :price="item.price" :old-price="item.oldPrice" :user_nicename="item.user_nicename" :hot="item.hot"
                :liveType="item.liveType" />
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
// import Title from './Title'
import GoodsItem from "./GoodsItem.vue";
import Swiper from "swiper";
export default {
  components: {
    GoodsItem,
    // Title
  },
  model: {
    prop: "isLoading",
  },
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      },
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    loading: {
      get() {
        return this.isLoading;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    onReachBottom() {
      this.$emit("onReachBottom");
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
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.initSwiper();
    });
  },
};
</script>

<style lang="scss" scoped>
.home-goods {
  // margin-top: 24px;
  border-radius: 10px;
  // background-color: #fff;
  height: 100%;
  .main {
    height: 100%;
    // background: #fff;
    box-sizing: border-box;
    // padding: 0 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .swiper-container {
    // height: 200px;
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
        // background: #fff;
      }
    }
  }
}
</style>
