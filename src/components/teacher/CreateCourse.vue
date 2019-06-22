<template>
  <div class="creat-div" style="overflow-y: hidden">
    <el-row>
      <el-col :span="40"><p class="name-p">课程名称：</p></el-col>
      <el-col :span="60"><el-input placeholder="课程名称" style="margin-left:20px; width: 370px" suffix-icon="el-icon-edit" v-model="course_name" class="name-input"> </el-input></el-col>
    </el-row>
    <el-row>
      <el-col :span="40"><p>课程对象：</p></el-col>
      <el-col :span="60">
        <el-select v-model="grade_value" placeholder="请选择对象" style="margin-left:20px; width: 370px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="40"><p>课程备注：</p></el-col>
      <el-col :span="60"><el-input type="textarea" placeholder="备注" v-model="course_note" class="note"></el-input></el-col>
    </el-row>
    <el-row>
      <el-col :span="40">
        <p>课件上传：</p>
      </el-col>
      <el-col :span="40">
        <Upload class="file-upload" :upload_url="upload_url"></Upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="40">
        <el-button type="primary" class="create-btn" @click="createCourse">创建课程</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Upload from "@/components/Upload"
  export default {
    name: 'CreateCourse',
    components: {Upload},
    inject:['reload'],
    data(){
      return{
        course_name:"",
        options:[
          {
            value:"本科一年级",
            label:"本科一年级"
          },
          {
            value:"本科二年级",
            label:"本科二年级"
          },
          {
            value:"本科三年级",
            label:"本科三年级"
          },
          {
            value:"本科四年级",
            label:"本科四年级"
          },
          {
            value:"研究生一年级",
            label:"研究生一年级"
          },
          {
            value:"研究生二年级",
            label:"研究生二年级"
          }
        ],
        grade_value:"",
        course_note:"",
        upload_url:"/api/create/uploadcourseware"
      }
    },
    methods:{
      createCourse(){
        /*for (let file in this.fileList){
          console.log(file.name)
        }*/
        if(this.course_name=="") {
          this.$message.error('课程名称不能为空');
        }else if(this.grade_value==""){
          this.$message.error( '请选择课程对象');
        }else{
          this.$confirm('是否确认创建该课程（文件是否已提交）?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            let url="/api/create/createcourse"
            this.$axios.get(url,{
              params:{
                "courseName":this.course_name,
                "grade":this.grade_value,
                "message":this.course_note
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(res=>{
              console.log(res.data);
              if(res.data==true) {
                this.$message({
                  type: 'success',
                  message: '创建成功，等待管理员审批!'
                });
                this.reload();
              }else{
                this.$message.error("课程创建出错");
              }
            }).catch(error=>{
              console.log(error)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });

        }
      }
    }
  }
</script>

<style scoped>
  .el-row{
    margin: 20px auto 40px 0;
  }
  .note{
    margin-left: 20px;
    width: 370px;
    height: 60px;
  }
  .create-btn{
    width: 470px;
  }
  .file-upload{
    margin: 12px auto 0 20px;
    width: 260px;
    min-height: 50px;
  }
  .creat-div{
    margin-top: 60px;
  }
</style>
