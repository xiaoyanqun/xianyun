<template>
  <div class="container">
    <el-row>
      <el-col :span="18" class="left">
        <el-form ref="form" :model="addform">
          <h2>发表新攻略</h2>
          <p class="title-p">分享你的个人游记，让更多人看到哦！</p>
          <el-form-item>
            <el-input v-model="addform.title" class="title-input" widht="100%" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item>
            <div id="app">
              <VueEditor :config="config" ref="vueEditor" style="height:400px;margin-bottom:60px"/>
            </div>
          </el-form-item>
          <el-form-item label="选择城市" label-width="80px">
            <el-autocomplete
              v-model="cityName"
              :fetch-suggestions="queryDestSearch"
              placeholder="请搜索到达城市"
              @select="handleDestSelect"
              class="el-autocomplete"
            ></el-autocomplete>
          </el-form-item>
          <el-row type="flex" class="submit">
            <el-button type="primary" @click="add">发布</el-button>或者
            <a href="javascript:;" class="draft" @click="postsdraft">保存到草稿</a>
          </el-row>
        </el-form>
      </el-col>

      <el-col :span="4" class="right">
        <Draft ref="draft" @edit="edit" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import "quill/dist/quill.snow.css"
let VueEditor;

if (process.browser) {
    VueEditor = require('vue-word-editor').default
}

import moment from "moment";
import Draft from "@/components/post/draft.vue";
export default {
  name: 'app',
  data() {
    return {
      cityName: "",
      time: "",
      addform: {
        content: "",
        title: "",
        city: ""
      },
     config: {
      modules: { 
        // 工具栏
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          ['image', 'video'],

          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
        ]
      },
      // 主题
      theme: 'snow',
      uploadImage: {
        url: "http://localhost:1337/upload",
        name: "files",
        uploadBefore(file){
          return true
        },
        uploadProgress(res){

        },
        uploadSuccess(res, insert){
          insert("http://localhost:1337" + res.data[0].url)
        },
        uploadError(){},
        showProgress: true
      },

      uploadVideo: {
        //url: "http://157.122.54.189:9095/upload",
        url: "http://localhost:1337/upload",
        name: "files",
        uploadBefore(file){
          return true
        },
        uploadProgress(res){

        },
        uploadSuccess(res, insert){
          insert("http://localhost:1337" + res.data[0].url)
        },
        uploadError(){},
      }
    }
    };
  },
  components: {
    Draft,
    VueEditor
  },
  methods: {
    // 发布游记
    add() {
      this.addform.content = this.$refs.vueEditor.editor.root.innerHTML
     
      const rules = {
        title: {
          value: this.addform.title,
          message: "请填写标题"
        },
        content: {
          value: this.addform.content,
          message: "请填写内容"
        },
        cityName: {
          value: this.cityName,
          message: "请选择城市"
        },
        city: {
          value: this.addform.city,
          message: "请选择正确的城市"
        }
      };
      let flag = true;
      Object.keys(rules).forEach(v => {
        if (!flag) return;
        if (!rules[v].value) {
          flag = false;
          this.$message.warning(rules[v].message);
        }
      });
      if (flag) {
        const token = this.$store.state.user.userInfo.token;
        this.$axios({
          url: "/posts",
          method: "post",
          data: this.addform,
          headers: {
            Authorization: "Bearer " + token
          }
        }).then(res => {
          console.log(res);
          this.$message.success("新增成功");
          this.$refs.vueEditor.editor.root.innerHTML = ''
          this.addform = {
            content: "",
            title: "",
            city: ""
          }
        });
      }
    },
    onEditorChange(e) {
      console.log(e);
    },
    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (value === "") {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        const arr = res.data.data.map(v => {
          v.value = v.name;
          return v;
        });
        cb(arr);
      });
    },
    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.addform.city = item.id;
    },
    // 保存到草稿
    postsdraft() {
      this.addform.content = this.$refs.vueEditor.editor.root.innerHTML
      this.time = moment(new Date()).format("YYYY-MM-DD");
      const arr = JSON.parse(window.localStorage.getItem("posts")) || [];
      if (arr.length >= 5) {
        console.log(1)
        arr.length = 4;
      }
      arr.unshift({
        time: this.time,
        cityName: this.cityName,
        ...this.addform
      });
      window.localStorage.setItem("posts", JSON.stringify(arr));
      const arr2 = JSON.parse(window.localStorage.getItem("posts"));
      console.log(arr2)
      this.$refs.draft.show(arr2);
    },
    //编辑草稿
    edit(arr) {
      
      this.cityName = arr.cityName;
      this.addform.content = arr.content;
      this.$refs.vueEditor.editor.root.innerHTML = this.addform.content
      this.addform.title = arr.title;
      this.time = arr.time;
      this.addform.city = arr.city;
    }
  }
};
</script>
<style lang='less' scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .left {
    .quill-editor {
      // min-height: 200px;
      // max-height: 400px;
      height: 399px;
      overflow-y: auto;
      margin-bottom: 22px;
    }
    h2 {
      font-weight: 400;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .title-p {
      font-size: 12px;
      margin-bottom: 10px;
      color: #999;
    }
    .title-input {
      margin-bottom: 22px;
    }
    .xz {
      height: 40px;
      line-height: 40px;
    }

    .submit {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      .el-button {
        margin-right: 5px;
        font-size: 12px;
        width: 60px;
        height: 35px;
      }
      .draft {
        margin-left: 5px;
        color: orange;
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .right {
    margin-left: 60px;
  }
}
</style>