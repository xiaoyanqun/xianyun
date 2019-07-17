<template>
  <div class="postList">
    <div class="one">
      <el-row type="flex">
        <el-col :span="8" class="imgs">
          <nuxt-link to="/">
            <img
              src="https://n3-q.mafengwo.net/s10/M00/E8/E4/wKgBZ1octoCABhgLAAafahORRLs91.jpeg?imageView2%2F2%2Fw%2F1360%2Fq%2F90"
              alt
            />
          </nuxt-link>
        </el-col>
        <el-col :span="16" class="imgs">
          <h4>
            <nuxt-link to="/">远东行：用好奇心打量这座城 —— 最值得收藏的海参崴出行攻略</nuxt-link>
          </h4>
          <p>
            <nuxt-link
              to="/"
            >大家对塞班岛总存在着这样的误解，知道它是美属地盘，就理所当然地觉得这里的花费一定很高，花费高有高的玩法，那如果只有6000块的预算呢？要怎么玩？关于旅行这件事，我们要让钱花得更有道理，收下这份攻略，带你6000块花式玩转塞班。图：塞班岛。 by第5季旅游一、怎样用6000块玩转塞班？大多数出境游客人不做预算或最终花费远远超出预算，对预算的合理分配对控制我们旅行的花费就很重要了，如何只花6000块玩转塞班岛，对预算超支say no？下面从5个方面来为您一一解读：机票+酒店、岛上交通、玩乐项目、吃以及购买纪念品。1.怎样订机票+酒店性价比最高？机票和酒店的花销往往会占据我们旅行大半的花销，假设机票酒店为塞班行预算的一半，剩下的吃行玩购为预算的另一半，如果能在机票酒店这部分省下钱，也就意味着在塞班岛用来吃行玩购的钱就增加了怎样去塞班？可以转机也可以直飞，转机大多会从韩国转，提前蹲守能买到韩国飞塞班的特价机票，2000以下就能入手，加上国内飞韩国的机票来回塞班得5000+，还没算上在塞班的住宿费用，转机还有中途等待的时间，光花在路途上的时间就比直飞要多上一倍甚至更多，转乘奔波劳累，非联程票还要担心行李托运问题，所以建议大家有直飞还是尽量选择直飞。在酒店上，旅途中我们呆在酒店的时间远比在外游玩的时间少，酒店干净整洁基本就能满足我们休息的需求，塞班不是个享受酒店的地方而且还真不能跟国内星级酒店等位比较，所以不建议大家花过多的钱在塞班的酒店体验上。怎样在机票酒店上获得最高性价比的体验？ 直飞塞班的航班一般和酒店一起打包成机票+酒店套餐，价格要比单定机票、酒店要更加便捷实惠，往往3千多就能把机票和酒店一键搞定。</nuxt-link>
          </p>
          <el-row type="flex" justify="space-between" class="userInfo">
        <el-row type="flex" class="left">
          <span class="el-icon-location-outline">北京市</span>
          <el-row type="flex" class="user">
            by
            <nuxt-link to="/">
             <el-row type="flex" style="margin-left:5px;">
                <img src="http://127.0.0.1:1337/assets/images/avatar.jpg" alt />
              <span>地球发动机</span>
             </el-row>
            </nuxt-link>
          </el-row>
          <span class="el-icon-view">2032</span>
        </el-row>
        <span class="right">20 赞</span>
      </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.postList {
  .one{
    border-top:1px solid #ddd;
    .imgs{
       margin-top: 18px;
    }
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

