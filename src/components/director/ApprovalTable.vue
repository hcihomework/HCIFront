<template>
    <div>
      <el-table :data="tableData" :default-sort = "{prop: 'time', order: 'descending'}" height="500" border style="width: 100%">
        <el-table-column prop="name" label="课程名称" width="150"></el-table-column>
        <el-table-column prop="grade" label="课程对象" width="150"></el-table-column>
        <el-table-column prop="note" label="课程备注" width="300"></el-table-column>
        <el-table-column prop="teacher" label="发起教师" width="200"></el-table-column>
        <el-table-column prop="time" label="发起时间" width="150"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="throughApproval(scope.row)">通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  export default {
    name: 'ApprovalTable',
    data(){
      return{
        tableData:[]
      }
    },
    created () {
      this.initTable();
    },
    methods:{
      throughApproval(row){
        let url='/api/director/throughcreate'
        this.$axios.get(url,{
          params:{
            "course_id":row.id
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          if(res.data==true){
            this.$message({ message: '审批成功', type: 'success' });
            this.initTable();
          }else{
            this.$message.error('审批失败');
          }

        }).catch(error=>{
          console.log(error)
        })
      },
      initTable(){
        let url='/api/director/findcreate'
        this.$axios.get(url).then(res=>{
          this.tableData=res.data;
        }).catch(error=>{
          console.log(error)
        })
      }
    }

  }
</script>

<style scoped>

</style>
