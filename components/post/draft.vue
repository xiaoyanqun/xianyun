<template>
<div class="container-draft">
    <h2>草稿箱（5）</h2>
    <div class="container-draf-item" v-for="(item,index) in data" :key="index">
  <div class="tltle" @click="edit(item)">{{item.title}}
    <span class="iconfont el-icon-edit"></span>
  </div>
  <p>{{item.time}}</p>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      data:[],
    }
  },
  methods:{
    show(arr){
      this.data = arr
    },
    edit(item){
      this.$emit('edit',item)
    }
  },
  mounted(){
    this.data = JSON.parse(window.localStorage.getItem('posts'))
  }
}
</script>
<style lang='less' scoped>
.container-draft{
  .container-draf-item{
    margin-bottom: 10px;
  }
  width: 178px;
  padding:10px;
  border:1px solid #ddd;
  h2{
    margin-bottom: 10px;
    font-weight: 400;
    color: #666;
    font-size: 16px
  }
  .tltle{
    font-size: 14px;
    &:hover{
      cursor: pointer;
      color:orange;
       text-decoration: underline;
    }
  }
  p{
    color:#999;
    font-size: 16px
  }
}
</style>