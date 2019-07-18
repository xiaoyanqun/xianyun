<template>
  <div class="container">
    <el-row type="flex" class="container-a">
      <dir class="left">
        <!-- 文章区域 -->
        <Detailpost />
        <!-- 评论 -->
      </dir>
      <!-- 相关攻略 -->
      <div class="right">
        <DetailCorrelation />
      </div>
    </el-row>
  </div>
</template>
<script>
import Detailpost from "@/components/post/detail-post.vue";
import DetailCorrelation from "@/components/post/detail-correlation.vue";
export default {
  data() {
    return {};
  },
  components: {
    Detailpost,
    DetailCorrelation
  }
};
</script>
<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .container-a {
    margin-top: 20px;
    .left {
      width: 700px;
    }
    .right{
      margin-left: 20px;
    }
  }
}
</style>