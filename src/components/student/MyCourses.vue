<template>
  <div>
    <el-row>
    <el-col :span="8" v-for="item in tableData" :key="item">
      <el-card style="width: 350px;background-color: whitesmoke">
        <div style="padding: 20px;">
          <span style="font-size: 30px;font-weight: bold">{{item.name}}</span><br/>
          <span>课程时间：{{item.begin_time}}</span><br/>
          <span>课程教师：{{item.time}}</span><br/>
          <span>课程对象：{{item.grade}}</span>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="handleEdit(item)">查看</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>

  </div>


</template>

<script>
  export default {
    name: 'MyCourses',
    data(){
      return{
        tableData:[]
      }
    },
    methods:{
      handleEdit(row) {
        this.$emit('changeTable','MyCoursesDetail',row)
      },
      initTable(){
        let url="/api/student/my.courses";
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

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }


</style>
