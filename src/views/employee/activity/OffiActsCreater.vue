<template>
  <div id="app">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>
<script>
import Editor from "@ckeditor/ckeditor5-custom-build/build/ckeditor";
export default {};
</script>
<style></style>
