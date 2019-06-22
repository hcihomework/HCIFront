<template>

  <di height="500" style="width: 1000px;font-size:20px ">
  <el-collapse v-model="activeNames" @change="handleChange"   >
    <el-collapse-item v-for="item in tableData" :title='item.name' name="1" style="font-size:20px ">
      <div style="position: relative;background-color: darkslategrey">
      <div>课程时间：{{item.begin_time}}</div>
      <div>课程对象：{{item.grade}}</div>
      <div>班次：{{item.limit_class}}</div>
      <div>限选人数：{{item.limit_student}}</div>
      <div>已选人数：{{item.choice_student}}</div>
      <div>操作：
        <el-button size="mini" type="primary" @click="select(item)">选择</el-button>
      </div>
      </div>
    </el-collapse-item>

  </el-collapse>
  </di>


</template>

<script>
  export default {
    name: 'ChooseCourses',
    data() {
      return {
        tableData:[]
      };
    },
    methods:{
      handleChange(val) {
        console.log(val);
      },
      initTable(){
        let url="/api/student/issue.course.list";
        this.$axios.get(url)
          .then(res=>{
            this.tableData=res.data
          }).catch(error=>{
          console.log(error)
        })
      },
      select(row){
        let url="/api/student/choose.course";
        this.$axios.get(url,{
          params:{
            "issue_id":row.id
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
            if(res.data=='exist'){
              this.$message({message:'你已选择过该课程。',type:'warning'});
            }else if(res.data=='limit'){
              this.$message({message:'课程人数已达上限。',type:'warning'});
            }else{
              this.$message({message:'选课成功。',type:'success'});
            }
            this.initTable();
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
