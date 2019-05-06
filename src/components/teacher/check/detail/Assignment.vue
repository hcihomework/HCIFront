<template>
  <div style="margin-top:-15px;">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="14">
        <el-table :data="tableData" :stripe="true" style="width: 400px;height: 450px;overflow-y:auto;" v-show="!showDetail">
          <el-table-column prop="name" label="作业名" width="300"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="checkDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width: 400px;margin-top: -10px" v-show="showDetail">
          <div style="height: 430px">
          <el-row>
          <el-col :pull="10">
               <p ><strong>{{assignmentDetail.name}}:</strong></p>
          </el-col>
          </el-row>
          <el-row>
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="作业要求" name="1">
              <el-row>
                <p style="text-align: left"> {{ "要求：" +assignmentDetail.message}}</p>
              </el-row>
              <el-row>
                <p style="text-align: left"> {{ "截止日期：" +assignmentDetail.deadline}}</p>
              </el-row>
              <el-row>
                <el-col :span="4">
                <p style="text-align: left"> 附件：</p>
                </el-col>
                <el-col :span="20">
                  <el-table :data="appendixList" :stripe="true" style="width: 300px;height: 150px;overflow-y:auto;">
                    <el-table-column prop="name" label="附件名" width="200"></el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="checkDetail(scope.row)">下载</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="提交列表" name="2">
              <el-table :data="studentAssignmentList" :stripe="true"  style="width: 400px;height: 250px;overflow-y:auto;">
                <el-table-column prop="student" label="学生" width="150"></el-table-column>
                <el-table-column prop="score" label="得分" width="100"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="downWare(scope.row)">下载</el-button>
                    <el-button size="mini" type="primary" @click="changeGiveScore(scope.row)">评分</el-button>
                    <el-dialog title="评分：" :visible.sync="showGiveScore" width="20%">
                      <el-input v-model="score" placeholder="输入分数"></el-input>
                      <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="giveScore">确 定</el-button>
                      </span>
                    </el-dialog>
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
          </el-row>
          </div>
          <el-button type="primary" plain style="width: 400px" @click="checkList">返回列表</el-button>
        </div>
      </el-col>
      <el-col :space="8" >
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :pull="2" style="margin-top: -10px"><p><strong>新建作业:</strong></p></el-col>
        <el-col :pull="3" style="margin-top: 5px">
          <el-input v-model="name"  placeholder="请输入作业名" style="width: 270px"></el-input>
        </el-col>
      </el-row>
      <el-row style="width: 270px;margin-top: 50px;margin-left: 110px">
        <el-date-picker v-model="deadline" type="datetime" placeholder="选择截止日期" style="width: 270px"  value-format="yyyy-MM-dd HH:mm" > </el-date-picker>
      </el-row>
      <el-row>
        <el-input type="textarea" :rows="3" placeholder="编写作业要求" v-model="message" style="width: 270px;margin-top: 50px;margin-left: 50px"></el-input>
      </el-row>
      <el-row style="width: 270px;margin-top: 50px;margin-left: 110px">
        <el-upload
          class="upload"
          ref="upload"
          action="/api/assignment/create.ware"
          :file-list="fileList"
          :auto-upload="false"
          accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF,.zip,.doc">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传附件</el-button>
        </el-upload>
      </el-row>
      <el-row style="width: 270px;margin-top: 80px;margin-left: 110px">
        <el-button  type="primary" style="width: 270px;" @click="createAssignment">确认创建</el-button>
      </el-row>

    </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Assignment',
    props:['id'],
    data(){
      return{
        tableData:[],
        deadline:"",
        message:"",
        name:"",
        fileList:[],
        activeName:"1",
        assignmentDetail:{},//作业详情对象
        showDetail:false,
        appendixList:[],//作业附件列表
        studentAssignmentList:[],//学生作业提交列表
        showGiveScore:false,//评分面板展示
        score:"",//学生作业评分
        studentId:"",//评分学生ID
      }
    },
    methods:{
      submitUpload() {
        this.$refs.upload.submit();
      },
      checkDetail(row){
        this.showDetail=!this.showDetail;
        this.assignmentDetail=row;
        this.getAppendixList(row.id)
        this.getStudentAssignment(row.id);
      },
      createAssignment(){
        let url='/api/assignment/create';
        this.$axios.get(url,{
          params:{
            "name":this.name,
            "deadline":this.deadline,
            "course_id":this.id,
            "message":this.message
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          if(res.data==true){
            this.$message({ message: '创建成功', type: 'success' });
            this.name=""
            this.deadline=""
            this.message=""
            this.fileList=[]
            this.initTable();
          }else{
            this.$message.error('作业创建错误');
          }
        }).catch(error=>{
          this.$message.error('作业创建错误');
          console.log(error)
        })
      },
      initTable(){
        let url='/api/assignment/find.assignment.list';
        this.$axios.get(url,{
          params:{
           "course_id":this.id
         },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          this.tableData=res.data;
        }).catch(error=>{
          console.log(error)
        })
      },
      checkList(){
        this.showDetail=!this.showDetail;
      },
      getAppendixList(assignmentId){
        let url='/api/assignment/find.assignment.file.list';
        this.$axios.get(url,{
          params:{
            "assignment_id":assignmentId
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          this.appendixList=[];
          if(res.data!=[]){
            for(let index in res.data) {
              let path = res.data[index];
              let row = {
                "id": path,
                "name": path.substring(path.lastIndexOf('+') + 1)
              }
              this.appendixList.push(row);
            }
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      getStudentAssignment(assignmentId){
        let url='/api/assignment/get.student.assignment.list';
        this.$axios.get(url,{
          params:{
            "assignment_id":assignmentId
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          this.studentAssignmentList=res.data;
        }).catch(error=>{
          console.log(error)
        })
      },
      giveScore(){
        let url='/api/assignment/give.student.score';
        this.$axios.get(url,{
          params:{
            "assignment":this.assignmentDetail.id,
            "student":this.studentId,
            "score":this.score
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          if(res.data==true){
            this.showGiveScore=false;
            this.$message({
              message: '评分成功',
              type: 'success'
            });
            this.getStudentAssignment(this.assignmentDetail.id);
          }else {
            this.$message.error('评分失败');
          }
        }).catch(error=>{
          console.log(error)
        })

      },
      changeGiveScore(row){
        this.showGiveScore=true;
        this.studentId=row.student;
      },
      downWare(row){
        this.downFile(row.path)
      },
      downFile(path){
        let url="/api/file/down"
        //const form = this.getSearchForm() // 要发送到后台的数据
        this.$axios.get(url,{ // 用axios发送post请求
          params:{
            "path":path
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then((res) => { // 处理返回的文件流
          const content = res
          const blob = new Blob([content])
          const fileName = path.substring(path.lastIndexOf("+")+1)
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
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
