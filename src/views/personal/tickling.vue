<template>
  <div class="personal">
    <van-nav-bar title="意见与反馈" left-text="" left-arrow fixed @click-left="onClickLeft" />
    <div style="height: 46px"></div>
    <div class="box">
      <h3>问题描述<span>200字以内</span>
      </h3>
      <van-field v-model="description" rows="3" autosize type="textarea" maxlength="200" show-word-limit placeholder="请详细描述您的问题" />
      <h3>联系方式<span>方便我们与您联系，排查问题</span></h3>
      <van-field v-model="source" placeholder="手机/微信号/QQ" />
      <h3>上传问题截图<span>图片最多5张，每张不超过5M</span></h3>
      <van-uploader v-model="fileList" :max-size="50000 * 1024" multiple :max-count="5" :after-read="onRead" :before-delete="onDelete" @oversize="onOversize">
        <div class="upload">
          <img src="../../assets/personal/矩形 846 拷贝.png" alt="">
        </div>
      </van-uploader>
      <div class="btn" @click="submit">提交反馈</div>

    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {CreateData, Examples_Upload} from "@/api/personal";
import {Toast} from "vant";
export default {
  name: "Tickling",
  components: {},
  data() {
    return {
      description: "",
      source: "",
      fileList: [],
      uploadImages: [],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
    key() {
      return this.$route.fullPath;
    },
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1); //返回上一层
    },
    onOversize(file) {
      // Toast("正在上传");
      // console.log(file);
      // Toast("文件大小不能超过 500kb");
    },
    onRead(file) {
      var formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
  　　formData.append('file', file.file); //接口需要传的参数
      let _this = this
      var xhr = new XMLHttpRequest()
      xhr.open('post', 'http://cj.pydoton.com/?s=App.Examples_Upload.GoFtp')
      xhr.send(formData) 
      xhr.onload = function () {
        if (xhr.status === 200) {
          let {data} = JSON.parse(xhr.response)
          _this.uploadImages.push(data.url)
          console.log(_this.fileList,_this.uploadImages)
          
        }
      }
      // console.log(file);
    },
    onDelete(file,{index}) {
      this.uploadImages.splice(index, 1);
      console.log(this.fileList,this.uploadImages)
      return true;

    },
    submit() {
      let data = {newData:JSON.stringify({
        description:this.description,
        source:this.source,
        url:this.uploadImages.join(","),
      })}
      let _this = this
      var xhr = new XMLHttpRequest()
      xhr.open('post', 'http://cj.pydoton.com/?s=App.FeedBack.CreateData')
      xhr.send(JSON.stringify(data)) 
      xhr.onload = function () {
        if (xhr.status === 200) {
          let {data,ret} = JSON.parse(xhr.response)
          if(ret==200) {

            _this.$router.push({
              name: "Personal",
            });
          }
          
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.personal {
  background: #f5f5f5;
  min-height: 100vh;
}
::v-deep .van-nav-bar .van-icon {
  color: #212223;
}
.placeholder {
  height: 30px;
}
.box {
  // width: 100%;
  padding: 0 20px;
  h3 {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #3a3a3a;
    margin: 47px 0 26px;
    span {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      display: inline-block;
      padding-left: 16px;
    }
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
  .btn {
    width: 220px;
    height: 68px;
    line-height: 68px;
    text-align: center;
    background: #ff5959;
    border-radius: 34px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin: 87px auto 0;
  }
}
</style>
