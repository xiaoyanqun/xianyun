<template>
  <div class="postList" >
    <div class="one" v-if="data.images.length === 1">
      <el-row type="flex">
        <el-col :span="8" class="imgs">
          <nuxt-link :to="'/post/detail?id='+data.id">
            <img
              :src="data.images[0]"
              alt
            />
          </nuxt-link>
        </el-col>
        <el-col :span="16" class="imgs">
          <h4>
            <nuxt-link :to="'/post/detail?id='+data.id">{{data.title}}</nuxt-link>
          </h4>
          <p>
            <nuxt-link
            :to="'/post/detail?id='+data.id"
            > {{data.summary}}</nuxt-link>
          </p>
          <el-row type="flex" justify="space-between" class="userInfo">
            <el-row type="flex" class="left">
              <span class="el-icon-location-outline">{{data.cityName}}</span>
              <el-row type="flex" class="user">
                by
                <nuxt-link to="/user/personal">
                  <el-row type="flex" style="margin-left:5px;">
                    <img :src="'http://127.0.0.1:1337'+data.account.defaultAvatar" alt />
                    <span>{{data.account.nickname}}</span>
                  </el-row>
                </nuxt-link>
              </el-row>
              <span class="el-icon-view">{{data.watch}}</span>
            </el-row>
            <span class="right" v-if="data.like">{{data.like}} 赞</span>
            <span class="right" v-if="!data.like">没人点赞</span>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="three" v-else>
      <h4>
        <nuxt-link :to="'/post/detail?id='+data.id">{{data.title}}</nuxt-link>
      </h4>
      <p>
        <nuxt-link
          :to="'/post/detail?id='+data.id"
        >{{data.summary}}</nuxt-link>
      </p>
      <el-row type="flex" justify="space-between" class="imgs">
        <el-col :span="8" v-for="(item,index) in data.images.filter((e,i)=>i<3)" :key="index">
          <nuxt-link :to="'/post/detail?id='+data.id">
            <img
              :src="item"
              alt
            />
          </nuxt-link>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="userInfo">
        <el-row type="flex" class="left">
          <span class="el-icon-location-outline">{{data.cityName}}</span>
          <div class="user">
            by
            <nuxt-link to="/user/personal">
              <img :src="'http://127.0.0.1:1337'+data.account.defaultAvatar" alt />
              <span>{{data.account.nickname}}</span>
            </nuxt-link>
          </div>
          <span class="el-icon-view">{{data.watch}}</span>
        </el-row>
          <span class="right" v-if="data.like">{{data.like}} 赞</span>
            <span class="right" v-if="!data.like">没人点赞</span>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:{}
    }
  },
  methods:{
  },
  mounted(){
    
  }
 
};
</script>

<style lang="less" scoped>
.postList {
  .one {
    border-top: 1px solid #ddd;
    .imgs {
      margin-top: 18px;
    }
  }
  .three {
    border-top: 1px solid #ddd;
  }
  h4 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 15px;
    margin-bottom: 15px;
    font-weight: 400;
    font-size: 18px;
    a:hover {
      color: orange;
    }
  }
  p {
    height: 59px;
    font-size: 14px;
    overflow: hidden;
    margin-bottom: 15px;
    a {
      color: #666;
    }
  }
  .imgs {
    img {
      width: 220px;
      height: 150px;
      display: block;
    }
  }
  .userInfo {
    .right {
      color: orange;
      font-size: 16px;
      margin-top: 15px;
    }
    .user {
      span {
        color: orange;
      }
    }
    img {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .left {
      margin-top: 20px;
      margin-bottom: 30px;
      font-size: 12px;
      color: #999;
      .el-icon-location-outline,
      .el-icon-view {
        margin-top: 3px;
        margin-right: 7px;
      }
      .el-icon-view {
        margin-right: none;
        margin-left: 10px;
      }
    }
  }
}
</style>

