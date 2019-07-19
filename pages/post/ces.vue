<template>
  <div id="app">
   <VueEditor :config="config" ref="vueEditor"/>
  </div>
</template>
<script>

// 需要单独引入样式
import "quill/dist/quill.snow.css"
let VueEditor;

if (process.browser) {
    VueEditor = require('vue-word-editor').default
}
export default {
name: 'app',
data(){
  return {
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
  }
},

components: {
  VueEditor
},
}
</script>
<style lang='less' scoped>
</style>