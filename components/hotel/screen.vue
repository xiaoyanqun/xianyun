<template>
  <div class="screen">
    <el-form ref="form" :model="form">
      <el-row type="flex">
        <el-form-item>
          <el-input v-model="form.destination" placeholder="目的地"></el-input>
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
          <el-input 
            @click.native="addnumber"
            class="number"
            placeholder="请输入内容"
            suffix-icon="el-input__icon iconfont iconuser"
            value=""
          ></el-input>
          <div class="numberList" v-show="isShow">
            <el-row type="flex" class="numberList1">
              <span>每间</span>
              <el-select class="adult_child" v-model="adult" placeholder="请选择">
                <el-option
                  v-for="item in adultlist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select class="adult_child" v-model="child" placeholder="请选择">
                <el-option
                  v-for="item in childList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-row>
            <el-button @click="isShow=false" class="btn1" type="primary" >确认</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="btn">查看价格</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow:false,
      form: {
        date: "",
        destination: "",
        number: ""
      },
      adult:'',
      child:"",
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
    addnumber(){
      this.isShow = true
    }
  },
  mounted() {
  }
};
</script>
<style lang="less" scoped>
.screen {
  /deep/.el-form-item__content {
    margin-right: 10px;
  }
  .number{
    width: 200px;
    /deep/.el-input__inner{
 width: 200px;
    }
   
  }
  .numberList {
    position: absolute;
    z-index: 999;
    margin-top: 10px;
    .numberList1{
      padding-bottom: 20px;
      border-bottom: 1px solid #ddd;
    }
    .btn1{
      position:absolute;
      right: 10px;
      bottom: 8px;
      width: 30px;
      height: 12px;
      font-size: 12px;
      /deep/span{
        display:block;
        margin: -4px -10px;
      }
    }
    span{
      display: block;
      margin-right: 70px;
    }
        background: #fff;
    min-width: 150px;
    border: 1px solid #ebeef5;
    padding: 12px;
    color: #606266;
    // text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    width: 300px;
    height: 97px;
    padding: 12px;
    .adult_child {
      margin-left: 5px;
      width: 93px;
      height: 28px;
      /deep/.el-input__inner {
        height: 28px;
      }
    }
  }

  .btn {
    width: 86px;
    height: 40px;
    font-size: 12px;
  }
}
</style>
