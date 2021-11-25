<template>
  <div class="shopdetails">
    <van-nav-bar title="查看" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <!-- <van-form @submit="onSubmit">
      <van-field v-model="addressInfo.TITLE" readonly name="标题" label="标题"  />
      <van-field v-model="addressInfo.ORG_ID_" name="企业名称" readonly label="企业名称"  />
      <van-field v-model="addressInfo.USER_ID_" name="上报人" readonly label="上报人"  />
      <van-field v-model="addressInfo.PHONE" name="联系方式" readonly label="联系方式"  />
      <van-field v-model="addressInfo.APPR_CONTENT" name="驳回原因" readonly label="驳回原因"  />
      <van-field v-model="addressInfo.CONTENT" readonly class="hhhhh" rows="3" autosize type="textarea" maxlength="40" show-word-limit placeholder="请详细描述您的问题" />
      <div class="imgbox">

      <img v-for="(item,index) in fileList" :key="index" :src="item.url" alt="" srcset="">
      </div>
    </van-form> -->
    <div class="box">
      <div class="box-main">
        <p class="p1" >{{addressInfo.TITLE}}</p>
        <p class="" style="font-size:12px;">{{addressInfo.CREATETIME}} {{addressInfo.ORG_ID_}}</p>
        <p class="" style="visibility: hidden;">{{addressInfo.CREATETIME}} {{addressInfo.ORG_ID_}}</p>
        <p class="p2" >{{addressInfo.CONTENT}}</p>
        <p class="p3">{{content.ORG_ID_}}</p>
        <div class="imgbox">

            <img v-for="(item,index) in fileList" :key="index" :src="item.url" alt="" srcset="">
        </div>
      </div>
      <div style="height:20px;"></div>

    </div>

  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import areaList from "@/utils/area.js";
