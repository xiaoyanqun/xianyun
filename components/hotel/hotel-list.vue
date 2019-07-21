<template>
  <div class="hotel-item">
    <el-row type="flex">
      <el-col class="item" :span="8">
        <nuxt-link to="/hotel/1.html">
          <img
            style="width:100%;height:210px"
            src="http://qcloud.dpfile.com/pc/wQ2ejOSmhB4OoEq1LYPHp_2RhNciyW026YiQFr_EEZsQrI_ZB6abZPwgKDOmI03U3dWYFEM5hoslgWXTJDjSPA.jpg"
            alt
          />
        </nuxt-link>
      </el-col>
      <el-col class="item" :span="10">
        <h4>
          <nuxt-link to="/hotel/1.html">好来阁宾馆</nuxt-link>
        </h4>
        <div class="hotel-en-name">
          <span>hao lai ge shang wu hotel</span>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          经济型
        </div>
        <el-row type="flex" class="good">
          <el-col :span="10">
            <el-rate
              v-model="3.7"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </el-col>
          <el-col :span="7"><span>36</span>条评论</el-col>
          <el-col :span="7"><span>13</span> 篇游记</el-col>
        </el-row>
        <div class="location-row">
          <i class="iconfont iconlocation"></i>
          位于: 宝塔路358号
        </div>
      </el-col>
      <el-col class="item" :span="6">
        <table>
          <tr>
            <td>
              <div>携程</div>
            </td>
            <td  class="right">
              <div>
                <span>￥122</span>
                起
                <i class="el-icon-arrow-right"></i>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div>携程</div>
            </td>
            <td  class="right">
              <div>
                <span>￥122</span>
                起
                  <i class="el-icon-arrow-right"></i>
              </div>
            </td>
          </tr>
          <tr>
            <td >
              <div>携程</div>
            </td>
            <td  class="right">
              <div>
                <span>￥122</span>
                起
                  <i class="el-icon-arrow-right"></i>
              </div>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
    }
  }
};
</script>
<style lang='less' scoped>
.hotel-item{
  padding:25px 0;
  border-bottom:1px solid #ddd;
  .item{
    padding:0 10px;
  }
  .item:nth-child(3){
    padding-top:20px;
  }
  h4{
        font-weight: 400;
    font-size: x-large;
  }
  .hotel-en-name{
    i{
      color: orange;
    }
  }
  .good{
    margin:10px 0;
    span{
      color:orange;
    }
  }
}
table{
  border-collapse:collapse;
  width: 234px;
  tr{
      width: 233px;
      height: 47px;
        font-size: 14px;
      color: #606266;
      &:hover{
        background-color: #f5f7fa;
            cursor: pointer;
      }
      td{
        border-bottom: 1px solid #ebeef5;
        div{
          padding:0 10px;
        }
      }
      td.right{
        span{
              color: #f90;
        }
      }
  }
}
</style>