<template>
<div>
  <el-row>
    <el-col :span="14" :push="6">
      <el-col v-for="course in courses" :span="8">
        <el-card :body-style="{ padding: '0px' }" style="width: 250px;">
          <el-row>
            <el-col :span="12" :pull="2">
              <span><b>{{ course.name }}</b></span>
            </el-col>
          </el-row>


        </el-card>
      </el-col>
    </el-col>
  </el-row>
</div>
</template>

<script>
    export default {
        name: "CoursesListPage",
        data(){
          return{
            courses:[{
              name:"软件测试"
            },{
              name:"软件测试"
            },{
              name:"软件测试"
            },{
              name:"软件测试"
            },{
              name:"软件测试"
            }]
          }
        }
    }
</script>

<style scoped>

</style>
