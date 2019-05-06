<template>
  <div>
    <el-table :data="tableData" :default-sort = "{prop: 'time', order: 'descending'}" height="500" border style="width: 100%">
      <el-table-column prop="name" label="课程名称" width="185"></el-table-column>
      <el-table-column prop="begin_time" label="开课时间" width="185"></el-table-column>
      <el-table-column prop="limit_class" label="开课班次" width="185"></el-table-column>
      <el-table-column prop="limit_student" label="开课人数" width="185"></el-table-column>
      <el-table-column prop="time" label="发起时间" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="throughIssue(scope.row)">通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'IssueApproval',
    data(){
      return{
        tableData:[]
      }
    },
    methods:{
      initTable(){
        let url='/api/director/findissue'
        this.$axios.get(url).then(res=>{
          //console.log(res.data)
          this.tableData=res.data;
        }).catch(error=>{
          console.log(error)
        })
      },
      throughIssue(row){
        let url='/api/director/throughissue'
        this.$axios.get(url,{
          params:{
            "id":row.id
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
      }
    },
    created () {
      this.initTable();
    }
  }
</script>

<style scoped>

</style>
