<template>
  <div class="screen">
    <el-form ref="form" :model="form">
      <el-row type="flex">
        <el-form-item>
          <el-autocomplete
            v-model="form.destination"
            :fetch-suggestions="queryDepartSearch"
            placeholder="目的地"
            @select="handleDepartSelect"
            class="el-autocomplete"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-popover ref="popover4" class="popover" trigger="click">
            <div class="numberList">
              <el-row
                type="flex"
                class="numberList1"
                style="padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
        margin-bottom:30px;"
              >
                <span style="display: block;
        margin-right: 70px;">每间</span>
                <el-select
                  class="adult_child"
                  v-model="adult"
                  placeholder="请选择"
                  style="margin-left: 5px;
        width: 93px ;
        height: 28px;"
                >
                  <el-option
                    v-for="item in adultlist"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select
                  class="adult_child"
                  v-model="child"
                  placeholder="请选择"
                  style="margin-left: 5px;
        width: 93px ;
        height: 28px;"
                >
                  <el-option
                    v-for="item in childList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-row>
              <el-button
                style="  position: absolute;
        right: 10px;
        bottom: 8px;
        width: 30px;
        height: 12px;
        font-size: 12px;
              text-align: center"
                @click="affirm"
                class="btn1"
                type="primary"
              >确认</el-button>
            </div>
          </el-popover>
          <el-input
            v-popover:popover4
            class="number"
            placeholder="请输入内容"
            suffix-icon="el-input__icon iconfont iconuser"
            :value="form.number"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style type="primary" class="btn" @click="examine">查看价格</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <div class="location">
      <el-row type="flex">
        <el-col :span="14" class="locationleft">
          <div class="item">
            <el-row>
              <el-col :span="3">区域：</el-col>
              <el-col :span="21" class="site">
                <div :class="[{itemlist:iconshow},{itemlistxiala:!iconshow}]">
                  <a link="javascript:;" @click="all" :class="{active:activeshow}">全部</a>
                  <a link="javascript:;" @click="active(item.id)" :class="{active:activeindex == item.id}" v-for="(item,index) in data.scenics" :key="index">{{item.name}}</a>
                </div>
                <div class="pull-down" @click="iconshow = !iconshow">
                  <a link="javascript:;">
                    <i
                      class="el-icon-d-arrow-right"
                      :class="[{shangla:!iconshow},{xiala:iconshow}]"
                    ></i>
                    等{{data.scenics.length}}个区域
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="item">
            <el-row>
              <el-col :span="3">攻略：</el-col>
              <el-col
                class="post"
                :span="21"
              >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</el-col>
            </el-row>
          </div>
          <div class="item">
            <el-row type="flex">
              <el-col :span="3">均价：</el-col>
              <el-col :span="21">
                <el-row type="flex" class="star">
                  <el-col :span="6">
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    ￥332
                  </el-col>

                  <el-col :span="6">
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    ￥521
                  </el-col>
                  <el-col :span="6">
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    <i class="iconfont iconhuangguan"></i>
                    ￥768
                  </el-col>
                </el-row>
              </el-col>
              <span></span>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10" class="map">
          <div id="container" style="width:420px; height: 260px;"></div>
        </el-col>
      </el-row>
    </div>
    <div class="houstoscreen">
      <el-row type="flex">
        <el-col :span="8" class="item">
          <el-row type="flex" justify="space-between">
            <span class="demonstration">价格</span>
          <span class="demonstration">0-4000</span>
          </el-row>
          <el-slider @change="huakuai" v-model="val" :max="4000"></el-slider>
        </el-col>
        <el-col :span="6" class="item">
          <span>住宿等级</span>
          <el-dropdown style="width:146px;" @command="commandGrade">
            <span class="el-dropdown-link">
              {{grade}}
              <i class="el-icon-arrow-down el-icon--right" style="float:right;"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="item" style="width:130px;" v-for="(item,index) in classify.levels" :key="index">
                <i class="iconfont iconcircle"></i>
                <span>{{item.name}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="6" class="item" >
         <span>住宿类型</span>
          <el-dropdown style="width:146px;"  @command="commandType">
            <span class="el-dropdown-link">
              {{types}}
              <i class="el-icon-arrow-down el-icon--right" style="float:right;"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item :command="item"  style="width:130px;" v-for="(item,index) in classify.types" :key="index">
                <i class="iconfont iconcircle"></i>
                <span>{{item.name}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="6" class="item" >
           <span>酒店设施</span>
          <el-dropdown style="width:146px;" @command="commandfacilities">
            <span class="el-dropdown-link">
              {{facilities}}
              <i class="el-icon-arrow-down el-icon--right" style="float:right;"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item :command="item" style="width:130px;" v-for="(item,index) in classify.assets" :key="index">
                <i class="iconfont iconcircle"></i>
                <span>{{item.name}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
        <el-col :span="6" class="item">
          <span>酒店品牌</span>
          <el-dropdown style="width:146px " @command="commandbrand" >
            <span class="el-dropdown-link">
              {{brand}}
              <i class="el-icon-arrow-down el-icon--right" style="float:right;"></i>
            </span>
            <el-dropdown-menu slot="dropdown" style="height: 150px;
    overflow: scroll;">
              <el-dropdown-item :command="item" style="width:130px;"  v-for="(item,index) in classify.brands" :key="index">
                <i class="iconfont iconcircle"></i>
                <span>{{item.name}}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      // 品牌
      brand:'不限',
      // 酒店设施
      facilities:'不限',
      // 住宿类型
      types:'不限',
      // 等级数据
      grade:'不限',
      activeshow:true,  //全部按键显示
      activeindex:0,   //a标签点击
      classify:{},   
      val:4000,   
      houstList: [],
      // 下拉图标
      iconshow: true,
      data: {
        scenics: []
      },
      form: {
        departCode: "",
        date: "",
        destination: "南京市",
        number: ""
      },
      adult: "2 成人",
      child: "0 儿童",
      adultlist: [
        {
          value: "1 成人",
          label: "1"
        },
        {
          value: "2 成人",
          label: "2"
        },
        {
          value: "3 成人",
          label: "3"
        },
        {
          value: "4 成人",
          label: "4"
        },
        {
          value: "5 成人",
          label: "5"
        }
      ],
      childList: [
        {
          value: "0 儿童",
          label: "0"
        },
        {
          value: "1 儿童",
          label: "1"
        },
        {
          value: "2 儿童",
          label: "2"
        },
        {
          value: "3 儿童",
          label: "3"
        },
        {
          value: "4 儿童",
          label: "4"
        }
      ]
    };
  },
  methods: {
    // 酒店类型
    commandType(item){
      if(this.types == item.name){
        this.types = '不限'
      }else{
        this.types = item.name
      }
      console.log(this.$route.query.hoteltype)
       if( item.id === this.$route.query.hoteltype){
          const {hoteltype,...query} = this.$route.query
          this.$router.push({path:`/hotel`,query})
       }else{
         this.$router.push({path:`/hotel`,query:{...this.$route.query,hoteltype: item.id}})
       }
      
    },
    // 酒店设施
    commandfacilities(item){
      if(this.facilities == item.name){
        this.facilities = '不限'
      }else{
        this.facilities = item.name
      }
      if( item.id === this.$route.query.hotelasset){
          const {hotelasset,...query} = this.$route.query
          this.$router.push({path:`/hotel`,query})
       }else{
         this.$router.push({path:`/hotel`,query:{...this.$route.query,hotelasset: item.id}})
       }
    },
    // 酒店品牌
    commandbrand(item){
       if(this.brand == item.name){
        this.brand = '不限'
      }else{
        this.brand = item.name
      }
      if( item.id === this.$route.query.hotelbrand){
          const {hotelbrand,...query} = this.$route.query
          this.$router.push({path:`/hotel`,query})
       }else{
         this.$router.push({path:`/hotel`,query:{...this.$route.query,hotelbrand: item.id}})
       }
    },
    // 等级
    commandGrade(item){
      if(this.grade == item.name){
        this.grade = '不限'
      }else{
        this.grade = item.name
      }
      
      // const index = this.grade.indexOf(item)
      // console.log(index)
      // if(index > -1){
      //   this.grade.splice(index,1)
      // }
      // if(index == -1){
      //   this.grade.push(item)
      // }
      // const arr = this.grade.map(v=>{
      //   return 'hotellevel_in='+v
      // })
      if(item === this.$route.query.hotellevel_in){
          const {hotellevel_in,...query} = this.$route.query
          this.$router.push({path:`/hotel`,query})
       }else{
         this.$router.push({path:`/hotel`,query:{...this.$route.query,hotellevel_in:item}})
       }
    },
    // 滑块
    huakuai(val){
      console.log(val)
       this.$router.push({path:'/hotel',query:{...this.$route.query,price_lt:val}})
    },
    // 点击全部
    all(){
      this.activeshow = true,
      this.activeindex=0
      const {scenic,...query} =  this.$route.query
      this.$router.push({path:'/hotel',query})
    },
    // 点击区域
    active(id){
      this.activeshow = false
    this.activeindex = id
      this.$router.push({path:'/hotel',query:{...this.$route.query,scenic:id}})
    },
    // 选择人数
    affirm() {
      if (parseInt(this.child) === 0) {
        this.form.number = this.adult;
      } else {
        this.form.number = this.adult + " " + this.child;
      }
      this.$refs.popover4.doClose();
    },
    // 查看价格
    examine() {
      const enter = moment(this.form.date[0]).format("YYYY-MM-DD");
      const left = moment(this.form.date[1]).format("YYYY-MM-DD");
      this.form.date = [enter, left];
    },
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCode = item.sort;
      this.form.destination = item.value;
      this.init();
    },
    // value 是选中的值，cb是回调函数，接收要展示的列.
    queryDepartSearch(value, cb) {
      if (value === "") {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        const val = res.data.data.map(v => {
          v.value = v.name;
          return v;
        });
        cb(val);
        this.form.destination = val[0].value;
        this.form.departCode = val[0].sort;
      });
    },
    init() {
      this.$axios({
        url: "http://157.122.54.189:9095/cities",
        params: { name: this.form.destination }
      }).then(res => {
        this.data = res.data.data[0];
      });
    }
  },
  mounted() {
    // 酒店选项
    this.$axios({
      url:'/hotels/options'
    }).then(res=>{
      console.log(res.data.data)
      this.classify = res.data.data
    })
    // 酒店大概地址
    this.$axios({
      url: "http://157.122.54.189:9095/hotels",
      params: { city: this.$route.query.city }
    }).then(res => {
      this.houstList = res.data.data;
    });
    const _this = this;
    // 地图
    window.onLoad = function() {
      // 等待页面加载完成之后才执行
      // container是页面的div容器
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        // center: [118.78, 32.07], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      // 创建一个 Marker 实例：
      console.log(_this.houstList);
      const arr = [];
      _this.houstList.forEach((item, index) => {
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
              item.location.longitude,
              item.location.latitude
            ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: "北京"
          })
        );
      });

      // 将创建的点标记添加到已有的地图实例：
      map.add(arr);
      map.setFitView();
    };

    var key = "2c047e1737fe327f243ea9bd2d627c3c";
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;

    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);

    this.$axios({
      url: "/airs/city",
      params: { name: this.form.destination }
    }).then(res => {
      this.form.departCode = res.data.data[0].sort;
    });

    this.init();
  }
};
</script>
<style lang="less" scoped>
.location {
  margin-bottom: 20px;
  .locationleft {
    padding-right: 20px;
  }
  .item {
    margin-bottom: 20px;
    .post {
      color: #666;
      font-size: 14px;
    }
    .star {
      color: #666;
      font-size: 14px;
      i {
        color: orange;
      }
    }
  }
  .site {
    .itemlist {
      height: 45px;
      overflow: hidden;
    }
    .itemlistxiala {
      height: 100%;
    }
    .shangla {
      transform: rotate(270deg);
      color: #f90;
    }
    .xiala {
      transform: rotate(90deg);
      color: #f90;
    }
    .active {
      background: #eee;
      cursor: auto;
      text-decoration: none;
      color: #999;
      &:hover {
        text-decoration: none;
        background: #eee;
        cursor: auto;
        text-decoration: none;
        color: #999;
      }
    }
    a:hover {
      text-decoration: underline;
      color: #09f;
    }
  }
  a {
    margin-right: 14px;
    color: #666;
    font-size: 14px;
  }
}
.screen {
  /deep/.el-form-item__content {
    margin-right: 10px;
  }
  .number {
    width: 200px;
    /deep/.el-input__inner {
      width: 200px;
    }
  }
  .btn {
    width: 86px;
    height: 40px;
    font-size: 12px;
  }
}
.houstoscreen{
  border:1px solid #ddd;
  padding:5px 0;
  .item{
    padding:0 20px 0 20px;
    border-right: 1px solid #ddd;
    /deep/.el-dropdown{
      margin-top: 10px;
    }
    span{
          display: block;
          font-size: 14px;
          color:#666;
    }
    /deep/.el-dropdown-link{
      font-size: 12px;
    }
  }
  .item:nth-child(5) {
    border-right:none;
  }
}

/deep/.btn1 {
  position: absolute;
  right: 10px;
  bottom: 8px;
  width: 30px;
  height: 12px;
  font-size: 12px;
  /deep/span {
    display: block;
    margin: -4px -10px;
  }
}
</style>
