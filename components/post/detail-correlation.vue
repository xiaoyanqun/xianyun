<template>
  <div class="detail-correlation">
    <h4>相关攻略</h4>
    <nuxt-link :to="`/post/detail?id=${item.id}`" v-for="(item,index) in data" :key="index">
       <el-row type="flex" class="list">
      <div class="img">
        <img :src="item.images[0]" alt />
      </div>
      <div class="post-text">
        <div class="title">{{item.title}}</div>
        <p>{{ item.updated_at }} 阅读 {{item.watch}}</p>
      </div>
    </el-row>
    </nuxt-link>
  
  </div>
</template>
<script>
import moment from "moment";
export default {
  data(){
    return{
      data:[]
    }
  },
  mounted(){
    this.$axios({
      url:"/posts/recommend"
    }).then(res=>{
      this.data = res.data.data
      const arr = this.data.map(v=>{
        var a = moment(v.updated_at).format("YYYY-MM-DD HH:mm")
        v.updated_at = a
        return v
      })
      this.data = arr
    })
  }
};
</script>
<style lang='less' scoped>
h4 {
  font-weight: 400;
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}
a {
  display: block;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  .list {
    .img {
      width: 100px;
      height: 80px;
      flex-shrink: 0;
      background: #ddd;
      overflow: hidden;
      margin-right: 10px;
      img{
        width: 100%;
      }
    }
    .post-text {
      position: relative;
      .title {
        width: 170px;
        height: 45px;
        font-size: 16px;
      }
      p {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>