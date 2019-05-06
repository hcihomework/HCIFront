<template>
  <div>
  <el-container style="height: 730px; border: 1px solid #eee;width: 1300px;margin: auto">
    <el-aside width="200px" style="background-color: white">
      <div style="width: 200px;height: 150px">
        <img src="@/assets/wang_headpic.jpg" class="person-img">
        <!--<label>{{this.name}}</label>-->
      </div>
      <el-menu :default-openeds="['1','2', '3']" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>课程管理</template>
          <el-menu-item-group>
            <el-menu-item index="CheckCourses">课程查看</el-menu-item>
            <el-menu-item index="IssueCourses">课程发布</el-menu-item>
            <el-menu-item index="CreateCourse">课程创建</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-setting"></i>个人中心</template>
          <el-menu-item-group>
            <el-menu-item index="News">消息列表</el-menu-item>
            <el-menu-item index="ModifyMessage">信息修改</el-menu-item>
            <el-menu-item index="CountMessage">统计信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="/" style="font-size: 20px; margin: 20px; ">
          <el-breadcrumb-item>{{title_name}}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main>
        <component class="component" :is="table_view" v-on:changeTable="changeTable" :course="course"></component>
      </el-main>
    </el-container>



  </el-container>
  </div>
</template>

<script>
  import CoursesList from '@/components/CoursesList'
  import CreateCourse from '@/components/teacher/CreateCourse'
  import IssueCourses from '@/components/teacher/IssueCourses'
  import CheckCourses from '@/components/teacher/CheckCourses'
  import CheckCreateDetail from '@/components/teacher/check/detail/CheckCreateDetail'
  import ModifyMessage from '@/components/student/ModifyMessage'
  import News from '@/components/teacher/News'
  import CountMessage from '@/components/teacher/CountMessage'
  export default {
    name: 'TeacherMainPage',
    components: {CoursesList,CreateCourse,IssueCourses,CheckCourses,CheckCreateDetail,ModifyMessage, News,CountMessage},
    comments:{
      CoursesList
    },
    data() {
      return {
        activeIndex:"1",
        table_view:"News",
        title_name:"消息列表",
        course:{}
      }
    },
    methods: {
      handleSelect(key) {
        if(key=="IssueCourses")
          this.title_name="发布课程"
        if(key=="CreateCourse")
          this.title_name="创建课程"
        if(key=="CheckCourses")
          this.title_name="课程查看"
        if(key=="ModifyMessage")
          this.title_name="信息修改"
        if(key=="News")
          this.title_name="消息列表"
        if(key=="CountMessage")
          this.title_name="统计信息"
       this.table_view=key
      },
      changeTable(table,course){
        this.course=course
        this.table_view=table;
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
  .person-img {
    border-radius: 100%;
    width:140px;
    height:140px;
    margin: 0 auto;
    position:relative;
  }
  .el-main{
    margin: auto;
  }

</style>
