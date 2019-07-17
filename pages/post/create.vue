<template>
  <div class="container">
    <el-row>
      <el-col :span="18" class="left">
        <h2>发表新攻略</h2>
        <p class="title-p">分享你的个人游记，让更多人看到哦！</p>
        <el-input class="title-input" widht="100%" placeholder="请输入标题"></el-input>
        <!-- <quillEditor style="height:300px;border-bottom:1px solid #ccc"></quillEditor>
        -->
        <div
          class="quill-editor"
          :content="content"
          @change="onEditorChange($event)"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
          v-quill:myQuillEditor="editorOption"
        ></div>
        <el-row type="flex">
          <el-col :span="3" class="xz">
            <label for>选择城市</label>
          </el-col>
          <el-col :span="6">
            <el-input placeholder="请搜索游玩城市"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="submit">
          <el-button type="primary">发布</el-button>或者
          <a href="javascript:;" class="draft">保存到草稿</a>
        </el-row>
      </el-col>
      <el-col :span="6" class="right"></el-col>
    </el-row>
  </div>
</template>
<script>
// import { quillEditor } from 'vue-quill-editor'
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  data() {
    return {
      content: "dasd",
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"]
          ]
        }
      }
    };
  },
  components: {
    // quillEditor
  },
  methods: {
    onEditorBlur(editor) {
      console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      console.log("editor change!", editor, html, text);
      this.content = html;
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
      .el-button{
        margin-right: 5px;
        font-size: 12px;
        width: 60px;
        height: 35px;
      }
      .draft {
        margin-left: 5px;
        color: orange;
        font-size: 14px;
        &:hover{
           text-decoration: underline;
        }
      }
    }
  }
}
</style>