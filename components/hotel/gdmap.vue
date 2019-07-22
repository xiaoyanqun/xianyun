<template>
  <div>
    <!-- 高德地图 -->
    <el-row type="flex" class="map">
      <el-col :span="16">
        <div id="container" style="width:640px; height: 360px;"></div>
      </el-col>
      <el-col :span="8">
        <el-tabs v-model="mapName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <div>
              <ul style="overflow:auto; max-height:300px;">
                <li v-for="(item,index) in gdmap" :key="index" class="map_1">
                  <span>{{item.name}}</span>
                  <!-- <i>{{item.distance}}</i> -->
                </li>
              </ul>
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <div>
              <ul style="overflow:auto; max-height:300px;">
                <li v-for="(item,index) in gdmap" :key="index" class="map_1">
                  <span>{{item.name}}</span>
                  <!-- <i>{{item.distance}}</i> -->
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <!-- 酒店详情 -->
    <div class="information">
      <el-row class="information1">
        <el-col :span="4">
          <div class="xinXi">基本信息</div>
        </el-col>
        <el-col :span="20">
          <el-row class="hotel_time">
            <el-col :span="6">入住时间:14:00之后</el-col>
            <el-col :span="6">离店时间:12:00之前</el-col>
            <el-col :span="6">2010年开业/2015年装修</el-col>
            <el-col :span="6">酒店规模:148间客房</el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="information1">
        <el-col :span="4">
          <div class="xinXi">主要信息</div>
        </el-col>
        <el-col :span="20" class="hotel_time">
          <span class="hotel-item">外币兑换服务</span>
          <span class="hotel-item">电梯</span>
          <span class="hotel-item">洗衣服务</span>
          <span class="hotel-item">热水壶</span>
        </el-col>
      </el-row>
      <el-row class="information1">
        <el-col :span="4">
          <div class="xinXi">停车服务</div>
        </el-col>
        <el-col :span="20" class="hotel_time">-</el-col>
      </el-row>
      <el-row class="information1">
        <el-col :span="4">
          <div class="xinXi">品牌信息</div>
        </el-col>
        <el-col :span="20" class="hotel_time">-</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    data:{
      type:Object,
      default:{}
    },
  },
  data() {
    return {
      location:0,
      mapName: "first",
      gdmap: []
    };
  },
  mounted() {
    
    window.onLoad = () =>{
     this.init('风景名胜')
    
    };
    var key = "3dfe099c810173f6b5207b7d09ffd889";
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab.label)
        if(tab.label == '交通'){
          this.init('交通')
        }
        if(tab.label == '风景'){
          this.init('风景名胜')
        }
      },
      init(name){
         console.log(this.data)
      this.$axios({
        url:"https://restapi.amap.com/v3/place/text",
        params:{
          city:'南京',
          location:this.data.location.longitude+','+this.data.location.latitude,
          types:name,
          output:'json',
          page:1,
          offset:10,
          key: '79041dfa1c752f49599e2b507c64da42'
        }
      }).then(res=>{
        this.gdmap = res.data.pois
        var map = new AMap.Map("container", {
        zoom: 11, //级别
        // center: [118.78, 32.07], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      const arr = []
      console.log(res.data.pois)
      res.data.pois.forEach((item, index) => {
        console.log(item)
        const a = item.location.split(',')
        arr.push(
          new AMap.Marker({
            content: `<div style="display: inline-block;
                width: 22px;
                height: 36px;
                background-image: url(https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png);
                background-size: 22px 36px;
                text-align: center;
                line-height: 24px;
                color: #fff;">${index + 1}</div>`,
            position: new AMap.LngLat(
              a[0],a[1]
            ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: `${item.name}`
          })
        );
      });

      // 将创建的点标记添加到已有的地图实例：
      map.add(arr);
      map.setFitView();
      })
      
      }
  },
    // {https://restapi.amap.com/v3/place/text}
    //  window.setTimeout(v => {
    //   console.log(this.data)
    //   this.data.location.longitude
    //   location.latitude
    //   this.$axios({

    //   })
      
    // }, 3000);
};
</script>
<style lang="less" scoped>
.map {
  margin: 40px 0;
  .map_1 {
    margin-bottom: 15px;
    // overflow-y:visible;
    display: flex;
    overflow: hidden;
    color: #666666;
    span {
      flex: 1;
    }
    i {
      margin-right: 15px;
    }
  }
}
.information {
  margin: 40px 0;
  .information1 {
    border-bottom: 1px solid #eee;
    .xinXi {
      padding: 20px 10px;
      font-size: 14px;
      color: #666;
    }
    .hotel_time {
      padding: 20px 10px;
      font-size: 14px;
      color: #666;
      .hotel-item {
        border: 1px solid #eee;
        padding: 4px 10px;
        margin-right: 10px;
        border-radius: 4px;
        background-color: #eee;
        color: #666;
      }
    }
  }
}
</style>
