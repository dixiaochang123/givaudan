<template>
   <div class="nodata">
      <img src="../../../assets/match/没有数据信息.png" alt="">
      <p>暂时没有数据哦~</p>
    </div>
  
</template>

<script>
export default {
  props: [],
  data() {
    return {
    }
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.nodata {
    width: 100%;
    text-align: center;
    padding-top: 185px;
    img {
        width:192px;
        height:278px;
    }
    p {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      padding-top: 51px;
    }
  }
</style>
