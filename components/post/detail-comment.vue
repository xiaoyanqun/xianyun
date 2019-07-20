<template>
  <div>
    <h2>评论</h2>
    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
    <el-upload
  action="http://127.0.0.1:1337/upload"
  name="files"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible" size="tiny" >
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
<div class="list">
  <div class="info">
    <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
    地球发动机 
    <i>2019-07-20 10:34</i>
    <span>1</span>
  </div>
  <div class="content">
    
  </div>
</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea: "",
       dialogImageUrl: '',
        dialogVisible: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  }
};
</script>
<style lang='less' scoped>
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
.list{
   border-bottom: 1px dashed #ddd;
    padding: 20px 20px 5px;
    .content{
      padding: 0 0 0 30px;
    }
}
</style>