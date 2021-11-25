<template>
  <div class="shopdetails">
    <van-nav-bar title="确认订单" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height:46px"></div>
    <div v-if="!success" class="address" @click="orderInfo">
      <div v-if="addressInfo" class="left">
        <p>
          <!-- <van-tag type="danger">默认</van-tag> 四川成都市双流区中和街道 -->
          <van-tag type="danger">默认</van-tag>
          {{areaList.province_list[addressInfo.province]}}
          {{areaList.city_list[addressInfo.city]}}
          {{areaList.county_list[addressInfo.area]}}
        </p>
        <h4>{{addressInfo.address}}</h4>
        <p>{{addressInfo.realname}} {{addressInfo.phone}}</p>
      </div>
      <div v-else class="left left1">
        <p>+ 添加地址</p>
      </div>
      <van-icon name="arrow" />
    </div>
    <div v-if="!success" class="shopprc">
      <div class="left">
        <img :src="info.goods_url" alt="">
      </div>
      <div class="right">
        <h3>{{info.goods_name}}</h3>
        <p><img src="../../assets/shop/图层 4.png" alt=""><span>{{info.goods_price_integral}}</span></p>
      </div>
    </div>
    <div v-if="!success" class="mind ">
      <p>*注意事项</p>
      <p>1.兑换的实物商品将在3表工作日内发货（特殊情况除外：如春节假期）</p>
      <p>2.兑换商品暂不支持退换货</p>
      <p>4.有任何疑问请联系客服人员</p>
      <p>5.最终解释权归本平台所有</p>

    </div>
    <div v-if="!success" class="foot">
      <div class="footimg">
        <span>支付积分:</span>
        <span class="nub">{{info.goods_price_integral}}</span>
      </div>
      <van-button round type="info" @click="show = true">提交订单</van-button>
    </div>
    <van-popup v-model="show">
      <h1>确认支付积分</h1>
      <h2>{{info.goods_price_integral}}</h2>
      <p>有任何疑问请联系客服人员</p>
      <div class="btn">
        <van-button class="no" round type="info" @click="show = false">取消</van-button>
        <van-button round type="info" @click="confirm">确认</van-button>
      </div>
    </van-popup>
    <div v-if="success" class="success">
      <img src="../../assets/shop/图层 811.png" alt="">
      <p>您已成功支付，可在订单里边查看订单详情</p>
    </div>
    <van-button class="see" v-if="success" round type="info" @click="seeOrder">查看订单</van-button>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import areaList from "@/utils/area.js"
import { Toast } from 'vant';

