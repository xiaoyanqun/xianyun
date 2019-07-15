<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="post-left">
        <!-- tab栏切换  -->
        <div class="menus-body">
          <ul class="menus">
            <li class="menus-item">
              <span>热门城市</span>
              <i class="el-icon-arrow-right"></i>
            </li>
            <li class="menus-item">
              <span>推荐城市</span>
              <i class="el-icon-arrow-right"></i>
            </li>
            <li class="menus-item">
              <span>奔向海岛</span>
              <i class="el-icon-arrow-right"></i>
            </li>
            <li class="menus-item">
              <span>主题推荐</span>
              <i class="el-icon-arrow-right"></i>
            </li>
          </ul>
          <div class="sub-menus">
            <ul>
              <li>
                <nuxt-link to="/">
                  <em>1</em>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  <em>2</em>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  <em>3</em>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  <em>4</em>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  <em>5</em>
                  <strong>北京</strong>
                  <span>世界著名古都和现代化国际城市</span>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="aside-recommend">
          <h2>推荐城市</h2>
          <nuxt-link to="/">
            <img src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=d4e2f29522381f309a198aab99004c67/6a63f6246b600c33cd891e65104c510fd8f9a1af.jpg" alt="">
          </nuxt-link>
        </div>
      </div>
      <div class="post-right">
        <!-- 搜索 -->
        <el-row type="flex" class="search">
          <input type="text" placeholder="请输入你想去的地方，比如：'广州'">
          <i class="el-icon-search"></i>
        </el-row>
        <div class="search-recommend">
          推荐： <span>广州</span><span>上海</span><span>北京</span>
        </div>
        <!-- 推荐攻略 -->
        <el-row type='flex' justify="space-between" class="strategy">
          <h2 class="strategy-title">推荐攻略</h2>
          <el-button type="primary" icon="el-icon-edit" style="height:40px">写游记</el-button>
        </el-row>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.container {
  padding: 20px 0;
  margin: 0 auto;
  width: 1000px;
  .post-left {
    width: 260px;
    .menus-body {
      margin-bottom: 20px;
      position: relative;
      .menus {
        position: relative;
        background-color: #fff;
        z-index:2;
        border: 1px solid #ddd;
        border-bottom: none;
        border-right: none;
        .menus-item {
          &:hover{
            border-right: none;
          }
          &:hover span{
            color:orange
          }
           &:hover i{
            color:orange
          }
          height: 40px;
          line-height: 40px;
          padding: 0 20px;
          font-size: 14px;
          border-right: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          i {
            margin-left: 136px;
            font-size: 20px;
            color: #ddd;
          }
        }
      }
      .sub-menus{
        display: none;
        z-index: 1;
        background-color: #fff;
        top: 0;
        right: -390px;
        position:absolute;
        border: 1px solid #ddd;
        width: 350px;
        padding:10px 20px;
        ul{
          li{
            height: 36px;
            line-height: 36px;
            em{
              font-size: 24px;
              color:orange;
              font-style:italic;
              margin-right: 5px;
            }
            strong{
              &:hover{
                    text-decoration: underline;
              }
              font-weight: 400;
              color:orange;
              margin-right: 5px;
               font-size: 14px;
            }
            span{
              &:hover{
                    text-decoration: underline;
              }
              color:#999;
               font-size: 14px;
            }
          }
        }
      }
    }
    .aside-recommend{
      h2{
        font-weight: 400;
        padding-bottom:10px;
        font-size: 16px;
        border-bottom:1px solid #ddd;
        margin-bottom: 10px;
      }
    }
  }
  .post-right {
    width: 700px;
    .search{
      border:2px solid orange;
      height: 40px;
      line-height: 40px;
      input{
        border: none;
        outline: none;
        padding: 0 20px;
        flex:1;
      }
      i{
        font-weight: 700;
        font-size: 24px;
        color: orange;
        height: 24px;
        line-height: 24px;
        vertical-align:middle;
        margin: auto 10px;
      }
    }
    .search-recommend{
      font-size: 12px;
      color:#666;
      padding: 10px 0;
      span{
        margin-left: 8px;
        &:hover{
          text-decoration: underline;
          color:orange;
          cursor: pointer;
        }
      }
    }
    .strategy{
      margin-top:10px;
      border-bottom: 1px solid #ddd;
      .strategy-title{
        display: inline-block;
        color:orange;
        font-size: 18px;
        font-weight: 400;
        padding-bottom: 20px;
        border-bottom: 2px solid orange;
        // padding-bottom:
      }
    }
  }
}
</style>
