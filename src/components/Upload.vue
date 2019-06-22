<template>
  <el-upload
    class="upload"
    drag
    ref="upload"
    action="upload_url"
    file-list="fileList"
    auto-upload="false"
    accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.zip,.doc"
    multiple>
    <i class="el-icon-upload"></i>
    <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>

</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        fileList: []
      };
    },
    props:{
        upload_url:String,
        required:true
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
    }

  }
</script>
<style scoped>

</style>
