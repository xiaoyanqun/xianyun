<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem :data="item" v-for="(item,index) in tempList" :key="index" />
        </div>
        <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
export default {
  data() {
    return {
      airList: {
        flights:[]
      },
      pageIndex: 1,
      pageSize: 5,
      total: 5,
    };
  },
  computed:{
   tempList(){
      return this.airList.flights.slice(
        (this.pageIndex - 1)*this.pageSize,
        this.pageIndex *this.pageSize)
   }
  },
  methods: {
    handleSizeChange(val) {
      this.pageIndex = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageIndex = val
    },
    // 显示页面数据
    // setDataList(){
    //    this.tempList = this.airList.flights.slice(
    //     (this.pageIndex - 1)*this.pageSize,
    //     this.pageIndex *this.pageSize
    //   )
    // }
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  mounted() {
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res);
      this.airList = res.data;
      this.total = res.data.total
    });
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>