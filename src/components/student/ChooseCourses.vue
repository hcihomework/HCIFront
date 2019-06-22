<template>

  <div style="min-width: 1000px">
    <H1>可选课程</H1>
  <el-collapse v-model="activeNames" @change="handleChange" >
    <el-collapse-item v-for="item in tableData" :title='item.name' :name='item'>
      <div style="position: relative;background-color: whitesmoke;text-align: left;border: blue 1px;bottom: 0;font-size: 14px;color: dimgrey">
      <div style="margin: 8px">课程时间：{{item.begin_time}}</div>
        <div style="margin: 8px">课程对象：{{item.grade}}</div>
        <div  style="margin: 8px">班次：{{item.limit_class}}</div>
        <div style="margin: 8px">限选人数：{{item.limit_student}}</div>
        <div style="margin: 8px">已选人数：{{item.choice_student}}</div>
        <div>
        <el-button size="mini" type="primary" @click="select(item)">选择</el-button>
      </div>
      </div>
    </el-collapse-item>
  </el-collapse>

      </div>




</template>

<script>
  export default {
    name: 'ChooseCourses',
    data() {
      return {
        activeNames: ['1'],
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
