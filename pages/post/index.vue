<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="post-left">
        <!-- tab栏切换  -->
        <Tab @fatherMethod="fatherMethod"/>
        <div class="aside-recommend">
          <h2>推荐城市</h2>
          <nuxt-link to="/post#">
            <img src="../../images/pic_sea.jpeg" alt />
          </nuxt-link>
        </div>
      </div>
      <div class="post-right">
        <!-- 搜索 -->
        <el-row type="flex" class="search">
          <input
            @keyup.13="search"
            v-model="city"
            type="text"
            placeholder="请输入你想去的地方，比如：'广州'"
          />
          <i class="el-icon-search" @click="search"></i>
        </el-row>
        <div class="search-recommend">
          推荐：
          <span @click="city='广州',init()">广州</span>
          <span @click="city='上海',init()">上海</span>
          <span @click="city='北京',init()">北京</span>
        </div>
        <!-- 推荐攻略 -->
        <el-row type="flex" justify="space-between" class="strategy">
          <h2 class="strategy-title">推荐攻略</h2>
          <el-button @click="$router.push('/post/create')" type="primary" icon="el-icon-edit" style="height:40px">写游记</el-button>
        </el-row>
        <List v-for="(item,index) in postsList" :key="index" :data="item" />
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[3,6, 9, 12]"
          :page-size="this.get._limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>
<script>
import Tab from "@/components/post/tab";
import List from "@/components/post/list";
export default {
  data() {
    return {
      pageIndex: 1,
      postsList: [],
      total: 3,
      city: "",
      get: {
        _start: 0,
        _limit: 3
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.get._limit = val;
      this.init();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.get._start = (val - 1) * this.get._limit;
      this.init();
    },
    search() {
      this.get._start = 0;
      this.init();
    },
    init() {
      if (this.city.trim()) {
        console.log(this.city.trim());
         this.$axios({
          url: "/posts",
          params: {city:this.city,...this.get}
        }).then(res => {
          console.log(res);
          this.postsList = res.data.data;
          this.total = res.data.total;
        });
      } else {
        this.$axios({
          url: "/posts",
          params: this.get
        }).then(res => {
          console.log(res);
          this.postsList = res.data.data;
          this.total = res.data.total;
        });
      }
    },
    fatherMethod(){
      this.city = this.$route.query.city
      this.init()
    }
  },
  mounted() {
    this.init();
  },
  components: {
    Tab,
    List
  }
};
</script>
<style lang="less" scoped>
.container {
  padding: 20px 0;
  margin: 0 auto;
  width: 1000px;
  .post-left {
    width: 260px;

    .aside-recommend {
      h2 {
        font-weight: 400;
        padding-bottom: 10px;
        font-size: 16px;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
      }
      img {
        width: 100%;
      }
    }
  }
  .post-right {
    width: 700px;
    .search {
      border: 2px solid orange;
      height: 40px;
      line-height: 40px;
      input {
        border: none;
        outline: none;
        padding: 0 20px;
        flex: 1;
      }
      i {
        font-weight: 700;
        font-size: 24px;
        color: orange;
        height: 24px;
        line-height: 24px;
        vertical-align: middle;
        margin: auto 10px;
      }
    }
    .search-recommend {
      font-size: 12px;
      color: #666;
      padding: 10px 0;
      span {
        margin-left: 8px;
        &:hover {
          text-decoration: underline;
          color: orange;
          cursor: pointer;
        }
      }
    }
    .strategy {
      margin-top: 10px;
      .strategy-title {
        display: inline-block;
        color: orange;
        font-size: 18px;
        font-weight: 400;
        padding-bottom: 20px;
        border-bottom: 2px solid orange;
      }
    }
  }
}
</style>
