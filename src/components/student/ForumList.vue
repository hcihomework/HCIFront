<template>
  <div>
    <el-row style="margin-top: -25px">
      <el-col :pull="12"><p style="font-size: 20px"><strong>论坛</strong></p></el-col>
    </el-row>
    <p style="height: 100px;width: 100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);overflow-y:scroll;overflow-x:hidden;">{{news}}</p>
    <h1 style="height: 300px;width:  100%;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);overflow-y:scroll;overflow-x:hidden;">
      <ul>
        <li v-for="topic in replyData" style="margin-left: -35px;width: 103%;height: 150px;list-style:none;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
          <label >
            <el-row>
              <el-col :span="12" :pull="2">
                <p>{{topic.user}}</p>
              </el-col>
              <el-col :span="12">
                <p>{{topic.time}}</p>
              </el-col>
            </el-row>
            <el-row style="overflow-y:scroll;height: 100px">
              <pre style="font-size: 15px;width: 100%;text-align: left">    {{topic.message}}</pre>
            </el-row>
          </label>
        </li>
      </ul>
    </h1>
    <el-dialog title="回复话题" :visible.sync="replyDialog" width="450px" top="200px" style="height: 700px">
      <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="replyMessage"></el-input>
      <el-button type="primary"  style="margin:20px auto 5px auto;width: 100%;" @click="reply">确认回复</el-button>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Forum',
    props:['courseId'],
    data(){
      return{
        tableData:[],
        replyData:[],
        replyMessage:'',
        messageDialog:false,
        replyDialog:false,
        topicDialog:false,
        news:"",
        talk:"",
        talkDetail:"",
        topicId:""
      }
    },
    methods:{
      checkReply(row){
        this.topicId=row.id;
        this.replyDialog=true;
      },
      reply(){
        let url='/api/topic/reply'
        this.$axios.get(url,{
          params:{
            "topicId":this.topicId,
            "message":this.replyMessage
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          if(res.data==true){
            this.$message({ message: '回复成功', type: 'success' });
            this.replyDialog=false;
            this.initTopic(this.id);
          }else{
            this.$message.error('回复失败');
          }
        }).catch(error=>{
          this.$message.error('回复失败');
          console.log(error)
        })
      },
      checkDetail(row){
        this.messageDialog=!this.messageDialog;
        this.news=row.message;
        this.initReply(row.id);
      },

      initReply(talkId){
        let url='/api/topic/findreply'
        this.$axios.get(url,{
          params:{
            "talkId":talkId
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          //console.log(res.data)
          this.replyData=res.data;
        }).catch(error=>{
          console.log(error)
        })
      }
    },
  }
</script>

<style scoped>

</style>
