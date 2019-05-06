<template>
  <el-table
    :data="tableData"
    stripe
    :default-sort = "{prop: 'time', order: 'descending'}"
    style="width: 100%">
    <el-table-column
      prop="time"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="fromWhere"
      label="发件人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="message"
      label="信息"
      width="300">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'News',
    data(){
      return{
        tableData:[]
      }
    },
    methods:{
      initTable(){
        let url="/api/select.news";
        this.$axios.get(url)
          .then(res=>{
            this.tableData=res.data
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
