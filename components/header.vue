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
      <div class="login" v-if="false">
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
      <div class="logout" v-if="true">
        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1562849498&di=b2f08b6582e121a6014fb1cdc3200cac&src=http://b-ssl.duitang.com/uploads/item/201710/07/20171007171838_Fe5YN.thumb.700_0.jpeg" alt="">
            赵丽颖
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {};
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