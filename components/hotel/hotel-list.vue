<template>
  <div class="hotel-item">
    <el-row type="flex">
      <el-col class="item" :span="8">
        <div @click="h4click(data.id)">
          <img style="width:100%;height:210px" :src="data.photos" alt />
        </div>
          
      </el-col>
      <el-col class="item" :span="10">
        <h4 @click="h4click(data.id)">
          {{data.name}}
        </h4>
        <div class="hotel-en-name">
          <span>{{data.alias}}</span>
         
            <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          <i class="iconfont iconhuangguan"></i>
          
          {{data.hoteltype.name}}
        </div>
        <el-row type="flex" class="good">
          <el-col :span="10">
            <el-rate
              :value="`${data.stars}`-0"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </el-col>
          <el-col :span="7">
            <span>36</span>条评论
          </el-col>
          <el-col :span="7">
            <span>13</span> 篇游记
          </el-col>
        </el-row>
        <div class="location-row">
          <i class="iconfont iconlocation"></i>
          位于: {{data.address}}
        </div>
      </el-col>
      <el-col class="item" :span="6">
        <table>
          <tbody>
            <tr v-for="(item,index) in data.products" :key="index">
              <td>
                <div>{{item.name}}</div>
              </td>
              <td class="right">
                <div>
                  <span>￥{{item.price}}</span>
                  起
                  <i class="el-icon-arrow-right"></i>
                </div>
              </td>
            </tr>
            
          </tbody>
        </table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
      }
    }
  },
  data() {
    return {};
  },
  methods:{
    h4click(id){
    this.$router.push(`/hotel/hotel-particulars?id=${id}`)
  },
  },
  mounted() {
    console.log(this.data);
  }
};
</script>
<style lang='less' scoped>
.hotel-item {
  padding: 25px 0;
  border-bottom: 1px solid #ddd;
  .item {
    padding: 0 10px;
  }
  .item:nth-child(3) {
    padding-top: 20px;
  }
  h4 {
    font-weight: 400;
    font-size: x-large;
  }
  .hotel-en-name {
    i {
      color: orange;
    }
  }
  .good {
    margin: 10px 0;
    span {
      color: orange;
    }
  }
}
table {
  border-collapse: collapse;
  width: 234px;
  tr {
    width: 233px;
    height: 47px;
    font-size: 14px;
    color: #606266;
    &:hover {
      background-color: #f5f7fa;
      cursor: pointer;
    }
    td {
      border-bottom: 1px solid #ebeef5;
      div {
        padding: 0 10px;
      }
    }
    td.right {
      span {
        color: #f90;
      }
    }
  }
}
</style>