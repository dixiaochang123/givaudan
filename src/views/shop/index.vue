<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <div class="shop">
      <h1>
        <span class="span">积分:{{huohua}}</span>
        <span class="jf">积分商城</span>
        <p class="span">
          <van-icon style="vertical-align: bottom;" name="description" @click="goorder" />订单
        </p>
      </h1>
      <div class="banner">
        <img src="../../assets/banner.png" alt="">
      </div>

      <Goods v-model="loading" :goods-list="list" :is-finished="finished" @onReachBottom="onReachBottom" />
    </div>
  </van-pull-refresh>
</template>

<script>
import { getList } from "@/api/home";
import { GetIndex, GetUserAccount } from "@/api/shop";
import Goods from "./modules/Goods";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Shop",
  components: {
    Goods,
  },
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      list: [],
      pageNo: 0,
      pageSize: 4,
      page: 0,
      refreshing: false,
      huohua:0
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    this.GetUserAccount()
  },
  methods: {
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
    GetGoodsList() {
      axios
        .get(`http://cj.pydoton.com/?s=App.Shop_Goods.GetGoodsList&page=${this.page}`)
        .then((res) => {
          let { code, info } = res.data.data;
          // console.log(code, info);
          if(info.list.length) {
            info.list.map(item=>{
              item['id'] = item.id;
              item['cover'] = item.goods_url;
              item['name'] = item.goods_name;
              item['hh_price'] = item.goods_price;
              item['market_price'] = item.goods_price_integral;
            })
          }
          if (this.refreshing) {
            this.list = info.list;
            this.refreshing = false;
            this.finished = false;
          } else {
            this.list = [...this.list, ...info.list];
            if (info.list.length < 10) this.finished = true;
          }
          this.loading = false;
          console.log(info.list);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    GetIndex() {
      if (!this.userInfo.id) {
        this.$router.push({
          name: "Login",
        });
        return;
      }
      let params = {
        page: this.page,
        token: this.userInfo.token,
        uid: this.userInfo.id,
      };
      GetIndex(params)
        .then((res) => {
          let { info } = res.data;
          if (this.refreshing) {
            this.list = info;
            this.refreshing = false;
            this.finished = false;
          } else {
            this.list = [...this.list, ...info];
            if (info.length < 20) this.finished = true;
          }
          this.loading = false;
          console.log(info);
        })
        .catch((error) => console.log(error));
    },
    onReachBottom() {
      if (!this.finished) {
        this.loading = true;
        this.page += 1;
        // this.GetIndex();
        this.GetGoodsList();
      }
    },
    onRefresh() {
      if (!this.loading) {
        this.refreshing = true;
        this.page = 1;
        // this.GetIndex()
        this.GetGoodsList();
      }
    },
    // goods-list
    getGoodsList() {
      getList({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      }).then((res) => {
        const data = res.entry;
        if (this.refreshing) {
          this.list = data;
          this.refreshing = false;
          this.finished = false;
        } else {
          this.list = [...this.list, ...data];
          if (data.length < this.pageSize) this.finished = true;
        }
        this.loading = false;
      });
    },
    goorder() {
      this.$router.push({
        name: "Order",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.shop {
  background: #f5f5f5;
  min-height: 100vh;
  width: 100vw;
  h1 {
    height: 74px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #3a3a3a;
    background-color: #fff;
    border-top: solid 1px #eeeeee;
    .span {
      padding: 0 20px;
    }
    .jf {
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #3a3a3a;
    }
  }
  .banner {
    height: 300px;
    padding: 0 20px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