export default {
  name: "Confirmorder",
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
      info:{},
      addressInfo:null,
      areaList,
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
    this.ShoppingAddress()
  },
  methods: {
    mobileNumberChange(str){
      return str.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
    },
    GetGoodsDetail() {
      let id = this.$route.query.id
      axios.get(`http://cj.pydoton.com/?s=App.Shop_Goods.GetGoodsDetail&goodsId=${id}`).then(res=>{
      let {code,info} = res.data.data;
      this.info = info;
      }).catch(error=>console.log(error))
    },
    ShoppingAddress() {
      let id = this.$route.query.id
      axios.get(`http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Find&uid=${this.userInfo.id}&utype=kuhu`).then(res=>{
      let {code,info} = res.data.data;
      this.addressInfo = info || null;
      // this.addressInfo.phone = !!this.addressInfo &&  !!this.addressInfo.phone ? this.mobileNumberChange(this.addressInfo.phone):null;
      this.addressInfo.phone = !!this.addressInfo &&  this.addressInfo.phone;
      }).catch(error=>console.log(error))
    },
    onClickLeft() {
      this.$router.push({
        name: "Shop",
      });
    },
    orderInfo() {
      this.$router.push({
        name: "Orderinfo",
        query:{...this.$route.query}
      });
    },
    confirm() {
      if(!this.addressInfo.phone)return;
      let params ={
        uid:this.userInfo.id,
        token:this.userInfo.token,
        from:'kuhu',
        goodsInfo:`${this.info.id},${this.info.goods_name},${this.info.id},1`,
        userName:this.addressInfo.realname,
        mobile:this.addressInfo.phone,
        address:`${this.areaList.province_list[this.addressInfo.province]},${this.areaList.city_list[this.addressInfo.city]},${this.areaList.county_list[this.addressInfo.area]},${this.addressInfo.address}`,
        integral:this.info.goods_price
      }
      let paramsstr = "";
      for (const key in params) {
          if (Object.hasOwnProperty.call(params, key)) {
              paramsstr+=`&${key}=${params[key]}`
              
          }
      }
      axios.get(`http://cj.pydoton.com/?s=App.Shop_Order.Submit${paramsstr}`).then(res=>{
        let {data,msg,ret} = res.data;
        if(ret==1003) {
          Toast(msg)
          this.success = false;
        } else {
          this.success = true;
        }
        this.show = false;
        console.log(code,msg)
      }).catch(error=>console.log(error))
    },
    seeOrder() {
      this.$router.push({
        name: "Order",
      });
    },
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
  .address {
    width: 100%;
    height: 199px;
    // border: solid 1px;
    // margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: url("../../assets/shop/条@x2.png") no-repeat center bottom;
    background-color: #fff;
    background-size: contain;
    .left {
      padding-left: 20px;
      p,
      h4 {
        line-height: 50px;

        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #3a3a3a;
      }
      h4 {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #3a3a3a;
      }
    }
    .left1 {
      p {
        font-size: 36px;
      }
    }
    .van-icon {
      padding-right: 10px;
    }
  }
  .shopprc {
    // background-color: #fff;
    margin-top: 60px;
    margin-bottom: 60px;
    display: flex;
    justify-content: space-between;
    height: 210px;
    .left {
      width: 220px;
      height: 100%;
      // background: #000000;
      border-radius: 10px;
      margin-left: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      height: 100%;
      display: flex;
      flex-flow: column;
      justify-content: space-around;
      padding-right: 20px;
      h3 {
        width: 459px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #3a3a3a;
        line-height: 38px;
      }
    }
  }
  .mind {
    padding: 0 20px;
    p {
      width: 615px;
      // height: 20px;
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #3a3a3a;
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
      .nub {
        font-size: 36px;
        font-family: DIN;
        font-weight: bold;
        color: #ff0000;
      }
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
      background: linear-gradient(0deg, #fa342e, #ff6f53);
      border: none;
    }
  }
}
::v-deep .van-overlay {
  background-color: rgba(0, 0, 0, 0.3);
}
::v-deep .van-popup {
  width: 90%;
  padding-bottom: 15px;
  border-radius: 10px;
  h1 {
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #3a3a3a;
    text-align: center;
    padding: 25px 0 35px;
  }
  h2 {
    font-size: 24px;
    font-family: DIN;
    font-weight: bold;
    color: #ff0000;
    text-align: center;
  }
  p {
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    text-align: center;
    padding: 25px 0 25px;
  }
  .btn {
    display: flex;
    justify-content: space-around;
  }
  .van-button {
    height: 35px;
    margin-right: 20px;
  }
  .van-button--normal {
    padding: 0px 40px;
    font-size: 14px;
  }
  .van-button--info {
    color: #fff;
    background: linear-gradient(0deg, #fa342e, #ff6f53);
    border: none;
  }
  .no {
    color: #fa362f;

    background: #ffffff;
    border: 1px solid #fa352f;
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
.see {
  height: 80px;
  width: 80%;
  padding: 0px 200px;
  font-size: 28px;
  color: #fff;
  background: linear-gradient(0deg, #fa342e, #ff6f53);
  border: none;
  position: fixed;
  bottom: 400px;
  left: 0;
  right: 0;
  margin: auto;
}
</style>
