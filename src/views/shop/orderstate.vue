<template>
  <div class="shopdetails">
    <!-- <van-nav-bar title="订单状态" left-text="" left-arrow fixed @click-left="onClickLeft" /> -->
    <van-nav-bar title="标题" left-text="" left-arrow fixed @click-left="onClickLeft">
      <template #title>
        <p class="title_p"><img src="../../assets/shop/发货.png" alt=""> 发货中</p>
        <p class="title_p1">订单号：{{info.order_id}} <img @click="copy(info.order_id)" src="../../assets/shop/复制.png" alt=""></p>
      </template>
    </van-nav-bar>
    <div style="height:72px"></div>
    <div class="shopprc">
      <div class="left">
        <img :src="info.goods_img" alt="">
      </div>
      <div class="right">
        <h3>{{info.order_goods[1]}}</h3>
        <p><img style="vertical-align: text-bottom;" src="../../assets/shop/图层 4.png" alt=""><span>{{info.goods_price}}</span></p>
      </div>
    </div>
    <div class="info">
      <p class="p1">
        <img src="../../assets/shop/地址 (1).png" alt="">
        <!-- <span>小苗 154****6452</span> -->
        <span>{{addressInfo.realname}} {{addressInfo.phone}}</span>
      </p>
      <p>
        <img style="visibility: hidden;" src="../../assets/shop/地址 (1).png" alt="">
        <span>地址：{{areaList.province_list[addressInfo.province]}}
          {{areaList.city_list[addressInfo.city]}}
          {{areaList.county_list[addressInfo.area]}}
          {{addressInfo.address}}</span>
      </p>
    </div>
    <div class="steps">
      <van-steps direction="vertical" :active="list.Traces.length-1">
        <van-step v-for="(item,index) in list.Traces" :key="index">
          <h3>{{item.AcceptStation}}</h3>
          <p>{{item.AcceptTime}}</p>
        </van-step>
      </van-steps>

    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import areaList from "@/utils/area.js"
export default {
  name: "Orderstate",
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
    ...mapGetters(["userInfo","orders"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.GetGoodsDetail()
    this.ShoppingAddress()
    this.OrderHandle()
  },
  methods: {
    mobileNumberChange(str){
      return str.replace(/(\d{3})\d*(\d{4})/, '$1****$2');
    },
    GetGoodsDetail() {
      let id = this.$route.query.id;
      this.info = this.orders.filter(item=>item.id==id)[0]
      // axios.get(`http://cj.pydoton.com/?s=App.Shop_Goods.GetGoodsDetail&goodsId=${id}`).then(res=>{
      // let {code,info} = res.data.data;
      // this.info = info;

      // console.log(info)
      // }).catch(error=>console.log(error))
    },
    ShoppingAddress() {
      let id = this.$route.query.id
      axios.get(`http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Find&uid=${this.userInfo.id}&utype=kuhu`).then(res=>{
      let {code,info} = res.data.data;
      this.addressInfo = info || null;
      this.addressInfo.phone = !!this.addressInfo &&  !!this.addressInfo.phone ? this.mobileNumberChange(this.addressInfo.phone):null;
      }).catch(error=>console.log(error))
    },
    OrderHandle() {
      let params = {
        logisticCode:'',
        shipperCode:'',
      }
      axios.get(`http://cj.pydoton.com/?s=App.Shop_Logistics.OrderHandle&logisticCode=10103700562&shipperCode=PADTF`).then(res=>{
      let {data} = res.data;
      this.list = JSON.parse(data);
      console.log(this.list)
      }).catch(error=>console.log(error))

    },
    onClickLeft() {
      this.$router.go(-1);//返回上一层
    },
    copy(text) {
      this.copyToClipboard(text)
    },
    copyToClipboard(text) {
      const element = document.createElement("textarea");
      element.value = text;
      document.body.appendChild(element);
      element.select();
      document.execCommand("copy");
      document.body.removeChild(element);
    },
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #f5f5f5;
  min-height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar__content {
    height: auto;
  }
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
  .title_p {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ff5959;
    padding-bottom: 38px;
    img {
      width: 33px;
      height: 33px;
      vertical-align: middle;
    }
  }
  .title_p1 {
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ff5959;
    padding-bottom: 19px;
    img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
    }
  }
  .shopprc {
    // background-color: #fff;

    height: 200px;
    margin-top: 18px;
    // margin-bottom: 60px;
    display: flex;
    justify-content: start;
    align-items: center;
    background-color: #fff;

    border-radius: 20px;
    .left {
      width: 140px;
      height: 140px;
      // background: #000000;
      border-radius: 10px;
      margin-left: 20px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      height: 100%;
      display: flex;
      flex-flow: column;
      justify-content: center;
      padding-right: 10px;
      h3 {
        width: 459px;

        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #3a3a3a;
        padding-bottom: 26px;

        line-height: 31px;
      }
      p {
        font-size: 30px;
        font-family: DIN;
        font-weight: bold;
        color: #3a3a3a;
        line-height: 26px;
        img {
          margin-right: 10px;
        }
      }
    }
  }
  .info {
    // height: 150px;
    background: #ffffff;
    border-radius: 20px;
    padding: 20px;
    padding-top: 35px;
    padding-bottom: 35px;
    margin: 18px 0;
    img {
      width: 29px;
      height: 32px;
      margin-right: 18px;
      vertical-align: middle;
    }
    p {
      height: 23px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
    }
    .p1 {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #3a3a3a;
      padding-bottom: 22px;
    }
  }
  .steps {
  }
}
</style>
