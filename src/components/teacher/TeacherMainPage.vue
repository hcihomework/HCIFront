<template>
  <div class="all">
    <Navigation></Navigation>
  <el-container style="height: 730px;width: 1300px;margin: auto;position:relative;top: 100px">
    <el-aside width="200px" style="background-color: white;border-radius: 10px" >
      <div style="width: 200px;height: 150px;margin-top: 20px">
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

    <el-container style="position: relative; left: 30px;right: 50px;background-color: white;border-radius: 5px;">
      <el-header style="border-radius: 5px;background-color: dimgrey">
        <el-breadcrumb separator="*" style="font-size: 20px; margin: 20px;">
          <el-breadcrumb-item><a href="#" style="color: white">{{title_name}}</a></el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-main style="position: relative;left: 0;right: 0;background-color: white">
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
  import Navigation from "@/components/NavigationPage.vue"

  export default {
    name: 'TeacherMainPage',
    components: {CoursesList,CreateCourse,IssueCourses,CheckCourses,CheckCreateDetail,ModifyMessage, News,CountMessage,Navigation},
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

  .all{
    background: linear-gradient(to bottom, #C0C4CC 0%,#ffffff 100%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }

</style>
