<template>
  <el-table :data="tableData" :default-sort = "{prop: 'time', order: 'descending'}" height="500" border style="width: 100%">
    <el-table-column prop="name" label="课程名" width="120"></el-table-column>
    <el-table-column prop="grade" label="课程对象" width="120"></el-table-column>
    <el-table-column prop="note" label="备注" width="340"></el-table-column>
    <el-table-column prop="time" label="创建时间" width="120"></el-table-column>
    <el-table-column prop="approval" label="是否通过审批" width="120"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" @click="handleEdit(scope.row)">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'CheckCreate',
    data() {
      return {
        tableData: []
      }
    },
    methods:{
      handleEdit(row){
        this.$emit("changeTable","CheckCreateDetail",row);
      }
    },
    created(){
      let url="/api/search/checkcreatelist";
      this.$axios.get(url)
        .then(res=>{
        this.tableData=res.data
      }).catch(error=>{
        console.log(error)
      })
    }
  }
</script>

<style scoped>

</style>
