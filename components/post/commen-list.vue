<template>
<div class="list">
  <div class="info">
      <img :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt="">
    {{data.account.nickname}} 
    <i>2019-07-20 10:34</i>
    <span>{{data.level}}</span>
  </div>
  <div class="content">
    <div class="floor">
      <Item @reply="my" v-if="data.parent!==undefined" :data="data.parent"/>
    </div>
    <div class="new" @mouseover="isShow=true" @mouseout="isShow=false">
      <div class="message">
        {{data.content}}
      </div>
      <div class="imgs">
        <el-row type="flex">
          <div class="img" v-for="(item,index) in data.pics" :key="index" >
          <img :src="$axios.defaults.baseURL+item.url" alt="">
        </div>
        </el-row>
      </div>
      <div class="ctrl">
        <a @click="reply(data)" :class="{active:isShow}" to="javascript:;">回复</a>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
   name: "Item",
  data(){
    return{
      isShow:false
    }
  },
  props:{
    data:{ 
      type:Object,
      default:{
        parent:{
          account:{}
        }
      }
    }
  },
  methods:{
    my(obj){
      this.$emit('reply',obj)
    },
    reply(data){
       const obj = {
        post:this.$route.query.id,
        follow:data.id,
        name:data.account.nickname
      }
     this.$emit('reply',obj)
    }
  },
  mounted(){
    console.log(this.data)
  }
}
</script>
<style lang='less' scoped>
.img{
      width: 80px;
    height: 80px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 5px;
    margin-top: 10px;
    padding: 5px;
    border: 1px dashed #ddd;
}
.list{
  border:1px solid #ddd;
   border-bottom: 1px dashed #ddd;
    padding: 20px 20px 5px;
    .info{
      font-size: 12px;
      margin-bottom: 10px;
      i{
            color: #999;
      }
      img{
        vertical-align: top;
        width: 16px;
        height:16px;
      }
      span{
        float: right;
      }
    }
    .content{
      padding: 0 0 0 30px;
      .new{
        margin-top:10px;
      }
      .ctrl{
        height: 20px;
        text-align: right;
        .active{
          display:block;
        }
        a{
          display: none;
          color: #1e50a2;
          font-size: 12px;
          &:hover{
            text-decoration: underline;
                cursor: pointer;
          }
        }
      }
    }
}
</style>