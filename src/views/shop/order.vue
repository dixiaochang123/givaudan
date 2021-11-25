<template>
  <div class="order">
    <van-nav-bar title="订单" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height:46px"></div>
    <div class="order_ul">
      <div class="order_li" v-for="(item,index) in list" :key="index">
        <p>订单号：{{item.order_id}}</p>
        <div class="centent">
          <img :src="item.goods_img" alt="">
          <h3>{{item.order_goods[1]}}</h3>
          <div>
            <span>发货中</span>
            <span class="nb">{{item.goods_price}}</span>
          </div>
        </div>
        <van-button class="see" round type="info" @click="orderdetails(item)">查看详情</van-button>

      </div>
      <!-- <div class="order_li">
        <p>订单号：123456789123</p>
        <div class="centent">
          <img src="../../assets/shop/图层 4.png" alt="">
          <h3>华为 HUAWEI P40 Pro 256GB亮黑色 全网通5G手机</h3>
          <div>
            <span>发货中</span>
            <span class="nb">36000</span>
          </div>
        </div>
        <van-button class="see" round type="info" @click="orderdetails">查看详情</van-button>

      </div> -->

    </div>
    <div v-if="list.length==0" class="success">
      <img src="../../assets/shop/图层 811.png" alt="">
      <p>客官还没有兑换任何商品哦~</p>
    </div>

  </div>

</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Order",
  components: {},
  data() {
    return {
      success: false,
      show: false,
      active: 0,
      loading: false,
      finished: false,
      list: [],
      pageNo: 0,
      pageSize: 4,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.Shop_ShoppingAddress()
  },
  methods: {
    Shop_ShoppingAddress() {
      let id = this.$route.query.id;
      axios.get(`http://cj.pydoton.com/?s=App.Shop_Order.MyOrder&uid=${this.userInfo.id}&token=${this.userInfo.token}&from=kuhu`).then(res=>{
      let {list} = res.data.data;
      list.map(item=>{
        item.order_goods = item.order_goods.split(',')
      })
      this.list = list;
      this.$store.dispatch('order/setOrders', list)
      console.log(res.data.data)
      }).catch(error=>console.log(error))
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    orderdetails(item) {
      console.log(item)
      if(!item.tracking_number)return;
        this.$router.push({
            name:"Orderstate",
            query:{
              id:item.id
            }
        })

    }
  },
};
</script>

<style lang="scss" scoped>
.order {
  background: #f5f5f5;
  min-height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
  .order_li {
    height: 280px;
    padding: 0 20px;
    background: #ffffff;
    border-radius: 10px;
    margin-bottom: 20px;
    > p {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #3a3a3a;
      padding: 21px 0 33px;
    }
    .centent {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: 140px;
        height: 140px;
      }
      h3 {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #3a3a3a;
        line-height: 31px;
        padding: 0 44px 0 16px;
      }
      > div {
        height: 140px;
        display: flex;
        justify-content: start;
        flex-flow: column;
        align-items: flex-end;
        span {
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
          white-space: nowrap;
          &.nb {
            padding-top: 35px;
            font-size: 34px;
            font-family: DIN;
            font-weight: bold;
            color: #ff0000;
            line-height: 26px;
          }
        }
      }
    }
    .see {
      height: 40px;
      padding: 0px 30px;
      font-size: 14px;
      color: #fff;
      background: #ffffff;
      border: 1px solid #896133;

      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #502e06;
      float: right;
    }
  }
}
.success {
  text-align: center;
  padding-top: 129px;
  img {
    width: 361px;
    height: 313px;
    margin: 0 auto;
  }
  p {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    padding-top: 45px;
  }
}
</style>
