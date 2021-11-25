<template>
  <div class="shopdetails">
    <van-nav-bar title="商品详情" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height:46px"></div>
    <div class="banner">
      <img :src="info.goods_url" alt="">
    </div>
    <div class="shopprc">
      <div class="head">
        <h3>
          <img src="../../assets/shop/图层 4.png" alt="">
          <span class="nub">{{info.goods_price_integral}}</span>
          <span>市场价：￥{{info.goods_price}}</span>
        </h3>
        <!-- <p>{{info.num}}人兑换</p> -->

      </div>
      <p v-html="info.desc" class="content"></p>
    </div>
    <div class="foot">
      <div class="footimg">
        <img src="../../assets/shop/钱包 (3).png" alt="">
        <span>余额:{{huohua}}</span>
      </div>
      <van-button round type="info" @click="exchange">立即兑换</van-button>
    </div>
    <LoginBox v-if="LoginBoxIsShow"  />
  </div>

</template>

<script>
import {GetUserAccount} from "@/api/shop";
import { mapGetters } from "vuex";
import axios from "axios";
import LoginBox from '@/components/LoginBox'
export default {
  name: "Shopdetails",
  components: {
    LoginBox
  },
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      list: [],
      pageNo: 0,
      pageSize: 4,
      info:{},
      huohua:0,
      LoginBoxIsShow:false
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.GetGoodsDetail()
    this.GetUserAccount()
  },
  methods: {
    closeBox(data) {
      this.LoginBoxIsShow = data;
    },
    GetUserAccount() {
      let params = {
        token: this.userInfo.token,
        uid: this.userInfo.id,
      };
      GetUserAccount(params).then(res=>{
        let { code, info } = res.data;
        console.log(code, info )
        this.huohua = info.total.huohua || 0
      }).catch(error=>console.log(error))
    },
    GetGoodsDetail() {
      let id = this.$route.query.id
      axios.get(`http://cj.pydoton.com/?s=App.Shop_Goods.GetGoodsDetail&goodsId=${id}`).then(res=>{
      let {code,info} = res.data.data;
      this.info = info;
      console.log(info)
      }).catch(error=>console.log(error))
    },
    onClickLeft() {
      this.$router.push({
        name:"Shop"
      })
    },
    exchange() {
      if (!this.userInfo.id) {
        this.LoginBoxIsShow = true;
        
        return
      } else {
        this.LoginBoxIsShow = false;
      }
      this.$router.push({
        name:"Confirmorder",
        query:{...this.$route.query}
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #f5f5f5;
  min-height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
  .banner {
    width: 100%;
    height: 680px;
    // overflow: auto;
    // border: solid 1px;
    background-color: #fff;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .shopprc {
    background-color: #fff;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0 20px;
      height: 76px;
      > p {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #999999;
      }
    }
    h3 {
      line-height: 76px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #999999;
      line-height: 26px;
      display: flex;
    align-items: center;
      .nub {
        font-size: 48px;
        font-family: DIN;
        font-weight: bold;
        color: #ff0000;
        padding:0 28px 0 16px;
      }
    }
    .content {
      
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #3A3A3A;
      line-height: 38px;
    }
  }
  .foot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 98px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    .footimg {
      display: flex;
      align-items: center;
      padding-left: 20px;
    }
    img {
      width: 60px;
      height: 60px;
      margin-right: 12px;
    }
    .van-button {
      height: 35px;
      margin-right: 20px;
    }
    .van-button--normal {
        padding: 0px 30px;
        font-size: 14px;
    }
    .van-button--info {
        color: #fff;
        background: linear-gradient(0deg, #FA342E, #FF6F53);
        border: none;
    }
  }
}
</style>
