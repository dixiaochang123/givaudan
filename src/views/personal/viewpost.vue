<template>
  <div class="shopdetails">
    <van-nav-bar title="查看" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <van-form @submit="onSubmit">
      <van-field v-model="addressInfo.TITLE" name="标题" label="标题" />
      <van-field v-model="addressInfo.ORG_ID_" readonly name="企业名称" label="企业名称" />
      <van-field v-model="addressInfo.USER_ID_" readonly name="上报人" label="上报人" />
      <van-field v-model="addressInfo.PHONE" readonly name="联系方式" label="联系方式" />
      <van-field v-model="addressInfo.APPR_CONTENT" name="驳回原因" label="驳回原因" />
      <van-field v-model="addressInfo.CONTENT" class="hhhhh" rows="3" autosize type="textarea" maxlength="40" show-word-limit placeholder="请详细描述您的问题" />
      <div class="van-uploader__wrapper">
        <div class="van-uploader__preview" v-for="(item,index) in uploadImages" :key="index">
          <div class="van-image van-uploader__preview-image">
            <img :src="item.url" class="van-image__img" style="object-fit: cover;"></div>
          <div data-v-ad6b89ec="" class="van-uploader__preview-delete" @click="onDelete1(index)">
            <i class="van-icon van-icon-cross van-uploader__preview-delete-icon"></i>
          </div>
        </div>
      </div>
      <van-uploader v-model="fileList" :max-size="50000 * 1024" multiple :max-count="5" :after-read="onRead" :before-delete="onDelete" @oversize="onOversize">
        <div class="upload">
          <img src="../../assets/personal/矩形 846 拷贝.png" alt="">
        </div>
      </van-uploader>
      <div style="margin: 16px" class="btns">
        <van-button class="see" size="normal" round block type="info" native-type="submit">编辑</van-button>
        <van-button class="see see1" size="normal" round block @click="deleted">删除</van-button>
      </div>
      <!-- <img src="http://182.92.2.167:8200/wjyql/uploadFile/downloadFile?attachId=12053" alt="" srcset=""> -->
    </van-form>

    <!-- <van-popup v-model="showArea" position="bottom">
      <van-area title="请选择所在地区" :area-list="areaList" @confirm="onConfirm" @change="change" @cancel="showArea = false" />
    </van-popup> -->
    <van-popup v-model="showname" position="bottom">
      <van-picker style="visibility: hidden;" title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" @change="onChange" />
      <van-picker title="" show-toolbar :columns="columns" @confirm="onConfirm1" @cancel="showname = false" @change="onChange" />
    </van-popup>
    <!-- <van-button class="see" round type="info" @click="seeOrder"
      >保存并使用</van-button
    > -->
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import areaList from "@/utils/area.js";
import axios from "axios";
const config = require("../../utils/config");
import { getPostMap, postSave, doDelete } from "@/api/personal";
import { Dialog } from "vant";
export default {
  name: "Confirmorder",
  components: {},
  data() {
    return {
      content: {},
      value: 3,
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
        ORG_ID_: "",
        USER_ID_: "",
        PHONE: "",
        CONTENT: "",
        ATTACHS: "",
        APPR_CONTENT: "",
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
    this.getPostMap();
  },
  methods: {
    getPostMap() {
      getPostMap({
        ID: this.$route.query.id,
      })
        .then((res) => {
          let { code, data } = res;
          if (code == 0) {
            const url =
              config[process.env.NODE_ENV].mockUrl +
              "/wjyql/uploadFile/saveFile";
            this.addressInfo = data.map;
            this.addressInfo.ATTACHS =data.map.ATTACHS;
            console.log(this.addressInfo);
            this.uploadImages = data.map.attachList.map((item) => {
              return {
                // url:config[process.env.NODE_ENV].mockUrl+'/wjyql/'+item.REAL_PATH
                url:
                  config[process.env.NODE_ENV].mockUrl +
                  "/wjyql/uploadFile/downloadFile?attachId=" +
                  item.ID,
                  id:item.ID
              };
            });
            // this.uploadImages = this.fileList
            console.log(this.fileList);
            console.log(this.addressInfo);
          }
        })
        .catch((error) => console.log(error));
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
      const url =
        config[process.env.NODE_ENV].mockUrl + "/wjyql/uploadFile/saveFile";
      xhr.open("post", url);
      xhr.send(formData);
      xhr.onload = function () {
        if (xhr.status === 200) {
          let { data } = JSON.parse(xhr.response);
          console.log(data);
          _this.addressInfo.ATTACHS =
            _this.addressInfo.ATTACHS + data.att_map.ID + ",";
            let url = config[process.env.NODE_ENV].mockUrl + "/wjyql/uploadFile/downloadFile?attachId="
          _this.uploadImages.push({
            url:url+data.att_map.ID,
            id:data.att_map.ID
          });
          console.log(
            _this.fileList,
            _this.uploadImages,
            _this.addressInfo.ATTACHS
          );
        }
      };
      // console.log(file);
    },
    onDelete(file, { index }) {
      this.uploadImages.splice(index, 1);
      console.log(this.fileList, this.uploadImages);
      return true;
    },
    onDelete1(index) {
      this.uploadImages.splice(index, 1);
      // console.log(this.fileList, this.uploadImages);
      return true;
    },
    onOversize(file) {
      // Toast("正在上传");
      // console.log(file);
      // Toast("文件大小不能超过 500kb");
    },
    deleted(e) {
      e.preventDefault();
      console.log("deleted",e);
      Dialog.confirm({
        title: "提示",
        message: "确定要删除吗？",
      })
        .then(() => {
          doDelete(this.$route.query.id)
            .then((res) => {
              this.$router.push({
                name: "Mypost",
              });
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    onSubmit(values) {
      this.addressInfo.ATTACHS = this.uploadImages.length!==0?this.uploadImages.map(item=>item.id).toString()+',':'';
      postSave({ ...this.addressInfo })
        .then((res) => {
          Dialog.alert({
            title: "提示",
            message: "保存成功",
          }).then(() => {
            this.$router.push({
              name: "Mypost",
            });
          });
        })
        .catch((error) => console.log(error));

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
  // position: fixed;
  // bottom: 100px;
  // left: 0;
  // right: 0;
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
  background-color: #ff8686;
}
::v-deep .van-field__control {
  text-align: right;
}
.hhhhh {
  ::v-deep .van-field__control {
    text-align: left;
  }
}
// ----------------
.van-uploader__wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
.van-uploader__preview {
    position: relative;
    margin: 0 8px 8px 0;
    cursor: pointer;
}
.van-uploader__preview-image {
    display: block;
    width: 80px;
    height: 80px;
    overflow: hidden;
    position: relative;
}
.van-image__img, .van-image__error, .van-image__loading {
    display: block;
    width: 100%;
    height: 100%;
}
.van-uploader__preview-delete {
    position: absolute;
    top: 0;
    right: 0;
    width: 14px;
    height: 14px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 0 0 0 12px;
}
.van-uploader__preview-delete-icon {
    position: absolute;
    top: -2px;
    right: -2px;
    color: #fff;
    font-size: 16px;
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
}
.van-icon {
    position: relative;
    display: inline-block;
    font: normal normal normal 14px/1 'vant-icon';
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
}
.van-icon-cross::before {
    content: '\F042';
}
.van-icon::before {
    display: inline-block;
}
::v-deep .van-uploader {
  .van-uploader__preview {
    display: none;
  }
}
</style>
