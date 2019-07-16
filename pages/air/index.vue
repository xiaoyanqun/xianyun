<template>
  <section class="container">
    <!-- 标题 -->
    <h2 class="art-title">
      <span class="iconfont iconfeiji"></span>
      <i>国内机票</i>
    </h2>
    <!-- 主体 -->
    <el-row type="flex" justify="space-between">
      <SearchForm/>
      <div class="sale-banner">
        <img src="http://157.122.54.189:9093/images/pic_sale.jpeg" alt />
      </div>
    </el-row>
    <!-- 广告 -->
    <el-row type="flex" class="statement">
      <el-col :span="8">
        <i class="iconfont iconweibiaoti-_huabanfuben" style="color: rgb(64, 158, 255);"></i>
        <span>100%航协认证</span>
      </el-col>
      <el-col :span="8">
        <i style="color: green;" class="iconfont iconbaozheng"></i>
        <span>出行保证</span>
      </el-col>
      <el-col :span="8">
        <i style="color: rgb(64, 158, 255);" class="iconfont icondianhua"></i>
        <span>7x24小时服务</span>
      </el-col>
    </el-row>
    <!-- 机票 -->
    <h2 class="art-title2">
      <span class="iconfont icontejiajipiao"></span>
      <i>特价机票</i>
    </h2>
    <el-row class="special">
      <el-col :span="6" v-for="(item,index) in special" :key ="index">
        <nuxt-link :to="`/air/flights?departCity=${item.departCity}&departCode=${item.departCode}&destCity=${item.destCity}&destCode=${item.destCode}&departDate=${item.departDate}`">
         <img :src="item.cover" alt="">
          <el-row type="flex" justify="space-around" class="link">
            <span>{{item.departCity}}-{{item.destCity}}</span>
            <span>￥{{item.price}}</span>
          </el-row>
        </nuxt-link>
      </el-col>
    </el-row>
  </section>
</template>
<script>
import SearchForm from '@/components/air/searchForm'
export default {
  data() {
    return {
      special:[],
    };
  },
   mounted() {
    this.$axios({
      url:'/airs/sale'
    }).then(res=>{
      console.log(res.data)
      this.special = res.data.data
    })
  },
  components:{
    SearchForm
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .art-title {
    margin: 15px 0;
    font-size: 20px;
    color: orange;
    font-weight: 400;
    span {
      font-size: 20px;
      margin-right: 5px;
    }
  }
  .statement {
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    padding: 10px 0;
    height: 58px;
    margin: 15px 0;
    .el-col {
      text-align: center;
      line-height: 38px;
      span {
        vertical-align: middle;
      }
      &:nth-child(1) span {
        margin-left: 3px;
      }
      i {
        font-size: 30px;
        vertical-align: middle;
      }
    }
  }
  .art-title2 {
    margin-bottom:8px;
    color: #409eff;
    span {
      font-size: 20px;
      margin-right: 5px;
    }
    i {
      font-size: 20px;
      font-weight: 400;
    }
  }
  .special {
    padding: 20px;
    margin-bottom: 50px;
    border: 1px solid #ddd;
    .el-col {
       position: relative;
      text-align: center;
      overflow: hidden;
      height: 140px;
      
      a {
       
        display: block;
        width:225px;
        margin:0 auto;
        img {
          width: 100%;
          display: block;
          margin: 0 auto;
        }
        .link{
          margin:0 7.25px;
          color:#fff;
          position:absolute;
          left: 0;
          bottom:0;
          background: rgba(0,0,0,.5);
          height: 30px;
          width:225px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
