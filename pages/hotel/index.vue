<template>
  <div class="correlation">
    <h4>酒店 > 南京市酒店预订</h4>
    <!-- 筛选 -->
    <div class="screen">
      <Screen />
    </div>
    <!-- 酒店列表 -->
    <div class="hotellist">
      <HotelList v-for="(item,index) in houstList" :data="item" :key="index" />
    </div>
    <!-- 分页 -->
    <div class="pagechange">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import Screen from "@/components/hotel/screen";
import HotelList from "@/components/hotel/hotel-list";
export default {
  data() {
    return {
      pageIndex:1,
      form:{
        _start:'',
      },
      total:20,
      houstList: []
    };
  },
  watch:{
    $route(){
      this.init()
    }
  },
  methods:{
      handleCurrentChange(val) {
        this.form._start = (this.pageIndex-1)*5
        this.init()
      },
      init(){
        this.$axios({
      url: "http://157.122.54.189:9095/hotels",
      params: {...this.$route.query,_start:this.form._start}
    }).then(res => {
      this.total = res.data.total
      this.houstList = res.data.data;
      console.log(this.houstList);
    });
      }
  },
  mounted() {
    this.$router.push("/hotel/?city=74");
     this.init()
    
  },
  components: {
    Screen,
    HotelList
  }
};
</script>
<style lang="less" scoped>

.correlation {
  .pagechange{
    margin-left: 592px;
    margin-bottom:30px;
    margin-top: 20px;
  }
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  h4 {
    font-weight: 400;
    color: #606266;
    cursor: text;
  }
  .screen {
    margin-top: 20px;
  }
}
</style>
