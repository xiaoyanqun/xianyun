<template>
  <div class="correlation">
    <h4>酒店 > 南京市酒店预订</h4>
    <!-- 筛选 -->
    <div class="screen">
      <Screen/>
     
    </div>
    <!-- 酒店列表 -->
    <div class="hotellist">
      <HotelList v-for="(item,index) in houstList" :data="item" :key="index"/>
    </div>
  </div>
</template>
<script>
import Screen from '@/components/hotel/screen';
import HotelList from '@/components/hotel/hotel-list';
export default {
  data(){
    return {
        houstList:[]
    }
  },
  mounted(){
    this.$router.push("/hotel/?city=74");
    this.$axios({
      url: "http://157.122.54.189:9095/hotels",
      params: { city: this.$route.query.city }
    }).then(res => {
      this.houstList = res.data.data;
      console.log(this.houstList)
    });
  },
  components:{
    Screen,
    HotelList
  }
};
</script>
<style lang="less" scoped>
.correlation {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  h4 {
    font-weight: 400;
    color: #606266;
    cursor: text;
  }
  .screen{
    margin-top:20px;
  }
}
</style>