import axios from "axios";
const config = require('../../utils/config')
import {
  getPostMap,
  postSave
} from "@/api/personal";
export default {
  name: "Confirmorder",
  components: {},
  data() {
    return {
      content:{},
        value:3,
      name: "",
      mobile: "",
      area: "",
      area1: [],
      address: "",
      showArea: false,
      showname: false,
      areaList,
      hotcities: [],
      addressInfo: {
        TITLE: "",
        ORG_ID_:'',
        USER_ID_:'',
        PHONE: "",
        CONTENT:'',
        ATTACHS:'',
        APPR_CONTENT:''

      },
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
      fileList: [
        // { url: "https://img01.yzcdn.cn/vant/leaf.jpg" },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image", isImage: true },
      ],
      uploadImages: [],

      // uid: 999845591,
      // utype: kuhu,
      // provinceID: 110000,
      // cityID: ,
      // areaID: ,
      // address: 大V发地址,
      // TITLE: 呵呵呵,
      // mobile: 13611366910,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {
    // this.ShoppingAddress();
    // this.GetHotCities();
    // this.GetDefaultAreaInfo();
    this.getPostMap()
  },
  methods: {
    getPostMap() {
      getPostMap({
        ID:this.$route.query.id
      }).then(res=>{
        let {code,data} = res;
          if(code==0) {
            const url = config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/saveFile'
            this.addressInfo = data.map;
            // this.addressInfo.APPR_CONTENT = data.map.apprList[0].APPR_CONTENT;
            this.fileList = data.map.attachList.map(item=>{
              return {
                url:config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/downloadFile?attachId='+item.ID
              }
            })
                console.log(this.fileList)
            console.log(this.addressInfo)
          }
      }).catch(error=>console.log(error))

    },
    // 校检手机号码
    checkMobile(value) {
      const reg = /^1[3456789]\d{9}$/;
      return reg.test(value);
    },
    ShoppingAddress() {
      axios
        .get(
          `http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Find&uid=${this.userInfo.id}&utype=kuhu`
        )
        .then((res) => {
          let { code, info } = res.data.data;
          if (!!info) {
            this.addressInfo = info || null;
            this.area1 = [
              this.addressInfo.province,
              this.addressInfo.city,
              this.addressInfo.area,
            ];
            this.area =
              this.areaList.province_list[this.addressInfo.province] +
              "/" +
              this.areaList.city_list[this.addressInfo.city] +
              "/" +
              this.areaList.county_list[this.addressInfo.area];
          }
          // this.addressInfo.PHONE = !!this.addressInfo &&  !!this.addressInfo.PHONE ? this.mobileNumberChange(this.addressInfo.PHONE):null;
        })
        .catch((error) => console.log(error));
    },
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onConfirm1(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
      this.showname = false;
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      Toast("取消");
    },
    onConfirm(values) {
      console.log(values);
      this.area1 = values.map((item) => item.code);
      // this.area1 = values.map(item=>item.name)
      this.area = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      console.log(this.area);
      this.showArea = false;
    },
    change(picker, value, index) {
      // console.log('索引',picker, value, index)
      // this.GetCity(value[0].code);
    },
    onRead(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file.file); //接口需要传的参数
      let _this = this;
      var xhr = new XMLHttpRequest();
      const url = config[process.env.NODE_ENV].mockUrl+'/wjyql/uploadFile/saveFile'
      xhr.open("post", url);
      xhr.send(formData);
      xhr.onload = function () {
        if (xhr.status === 200) {
          let { data } = JSON.parse(xhr.response);
          console.log(data)
          _this.addressInfo.ATTACHS = _this.addressInfo.ATTACHS+data.att_map.ID+',';
          _this.uploadImages.push(data.att_map.REAL_PATH);
          console.log(_this.fileList, _this.uploadImages,_this.addressInfo.ATTACHS);
        }
      };
      // console.log(file);
    },
    onDelete(file, { index }) {
      this.uploadImages.splice(index, 1);
      console.log(this.fileList, this.uploadImages);
      return true;
    },
    onOversize(file) {
      // Toast("正在上传");
      // console.log(file);
      // Toast("文件大小不能超过 500kb");
    },
    onSubmit(values) {
      postSave({...this.addressInfo}).then(res=>{

      }).catch(error=>console.log(error))

      // axios
      //   .get(
      //     `http://cj.pydoton.com/?s=App.Shop_ShoppingAddress.Save${paramsstr}`
      //   )
      //   .then((res) => {
      //     let { msg } = res.data;
      //     if (msg == "保存成功!") {
      //       this.$router.push({
      //         name: "Confirmorder",
      //         query: { ...this.$route.query },
      //       });
      //     }
      //     console.log(msg);
      //   })
      //   .catch((error) => console.log(error));
    },
    seeOrder() {
      this.$router.push({
        name: "Confirmorder",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.shopdetails {
  background: #ffffff;
  min-height: 100vh;
  width: 100vw;
  ::v-deep .van-nav-bar .van-icon {
    color: #212223;
  }
}
.van-form {
  .van-cell__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #3a3a3a;
  }
  ::v-deep .van-field__label {
    width: 4.2em;
  }
  ::v-deep .van-field--error .van-field__control::placeholder {
    color: #969799 !important;
    -webkit-text-fill-color: currentColor !important;
  }
  .mobile {
    ::v-deep input {
      padding-left: 10px;
    }
    ::v-deep .van-field__body {
      // &::before {
      //   content: "+86";
      //   font-size: 14px;
      //   color: "646566";
      // }
    }
    ::v-deep .van-field--error .van-field__control,
    ::v-deep .van-field--error .van-field__control::placeholder {
      color: #323233;
      -webkit-text-fill-color: currentColor;
    }
  }
}
.van-uploader {
  position: relative;
  display: inline-block;
  padding: 20px;
}
.upload {
  width: 146px;
  height: 146px;
  border: 1px solid #cccccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 53px;
    width: 52px;
  }
}
.btns {
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 100px;
  left: 0;
  right: 0;
  margin: auto;
}
.see {
  width: 40%;
  height: 80px;
  // padding: 0px 200px;
  font-size: 28px;
  color: #fff;
  background: rgba(86, 131, 255, 1);
  border: none;
  box-sizing: border-box;
  // position: fixed;
  // bottom: 100px;
  // left: 0;
  // right: 0;
  // margin: auto;
}
.see1 {
  background-color: #FF8686;
}
::v-deep .van-field__control {
  text-align: right;
}
.hhhhh {
  ::v-deep .van-field__control {
    text-align: left;
  }
}
.imgbox {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    img {
        width: 40%;
        margin:0 20px;
    }
}
.box {
  width: 100%;
  padding: 0 20px;
  padding-top: 20px;
  box-sizing: border-box;
}
.box-main {
  width: 100%;
  padding: 20px;
  background-color: #f3f4f7;
  border-radius: 20px;
  box-sizing: border-box;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #000000;
  p {
    line-height: 50px;
  }
  .p1 {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    span {
      display: inline-block;
      width: 16px;
      height: 16px;
      background: rgba(86, 131, 255, 0);
      border: 3px solid #5683ff;
    }
  }
  .p2 {
      text-indent: 2em;
      font-size: 28px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 41px;
  }
  .p3 {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
    text-align: right;
  }
}
</style>
