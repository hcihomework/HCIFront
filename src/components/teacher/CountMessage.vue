<template>
  <div style="width: 900px">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24" :pull="10"><p style="font-size: 20px;"><strong>个人统计信息 :</strong></p></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'注册时间: ' + this.countData.time }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'已建课程: ' + this.countData.createCourseNum+'  门,  已审批通过的：'+this.countData.createApprovalNum+"门" }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'已发布课程: ' + countData.issueCourseNum+'  门，  已审批通过的：'+this.countData.issueApprovalNum+"门" }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'已创建作业  :   ' + this.countData.assignmentNum+'  次' }}
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'CountMessage',
    data(){
      return{
        countData:{
          createCourseNum:"",
          createApprovalNum:"",
          issueCourseNum:"",
          issueApprovalNum:"",
          assignmentNum:"",
          time:""
        }
      }
    },
    methods:{
      initTable(){
        let url="/api/find.user.count.message";
        this.$axios.get(url)
          .then(res=>{
            this.countData=res.data
          }).catch(error=>{
          console.log(error)
        })
      }
    },
    created () {
        this.initTable();
    }
  }
</script>

<style scoped>

</style>
