<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :data='unAirList' @changeList="changeList"/>
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem  ref="child"  :data="item" v-for="(item,index) in tempList" :key="index" />
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
        <FlightsAside/>
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsFilters from "@/components/air/flightsFilters.vue"
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsAside from "@/components/air/flightsAside.vue"
export default {
  data() {
    return {
      flag:true,
      airList: {
        flights:[],
        info:{},
        options:{},
      },
      unAirList: {
        flights:[],
        info:{},
        options:{},
      },

      pageIndex: 1,
      pageSize: 5,
      total: 5,
    };
  },
  watch:{
    // 监听路由的变化重新显示数据
    $route(){
      this.init()
    }
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
      this.$refs.child[0].isShow1()
      this.$refs.child[1].isShow1()
      this.$refs.child[2].isShow1()
    },
    // 筛选机票列表数据
    changeList(arr){
      this.airList.flights = arr
    },
    // 显示页面数据
    // setDataList(){
    //    this.tempList = this.airList.flights.slice(
    //     (this.pageIndex - 1)*this.pageSize,
    //     this.pageIndex *this.pageSize
    //   )
    // }
    init(){
      this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      console.log(res.data);
      this.airList = res.data;
      this.total = res.data.total
      // 不改变的机票列表数据
      this.unAirList = {...res.data}
    });
    }
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  mounted() {
    this.init()
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