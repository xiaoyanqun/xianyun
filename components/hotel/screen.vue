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
                  <nuxt-link to="#" class="all">全部</nuxt-link>
                  <nuxt-link to="#" v-for="(item,index) in data.scenics" :key="index">{{item.name}}</nuxt-link>
                </div>
                <div class="pull-down" @click="iconshow = !iconshow">
                  <nuxt-link to="#">
                    <i
                      class="el-icon-d-arrow-right"
                      :class="[{shangla:!iconshow},{xiala:iconshow}]"
                    ></i>
                    等{{data.scenics.length}}个区域
                  </nuxt-link>
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
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
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
      console.log(this.form);
    },
    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCode = item.sort;
      this.form.destination = item.value;
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
        console.log(res);
        const val = res.data.data.map(v => {
          v.value = v.name;
          return v;
        });
        cb(val);
        this.form.destination = val[0].value;
        this.form.departCode = val[0].sort;
      });
    }
  },
  mounted() {
    this.$router.push("/hotel/?city=74");
    this.$axios({
      url: "http://157.122.54.189:9095/hotels",
      params: { city: this.$route.query.city }
    }).then(res => {
      console.log(res);
      this.houstList = res.data.data;
    });
    const _this = this;
    window.onLoad = function() {
      // 等待页面加载完成之后才执行
      // container是页面的div容器
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [118.78 , 32.07], //中心点坐标
        viewMode: "3D" //使用3D视图
      });

      // 创建一个 Marker 实例：
      console.log(_this.houstList);
      const arr = [];
      _this.houstList.forEach((item, index) => {
        arr.push(new AMap.Marker({
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
        }))
      })

      // 将创建的点标记添加到已有的地图实例：
      map.add(arr);
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

    this.$axios({
      url: "http://157.122.54.189:9095/cities",
      params: { name: this.form.destination }
    }).then(res => {
      this.data = res.data.data[0];
      console.log(this.data);
    });
  }
};
</script>
<style lang="less" scoped>
.location {
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
    a.all {
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
