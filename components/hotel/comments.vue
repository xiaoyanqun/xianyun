<template>
  <!-- 用户评论 -->
  <div class="userComments">
    <div class="comments">
      <h4>10条真实用户评论</h4>
    </div>
    <div class="comments1">
      <el-row type="flex">
        <el-col :span="4">
          <span class="getComments">总评数:{{data.all_remarks}}</span>
          <span class="getComments">好评数:{{data.good_remarks}}</span>
          <span class="getComments">差评数:{{data.bad_remarks}}</span>
        </el-col>
        <el-col :span="5" class="myComments">
          <div class="addComments">
            <div class="getIcon">
              <el-rate
                :value="data.stars"
                disabled
                show-score
                text-color="#ff9900"
              ></el-rate>    
            </div>
            <div class="tuiJian">推荐</div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="progress">
            <el-progress
              color="orange"
              type="circle"
              :width="75"
              :stroke-width="2"
              :show-text="false"
              :percentage="75"
            ></el-progress>
            <div class="progress1">
              <span>环境</span>
              <span>{{data.scores.environment}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="progress">
            <el-progress
              color="orange"
              type="circle"
              :width="75"
              :stroke-width="2"
              :show-text="false"
              :percentage="75"
            ></el-progress>
            <div class="progress1">
              <span>产品</span>
              <span>{{data.scores.product}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="progress">
            <el-progress
              color="orange"
              type="circle"
              :width="75"
              :stroke-width="2"
              :show-text="false"
              :percentage="75"
            ></el-progress>
            <div class="progress1">
              <span>服务</span>
              <span>{{data.scores.service}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Object,
      default: {
        scores: {}
      }
    }
  }, 
  data(){
    return{
      data:{
        scores: {}
      }
    }
  },
  mounted(){
    window.setTimeout(v=>{
      this.data = this.list
    },3000)
  }
};
</script>
<style lang="less" scoped>
.userComments {

  .comments {
  }
  .comments1 {
    padding: 20px 0;
    .getComments {
      display: block;
      color: #666;
    }
    .myComments {
      .addComments {
        position: relative;
        .getIcon {
          padding: 20px 0;
          color: rgb(247, 186, 42);
          .el-icon-star-on {
            font-size: 25px;
            //    color:yellow;
            margin-right: -6px;
          }
        }
        .tuiJian {
          position: absolute;
          top: 1px;
          left: 29px;
          width: 70px;
          height: 70px;
          line-height: 70px;
          text-align: center;
          border: 2px solid #fa3;
          border-radius: 50%;
          opacity: 0.25;
          transform: rotate(-30deg);
          font-size: x-large;
          color: #f90;
        }
      }
    }
    .progress {
      position: relative;
      .progress1 {
        position: absolute;
        top: 18px;
        right: 72px;
        span {
          display: block;
          text-align: center;
          color: rgb(255, 153, 0);
        }
      }
    }
  }
}
</style>


