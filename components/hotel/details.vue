<template>
  <div class="content">
    <!-- 面包屑 -->
    <div class="aa">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }">南京酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{data.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 酒店名称 -->
    <div class="hotel_name">
      <div class="name">
        <h2>
          {{data.name}}
          <span>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
            <i class="iconfont iconhuangguan"></i>
          </span>
        </h2>
      </div>
      <div class="name2">
        <p>{{data.alias}}</p>
      </div>
      <div class="name3">
        <i class="iconfont iconlocation">{{data.address}}</i>
      </div>
    </div>
    <!-- 酒店图片 -->
    <el-row type="flex" class="image">
      <el-col class="image1" :span="16">
        <img :src="bigImg" alt />
      </el-col>
      <el-col class="image2" :span="8">
        <el-row>
          <el-col
            class="img1"
            gutter="20"
            :span="12"
            v-for="(item,index) in imgData"
            style="cursor:pointer"
            :key="index"
            @click.native="changeBigImg(item.src)"
          >
            <!-- <nuxt-link to="/"> -->
            <img :src="item.src" />
            <!-- </nuxt-link> -->
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 酒店价格 -->
    <el-table :data="hotelData" style="width: 100%">
      <el-table-column prop="name" label="价格来源" width="420"></el-table-column>
      <el-table-column prop="bestType" label="低价房型" width="420"></el-table-column>
      <el-table-column prop="prices" label="最低价格/每晚"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
        products: []
      }
    }
  },
  data() {
    return {
      bigImg: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg",
      imgData: [
        {
          src: "http://157.122.54.189:9093/images/hotel-pics/1.jpeg"
        },
        {
          src: "http://157.122.54.189:9093/images/hotel-pics/2.jpeg"
        },
        {
          src: "http://157.122.54.189:9093/images/hotel-pics/3.jpeg"
        },
        {
          src: "http://157.122.54.189:9093/images/hotel-pics/4.jpeg"
        },
        {
          src: "http://157.122.54.189:9093/images/hotel-pics/5.jpeg"
        },
        {
          src: "http://157.122.54.189:9093/images/hotel-pics/6.jpeg"
        }
      ],
      hotelData: [
        {
          date: "携程",
          name: "高级大床房A",
          address: "￥242起>"
        },
        {
          date: "携程",
          name: "高级大床房A",
          address: "￥242起>"
        },
        {
          date: "携程",
          name: "高级大床房A",
          address: "￥242起>"
        }
      ]
    };
  },
  methods: {
    changeBigImg(abc) {
      this.bigImg = abc;
    }
  },
  mounted() {
    window.setTimeout(v => {
      this.hotelData = this.data.products;
      console.log(this.hotelData)
      const arr = this.hotelData.map(v=>{
        v.prices = v.price +"起 >"
        return v
      })
      this.hotelData = arr
    }, 3000);
  }
};
</script>
<style lang="less" scoped>
.content {
  .aa {
    padding: 20px 0;
  }
  // 酒店名称
  .hotel_name {
    .name {
      h2 {
        font-weight: normal;
        color: #333;
        span {
          margin-left: 8px;
          .iconfont {
            font-size: 16px;
            color: #ff9900;
            margin-left: -8px;
          }
        }
      }
    }
    .name2 {
      p {
        font-size: 14px;
        color: #666697;
      }
    }
    .name3 {
      i {
        font-size: 14px;
        color: #666666;
      }
    }
  }
  // 酒店图片
  .image {
    margin: 40px 0;
    .image1 {
      img {
        width: 640px;
        height: 360px;
      }
    }
    .image2 {
      // margin-left: 10px;
      .img1 {
        margin-bottom: 10px;
        // margin-left: -30px;
        img {
          // margin-left:10px;
          width: 160px;
          height: 110px;
        }
      }
    }
  }
}
</style>


