<template>
  <div class="detail-post">
    <div class="crumbs">
      <nuxt-link to="/post">旅游攻略</nuxt-link>/ 攻略详情
    </div>
    <h1>{{postsList.title}}</h1>
    <div class="post-info">
      <span>攻略：{{postsList.city.created_at}}</span>
      <span>阅读：{{postsList.watch}}</span>
    </div>
    <div class="content" v-html="postsList.content"></div>
    <div class="post-ctrl">
      <el-row type="flex" justify="center">
        <div class="ctrl-item">
          <i class="iconfont iconpinglun"></i>
          <p>评论({{postsList.comments.length}})</p>
        </div>
        <div class="ctrl-item" @click="collect(postsList.id)">
          <i class="iconfont iconstar1"></i>
          <p>收藏</p>
        </div>
        <div class="ctrl-item">
          <i class="iconfont iconfenxiang"></i>
          <p>分享</p>
        </div>
        <div class="ctrl-item" @click="islike(postsList.id)">
          <i class="iconfont iconding"></i>
          <p v-if="postsList.like">点赞({{postsList.like}})</p>
          <p v-if="!postsList.like">点赞({{like}})</p>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      like: 0,
      postsList: {
        city: {},
        comments: []
      }
    };
  },
  watch:{
    $route(){
      this.getPostsById()
    }
  },
  mounted() {
    this.getPostsById()
  },
  methods: {
    getPostsById(){
      this.$axios({
      url: "/posts",
      params: { id: this.$route.query.id }
    }).then(res => {
      this.postsList = res.data.data[0];
      console.log(this.postsList);
    });
    },
    islike(id) {
      const token = this.$store.state.user.userInfo.token;
      this.$axios({
        url: "/posts/like",
        params: { id },
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(res => {
        console.log(res);
        this.$message.success("点赞成功");
      });
    },
    collect(id) {
      const token = this.$store.state.user.userInfo.token;
      this.$axios({
        url: "/posts/star",
        params: { id },
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(res => {
        console.log(res);
        this.$message.success("收藏成功");
        this.like++;
        this.postsList.like++;
      });
    }
  }
};
</script>
<style lang='less' scoped>
.detail-post {
  .crumbs {
    color: #606266;
    a {
      color: black;
      font-size: 14px;
      font-weight: 600;
    }
  }
  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
  }
  .post-info {
    color: #999;
    padding: 20px;
    text-align: right;
  }
  .content {
    /deep/ img {
      max-width: 700px;
    }
  }
  .post-ctrl {
    padding: 50px 0 30px;
    .ctrl-item {
      margin: 0 20px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      p {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
      i {
        display: block;
        font-size: 28px;
        color: orange;
      }
    }
  }
}
</style>