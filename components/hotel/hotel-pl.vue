<template>
  <div class="pl_list">
    <el-row type="flex">
      <el-col :span="3" class="user">
        <el-row type="flex">
          <img src="https://n4-q.mafengwo.net/s11/M00/64/81/wKgBEFsmE0WAPbqnAAAOwSUlOKY63.jpeg?imageMogr2%2Fthumbnail%2F%2196x96r%2Fgravity%2FCenter%2Fcrop%2F%2196x96%2Fquality%2F90" alt="">
        <div class="name">
          <p v-if="data.account !== undefined">{{data.account.nickname}}</p>
          <p>vip 8</p>
        </div>
        </el-row>
        <div class="date">{{date}}</div>
      </el-col>
        <el-col :span="21">
          <div class="content">{{data.content}}</div>
          <el-input resize="none" type="textarea" @blur="blur" @focus="focus" :rows="rows" placeholder="添加回复" v-model="textarea"></el-input>
          <div class="btn">
             <el-button v-show="isShow" size="mini" type="primary" style="margin-top:10px ">回复</el-button>
          </div>
            <div class="child">
      <Item v-if="data.followed !==undefined && data.followed.length > 0" :list="data.followed[0]"/>
    </div>
        </el-col>
    </el-row>
    
  </div>
</template>
<script>

import moment from "moment";
import { setTimeout } from 'timers';
export default {
   name: "Item",
   props: {
    list: {
      type: Object,
      default: {
        followed:[]
      }
    }
  },
  data(){
    return{
      isShow:false,
      rows:1,
      textarea:'',
      date:'',
      data:{
        followed:[]
      },
    }
  },
  methods:{
    // 获取焦点
    focus(){
      this.rows = 3
      this.isShow = true;
    },
    // 失去焦点
    blur(){
       this.rows = 1
       this.isShow = false
    }
  },
  mounted(){
    console.log(this.list)
       this.data = this.list
   this.date = this.data.created_at
 const news = moment(this.date).format("YYYY-MM-DD");
 this.date = news
   
  }
};
</script>
<style lang='less' scoped>
.btn{
  text-align: right;
}
.pl_list{
      border-top: 1px dashed #eee;
    padding: 20px 0;
    margin-top: 10px;
    .name{
      width: 50px;
      margin-left: 10px;
      font-size:14px;
      color:orange;
    }
    .date{
      font-size: 14px;
      color:#666;
      margin-top:10px;
    }
    img{
      display: inline-block;
    border-radius: 50%;
    border: 2px solid #fa3;
    width: 40px;
    height: 40px;
}
.content{
  margin-bottom: 10px;
}
}

</style>