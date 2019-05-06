<template>
    <div>
      <el-row style="margin-top: -25px">
        <el-col :pull="12"><p style="font-size: 20px"><strong>成员</strong></p></el-col>
      </el-row>
      <el-row>
        <el-col :pull="10">
          <el-button  plain  icon="el-icon-edit-outline" style="width: 180px;" @click="sendAllEmail">群发邮件</el-button>
          <el-dialog title="发送邮件" :visible.sync="sendDialog" width="450px" top="200px" style="height: 700px">
            <el-input v-model="talk" placeholder="主题" style="margin: auto auto 10px auto"></el-input>
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="talkDetail"></el-input>
            <el-button type="primary"  style="margin:20px auto 5px auto;width: 100%;" @click="sendEmail">确认发送</el-button>
          </el-dialog>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px;margin-left: 13px">
        <el-col :pull="1">
          <el-table :data="studentList" :stripe="true" style="width: 500px;height: 350px">
            <el-table-column prop="student" label="学生" width="350"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="showSendEmail(scope.row)">发邮件</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  export default {
    name: 'Members',
    props:['id'],//课程id
    data(){
      return{
        sendDialog:false,//发邮件表单
        talk:"",//邮件主题
        talkDetail:"",//邮件详情
        studentList:[],//成员列表
        sendAll:false,//是否群发
        student:"",//发送学生
      }
    },
    methods:{
      sendEmail(){
        if(this.sendAll){
          let url = "/api/email/send.all.email";
          this.$axios.get(url, {
            params: {
              "students": this.studentList,
              "talk":this.talk,
              "talkDetail":this.talkDetail
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(res => {
            if (res.data == true) {
              this.$message({message: '发送成功', type: 'success'});
              this.sendDialog=false;
            } else {
              this.$message.error('发送失败');
            }
          }).catch(error => {
            console.log(error)
          })
        }else {
          let url = "/api/email/send.email";
          this.$axios.get(url, {
            params: {
              "student": this.student,
              "talk":this.talk,
              "talkDetail":this.talkDetail
            },
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then(res => {
            if (res.data == true) {
              this.$message({message: '发送成功', type: 'success'});
            } else {
              this.$message.error('发送失败');
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      sendAllEmail(){
        this.sendDialog=!this.sendDialog
        this.sendAll=true;
      },
      showSendEmail(row){
        this.student=row.student
        this.sendAll=false;
        this.sendDialog=!this.sendDialog
      },
      initStudentList(){
        let url="/api/student/courses.students";
        this.$axios.get(url,{
          params:{
            "issue_id":this.id
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          this.studentList=res.data
        }).catch(error=>{
          console.log(error)
        })
      }

    },
    created () {
        this.initStudentList();
    }
  }
</script>

<style scoped>

</style>
