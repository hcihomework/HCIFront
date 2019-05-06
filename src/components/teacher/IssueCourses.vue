<template>
  <div class="issue-div">

    <el-row>
      <el-col :span="8">
        <p>选择课程：</p>
      </el-col>
      <el-col :span="16" :push="0">
        <el-select v-model="issue_course" placeholder="请选择课程" style="width: 295px">
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
      <el-col :span="6" :push="1">
        <p>上课时间：</p>
      </el-col>
      <el-col :span="9":push="2" style="width: 38px;margin-left: 8px">
        <el-date-picker
          style="width: 160px"
          v-model="year"
          value-format="yyyy"
          type="year"
          placeholder="选择年">
        </el-date-picker>
      </el-col>
      <el-col :span="9" :push="8">
        <el-select v-model="quarter_course" placeholder="选择季度" style="width: 110px">
          <el-option
            v-for="item in quarter_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <p>上课班次：</p>
      </el-col>
      <el-col :span="16" :push="0">
        <el-input v-model="class_course" suffix-icon="el-icon-edit-outline" placeholder="请选择班次" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" style="width: 295px"></el-input>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <p>限选人数：</p>
      </el-col>
      <el-col  :span="16"  :push="0">
        <el-input v-model="number_course" suffix-icon="el-icon-tickets" placeholder="请选择人数" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" style="width: 295px"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col  :push="1">
        <el-button type="primary" class="create-btn" @click="issueCourses" style="width: 440px">发布课程</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'IssueCourses',
    inject:['reload'],
    data() {
      return{
        options:[],
        issue_course:"",
        year:"",
        quarter_course:"",
        quarter_options:[
          {
            value:"spring",
            label:"SPRING"
          },
          {
            value:"summer",
            label:"SUMMER"
          },
          {
            value:"fall",
            label:"FALL"
          },
          {
            value:"winter",
            label:"WINTER"
          }
        ],
        number_course:"",
        class_course:"",
      }
    },
    created() {
      this.$axios.get("/api/search/coursesissue")
        .then(res=>{
          for(let i=0;i<res.data.length;i++){
            let course={
                  "value":res.data[i].id,
                   "label":res.data[i].name
                };
            this.options.push(course)
          }
      }).catch(error=>{
        console.log(error)
      })
    },
    methods: {
      issueCourses(){
        if(this.issue_course=="") {
          this.$message.error('课程名称不能为空');
        }else if(this.year==""||this.quarter_course==""){
          this.$message.error( '课程时间不能为空');
        }else {
          this.$confirm('是否确认发布该课程?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            let url = "/api/issue/issuecourses"
            this.$axios.get(url, {
              params: {
                "classId": this.issue_course,
                "time": this.year + this.quarter_course,
                "limitClass": this.class_course,
                "limitStudent": this.number_course
              },
              headers: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then(res => {
              if (res.data == true){
                this.$message({
                  type: 'success',
                  message: '发布成功，等待管理员审批!'
                });
                this.reload();
              }else{
                this.$message.error("课程发布出错");
              }
            }).catch(error => {
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
  .issue-div{
    margin: 50px;
    width: 450px;
    overflow-x: hidden;
  }
 .el-row{
   margin: 20px auto 40px -20px;
 }
  .create-btn{
    margin-left: 0px;
    width: 450px;
  }
</style>
