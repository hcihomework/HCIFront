<template>

  <div style="min-width: 800px">
    <el-collapse v-model="activeNames" @change="handleChange" >
      <el-collapse-item
        v-for="item in tableData" :title='item.name'>
        <div style="position: relative;background-color: whitesmoke;text-align: left;border: blue 1px;bottom: 0;font-size: 14px;color: dimgrey">
          <div style="margin: 8px">课程时间：{{item.begin_time}}</div>
          <div style="margin: 8px">课程对象：{{item.grade}}</div>
          <div style="margin: 8px">发布时间：{{item.time}}</div>
          <div style="margin: 8px">班次：{{item.limit_class}}</div>
          <div style="margin: 8px">限选人数：{{item.limit_student}}</div>
          <div style="margin: 8px">已选人数：{{item.choice_student}}</div>
          <div style="margin: 8px">是否通过审批：{{item.approval}}</div>
          <div style="margin: 8px">
            <el-button size="mini" type="primary" @click="handleEdit(item)">查看</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>


  </div>
</template>

<script>
  export default {
    name: 'CheckIssue',
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
    created () {
      let url="/api/search/checkissuelist";
      this.$axios.get(url)
        .then(res=>{
          this.tableData=res.data
          this.tableData.reverse()
        }).catch(error=>{
        console.log(error)
      })
    }
  }
</script>

<style scoped>

</style>
