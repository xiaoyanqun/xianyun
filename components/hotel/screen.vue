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
          <el-popover  ref="popover4" class="popover" trigger="click">
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
            :value ="form.number"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style type="primary" class="btn" @click="examine" >查看价格</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      form: {
        departCode:'',
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
      if(parseInt(this.child) === 0){
        this.form.number = this.adult
      }else{
        this.form.number = this.adult +" " + this.child
      }
      this.$refs.popover4.doClose()
    },
    // 查看价格
    examine(){

       const enter = moment(this.form.date[0]).format("YYYY-MM-DD")
       const left =  moment(this.form.date[1]).format("YYYY-MM-DD")
       this.form.date =  [enter,left]
      console.log(this.form)
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
            v.value = v.name
            return v;
          });
          cb(val);
        this.form.destination = val[0].value;
        this.form.departCode = val[0].sort;
        });
    },
  },
  mounted() {
    this.$axios({
      url: "/airs/city",
      params: { name: this.form.destination }
    }).then(res=>{
      this.form.departCode = res.data.data[0].sort;
    })
  }
};
</script>
<style lang="less" scoped>
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
