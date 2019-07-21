<template>
  <div class="correlation">
    <h4>酒店 > 南京市酒店预订</h4>
    <!-- 筛选 -->
    <div class="screen">
      <Screen/>
     
    </div>
    <div class="hotellist">
      <HotelList/>
    </div>
  </div>
</template>
<script>
import Screen from '@/components/hotel/screen';
import HotelList from '@/components/hotel/hotel-list';
export default {
  data(){
    return {

    }
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
