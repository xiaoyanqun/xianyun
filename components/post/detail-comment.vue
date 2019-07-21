<template>
  <div>
    <h2>评论</h2>
    <div class="iscon" v-if="name != ''">
      <el-tag closable type="info" >回复 @{{name}}</el-tag>
    </div>
    <div class="con">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addform.content"></el-input>
    </div>
    <el-row type="flex" justify="space-between">
     <el-col :span="21">
        <el-upload
      action="http://127.0.0.1:1337/upload"
      name="files"
      list-type="picture-card"
      :on-success="success"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
     </el-col >
     <el-col :span="3">
        <el-button @click="add" type="primary">提交</el-button>
     </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <!-- 评论组件 -->
    <div class="item">
      <CommenList @reply="reply" v-for="(item,index) in list" :key="index" :data="item" />
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import CommenList from "@/components/post/commen-list.vue";
export default {
  data() {
    return {
      name:'',
      isdisable:false,
      dialogImageUrl: "",
      dialogVisible: false,
      start: 0, //开始数据
      limit: 2, //获取条数
      list: [],
      pageIndex: 1, //获取条数
      total: 2,
      addform:{
        content:'',
        follow:'',
        pics:[],
        post:''
      }
    };
  },
  components: {
    CommenList
  },
  methods: {
    // 发表评论
    add(){  
      console.log(this.addform)
      this.addform.post = this.$route.query.id
      const token = this.$store.state.user.userInfo.token;
      this.$axios({
        url:"/comments",
        method:'post',
        data:this.addform,
         headers: {
            Authorization: "Bearer " + token
          }
      }).then(res=>{
        console.log(res.data)
        this.init()
      })
      
    },
    reply(obj){
      console.log(obj)
      this.name = obj.name
      this.addform.follow = obj.follow
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.limit = val;
      this.init();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.start = (val - 1) * this.limit;
      this.init();
    },
    // 删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
     const id = file.response[0].id
    const arr = this.addform.pics.filter(v=>{
        return v.id !== id
        console.log(v.id !== id)
     })
      console.log(arr)
      this.addform.pics = arr
    },
    // 上传图片
    success(response, file, fileList) {
      this.addform.pics.push(response[0])
    },
    init() {
      const id = this.$route.query.id;
      this.$axios({
        url: "/posts/comments",
        params: { post: id, _start: this.start, _limit: this.limit }
      }).then(res => {
        // console.log(res.data.total)
        this.total = res.data.total;
        this.list = res.data.data;
      });
    }
  },
  mounted() {
    this.init();
   
    this.comment =  JSON.parse(window.localStorage.getItem('comment'))
  }
};
</script>
<style lang='less' scoped>
h2 {
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 20px;
}
.iscon{
  margin-bottom:20px;
}
.con {
  margin-bottom: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.item {
  margin-bottom: 20px;
  margin-top: 20px;
}
.pagination {
  margin-bottom: 20px;
}
</style>