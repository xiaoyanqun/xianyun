<template>
  <div class="container">
    <el-row type="flex" justify="space-between" style="width:1000px;margin: 0 auto">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <el-row type="flex" class="main">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div class="login" v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
      <div class="logout" v-if="$store.state.user.userInfo.token">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt="">
            {{$store.state.user.userInfo.user.nickname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native ="handleLogOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return {
      
    }
  },
  methods:{
    handleLogOut(){
      this.$store.commit('user/delUserInfo')
    }
  }
};
</script>
<style lang='less' scoped>
.container {
  height: 60px;
  box-shadow: 0 3px 3px #ccc;
  line-height: 60px;
  .main {
    flex: 1;
    a {
      display: block;
      height: 60px;
      box-sizing: border-box;
      padding: 0 20px;
      &:hover {
        color: #409eff;
        border-bottom: 5px #409eff solid;
      }
      &.nuxt-link-exact-active {
        background-color: #409eff;
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .logo {
    margin-right: 20px;
    img {
      margin-top: 9px;
      width: 156px;
      height: 42px;
    }
  }
  .logout{
    img{
      width: 36px;
      height: 36px;
      vertical-align:middle;
      border-radius: 50%
    }
  }
}
</style>